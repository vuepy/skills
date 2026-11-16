---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# TimePicker 时间选择器

时间选择器组件允许用户选择一个时间，可以以文本形式输入或使用浏览器的时间选择工具。

底层实现为`panel.widgets.TimePicker`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/TimePicker.html

## 基本用法

基本的时间选择器使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol :height='150'>
  <PnTimePicker name="TimePicker" v-model='time.value'/>
 </PnCol>
 <p>value: {{ time.value }}</p>
</template>
<script lang='py'>
from vuepy import ref
import datetime as dt

time = ref(None)
</script>
```

## 时间范围限制

可以使用`start`和`end`参数限制可选择的时间范围：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol :height='150'>
  <PnTimePicker name="TimePicker" 
               start="09:00"
               end="13:00"
               v-model="time.value"/>
 </PnCol>
 <p>value: {{ time.value }}</p>
</template>
<script lang='py'>
from vuepy import ref
import datetime as dt

time = ref(dt.time(12, 0))
</script>
```

## 自定义时间格式

可以使用`format`参数自定义时间的显示格式：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <p>value: {{ time1.value }}</p>
 <PnCol :height='150'>
  <PnTimePicker name="12小时制" 
               format="h:i K"
               v-model="time1.value"/>
 </PnCol>

 <p>value: {{ time2.value }}</p>
 <PnCol :height='150'>
  <PnTimePicker name="24小时制" 
               format="H:i"
               v-model="time2.value"/>
 </PnCol>

 <p>value: {{ time3.value }}</p>
 <PnCol :height='150'>
  <PnTimePicker name="带秒的格式" 
               format="H:i:s"
               :seconds="True"
               v-model="time3.value"/>
 </PnCol>
</template>
<script lang='py'>
from vuepy import ref
import datetime as dt

time1 = ref(dt.time(14, 30))
time2 = ref(dt.time(14, 30))
time3 = ref(dt.time(14, 30, 45))
</script>
```

## 自定义步长

可以通过`hour_increment`、`minute_increment`和`second_increment`参数控制时、分、秒的调整步长：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol :height='150'>
  <PnTimePicker name="小时步长:2 分钟步长:15" 
               :hour_increment="2"
               :minute_increment="15"
               v-model="time.value"/>
 </PnCol>
 <p>value: {{ time.value }}</p>
</template>
<script lang='py'>
from vuepy import ref
import datetime as dt

time = ref(dt.time(12, 0))
</script>
```

## API

### 属性

| 属性名            | 说明                         | 类型                             | 默认值      |
| ---------------- | ---------------------------- | -------------------------------- | ----------- |
| value            | 当前选择的时间                | ^[datetime.time\|str]            | None        |
| start            | 允许选择的最早时间            | ^[datetime.time\|str]            | None        |
| end              | 允许选择的最晚时间            | ^[datetime.time\|str]            | None        |
| format           | 时间显示格式                  | ^[str]                           | "H:i"       |
| seconds          | 是否允许选择秒                | ^[bool]                          | False       |
| hour_increment   | 小时调整的步长                | ^[int]                           | 1           |
| minute_increment | 分钟调整的步长                | ^[int]                           | 1           |
| second_increment | 秒调整的步长                  | ^[int]                           | 1           |
| clock            | 时钟制式，'12h'或'24h'        | ^[str]                           | "12h"       |
| disabled         | 是否禁用                      | ^[bool]                          | False       |
| name             | 组件标题                      | ^[str]                           | ""          |
| description      | 鼠标悬停时显示的描述          | ^[str]                           | ""          |

format:

```
+---+------------------------------------+------------+
| H | Hours (24 hours)                   | 00 to 23   |
| h | Hours                              | 1 to 12    |
| G | Hours, 2 digits with leading zeros | 1 to 12    |
| i | Minutes                            | 00 to 59   |
| S | Seconds, 2 digits                  | 00 to 59   |
| s | Seconds                            | 0, 1 to 59 |
| K | AM/PM                              | AM or PM   |
+---+------------------------------------+------------+
```

### Events

| 事件名  | 说明                | 类型                                 |
| ------ | ------------------ | ------------------------------------ |
| change | 当时间更改时触发的事件 | ^[Callable]`(value) -> None`        |

## Controls

```python
##controls
import datetime as dt
import panel as pn

pn.extension()
time_picker = pn.widgets.TimePicker(name='Time Picker', value=dt.datetime.now().time(), format='H:i K')
pn.Row(time_picker.controls(jslink=False), time_picker)
```
