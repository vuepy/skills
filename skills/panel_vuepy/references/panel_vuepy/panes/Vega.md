---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Vega 图表

`PnVega` 组件可以渲染基于 Vega 的图表（包括来自 Altair 的图表）。它通过对 Vega/Altair 对象中的数组数据使用二进制序列化来优化图表渲染，与 Vega 原生使用的标准 JSON 序列化相比，提供了显著的加速。请注意，要在 Jupyter 笔记本中使用 `PnVega` 组件，必须使用 'vega' 作为参数加载 Panel 扩展，以确保正确初始化 vega.js。

底层实现为`panel.pane.Vega`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/Vega.html

## 基本用法

`PnVega` 组件支持 [`vega`](https://vega.github.io/vega/docs/specification/) 和 [`vega-lite`](https://vega.github.io/vega-lite/docs/spec.html) 规范，可以以原始形式（即字典）提供，或者通过定义一个 `altair` 图表。

### Vega 和 Vega-lite

要显示 `vega` 和 `vega-lite` 规范，只需直接构造一个 `PnVega` 组件：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnVega :object="vegalite" :height="240" />
</template>
<script lang='py'>
vegalite = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": {"url": "https://raw.githubusercontent.com/vega/vega/master/docs/data/barley.json"},
  "mark": "bar",
  "encoding": {
    "x": {"aggregate": "sum", "field": "yield", "type": "quantitative"},
    "y": {"field": "variety", "type": "nominal"},
    "color": {"field": "site", "type": "nominal"}
  }
}
</script>
```

与所有其他组件一样，`PnVega` 组件的 `object` 可以更新：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnCol>
  <PnVega :object="dict(chart.value)" />
  <PnButton @click="update_chart()">更新图表</PnButton>
</PnCol>
</template>
<script lang='py'>
from vuepy import ref

chart = ref({
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": {"url": "https://raw.githubusercontent.com/vega/vega/master/docs/data/barley.json"},
  "mark": "bar",
  "encoding": {
    "x": {"aggregate": "sum", "field": "yield", "type": "quantitative"},
    "y": {"field": "variety", "type": "nominal"},
    "color": {"field": "site", "type": "nominal"}
  }
})

def update_chart():
    chart.value.mark = 'area'
</script>
```

### 响应式大小调整

`vega-lite` 规范还可以通过将宽度或高度声明为匹配容器来进行响应式大小调整：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVega :object="responsive_spec" />
</template>
<script lang='py'>
responsive_spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": {
    "url": "https://raw.githubusercontent.com/vega/vega/master/docs/data/disasters.csv"
  },
  "width": "container",
  "title": "响应式图表",
  "transform": [
    {"filter": "datum.Entity !== 'All natural disasters'"}
  ],
  "mark": {
    "type": "circle",
    "opacity": 0.8,
    "stroke": "black",
    "strokeWidth": 1
  },
  "encoding": {
    "x": {
        "field": "Year",
        "type": "quantitative",
        "axis": {"labelAngle": 90},
        "scale": {"zero": False}
    },
    "y": {
        "field": "Entity",
        "type": "nominal",
        "axis": {"title": ""}
    },
    "size": {
      "field": "Deaths",
      "type": "quantitative",
      "legend": {"title": "全球年度死亡人数", "clipHeight": 30},
      "scale": {"range": [0, 5000]}
    },
    "color": {"field": "Entity", "type": "nominal", "legend": None}
  }
}
</script>
```

请注意，`vega` 规范不支持将 `width` 和 `height` 设置为 `container`。

### DataFrame 数据值

为了方便起见，我们支持将 Pandas DataFrame 作为 `data` 的 `values`：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVega :object="dataframe_spec" />
</template>
<script lang='py'>
import pandas as pd

dataframe_spec = {
    "title": "从 Pandas DataFrame 创建的简单条形图",
    'config': {
        'mark': {'tooltip': None},
        'view': {'height': 200, 'width': 500}
    },
    'data': {'values': pd.DataFrame({'x': ['A', 'B', 'C', 'D', 'E'], 'y': [5, 3, 6, 7, 2]})},
    'mark': 'bar',
    'encoding': {'x': {'type': 'ordinal', 'field': 'x'},
                 'y': {'type': 'quantitative', 'field': 'y'}},
    '$schema': 'https://vega.github.io/schema/vega-lite/v3.2.1.json'
}
</script>
```

## Altair

