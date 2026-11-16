---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# DateSlider 日期滑块

DateSlider组件允许用户在设定的日期范围内通过滑块选择一个日期值。

底层实现为`panel.widgets.DateSlider`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/DateSlider.html

## 基本用法

日期滑块组件提供了一种交互式方式来选择日期范围内的特定日期。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDateSlider 
    name="日期滑块" 
    :start="dt.datetime(2019, 1, 1)" 
    :end="dt.datetime(2019, 6, 1)" 
    :value="dt.datetime(2019, 2, 8)"
    v-model="selected_date.value"
    @change="on_change"
  />
  <PnStaticText :value="f'选择的日期: {selected_date.value}'" />
</template>
<script lang='py'>
import datetime as dt
from vuepy import ref

selected_date = ref(dt.datetime(2019, 2, 8))

def on_change(event):
    print(f"Date changed: {event}") # Date changed: Event(what='value'
</script>
```

## 自定义样式

通过设置bar_color和orientation等属性可以自定义滑块样式。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDateSlider 
    name="水平滑块" 
    :start="dt.datetime(2019, 1, 1)" 
    :end="dt.datetime(2019, 6, 1)" 
    :value="dt.datetime(2019, 2, 8)"
    bar_color="#ff5722"
    tooltips
    v-model="date_horizontal.value"
  />
  
 <PnColumn style='height:400px;'>
  <PnDateSlider 
    name="垂直滑块" 
    :start="dt.datetime(2019, 1, 1)" 
    :end="dt.datetime(2019, 6, 1)" 
    :value="dt.datetime(2019, 3, 15)"
    orientation="vertical"
    bar_color="#2196f3"
    tooltips
    v-model="date_vertical.value"
  />
 </PnColumn>
</template>
<script lang='py'>
import datetime as dt
from vuepy import ref

date_horizontal = ref(dt.datetime(2019, 2, 8))
date_vertical = ref(dt.datetime(2019, 3, 15))
</script>
```

## 步长设置

通过step参数可以设置日期滑块的步长（以天为单位）。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDateSlider 
    name="7天步长" 
    :start="dt.datetime(2019, 1, 1)" 
    :end="dt.datetime(2019, 6, 1)" 
    :value="dt.datetime(2019, 2, 8)"
    :step="7"
    tooltips
    v-model="date_step.value"
  />
  <PnStaticText :value="f'选择的日期: {date_step.value}'" />
</template>
<script lang='py'>
import datetime as dt
from vuepy import ref

date_step = ref(dt.datetime(2019, 2, 8))
</script>
```

## 日期格式

可以通过format参数自定义日期的显示格式。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDateSlider 
    name="自定义格式" 
    :start="dt.datetime(2019, 1, 1)" 
    :end="dt.datetime(2019, 6, 1)" 
    :value="dt.datetime(2019, 2, 8)"
    format="%Y年%m月%d日"
    tooltips
    v-model="date_format.value"
  />
</template>
<script lang='py'>
import datetime as dt
from vuepy import ref

date_format = ref(dt.datetime(2019, 2, 8))
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| as_datetime | 是否以datetime类型返回值（否则为date类型） | ^[boolean] | false |
| start | 日期范围的下限 | ^[date]^[datetime] | — |
| end | 日期范围的上限 | ^[date]^[datetime] | — |
| value | 当前选中的日期值 | ^[date]^[datetime] | — |
| step | 滑块步长（以天为单位） | ^[integer] | 1 |
| bar_color | 滑块条的颜色，十六进制RGB值 | ^[string] | — |
| direction | 滑块方向，从左到右('ltr')或从右到左('rtl') | ^[string] | 'ltr' |
| disabled | 是否禁用 | ^[boolean] | false |
| name | 组件标题 | ^[string] | — |
| orientation | 滑块方向，水平('horizontal')或垂直('vertical') | ^[string] | 'horizontal' |
| tooltips | 是否在滑块手柄上显示提示 | ^[boolean] | false |
| format | 日期格式 | ^[string] | — |

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

date_slider = pn.widgets.DateSlider(
    name='Date Slider', start=dt.datetime(2019, 1, 1), 
    end=dt.datetime(2019, 6, 1), value=dt.datetime(2019, 2, 8))

pn.Row(date_slider.controls(jslink=True), date_slider) 
```
