---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# PanelCallbackHandler LangChain 回调处理器

用于在 Panel 聊天组件中渲染和流式显示 LangChain 对象（如工具、代理和链）的思维链。继承自 LangChain 的 BaseCallbackHandler。

底层实现为`panel.chat.langchain.PanelCallbackHandler`，参数基本一致，参考文档：https://panel.holoviz.org/reference/chat/PanelCallbackHandler.html

## 基本用法

基本的 LangChain 集成示例：

## 流式输出

通过设置 LLM 的 streaming=True 来启用流式输出：

## API

### 属性

| 属性名    | 说明                  | 类型                                 | 默认值  |
| -------- | -------------------- | ----------------------------------- | ------- |
| instance | 目标聊天组件实例       | ^[ChatFeed \| ChatInterface]        | —      |
| user     | 用户名               | ^[str]                              | —      |
| avatar   | 用户头像              | ^[str \| BinaryIO]                  | —      |

### 方法

| 方法名    | 说明                  | 参数                                    |
| -------- | ------------------- | --------------------------------------- |
| -        | -                  | -                                       |

```python
##controls
import panel as pn
from langchain.llms import OpenAI
pn.extension()

llm = OpenAI(temperature=0)
callback_handler = pn.chat.langchain.PanelCallbackHandler(chat_interface)
```
