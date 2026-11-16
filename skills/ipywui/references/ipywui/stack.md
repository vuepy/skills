---
outline: deep
titleTemplate: :title | IPywUI
---

# Stack 组件栈

`Stack` 组件栈可以包含多个 `StackItem`，每次只显示一个。

## 基础用法

`Stack` 组件栈可以包含多个 `StackItem`，每次只显示一个，通过 `selected_label` 设置。

```vue
<!-- basic.vue -->
<template>
  <HBox>
    <Button label="s1" style="width: auto" @click="to('s1')"></Button>
    <Button label="s2" style="width: auto" @click="to('s2')"></Button>
    <Button label="s3" style="width: auto" @click="to('s3')"></Button>
  </HBox>

  <Stack v-model="selected.value" @change="on_change">
    <StackItem label="s1">
      <Slider description="s1 slider"></Slider>
    </StackItem>

    <StackItem label="s2">
      <Input placeholder="s2 input"></Input>
    </StackItem>

    <StackItem label="s3">
      <Button label="s3 click" type="info"></Button>
    </StackItem>

  </Stack>
</template>

<script setup>
import Stack from "../../../src/ipywui/components/Stack";
import StackItem from "../../../src/ipywui/components/StackItem";
import Slider from "../../../src/ipywui/components/Slider";
import Input from "../../../src/ipywui/components/Input";
import Button from "../../../src/ipywui/components/Button";
import HBox from "../../../src/ipywui/components/HBox";
</script>
<script lang="py">
from vuepy import ref

selected = ref('s1')

def to(label):
    selected.value = label

def on_change(event):
    # get selected index
    print(event) # {'new': 1, 'old': 0, 'owner': Stack(...)}

</script>
```

## Stack API

### Stack 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/selected_label | 绑定值，当前标签             | ^[str]                                                         | —       |
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

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当绑定值变化时触发的事件 |  ^[Callable]`({'new': val, 'old': val, 'owner': widget) -> None` |

### Stack Slots

| 插槽名   | 说明               | 子标签 |
| ---     | ---               | --- |
| default | 自定义默认内容      | StackItem |

### Stack 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |

## StackItem API

### StackItem 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| label | 标签 | ^[str]                                                         | —       |

### StackItem Slots

| 插槽名   | 说明               | 
| ---     | ---               |
| default | 自定义默认内容      |
