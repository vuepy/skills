---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# DatetimeSlider 日期时间滑块

日期时间滑块组件允许用户在设定的日期时间范围内使用滑块选择一个日期时间值。

底层实现为`panel.widgets.DatetimeSlider`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/DatetimeSlider.html

## 基本用法

基本的日期时间滑块使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDatetimeSlider name="日期时间滑块" 
                    :start="dt(2023, 1, 1)" 
                    :end="dt(2023, 6, 1)" 
                    v-model="selected_datetime.value"/>
</template>
<script lang='py'>
from vuepy import ref
import datetime

def dt(year, month, day, hour=0, minute=0, second=0):
    return datetime.datetime(year, month, day, hour, minute, second)

selected_datetime = ref(dt(2023,1,1))
</script>
```

## 自定义格式

可以通过format参数自定义日期时间的显示格式：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDatetimeSlider name="自定义格式" 
                    :start="dt(2023, 1, 1)" 
                    :end="dt(2023, 6, 1)" 
                    :value="dt(2023, 2, 8, 15, 40, 30)"
                    format="%Y年%m月%d日 %H:%M:%S" />
</template>
<script lang='py'>
import datetime

def dt(year, month, day, hour=0, minute=0, second=0):
    return datetime.datetime(year, month, day, hour, minute, second)
</script>
```

## 步长设置

可以通过step参数设置滑块的步长（单位为秒）：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDatetimeSlider name="小时步长" 
                    :start="dt(2023, 1, 1)" 
                    :end="dt(2023, 1, 2)" 
                    :value="dt(2023, 1, 1, 12)"
                    :step="60 * 60" />
  <PnDatetimeSlider name="天步长" 
                    :start="dt(2023, 1, 1)" 
                    :end="dt(2023, 1, 31)" 
                    :value="dt(2023, 1, 15)"
                    :step="24 * 60 * 60" />
</template>
<script lang='py'>
import datetime

def dt(year, month, day, hour=0, minute=0, second=0):
    return datetime.datetime(year, month, day, hour, minute, second)
</script>
```

## 垂直方向

滑块可以设置为垂直方向显示：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnDatetimeSlider name="垂直滑块" 
                      :start="dt(2023, 1, 1)" 
                      :end="dt(2023, 6, 1)" 
                      :value="dt(2023, 3, 15)"
                      orientation="vertical" 
                      :height="300" />
  </PnRow>
</template>
<script lang='py'>
import datetime

def dt(year, month, day, hour=0, minute=0, second=0):
    return datetime.datetime(year, month, day, hour, minute, second)
</script>
```

## API

### 属性

| 属性名           | 说明                 | 类型                                                | 默认值 |
| --------------- | ------------------- | --------------------------------------------------- | ------- |
| start           | 范围的下限           | ^[datetime]                                         | —       |
| end             | 范围的上限           | ^[datetime]                                         | —       |
| value           | 选择的日期时间        | ^[datetime]                                         | —       |
| value_throttled | 鼠标释放前节流的日期时间值 | ^[datetime]                                    | —       |
| step            | 滑块的步长（单位：秒） | ^[int]                                             | 60      |
| bar_color       | 滑块条的颜色         | ^[str] 十六进制RGB颜色值                             | —       |
| direction       | 滑块方向             | ^[str] 'ltr'（从左到右）或'rtl'（从右到左）          | 'ltr'   |
| disabled        | 是否禁用组件         | ^[bool]                                             | False   |
| name            | 组件标题             | ^[str]                                              | ""      |
| orientation     | 滑块的方向           | ^[str] 'horizontal'（水平）或'vertical'（垂直）      | 'horizontal' |
| tooltips        | 是否在滑块手柄上显示提示 | ^[bool]                                          | True    |
| format          | 日期时间的格式字符串   | ^[str]                                             | —       |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当滑块值变化时触发的事件 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn
import datetime as dt
pn.extension()

datetime_slider = pn.widgets.DatetimeSlider(name='Datetime Slider', start=dt.datetime(2019, 1, 1), end=dt.datetime(2019, 6, 1), value=dt.datetime(2019, 2, 8, 15, 40, 30))
pn.Row(datetime_slider.controls(jslink=True), datetime_slider)
```
