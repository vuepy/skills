---
outline: deep
titleTemplate: :title | IPywUI
---

# Controller 游戏控制器🎮

`Controller` 允许游戏控制器作为输入设备。

## 基础用法

适用广泛的基础单选 `v-model` 的值为当前被选中的 `option` 的 value 属性值

`options` 可以是列表，可以是 `(名字、值)` 形式的列表。

> [!TIP]
> `v-model` 或初始值必须是 options 中的值。

```vue
<!-- basic.vue -->
<template>
  <Select description="OS:"
          :rows="1"
          :options="['Linux', 'Win', 'macOS']"
  ></Select>

  <Select description="OS:"
          v-model="choice.value"
          :options="['Linux', 'Win', 'macOS']"
  ></Select>
</template>

<script src="./basic_setup.py"></script>
<script setup>
import Select from "../../../src/ipywui/components/Select";
</script>
```

```python
# ./basic_setup.py

from vuepy import ref

def setup(props, ctx, vm):
    choice = ref('macOS')

    choice2 = ref(1)
    radio_items = [('One', 1), ('Two', 2), ('Three', 3)]
    return locals()
```

## 禁用状态

你可以使用 `disabled` 属性来定义是否被禁用。  
使用 `disabled` 属性来控制是否为禁用状态。该属性接受一个 `bool` 类型的值。

```vue
<!-- disabled.vue -->
<template>
  <Select description="OS:"
          :rows="1"
          :options="['Linux', 'Win', 'macOS']"
          disabled
  ></Select>

  <Select description="OS:"
          :options="['Linux', 'Win', 'macOS']"
          disabled
  ></Select>
</template>

<script setup>
import Select from "../../../src/ipywui/components/Select";
</script>
```

## 基础多选

设置 `multiple` 属性即可启用多选。

可以通过按下 `shift` 或 `ctrl` （或 `command` ）并单击鼠标或箭头键来选择多个值。

```vue
<!-- multiple.vue -->
<template>
  <Select description="OS:"
          v-model="choices.value"
          :rows="2"
          :options="['Linux', 'Win', 'macOS']"
          multiple
  ></Select>

  <Select description="OS:"
          v-model="choices2.value"
          :options="['Linux', 'Win', 'macOS']"
          multiple
  ></Select>
</template>

<script src="./multiple_setup.py"></script>
<script setup>
import Select from "../../../src/ipywui/components/Select";
</script>
```

```python
# ./multiple_setup.py

from vuepy import ref

def setup(props, ctx, vm):
    choices = ref([])

    choices2 = ref(['Linux', 'macOS'])
    return locals()
```

## 自定义样式

您可以自定义输入框样式。  
使用 `style` 属性额外配置样式: 
* `description-width`：label的宽度。

```vue
<!-- custom.vue -->
<template>
  <Select description="Description-width 150px"
          :options="['one', 'two']"
          style="description-width: 150px"
  ></Select>

  <Select description="Description-width 180px"
          :options="['one', 'two']"
          style="description-width: 180px"
  ></Select>
</template>

<script setup>
import Select from "../../../src/ipywui/components/Select";
</script>
```

## API

### 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 选定项绑定值         | ^[any]                                                         | —       |
| description  | 标签文字             | ^[str]                                                         | —       |
| options      | 选项列表             | ^[list]                                                        | —       |
| rows         | 显示的选项个数        | ^[int]                                                         | —       |
| multiple     | 是否为多选           | ^[boolean]                                                     | false   |
| disabled     | 是否为禁用状态        | ^[boolean]                                                     | false   |
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

### 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| index | 当前选择标签的索引 | int |
| label | 当前选择的标签 | --- |
| value | 当前选择的值 | --- |
