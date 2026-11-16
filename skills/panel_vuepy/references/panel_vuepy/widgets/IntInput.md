---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# IntInput 整数输入框

整数输入框组件允许输入整数值，可以通过箭头按钮调整或直接输入数值。

底层实现为`panel.widgets.IntInput`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/IntInput.html

## 基本用法

基本的整数输入框使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnIntInput name="数量" 
              v-model="i.value" />
</template>
<script lang='py'>
from vuepy import ref

i = ref(0)
</script>
```

## 范围限制

可以使用`start`和`end`参数设定值的范围：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnIntInput name="评分 (1-10)" 
              :start="1"
              :end="10"
              v-model="i.value" />
</template>
<script lang='py'>
from vuepy import ref

i = ref(5)
</script>
```

## 自定义步长

可以使用`step`参数定义上下调整时的步进值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnIntInput name="调整(步长10)" 
              :value="10"
              :step="10"
              v-model="i.value" />
</template>
<script lang='py'>
from vuepy import ref

i = ref(10)
</script>
```

## API

### 属性

| 属性名          | 说明                           | 类型                                | 默认值     |
| -------------- | ------------------------------ | ---------------------------------- | --------- |
| start          | 最小允许值                     | ^[int\|None]                       | None      |
| end            | 最大允许值                     | ^[int\|None]                       | None      |
| step           | 调整值的步长                   | ^[int]                             | 1         |
| value          | 当前输入的整数值               | ^[int]                             | 0         |
| disabled       | 是否禁用                       | ^[bool]                            | False     |
| name           | 组件标题                       | ^[str]                             | ""        |
| placeholder    | 输入框占位文本                 | ^[str]                             | ""        |
| description    | 鼠标悬停时显示的描述           | ^[str]                             | ""        |

### Events

| 事件名         | 说明                       | 类型                                   |
| ------------- | -------------------------- | -------------------------------------- |
| change        | 当值更改时触发的事件         | ^[Callable]`(value) -> None`          |

## Controls

```python
##controls
import panel as pn
pn.extension()

int_input = pn.widgets.IntInput(name='Int Input', value=0, start=-10, end=10, step=1)
pn.Row(int_input.controls, int_input)
```
