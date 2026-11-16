---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# MultiChoice 多项选择器

多项选择器组件允许用户从可用选项列表中选择多个项目，并支持搜索过滤选项。

底层实现为`panel.widgets.MultiChoice`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/MultiChoice.html

## 基本用法

基本的多项选择器使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol :height='400'>
  <PnMultiChoice name="Fruit" 
                :options="['Apple', 'Orange', 'Pear']"
                v-model="selected.value" />
 </PnCol>
 <p>value: {{ selected.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

selected = ref(['Apple'])
</script>
```

## 使用字典选项

可以使用字典作为选项，其中键是显示的标签，值是实际的数据值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol :height='400'>
  <PnMultiChoice name="City" 
                :options="city_options"
                v-model="selected.value" />
 </PnCol>
 <p>value: {{ selected.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

city_options = {'Beijing': 'BJ', 'shanghai': 'SH', 'guangzhou': 'GZ'}
selected = ref(['BJ', 'SZ'])

</script>
```

## API

### 属性

| 属性名       | 说明                 | 类型                                             | 默认值 |
| ----------- | ------------------- | ------------------------------------------------ | ------- |
| options     | 可选择的选项列表      | ^[list\|dict]                                    | []      |
| value       | 当前选中的值列表      | ^[list]                                          | []      |
| max_items   | 最多可选择的项目数    | ^[int\|None]                                     | None    |
| placeholder | 选择框的占位符文本    | ^[str]                                           | "Select option(s)" |
| delete_button | 是否显示删除按钮    | ^[bool]                                          | True    |
| solid       | 是否使用实体填充样式  | ^[bool]                                          | True    |
| disabled    | 是否禁用组件          | ^[bool]                                          | False   |
| name        | 组件标题              | ^[str]                                           | ""      |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当选择变化时触发的事件 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()

multi_choice = pn.widgets.MultiChoice(
    name='Multi Choice', options=['Apple', 'Banana', 'Orange', 'Strawberry', 'Grape'],
    value=['Apple', 'Orange']
)
pn.Row(multi_choice.controls(jslink=True), multi_choice) 
```
