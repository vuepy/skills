---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# ECharts 图表

`PnECharts` 组件在 Panel 中渲染 [Apache ECharts](https://echarts.apache.org/en/index.html) 和 [pyecharts](https://pyecharts.org/#/) 图表。请注意，要在 notebook 中使用 `PnECharts` 组件，必须以 'echarts' 作为参数加载 Panel 扩展，以确保初始化 echarts.js。

底层实现为`panel.pane.ECharts`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/ECharts.html

## 基本用法

让我们尝试 `PnECharts` 组件对 ECharts 规范的原始形式（即字典）的支持，例如，这里我们声明一个柱状图：

```vue
<!-- --plugins vpanel --show-code --codege-backend='panel' -->
<template>
  <PnECharts :object="echart_bar" :height="480" :width="640" />
</template>
<script lang='py'>
echart_bar = {
    'title': {
        'text': 'ECharts entry example'
    },
    'tooltip': {},
    'legend': {
        'data': ['Sales']
    },
    'xAxis': {
        'data': ["shirt", "cardign", "chiffon shirt", "pants", "heels", "socks"]
    },
    'yAxis': {},
    'series': [{
        'name': 'Sales',
        'type': 'bar',
        'data': [5, 20, 36, 10, 10, 20]
    }],
}
</script>
```

与所有其他组件一样，`PnECharts` 组件的 `object` 可以更新，要么是就地更新并触发更新：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnECharts :object="echart_bar" :height="480" :width="640" ref="echart_pane_ref" />
  <PnButton @click="change_to_line()">更改为折线图</PnButton>
  <PnButton @click="change_to_bar()">更改为柱状图</PnButton>
</template>
<script lang='py'>
from vuepy import ref

echart_pane_ref = ref(None)

echart_bar = {
    'title': {
        'text': 'ECharts entry example'
    },
    'tooltip': {},
    'legend': {
        'data': ['Sales']
    },
    'xAxis': {
        'data': ["shirt", "cardign", "chiffon shirt", "pants", "heels", "socks"]
    },
    'yAxis': {},
    'series': [{
        'name': 'Sales',
        'type': 'bar',
        'data': [5, 20, 36, 10, 10, 20]
    }],
}

def change_to_line():
    echart_bar['series'] = [dict(echart_bar['series'][0], type='line')]
    echart_pane_ref.value.unwrap().param.trigger('object')
    
def change_to_bar():
    echart_bar['series'] = [dict(echart_bar['series'][0], type='bar')]
    echart_pane_ref.value.unwrap().param.trigger('object')
</script>
```

ECharts 规范也可以通过声明宽度或高度以匹配容器来进行响应式调整大小：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnECharts :object="responsive_spec" :width='600' :height="400" />
</template>
<script lang='py'>
echart_bar = {
    'title': {
        'text': 'ECharts entry example'
    },
    'tooltip': {},
    'legend': {
        'data': ['Sales']
    },
    'xAxis': {
        'data': ["shirt", "cardign", "chiffon shirt", "pants", "heels", "socks"]
    },
    'yAxis': {},
    'series': [{
        'name': 'Sales',
        'type': 'bar',
        'data': [5, 20, 36, 10, 10, 20]
    }],
}

# todo 没有显示
responsive_spec = dict(echart_bar, responsive=True)
</script>
```

## PyECharts 支持

ECharts 组件还支持 pyecharts。例如，我们可以直接将 `pyecharts.charts.Bar` 图表传递给 `PnECharts` 组件：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol>
    <PnIntSlider v-model="bar1.value" name='Bar 1' :start="1" :end="100" />
    <PnIntSlider v-model="bar2.value" name='Bar 2' :start="1" :end="100" />
  </PnCol>
  <PnECharts :object="plot.value" :width="500" :height="250" />
</template>
<script lang='py'>
from vuepy import ref, computed
from pyecharts.charts import Bar

bar1 = ref(50)
bar2 = ref(50)

@computed
def plot():
    my_plot = (Bar()
               .add_xaxis(['Helicoptors', 'Planes'])
               .add_yaxis('Total In Flight', [bar1.value, bar2.value])
               )
    return my_plot
</script>
```

## 仪表盘示例

ECharts 库支持各种图表类型，由于图表使用 JSON 数据结构表示，我们可以轻松更新数据，然后发出更改事件以更新图表：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnColumn>
    <PnIntSlider v-model='value.value' name='Value' 
                 :start="0" :end="100" ref='slider_ref'/>
    <PnECharts :object="gauge" :width="400" :height="400" 
               ref="gauge_pane_ref" />
  </PnColumn>
</template>
<script lang='py'>
from vuepy import ref, watch, onMounted

value = ref(50)
gauge_pane_ref = ref(None)
slider_ref = ref(None)

gauge = {
    'tooltip': {
        'formatter': '{a} <br/>{b} : {c}%'
    },
    'series': [
        {
            'name': 'Gauge',
            'type': 'gauge',
            'detail': {'formatter': '{value}%'},
            'data': [{'value': 50, 'name': 'Value'}]
        }
    ]
}

@onMounted
def update_gauge():
    gauge_pane = gauge_pane_ref.value.unwrap()
    slider = slider_ref.value.unwrap()
    slider.jscallback(
        args={'gauge': gauge_pane}, 
        value="""
            gauge.data.series[0].data[0].value = cb_obj.value
            gauge.properties.data.change.emit()
        """
    )
</script>
```

## 事件处理

`PnECharts` 组件允许您监听 JavaScript API 中定义的任何事件，方法是使用 `on_event` 方法在 Python 中监听事件，或者使用 `js_on_event` 方法触发 JavaScript 回调。

有关可以监听的事件的详细信息，请参阅 [ECharts 事件文档](https://echarts.apache.org/handbook/en/concepts/event)。

### Python 事件处理

让我们从一个简单的点击事件开始，我们想从 Python 监听这个事件。要添加事件监听器，只需使用事件类型（在本例中为 'click'）和 Python 处理程序调用 `on_event` 方法：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
<PnRow>
  <PnECharts :object="echart_bar" :height="480" :width="640" 
             @click='on_click' />
  <PnJson :object="event_data.value" name="JSON" />
</PnRow>
</template>
<script lang='py'>
from vuepy import shallowRef

echart_bar = {
    'title': {
        'text': 'ECharts entry example'
    },
    'tooltip': {},
    'legend': {
        'data': ['Sales']
    },
    'xAxis': {
        'data': ["shirt", "cardign", "chiffon shirt", "pants", "heels", "socks"]
    },
    'yAxis': {},
    'series': [{
        'name': 'Sales',
        'type': 'line',
        'data': [5, 20, 36, 10, 10, 20]
    }],
}

event_data = shallowRef({})

def on_click(event):
    event_data.value = event.data
</script>
```

尝试单击折线上的点。点击后检查 `event_data.value` 时，您应该看到类似以下内容的数据。

要限制特定事件适用的对象类型，还可以向 `on_event` 方法提供 `query` 参数。`query` 的格式应该是 `mainType` 或 `mainType.subType`，例如：

- `'series'`：单击数据系列时触发事件
- `'series.line'`：仅当单击折线数据系列时才触发事件
- `'dataZoom'`：单击缩放时触发事件
- `'xAxis.category'`：单击 x 轴上的类别时触发事件

### JavaScript 事件处理

相同的概念适用于 JavaScript，但这里我们传入 JavaScript 代码片段。命名空间允许您访问事件数据 `cb_data` 和 ECharts 图表本身作为 `cb_obj`。这样，您可以访问事件并自己操作图表：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnECharts :object="echart_bar" :height="480" :width="640" 
             @jsclick='on_jsclick()' />
</template>
<script lang='py'>
from vuepy import ref, onMounted

echart_pane_ref = ref(None)
echart_bar = {
    'title': {
        'text': 'ECharts entry example'
    },
    'tooltip': {},
    'legend': {
        'data': ['Sales']
    },
    'xAxis': {
        'data': ["shirt", "cardign", "chiffon shirt", "pants", "heels", "socks"]
    },
    'yAxis': {},
    'series': [{
        'name': 'Sales',
        'type': 'line',
        'data': [5, 20, 36, 10, 10, 20]
    }],
}

def on_jsclick():
    return "alert(`Clicked on point: ${cb_data.dataIndex + 1}`)"

</script>
```

## API

### 属性

| 属性名      | 说明                 | 类型                                                           | 默认值 |
| ---------- | ------------------- | ---------------------------------------------------------------| ------- |
| object     | 以 Python 字典表示的 ECharts 图表规范，然后转换为 JSON。或者是像 `pyecharts.charts.Bar` 这样的 pyecharts 图表。 | ^[dict, object] | None |
| options    | 传递给 [`Echarts.setOption`](https://echarts.apache.org/en/api.html#echartsInstance.setOption) 的可选字典选项。允许微调渲染行为。 | ^[dict] | None |
| renderer   | 是否使用 HTML 'canvas'（默认）或 'svg' 渲染 | ^[str] | 'canvas' |
| theme      | 应用于图表的主题（'default'、'dark'、'light' 之一） | ^[str] | 'default' |
| sizing_mode | 尺寸调整模式         | ^[str]                                                         | 'fixed'  |
| width      | 宽度                 | ^[int, str]                                                    | None    |
| height     | 高度                 | ^[int, str]                                                    | None    |
| min_width  | 最小宽度             | ^[int]                                                         | None    |
| min_height | 最小高度             | ^[int]                                                         | None    |
| max_width  | 最大宽度             | ^[int]                                                         | None    |
| max_height | 最大高度             | ^[int]                                                         | None    |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| click  | 当元素被点击时触发的事件 | ^[Callable]`(Event) -> None`    |
| jsclick  | 当元素被点击时触发的js事件 | ^[Callable]`() -> Str`    |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

### 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| on_event | 添加事件监听器 | ^[function] `(event_type: str, callback: Callable, query: str = None) -> None` |
| js_on_event | 添加 JavaScript 事件监听器 | ^[function] `(event_type: str, code: str, **args) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension('echarts')

echart_bar = {
    'title': {
        'text': 'ECharts example'
    },
    'tooltip': {},
    'legend': {
        'data':['Sales']
    },
    'xAxis': {
        'data': ["shirt","cardign","chiffon shirt","pants","heels","socks"]
    },
    'yAxis': {},
    'series': [{
        'name': 'Sales',
        'type': 'bar',
        'data': [5, 20, 36, 10, 10, 20]
    }],
};
echart_pane = pn.pane.ECharts(echart_bar, height=400, width=400)
pn.Column(echart_pane, echart_pane.controls)
```
