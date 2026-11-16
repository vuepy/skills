---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# DatetimeInput 日期时间输入框

日期时间输入框组件允许以文本形式输入日期时间值，并使用预定义的格式解析它。

底层实现为`panel.widgets.DatetimeInput`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/DatetimeInput.html

## 基本用法

基本的日期时间输入框使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDatetimeInput name="日期时间输入" 
                  v-model="selected_datetime.value"/>
  <p>当前值: {{ selected_datetime.value }}</p>
</template>
<script lang='py'>
from vuepy import ref
import datetime

def dt(year, month, day, hour=0, minute=0, second=0):
    return datetime.datetime(year, month, day, hour, minute, second)

selected_datetime = ref(dt(2023, 2, 8))
</script>
```

## 自定义格式

可以通过format参数自定义日期时间的解析和显示格式：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDatetimeInput name="标准格式" 
                  :value="dt(2023, 2, 8)" />
  <PnDatetimeInput name="自定义格式" 
                  :value="dt(2023, 2, 8)"
                  format="%Y年%m月%d日 %H:%M:%S" />
</template>
<script lang='py'>
import datetime

def dt(year, month, day, hour=0, minute=0, second=0):
    return datetime.datetime(year, month, day, hour, minute, second)
</script>
```

## 设置边界

可以设置日期时间的上下限：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDatetimeInput name="有范围限制" 
                  :value="dt(2023, 12, 15)"
                  :start="dt(2023, 12, 10)"
                  :end="dt(2023, 12, 31)" />
</template>
<script lang='py'>
import datetime

def dt(year, month, day, hour=0, minute=0, second=0):
    return datetime.datetime(year, month, day, hour, minute, second)
</script>
```

## API

### 属性

| 属性名    | 说明                 | 类型                                             | 默认值 |
| -------- | ------------------- | ------------------------------------------------ | ------- |
| start    | 日期时间下限          | ^[datetime]                                     | None    |
| end      | 日期时间上限          | ^[datetime]                                     | None    |
| value    | 解析后的日期时间值    | ^[datetime]                                     | None    |
| disabled | 是否禁用组件          | ^[bool]                                         | False   |
| format   | 日期时间格式字符串     | ^[str]                                          | '%Y-%m-%d %H:%M:%S' |
| name     | 组件标题              | ^[str]                                          | ""      |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当输入值变化时触发的事件 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn
import datetime as dt
pn.extension()

dt_input = pn.widgets.DatetimeInput(
    name='Datetime Input', value=dt.datetime(2019, 2, 8))
pn.Row(dt_input.controls(jslink=True), dt_input)
```
