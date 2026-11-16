---
outline: deep
titleTemplate: :title | IPywUI
---

# RadioButtons 单选框

在一组备选项中进行单选

## 基础用法

单选框不应该有太多的可选项， 如果你有很多的可选项你应该使用 `Select` 选择框而不是单选框。  
要使用 `RadioButtons` 组件，只需要设置v-model绑定变量， 选中意味着变量的值为对应选项的值。  
选项 `options` 可以是标签的列表，也可以是 `(标签、值)` 形式的列表。

::: tip
`v-model` 或初始值必须是 options 中的值或者为`None`。
:::

```vue
<!-- basic.vue -->
<template>
  <RadioButtons description="Options ['pepperoni', 'pineapple', 'anchovies']"
                v-model="choice1.value"
                :options="options1"
                @change="on_change1"
  ></RadioButtons>

  <RadioButtons description="Options [('One', 1), ('Two', 2), ('Three', 3)]"
                v-model="choice2.value"
                :options="options2"
                @change="on_change2"
  ></RadioButtons>

</template>

<script setup>
import RadioButtons from "../../../src/ipywui/components/RadioButtons";
</script>
<script lang="py">
from vuepy import ref

options1 = ['pepperoni', 'pineapple', 'anchovies']
choice1 = ref(options1[0])

options2 = [('One', 1), ('Two', 2), ('Three', 3)]
choice2 = ref(options2[0][1])

def on_change1(event):
    print(event) # {'new': 'pineapple', 'old': 'pepperoni', 'owner': RadioButtons(...)}

def on_change2(event):
    print(event) # {'new': 2, 'old': 1, 'owner': RadioButtons(...)} 
</script>
```

## 禁用状态

你可以使用 `disabled` 属性来定义是否被禁用。  
使用 `disabled` 属性来控制是否为禁用状态。该属性接受一个 `bool` 类型的值。

```vue
<!-- disabled.vue -->
<template>
  <RadioButtons description="Disabled"
                :options="['pepperoni', 'pineapple', 'anchovies']"
                disabled
  ></RadioButtons>
</template>

<script setup>
import RadioButtons from "../../../src/ipywui/components/RadioButtons";
</script>
```

## 自定义样式

您可以自定义输入框样式。  
使用 `style` 属性额外配置样式: 
* `description-width`：label的宽度。

```vue
<!-- custom.vue -->
<template>
  <RadioButtons description="Description-width 150px"
                :options="['one', 'two']"
               style="description-width: 150px"
  ></RadioButtons>

  <RadioButtons description="Description-width 180px"
               :options="['one', 'two']"
               style="description-width: 180px"
  ></RadioButtons>
</template>

<script setup>
import RadioButtons from "../../../src/ipywui/components/RadioButtons";
</script>
```

## API

### 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 绑定值             | ^[any]                                                         | —       |
| description     | 标签文字             | ^[str]                                                         | —       |
| options | 选项列表        | ^[list]                                                        | —       |
| disabled | 是否为禁用状态     | ^[boolean]                                                     | false   |
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

### 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| index | 当前选择的索引 | int |
| label | 当前选择的标签 | --- |
| value | 当前选择的值 | --- |
