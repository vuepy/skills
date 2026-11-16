---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Bokeh 图表

`PnBokeh` 组件允许在 Panel 应用程序中显示任何可显示的 [Bokeh](http://bokeh.org) 模型。由于 Panel 内部基于 Bokeh 构建，Bokeh 模型只是简单地插入到图表中。由于 Bokeh 模型通常只显示一次，某些与 Panel 相关的功能（如同步同一模型的多个视图）可能无法工作。尽管如此，这种组件类型对于将原始 Bokeh 代码与高级 Panel API 结合起来非常有用。

在 notebook 中工作时，对 Bokeh 对象的任何更改可能不会自动同步，需要显式调用包含 Bokeh 对象的 Panel 组件的 `pn.state.push_notebook`。

底层实现为`panel.pane.Bokeh`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/Bokeh.html

## 基本用法

下面是一个使用 Bokeh 创建饼图并将其显示在 Panel 中的示例：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnBokeh :object="p" theme="dark_minimal" />
</template>
<script lang='py'>
import pandas as pd
from math import pi
from bokeh.palettes import Category20c
from bokeh.plotting import figure
from bokeh.transform import cumsum

x = {
    'United States': 157,
    'United Kingdom': 93,
    'Japan': 89,
    'China': 63,
    'Germany': 44,
    'India': 42,
    'Italy': 40,
    'Australia': 35,
    'Brazil': 32,
    'France': 31,
    'Taiwan': 31,
    'Spain': 29
}

data = pd.Series(x).reset_index(name='value').rename(columns={'index':'country'})
data['angle'] = data['value']/data['value'].sum() * 2*pi
data['color'] = Category20c[len(x)]

p = figure(height=350, title="Pie Chart", toolbar_location=None,
           tools="hover", tooltips="@country: @value", x_range=(-0.5, 1.0))

r = p.wedge(x=0, y=1, radius=0.4,
        start_angle=cumsum('angle', include_zero=True), end_angle=cumsum('angle'),
        line_color="white", fill_color='color', legend_field='country', source=data)

p.axis.axis_label=None
p.axis.visible=False
p.grid.grid_line_color = None
</script>
```

## 更新 Bokeh 对象

要使用实时服务器更新图表，我们可以简单地修改底层模型。如果我们在 Jupyter notebook 中工作，我们还必须在组件上调用 `pn.io.push_notebook` 辅助函数，或者明确使用 `bokeh_pane.param.trigger('object')` 触发事件：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnBokeh :object="p" ref="bokeh_pane_ref" />
  <PnButton @click="update_colors()">更新颜色</PnButton>
  <PnButton @click="replace_with_div()">替换为文本</PnButton>
</template>
<script lang='py'>
import pandas as pd
from math import pi
from bokeh.palettes import Category20c, Category20
from bokeh.plotting import figure
from bokeh.transform import cumsum
from bokeh.models import Div

from vuepy import ref

bokeh_pane_ref = ref(None)

x = {
    'United States': 157,
    'United Kingdom': 93,
    'Japan': 89,
    'China': 63,
    'Germany': 44
}

data = pd.Series(x).reset_index(name='value').rename(columns={'index':'country'})
data['angle'] = data['value']/data['value'].sum() * 2*pi
data['color'] = Category20c[len(x)]

p = figure(height=350, title="Pie Chart", toolbar_location=None,
           tools="hover", tooltips="@country: @value", x_range=(-0.5, 1.0))

r = p.wedge(x=0, y=1, radius=0.4,
        start_angle=cumsum('angle', include_zero=True), end_angle=cumsum('angle'),
        line_color="white", fill_color='color', legend_field='country', source=data)

p.axis.axis_label=None
p.axis.visible=False
p.grid.grid_line_color = None

def update_colors():
    bokeh_pane = bokeh_pane_ref.value.unwrap()
    r.data_source.data['color'] = Category20[len(x)]
    bokeh_pane.param.trigger('object')

# in a live server
def replace_with_div():
    bokeh_pane = bokeh_pane_ref.value.unwrap()
    bokeh_pane.object = Div(text='<h2>This text replaced the pie chart</h2>')
</script>
```

## 交互式 Bokeh 应用

使用 Panel 渲染 Bokeh 对象的另一个很好的特性是回调将像在服务器上一样工作。因此，您可以简单地将现有的 Bokeh 应用程序包装在 Panel 中，它将可以渲染并开箱即用，无论是在 notebook 中还是作为独立应用程序提供服务：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnBokeh :object="app" />
</template>
<script lang='py'>
import numpy as np
from bokeh.layouts import column, row
from bokeh.models import ColumnDataSource, Slider, TextInput
from bokeh.plotting import figure

# Set up data
N = 200
x = np.linspace(0, 4*np.pi, N)
y = np.sin(x)
source = ColumnDataSource(data=dict(x=x, y=y))

# Set up plot
plot = figure(height=400, width=400, title="my sine wave",
              tools="crosshair,pan,reset,save,wheel_zoom",
              x_range=[0, 4*np.pi], y_range=[-2.5, 2.5])

plot.line('x', 'y', source=source, line_width=3, line_alpha=0.6)

# todo to vuepy component
# Set up widgets
text = TextInput(title="title", value='my sine wave')
offset = Slider(title="offset", value=0.0, start=-5.0, end=5.0, step=0.1)
amplitude = Slider(title="amplitude", value=1.0, start=-5.0, end=5.0, step=0.1)
phase = Slider(title="phase", value=0.0, start=0.0, end=2*np.pi)
freq = Slider(title="frequency", value=1.0, start=0.1, end=5.1, step=0.1)

# Set up callbacks
def update_title(attrname, old, new):
    plot.title.text = text.value

text.on_change('value', update_title)

def update_data(attrname, old, new):
    # Get the current slider values
    a = amplitude.value
    b = offset.value
    w = phase.value
    k = freq.value

    # Generate the new curve
    x = np.linspace(0, 4*np.pi, N)
    y = a*np.sin(k*x + w) + b

    source.data = dict(x=x, y=y)

for w in [offset, amplitude, phase, freq]:
    w.on_change('value', update_data)

# Set up layouts and add to document
inputs = column(text, offset, amplitude, phase, freq)
app = row(inputs, plot, width=800)
</script>
```

## API

### 属性

| 属性名      | 说明                 | 类型                                                           | 默认值 |
| ---------- | ------------------- | ---------------------------------------------------------------| ------- |
| object     | 要显示的 Bokeh 模型    | ^[bokeh.layouts.LayoutDOM]                                     | None |
| theme      | 要应用的 Bokeh 主题    | ^[bokeh.themes.Theme]                                          | None |
| sizing_mode | 尺寸调整模式         | ^[str]                                                         | 'fixed'  |
| width      | 宽度                 | ^[int, str]                                                    | None    |
| height     | 高度                 | ^[int, str]                                                    | None    |
| min_width  | 最小宽度             | ^[int]                                                         | None    |
| min_height | 最小高度             | ^[int]                                                         | None    |
| max_width  | 最大宽度             | ^[int]                                                         | None    |
| max_height | 最大高度             | ^[int]                                                         | None    |
| margin     | 外边距               | ^[int, tuple]                                                  | 5       |
| css_classes | CSS类名列表          | ^[list]                                                        | []      |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

## Controls

```python
##controls
import panel as pn
import numpy as np
import pandas as pd

pn.extension()

from math import pi

from bokeh.palettes import Category20c, Category20
from bokeh.plotting import figure
from bokeh.transform import cumsum

x = {
    'United States': 157,
    'United Kingdom': 93,
    'Japan': 89,
    'China': 63,
    'Germany': 44,
    'India': 42,
    'Italy': 40,
    'Australia': 35,
    'Brazil': 32,
    'France': 31,
    'Taiwan': 31,
    'Spain': 29
}

data = pd.Series(x).reset_index(name='value').rename(columns={'index':'country'})
data['angle'] = data['value']/data['value'].sum() * 2*pi
data['color'] = Category20c[len(x)]

p = figure(height=350, title="Pie Chart", toolbar_location=None,
           tools="hover", tooltips="@country: @value", x_range=(-0.5, 1.0))

r = p.wedge(x=0, y=1, radius=0.4,
        start_angle=cumsum('angle', include_zero=True), end_angle=cumsum('angle'),
        line_color="white", fill_color='color', legend_field='country', source=data)

p.axis.axis_label=None
p.axis.visible=False
p.grid.grid_line_color = None

bokeh_pane = pn.pane.Bokeh(p, theme="dark_minimal")
pn.Column(bokeh_pane, bokeh_pane.controls)
```
