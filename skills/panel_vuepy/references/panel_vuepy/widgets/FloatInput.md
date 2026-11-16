---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# FloatInput 浮点输入框

浮点输入框组件允许输入浮点数值，可以通过箭头按钮调整或直接输入数值。

底层实现为`panel.widgets.FloatInput`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/FloatInput.html

## 基本用法

基本的浮点数输入框使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFloatInput name="数值" 
               v-model="f.value" />
  <p>当前值: {{ f.value }} </p>
</template>
<script lang='py'>
from vuepy import ref

f = ref(0.0)
</script>
```

## 范围限制

可以使用`start`和`end`参数设定值的范围：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFloatInput name="温度 (-10.0 到 50.0)" 
               :value="25.5"
               :start="-10.0"
               :end="50.0"
               v-model="f.value" />
  <p>当前温度: {{ f.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

f = ref(25.5)
</script>
```

## 自定义步长

可以使用`step`参数定义上下调整时的步进值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFloatInput name="调整(步长0.1)" 
               :value="1.0"
               :step="2"
               v-model="f.value" />
</template>
<script lang='py'>
from vuepy import ref

f = ref(1.0)
</script>
```

## API

### 属性

| 属性名               | 说明                                                                 | 类型                          | 默认值  |
|---------------------|--------------------------------------------------------------------|-----------------------------|--------|
| value               | 当前值（按回车、失去焦点、点击箭头或键盘操作时更新，删除所有数字可能返回None） | ^[float｜None]              | None   |
| value_throttled     | 只读属性，行为与value相同                                            | ^[float｜None]              | None   |
| step                | 每次点击增加或减少的步长值                                            | ^[float]                    | 1.0    |
| start               | 可选的最小允许值                                                     | ^[float]                    | None   |
| end                 | 可选的最大允许值                                                     | ^[float]                    | None   |
| format              | 数值格式化字符串（参考numbrojs格式）                                  | ^[str]                      | ""     |
| page_step_multiplier | 按下PgUp/PgDown键时的步长乘数                                         | ^[int]                      | 10     |
| disabled            | 是否禁用编辑                                                        | ^[bool]                     | False  |
| name                | 控件标题                                                           | ^[str]                      | ""     |
| placeholder         | 未输入值时显示的占位文本                                             | ^[str]                      | ""     |

### Events

| 事件名         | 说明                       | 类型                                   |
| ------------- | -------------------------- | -------------------------------------- |
| change        | 当值更改时触发的事件         | ^[Callable]`(value) -> None`          |

## Controls

```python
##controls
import panel as pn
pn.extension()

float_input = pn.widgets.FloatInput(name='Float Input', value=3.14159)
pn.Row(float_input.controls, float_input)
```
