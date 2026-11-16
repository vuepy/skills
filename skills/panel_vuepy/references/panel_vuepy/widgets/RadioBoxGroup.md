---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# RadioBoxGroup 单选框组

单选框组组件允许使用一组复选框从值列表或字典中进行选择。它属于单值、选项选择组件的广泛类别，提供兼容的API，包括`RadioButtonGroup`、`Select`和`DiscreteSlider`组件。

底层实现为`panel.widgets.RadioBoxGroup`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/RadioBoxGroup.html

## 基本用法

基本的单选框组，可以从选项列表中选择一个值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRadioBoxGroup name="RadioBoxGroup" 
                  :options="['Apple', 'Orange', 'Banana']" 
                  :inline="True" 
                  v-model="value.value"
                  @change="on_change" />
  <p>value: {{ value.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

value = ref('Apple')

def on_change(event):
    print(event.new) # Orange
</script>
```

## 字典选项

使用字典作为选项，键作为显示标签，值作为实际值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRadioBoxGroup name="RadioBoxGroup" 
                  :options="options" 
                  v-model="value.value" />
  <p>value: {{ value.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

options = {'Apple': 101, 'Orange': 102, 'Banana': 103}
value = ref(101)
</script>
```

## API

### 属性

| 属性名       | 说明                           | 类型                                | 默认值     |
| ----------- | ------------------------------ | ---------------------------------- | --------- |
| options     | 要选择的选项列表或字典           | ^[list\|dict]                       | []        |
| value       | 当前值，必须是选项值之一         | ^[object]                           | None      |
| disabled    | 是否禁用                       | ^[bool]                            | False     |
| inline      | 是否将项目垂直排列在一列中(False)或水平排列在一行中(True) | ^[bool]      | False     |
| name        | 组件标题                       | ^[str]                             | ""        |

### Events

| 事件名         | 说明                       | 类型                                   |
| ------------- | -------------------------- | -------------------------------------- |
| change        | 当值更改时触发的事件         | ^[Callable]`(event: dict) -> None`    |

## Controls

```python
##controls
import panel as pn
pn.extension()

radio_group = pn.widgets.RadioBoxGroup(name='RadioBoxGroup', options=['Biology', 'Chemistry', 'Physics'], inline=True)
pn.Row(radio_group.controls(jslink=True), radio_group) 
```
