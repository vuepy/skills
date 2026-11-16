---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# ChatMessage 聊天消息组件

用于显示聊天消息的组件，支持多种内容类型。该组件提供结构化的消息显示功能，包括：
- 显示用户头像（可以是文本、emoji或图片）
- 显示用户名
- 以自定义格式显示消息时间戳
- 支持消息反应并映射到图标
- 渲染各种内容类型，包括文本、图片、音频、视频等

底层实现为`panel.chat.ChatMessage`，参数基本一致，参考文档：https://panel.holoviz.org/reference/chat/ChatMessage.html

## 基本用法

基本的消息展示：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnChatMessage object="Hi and welcome!" />
</template>
<script lang='py'>
from vuepy import ref
</script>
```

ChatMessage可以显示任何Panel可以显示的Python对象，例如Panel组件、数据框和图表：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnColumn>
  <PnChatMessage :object="df" />
  <PnChatMessage :object="vgl_pane" />
</PnColumn>
</template>
<script lang='py'>
from vuepy import ref
import pandas as pd
import panel as pn

# Create sample data
df = pd.DataFrame({"x": [1, 2, 3], "y": [4, 5, 6]})

# Create a Vega-Lite spec
vegalite = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {"url": "https://raw.githubusercontent.com/vega/vega/master/docs/data/barley.json"},
    "mark": "bar",
    "encoding": {
        "x": {"aggregate": "sum", "field": "yield", "type": "quantitative"},
        "y": {"field": "variety", "type": "nominal"},
        "color": {"field": "site", "type": "nominal"}
    },
    "width": "container",
}
vgl_pane = pn.pane.Vega(vegalite, height=240)
</script>
```

可以指定自定义用户名和头像：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnChatMessage object="Want to hear some beat boxing?" 
               user="Beat Boxer" avatar="🎶" />
<PnChatMessage object="Want to hear some beat boxing?" 
               user="Beat Boxer" 
               :avatar="r'\N{musical note}'" />
</template>
```

## 消息更新

组件的值、用户名和头像都可以动态更新：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
<PnColumn>
  <PnChatMessage ref='msg_ref' 
                 object='Initial message' 
                 user='Jolly Guy' avatar="🎅" />
  <PnButton name="Update Message" @click="update_message()" />
</PnColumn>
</template>
<script lang='py'>
from vuepy import ref
import asyncio

msg_ref = ref(None)

def update_message():
    msg = msg_ref.value.unwrap()
    msg.object = "Updated message!"
    msg.user = "Updated Guy"
    msg.avatar = "😎"
</script>
```

将输出流式传输到`ChatMessage`最简单、最好的方式是通过异步生成器。

```python
##controls
import panel as pn

sentence = """
    The greatest glory in living lies not in never falling,
    but in rising every time we fall.
"""

async def append_response():
    value = ""
    for token in sentence.split():
        value += f" {token}"
        await asyncio.sleep(0.2)
        yield value
        
btn = pn.widgets.Button(name='xxx')
btn.on_click(lambda x: print('xcvx'))
pn.Column(
    # todo can't update
    pn.chat.ChatMessage(object=append_response, user="Wise guy", avatar="🤓"),
    btn
)
```

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
<PnColumn>
  <PnChatMessage :object='response.value' 
                 user='Jolly Guy' avatar="🎅" />
  <PnButton name="Update Message" @click="on_click()" />
</PnColumn>
</template>
<script lang='py'>
import asyncio
import panel as pn
from vuepy import ref, onMounted

response = ref('')

sentence = """
    The greatest glory in living lies not in never falling,
    but in rising every time we fall.
"""

async def append_response():
    value = ""
    for token in sentence.split():
        value += f" {token}"
        await asyncio.sleep(0.1)
        # yield value
        response.value = value
        # yield value
        response.value = value

def on_click():
    print('xxxx')

pn.state.add_periodic_callback(append_response, count=1)

