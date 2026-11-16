---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# DatetimePicker 日期时间选择器

日期时间选择器组件允许用户选择日期和时间，可以通过文本输入框和浏览器的日期时间选择工具进行选择。

底层实现为`panel.widgets.DatetimePicker`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/DatetimePicker.html

## 基本用法

基本的日期时间选择器使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol style='height:420px;'>
  <PnDatetimePicker name="选择日期时间" v-model='datetime.value' />
 </PnCol>
 <p>当前选择: {{ datetime.value }}</p>
</template>
<script lang='py'>
from vuepy import ref
import datetime as dt

datetime = ref(None)
# set default
# datetime = ref(dt.datetime(2023, 7, 15, 14, 30))
</script>
```

## 日期范围限制

可以使用`start`和`end`参数限制可选择的日期范围：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol style='height:420px;'>
  <PnDatetimePicker name="7天内选择" 
                   :start="today"
                   :end="week_later"/>
 </PnCol>
 <p>当前选择: {{ datetime.value }}</p>
</template>
<script lang='py'>
from vuepy import ref
import datetime as dt

today = dt.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
week_later = today + dt.timedelta(days=7)

datetime = ref(None)
</script>
```

## 自定义时间选项

可以使用`enable_time`、`enable_seconds`和`military_time`参数自定义时间选择功能：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol style='height:420px;'>
  <PnDatetimePicker name="仅日期" 
                   :enable_time="False"/>
 </PnCol>
 <PnCol style='height:420px;'>
  <PnDatetimePicker name="带秒选择" 
                   :enable_seconds="True"/>
 </PnCol>
 <PnColumn style='height:420px;'>
  <PnDatetimePicker name="12小时制" 
                   :military_time="False"/>
 </PnCol>
</template>
```

## 禁用特定日期

可以使用`disabled_dates`和`enabled_dates`参数禁用或启用特定日期，**注意**是`datetime.date`类型。

## API

### 属性

| 属性名           | 说明                         | 类型                            | 默认值      |
| ---------------- | ---------------------------- | -------------------------------- | ----------- |
| value            | 当前选择的日期时间            | ^[datetime.datetime]            | None        |
| start            | 允许选择的最早日期时间        | ^[datetime.datetime\|datetime.date] | None      |
| end              | 允许选择的最晚日期时间        | ^[datetime.datetime\|datetime.date] | None      |
| disabled_dates   | 禁用的日期列表                | ^[list[datetime.date]                         | []          |
| enabled_dates    | 启用的日期列表                | ^[list[datetime.date]                         | []          |
| enable_time      | 是否启用时间选择              | ^[bool]                         | True        |
| enable_seconds   | 是否启用秒选择                | ^[bool]                         | True        |
| military_time    | 是否使用24小时制              | ^[bool]                         | True        |
| allow_input      | 是否允许用户直接在输入框中输入 | ^[bool]                         | False       |
| disabled         | 是否禁用组件                  | ^[bool]                         | False       |
| name             | 组件标题                      | ^[str]                          | ""          |
| description      | 鼠标悬停时显示的描述          | ^[str]                          | ""          |

### Events

| 事件名  | 说明                | 类型                                 |
| ------ | ------------------ | ------------------------------------ |
| change | 当选择更改时触发的事件 | ^[Callable]`(value) -> None`        |

## Controls

```python
##controls
import panel as pn
import datetime as dt
pn.extension()

datetime_picker = pn.widgets.DatetimePicker(name='Datetime Picker', value=dt.datetime(2023, 7, 15, 14, 30))
pn.Row(datetime_picker.controls, datetime_picker)
```
