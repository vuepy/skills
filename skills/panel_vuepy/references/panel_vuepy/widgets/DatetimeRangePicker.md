---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# DatetimeRangePicker 日期时间范围选择器

日期时间范围选择器组件允许使用文本框和浏览器的日期时间选择工具选择日期时间范围。

底层实现为`panel.widgets.DatetimeRangePicker`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/DatetimeRangePicker.html

## 基本用法

基本的日期时间范围选择器使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnColumn style='height:400px;'>
  <PnDatetimeRangePicker 
    name="日期时间范围" v-model="selected_range.value"/>
 </PnColumn>
 <p>选择的范围: {{ selected_range.value }}</p>
</template>
<script lang='py'>
from vuepy import ref
import datetime

def dt(year, month, day, hour=0, minute=0, second=0):
    return datetime.datetime(year, month, day, hour, minute, second)

selected_range = ref((dt(2023, 3, 2, 12, 10), dt(2023, 3, 2, 12, 22)))

</script>
```

## 设置日期范围限制

可以设置可选日期的范围：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnColumn style='height:400px;'>
  <PnDatetimeRangePicker name="范围限制" 
                        :start="dt(2023, 12, 10)"
                        :end="dt(2023, 12, 31)"
                        :value="(dt(2023, 12, 11), dt(2023, 12, 15))" />
 </PnColumn>
</template>
<script lang='py'>
import datetime

def dt(year, month, day, hour=0, minute=0, second=0):
    return datetime.datetime(year, month, day, hour, minute, second)
</script>
```

## 禁用和启用特定日期

可以设置特定日期不可选或可选：**注意**是`datetime.date`类型。

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnColumn style='height:400px;'>
  <PnDatetimeRangePicker name="禁用特定日期" 
                        :value='(date(2023, 3, 8), date(2023, 3, 10))'
                        :disabled_dates="disabled"/>
 </PnColumn>
 <PnColumn style='height:400px;'>
  <PnDatetimeRangePicker name="启用特定日期" 
                        :value='(date(2023, 3, 1), date(2023, 3, 2))'
                        :enabled_dates="enabled" />
 </PnColumn>
</template>
<script lang='py'>
import datetime

def date(year, month, day):
    return datetime.date(year, month, day)
    
disabled = [
  date(2023, 3, 5),
  date(2023, 3, 6),
  date(2023, 3, 12),
  date(2023, 3, 13)
]
enabled = [
  date(2023, 3, 1),
  date(2023, 3, 2),
  date(2023, 3, 10)
]
</script>
```

## 时间格式设置

可以控制时间显示和编辑的方式：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol style='height:400px;'>
  <PnDatetimeRangePicker name="不显示时间" 
                        :enable_time="False"
                        :value="(dt(2023, 3, 1), dt(2023, 3, 15))" />
  
 </PnCol>
 <PnCol style='height:400px;'>
  <PnDatetimeRangePicker name="不显示秒" 
                        :enable_seconds="False"
                        :value="(dt(2023, 3, 1, 12, 30), dt(2023, 3, 15, 18, 45))" />
  
 </PnCol>
 <PnColumn style='height:400px;'>
  <PnDatetimeRangePicker name="12小时制" 
                        :military_time="False"
                        :value="(dt(2023, 3, 1, 13, 30), dt(2023, 3, 15, 15, 45))" />
 </PnCol>
</template>
<script lang='py'>
import datetime

def dt(year, month, day, hour=0, minute=0, second=0):
    return datetime.datetime(year, month, day, hour, minute, second)
</script>
```

## API

### 属性

| 属性名          | 说明                 | 类型                                             | 默认值 |
| -------------- | ------------------- | ------------------------------------------------ | ------- |
| value          | 选择的范围           | ^[tuple] 表示为datetime类型的上下限元组           | None    |
| start          | 允许选择的日期的下限   | ^[datetime]                                     | None    |
| end            | 允许选择的日期的上限   | ^[datetime]                                     | None    |
| disabled_dates | 不可选的日期          | ^[list] 日期列表                                 | None    |
| enabled_dates  | 可选的日期            | ^[list] 日期列表                                 | None    |
| enable_time    | 是否启用时间编辑       | ^[bool]                                         | True    |
| enable_seconds | 是否启用秒编辑         | ^[bool]                                         | True    |
| military_time  | 是否使用24小时制显示时间 | ^[bool]                                         | True    |
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

datetime_range_picker = pn.widgets.DatetimeRangePicker(
    name='Datetime Range Picker', 
    value=(dt.datetime(2021, 3, 2, 12, 10), dt.datetime(2021, 3, 2, 12, 22))
)
pn.Row(datetime_range_picker.controls(jslink=True), datetime_range_picker) 
```
