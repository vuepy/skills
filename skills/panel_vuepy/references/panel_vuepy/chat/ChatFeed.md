---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# ChatFeed 聊天流

PnChatFeed是一个中层布局组件，用于管理一系列聊天消息(ChatMessage)项。该组件提供后端方法来发送消息、流式传输令牌、执行回调、撤销消息以及清除聊天记录。

底层实现为`panel.chat.ChatFeed`，参数基本一致，参考文档：https://panel.holoviz.org/reference/chat/ChatFeed.html

## 基本用法

`PnChatFeed`可以不需要任何参数初始化，通过`send`方法发送聊天消息。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
<PnCol>
  <PnChatFeed ref="chat_feed" />
  <PnButton name='send' @click='on_click()'/>
</PnCol>
</template>

<script lang='py'>
import panel as pn
from vuepy import ref, onMounted

chat_feed = ref(None)

def on_click():
    message = chat_feed.value.unwrap().send(
        "Hello world!",
        user="Bot",
        avatar="B",
        footer_objects=[pn.widgets.Button(name="Footer Object")]
    )
_ = onMounted(on_click)
</script>
```

## 回调函数

添加回调函数可以使`PnChatFeed`更加有趣。回调函数的签名必须包含最新可用的消息值`contents`。
除了`contents`之外，签名还可以包含最新可用的`user`名称和聊天`instance`。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed :callback="echo_message" ref="chat_feed" />
  <PnButton name='send' @click='send_message()'/>
</template>
<script lang='py'>
from vuepy import ref, onMounted

chat_feed = ref(None)

# def echo_message(contents, user, instance):
def echo_message(contents):
    return f"Echoing... {contents}"

def send_message():
    message = chat_feed.value.unwrap().send("Hello!")

_ = onMounted(send_message)
</script>
```

可以更新`callback_user`和`callback_avatar`来分别更改响应者的默认名称和头像。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed :callback='echo_message' 
              callback_user='Echo Bot' callback_avatar='🛸' ref="chat_feed" />
  <PnButton name='send' @click='send_message()'/>
</template>

<script lang='py'>
from vuepy import ref, onMounted

chat_feed = ref(None)

def echo_message(contents, user):
    return f"Echoing {user!r}... {contents}"

def send_message():
    message = chat_feed.value.unwrap().send("Hey!")

d = onMounted(send_message)
</script>
```

指定的`callback`也可以返回一个包含`value`、`user`和`avatar`键的字典，这将覆盖默认的`callback_user`和`callback_avatar`。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed :callback="parrot_message" 
              callback_user='Echo Bot' 
              callback_avatar='🛸' ref="chat_feed" />
</template>

<script lang='py'>
from vuepy import ref, onMounted

chat_feed = ref(None)

def parrot_message(contents):
    return {"value": f"No, {contents.lower()}", "user": "Parrot", "avatar": "🦜"}

def send_message():
    message = chat_feed.value.unwrap().send("Are you a parrot?")

_ = onMounted(send_message)
</script>
```

如果不希望与`send`一起触发回调，请将`respond`设置为`False`。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed :callback="parrot_message" callback_user='Echo Bot' callback_avatar='🛸' ref="chat_feed" />
</template>

<script lang='py'>
from vuepy import ref, onMounted

chat_feed = ref(None)

def parrot_message(contents):
    return {"value": f"No, {contents.lower()}", "user": "Parrot", "avatar": "🦜"}

def send_message():
    message = chat_feed.value.unwrap().send("Don't parrot this.", respond=False)

_ = onMounted(send_message)
</script>
```

可以通过将`callback_exception`设置为`"summary"`来显示异常。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed :callback="bad_callback" callback_exception='summary' ref="chat_feed" />
</template>

<script lang='py'>
from vuepy import ref, onMounted

chat_feed = ref(None)

def bad_callback(contents):
    return 1 / 0

def send_message():
    chat_feed.value.unwrap().send("This will fail...")

_ = onMounted(send_message)
</script>
```

## 异步回调

