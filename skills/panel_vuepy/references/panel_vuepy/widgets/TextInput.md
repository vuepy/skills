---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# TextInput 文本输入框

文本输入框允许使用文本输入框输入任何字符串。

底层实现为`panel.widgets.TextInput`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/TextInput.html

## 基本用法

基本的文本输入框，可以输入和获取字符串：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTextInput name="Text Input" 
               placeholder="Enter a string here..." 
               description="tooltip" 
               v-model="text.value"/>
  <p>value: {{ text.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

text = ref("")
</script>
```

## 实时输入

TextInput 组件提供了`value_input`参数，可以在每次按键时更新：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTextInput name="Text Input" 
               placeholder="Enter a string here..." 
               v-model:value_input="text.value"/>
  <p>value: {{ text.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

text = ref("")
</script>
```

## API

### 属性

| 属性名        | 说明                    | 类型      | 默认值     |
| ------------ | ----------------------- | -------- | --------- |
| value        | 当前值，在按下Enter键或组件失去焦点时更新 | ^[str] | ""        |
| value_input  | 当前值，在每次按键时更新     | ^[str]   | ""        |
| disabled     | 是否禁用                 | ^[bool]  | False     |
| max_length   | 输入字段的最大字符长度     | ^[int]   | 5000      |
| name         | 组件标题                 | ^[str]   | ""        |
| description  | 鼠标悬停时显示的描述      | ^[str]      | ""        |
| placeholder  | 未输入值时显示的占位字符串  | ^[str]   | ""        |

### Events

| 事件名         | 说明                       | 类型                                   |
| ------------- | -------------------------- | -------------------------------------- |
| change        | 当值更改时触发的事件         | ^[Callable]`(event: dict) -> None`    |
| enter_pressed | 当按下Enter键时触发的事件    | ^[Callable]`() -> None`               |

## Controls

```python
##controls
import panel as pn
pn.extension()

text_input = pn.widgets.TextInput(name='Text Input', placeholder='Enter a string here...')
pn.Row(text_input.controls(jslink=True), text_input)
```