</script>
```

## 样式

如果您想要一个仅显示 `value` 的普通界面，请将 `show_user` 、 `show_copy_icon` 、 `show_avatar` 和 `show_timestamp` 设置为 `False` ，并为 `reaction_icons` 提供一个空的 `dict` 。

可以设置常用的样式和布局参数，如 `sizing_mode` 、 `height` 、 `width` 、 `max_height` 、 `max_width` 和 `styles` 。

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnChatMessage object="Want to hear some beat boxing?"
    :show_avatar=False
    :show_user=False
    :show_timestamp=False
    :show_copy_icon=False
    :reaction_icons='ChatReactionIcons(options={})'
/>
</template>
<script lang='py'>
from panel.chat import ChatReactionIcons

</script>
```

## 代码高亮

支持代码块的语法高亮（需要安装 pygments）：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnChatMessage :object='code_content' user='Bot' avatar="🤖" />
</template>
<script lang='py'>
from vuepy import ref

# code_content = """```python
# print('hello world')
# ```"""
code_content = """```
print('hello world')
```"""
</script>
```

## API

### 核心属性
| 属性名               | 说明                                                                 | 类型                          | 默认值          |
|---------------------|--------------------------------------------------------------------|-----------------------------|----------------|
| object             | 消息内容（支持字符串/面板/控件/布局等）                                | ^[object]                   | None           |
| renderers          | 内容渲染器（可调用对象列表，首个成功执行的将被使用）                      | ^[List[Callable]]           | None           |
| user               | 发送者用户名                                                        | ^[str]                      | ""             |
| avatar             | 用户头像（支持文字/emoji/图片等，未设置时使用用户名首字母）               | ^[str\|BinaryIO]            | None           |
| default_avatars    | 用户名到默认头像的映射字典（键值不区分大小写和特殊字符）                   | ^[Dict[str, str\|BinaryIO]] | {}             |
| edited             | 消息编辑触发事件                                                     | ^[bool]                     | False          |
| footer_objects     | 消息底部显示的组件列表                                                | ^[List]                     | []             |
| header_objects     | 消息头部显示的组件列表                                                | ^[List]                     | []             |
| avatar_lookup      | 头像查找函数（设置后将忽略default_avatars）                            | ^[Callable]                 | None           |
| reactions          | 消息关联的反应列表                                                    | ^[List]                     | []             |
| reaction_icons     | 反应图标映射（未设置时默认{"favorite": "heart"}）                     | ^[dict]                     | {"favorite": "heart"} |
| timestamp          | 消息时间戳（默认使用实例化时间）                                       | ^[datetime]                 | 当前时间         |
| timestamp_format   | 时间戳显示格式                                                       | ^[str]                      | -              |
| timestamp_tz       | 时区设置（仅timestamp未设置时生效）                                    | ^[str]                      | 系统默认时区      |

### 显示属性
| 属性名              | 说明                                     | 类型           | 默认值        |
|--------------------|-----------------------------------------|----------------|--------------|
| show_avatar        | 是否显示用户头像                           | ^[bool]                     | True         |
| show_user          | 是否显示用户名                            | ^[bool]                     | True         |
| show_timestamp     | 是否显示时间戳                            | ^[bool]                     | True         |
| show_reaction_icons| 是否显示反应图标                           | ^[bool]                     | True         |
| show_copy_icon     | 是否显示复制图标                           | ^[bool]                     | False        |
| show_edit_icon     | 是否显示编辑图标                           | ^[bool]                     | False        |
| show_activity_dot  | 是否显示活动状态指示点                      | ^[bool]                     | False        |
| name               | 消息组件标题                               | ^[str]                      | ""           |

### Events

| 事件名  | 说明           | 类型                                  |
| ------ | ------------- | ------------------------------------- |
| change | 值改变时触发   | ^[Callable]`(value: Any) -> None`    |

### Slots

| 插槽名   | 说明               |
| ------- | ----------------- |
| default | 消息内容           |
| header  | 消息头部内容       |
| footer  | 消息底部内容       |

### 方法

| 方法名 | 说明 | 参数 |
| ------ | --- | ---- |
| serialize | 将消息序列化为字符串 | - |

## Controls
