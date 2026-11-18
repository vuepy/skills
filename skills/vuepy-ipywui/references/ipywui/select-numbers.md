---
outline: deep
titleTemplate: :title | IPywUI
---

# SelectNumbers 数字列表选择器

用于选择、创建数字列表。

## 基础用法

输入数字，可以拖放数字来重新排序。  
可以通过 `data_type` 将列表指定为 `float` 或 `int`。

```vue
<!-- basic.vue -->
<template>
  <SelectNumbers v-model="nums.value"
                 @change="on_change"
  ></SelectNumbers>
  <p>float nums: {{ nums.value }}</p>

  <SelectNumbers v-model="int_nums.value"
                 data_type="int"
  ></SelectNumbers>
  <p>int nums: {{ int_nums.value }}</p>
</template>
<script setup>
import SelectNumbers from "../../../src/ipywui/components/SelectNumbers";
import Input from "../../../src/ipywui/components/Input";
</script>
<script lang="py">
from vuepy import ref

nums = ref([1, 2, 3])
int_nums = ref([1, 2, 3])

# called when enter key is pressed or the input is blurred
def on_change(value):
    print(value) # {'new': [1, 2], 'old': [1, 2, 3], 'owner': FloatsInput(...)}

</script>
```

## 限制选择范围

可以限制数字选择范围。

通过 `min` 和 `max` 限制可选范围。

```vue
<!-- basic-range.vue -->
<template>
  <SelectNumbers :value="[1, 2, 3]" :min="1" :max="10"
                 data_type="int"></SelectNumbers>
</template>

<script setup>
import SelectNumbers from "../../../src/ipywui/components/SelectNumbers";
</script>
```

## 标签风格

使用 `type` 来定义标签的风格。

```vue
<!-- tag-style.vue -->
<template>
  <SelectNumbers :value="[1, 2, 3]" type=""
                 data_type="int"></SelectNumbers>

  <SelectNumbers :value="[1, 2, 3]" type="success"
                 data_type="int"></SelectNumbers>

  <SelectNumbers :value="[1, 2, 3]" type="info"
                 data_type="int"></SelectNumbers>

  <SelectNumbers :value="[1, 2, 3]" type="warning"
                 data_type="int"></SelectNumbers>

  <SelectNumbers :value="[1, 2, 3]" type="danger"
                 data_type="int"></SelectNumbers>
</template>

<script setup>
import SelectNumbers from "../../../src/ipywui/components/SelectNumbers";
</script>
```

## 格式化展示

对于数值的展示可以使用 `format` 来格式化。

```vue
<!-- format.vue -->
<template>
  <Input value="[1000, 2000, 3000] use format '$,d'"></Input>
  <SelectNumbers :value="[1000, 2000, 3000]" type="info"
                 data_type="int"
                 format="$,d"
  ></SelectNumbers>

  <Input value="[1.3, 4.56, 78.90] use format '.2f'"></Input>
  <SelectNumbers :value="[1.3, 4.56, 78.90]" type="info"
                 format=".2f"
                 tooltip="show"
  ></SelectNumbers>
</template>

<script setup>
import SelectNumbers from "../../../src/ipywui/components/SelectNumbers";
import Input from "../../../src/ipywui/components/Input";
</script>
```

## 提示信息

通过 `tooltip` 属性在鼠标 hover 时展示提示信息。

```vue
<!-- tooltip.vue -->
<template>
  <SelectNumbers :value="[10, 20, 30]" type="info"
                 tooltip="show tooltip !"
  ></SelectNumbers>
</template>

<script setup>
import SelectNumbers from "../../../src/ipywui/components/SelectNumbers";
</script>
```

## API

### 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 绑定值              | ^[list]                                                        | —       |
| min          | 允许的最小值          | ^[int\|float]                                                  | -inf    |
| max          | 允许的最大值          | ^[int\|float]                                                  | inf     |
| type         | 类型                 | ^[enum]`''\| 'success'\| 'warning'\| 'danger'\| 'info'`        | —       |
| data_type    | 数据类型             | ^[enum]`'float'\| 'int'`                                       | float   |
| format       | 数据展示格式化        | ^[str]                                                         | —       |
| tooltip      | 提示信息             | ^[str]                                                         | —       |
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
| change | 当绑定值变化时,当输入框失去焦点或用户按Enter时触发 |  ^[Callable]`({'new': val, 'old': val, 'owner': widget) -> None` |

### 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
