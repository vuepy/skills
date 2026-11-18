---
outline: deep
titleTemplate: :title | IPywUI
---

# Accordion 手风琴面板 

通过手风琴面板收纳内容区域

## 基础用法

每次只能展开一个面板。

通过设置 `selected_index` 属性 或 `v-model` 绑定的变量值来打开选中的面板。  
如果设置为 `None` 将关闭所有面板。面板的索引值从`0`开始。

```vue
<!-- basic.vue -->
<template>
  <Accordion v-model="selected.value" @change="on_change">
    <AccordionItem title="Item0">
      <Slider description="slider"></Slider>
    </AccordionItem>

    <AccordionItem title="Item1">
      <Input placeholder="input"></Input>
    </AccordionItem>

    <AccordionItem title="Item2">
      <Button label="click" type="info"></Button>
    </AccordionItem>

  </Accordion>
</template>
<script setup>
import Accordion from "../../../src/ipywui/components/Accordion";
import AccordionItem from "../../../src/ipywui/components/AccordionItem";
import Slider from "../../../src/ipywui/components/Slider";
import Input from "../../../src/ipywui/components/Input";
import Button from "../../../src/ipywui/components/Button";
</script>
<script lang="py">
from vuepy import ref

selected = ref(1)

def on_change(event):
    print(event) # {'new': 1, 'old': 0, 'owner': Accordion(...)}
</script>
```

## Accordion API

### Accordion 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/selected_index | 绑定值，当前活动面板对应的索引值 | ^[int]                                                         | —       |
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

### Accordion Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 切换活动面板时触发 |  ^[Callable]`({'new': int, 'old': int, 'owner':widget}) -> None` |

### Accordion Slots

| 插槽名   | 说明               | 子标签 |
| ---     | ---               | --- |
| default | 自定义默认内容      | Accordion Item |

### Accordion 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |

## Accordion Item API

### Accordion Item 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| title | 面板标题 | ^[str]                                                         | —       |

### Accordion Item Slots

| 插槽名   | 说明               | 
| ---     | ---               |
| default | 自定义默认内容      |
