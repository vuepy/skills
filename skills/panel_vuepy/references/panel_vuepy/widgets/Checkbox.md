---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Checkbox 复选框

复选框组件允许通过勾选框在`True`/`False`状态之间切换单一条件。Checkbox、Toggle和Switch组件功能类似，可互相替换。

底层实现为`panel.widgets.Checkbox`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/Checkbox.html

## 基本用法

基本的复选框使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCheckbox name="复选框" @change="update_value" />
  <div>当前状态: {{ is_checked.value }}</div>
</template>
<script lang='py'>
from vuepy import ref

is_checked = ref(False)

def update_value(event):
    is_checked.value = event.new
</script>
```

## 默认选中状态

可以通过设置`value`参数为`True`使复选框默认处于选中状态：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCheckbox name="默认选中" :value="True" v-model='is_checked.value' />
  <div>当前状态: {{ is_checked.value }}</div>
</template>
<script lang='py'>
from vuepy import ref

is_checked = ref(True)
</script>
```

## 禁用状态

可以通过设置`disabled`参数为`True`使复选框处于禁用状态：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnCheckbox name="禁用状态" @change="update_value" disabled />
  </PnRow>
  <div>禁用复选框状态: {{ is_checked.value }}</div>
</template>
<script lang='py'>
from vuepy import ref

is_checked = ref(False)

def update_value(event):
    is_checked2.value = event.new
</script>
```

## 结合其他组件使用

复选框通常用于控制其他组件的显示或行为：

```vue
<!-- --plugins vpanel --show-code --backend='panel' --app app -->
<template>
  <PnCheckbox name="显示内容" v-model="is_checked.value" />
  <PnRow v-if="is_checked.value">
    <PnTextInput placeholder="input..." />
  </PnRow>
</template>
<script lang='py'>
from vuepy import ref

is_checked = ref(True)

def update_value(value):
    is_checked.value = value
</script>
```

## API

### 属性

| 属性名       | 说明                 | 类型      | 默认值    |
| ----------- | ------------------- | --------- | --------- |
| value       | 复选框是否选中        | ^[bool]   | False     |
| disabled    | 是否禁用组件          | ^[bool]   | False     |
| name        | 组件标题             | ^[str]    | ""        |
| description | 鼠标悬停时显示的描述   | ^[str]    | ""        |

### Events

| 事件名  | 说明                | 类型                          |
| ------ | ------------------ | ----------------------------- |
| change | 当状态改变时触发的事件 | ^[Callable]`(value) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()

checkbox = pn.widgets.Checkbox(name='Checkbox')
pn.Row(checkbox.controls, checkbox)
```
