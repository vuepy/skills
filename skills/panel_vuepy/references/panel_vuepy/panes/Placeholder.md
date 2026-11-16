---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Placeholder 占位符组件

占位符组件用于其他Panel组件的占位符。例如，可以在计算运行时显示一条消息。

底层实现为`panel.pane.Placeholder`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/Placeholder.html

## 基本用法

`PnPlaceholder`组件可以接受任何Panel组件作为其参数，包括其他panes。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnPlaceholder object="Hello" style='color: red'/>
</template>
```

使用`PnPlaceholder`的好处是它允许您替换窗格的内容，而不受特定类型组件的限制。这意味着您可以用任何其他窗格类型替换占位符，包括图表、图像和小部件。

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnCol>
  <PnPlaceholder :object="message.value" />
  <PnRow>
    <PnButton @click="updateText()">Update Text</PnButton>
    <PnButton @click="updateInput()">Update Input</PnButton>
    <PnButton @click="resetContent()">Reset</PnButton>
  </PnRow>
</PnCol>
</template>

<script lang='py'>
from vuepy import ref

message = ref("Hello")

def updateText():
    # placeholder.value.update("Hello again!")
    message.value = "Hello again!"
    
def updateInput():
    from panel.widgets import TextInput
    # placeholder.value.update(TextInput(value="Type something..."))
    message.value = TextInput(value="Type something...")
    
def resetContent():
    # placeholder.value.object = "Hello"
    message.value = "Hello"
</script>
```

## 临时替换内容

如果你想临时替换内容，可以使用上下文管理器。

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnCol>
  <PnPlaceholder ref="placeholder_ref" object="⏳ Idle" 
                 :stylesheets="[':host { font-size: 24pt }']" />
  <PnButton @click="runProcess()">Run Process</PnButton>
</PnCol>
</template>

<script lang='py'>
from vuepy import ref
import asyncio
import time

placeholder_ref = ref(None)

async def runProcess():
    placeholder = placeholder_ref.value.unwrap()
    with placeholder:
        placeholder.update("🚀 Starting...")
        # time.sleep(1)
        await asyncio.sleep(1)
        placeholder.update("🏃 Running...")
        # time.sleep(1)
        await asyncio.sleep(1)
        placeholder.update("✅ Complete!")
        # time.sleep(1)
        await asyncio.sleep(1)
</script>
```

## API

### 属性

| 属性名       | 说明                                                     | 类型       | 默认值 |
| ------------ | -------------------------------------------------------- | ---------- | ------ |
| value        | 要显示的Panel对象，如果对象不是Panel对象，将使用`panel(...)`函数转换 | ^[Any]     | —      |
| stylesheets  | 样式表列表                                               | ^[List]    | []     |
| style | css样式 | ^[str]    | ''     |

### 方法

| 方法名 | 说明                   | 类型                    |
| ------ | ---------------------- | ----------------------- |
| update | 更新占位符中显示的内容 | ^[Callable]`(obj) -> None` |

## Controls

```python
##controls
import panel as pn
import time

pn.extension()

placeholder = pn.pane.Placeholder("Hello")
placeholder

placeholder.update(pn.widgets.TextInput(value="Hello again!"))

placeholder.object = "Hello once more!"

placeholder = pn.pane.Placeholder("⏳ Idle", stylesheets=[":host { font-size: 24pt }"])
pn.Row(placeholder.controls(), placeholder)
```
