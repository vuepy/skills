---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# AutocompleteInput 自动完成输入框

自动完成输入框组件允许通过在自动完成文本字段中输入值来从选项列表或字典中选择一个`value`。它属于单值、选项选择组件的广泛类别，提供兼容的API，包括`RadioBoxGroup`、`Select`和`DiscreteSlider`组件。

底层实现为`panel.widgets.AutocompleteInput`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/AutocompleteInput.html

## 基本用法

基本的自动完成输入框，可以从选项列表中选择一个值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnCol :height='300'>
  <PnAutocompleteInput name="自动完成输入框" 
                      :options="['Apple', 'banana', 'orange']"
                      :case_sensitive="False"
                      :min_characters='1'
                      search_strategy="includes"
                      placeholder="Select a fruit: apple, ..."
                      v-model="value.value"
                      description='tooltip'
                      @change="on_change" />
</PnCol>
</template>
<script lang='py'>
from vuepy import ref

value = ref("")

def on_change(event):
    print(f"选择已更新为: {value.value}")
</script>
```

## 不限制输入

如果设置`restrict=False`，自动完成输入框将允许任何输入，而不仅限于它提供的自动完成选项：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnAutocompleteInput name="不限制输入" 
                       value="math"
                      :options="['banana', 'apple']"
                      :restrict="False" />
</template>
```

## 字典选项

`options`参数也接受一个字典，其键将是下拉菜单的标签：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnAutocompleteInput name="Dict options" 
                      :options="options"
                      v-model="value.value" />
  <PnButton @click="update_value()">to Apple</PnButton>
  <div>当前值: {{ value.value }}</div>
</template>
<script lang='py'>
from vuepy import ref

options = {'Banana': 1, 'Apple': 2, 'Orange': 3}
value = ref(1)

def update_value():
    value.value = 2
</script>
```

## 搜索策略

可以通过`search_strategy`参数定义如何搜索完成字符串列表：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnCol :height='150'>
  <PnAutocompleteInput name="Starts with match" 
                      :options="fruits"
                      search_strategy="starts_with"
                      placeholder="Enter fruit name" />
</PnCol>
<PnCol :height='150'>
  <PnAutocompleteInput name="Contains match" 
                      :options="fruits"
                      search_strategy="includes"
                      :min_characters='1'
                      placeholder="Enter fruit name" />
</PnCol>
</template>
<script lang='py'>
from vuepy import ref

fruits = ['Apple', 'Banana', 'Orange', 'Pear', 'Grape', 'Mango', 'Strawberry', 'Watermelon']
</script>
```

## API

### 属性

| 属性名           | 说明                           | 类型                                | 默认值     |
| --------------- | ------------------------------ | ---------------------------------- | --------- |
| options         | 要选择的选项列表或字典           | ^[list\|dict]                       | []        |
| restrict        | 设置为False以允许用户输入不在选项列表中的文本 | ^[bool]                | True      |
| search_strategy | 定义如何搜索完成字符串列表 | ^[str]`starts_with,includes`      | starts_with |
| value           | 当前值，如果restrict=True，则必须是选项值之一 | ^[str]               | ""        |
| value_input     | 在每次按键时更新的当前值         | ^[str]                             | ""        |
| case_sensitive  | 启用或禁用区分大小写的完成匹配     | ^[bool]                           | True      |
| disabled        | 是否禁用                       | ^[bool]                            | False     |
| name            | 组件标题                       | ^[str]                             | ""        |
| placeholder     | 未选择选项时显示的占位符字符串     | ^[str]                             | ""        |
| description      | 鼠标悬停时显示的描述      | ^[str]      | ""        |
| min_characters  | 用户必须输入多少字符才会显示自动完成 | ^[int]                           | 2         |

### Events

| 事件名         | 说明                       | 类型                                   |
| ------------- | -------------------------- | -------------------------------------- |
| change        | 当值更改时触发的事件         | ^[Callable]`(event: dict) -> None`    |

## Controls

```python
##controls
import panel as pn
pn.extension()

autocomplete = pn.widgets.AutocompleteInput(
    name='Autocomplete Input', 
    options=['Biology', 'Chemistry', 'Physics'],
    case_sensitive=False, 
    search_strategy='includes',
    placeholder='Write something here'
)
    
pn.Row(autocomplete.controls(), autocomplete)
```
