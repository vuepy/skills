---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# ColorPicker 颜色选择器

颜色选择器组件允许使用浏览器的颜色选择小部件选择颜色。

底层实现为`panel.widgets.ColorPicker`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/ColorPicker.html

## 基本用法

基本的颜色选择器使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnColorPicker name="basic" value="#99ef78" @change="update_color" />
  <div>color: {{ color.value }}</div>
</template>
<script lang='py'>
from vuepy import ref

color = ref('#99ef78')

def update_color(value):
    color.value = value
</script>
```

## 默认颜色设置

可以通过设置`value`参数来指定默认颜色：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnColorPicker name="red" value="#ff0000" @change="update_red" />
    <PnColorPicker name="green" value="#00ff00" @change="update_green" />
    <PnColorPicker name="blue" value="#0000ff" @change="update_blue" />
  </PnRow>
</template>
<script lang='py'>
from vuepy import ref

red = ref('#ff0000')
green = ref('#00ff00')
blue = ref('#0000ff')

def update_red(value):
    red.value = value

def update_green(value):
    green.value = value

def update_blue(value):
    blue.value = value
</script>
```

## 禁用状态

可以通过设置`disabled`参数为`True`使颜色选择器处于禁用状态：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnColorPicker name="可用状态" value="#ff9900" />
    <PnColorPicker name="禁用状态" value='#3399ff' disabled />
  </PnRow>
</template>
```

## 实时应用颜色

颜色选择器可以用于实时更新网页元素的样式：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnColorPicker name="背景色" v-model="bg_color.value" />
    <PnColorPicker name="文字色" v-model="text_color.value" />
  </PnRow>
    <p :style="f'background-color: {bg_color.value}; color: {text_color.value};'">
      这是一段示例文本，您可以通过上方的颜色选择器来更改其背景色和文字颜色。
   </p>
</template>
<script lang='py'>
from vuepy import ref

bg_color = ref('#f0f0f0')
text_color = ref('#333333')

def update_bg(value):
    bg_color.value = value

def update_text(value):
    text_color.value = value
</script>
```

## API

### 属性

| 属性名       | 说明                 | 类型      | 默认值    |
| ----------- | ------------------- | --------- | --------- |
| value       | 颜色值（十六进制RGB）  | ^[str]    | "#000000" |
| disabled    | 是否禁用组件          | ^[bool]   | False     |
| name        | 组件标题             | ^[str]    | ""        |
| description | 鼠标悬停时显示的描述   | ^[str]    | ""        |

### Events

| 事件名  | 说明                | 类型                          |
| ------ | ------------------ | ----------------------------- |
| change | 当颜色改变时触发的事件 | ^[Callable]`(value) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()

colorpicker = pn.widgets.ColorPicker(name='Color Picker', value='#99ef78')
pn.Row(colorpicker.controls, colorpicker)
```
