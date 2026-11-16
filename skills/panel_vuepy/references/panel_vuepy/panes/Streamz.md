---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Streamz 数据流组件

`PnStreamz` 组件可以渲染 [Streamz](https://streamz.readthedocs.io/en/latest/) Stream 对象发出的任意对象，与专门处理 streamz DataFrame 和 Series 对象并公开各种格式化选项的 `DataFrame` 组件不同。

底层实现为`panel.pane.Streamz`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/Streamz.html

## 基本用法

> **注意**：如果您尚未使用 Streamz 库，我们建议使用 Param 和 Panel 生态系统中的功能，例如[反应式表达式](https://param.holoviz.org/user_guide/Reactive_Expressions.html)、[生成器函数](https://param.holoviz.org/user_guide/Generators.html)和/或*周期性回调*。我们发现这些功能得到更加可靠的支持。

`PnStreamz` 组件使用默认的 Panel 解析方式来确定如何渲染 Stream 返回的对象。默认情况下，该组件只有在显示时才会监视 `Stream`，我们可以通过设置 `always_watch=True` 让它在创建后立即开始监视流：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnStreamz :object="stream_map.value" :always_watch="True"/>
</template>
<script lang='py'>
from vuepy import ref, onMounted
from streamz import Stream

def increment(x):
    return x + 1

source = Stream()
stream_map = ref(source.map(increment))

# 注意：为了确保流的静态渲染显示内容
# 我们设置 always_watch=True 并在显示前发出一个事件
@onMounted
def emit():
    source.emit(1)
</script>
```

现在我们可以定义一个周期性回调，它在 `Stream` 上发出递增的计数：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnStreamz :object="stream_map" :always_watch="True" ref="streamz_pane" />
  <PnButton @click="start_emit()">开始发送数据</PnButton>
  <PnButton @click="stop_emit()">停止发送数据</PnButton>
</template>
<script lang='py'>
from vuepy import ref, onMounted
from streamz import Stream
import panel as pn

def increment(x):
    return x + 1

source = Stream()
stream_map = source.map(increment)
streamz_pane = ref(None)

# 为了确保流的静态渲染显示内容
@onMounted
def emit():
    source.emit(1)

count = 1
callback = None

def emit_count():
    nonlocal count
    count += 1
    source.emit(count)

def start_emit():
    nonlocal callback
    if callback is None or not callback.running:
        callback = pn.state.add_periodic_callback(emit_count, period=100)

def stop_emit():
    nonlocal callback
    if callback and callback.running:
        callback.stop()
</script>
```

## 复杂数据流

`PnStreamz` 组件可以用于流式传输任何类型的数据。例如，我们可以创建一个 streamz DataFrame，将数据累积到滑动窗口中，然后将其映射到 Altair `line_plot` 函数：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnStreamz 
    :object="altair_stream" 
    :height="350" 
    :sizing_mode="'stretch_width'" 
    :always_watch="True" 
    ref="altair_pane" />
  <PnButton @click="start_emit()">开始发送数据</PnButton>
  <PnButton @click="stop_emit()">停止发送数据</PnButton>
</template>
<script lang='py'>
from vuepy import ref
import numpy as np
import altair as alt
import pandas as pd
from datetime import datetime
from streamz.dataframe import DataFrame as sDataFrame
import panel as pn

altair_pane = ref(None)

# 创建一个 streamz DataFrame
df = sDataFrame(example=pd.DataFrame({'y': []}, index=pd.DatetimeIndex([])))

def line_plot(data):
    return alt.Chart(pd.concat(data).reset_index()).mark_line().encode(
        x='index',
        y='y',
    ).properties(width="container")

# 创建累积数据的流，使用滑动窗口，并映射到图表函数
altair_stream = df.cumsum().stream.sliding_window(50).map(line_plot)

# 初始数据
for i in range(20):
    df.emit(pd.DataFrame({'y': [np.random.randn()]}, index=pd.DatetimeIndex([datetime.now()])))

callback = None

def emit():
    df.emit(pd.DataFrame({'y': [np.random.randn()]}, index=pd.DatetimeIndex([datetime.now()])))

def start_emit():
    nonlocal callback
    if callback is None or not callback.running:
        callback = pn.state.add_periodic_callback(emit, period=500)

def stop_emit():
    nonlocal callback
    if callback and callback.running:
        callback.stop()
</script>
```

## API

### 属性

| 属性名            | 说明                          | 类型                                                           | 默认值 |
| ---------------- | ----------------------------- | ---------------------------------------------------------------| ------- |
| object           | 被监视的 streamz.Stream 对象    | ^[streamz.Stream]                                              | None |
| always_watch     | 是否在未显示时也监视流         | ^[bool]                                                        | False |
| rate_limit       | 事件之间的最小间隔（秒）       | ^[float]                                                       | 0.1 |
| sizing_mode      | 尺寸调整模式                  | ^[str]                                                         | 'fixed'  |
| width            | 宽度                          | ^[int, str]                                                    | None    |
| height           | 高度                          | ^[int, str]                                                    | None    |
| min_width        | 最小宽度                      | ^[int]                                                         | None    |
| min_height       | 最小高度                      | ^[int]                                                         | None    |
| max_width        | 最大宽度                      | ^[int]                                                         | None    |
| max_height       | 最大高度                      | ^[int]                                                         | None    |
| margin           | 外边距                        | ^[int, tuple]                                                  | 5       |
| css_classes      | CSS类名列表                   | ^[list]                                                        | []      |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

```python
##controls
import panel as pn
import numpy as np
import pandas as pd
from datetime import datetime
from streamz import Stream

pn.extension('vega')

def increment(x):
    return x + 1

source = Stream()

streamz_pane = pn.pane.Streamz(source.map(increment), always_watch=True)

# 注意：为了确保流的静态渲染显示内容
# 我们设置 always_watch=True 并在显示前发出一个事件
source.emit(1)

pn.Row(streamz_pane.controls(), streamz_pane)
```