`PnChatFeed`还支持*异步*`callback`。我们建议尽可能使用*异步*`callback`以保持应用程序的快速响应，*只要函数中没有阻塞事件循环的内容*。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed :callback="parrot_message" callback_user='Echo Bot' ref="chat_feed" />
</template>

<script lang='py'>
import asyncio
from vuepy import ref, onMounted

chat_feed = ref(None)

async def parrot_message(contents):
    await asyncio.sleep(2.8)
    return {"value": f"No, {contents.lower()}", "user": "Parrot", "avatar": "🦜"}

def send_message():
    message = chat_feed.value.unwrap().send("Are you a parrot?")

_ = onMounted(send_message)
</script>
```

流式输出的最简单和最优方式是通过*异步生成器*。如果您不熟悉这个术语，只需在函数前加上`async`，并用`yield`替换`return`。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed :callback="stream_message" ref="chat_feed" />
</template>

<script lang='py'>
import asyncio
from vuepy import ref, onMounted

chat_feed = ref(None)

async def stream_message(contents):
    message = ""
    for character in contents:
        message += character
        await asyncio.sleep(0.1)
        yield message

def send_message():
    message = chat_feed.value.unwrap().send("Streaming...")

_ = onMounted(send_message)
</script>
```

如果不连接字符，也可以持续替换原始消息。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed :callback="replace_message" ref="chat_feed" />
</template>

<script lang='py'>
import asyncio
from vuepy import ref, onMounted

chat_feed = ref(None)

async def replace_message(contents):
    for character in contents:
        await asyncio.sleep(0.1)
        yield character

