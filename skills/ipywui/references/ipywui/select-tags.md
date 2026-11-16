---
outline: deep
titleTemplate: :title | IPywUI
---

# SelectTags 标签列表选择器

用于选择、创建标签列表。

## 基础用法

输入字符串，可以拖放来重新排序。  
可以通过 `unique` 防止输入重复的标签。

```vue
<!-- basic.vue -->
<template>
  <SelectTags v-model="tags.value"
             @change="on_change"
  ></SelectTags>
  <p>basic: {{ tags.value }}</p>

  <SelectTags v-model="unique_tags.value" unique></SelectTags>
  <p>unique: {{ unique_tags.value }}</p>
</template>

<script setup>
import SelectTags from "../../../src/ipywui/components/SelectTags";
import Input from "../../../src/ipywui/components/Input";
</script>
<script lang="py">
from vuepy import ref

tags = ref(['tag1', 'tag2', 'tag3'])
unique_tags = ref(['t1', 't2', 't3'])

# called when enter key is pressed or the input is blurred
def on_change(value):
    print(value) # {'new': ['tag1', 'tag2'], 'old': ['tag1', 'tag2', 'tag3'], 'owner': TagsInput(...)}
</script>
```

## 提供可选项

可以使用 `allow_duplicates` 属性来定义可选项, 该属性接受一个标签列表。

```vue
<!-- allowed_tags.vue -->
<template>
  <Input value="allowed_tags ['a', 'b', 'c']"></Input>
  <SelectTags
      :value="['a', 'b']"
      :allowed_tags="['a', 'b', 'c']"
  ></SelectTags>
</template>

<script setup>
import Input from "../../../src/ipywui/components/Input";
import SelectTags from "../../../src/ipywui/components/SelectTags";
</script>
```

## API

### 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 绑定值             | ^[list]                                                         | —       |
| allowed_tags | 可选的标签列表        | ^[list]                                                        | —       |
| unique       | 列表的值是否唯一      | ^[bool]                                                        | false   |
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
