---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# CrossSelector 交叉选择器

交叉选择器组件允许通过在两个列表之间移动项目来从选项列表中选择多个值。它属于多选项选择组件的广泛类别，提供兼容的API，包括`MultiSelect`、`CheckBoxGroup`和`CheckButtonGroup`组件。

底层实现为`panel.widgets.CrossSelector`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/CrossSelector.html

## 基本用法

交叉选择器由多个组件组成：
* 两个列表，分别用于未选择（左）和已选择（右）的选项值
* 过滤框，允许使用正则表达式匹配下方值列表中的选项
* 按钮，用于将值从未选择列表移动到已选择列表（`>>`）或反之（`<<`）

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCrossSelector name="Fruits" 
                  :value="['Apple', 'Pear']" 
                  :options="['Apple', 'Banana', 'Pear', 'Strawberry']"
                  v-model="selected.value"
                  @change="on_change" />
</template>
<script lang='py'>
from vuepy import ref

selected = ref(['Apple', 'Pear'])

def on_change(event):
    print(f"Selection: {event.new}") # Selection: ['Apple']
</script>
```

## 自定义过滤函数

可以自定义过滤函数来控制如何根据搜索模式过滤选项：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCrossSelector name="Cities" 
                  :options="cities"
                  :filter_fn="custom_filter" />
</template>
<script lang='py'>
from vuepy import ref

cities = ['New York', 'London', 'Paris', 'Tokyo', 'Beijing', 'Shanghai', 'Sydney', 'Berlin']

def custom_filter(pattern, option):
    """Custom filter function that only matches beginning"""
    if not pattern:
        return True
    return option.startswith(pattern)
</script>
```

## 保持定义顺序

通过`definition_order`参数可以控制是否在过滤后保留定义顺序：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCrossSelector name="保持定义顺序" 
                  definition_order
                  :options="options"
                  :value="initial_value" />
  <PnCrossSelector name="按选择顺序" 
                  :definition_order="False"
                  :options="options"
                  :value="initial_value" />
</template>
<script lang='py'>
from vuepy import ref

options = ['选项1', '选项2', '选项3', '选项4']
initial_value = ['选项2', '选项4']
</script>
```

## API

### 属性

| 属性名           | 说明                           | 类型                                | 默认值     |
| --------------- | ------------------------------ | ---------------------------------- | --------- |
| definition_order | 是否在过滤后保留定义顺序。禁用以允许选择顺序定义已选择列表的顺序 | ^[bool] | True      |
| filter_fn      | 使用文本字段搜索时用于过滤选项的函数。提供的函数必须允许两个参数：用户提供的搜索模式和来自提供的`options`列表的标签 | ^[function] | re.search |
| options        | 可用选项的列表或字典             | ^[list\|dict]                       | []        |
| value          | 当前选择的选项                  | ^[list]                            | []        |
| disabled       | 是否禁用                       | ^[bool]                            | False     |
| name           | 组件标题                       | ^[str]                             | ""        |

### Events

| 事件名         | 说明                       | 类型                                   |
| ------------- | -------------------------- | -------------------------------------- |
| change        | 当值更改时触发的事件         | ^[Callable]`(event: dict) -> None`    |
