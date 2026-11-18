---
outline: deep
titleTemplate: :title | IPywUI
---

# Input 输入框

通过鼠标或键盘输入字符

## 基础用法

`continuous_update` 表示输入过程中是否持续发送更新事件。

```vue
<!-- basic.vue -->
<template>
  <VBox>
    <Input label="input"
           placeholder="Please input"
           v-model="text1.value"
           @change="on_change"
    ></Input>

    <Input label="input"
           placeholder="continuous update"
           v-model="text2.value"
           continuous_update
           @change="on_change2"
    ></Input>
  </VBox>
</template>

<script setup>
import VBox from "../../../src/ipywui/components/VBox";
import Input from "../../../src/ipywui/components/Input";
</script>
<script lang="py">
from vuepy import ref

text1 = ref("")
text2 = ref("")

# called when enter key is pressed or the input is blurred
def on_change(value):
    print(value) # {'new': 'hello', 'old': '', 'owner': Text(...)}

# called when the input is changed
def on_change2(value):
    print(value) # {'new': 'hello', 'old': '', 'owner': Text(...)}
</script>
```

## 禁用状态

你可以使用 `disabled` 属性来定义是否被禁用。  
使用 `disabled` 属性来控制是否为禁用状态。该属性接受一个 `bool` 类型的值。

```vue
<!-- disabled.vue -->
<template>
  <Input placeholder="Disabled" disabled></Input>
  <Input placeholder="disabled=True" :disabled="True"></Input>
  <Input placeholder="disabled=False" :disabled="False"></Input>
</template>

<script setup>
import Input from "../../../src/ipywui/components/Input";
</script>
```

## 密码框

将 `type` 属性指定为 `password` 即可得到一个密码框。

```vue
<!-- password.vue -->
<template>
  <Input label="Password" type="password" value="xxx"></Input>
</template>

<script setup>
import Input from "../../../src/ipywui/components/Input";
</script>
```

## 文本域

将 `type` 属性指定为 `textarea` 即可得到一个密码框。

```vue
<!-- textarea.vue -->
<template>
  <Input label="Textarea" type="textarea" value="Please input"></Input>
</template>

<script setup>
import Input from "../../../src/ipywui/components/Input";
</script>
```

## 自定义样式

您可以自定义输入框的背景颜色、文字颜色、文字大小。  
使用 `style` 属性额外配置样式: 
* `background-color` 设置背景颜色，可使用`#ffffff`、`blue`等和 `css` 兼容的形式。
* `color` 设置文字颜色，可使用`#ffffff`、`blue`等和 `css` 兼容的形式。
* `font-size` 设置文字大小。
* `description-width`：label的宽度。

```vue
<!-- custom.vue -->
<template>
  <Input label="custom"
         value="Paul"
         :options="['Paul', 'John', 'George', 'Ringo']"
         style="background: lightblue; color: darkorange; font-size: large"
  ></INput>

  <Input label="bg green"
         type="textarea"
         style="background: green;"
  ></Input>

  <Input label="text red"
         value="Paul"
         style="color: red;"
  ></Input>

  <Input label="text 20px"
         value="Paul"
         style="font-size: 20px;"
  ></Input>

  <Input label="label width 150px"
         type="password"
         value="Paul"
         style="description-width: 150px"
  ></Input>
</template>

<script setup>
import Input from "../../../src/ipywui/components/Input";
</script>
```

## API

### 属性

| 属性名    | 说明                 | 类型                                                           | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 绑定值             | ^[str]                                                      | —       |
| label    | 标签文字             | ^[str]                                                         | —       |
| type     | 类型                | ^[enum]`'text'\| 'textarea'\| 'password'`                      | —       |
| continuous_update| 输入过程中是否持续发送更新事件 | ^[boolean]                                      | false   |
| disabled | 按钮是否为禁用状态     | ^[boolean]                                                     | false   |
| placeholder | 输入框占位符 | ^[str]                                                     | - |
| style    | 自定义css样式             | ^[str]                                                         | -       |

::: tip

**style 支持的其它css属性**

Sizes相关
* height
* width
* max_height
* max_width
* min_height
* min_width

Display相关
* visibility
* display
* overflow

Box model相关
* border
* margin
* padding

Positioning相关
* top
* left
* bottom
* right

:::

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当绑定值变化时,当输入框失去焦点或用户按Enter时触发 |  ^[Callable]`({'new': val, 'old': val, 'owner': widget) -> None` |

### 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
