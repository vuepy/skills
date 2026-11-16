---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# EditableRangeSlider 可编辑范围滑块

可编辑范围滑块组件允许使用带有两个手柄的滑块选择浮点范围，并提供数字输入框以便进行更精确的控制。

底层实现为`panel.widgets.EditableRangeSlider`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/EditableRangeSlider.html

## 基本用法

基本的可编辑范围滑块，可以通过滑动两个手柄或直接输入数字来选择范围：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnEditableRangeSlider name="范围滑块" 
                        :start="0" 
                        :end="pi" 
                        :step="0.01"
                        v-model="value.value"
                        @change="on_change" />
  <p>当前范围: {{ value.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

pi = 3.14

initial_value = (pi/4., pi/2.)
value = ref(initial_value)

def on_change(event):
    print(f"范围已更新为: {value.value}")
</script>
```

## 固定范围

滑块的`value`默认没有界限，可以超过`end`或低于`start`。如果需要将`value`固定在特定范围内，可以使用`fixed_start`和`fixed_end`：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnEditableRangeSlider name="固定范围滑块" 
                        :start="0" 
                        :end="10" 
                        :fixed_start="-1" 
                        :fixed_end="12"
                        :value="(2, 7)" />
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## 自定义格式

可以使用自定义格式字符串或Bokeh TickFormatter来格式化滑块值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnEditableRangeSlider name="距离（字符串格式）" 
                        format="0.0a"
                        :start="100000" 
                        :end="1000000"
                        :value="(200000, 800000)" />
  <PnEditableRangeSlider name="距离（格式化器）" 
                        :format="tick_formatter"
                        :start="0" 
                        :end="10" 
                        :value="(2, 7)" />
</template>
<script lang='py'>
from vuepy import ref
from bokeh.models.formatters import PrintfTickFormatter

tick_formatter = PrintfTickFormatter(format='%.3f 米')
</script>
```

## API

### 属性

| 属性名          | 说明                           | 类型                                | 默认值     |
| -------------- | ------------------------------ | ---------------------------------- | --------- |
| start          | 滑块的下限，可被更低的`value`覆盖 | ^[float]                           | 0.0       |
| end            | 滑块的上限，可被更高的`value`覆盖 | ^[float]                           | 1.0       |
| fixed_start    | 滑块和输入的固定下限，`value`不能低于此值 | ^[float\|None]              | None      |
| fixed_end      | 滑块和输入的固定上限，`value`不能高于此值 | ^[float\|None]              | None      |
| step           | 值之间的间隔                    | ^[float]                           | 0.1       |
| value          | 所选范围的上下界元组             | ^[(float, float)]                   | (0.0, 1.0) |
| value_throttled| 鼠标释放前阻止的所选范围的上下界元组 | ^[(float, float)]                | (0.0, 1.0) |
| bar_color      | 滑块条的颜色，十六进制RGB值      | ^[str]                             | None      |
| direction      | 滑块方向，从左到右('ltr')或从右到左('rtl') | ^[str]                    | 'ltr'     |
| disabled       | 是否禁用                       | ^[bool]                            | False     |
| format         | 应用于滑块值的格式化器           | ^[str\|bokeh.models.TickFormatter] | None      |
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
import math
pn.extension()

range_slider = pn.widgets.EditableRangeSlider(
    name='Range Slider', 
    start=0, end=math.pi, value=(math.pi/4., math.pi/2.),
    step=0.01)
pn.Row(range_slider.controls(jslink=False), range_slider) 
```
