---
outline: deep
titleTemplate: :title | IPywUI
---

# Combobox 自动补全输入框

根据输入内容提供对应的输入建议。

## 基础用法

Combobox 组件提供输入建议。

```vue
<!-- basic.vue -->
<template>
  <Combobox label="auto"
            placeholder="Choose someone"
            v-model="someone.value"
            :options="['Paul', 'John', 'George', 'Ringo']"
  ></Combobox>
</template>

<script src="./basic_setup.py"></script>
<script setup>
import Combobox from "../../../src/ipywui/components/Combobox";
</script>
```

```python
# ./basic_setup.py

from vuepy import ref

def setup(props, ctx, vm):
    someone = ref('')

    return locals()
```

## 禁用状态

你可以使用 `disabled` 属性来定义是否被禁用。  
使用 `disabled` 属性来控制是否为禁用状态。该属性接受一个 `bool` 类型的值。

```vue
<!-- disabled.vue -->
<template>
  <Combobox label="Disabled" disabled></Combobox>
</template>

<script setup>
import Combobox from "../../../src/ipywui/components/Combobox";
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
  <Combobox label="custom"
            value="Paul"
            :options="['Paul', 'John', 'George', 'Ringo']"
            style="background: lightblue; color: darkorange; font-size: large"
  ></Combobox>

  <Combobox label="bg green"
            style="background: green;"
  ></Combobox>

  <Combobox label="text red"
            value="Paul"
            style="color: red;"
  ></Combobox>

  <Combobox label="text 20px"
            value="Paul"
            style="font-size: 20px;"
  ></Combobox>

  <Combobox label="label width 150px"
            value="Paul"
            style="description-width: 150px"
  ></Combobox>
</template>

<script setup>
import Combobox from "../../../src/ipywui/components/Combobox";
</script>
```

## Combobox API

### Combobox 属性

| 属性名    | 说明                 | 类型                                                           | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 选中项绑定值     | ^[any]                                                         | —       |
| label    | 标签文字             | ^[str]                                                         | —       |
| placeholder | 占位文本             | ^[str]                                                         | —       |
| options | 可选项列表             | ^[list]                                                         | —       |
| ensure_option | 输入的值是否必须为`options`中的值 | ^[boolean]                                      | false   |
| continuous_update| 输入过程中是否持续发送更新事件 | ^[boolean]                                      | false   |
| disabled | 按钮是否为禁用状态     | ^[boolean]                                                     | false   |
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

### Combobox 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
