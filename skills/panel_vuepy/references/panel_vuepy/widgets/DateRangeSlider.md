---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# DateRangeSlider 日期范围滑块

日期范围滑块组件允许使用带有两个手柄的滑块选择日期范围。

底层实现为`panel.widgets.DateRangeSlider`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/DateRangeSlider.html

## 基本用法

可以通过拖动手柄调整滑块的开始和结束日期，也可以通过拖动选定范围来整体移动范围：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <div>当前选择范围: {{ value.value }}</div>
  <PnDateRangeSlider name="日期范围滑块"
                     :start="start_date"
                     :end="end_date"
                     :value="initial_value"
                     :step="2"
                     v-model="value.value"/>
</template>
<script lang='py'>
import datetime as dt
from vuepy import ref

start_date = dt.datetime(2017, 1, 1)
end_date = dt.datetime(2019, 1, 1)
initial_value = (dt.datetime(2017, 1, 1), dt.datetime(2018, 1, 10))
value = ref(initial_value)

</script>
```

## 自定义格式

可以使用自定义格式字符串来格式化滑块值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDateRangeSlider name="自定义格式日期范围"
                    :start="start_date"
                    :end="end_date"
                    :value="initial_value"
                    :step="2"
                    format="%Y-%m-%d" />
</template>
<script lang='py'>
import datetime as dt
from vuepy import ref

start_date = dt.datetime(2017, 1, 1)
end_date = dt.datetime(2019, 1, 1)
initial_value = (dt.datetime(2017, 1, 1), dt.datetime(2018, 1, 10))
</script>
```

## 垂直方向

滑块可以设置为垂直方向显示：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnColumn style='height:400px;'>
  <PnDateRangeSlider name="垂直日期范围滑块"
                    orientation="vertical"
                    :start="start_date"
                    :end="end_date"
                    :value="initial_value"
                    :height="400" />
 </PnColumn>
</template>
<script lang='py'>
import datetime as dt
from vuepy import ref

start_date = dt.datetime(2017, 1, 1)
end_date = dt.datetime(2019, 1, 1)
initial_value = (dt.datetime(2017, 3, 1), dt.datetime(2018, 9, 10))
</script>
```

## API

### 属性

| 属性名          | 说明                           | 类型                                | 默认值     |
| -------------- | ------------------------------ | ---------------------------------- | --------- |
| start          | 范围的下限                     | ^[datetime]                         | None      |
| end            | 范围的上限                     | ^[datetime]                         | None      |
| step           | 以天为单位的步长                | ^[int]                             | 1         |
| value          | 所选范围的上下界元组，以datetime类型表示 | ^[(datetime, datetime)]      | (None, None) |
| value_throttled| 鼠标释放前阻止的所选范围的上下界元组，以datetime类型表示 | ^[(datetime, datetime)] | (None, None) |
| bar_color      | 滑块条的颜色，十六进制RGB值      | ^[str]                             | None      |
| direction      | 滑块方向，从左到右('ltr')或从右到左('rtl') | ^[str]                    | 'ltr'     |
| disabled       | 是否禁用                       | ^[bool]                            | False     |
| format         | 应用于滑块值的格式化器           | ^[str]                             | None      |
| name           | 组件标题                       | ^[str]                             | ""        |
| orientation    | 滑块的显示方向，'horizontal'或'vertical' | ^[str]                    | 'horizontal' |
| tooltips       | 是否在滑块手柄上显示工具提示      | ^[bool]                           | True      |

### Events

| 事件名         | 说明                       | 类型                                   |
| ------------- | -------------------------- | -------------------------------------- |
| change        | 当值更改时触发的事件         | ^[Callable]`(event: dict) -> None`    |

## Controls

```python
##controls
import panel as pn
import datetime as dt
pn.extension()

date_range_slider = pn.widgets.DateRangeSlider(
    name='Date Range Slider',
    start=dt.datetime(2017, 1, 1), end=dt.datetime(2019, 1, 1),
    value=(dt.datetime(2017, 1, 1), dt.datetime(2018, 1, 10)),
    step=2
)
pn.Row(date_range_slider.controls(jslink=True), date_range_slider) 
```
