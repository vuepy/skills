---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# ChatStep 聊天步骤组件

用于显示和管理聊天中的中间步骤组件，比如思维链中的步骤。该组件提供了对步骤状态的管理，包括挂起、运行中、成功和失败等状态，以及相应的标题和内容控制。

底层实现为`panel.chat.ChatStep`，参数基本一致，参考文档：https://panel.holoviz.org/reference/chat/ChatStep.html

## 基本用法

基本的步骤组件初始化：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnChatStep/>
</template>
<script lang='py'>
</script>
```

通过 `stream` 方法对内容实现以下操作：
- 附加内容，支持`Markdown`、图像等任何内容
- 覆盖内容

标题也可以通过 `stream_title` 方法对标题实现类似操作。

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnColumn>
  <PnChatStep ref="step_ref" :width='200' />
  <PnButton name="Add Content" @click="add_content()" />
</PnColumn>
</template>
<script lang='py'>
import asyncio
import panel as pn
from vuepy import ref

step_ref = ref(None)

async def add_content():
    step = step_ref.value.unwrap()
    step.title = ('Thinking...')
    step.stream("Just thinking...")
    await asyncio.sleep(0.5)
    
    # Calling stream again will concatenate the text
    step.stream(" about `ChatStep`!")
    await asyncio.sleep(0.5)
    
    step.stream('clear', replace=True)
    await asyncio.sleep(0.5)
    
    step.title = ('Ok')
    step.append(pn.pane.Image("https://assets.holoviz.org/panel/samples/png_sample.png", width=50, height=50))
    
</script>
```

## Badges

默认头像是 `BooleanStatus` 组件，但可以通过提供 `default_badges` 进行更改。值可以是表情符号、图像、文本或 Panel 对象

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnChatStep 
    :default_badges='default_badges'
    status="success"
/>
</template>
<script lang='py'>

default_badges={
    "pending": "🤔",
    "running": "🏃",
    "success": "🎉",
    "failed": "😞",
}
</script>
```

## 状态管理

为了显示该步骤正在处理，您可以将`status`设置为 `running` 并提供 `running_title`，使用 `success_title` 在成功时更新标题。

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnCol>
  <PnChatStep
    :width='300'
    status="running" 
    running_title="Processing this step..."
    success_title="Pretend job done!"
    ref="step_ref"
  />
  <PnButton name="Set status" @click="on_click()" />
</PnCol>
</template>
<script lang='py'>
from vuepy import ref
import time

step_ref = ref(None)

def on_click():
    step = step_ref.value.unwrap()
    step.stream("Pretending to do something.")
    time.sleep(1)
    step.status = "success"
</script>
```

## 错误处理

处理失败状态：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnCol>
  <PnChatStep 
    running_title="Processing this step..." 
    success_title="Pretend job done!"
    ref="step_ref"
  />
  <PnButton name="Click" @click="on_click()" />
</PnCol>
</template>
<script lang='py'>
import time
from vuepy import ref

step_ref = ref(None)

def on_click():
    step = step_ref.value.unwrap()
    step.status = "running"
    try:
        step.stream("Breaking something")
        time.sleep(0.5)
        raise RuntimeError("Just demoing!")
    except RuntimeError as e:
        step.status = "failed"
        step.stream(f"Error: {str(e)}", replace=True)
</script>
```

## 标题流式显示

支持标题的流式更新：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnColumn>
  <PnChatStep :width='200' ref="step_ref" />
  <PnButton name="Stream Title" @click="stream_title()" />
</PnColumn>
</template>
<script lang='py'>
from vuepy import ref
import time

step_ref = ref(None)

def stream_title():
    step = step_ref.value.unwrap()
    step.status = "running"
    for char in "It's streaming a title!":
        time.sleep(0.1)
        step.stream_title(char)
</script>
```

## API

### 核心属性
| 属性名                | 说明                                                                 | 类型                          | 默认值          |
|----------------------|--------------------------------------------------------------------|-----------------------------|----------------|
| collapsed_on_success | 成功时是否折叠卡片                                                   | ^[bool]                     | True           |
| context_exception    | 异常处理方式（"raise"-抛出/"summary"-摘要/"verbose"-完整追踪/"ignore"-忽略） | ^[str]                      | "raise"        |
| success_title        | 成功状态标题（未设置时使用最后对象的字符串）                            | ^[str]                      | None           |
| default_title        | 默认标题（其他标题未设置时使用）                                       | ^[str]                      | ""             |
| failed_title         | 失败状态标题                                                        | ^[str]                      | None           |
| margin               | 外边距（(垂直,水平)或(上,右,下,左)）                                  | ^[tuple]                    | (5,5,5,10)     |
| objects              | 聊天步骤内容列表（按列布局，通常应整体替换）                            | ^[list]                     | []             |
| pending_title        | 等待状态标题                                                        | ^[str]                      | None           |
| running_title        | 运行状态标题                                                        | ^[str]                      | None           |
| status               | 步骤状态（"pending"/"running"/"success"/"failed"）                   | ^[str]                      | "pending"      |

### 样式属性
| 属性名            | 说明                                                                 | 类型                          | 默认值        |
|------------------|--------------------------------------------------------------------|-----------------------------|--------------|
| collapsed        | 是否折叠内容                                                        | ^[bool]                     | False        |
| default_badges   | 状态徽章映射（键必须为'pending'/'running'/'success'/'failed'）        | ^[dict]                     | 系统默认徽章    |

### Events

| 事件名   | 说明           | 类型                                      |
| ------- | ------------- | ----------------------------------------- |
| status  | 状态改变时触发  | ^[Callable]`(status: str) -> None`       |

### Slots

| 插槽名   | 说明               |
| ------- | ----------------- |
| default | 自定义步骤内容      |
| title   | 自定义标题内容      |

### 方法

| 方法名         | 说明            | 参数                                    |
| ------------- | -------------- | --------------------------------------- |
| stream        | 流式添加内容     | value, replace=False                    |
| stream_title  | 流式更新标题     | value, replace=False, status="running"  |
| serialize     | 序列化内容       | -                                      |

## Controls

```python
##controls
import panel as pn
pn.extension()

chat_step = pn.chat.ChatStep(
    default_badges={
    "pending": "🤔",
    "running": "🏃",
    "success": "🎉",
    "failed": "😞",
})
chat_step.stream("Some content...")
pn.Row(
    chat_step.controls(jslink=False), 
    # chat_step,
)
```
