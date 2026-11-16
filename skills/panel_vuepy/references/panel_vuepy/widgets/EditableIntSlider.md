---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# EditableIntSlider 可编辑整数滑块

EditableIntSlider组件允许用户在设定范围内通过滑块选择整数值，并提供一个可编辑的数字输入框以进行更精确的控制。

底层实现为`panel.widgets.EditableIntSlider`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/EditableIntSlider.html

## 基本用法

可编辑整数滑块提供了滑块和输入框两种方式来选择和输入整数值。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnEditableIntSlider 
    name="整数滑块" 
    :start="0" 
    :end="8" 
    :step="2" 
    :value="4"
    v-model="int_value.value"
    @change="on_change"
  />
  <PnStaticText :value="f'选择的值: {int_value.value}'" />
</template>
<script lang='py'>
from vuepy import ref

int_value = ref(4)

def on_change(event):
    print(f"值改变: {event}")
</script>
```

## 固定范围

通过设置`fixed_start`和`fixed_end`参数，可以限制value的范围，使其不能超出这个范围。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnEditableIntSlider 
    name="固定范围滑块" 
    :start="0" 
    :end="10" 
    :step="1" 
    :value="5"
    :fixed_start="-2"
    :fixed_end="12"
    v-model="fixed_value.value"
  />
  <PnStaticText :value="f'尝试输入超出范围的值（-2~12）: {fixed_value.value}'" />
</template>
<script lang='py'>
from vuepy import ref

fixed_value = ref(5)
</script>
```

## 自定义格式

可以通过format参数自定义整数的显示格式。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol>
    <PnEditableIntSlider 
      name="八进制" 
      format="0o" 
      :start="0" 
      :end="100"
      :value="10"
      v-model="octal_value.value"
    />
    
    <PnEditableIntSlider 
      name="带单位" 
      :format="formatter" 
      :start="0" 
      :end="100"
      :value="42"
      v-model="duck_value.value"
    />
  </PnCol>
</template>
<script lang='py'>
from vuepy import ref
from bokeh.models.formatters import PrintfTickFormatter

octal_value = ref(10)
duck_value = ref(42)
formatter = PrintfTickFormatter(format='%d 只鸭子')
</script>
```

## 自定义样式

通过设置bar_color和orientation等属性可以自定义滑块样式。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnEditableIntSlider 
    name="水平自定义滑块" 
    :start="0" 
    :end="10" 
    :step="1" 
    :value="5"
    bar_color="#ff5722"
    tooltips
    v-model="horizontal_value.value"
  />
  
  <PnEditableIntSlider 
    name="垂直自定义滑块" 
    :start="0" 
    :end="10" 
    :step="1" 
    :value="7"
    orientation="vertical"
    bar_color="#2196f3"
    tooltips
    v-model="vertical_value.value"
  />
</template>
<script lang='py'>
from vuepy import ref

horizontal_value = ref(5)
vertical_value = ref(7)
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| start | 滑块的下限，可以被较低的`value`覆盖 | ^[float] | — |
| end | 滑块的上限，可以被较高的`value`覆盖 | ^[float] | — |
| fixed_start | 滑块和输入框的固定下限，`value`不能低于此值 | ^[float]^[None] | None |
| fixed_end | 滑块和输入框的固定上限，`value`不能高于此值 | ^[float]^[None] | None |
| step | 值之间的间隔 | ^[int] | 1 |
| value | 当前选中的整数值 | ^[int] | — |
| bar_color | 滑块条的颜色，十六进制RGB值 | ^[string] | — |
| direction | 滑块方向，从左到右('ltr')或从右到左('rtl') | ^[string] | 'ltr' |
| disabled | 是否禁用 | ^[boolean] | false |
| format | 应用于滑块值的格式化字符串或bokeh TickFormatter | ^[string]^[bokeh.models.TickFormatter] | — |
| name | 组件标题 | ^[string] | — |
| orientation | 滑块方向，水平('horizontal')或垂直('vertical') | ^[string] | 'horizontal' |
| tooltips | 是否在滑块手柄上显示提示 | ^[boolean] | false |

### Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| change | 当值改变时触发 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn
from bokeh.models.formatters import PrintfTickFormatter

pn.extension()

int_slider = pn.widgets.EditableIntSlider(
    name='Integer Slider', start=0, end=8, step=2, value=4)
int_slider.fixed_start = -2

str_format = pn.widgets.EditableIntSlider(
    name='Rank', format='0o', start=0, end=100)
tick_format = pn.widgets.EditableIntSlider(
    name='Count', format=PrintfTickFormatter(format='%d ducks'), start=0, end=100)

pn.Row(int_slider.controls(jslink=False), int_slider) 
```
