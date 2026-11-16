---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# MultiSelect 多选框

多选框组件允许从下拉菜单中选择多个选项。它与Select组件类似，但支持多选功能。

底层实现为`panel.widgets.MultiSelect`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/MultiSelect.html

## 基本用法

基本的多选框使用：

```python
##controls
import panel as pn
pn.extension()
multi_select = pn.widgets.MultiSelect(name='MultiSelect', value=['Apple', 'Pear'],
    options=['Apple', 'Banana', 'Pear', 'Strawberry'], size=8)

multi_select
```

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol :height='150'>
  <PnMultiSelect name="Fruit" 
                :options="['Apple', 'Orange', 'Pear']"
                v-model="selected.value" />
 </PnCol>
 <p>value: {{ selected.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

selected = ref([])
</script>
```

## 使用字典作为选项

`options`参数也接受一个字典，其键将作为下拉菜单的标签：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnMultiSelect name="Code" 
                :options="{'Python': 'py', 'JavaScript': 'js', 'Java': 'java', 'C++': 'cpp'}"
                :value="['py', 'js']"
                @change="update_value" />
  <div>value: {{ selected.value }}</div>
</template>
<script lang='py'>
from vuepy import ref

selected = ref(['py', 'js'])

def update_value(new_value):
    selected.value = new_value
</script>
```

## 选择区域大小

可以通过`size`参数控制选择区域显示的选项数量：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnMultiSelect name="3 items" 
                :options="['opt1', 'opt2', 'opt3', 'opt4']"
                :size="3"
                @change="update_value" />
  <PnMultiSelect name="all" 
                :options="['opt1', 'opt2', 'opt3', 'opt4', 'opt5']"
                :size="6"
                @change="update_value2" />
</template>
<script lang='py'>
from vuepy import ref

selected1 = ref([])
selected2 = ref([])

def update_value(new_value):
    selected1.value = new_value.new
    
def update_value2(new_value):
    selected2.value = new_value.new
</script>
```

## API

### 属性

| 属性名            | 说明                   | 类型                  | 默认值    |
| ---------------- | --------------------- | -------------------- | --------- |
| options          | 选项列表或字典          | ^[list, dict]        | []        |
| size             | 同时显示的选项数量      | ^[int]               | 4         |
| value            | 当前选择的值列表        | ^[list]              | []        |
| disabled         | 是否禁用组件           | ^[bool]              | False     |
| name             | 组件标题              | ^[str]               | ""        |
| description      | 鼠标悬停时显示的描述    | ^[str]               | ""        |

### Events

| 事件名  | 说明                | 类型                           |
| ------ | ------------------ | ------------------------------ |
| change | 当选择改变时触发的事件 | ^[Callable]`(value) -> None`  |

## Controls

```python
##controls
import panel as pn
pn.extension()

multi_select = pn.widgets.MultiSelect(name='Multi Select', options=['Option 1', 'Option 2', 'Option 3'], value=['Option 1'])
pn.Row(multi_select.controls, multi_select) 
```
