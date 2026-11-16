---
outline: deep
titleTemplate: :title | IPywUI
---

# SelectColors 颜色列表选择器

用于选择、创建颜色列表。

## 基础用法

输入颜色，可以拖放颜色来重新排序。  
可以通过 `unique` 防止输入重复的颜色。

```vue
<!-- basic.vue -->
<template>
  <SelectColors v-model="colors.value"></SelectColors>
  <Input :value="', '.join(colors.value)"></Input>

  <SelectColors unique></SelectColors>
</template>

<script src="./basic_setup.py"></script>
<script setup>
import SelectColors from "../../../src/ipywui/components/SelectColors";
import Input from "../../../src/ipywui/components/Input";
</script>
```

```python
# ./basic_setup.py

from vuepy import ref

def setup(props, ctx, vm):
    colors = ref(['red', 'green', '#0000ff'])
    return locals()
```

## 提供可选项

可以使用 `allow_duplicates` 属性来定义可选项, 该属性接受一个颜色列表。

```vue
<!-- allowed_tags.vue -->
<template>
  <SelectColors
      :value="['lightgreen', 'lightgray']"
      :allowed_tags="['lightgreen', 'lightgray', 'lightblue']"
  ></SelectColors>
</template>

<script setup>
import SelectColors from "../../../src/ipywui/components/SelectColors";
</script>
```

## SelectColors API

### SelectColors 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 绑定值             | ^[list]                                                         | —       |
| allowed_tags | 可选的颜色列表        | ^[list]                                                        | —       |
| unique       | 颜色的值是否唯一      | ^[bool]                                                        | false   |
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

### Events(暂不支持）

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当绑定值变化时触发的事件 |  ^[Callable]`({'new': val, 'old': val, 'owner': widget) -> None` |

### SelectColors 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
