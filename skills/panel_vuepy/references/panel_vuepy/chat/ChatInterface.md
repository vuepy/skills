---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# ChatInterface 聊天界面组件

高级布局组件，提供用户友好的前端界面，用于输入不同类型的消息：文本、图片、PDF等。该组件提供前端方法来：
- 输入(附加)消息到聊天记录
- 重新运行(重新发送)最近的用户输入消息
- 删除消息直到上一个用户输入消息
- 清空聊天记录，删除所有消息

底层实现为`panel.chat.ChatInterface`，参数基本一致，参考文档：https://panel.holoviz.org/reference/chat/ChatInterface.html

![image.png](https://panel.holoviz.org/assets/ChatDesignSpecification.png)

## 基本用法

基本的聊天界面组件：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnChatInterface 
  v-model='messages.value'
  :callback="get_response" user='Asker' avatar='?' 
  @change='on_change'
/>
<p> messages: {{ messages.value }}</p>
</template>
<script lang='py'>
from vuepy import ref
import asyncio

messages = ref([])

def on_change(event):
    print('onchange', event.new)

async def get_response(contents, user, instance):
    print(contents, user, instance) # hello Asker ChatInterface...
    await asyncio.sleep(0.5)  # Simulate processing
    return f"Got your message: {contents}"
</script>
```

## 输入组件

可以自定义输入组件，支持多种输入类型：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
<PnChatInterface :callback="get_num">
  <template #inputs>
    <PnIntSlider name='Number Input' :end='10' />
    <PnIntSlider name='Number Input2' :end='10' />
  </template>
</PnChatInterface>
</template>
<script lang='py'>
from vuepy import ref
import panel as pn

def get_num(contents, user):
    return f"You selected: {contents}"
</script>
```

可以添加文件上传等其他输入组件：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
<!-- use widgets prop -->
<PnChatInterface :callback="handle_file" 
  :widgets="[
    pn.widgets.FileInput(name='CSV File', accept='.csv')
  ]"
/>
<!-- use inputs slot -->
<PnChatInterface :callback="handle_file">
  <template #inputs>
    <PnFileInput name='CSV File' accept='.csv' />
  </template>
</PnChatInterface>
</template>
<script lang='py'>
from vuepy import ref
import panel as pn

def handle_file(contents, user):
    if hasattr(contents, 'filename'):
        return f"Received file: {contents.filename}"
    return "Please upload a file"
</script>
```

可以使用 `reset_on_send` 参数控制发送后是否重置输入值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnChatInterface 
  :callback="echo_message"
  :reset_on_send="False"
/>
</template>
<script lang='py'>
from vuepy import ref

def echo_message(contents):
    return f"Echo: {contents}"
</script>
```

## 按钮控制

可以通过 `show_rerun`、`show_undo`、`show_clear` 等参数控制底部按钮的显示：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnChatInterface 
  :callback="get_response"
  :show_rerun="False"
  :show_undo="False"
/>
</template>
<script lang='py'>
from vuepy import ref

def get_response(contents):
    return f"Got: {contents}"
</script>
```

使用 `show_button_name=False` 可以隐藏按钮标签，创建更紧凑的界面：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnChatInterface 
  :callback="get_response"
  :show_button_name="False"
  :width="400"
/>
</template>
<script lang='py'>
from vuepy import ref

def get_response(contents):
    return f"Got: {contents}"
</script>
```

可以通过 `button_properties` 添加自定义功能按钮：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnChatInterface 
  ref='chat_ref'
  :button_properties="{
    # new button
    'help': {
      'icon': 'help','callback': show_notice,
    },
    # override clear button 
    'clear': {
        'icon': 'star', 'callback': run_before, 'post_callback': run_after,
    },
  }"
/>
</template>
<script lang='py'>
from vuepy import ref

chat_ref = ref(None)

def show_notice(instance, event):
    instance.send("This is how you add buttons!", respond=False, user="System")

def run_before(instance, event):
    instance.send(
        "This will be cleared so it won't show after clear!",
        respond=False,
        user="System",
    )

def run_after(instance, event):
    instance.send("This will show after clear!", respond=False, user="System")

</script>
```

## API

### 核心属性
| 属性名               | 说明                                                                 | 类型                          | 默认值          |
|---------------------|--------------------------------------------------------------------|-----------------------------|----------------|
| v-model | 消息列表                     | ^[List[ChatMessage]]     | []    |
| widgets             | 输入控件（单个或列表），未设置时默认使用[TextInput]                     | ^[Widget\|List[Widget]]     | [TextInput]    |
| user                | 聊天界面用户名                                                      | ^[str]                      | ""             |
| avatar              | 用户头像（支持文字/emoji/图片等，未设置时使用用户名首字母）               | ^[str\|bytes\|Image]        | None           |
| reset_on_send       | 发送后是否重置控件值（对TextInput无效）                                | ^[bool]                     | False          |
| auto_send_types     | 支持回车自动发送的控件类型                                             | ^[tuple]                    | [TextInput]    |
| button_properties   | 按钮配置字典（可覆盖默认按钮或创建新按钮）                               | ^[Dict[Dict[str, Any]]]     | {}             |

### 样式属性
| 属性名            | 说明                                                                 | 类型                          | 默认值        |
|------------------|--------------------------------------------------------------------|-----------------------------|--------------|
| show_send        | 是否显示发送按钮                                                     | ^[bool]                     | True         |
| show_stop        | 是否显示停止按钮（异步回调时替换发送按钮）                              | ^[bool]                     | False        |
| show_rerun       | 是否显示重新运行按钮                                                  | ^[bool]                     | True         |
| show_undo        | 是否显示撤销按钮                                                     | ^[bool]                     | True         |
| show_clear       | 是否显示清空按钮                                                     | ^[bool]                     | True         |
| show_button_name | 是否显示按钮名称                                                     | ^[bool]                     | True         |

### 计算属性
| 属性名          | 说明                                                                 | 类型                          |
|---------------|--------------------------------------------------------------------|-----------------------------|
| active_widget | 当前活动控件                                                        | ^[Widget]                   |
| active        | 当前活动标签页索引（单控件无标签页时为-1）                             | ^[int]                      |

### Events

| 事件名   | 说明                  | 类型                                     |
| ------- | -------------------- | ---------------------------------------- |
| change | 消息变化时触发        | ^[Callable]`(event: Event) -> None`     |

<!-- todo 
| send    | 发送消息时触发        | ^[Callable]`(message: dict) -> None`     |
| rerun   | 重新运行时触发        | ^[Callable]`() -> None`                  |
| undo    | 撤销时触发           | ^[Callable]`() -> None`                  |
| clear   | 清空时触发           | ^[Callable]`() -> None`                  |
-->

### Slots

| 插槽名   | 说明               |
| ------- | ----------------- |
| inputs   | 自定义输入区域      |

### 方法

| 方法名    | 说明                  | 参数                                    |
| -------- | ------------------- | --------------------------------------- |
| send     | 发送消息            | value, user, avatar, respond            |
| rerun    | 重新运行最后消息     | -                                       |
| clear    | 清空所有消息         | -                                       |
| undo     | 撤销最后的消息       | count: int = 1                          |

## Controls

```python
##controls
import panel as pn
from panel.chat import ChatInterface
pn.extension()

chat = ChatInterface(callback=None)
pn.Column(
    chat,
    chat.controls(jslink=False),
)
```
