---
outline: deep
titleTemplate: :title | IPywUI
---

# Dropdown 下拉菜单

将菜单折叠到下拉菜单中。

## 基础用法

点击下拉菜单以展开更多操作。  
`options` 可以是列表，可以是 `(名字、值)` 形式的列表。

::: tip
`v-model` 或初始值必须是 options 中的值或者为`None`。
:::

```vue
<!-- basic.vue -->
<template>
  <VBox>
    <Dropdown description="dropdown1"
              v-model="choice1.value"
              :options="dropdown_items1"
              @change="on_change"
    ></Dropdown>

    <Dropdown description="dropdown2"
              v-model="choice2.value"
              :options="dropdown_items2"
              @change="on_change2"
    ></Dropdown>
  </VBox>
</template>

<script src="./basic_setup.py"></script>
<script setup>
import VBox from "../../../src/ipywui/components/VBox";
import Dropdown from "../../../src/ipywui/components/Dropdown";
</script>
```

```python
# ./basic_setup.py

from vuepy import ref

def setup(props, ctx, vm):
    dropdown_items1 = ['A', 'B', 'C']
    choice1 = ref(dropdown_items1[0])

    dropdown_items2 = [('One', 1), ('Two', 2), ('Three', 3)]
    choice2 = ref(dropdown_items2[0][1])

    def on_change(event):
        print(event) # {'new': 'A', 'old': 'B', 'owner': Dropdown(...)}

    def on_change2(event):
        print(event) # {'new': 1, 'old': 2, 'owner': Dropdown(...)}

    return locals()
```

## 禁用状态

你可以使用 `disabled` 属性来定义是否被禁用。  
使用 `disabled` 属性来控制是否为禁用状态。该属性接受一个 `bool` 类型的值。

```vue
<!-- disabled.vue -->
<template>
  <HBox>
    <Dropdown description="Disabled" disabled></Dropdown>
  </HBox>
</template>

<script setup>
import Button from "../../../src/ipywui/components/Button";
import HBox from "../../../src/ipywui/components/HBox";
import Dropdown from "../../../src/ipywui/components/Dropdown";
</script>
```

## 自定义样式

您可以自定义输入框样式。  
使用 `style` 属性额外配置样式: 
* `description-width`：label的宽度。

```vue
<!-- custom.vue -->
<template>
  <Dropdown description="Description-width 150px"
            style="description-width: 150px"
  ></Dropdown>

  <Dropdown description="Description-width 180px"
            style="description-width: 180px"
  ></Dropdown>
</template>

<script setup>
import Dropdown from "../../../src/ipywui/components/Dropdown";
</script>
```

## Dropdown API

### Dropdown 属性

| 属性名    | 说明                 | 类型                                                           | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 选中项绑定值     | ^[any]                                                         | —       |
| description     | 标签文字             | ^[str]                                                         | —       |
| options | 下拉菜单项 | ^[list[]                                                         | —       |
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

### Dropdown 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| index | 当前菜单的索引 | int |
| label | 当前菜单的标签 | --- |
| value | 当前菜单的值 | --- |
