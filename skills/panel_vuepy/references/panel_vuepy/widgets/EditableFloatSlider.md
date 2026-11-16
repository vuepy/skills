---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# EditableFloatSlider 可编辑浮点滑块

可编辑浮点滑块组件允许使用滑块在设定的范围内选择浮点数值，并提供一个可编辑的数字输入框以便进行精确控制。

底层实现为`panel.widgets.EditableFloatSlider`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/EditableFloatSlider.html

## 基本用法

基本的可编辑浮点滑块，可以通过滑动或直接输入数字来选择值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnEditableFloatSlider name="浮点滑块" 
                        :start="0" 
                        :end="3.141" 
                        :step="0.01" 
                        :value="1.57" 
                        v-model="value.value"/>
  <div>当前值: {{ value.value }}</div>
</template>
<script lang='py'>
from vuepy import ref

value = ref(1.57)
</script>
```

## 固定范围

滑块的`value`默认没有界限，可以超过`end`或低于`start`。如果需要将`value`固定在特定范围内，可以使用`fixed_start`和`fixed_end`：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnEditableFloatSlider name="固定范围滑块" 
                        :start="0" 
                        :end="10" 
                        :fixed_start="-3.14" 
                        :fixed_end="15.0"
                        :value="5" />
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
  <PnEditableFloatSlider name="距离" 
                        format="1[.]00"
                        :start="0" 
                        :end="10" 
                        :value="5" />
  <PnEditableFloatSlider name="距离（米）" 
                        :format="tick_formatter"
                        :start="0" 
                        :end="10" 
                        :value="5" />
</template>
<script lang='py'>
from vuepy import ref
from bokeh.models.formatters import PrintfTickFormatter

tick_formatter = PrintfTickFormatter(format='%.3f m')
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
| value          | 所选值，浮点类型                | ^[float]                           | 0.0       |
| value_throttled| 鼠标释放前阻止的所选值，浮点类型  | ^[float]                           | 0.0       |
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
pn.extension()

float_slider = pn.widgets.EditableFloatSlider(name='Float Slider', start=0, end=3.141, step=0.01, value=1.57)
pn.Row(float_slider.controls(jslink=False), float_slider) 
```
