---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# DatePicker 日期选择器

日期选择器组件允许使用文本框和浏览器的日期选择工具选择日期值。

底层实现为`panel.widgets.DatePicker`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/DatePicker.html

## 基本用法

日期选择器使用浏览器依赖的日历小部件来选择日期：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnColumn style='height:400px;'>
  <PnDatePicker name="日期选择器" 
               :value="initial_date" 
               v-model="date.value"
               @change="on_change" />
 </PnColumn>
</template>
<script lang='py'>
import datetime as dt
from vuepy import ref

initial_date = dt.date(2024, 4, 1)
date = ref(initial_date)

def on_change(event):
    print(f"{date.value}") # 2024-04-02
</script>
```

## 日期范围限制

可以通过`start`和`end`参数限制可选日期的范围：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnColumn style='height:400px;'>
  <PnDatePicker name="限制范围" 
               :start="start_date" 
               :end="end_date" />
 </PnColumn>
</template>
<script lang='py'>
import datetime as dt

start_date = dt.date(2024, 12, 10)
end_date = dt.date(2024, 12, 31)
</script>
```

## 可用/禁用日期

可以通过`disabled_dates`和`enabled_dates`参数设置不可用和可用的日期：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnColumn style='height:400px;'>
  <PnDatePicker name="禁用特定日期: 禁用周末"
               :disabled_dates="disabled_dates" />
 </PnColumn>
 <PnColumn style='height:400px;'>
  <PnDatePicker name="仅允许特定日期: 只允许本月的奇数日期"
               :enabled_dates="enabled_dates" />
 </PnColumn>
</template>
<script lang='py'>
import datetime as dt
from vuepy import ref

# 禁用周末
today = dt.datetime.now().date()
disabled_dates = [(today + dt.timedelta(days=i)) for i in range(30) if (today + dt.timedelta(days=i)).weekday() >= 5]

# 只允许本月的奇数日期
month_start = today.replace(day=1)
next_month = month_start.replace(month=month_start.month % 12 + 1, day=1)
enabled_dates = [(month_start + dt.timedelta(days=i-1)) for i in range(1, 31, 2) 
                if (month_start + dt.timedelta(days=i-1)).month == month_start.month]
</script>
```

## API

### 属性

| 属性名          | 说明                           | 类型                                | 默认值     |
| -------------- | ------------------------------ | ---------------------------------- | --------- |
| end            | 最晚可选日期                    | ^[datetime]                         | None      |
| start          | 最早可选日期                    | ^[datetime]                         | None      |
| value          | 所选值，datetime类型            | ^[datetime]                         | None      |
| disabled       | 是否禁用                       | ^[bool]                            | False     |
| name           | 组件标题                       | ^[str]                             | ""        |
| disabled_dates | 使不可用于选择的日期；其他日期将可用 | ^[list]                          | None      |
| enabled_dates  | 使可用于选择的日期；其他日期将不可用 | ^[list]                          | None      |

### Events

| 事件名         | 说明                       | 类型                                   |
| ------------- | -------------------------- | -------------------------------------- |
| change        | 当值更改时触发的事件         | ^[Callable]`(event: dict) -> None`    |

## Controls

```python
##controls
import datetime as dt
import panel as pn
pn.extension()

date_picker = pn.widgets.DatePicker(name='Date Picker', value=dt.datetime(2024, 4, 1, 11, 37))
pn.Row(date_picker.controls(jslink=True), date_picker)
```
