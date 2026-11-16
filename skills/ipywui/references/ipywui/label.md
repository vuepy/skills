---
outline: deep
titleTemplate: :title | IPywUI
---

# Label 标签

标签组件

## 基础用法

在组件旁边自定义描述

```vue
<!-- basic.vue -->
<template>
  <HBox>
    <Label>The $E=mc^2$ </Label><Slider :value="1.0"></Slider>
  </HBox>
  <HBox>
    <Label>Value {{ val.value }}</Label><Slider v-model="val.value"></Slider>
  </HBox>
  <HBox>
    <Label value="slider"></Label><Slider :value="1.0"></Slider>
  </HBox>
</template>

<script setup>
import Label from "../../../src/ipywui/components/Label";
import Slider from "../../../src/ipywui/components/Slider";
import HBox from "../../../src/ipywui/components/HBox";
</script>
<script lang="py">
from vuepy import ref

val = ref(1)
</script>
```

## 自定义样式

您可以自定义按钮的颜色。  
使用 `style` 属性额外配置样式: 
* `background` 设置背景颜色，可使用`#ffffff`、`blue`等和 `css` 兼容的形式。
* `description-width` 设置距离，可使用`px`、`%`等形式。
* `font-family`：标签文字字体
* `font-size`：标签文字大小
* `font-style`：标签文字样式
* `font-variant`：[ref](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant)
* `font-weight`：标签文字字重
* `text-color`：标签文字颜色
* `text-decoration`：标签文字上的装饰性线条外观。 [ref](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration)

```vue
<!-- custom.vue -->
<template>
  <Label value="background lightblue" style="background: lightblue"></Label>
  <Label value="description-width: 100px" style="description-width: 100px"></Label>
  <Label value="font-size 16px" style="font-size: 16px"></Label>
  <Label value="font-style italic" style="font-style: italic"></Label>
  <Label value="font-weight bold" style="font-weight: bold"></Label>
  <Label value="color red" style="color: red"></Label>
  <Label value="text-decoration: underline" style="text-decoration: underline"></Label>
</template>

<script setup>
import Label from "../../../src/ipywui/components/Label";
</script>
```

## API

### 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 绑定值，标签文本 | ^[str]                                                       | —       |
| style    | 自定义css样式         | ^[str]                                                         | -       |

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

### 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
