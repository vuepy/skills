---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Plotly 图表

`PnPlotly` 组件允许在 Panel 应用程序中显示 [Plotly 图表](https://plotly.com/python/)。它通过对 Plotly 对象中包含的数组数据使用二进制序列化来提高图表更新速度。

请注意，要在 Jupyter 笔记本中使用 Plotly 组件，必须激活 Panel 扩展并包含 `"plotly"` 作为参数。这一步确保正确设置 plotly.js。

底层实现为`panel.pane.Plotly`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/Plotly.html

## 基本用法

让我们创建一个基本示例：

创建后，`PnPlotly` 组件可以通过分配新的图形对象来更新：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnButton @click="update_fig()">Update</PnButton>
  <PnPlotly :object="fig.value"/>
</template>
<script lang='py'>
from vuepy import ref
import numpy as np
import plotly.graph_objs as go

xx = np.linspace(-3.5, 3.5, 100)
yy = np.linspace(-3.5, 3.5, 100)
x, y = np.meshgrid(xx, yy)
z = np.exp(-((x - 1) ** 2) - y**2) - (x**3 + y**4 - x / 5) * np.exp(-(x**2 + y**2))

surface = go.Surface(z=z)
fig = go.Figure(data=[surface])

fig.update_layout(
    title="Plotly 3D",
    width=500,
    height=500,
    margin=dict(t=50, b=50, r=50, l=50),
)
fig = ref(fig)

def update_fig():
    new_fig = go.Figure(data=[go.Surface(z=np.sin(z+1))])
    new_fig.update_layout(
        title="Update Plotly 3D",
        width=500,
        height=500,
        margin=dict(t=50, b=50, r=50, l=50),
    )
    fig.value = new_fig
</script>
```

## 布局示例

`PnPlotly` 组件支持任意复杂度的布局和子图，允许显示即使是深度嵌套的 Plotly 图形：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnPlotly :object="fig_layout" />
</template>
<script lang='py'>
import numpy as np
import plotly.graph_objs as go
from plotly import subplots

heatmap = go.Heatmap(
    z=[[1, 20, 30],
       [20, 1, 60],
       [30, 60, 1]],
    showscale=False)

y0 = np.random.randn(50)
y1 = np.random.randn(50)+1

box_1 = go.Box(y=y0)
box_2 = go.Box(y=y1)
data = [heatmap, box_1, box_2]

fig_layout = subplots.make_subplots(
    rows=2, cols=2, specs=[[{}, {}], [{'colspan': 2}, None]],
    subplot_titles=('first subplot','second subplot', 'third subplot')
)

fig_layout.append_trace(box_1, 1, 1)
fig_layout.append_trace(box_2, 1, 2)
fig_layout.append_trace(heatmap, 2, 1)

fig_layout['layout'].update(height=600, width=600, title='i <3 subplots')
</script>
```

## 响应式图表

通过在 Plotly 布局上使用 `autosize` 选项和 `PnPlotly` 组件的响应式 `sizing_mode` 参数，可以使 Plotly 图表具有响应性：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnCol name="## A responsive plot" sizing_mode="stretch_width">
    <PnPlotly :object="fig_responsive" :height="300" sizing_mode="stretch_width" />
  </PnCol>
</template>
<script lang='py'>
import pandas as pd
import plotly.express as px

data = pd.DataFrame([
    ('Monday', 7), ('Tuesday', 4), ('Wednesday', 9), ('Thursday', 4),
    ('Friday', 4), ('Saturday', 4), ('Sunday', 4)], columns=['Day', 'Orders']
)

fig_responsive = px.line(data, x="Day", y="Orders")
fig_responsive.update_traces(mode="lines+markers", marker=dict(size=10), line=dict(width=4))
fig_responsive.layout.autosize = True
</script>
```

## 图表配置

您可以通过 `config` 参数设置 [Plotly 配置选项](https://plotly.com/javascript/configuration-options/)。让我们尝试配置 `scrollZoom`：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnCol name="## A responsive and scroll zoomable plot" 
         sizing_mode="stretch_width">
    <PnPlotly 
      :object="fig_responsive" 
      :config="{'scrollZoom': True}" 
      :height="300" 
      sizing_mode="stretch_width" />
  </PnCol>
</template>
<script lang='py'>
import pandas as pd
import plotly.express as px

data = pd.DataFrame([
    ('Monday', 7), ('Tuesday', 4), ('Wednesday', 9), ('Thursday', 4),
    ('Friday', 4), ('Saturday', 4), ('Sunday', 4)], columns=['Day', 'Orders']
)

fig_responsive = px.line(data, x="Day", y="Orders")
fig_responsive.update_traces(mode="lines+markers", marker=dict(size=10), line=dict(width=4))
fig_responsive.layout.autosize = True
</script>
```

尝试在图表上用鼠标滚动！

## 增量更新

您可以通过使用字典而不是 Plotly Figure 对象来高效地增量更新轨迹或布局，而不是更新整个 Figure。

请注意，增量更新只有在将 `Figure` 定义为字典时才会高效，因为 Plotly 会复制轨迹，这意味着原地修改它们没有效果。修改数组将仅发送该数组（使用二进制协议），从而实现快速高效的更新。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnPlotly :object="fig_patch" ref="plotly_pane_patch" />
  <PnRow>
    <PnButton @click="update_z()">更新数据</PnButton>
    <PnButton @click="update_layout()">更新布局</PnButton>
    <PnButton @click="reset()">重置</PnButton>
  </PnRow>
</template>
<script lang='py'>
import numpy as np
import plotly.graph_objs as go
from vuepy import ref

xx = np.linspace(-3.5, 3.5, 100)
yy = np.linspace(-3.5, 3.5, 100)
x, y = np.meshgrid(xx, yy)
z = np.exp(-((x - 1) ** 2) - y**2) - (x**3 + y**4 - x / 5) * np.exp(-(x**2 + y**2))

surface = go.Surface(z=z)
layout = go.Layout(
    title='Plotly 3D 图表',
    autosize=False,
    width=500,
    height=500,
    margin=dict(t=50, b=50, r=50, l=50)
)

fig_patch = dict(data=[surface], layout=layout)
plotly_pane_patch = ref(None)

def update_z():
    surface.z = np.sin(z+1)
    plotly_pane_patch.value.unwrap().object = fig_patch
    
def update_layout():
    fig_patch['layout']['width'] = 800
    plotly_pane_patch.value.unwrap().object = fig_patch
    
def reset():
    surface.z = z
    fig_patch['layout']['width'] = 500
    plotly_pane_patch.value.unwrap().object = fig_patch
</script>
```

## 事件处理

`PnPlotly` 组件提供对 [Plotly 事件](https://plotly.com/javascript/plotlyjs-events/)的访问，如点击、悬停和选择(使用`Box Select`、`Lasso Select`工具)等：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnPlotly :object="fig" ref="plotly_ref" 
            @click='on_click'
            @selected='on_selected'
  />
</template>
<script lang='py'>
import numpy as np
import plotly.express as px
from vuepy import ref, onMounted

# 创建一些示例数据
df = px.data.iris()

# 创建散点图
fig = px.scatter(
    df, x="sepal_width", y="sepal_length", 
    color="species", size="petal_length",
    hover_data=["petal_width"]
)

# 事件数据引用
click_data = ref({})
hover_data = ref({})
plotly_ref = ref(None)

def on_click(event):
    if not event:
        return
    print(event.new['points']) # [{'curveNumber': 2, 'pointNumber': 31, 
                               #   'pointIndex': 31, 'x': 3.8, 'y': 7.9, 
                               #   'marker.size': 6.4, 'customdata': [2]}]
    click_data.value = event.new['points']
    
def on_selected(event):
    if not event:
        return
    print(event.new['points']) # [{'curveNumber': 2, 'pointNumber': 31, ...
</script>
```

## API

### 属性

| 属性名                      | 说明                          | 类型                                                           | 默认值 |
| -------------------------- | ----------------------------- | ---------------------------------------------------------------| ------- |
| object                     | 正在显示的 Plotly `Figure` 或字典对象 | ^[object]                                              | None |
| config                     | 图表的额外配置。参见 [Plotly 配置选项](https://plotly.com/javascript/configuration-options/) | ^[dict] | {} |
| link_figure                | 当 Plotly `Figure` 原地修改时更新显示的 Plotly 图表 | ^[boolean]                            | True |
| click_data                 | 来自 `plotly_click` 事件的点击事件数据 | ^[dict]                                                | {} |
| clickannotation_data       | 来自 `plotly_clickannotation` 事件的点击注释事件数据 | ^[dict]                           | {} |
| hover_data                 | 来自 `plotly_hover` 和 `plotly_unhover` 事件的悬停事件数据 | ^[dict]                       | {} |
| relayout_data              | 来自 `plotly_relayout` 事件的重新布局事件数据 | ^[dict]                                   | {} |
| restyle_data               | 来自 `plotly_restyle` 事件的重新样式事件数据 | ^[dict]                                    | {} |
| selected_data              | 来自 `plotly_selected` 和 `plotly_deselect` 事件的选择事件数据 | ^[dict]                  | {} |
| viewport                   | 当前视口状态，即显示图表的 x 和 y 轴限制。在 `plotly_relayout`、`plotly_relayouting` 和 `plotly_restyle` 事件时更新 | ^[dict] | {} |
| viewport_update_policy     | 用户交互期间更新视口参数的策略 | ^[str]                                                        | 'mouseup' |
| viewport_update_throttle   | 当 viewport_update_policy 为 "throttle" 时，视口更新同步的时间间隔（毫秒） | ^[int]              | 200 |
| sizing_mode                | 尺寸调整模式                   | ^[str]                                                         | 'fixed'  |
| width                      | 宽度                          | ^[int, str]                                                    | None    |
| height                     | 高度                          | ^[int, str]                                                    | None    |
| min_width                  | 最小宽度                      | ^[int]                                                         | None    |
| min_height                 | 最小高度                      | ^[int]                                                         | None    |
| max_width                  | 最大宽度                      | ^[int]                                                         | None    |
| max_height                 | 最大高度                      | ^[int]                                                         | None    |
| margin                     | 外边距                        | ^[int, tuple]                                                  | 5       |
| css_classes                | CSS类名列表                   | ^[list]                                                        | []      |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| click  | 当元素被点击时触发的事件 | ^[Callable]`(Event) -> None`    |
| hover | 当元素被鼠标覆盖时触发 | ^[Callable]`(Event) -> None`    |
| selected | 当元素被`Box Select`、`Lasso Select`工具选中时触发 | ^[Callable]`(Event) -> None`    |
| doubleclick  | 当元素被双击时触发的事件 | ^[Callable]`(Event) -> None`    |
| clickannotation | 当元素被鼠标覆盖时触发 | ^[Callable]`(Event) -> None`    |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

## Controls

```python
##controls
import panel as pn
import numpy as np
import plotly.graph_objs as go

pn.extension("plotly")

xx = np.linspace(-3.5, 3.5, 100)
yy = np.linspace(-3.5, 3.5, 100)
x, y = np.meshgrid(xx, yy)
z = np.exp(-((x - 1) ** 2) - y**2) - (x**3 + y**4 - x / 5) * np.exp(-(x**2 + y**2))

surface=go.Surface(z=z)
fig = go.Figure(data=[surface])

fig.update_layout(
    title="Plotly 3D Plot",
    width=500,
    height=500,
    margin=dict(t=50, b=50, r=50, l=50),
)

plotly_pane = pn.pane.Plotly(fig)
# dir(plotly_pane.param)
pn.Column(plotly_pane, plotly_pane.controls)
```
