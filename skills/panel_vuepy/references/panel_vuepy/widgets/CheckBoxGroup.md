---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# CheckBoxGroup 复选框组

允许通过选中相应的复选框从选项列表中选择多个选项。它属于多选项选择组件的广泛类别，提供兼容的API，包括`MultiSelect`、`CrossSelector`和`CheckButtonGroup`组件。

底层实现为`panel.widgets.CheckBoxGroup`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/CheckBoxGroup.html

## 基本用法

基本的复选框组，可以选择多个选项：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCheckBoxGroup name="复选框组" 
                  :value="['苹果', '梨']" 
                  :options="['苹果', '香蕉', '梨', '草莓']"
                  :inline="True"
                  v-model="selected.value"
                  @change="on_change" />
  <div>当前选择: {{ selected.value }}</div>
</template>
<script lang='py'>
from vuepy import ref

selected = ref(['苹果', '梨'])

def on_change(ev):
    print(ev) # Event(what='value', name='value', 
              #  obj=CheckBoxGroup(inline=True,...), cls=CheckBoxGroup(...), 
              #  old=[], new=[], type='changed')
    print(f"{ev.new}") # value is ['苹果']
</script>
```

## 垂直布局

通过设置`inline=False`可以将选项垂直排列：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCheckBoxGroup name="" 
                  :options="['Opt1', 'Opt2', 'Opt3']" 
                  :inline="False" />
</template>
```

## 字典选项

可以使用字典作为选项，键作为显示标签，值作为实际值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCheckBoxGroup name="字典选项" 
                  :options="options"
                  :value="[1, 3]"
                  v-model="value.value" />
  <div>ID: {{ value.value }}</div>
</template>
<script lang='py'>
from vuepy import ref

options = {'苹果': 1, '香蕉': 2, '梨': 3, '草莓': 4}
value = ref([1, 3])
</script>
```

## API

### 属性

| 属性名       | 说明                           | 类型                                | 默认值     |
| ----------- | ------------------------------ | ---------------------------------- | --------- |
| options     | 选项列表或字典                  | ^[list\|dict]                       | []        |
| value       | 当前选择的选项                  | ^[list]                            | []        |
| disabled    | 是否禁用                       | ^[bool]                            | False     |
| inline      | 是否将项目垂直排列在一列中(False)或水平排列在一行中(True) | ^[bool]      | False     |
| name        | 组件标题                       | ^[str]                             | ""        |

### Events

| 事件名         | 说明                       | 类型                                   |
| ------------- | -------------------------- | -------------------------------------- |
| change        | 当value更改时触发的事件         | ^[Callable]`(event: dict) -> None`    |

## Controls

```python
##controls
import panel as pn
pn.extension()

checkbox_group = pn.widgets.CheckBoxGroup(
    name='Checkbox Group', value=['Apple', 'Pear'], options=['Apple', 'Banana', 'Pear', 'Strawberry'],
    inline=True)
pn.Row(checkbox_group.controls(jslink=True), checkbox_group) 
```
