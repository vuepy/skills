---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# DatetimeRangeInput 日期时间范围输入框

日期时间范围输入框组件允许用户以文本形式输入日期时间范围，并使用预定义的格式解析它。

底层实现为`panel.widgets.DatetimeRangeInput`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/DatetimeRangeInput.html

## 基本用法

基本的日期时间范围输入框使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDatetimeRangeInput name="日期时间范围" 
                       :value="(dt(2023, 3, 1, 8, 0), dt(2023, 3, 15, 18, 0))"
                       @change="on_change" />
  <p>当前值: {{ selected_range.value }}</p>
</template>
<script lang='py'>
from vuepy import ref
import datetime

def dt(year, month, day, hour=0, minute=0, second=0):
    return datetime.datetime(year, month, day, hour, minute, second)

selected_range = ref("未选择")

def on_change(event):
    selected_range.value = f"{event.new[0]} - {event.new[1]}"
</script>
```

## 自定义格式

可以通过format参数自定义日期时间的解析和显示格式：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDatetimeRangeInput name="标准格式" 
                       :value="(dt(2023, 3, 1), dt(2023, 3, 15))" />
  <PnDatetimeRangeInput name="自定义格式" 
                       :value="(dt(2023, 3, 1), dt(2023, 3, 15))"
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
  <PnDatetimeRangeInput name="有范围限制" 
                       :value="(dt(2023, 2, 15), dt(2023, 3, 15))"
                       :start="dt(2023, 1, 1)"
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
| value    | 解析后的日期时间范围值 | ^[tuple] 以datetime类型的(start, end)表示的元组   | None    |
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

datetime_range_input = pn.widgets.DatetimeRangeInput(
    name='Datetime Range Input',
    start=dt.datetime(2017, 1, 1), end=dt.datetime(2019, 1, 1),
    value=(dt.datetime(2017, 1, 1), dt.datetime(2018, 1, 10)),
    width=300
)

pn.Row(datetime_range_input.controls(jslink=False), datetime_range_input)
```
