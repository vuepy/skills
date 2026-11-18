---
outline: deep
titleTemplate: :title | IPywUI
---

# Dialog 对话框

在保留当前页面状态的情况下，告知用户并承载相关操作。

::: warning
当前页面只能展示组件的样式，具体交互效果需要在 `notebook` 使用。
:::

## 基础用法

Dialog 弹出一个对话框，适合需要定制性更大的场景。  
需要设置 `v-model` 属性，它接收 `bool`，当为 `True` 时显示 `Dialog`。 `Dialog` 分为两个部分：`body` 和 `footer`，`footer` 需要具名为 `footer` 的 slot。 `title` 属性用于定义标题，它是可选的，默认值为空。 

::: tip
`Dialog` 需要放在最外层才能正确显示！  
:::

```vue
<!-- basic.vue -->
<template>
  <Button label="show dialog" type='info' @click="show()"></Button>
  <Label value="Placeholder" style="height: 200px"></Label>
  <Dialog title="Shipping address" v-model="is_show.value" width="55%">
    <template>
      <Input placeholder="name"></Input>
    </template>
    <template v-slot:footer>
      <HBox>
        <Button label="Cancel" type="warning" @click="close()"></Button>
        <Button label="Ok" type="info" @click="close()"></Button>
      </HBox>
    </template>
  </Dialog>
</template>

<script src="./basic_setup.py"></script>
<script setup>
import Dialog from "../../../src/ipywui/components/Dialog";
import Button from "../../../src/ipywui/components/Button";
import Label from "../../../src/ipywui/components/Label";
import Input from "../../../src/ipywui/components/Input";
import HBox from "../../../src/ipywui/components/HBox";
</script>
```

```python
# ./basic_setup.py

from vuepy import ref

def setup(props, ctx, vm):
    is_show = ref(True)

    def show():
        is_show.value = True

    def close():
        is_show.value = False

    return locals()
```

## 打开/关闭对话框事件

```vue
<!-- events.vue -->
<template>
  <Button label="show dialog" type='info' @click="show()"></Button>
  <Label :value="state.value" style="height: 200px"></Label>
  <Dialog title="Shipping address" v-model="is_show.value" width="55%"
          @close="handle_close()"
          @open="handle_open()"
  >
    <template>
      <Input placeholder="name"></Input>
    </template>
    <template v-slot:footer>
      <HBox>
        <Button label="Cancel" type="warning" @click="close()"></Button>
        <Button label="Ok" type="info" @click="close()"></Button>
      </HBox>
    </template>
  </Dialog>
</template>

<script src="./events_setup.py"></script>
<script setup>
import Dialog from "../../../src/ipywui/components/Dialog";
import Button from "../../../src/ipywui/components/Button";
import Label from "../../../src/ipywui/components/Label";
import Input from "../../../src/ipywui/components/Input";
import HBox from "../../../src/ipywui/components/HBox";
</script>
```

```python
# ./events_setup.py

from vuepy import ref

def setup(props, ctx, vm):
    is_show = ref(True)

    state = ref("-")

    def show():
        is_show.value = True

    def close():
        is_show.value = False

    def handle_open():
        state.value = 'open'

    def handle_close():
        state.value = 'close'

    return locals()
```

## API

### Attributes

| Name                       | Description                                    | Type                                | Default |
| -------------------------- | -----------------------------------------------| ----------------------------------- | ------- |
| model-value / v-model      | 是否显示 Dialog                                 | ^[boolean]                          | —       |
| title                      | Dialog 对话框 Dialog 的标题                      | ^[string]                           | ''      |
| width                      | 对话框的宽度，默认值为 50%                        | ^[string] / ^[number]               | ''      |

### Slots

| Name                | Description            |
| ------------------- | -----------------------|
| —                   | Dialog 的内容           |
| footer              | Dialog按钮操作区的内容    |

### Events

| Name             | Description                | Type                    |
| ---------------- | ---------------------------| ----------------------- |
| open             | Dialog 打开的回调	        | ^[Function]`() => void` |
| close            | Dialog 关闭的回调	        | ^[Function]`() => void` |