def send_message():
    message = chat_feed.value.unwrap().send("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

_ = onMounted(send_message)
</script>
```

也可以手动触发回调与`respond`。这对于从初始消息实现一系列响应很有用！

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed :callback="chain_message" ref="chat_feed" />
</template>

<script lang='py'>
import asyncio
from vuepy import ref, onMounted

chat_feed = ref(None)

async def chain_message(contents, user, instance):
    await asyncio.sleep(1.8)
    if user == "User":
        yield {"user": "Bot 1", "value": "Hi User! I'm Bot 1--here to greet you."}
        instance.respond()
    elif user == "Bot 1":
        yield {
            "user": "Bot 2",
            "value": "Hi User; I see that Bot 1 already greeted you; I'm Bot 2.",
        }
        instance.respond()
    elif user == "Bot 2":
        yield {
            "user": "Bot 3",
            "value": "I'm Bot 3; the last bot that will respond. See ya!",
        }

def send_message():
    message = chat_feed.value.unwrap().send("Hello bots!")

_ = onMounted(send_message)
</script>
```

## 编辑回调

可以将`edit_callback`附加到`PnChatFeed`以处理消息编辑。签名必须包含最新可用的消息值`contents`、编辑消息的索引和聊天`instance`。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed :callback="echo_callback" :edit_callback="edit_callback" callback_user="Echo Guy" ref="chat_feed" />
</template>

<script lang='py'>
from vuepy import ref, onMounted

chat_feed = ref(None)

def echo_callback(content):
    return content

def edit_callback(content, index, instance):
    instance.objects[index + 1].object = content

def send_message():
    chat_feed.value.unwrap().send("Edit this")

_ = onMounted(send_message)
</script>
```

## 步骤

可以通过一系列`ChatStep`提供中间步骤，如思想链。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed ref="chat_feed" />
</template>

<script lang='py'>
import time
from vuepy import ref, onMounted

chat_feed = ref(None)

def demo_steps():
    # First step
    with chat_feed.value.unwrap().add_step(
        "To answer the user's query, I need to first create a plan.", 
        title="Create a plan", user='Agent'
    ) as step:
        step.stream("\n\n...Okay the plan is to demo this!")
    
    # Second step - append to existing message
    with chat_feed.value.unwrap().add_step(
        title="Execute the plan", status="running"
    ) as step:
        step.stream("\n\n...Executing plan...")
        time.sleep(1)
        step.stream("\n\n...Handing over to SQL Agent")
    
    # Third step - new user creates a new message
    with chat_feed.value.unwrap().add_step(
        title="Running SQL query", user='SQL Agent'
    ) as step:
        step.stream('Querying...')
        time.sleep(1)
        step.stream('\nSELECT * FROM TABLE')

_ = onMounted(demo_steps)
</script>
```

## 提示用户

可以使用`prompt_user`暂时暂停代码执行并提示用户回答问题或填写表单，该方法接受任何Panel `component`和后续`callback`（带有`component`和`instance`作为args）在提交后执行。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed :callback="show_interest" callback_user="Ice Cream Bot" ref="chat_feed" />
</template>

<script lang='py'>
from vuepy import ref, onMounted

chat_feed = ref(None)

def repeat_answer(component, instance):
    contents = component.value
    instance.send(f"Wow, {contents}, that's my favorite flavor too!", respond=False, user="Ice Cream Bot")

def show_interest(contents, user, instance):
    if "ice" in contents or "cream" in contents:
        answer_input = {"component": "PnTextInput", "props": {"placeholder": "Enter your favorite ice cream flavor"}}
        instance.prompt_user(answer_input, callback=repeat_answer)
    else:
        return "I'm not interested in that topic."

def send_message():
    chat_feed.value.unwrap().send("ice cream")

_ = onMounted(send_message)
</script>
```

还可以设置一个`predicate`来评估组件的状态，例如小部件是否有值。如果提供，当谓词返回`True`时，提交按钮将被启用。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed :callback="show_interest" callback_user="Ice Cream Bot" ref="chat_feed" />
</template>

<script lang='py'>
from vuepy import ref, onMounted

chat_feed = ref(None)

def is_chocolate(component):
    return "chocolate" in component.value.lower()

def repeat_answer(component, instance):
    contents = component.value
    instance.send(f"Wow, {contents}, that's my favorite flavor too!", respond=False, user="Ice Cream Bot")

def show_interest(contents, user, instance):
    if "ice" in contents or "cream" in contents:
        answer_input = {"component": "PnTextInput", "props": {"placeholder": "Enter your favorite ice cream flavor"}}
        instance.prompt_user(answer_input, callback=repeat_answer, predicate=is_chocolate)
    else:
        return "I'm not interested in that topic."

def send_message():
    chat_feed.value.unwrap().send("ice cream")

_ = onMounted(send_message)
</script>
```

## 序列化

聊天历史可以通过`serialize`并设置`format="transformers"`来序列化，以供`transformers`或`openai`包使用。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed ref="chat_feed" />
  <PnCol>
    <PnButton @click="send_messages()" name="Send Messages" />
    <PnButton @click="serialize_chat()" name="Serialize" />
    <PnTextAreaInput v-model="serialized.value" :rows="10" />
  </PnCol>
</template>

<script lang='py'>
from vuepy import ref, onMounted

chat_feed = ref(None)
serialized = ref("")

def send_messages():
    chat_feed.value.unwrap().send("Hello!", user="User")
    chat_feed.value.unwrap().send("Hi there!", user="Bot 1")
    chat_feed.value.unwrap().send("How are you?", user="User")
    chat_feed.value.unwrap().send("I'm doing well!", user="Bot 2")

def serialize_chat():
    serialized.value = str(chat_feed.value.unwrap().serialize(format="transformers"))
  
m1 = onMounted(send_messages)
m2 = onMounted(serialize_chat)
</script>
```

可以设置`role_names`来显式映射角色到ChatMessage的用户名。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed ref="chat_feed" />
  <PnCol>
    <PnButton @click="send_messages()" name="Send Messages" />
    <PnButton @click="serialize_chat()" name="Serialize with role_names" />
    <PnTextAreaInput v-model="serialized.value" :rows="10" />
  </PnCol>
</template>

<script lang='py'>
from vuepy import ref, onMounted

chat_feed = ref(None)
serialized = ref("")

def send_messages():
    chat_feed.value.unwrap().send("Hello!", user="User")
    chat_feed.value.unwrap().send("Hi there!", user="Bot 1")
    chat_feed.value.unwrap().send("How are you?", user="User")
    chat_feed.value.unwrap().send("I'm doing well!", user="Bot 2")

def serialize_chat():
    serialized.value = str(chat_feed.value.unwrap().serialize(
        format="transformers", 
        role_names={"assistant": ["Bot 1", "Bot 2", "Bot 3"]}
    ))

m1 = onMounted(send_messages)
m2 = onMounted(serialize_chat)
</script>
```

## 流式传输

如果返回的对象不是生成器（特别是LangChain输出），仍然可以使用`stream`方法流式传输输出。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed ref="chat_feed" />
</template>

<script lang='py'>
import time
import panel as pn
from vuepy import ref, onMounted

chat_feed = ref(None)

def demo_stream():
    # Create a new message
    message = chat_feed.value.unwrap().stream("Hello", user="Aspiring User", avatar="🤓")
    
    # Stream (append) to the previous message
    message = chat_feed.value.unwrap().stream(
        " World!",
        user="Aspiring User",
        avatar="🤓",
        message=message,
        footer_objects=[pn.widgets.Button(name="Footer Object")]
    )
    
    # Demonstrate streaming with a loop
    message = None
    for n in "12":
        time.sleep(0.1)
        message = chat_feed.value.unwrap().stream(n, message=message)

@onMounted
def demo():
    pn.state.add_periodic_callback(demo_stream, 500, count=1)
</script>
```

## 自定义

可以通过`message_params`传递`ChatEntry`参数。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed 
    :message_params="message_params"
    ref="chat_feed" />
</template>

<script lang='py'>
from vuepy import ref, onMounted

chat_feed = ref(None)
message_params = {
    "default_avatars": {"System": "S", "User": "👤"}, 
    "reaction_icons": {"like": "thumb-up"}
}

def send_messages():
    chat_feed.value.unwrap().send(user="System", value="This is the System speaking.")
    chat_feed.value.unwrap().send(user="User", value="This is the User speaking.")

m1 = onMounted(send_messages)
</script>
```

直接将这些参数传递给ChatFeed构造函数，它将自动转发到`message_params`中。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed 
    :default_avatars='{"System": "S", "User": "👤"}'
    :reaction_icons='{"like": "thumb-up"}'
    ref="chat_feed" />
</template>

<script lang='py'>
from vuepy import ref, onMounted

chat_feed = ref(None)

def send_messages():
    chat_feed.value.unwrap().send(user="System", value="This is the System speaking.")
    chat_feed.value.unwrap().send(user="User", value="This is the User speaking.")

m1 = onMounted(send_messages)
</script>
```

也可以通过设置`message_params`参数来自定义聊天流的外观。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnChatFeed 
    :show_activity_dot="True"
    :message_params="message_params"
    ref="chat_feed" />
</template>

<script lang='py'>
from vuepy import ref, onMounted

chat_feed = ref(None)
message_params = {
    "stylesheets": [
        """
        .message {
            background-color: tan;
            font-family: "Courier New";
            font-size: 24px;
        }
        """
    ]
}

def send_message():
    chat_feed.value.unwrap().send("I am so stylish!")

m1 = onMounted(send_message)
</script>
```

## 自定义聊天界面

您也可以在`PnChatFeed`的基础上构建自己的自定义聊天界面。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnCol>
    <PnChatFeed
      ref="chat_feed"
      :callback="get_response"
      :height="500"
      :message_params="message_params"
    />
    <PnLayout.Divider />
    <PnRow>
      <span>Click a button</span>
      <PnButton name="Andrew" @click="send_andrew()" />
      <PnButton name="Marc" @click="send_marc()" />
      <PnButton name="Undo" @click="undo_messages()" />
      <PnButton name="Clear" @click="clear_messages()" />
    </PnRow>
  </PnCol>
</template>

<script lang='py'>
import asyncio
from vuepy import ref, onMounted

chat_feed = ref(None)
ASSISTANT_AVATAR = "https://upload.wikimedia.org/wikipedia/commons/6/63/Yumi_UBports.png"

message_params = {
    "default_avatars": {"Assistant": ASSISTANT_AVATAR}
}

async def get_response(contents, user):
    await asyncio.sleep(0.88)
    return {
        "Marc": "It is 2",
        "Andrew": "It is 4",
    }.get(user, "I don't know")

def send_marc():
    chat_feed.value.unwrap().send(
        "What is the square root of 4?", user="Marc", avatar="🚴"
    )

def send_andrew():
    chat_feed.value.unwrap().send(
        "What is the square root of 4 squared?", user="Andrew", avatar="🏊"
    )

def undo_messages():
    chat_feed.value.unwrap().undo(2)

def clear_messages():
    chat_feed.value.unwrap().clear()

def init_chat():
    chat_feed.value.unwrap().send("Hi There!", user="Assistant", avatar=ASSISTANT_AVATAR)

m1 = onMounted(init_chat)
</script>
```

## API

### 属性

| 属性名    | 说明                 | 类型                                                           | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| objects | 添加到聊天流的消息 | ^[List[ChatMessage]] | [] |
| renderers | 接受值并返回Panel对象的可调用对象或可调用对象列表 | ^[List[Callable]] | None |
| callback | 当用户发送消息或调用`respond`时执行的回调 | ^[callable] | None |
| card_params | 传递给Card的参数 | ^[Dict] | {} |
| message_params | 传递给每个ChatMessage的参数 | ^[Dict] | {} |
| header | 聊天流的标题 | ^[Any] | None |
| callback_user | 回调提供的消息的默认用户名 | ^[str] | "AI" |
| callback_avatar | 回调提供的条目的默认头像 | ^[str, BytesIO, bytes, ImageBase] | None |
| callback_exception | 如何处理回调引发的异常 | ^[str, Callable] | "raise" |
| edit_callback | 当用户编辑消息时执行的回调 | ^[callable] | None |
| help_text | 初始化聊天记录中的聊天消息 | ^[str] | None |
| placeholder_text | 显示在占位符图标旁边的文本 | ^[str] | "Thinking..." |
| placeholder_params | 传递给占位符`ChatMessage`的参数 | ^[dict] | {} |
| placeholder_threshold | 显示占位符前缓冲的最小持续时间（秒） | ^[float] | 0.2 |
| post_hook | 在新消息完全添加后执行的钩子 | ^[callable] | None |
| auto_scroll_limit | 从Column中最新对象到激活更新时自动滚动的最大像素距离 | ^[int] | 10 |
| scroll_button_threshold | 从Column中最新对象到显示滚动按钮的最小像素距离 | ^[int] | 100 |
| load_buffer | 在可见对象每侧加载的对象数 | ^[int] | 10 |
| show_activity_dot | 是否在流式传输回调响应时在ChatMessage上显示活动点 | ^[bool] | False |
| view_latest | 是否在初始化时滚动到最新对象 | ^[bool] | True |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

### 方法

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| send | 发送一个值并在聊天记录中创建一个新消息 | ^[Callable]`(value, user=None, avatar=None, respond=True, **kwargs) -> ChatMessage` |
| serialize | 将聊天记录导出为字典 | ^[Callable]`(format='transformers', role_names=None, default_role='user', filter_by=None, exclude_users=None, custom_serializer=None) -> Dict` |
| stream | 流式传输令牌并更新提供的消息 | ^[Callable]`(token, message=None, user=None, avatar=None, **kwargs) -> ChatMessage` |
| clear | 清除聊天记录并返回已清除的消息 | ^[Callable]`() -> List[ChatMessage]` |
| respond | 使用聊天记录中的最新消息执行回调 | ^[Callable]`() -> None` |
| trigger_post_hook | 使用聊天记录中的最新消息触发后钩子 | ^[Callable]`() -> None` |
| stop | 如果可能，取消当前回调任务 | ^[Callable]`() -> None` |
| scroll_to | 列滚动到指定索引处的对象 | ^[Callable]`(index: int) -> None` |
| undo | 从聊天记录中删除最后`count`条消息并返回它们 | ^[Callable]`(count: int = 1) -> List[ChatMessage]` |

## Controls

```python
##controls
import panel as pn
pn.extension()

chat_feed = pn.chat.ChatFeed()
pn.Row(chat_feed.controls(jslink=False), chat_feed)
```
