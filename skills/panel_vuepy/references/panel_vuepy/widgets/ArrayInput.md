---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# ArrayInput 数组输入框

数组输入框组件允许使用文本输入框渲染和编辑NumPy数组，其内容随后在Python中解析。为避免大型数组的问题，`ArrayInput`定义了一个`max_array_size`，如果数组超过此大小，文本表示将被汇总，编辑将被禁用。

底层实现为`panel.widgets.ArrayInput`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/ArrayInput.html

## 基本用法

基本的数组输入框，可以显示和编辑NumPy数组：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnArrayInput name="Array input" 
                :value="initial_array"
                v-model="array.value"
                @change="on_change" />
  <div>array shape: {{ array.value.shape }}</div>
</template>
<script lang='py'>
import numpy as np
from vuepy import ref

initial_array = np.random.randint(0, 10, (10, 2))
array = ref(initial_array)

def on_change(event):
    print(f"update ，shape: {array.value.shape}")
</script>
```

## 大型数组

对于大型数组，可以设置`max_array_size`以避免浏览器负担过重：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnArrayInput name="Small Array (Editable)" 
              :value="small_array" :max_array_size="1000" />
<PnArrayInput name="Large Array (Non-editable)"
              :value="large_array"
              :max_array_size="1000" />
</template>
<script lang='py'>
import numpy as np
from vuepy import ref

small_array = np.random.randint(0, 10, (10, 5))
large_array = np.random.randint(0, 10, (100, 20))
</script>
```

## 自定义占位符

可以自定义占位符文本：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnArrayInput name="placeholder" 
                placeholder="[1, 2, 3]" />
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## API

### 属性

| 属性名          | 说明                           | 类型                                | 默认值     |
| -------------- | ------------------------------ | ---------------------------------- | --------- |
| max_array_size | 大于此限制的数组将在Python中允许，但不会序列化到JavaScript中。虽然这样大的数组因此无法在小部件中编辑，但这种限制有助于避免浏览器负担过重，并让其他小部件保持可用 | ^[int] | 1000 |
| value          | 指定类型的解析值                | ^[numpy.ndarray]                    | None      |
| disabled       | 是否禁用                       | ^[bool]                            | False     |
| name           | 组件标题                       | ^[str]                             | ""        |
| placeholder    | 未输入值时显示的占位符字符串      | ^[str]                            | ""        |

### Events

| 事件名         | 说明                       | 类型                                   |
| ------------- | -------------------------- | -------------------------------------- |
| change        | 当值更改时触发的事件         | ^[Callable]`(event: Event) -> None`    |

## Controls

```python
##controls
import numpy as np
import panel as pn
pn.extension()

array_input = pn.widgets.ArrayInput(name='Array Input ', value=np.random.randint(0, 10, (10, 2)))
pn.Row(array_input.controls(jslink=True), array_input) 
```
