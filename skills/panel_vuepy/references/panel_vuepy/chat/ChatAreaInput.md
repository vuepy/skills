---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# ChatAreaInput 聊天输入组件

多行文本输入组件，继承自 TextAreaInput，允许通过文本输入框输入任意多行字符串。支持使用 Enter 键或可选的 Ctrl-Enter 键提交消息。

与 TextAreaInput 不同，ChatAreaInput 默认 auto_grow=True 且 max_rows=10，并且 value 在消息实际发送前不会同步到服务器。如果需要访问输入框中当前的文本，请使用 value_input。

底层实现为`panel.chat.ChatAreaInput`，参数基本一致，参考文档：https://panel.holoviz.org/reference/chat/ChatAreaInput.html

## 基本用法

根据 enter_sends 参数的值(默认为 True)，按 Enter 键或 Ctrl-Enter/Cmd-Enter 键提交消息：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnChatAreaInput v-model='output_text.value'
                   placeholder="Type something, and press Enter to clear!" />
  <p> value: {{ output_text.value }}</p>
</template>
<script lang='py'>
from vuepy import ref
            
output_text = ref("")
</script>
```

## 实时更新

要查看当前输入的内容而不等待提交，可以使用 value_input 属性：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnChatAreaInput 
    :enter_sends='False'
    v-model:value_input="output_text.value"
    placeholder="Type something, do not submit it" 
  />
  <p> value: {{ output_text.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

output_text = ref("")
</script>
```

## API

### 属性

| 属性名           | 说明                                                                 | 类型                          | 默认值        |
|----------------|--------------------------------------------------------------------|-----------------------------|--------------|
| disabled_enter | 是否禁用回车键发送消息                                                 | ^[bool]                     | -            |
| enter_sends    | 发送方式（True=回车键发送，False=Ctrl+回车键发送）                        | ^[bool]                     | True         |
| value          | 按下发送键时的消息内容（发送后自动重置为空，需配合watch/bind使用）            | ^[str]                      | ""           |
| value_input    | 实时更新的当前输入内容                                                  | ^[str]                      | ""           |
| enter_pressed  | 回车键/Ctrl+回车键按下事件                                              | ^[bool]                     | -            |
| auto_grow   | 是否自动增加高度以适应内容                                              | ^[bool]                     | True         |
| cols        | 输入框列数                                                           | ^[int]                      | 2            |
| disabled    | 是否禁用编辑                                                         | ^[bool]                     | False        |
| max_length  | 最大输入字符数                                                       | ^[int]                      | 50000        |
| max_rows    | 自动增长时的最大行数                                                  | ^[int]                      | 10           |
| name        | 组件标题                                                            | ^[str]                      | ""           |
| placeholder | 空白时的占位文本                                                     | ^[str]                      | ""           |
| rows        | 输入框行数                                                           | ^[int]                      | 2            |
| resizable   | 是否可调整大小（'width'-宽度, 'height'-高度, 'both'-双向, False-不可调整） | ^[bool\|str]                | 'both'       |

### Events

| 事件名    | 说明           | 类型                                  |
| -------- | ------------- | ------------------------------------- |
| change   | value 值改变时触发   | ^[Callable]`(value: str) -> None`    |

## Controls

```python
##controls
import panel as pn
pn.extension()

chat_area = pn.chat.ChatAreaInput(placeholder="Type something...")
pn.Row(chat_area.controls(), chat_area)
```
