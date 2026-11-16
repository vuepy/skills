---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Trend 趋势指示器

趋势指示器提供了一个值及其最近趋势的可视化表示。它支持向图表组件流式传输数据，使得能够对某个值的最近趋势提供高性能的实时更新。

底层实现为`panel.widgets.Trend`，参数基本一致，参考文档：https://panel.holoviz.org/reference/indicators/Trend.html

## 基本用法

最简单的`Trend`只需要提供带有x和y值的`data`，可以声明为字典或`pandas.DataFrame`。`value`和`value_change`值将从数据中自动计算：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTrend 
    name="Price" 
    :data="data" 
    :width="200" 
    :height="200" 
  />
</template>

<script lang='py'>
import numpy as np

np.random.seed(8)
data = {'x': np.arange(50), 'y': np.random.randn(50).cumsum()}
</script>
```

## 数据流式传输

`Trend`指示器还提供了一个方便的方法来流式传输新数据，支持`rollover`参数来限制显示的数据量。我们将使用`setInterval`来定期更新图表：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol>
  <PnTrend 
    ref="trend_ref"
    name="Price" 
    :data="data" 
    :width="200" 
    :height="200" 
  />
  <PnButton name="Start Streaming" @click="start()" />
 </PnCol>
</template>

<script lang='py'>
import numpy as np
import panel as pn
from vuepy import ref

data = {'x': np.arange(10), 'y': np.random.randn(10).cumsum()}
interval_id = None
trend_ref = ref(None)

def stream_data():
    trend = trend_ref.value.unwrap()
    trend.stream({
        'x': [trend.data['x'][-1]+1],
        'y': [trend.data['y'][-1]+np.random.randn()]
    },  rollover=50)
    

def start():
    pn.state.add_periodic_callback(stream_data, period=250, count=15);
</script>
```

## 图表类型

除了默认的`plot_type`外，流指示器还支持其他几种选项：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnTrend 
      v-for="plot_type in plot_types"
      :name="plot_type" 
      :data="data" 
      :plot_type="plot_type"
      :width="150" 
      :height="150" 
    />
  </PnRow>
</template>

<script lang='py'>
import numpy as np

data = {'x': np.arange(50), 'y': np.random.randn(50).cumsum()}
plot_types = ['line', 'bar', 'step', 'area']
</script>
```

## API

### 属性

| 属性名        | 说明                      | 类型                                                           | 默认值 |
| ------------ | ------------------------ | --------------------------------------------------------------| ------- |
| data         | 图表数据                   | ^[object\|object[]] 字典或pandas DataFrame形式的数据            | —      |
| layout       | 指示器的布局               | ^[string] 可选值: 'column', 'row'                             | column  |
| plot_x       | 数据中对应图表x值的列       | ^[string]                                                      | y      |
| plot_y       | 数据中对应图表y值的列       | ^[string]                                                      | x      |
| plot_color   | 图表中使用的颜色            | ^[string]                                                      | #428bca |
| plot_type    | 绘制图表数据的图表类型      | ^[string] 可选值: 'line', 'bar', 'step', 'area'                | bar     |
| pos_color    | 用于指示正向变化的颜色      | ^[string]                                                      | #5cb85c |
| neg_color    | 用于指示负向变化的颜色      | ^[string]                                                      | #d9534f |
| value        | 要显示的主值               | ^[number\|string] 数字或"auto"                                 | auto    |
| value_change | 值变化表示为分数           | ^[number\|string] 数字或"auto"                                 | auto    |
| disabled     | 是否禁用                  | ^[boolean]                                                     | false   |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当值变化时触发的事件   | ^[Callable]`(event: dict) -> None`     |

### 方法

| 名称      | 说明                             | 参数                                                  |
| -------- | -------------------------------- | ----------------------------------------------------|
| stream   | 向图表流式传输新数据，支持限制显示的数据量 | data: 要添加的新数据, rollover: 保留的最大数据点数量    |

## Controls

```python
##controls
import panel as pn
import numpy as np
import pandas as pd

pn.extension()

data = {'x': np.arange(50), 'y': np.random.randn(50).cumsum()}

trend = pn.widgets.Trend(
    name='Price', data=data, width=200, height=200
)
pn.Row(trend.controls(), trend)
```
