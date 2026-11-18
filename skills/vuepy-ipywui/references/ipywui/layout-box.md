---
outline: deep
titleTemplate: :title | IPywUI
---

# Box 基本布局

基本的水平、垂直布局

## 垂直布局

常用于替代 `div` 标签。

```vue
<template>
  <VBox>
    <Button label="1" style="width: auto; background-color: #c8e3fe"></Button>
    <Button label="2" style="width: auto; background-color: #ecf5fe"></Button>
    <Button label="3" style="width: auto; background-color: #c8e3fe"></Button>
  </VBox>
</template>

<script setup>
import Button from "../../../src/ipywui/components/Button";
import VBox from "../../../src/ipywui/components/VBox";
</script>
```

## 水平布局

```vue
<template>
  <HBox>
    <Button label="1" style="width: auto;background-color: #c8e3fe"></Button>
    <Button label="2" style="width: auto;background-color: #ecf5fe"></Button>
    <Button label="3" style="width: auto;background-color: #c8e3fe"></Button>
  </HBox>
</template>

<script setup>
import Button from "../../../src/ipywui/components/Button";
import HBox from "../../../src/ipywui/components/HBox";
</script>
```

## VBox API

### VBox 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| style        | 自定义css样式        | ^[str]                                                         | -       |

### VBox Slots

| 插槽名   | 说明               | 子标签 |
| ---     | ---               | --- |
| default |  自定义默认内容 |  |

### VBox 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |

## HBox API

### HBox 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| style        | 自定义css样式        | ^[str]                                                         | -       |

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

### HBox Slots

| 插槽名   | 说明               | 子标签 |
| ---     | ---               | --- |
| default |  自定义默认内容 |  |

### HBox 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
