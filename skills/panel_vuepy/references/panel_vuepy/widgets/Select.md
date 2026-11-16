---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Select 选择器

选择器组件允许用户从下拉菜单或选择区域中选择一个值。它属于单值选择类组件，提供兼容的API，包括RadioBoxGroup、AutocompleteInput和DiscreteSlider等组件。

底层实现为`panel.widgets.Select`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/Select.html

## 基本用法

基本的选择器使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnSelect :options="['Apple', 'Orange', 'Banana']" 
            v-model='selection.value' />
  <p>value: {{ selection.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

selection = ref('Apple')
</script>
```

## 使用字典作为选项

`options`参数也接受一个字典，其键将作为下拉菜单的标签：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnSelect :options="{'Apple': 1, 'Orange': 2, 'Banana': 3}"
            v-model='selection.value' />
  <p>value: {{ selection.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

selection = ref(1)
</script>
```

## 禁用选项

可以使用`disabled_options`参数禁用部分选项：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnSelect :options="['Apple', 'Orange', 'xxx', 'Banana']" 
            :disabled_options="['xxx']"
            v-model='selection.value' />
  <p>value: {{ selection.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

selection = ref('Apple')
</script>
```

## 分组选项

可以使用`groups`参数对选项进行分组显示（也称为*optgroup*）：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnSelect 
    :groups="{'Europe': ['Greece', 'France'], 'Asia': ['China', 'Japan']}"
    v-model='selection.value' />
  />
  <p>value: {{ selection.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

selection = ref('France')
</script>
```

## 列表选择区域

通过设置`size`参数大于1，可以从列表中选择一个选项，而不是使用下拉菜单：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnSelect 
    :options="['Apple', 'Orange', 'xxx', 'Banana']" 
    :size="3"
    v-model='selection.value' />
  <p>value: {{ selection.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

selection = ref('Apple')
</script>
```

## API

### 属性

| 属性名            | 说明                   | 类型                  | 默认值    |
| ---------------- | --------------------- | -------------------- | --------- |
| options          | 选项列表或字典          | ^[list, dict]        | []        |
| disabled_options | 禁用选项列表           | ^[list]              | []        |
| groups           | 分组选项字典            | ^[dict]              | {}        |
| size             | 同时显示的选项数量       | ^[int]               | 1         |
| value            | 当前选择的值            | ^[object]            | None      |
| disabled         | 是否禁用组件            | ^[bool]              | False     |
| name             | 组件标题               | ^[str]               | ""        |
| description      | 鼠标悬停时显示的描述     | ^[str]               | ""        |

### Events

| 事件名  | 说明                | 类型                           |
| ------ | ------------------ | ------------------------------ |
| change | 当选择改变时触发的事件 | ^[Callable]`(value) -> None`  |

## Controls

```python
##controls
import panel as pn
pn.extension()

select = pn.widgets.Select(name='Select', options=['Biology', 'Chemistry', 'Physics'])
pn.Row(select.controls, select)
```
