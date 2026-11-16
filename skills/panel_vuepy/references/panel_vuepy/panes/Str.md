---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Str 原始字符串组件

`Str`组件允许在面板中呈现任意文本。

与`PnMarkdown`和`PnHTML`组件不同，`PnStr`组件将文本解释为原始字符串，不应用任何标记，并默认以等宽字体显示。

这个组件将渲染任何文本，如果给定一个`object`，将显示该`object`的Python `repr`。

底层实现为`panel.pane.Str`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/Str.html

## 基本用法

`PnStr`组件可以显示任何文本字符串，并保持其原始格式。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnStr object="This is a raw string which will not be formatted in any way except for the applied style." 
         :styles="{'font-size': '12pt'}" />
</template>
```

与其他组件一样，`PnStr`组件可以通过设置其`object`参数进行更新。如前所述，非字符串类型会自动转换为字符串：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnCol>
  <PnStr :object="content.value" :styles="{'font-size': '14pt'}" />
  <PnRow>
    <PnButton @click="updateToString()">Display String</PnButton>
    <PnButton @click="updateToNumber()">Display Number</PnButton>
    <PnButton @click="updateToObject()">Display Object</PnButton>
  </PnRow>
</PnCol>
</template>

<script lang='py'>
from vuepy import ref

content = ref('This is a raw string which will not be formatted in any way except for the applied style.')

def updateToString():
    content.value = 'Updated raw string content'
    
def updateToNumber():
    content.value = 1.3234232
    
def updateToObject():
    class TestObject:
        def __repr__(self):
            return "TestObject(custom_repr)"
    content.value = TestObject()
</script>
```

## API

### 属性

| 属性名    | 说明                                     | 类型                | 默认值 |
| --------- | ---------------------------------------- | ------------------- | ------ |
| value     | 要显示的字符串。如果提供非字符串类型，将显示该对象的`repr` | ^[str\|object]     | —      |
| styles    | 指定CSS样式的字典                       | ^[dict]             | {}     |
| style    | 指定CSS样式的                      | ^[str]             | ''     |

## Controls

```python
##controls
import panel as pn

pn.extension()

str_pane = pn.pane.Str(
    'This is a raw string',
    styles={'font-size': '12pt'}
)

pn.Row(str_pane.controls, str_pane)
```
