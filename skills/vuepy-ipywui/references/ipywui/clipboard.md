---
outline: deep
titleTemplate: :title | IPywUI
---

# Clipboard 剪贴板

提供复制内容到剪贴板功能。

::: warning
当前页面只能展示组件的样式，具体交互效果需要在 `notebook` 使用。
:::

## 基础用法

在被点击时，将 `copy` 的值复制到系统剪贴板中。  
`Clipboard` 是一个容器，需要嵌入 `Button` 等组件才会被展示。

```vue
<!-- basic.vue -->
<template>
  <HBox>
    <Input v-model="copytext.value"></Input>
    <Clipboard :copy="copytext.value">
      <Button label="copy" type="info"></Button>
    </Clipboard>
  </HBox>
</template>

<script src="./basic_setup.py"></script>
<script setup>
import Clipboard from "../../../src/ipywui/components/Clipboard";
import Button from "../../../src/ipywui/components/Button";
import HBox from "../../../src/ipywui/components/HBox";
import Input from "../../../src/ipywui/components/Input";
</script>
```

```python
# ./basic_setup.py

from vuepy import ref

def setup(props, ctx, vm):
    copytext = ref("hello")

    return locals()
```

## Clipboard API

### Clipboard 属性

| 属性名    | 说明                 | 类型                                                           | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| copy     | 被复制的内容          | ^[str]                                                         | —       |
| tag      | 容器使用的 HTML 标签  | ^[str]                                                         | div       |

### Clipboard Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| copy  | 当复制完成时触发的事件   |  ^[Callable]`(idx: int) -> None` |

### Clipboard Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

### Clipboard 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
