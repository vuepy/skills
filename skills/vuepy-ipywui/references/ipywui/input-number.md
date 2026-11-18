---
outline: deep
titleTemplate: :title | IPywUI
---

# Input Number 数字输入框

仅允许输入标准的数字值，可定义范围

## 基础用法

要使用它，只需要在 InputNumber 元素中使用 v-model 绑定变量即可，变量的初始值即为默认值。  
可以通过 `min` 和 `max` 来定义范围。

```vue
<!-- basic.vue -->
<template>
  <VBox>
    <InputNumber description="int number"
                 v-model="num.value"
                 :min="1"
                 :max="100"
                 @change="on_change"
    ></InputNumber>

    <InputNumber description="float number"
                 v-model="num_float.value"
                 :min="1"
                 :max="100"
    ></InputNumber>
  </VBox>
</template>

<script setup>
import InputNumber from "../../../src/ipywui/components/InputNumber";
import VBox from "../../../src/ipywui/components/VBox";
</script>
<script lang="py">
from vuepy import ref

num = ref(1)
num_float = ref(1.1)

# called when enter key is pressed or the input is blurred
def on_change(value):
    print(value) # {'new': 1, 'old': 1, 'owner': IntText(...)}
</script>
```

## 禁用状态

你可以使用 `disabled` 属性来定义是否被禁用。  
使用 `disabled` 属性来控制是否为禁用状态。该属性接受一个 `bool` 类型的值。

```vue
<!-- disabled.vue -->
<template>
  <InputNumber description="Disabled" disabled></InputNumber>
</template>

<script setup>
import InputNumber from "../../../src/ipywui/components/InputNumber";
</script>
```

## 步进

允许定义递增递减的步进控制  
设置 `step` 属性可以控制步长。

```vue
<!-- steps.vue -->
<template>
  <InputNumber description="step" :step="2"></InputNumber>
</template>

<script setup>
import InputNumber from "../../../src/ipywui/components/InputNumber";
</script>
```

## 提示信息

通过 `tooltip` 属性在鼠标 hover 时展示提示信息。

```vue
<!-- tooltip.vue -->
<template>
  <InputNumber description="hover" type="info"
               tooltip="tooltip info"></InputNumber>
</template>

<script setup>
import InputNumber from "../../../src/ipywui/components/InputNumber";
</script>
```

## 自定义样式

您可以自定义输入框样式。  
使用 `style` 属性额外配置样式: 
* `description-width`：label的宽度。

```vue
<!-- custom.vue -->
<template>
  <InputNumber description="Description-width 150px"
               style="description-width: 150px"
  ></InputNumber>

  <InputNumber description="Description-width 180px"
               style="description-width: 180px"
  ></InputNumber>
</template>

<script setup>
import InputNumber from "../../../src/ipywui/components/InputNumber";
</script>
```

## InputNumber API

### InputNumber 属性

| 属性名    | 说明                 | 类型                                                           | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 绑定值             | ^[int\|float]                                                         | —       |
| description     | 标签文字             | ^[str]                                                         | —       |
| min | 设置计数器允许的最小值       | ^[int\|float]                                                         | -inf       |
| max | 设置计数器允许的最大值       | ^[int\|float]                                                         | inf        |
| step | 计数器步长                | ^[int\|float]                                                         | 1       |
| tooltip  | 提示信息             | ^[str]                                                         | —       |
| disabled | 按钮是否为禁用状态     | ^[boolean]                                                     | false   |
| placeholder | 输入框占位符 | ^[str]                                                     | - |
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

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当绑定值变化时,当输入框失去焦点或用户按Enter时触发 |  ^[Callable]`({'new': val, 'old': val, 'owner': widget) -> None` |

### InputNumber 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
