---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Switch 开关

开关组件允许通过滑动开关在`True`/`False`状态之间切换单一条件。Switch、Checkbox和Toggle组件功能类似，可互相替换。

底层实现为`panel.widgets.Switch`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/Switch.html

## 基本用法

基本的开关使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnSwitch name="Switch" v-model="is_on.value" />
  <p>value: {{ is_on.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

is_on = ref(False)
</script>
```

## API

### 属性

| 属性名       | 说明                 | 类型      | 默认值    |
| ----------- | ------------------- | --------- | --------- |
| value       | 开关是否打开          | ^[bool]   | False     |
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

switch = pn.widgets.Switch(name='Switch')
pn.Row(switch.controls, switch)
```
