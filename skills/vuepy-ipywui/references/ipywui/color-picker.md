---
outline: deep
titleTemplate: :title | IPywUI
---

# ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

## 基础用法

使用 `v-model` 与 Vue 实例中的一个变量进行双向绑定，颜色为 RGB 的 HEX 形式。

```vue
<!-- basic.vue -->
<template>
  <ColorPicker label="Pick1"
               v-model="color1.value" @change="on_change"></ColorPicker>

  <ColorPicker label="Pick2"
               value="lightblue"></ColorPicker>

  <ColorPicker label="Concise"
               v-model="color2.value" concise></ColorPicker>
</template>

<script setup>
import ColorPicker from "../../../src/ipywui/components/ColorPicker";
</script>
<script lang="py">
from vuepy import ref

color1 = ref("#8f8fcc")
color2 = ref("green")

def on_change(event):
    print(event) # {'new': '', 'old': '#8f8fcc', 'owner': ColorPicker(...)}
</script>
```

## 禁用状态

你可以使用 `disabled` 属性来定义是否被禁用。  
使用 `disabled` 属性来控制是否为禁用状态。该属性接受一个 `bool` 类型的值。

```vue
<!-- disabled.vue -->
<template>
  <ColorPicker label="Disable" disabled></ColorPicker>
</template>

<script setup>
</script>
```

## 提示信息

通过 `tooltip` 属性在鼠标 hover 时展示提示信息。

```vue
<!-- tooltip.vue -->
<template>
  <ColorPicker label="hover"
               tooltip="tooltip info !"
               value="lightgreen"
               concise
  ></ColorPicker>
</template>

<script setup>
import ColorPicker from "../../../src/ipywui/components/ColorPicker";
</script>

<style scoped>

</style>
```

## 自定义样式

您可以自定义按钮的距离。  
使用 `style` 属性，通过 `description-width` 设置距离，可使用`px`、`%`等形式。

```vue
<!-- custom.vue -->
<template>
  <VBox>
    <ColorPicker label="description-width 200px"
                 style="description-width: 200px;" concise
    ></ColorPicker>

    <ColorPicker label="description-width 160px"
                 style="description-width: 160px;" concise
    ></ColorPicker>

    <ColorPicker label="description-width 50%"
                 style="description-width: 50%" concise
    ></ColorPicker>
  </VBox>
</template>

<script setup>
import VBox from "../../../src/ipywui/components/VBox";
import ColorPicker from "../../../src/ipywui/components/ColorPicker";
</script>
```

## ColorPicker API

### ColorPicker 属性

| 属性名    | 说明                 | 类型                                                           | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 选中项绑定值     | ^[str]                                                         | —       |
| label   | 按钮文字             | ^[str]                                                          | —       |
| concise | 是否为简洁模式        | ^[bool]                                                         | false   |
| tooltip  | 提示信息             | ^[str]                                                         | —       |
| disabled | 按钮是否为禁用状态     | ^[boolean]                                                     | false   |
| style    | 自定义 css 样式       | ^[str]                                                         | -       |

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
| change | 当绑定值变化时触发的事件 |  ^[Callable]`({'new': val, 'old': val, 'owner': widget) -> None` |

### ColorPicker 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
