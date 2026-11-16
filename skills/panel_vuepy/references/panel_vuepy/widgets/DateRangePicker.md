---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# DateRangePicker 日期范围选择器

日期范围选择器组件允许用户使用文本框和浏览器的日期选择工具选择一个日期范围。

底层实现为`panel.widgets.DateRangePicker`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/DateRangePicker.html

## 基本用法

基本的日期范围选择器使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnColumn style='height:400px;'>
  <PnDateRangePicker name="日期范围" 
                    :value="(date(2023, 3, 1), date(2023, 3, 15))"
                    @change="on_change" />
 </PnColumn>
 <p>选择的范围: {{ selected_range.value }}</p>
</template>
<script lang='py'>
from vuepy import ref
import datetime

def date(year, month, day):
    return datetime.date(year, month, day)

selected_range = ref("")

def on_change(event):
    selected_range.value = f"{event.new[0]} 至 {event.new[1]}"
</script>
```

## 设置日期范围限制

可以设置可选日期的范围：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnColumn style='height:400px;'>
  <PnDateRangePicker name="范围限制" 
                    :start="date(2023, 12, 5)"
                    :end="date(2023, 12, 31)"
                    :value="(date(2023, 12, 6), date(2023, 12, 15))" />
 </PnColumn>
</template>
<script lang='py'>
import datetime

def date(year, month, day):
    return datetime.date(year, month, day)
</script>
```

## 禁用和启用特定日期

可以设置特定日期不可选或可选：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnColumn style='height:400px;'>
  <PnDateRangePicker name="禁用特定日期" 
                    :disabled_dates="[
                      date(2023, 3, 5),
                      date(2023, 3, 6),
                      date(2023, 3, 12),
                      date(2023, 3, 13)
                    ]"
                    :value="(date(2023, 3, 1), date(2023, 3, 15))" />
 </PnColumn>
 <PnColumn style='height:400px;'>
  <PnDateRangePicker name="启用特定日期" 
                    :enabled_dates="[
                      date(2023, 3, 1),
                      date(2023, 3, 2),
                      date(2023, 3, 3),
                      date(2023, 3, 8),
                      date(2023, 3, 9),
                      date(2023, 3, 10)
                    ]"
                    :value="(date(2023, 3, 1), date(2023, 3, 10))" />
 </PnColumn>
</template>
<script lang='py'>
import datetime

def date(year, month, day):
    return datetime.date(year, month, day)
</script>
```

## API

### 属性

| 属性名          | 说明                 | 类型                                             | 默认值 |
| -------------- | ------------------- | ------------------------------------------------ | ------- |
| value          | 选择的范围           | ^[tuple] 表示为date类型的上下限元组                | None    |
| start          | 允许选择的日期的下限   | ^[date]                                          | None    |
| end            | 允许选择的日期的上限   | ^[date]                                          | None    |
| disabled_dates | 不可选的日期          | ^[list] 日期列表                                 | None    |
| enabled_dates  | 可选的日期            | ^[list] 日期列表                                 | None    |
| allow_input    | 是否允许用户直接在输入字段中输入日期 | ^[bool]                             | False   |
| disabled       | 是否禁用组件          | ^[bool]                                          | False   |
| name           | 组件标题              | ^[str]                                           | ""      |
| visible        | 组件是否可见          | ^[bool]                                          | True    |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当选择变化时触发的事件 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn
import datetime as dt
pn.extension()

date_range_picker = pn.widgets.DateRangePicker(
    name='Date Range Picker', value=(dt.date(2021, 3, 1), dt.date(2021, 3, 15))
)
pn.Row(date_range_picker.controls(jslink=True), date_range_picker) 
```
