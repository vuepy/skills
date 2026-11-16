---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# PasswordInput 密码输入框

密码输入框组件是一个专用于输入密码的文本输入框，会将输入的字符显示为掩码以保护隐私。

底层实现为`panel.widgets.PasswordInput`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/PasswordInput.html

## 基本用法

基本的密码输入框使用： 可以通过设置`v-mode`/`value`参数为密码输入框设置默认值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnPasswordInput name="password" 
                  placeholder="input password"
                  description="tooltip"
                  v-model="pw.value" />
</template>
<script lang='py'>
from vuepy import ref

pw = ref('')
</script>
```

## API

### 属性

| 属性名            | 说明                    | 类型        | 默认值    |
| ---------------- | ---------------------- | ----------- | --------- |
| value            | 当前输入的密码           | ^[str]      | ""        |
| placeholder      | 输入框占位文本           | ^[str]      | ""        |
| name             | 组件标题                | ^[str]      | ""        |
| description      | 鼠标悬停时显示的描述      | ^[str]      | ""        |

### Events

| 事件名  | 说明                | 类型                          |
| ------ | ------------------ | ----------------------------- |
| change | 当密码更改时触发的事件 | ^[Callable]`(value) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()

password_input = pn.widgets.PasswordInput(name='Password Input', placeholder='Enter password')
pn.Row(password_input.controls, password_input)
```
