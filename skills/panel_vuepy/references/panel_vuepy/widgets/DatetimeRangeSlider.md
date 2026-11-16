---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# DatetimeRangeSlider 日期时间范围滑块

DatetimeRangeSlider组件允许用户通过带有两个手柄的滑块选择日期时间范围。

底层实现为`panel.widgets.DatetimeRangeSlider`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/DatetimeRangeSlider.html

## 基本用法

日期时间范围滑块提供了一种交互式方式来选择日期时间范围。用户可以通过拖动手柄调整范围的起始和结束时间，也可以通过拖动已选择的范围整体移动。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDatetimeRangeSlider 
    name="日期时间范围滑块" 
    :start="dt.datetime(2017, 1, 1)" 
    :end="dt.datetime(2019, 1, 1)" 
    :step="10000"
    v-model="selected_range.value"
  />
</template>
<script lang='py'>
import datetime as dt
from vuepy import ref

selected_range = ref((dt.datetime(2017, 1, 1), dt.datetime(2018, 1, 10)))
</script>
```

## 自定义格式

可以通过format参数自定义日期时间的显示格式。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDatetimeRangeSlider 
    name="自定义格式" 
    :start="dt.datetime(2017, 1, 1)" 
    :end="dt.datetime(2019, 1, 1)" 
    :step="10000"
    format="%Y-%m-%dT%H:%M:%S"
    v-model="custom_format_range.value"
  />
</template>
<script lang='py'>
import datetime as dt
from vuepy import ref

custom_format_range = ref((dt.datetime(2017, 1, 1), dt.datetime(2018, 1, 10)))
</script>
```

## 自定义样式

通过设置bar_color和orientation等属性可以自定义滑块样式。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDatetimeRangeSlider 
    name="水平滑块" 
    :start="dt.datetime(2017, 1, 1)" 
    :end="dt.datetime(2019, 1, 1)" 
    bar_color="#ff5722"
    tooltips
    v-model="horizontal_range.value"
  />
  
  <PnDatetimeRangeSlider 
    name="垂直滑块" 
    :start="dt.datetime(2017, 1, 1)" 
    :end="dt.datetime(2019, 1, 1)" 
    orientation="vertical"
    bar_color="#2196f3"
    tooltips
    v-model="vertical_range.value"
  />
</template>
<script lang='py'>
import datetime as dt
from vuepy import ref

horizontal_range = ref((dt.datetime(2017, 1, 1), dt.datetime(2018, 1, 10)))
vertical_range = ref((dt.datetime(2017, 3, 15), dt.datetime(2018, 6, 10)))
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| start | 日期时间范围的下限 | ^[datetime] | — |
| end | 日期时间范围的上限 | ^[datetime] | — |
| step | 步长，以毫秒为单位，默认为1分钟(60,000毫秒) | ^[int] | 60000 |
| value | 所选范围的上下限，表示为日期时间类型的元组 | ^[tuple] | — |
| bar_color | 滑块条的颜色，十六进制RGB值 | ^[string] | — |
| direction | 滑块方向，从左到右('ltr')或从右到左('rtl') | ^[string] | 'ltr' |
| disabled | 是否禁用 | ^[boolean] | false |
| format | 应用于滑块值的格式化字符串 | ^[string] | — |
| name | 组件标题 | ^[string] | — |
| orientation | 滑块方向，水平('horizontal')或垂直('vertical') | ^[string] | 'horizontal' |
| tooltips | 是否在滑块手柄上显示提示 | ^[boolean] | false |

### Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| change | 当选择改变时触发 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn
import datetime as dt

pn.extension()

datetime_range_slider = pn.widgets.DatetimeRangeSlider(
    name='Datetime Range Slider',
    start=dt.datetime(2017, 1, 1), end=dt.datetime(2019, 1, 1),
    value=(dt.datetime(2017, 1, 1), dt.datetime(2018, 1, 10)),
    step=10000
)

pn.Row(datetime_range_slider.controls(jslink=True), datetime_range_slider)
```