定义 Vega 图表的一种更便捷的方式是使用 [altair](https://altair-viz.github.io)，它在 vega-lite 之上提供了声明式 API。`PnVega` 组件在传入 Altair 图表时会自动渲染 Vega-Lite 规范：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVega :object="chart" />
</template>
<script lang='py'>
import altair as alt
from vega_datasets import data

cars = data.cars()

chart = alt.Chart(cars).mark_circle(size=60).encode(
    x='Horsepower',
    y='Miles_per_Gallon',
    color='Origin',
    tooltip=['Name', 'Origin', 'Horsepower', 'Miles_per_Gallon']
).interactive()
</script>
```

Altair 图表也可以通过更新组件的 `object` 来更新：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnCol>
  <PnVega :object="chart.value" />
  <PnButton @click="update_chart()">更新图表</PnButton>
</PnCol>
</template>
<script lang='py'>
import altair as alt
from vega_datasets import data
from vuepy import ref

cars = data.cars()

chart = ref(alt.Chart(cars).mark_circle(size=60).encode(
    x='Horsepower',
    y='Miles_per_Gallon',
    color='Origin',
    tooltip=['Name', 'Origin', 'Horsepower', 'Miles_per_Gallon']
).interactive())

def update_chart():
    # refs['altair_pane'].object = chart.mark_circle(size=100)
    chart.value = chart.value.mark_circle(size=200)
</script>
```

Altair 支持的所有常规布局和组合操作符也可以渲染：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVega :object="combined_chart" />
</template>
<script lang='py'>
import altair as alt

penguins_url = "https://raw.githubusercontent.com/vega/vega/master/docs/data/penguins.json"

chart1 = alt.Chart(penguins_url).mark_point().encode(
    x=alt.X('Beak Length (mm):Q', scale=alt.Scale(zero=False)),
    y=alt.Y('Beak Depth (mm):Q', scale=alt.Scale(zero=False)),
    color='Species:N'
).properties(
    height=300,
    width=300,
)

chart2 = alt.Chart(penguins_url).mark_bar().encode(
    x='count()',
    y=alt.Y('Beak Depth (mm):Q', bin=alt.Bin(maxbins=30)),
    color='Species:N'
).properties(
    height=300,
    width=100
)

combined_chart = chart1 | chart2
</script>
```

## 选择

`PnVega` 组件自动同步在 Vega/Altair 图表上表达的任何选择。目前支持三种类型的选择：

- `selection_interval`：允许使用框选工具选择区间，以 `{<x轴名称>: [x最小值, x最大值], <y轴名称>: [y最小值, y最大值]}` 的形式返回数据
- `selection_single`：允许使用点击选择单个点，返回整数索引列表
- `selection_multi`：允许使用（shift+）点击选择多个点，返回整数索引列表

### 区间选择

作为一个例子，我们可以在图表中添加一个 Altair `selection_interval` 选择：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnVega :object="chart" :debounce="10" ref='vega'/>
  <PnColumn>
    <h3>选择数据：</h3>
    <PnJSON :object="selection_data.value" />
  </PnColumn>
</template>
<script lang='py'>
import altair as alt
from vuepy import ref, onMounted

penguins_url = "https://raw.githubusercontent.com/vega/vega/master/docs/data/penguins.json"

brush = alt.selection_interval(name='brush')  # 区间类型的选择

chart = alt.Chart(penguins_url).mark_point().encode(
    x=alt.X('Beak Length (mm):Q', scale=alt.Scale(zero=False)),
    y=alt.Y('Beak Depth (mm):Q', scale=alt.Scale(zero=False)),
    color=alt.condition(brush, 'Species:N', alt.value('lightgray'))
).properties(
    width=250,
    height=250
).add_params(
    brush
)

selection_data = ref(None)
vega = ref(None)

@onMounted
def on_render():
    vega_pane = vega.value.unwrap()
    
    def on_selection_change(event):
        print(event)
        selection_data.value = event.new
        
    # todo
    vega_pane.param.watch(on_selection_change, 'selection')
    
</script>
```

请注意，我们指定了一个单一的 `debounce` 值，如果我们声明多个选择，可以通过将其指定为字典来为每个命名事件声明一个去抖动值，例如 `debounce={'brush': 10, ...}`。

## 主题

可以使用 `theme` 参数为图表应用主题：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVega :object="chart" theme="dark" />
</template>
<script lang='py'>
import altair as alt
from vega_datasets import data

cars = data.cars()

chart = alt.Chart(cars).mark_circle(size=60).encode(
    x='Horsepower',
    y='Miles_per_Gallon',
    color='Origin',
    tooltip=['Name', 'Origin', 'Horsepower', 'Miles_per_Gallon']
).interactive()
</script>
```

## API

### 属性

| 属性名        | 说明                          | 类型                                                           | 默认值 |
| ------------ | ----------------------------- | ---------------------------------------------------------------| ------- |
| object       | 包含 Vega 或 Vega-Lite 图表规范的字典，或者是 Altair 图表 | ^[dict, object]                  | None |
| debounce     | 应用于选择事件的去抖延迟时间，可以指定为单个整数值（以毫秒为单位）或声明每个事件的去抖值的字典 | ^[int, dict] | None |
| theme        | 应用于图表的主题。必须是 'excel'、'ggplot2'、'quartz'、'vox'、'fivethirtyeight'、'dark'、'latimes'、'urbaninstitute' 或 'googlecharts' 之一 | ^[str] | None |
| show_actions | 是否显示图表操作菜单，如保存、编辑等 | ^[boolean]                                               | True |
| selection    | Selection 对象公开反映图表上声明的选择到 Python 中的参数 | ^[object]                         | None |
| sizing_mode  | 尺寸调整模式                   | ^[str]                                                         | 'fixed'  |
| width        | 宽度                          | ^[int, str]                                                    | None    |
| height       | 高度                          | ^[int, str]                                                    | None    |
| min_width    | 最小宽度                      | ^[int]                                                         | None    |
| min_height   | 最小高度                      | ^[int]                                                         | None    |
| max_width    | 最大宽度                      | ^[int]                                                         | None    |
| max_height   | 最大高度                      | ^[int]                                                         | None    |
| margin       | 外边距                        | ^[int, tuple]                                                  | 5       |
| css_classes  | CSS类名列表                   | ^[list]                                                        | []      |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

## Controls

```python
##controls
import panel as pn
import pandas as pd
import altair as alt
from vega_datasets import data

pn.extension('vega')

cars = data.cars()

chart = alt.Chart(cars).mark_circle(size=60).encode(
    x='Horsepower',
    y='Miles_per_Gallon',
    color='Origin',
    tooltip=['Name', 'Origin', 'Horsepower', 'Miles_per_Gallon']
).interactive()

vega_pane = pn.pane.Vega(chart)
# pn.Column(vega_pane, vega_pane.controls)
```
