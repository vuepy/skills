---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# HoloViews 可视化

[HoloViews](https://holoviews.org/) 是一个流行且功能强大的数据可视化库，支持多种数据和绘图后端。

[hvPlot](https://hvplot.holoviz.org/index.html)（快速可视化）和 [GeoViews](https://holoviz.org/assets/geoviews.png)（空间可视化）都是基于 HoloViews 构建的，并产生 `HoloViews` 对象。

**Panel、HoloViews、hvPlot 和 GeoViews 都是 [HoloViz](https://holoviz.org) 生态系统的成员，它们可以完美地协同工作**。

`PnHoloViews` 组件使用 HoloViews 支持的绘图后端之一渲染 [HoloViews](https://holoviews.org/) 对象。这包括 [hvPlot](https://hvplot.holoviz.org/index.html) 和 [GeoViews](https://holoviz.org/assets/geoviews.png) 生成的对象。

`PnHoloViews` 组件支持显示包含小部件的交互式 [`HoloMap`](https://holoviews.org/reference/containers/bokeh/HoloMap.html) 和 [`DynamicMap`](https://holoviews.org/reference/containers/bokeh/DynamicMap.html) 对象。`PnHoloViews` 组件甚至允许自定义小部件类型及其相对于图表的位置。

底层实现为`panel.pane.HoloViews`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/HoloViews.html

## 基本用法

`PnHoloViews` 组件将任何 `HoloViews` 对象自动转换为可显示的面板，同时保持其所有交互功能：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnHoloViews :object="box" :height="300" :width="500" />
</template>
<script lang='py'>
import numpy as np
import holoviews as hv

data = {"group": np.random.randint(0, 10, 100), "value": np.random.randn(100)}
box = hv.Scatter(data, kdims="group", vdims="value").sort().opts()
</script>
```

通过设置组件的 `object` 可以像所有其他组件对象一样更新图表：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnHoloViews :object="plot" :height="300" :width="500" ref='hv_pane' />
  <PnButton @click="update_plot()">更新为小提琴图</PnButton>
</template>
<script lang='py'>
import numpy as np
import holoviews as hv
from vuepy import ref

hv_pane = ref(None)

data = {"group": np.random.randint(0, 10, 100), "value": np.random.randn(100)}
box = hv.Scatter(data, kdims="group", vdims="value").sort().opts()
plot = box

def update_plot():
    nonlocal plot
    plot = hv.Violin(box).opts(violin_color='Group', responsive=True, height=300)
    hv_pane.value.unwrap().object = plot
</script>
```

您也可以显示 [hvPlot](https://hvplot.holoviz.org/)（和 [GeoViews](https://geoviews.org/)）对象，因为它们是 `HoloViews` 对象：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnHoloViews :object="plot" :height="300" :width="500" />
</template>
<script lang='py'>
import numpy as np
import pandas as pd
import hvplot.pandas

data = {"group": np.random.randint(0, 10, 100), "value": np.random.randn(100)}
df = pd.DataFrame(data)
plot = df.hvplot.box(by="group", y="value", responsive=True, height=300)
</script>
```

您还可以显示 [`HoloMap`](https://holoviews.org/reference/containers/bokeh/HoloMap.html) 和 [`DynamicMap`](https://holoviews.org/reference/containers/bokeh/DynamicMap.html) 对象。

[HoloViews](https://holoviews.org/)（框架）如果 [`HoloMap`](https://holoviews.org/reference/containers/bokeh/HoloMap.html) 或 [DynamicMap](https://holoviews.org/reference/containers/bokeh/DynamicMap.html) 声明了任何键维度，它原生渲染带有小部件的图表。这种方法高效地仅更新图表内的数据，而不是完全替换图表。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnHoloViews :object="dmap" :width='300' :height='300'/>
</template>
<script lang='py'>
import numpy as np
import pandas as pd
import hvplot.pandas
import holoviews as hv
import holoviews.plotting.bokeh

def sine(frequency=1.0, amplitude=1.0, function='sin'):
    xs = np.arange(200)/200*20.0
    ys = amplitude*getattr(np, function)(frequency*xs)
    return pd.DataFrame(dict(y=ys), index=xs).hvplot(height=250, responsive=True)

# todo have no controls
dmap = hv.DynamicMap(sine, kdims=['frequency', 'amplitude', 'function']).redim.range(
    frequency=(0.1, 10), amplitude=(1, 10)).redim.values(function=['sin', 'cos', 'tan'])
</script>
```

## 后端选择

`PnHoloViews` 组件默认使用 'bokeh' 绘图后端（如果没有通过 `holoviews` 加载后端），但您可以根据需要将后端更改为 'bokeh'、'matplotlib' 和 'plotly' 中的任何一个。

### Bokeh

Bokeh 是默认的绘图后端，所以通常您不必指定它。但让我们在这里展示它是如何工作的：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnHoloViews :object="plot" backend='bokeh' sizing_mode='stretch_width' :height="300" />
</template>
<script lang='py'>
import numpy as np
import pandas as pd
import hvplot.pandas

data = {"group": np.random.randint(0, 10, 100), "value": np.random.randn(100)}
df = pd.DataFrame(data)
plot = df.hvplot.scatter(x="group", y="value")
</script>
```

### Matplotlib

Matplotlib 后端允许生成用于打印和出版的图形。如果你想允许响应式大小调整，你可以设置 `format='svg'`，然后使用标准的响应式 `sizing_mode` 设置：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnHoloViews :object="plot" backend='matplotlib' format='svg'
               sizing_mode='stretch_both' :center="False" />
</template>
<script lang='py'>
import numpy as np
import pandas as pd
import hvplot.pandas
hvplot.extension("matplotlib")

data = {"group": np.random.randint(0, 10, 100), "value": np.random.randn(100)}
df = pd.DataFrame(data)
plot = df.hvplot.scatter(x="group", y="value")
</script>
```

### Plotly

要使用 'plotly' 绘图后端，您需要运行 `hv.extension("plotly")` 来配置 'plotly' 后端。

如果您使用的是 `hvPlot`，您可以使用 `hvplot.extension("plotly")` 来代替：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnHoloViews :object="plot" backend='plotly' :height="300" />
</template>
<script lang='py'>
import numpy as np
import pandas as pd
import hvplot.pandas
hvplot.extension("plotly")

data = {"group": np.random.randint(0, 10, 100), "value": np.random.randn(100)}
df = pd.DataFrame(data)
plot = df.hvplot.scatter(x="group", y="value", height=300, responsive=True)
</script>
```

### 动态后端切换

您还可以通过小部件动态更改绘图后端：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnColumn>
    <PnRadioButtonGroup v-model="backend.value" 
                        :options="['bokeh', 'matplotlib', 'plotly']" 
                        button_type="primary" button_style="outline" />
    <PnHoloViews :object="plot" :backend="backend.value" 
                 sizing_mode="stretch_width" :height="300" />
  </PnColumn>
</template>
<script lang='py'>
import numpy as np
import pandas as pd
import hvplot.pandas
from vuepy import ref
import holoviews as hv
hv.extension("bokeh", "matplotlib", "plotly")

data = {
    "group": np.random.randint(0, 10, 100),
    "value": np.random.randn(100),
}
df = pd.DataFrame(data)
plot = df.hvplot.scatter(x="group", y="value", height=300, 
                         responsive=True, 
                         title="Try changing the backend")
backend = ref('bokeh')
</script>
```

## 链接坐标轴

默认情况下，具有共享键或值维度的图表的坐标轴是链接的。您可以通过将 `linked_axes` 参数设置为 `False` 来删除链接：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnColumn>
    <PnHoloViews :object="not_linked_plot" backend='bokeh' 
                 sizing_mode='stretch_width' :height="200" :linked_axes="False" />
    <PnHoloViews :object="linked_plot" backend='bokeh' 
                 sizing_mode='stretch_width' :height="200" />
    <PnHoloViews :object="linked_plot" backend='bokeh' 
                 sizing_mode='stretch_width' :height="200" />
  </PnColumn>
</template>
<script lang='py'>
import numpy as np
import pandas as pd
import hvplot.pandas
import holoviews as hv
hv.extension("bokeh")

data = {"group": np.random.randint(0, 10, 100), "value": np.random.randn(100)}
df = pd.DataFrame(data)
not_linked_plot = df.hvplot.scatter(x="group", y="value", responsive=True, title="Not Linked Axes")\
    .opts(active_tools=['box_zoom'])
linked_plot = df.hvplot.scatter(x="group", y="value", responsive=True, title="Linked Axes")\
    .opts(active_tools=['box_zoom'])
</script>
```

## 主题

您可以更改 `theme`：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnHoloViews :object="plot" :height="300" theme="night_sky" />
</template>
<script lang='py'>
import numpy as np
import pandas as pd
import hvplot.pandas

data = {"group": np.random.randint(0, 10, 100), "value": np.random.randn(100)}
df = pd.DataFrame(data)
plot = df.hvplot.scatter(x="group", y="value", height=300, responsive=True)
</script>
```

## 布局和小部件参数

`PnHoloViews` 组件提供了 `layout` 属性，其中包含 `HoloViews` 组件和 `widget_box`。

### 居中

您可以通过 `center` 参数将图表居中：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
    <PnHoloViews :object='plot' :center="True" sizing_mode="fixed" />
<!--
  <PnCol>
    <PnMarkdown>center=True, sizing_mode='fixed'</PnMarkdown>

    <PnMarkdown>center=True, sizing_mode='stretch_width'</PnMarkdown>
    <PnHoloViews :object="plot" :center="True" sizing_mode="stretch_width" />

    <PnMarkdown>center=False, sizing_mode='fixed'</PnMarkdown>
    <PnHoloViews :object="plot" :center="False" sizing_mode="fixed" />

    <PnMarkdown>center=False, sizing_mode='stretch_width'</PnMarkdown>
    <PnHoloViews :object="plot" :center="False" sizing_mode="stretch_width" />
  </PnCol>
-->
</template>
<script lang='py'>
import pandas as pd
import hvplot.pandas

df = pd.DataFrame({
    "group": [1, 2, 3, 4, 5],
    "value": [10, 20, 30, 20, 10]
})
# todo center
plot = df.hvplot.scatter(x="group", y="value", height=100, width=400)
</script>
```

## API

### 属性

| 属性名           | 说明                   | 类型                                                           | 默认值 |
| --------------- | --------------------- | ---------------------------------------------------------------| ------- |
| object          | 要显示的 HoloViews 对象 | ^[object]                                                      | None |
| backend         | 任何支持的 HoloViews 后端（'bokeh'，'matplotlib' 或 'plotly'）。如果未指定，默认为活动的 holoviews 渲染器。默认为 'bokeh'。 | ^[str] | None |
| linked_axes     | 是否在面板布局中链接各图的坐标轴 | ^[boolean]                                            | True |
| format          | 绘制 Matplotlib 图时使用的输出格式 | ^[str]                                              | 'png' |
| renderer        | 用于渲染 HoloViews 图的明确的 HoloViews 渲染器实例。覆盖 `backend` 参数。 | ^[object]    | None |
| theme           | 应用于 HoloViews 图的 Bokeh 主题 | ^[str, object]                                       | None |
| layout          | 包含图表窗格和（可选）`widget_box` 布局的布局 | ^[pn.layout.Panel]                       | None |
| widget_box      | 包含小部件的布局       | ^[ListPanel]                                                    | None |
| center          | 是否居中显示图表       | ^[boolean]                                                      | False |
| widgets         | 从维度名称到小部件类、实例或覆盖字典的映射，用于修改默认小部件 | ^[dict]                | None |
| widget_location | 相对于图表放置小部件的位置 | ^[str]                                                      | None |
| widget_layout   | 放置小部件的对象，可以是 `Row`、`Column` 或 `WidgetBox` | ^[ListPanel]                  | None |
| widget_type     | 是否为每个维度生成单独的小部件，或使用具有连接维度的全局线性滑块 | ^[str]                 | None |
| sizing_mode     | 尺寸调整模式           | ^[str]                                                         | 'fixed'  |
| width           | 宽度                   | ^[int, str]                                                    | None    |
| height          | 高度                   | ^[int, str]                                                    | None    |
| min_width       | 最小宽度               | ^[int]                                                         | None    |
| min_height      | 最小高度               | ^[int]                                                         | None    |
| max_width       | 最大宽度               | ^[int]                                                         | None    |
| max_height      | 最大高度               | ^[int]                                                         | None    |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

## Controls

```python
##controls
import panel as pn
import holoviews as hv

# hv.extension("bokeh")

import numpy as np
import pandas as pd
import hvplot.pandas

data = {"group": np.random.randint(0, 10, 100), "value": np.random.randn(100)}
df = pd.DataFrame(data)
plot = df.hvplot.scatter(x="group", y="value", height=300, responsive=True)
h = pn.pane.HoloViews(plot, height=300)
pn.Row(h.controls, h)
```
