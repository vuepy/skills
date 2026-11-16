---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# TextAreaInput 多行文本输入框

多行文本输入框允许使用文本输入框输入任何多行字符串。行与行之间使用换行符`\n`连接。

底层实现为`panel.widgets.TextAreaInput`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/TextAreaInput.html

## 基本用法

基本的多行文本输入框，可以输入和获取多行字符串：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTextAreaInput name="TextAreaInput" 
                   description='tooltip'
                   placeholder='Enter a string here...'
                   v-model="text.value" 
                   sizing_mode='stretch_width'/>
  <p>value: {{ text.value }} </p>
</template>
<script lang='py'>
from vuepy import ref

text = ref("")
</script>
```

## 自动增长

自动增长的 TextAreaInput 会根据输入的文本自动调整高度。设置 `rows` 和 `auto_grow` 可以设置行数下限，而设置 `max_rows` 可以提供上限：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTextAreaInput name="Growing TextArea" 
                  :auto_grow="True" 
                  :max_rows="10" 
                  :rows="6" 
                  :value="initial_text" 
                  :width="500" />
</template>
<script lang='py'>
from vuepy import ref

initial_text = """\
This text area will grow when newlines are added to the text:

1. Foo
2. Bar
3. Baz
"""
</script>
```

## 可调整大小

可以设置文本区域只在垂直方向可调整大小：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTextAreaInput name="垂直可调整文本框" resizable="height" />
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## API

### 属性

| 属性名        | 说明                    | 类型      | 默认值     |
| ------------ | ----------------------- | -------- | --------- |
| value        | 当前值，在组件失去焦点时更新 | ^[str]   | ""        |
| value_input  | 当前值，在每次按键时更新    | ^[str]   | ""        |
| auto_grow    | 文本区域是否自动增长以适应内容 | ^[bool] | False     |
| cols         | 文本输入字段的列数         | ^[int]   | 2         |
| disabled     | 是否禁用                 | ^[bool]  | False     |
| max_length   | 输入字段的最大字符长度     | ^[int]   | 5000      |
| max_rows     | 当auto_grow=True时文本输入字段的最大行数 | ^[int] | None |
| name         | 组件标题                 | ^[str]   | ""        |
| placeholder  | 未输入值时显示的占位字符串  | ^[str]   | ""        |
| description      | 鼠标悬停时显示的描述      | ^[str]      | ""        |
| rows         | 文本输入字段的行数         | ^[int]   | 2         |
| resizable    | 布局是否可交互调整大小，如果是，则指定哪个维度：height、width、both、False | ^[bool\|str] | 'both' |

### Events

| 事件名         | 说明                       | 类型                                   |
| ------------- | -------------------------- | -------------------------------------- |
| change        | 当值更改时触发的事件         | ^[Callable]`(event: dict) -> None`    |

## Controls

```python
##controls
import panel as pn
pn.extension()

text_area_input = pn.widgets.TextAreaInput(
    name='Text Area Input', placeholder='Enter a string here...',
    description='xx'
)
pn.Row(text_area_input.controls(jslink=True), text_area_input)
```
