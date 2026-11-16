---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# LiteralInput 字面量输入框

字面量输入框组件允许用户输入任意Python字面量（包括int、float、list、dict等）并将其解析为相应的Python对象。

底层实现为`panel.widgets.LiteralInput`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/LiteralInput.html

## 基本用法

基本的字面量输入框使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnLiteralInput name="字符串输入" 
                 v-model="input_value.value"/>
  <p>value: {{ input_value.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

input_value = ref("Hello, World!")
</script>
```

## 不同类型的值

字面量输入框可以处理各种Python数据类型：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnLiteralInput name="int" 
                 :value="42" />
  <PnLiteralInput name="float" 
                 :value="3.14159" />
  <PnLiteralInput name="list" 
                 :value="[1, 2, 3, 4]" />
  <PnLiteralInput name="dict" 
                 :value="{'name': 'far', 'age': 30}" />
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## 指定类型

可以使用type参数指定输入的数据类型：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnLiteralInput name="type int" 
                 :value="42"
                 :type="int" />
  <PnLiteralInput name="type list" 
                 :value="[1, 2, 3]"
                 :type="list" />
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## 自定义高度

可以设置输入框的高度，特别是对于复杂类型很有用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnLiteralInput name="多行输入" 
                 :value="nested_dict"
                 :height="150" />
</template>
<script lang='py'>
from vuepy import ref

nested_dict = {
    "users": {
        "user1": {
            "name": "far",
            "age": 30,
            "hobbies": ["xx", "yy"]
        },
    }
}
</script>
```

## API

### 属性

| 属性名    | 说明                 | 类型                                             | 默认值 |
| -------- | ------------------- | ------------------------------------------------ | ------- |
| value    | 指示类型的解析值 | ^[object]                                        | None    |
| type     | 限制数据类型         | ^[type\|None] 如int、float、str、list、dict等    | None    |
| height   | 输入框高度           | ^[int\|str]                                      | None    |
| width    | 输入框宽度           | ^[int\|str]                                      | None    |
| disabled | 是否禁用组件         | ^[bool]                                          | False   |
| name     | 组件标题             | ^[str]                                           | ""      |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当输入值变化时触发的事件 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()

literal_input = pn.widgets.LiteralInput(name='Literal Input', value={'key': [1, 2, 3]})
pn.Row(literal_input.controls(jslink=True), literal_input) 
```
