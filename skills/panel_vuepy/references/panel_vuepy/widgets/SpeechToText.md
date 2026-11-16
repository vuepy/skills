---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# SpeechToText 语音转文本

SpeechToText组件通过封装[HTML5 `SpeechRecognition` API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)控制浏览器的语音识别服务。

底层实现为`panel.widgets.SpeechToText`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/SpeechToText.html

## 基本用法

语音转文本组件提供了一个简单的界面来启动和停止语音识别服务，将用户的语音转换为文本。

> **注意**：此功能是**实验性的**，**只有Chrome和少数其他浏览器支持**。有关支持SpeechRecognition API的浏览器的最新列表，请参见[caniuse.com](https://caniuse.com/speech-recognition)或[MDN文档](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#Browser_compatibility)。在某些浏览器（如Chrome）中，即使支持此功能，`grammars`、`interim_results`和`max_alternatives`参数也可能尚未实现。
> 
> 在像Chrome这样的浏览器上，在网页上使用语音识别涉及基于服务器的识别引擎。**您的音频会被发送到网络服务进行识别处理，因此它无法离线工作**。这对您的用例来说是否足够安全和保密，需要您自行评估。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnSpeechToText 
    button_type="light"
    v-model="speech_text.value"
  />
  <PnStaticText :value="f'result: {speech_text.value}'" />
</template>
<script lang='py'>
import panel as pn
from vuepy import ref

speech_text = ref("")
</script>
```

## 自定义按钮

可以通过设置`button_type`、`button_not_started`和`button_started`参数来自定义按钮的外观。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnSpeechToText 
      button_type="success" 
      button_not_started="点击开始识别" 
      button_started="点击停止识别"
      v-model="custom_text.value"
    />
    <PnStaticText :value="f'识别结果: {custom_text.value}'" />
  </PnRow>
</template>
<script lang='py'>
import panel as pn
from vuepy import ref

custom_text = ref("")
</script>
```

## 连续识别

通过设置`continuous=True`，语音识别服务会保持打开状态，允许您连续说多个语句。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnSpeechToText 
    button_type="warning" 
    :continuous="True"
    v-model="continuous_text.value"
  />
  <PnStaticText :value="f'连续识别结果: {continuous_text.value}'" />
</template>
<script lang='py'>
import panel as pn
from vuepy import ref

continuous_text = ref("")
</script>
```

## 使用语法列表

可以使用`GrammarList`限制识别服务识别的单词或单词模式。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol>
    <PnStaticText value="尝试说出一种颜色（英文）如red, blue, green等" />
    <PnSpeechToText 
      button_type="primary" 
      :grammars="grammar_list"
      v-model="grammar_text.value"
    />
    <PnStaticText :value="f'识别结果: {grammar_text.value}'" />
  </PnCol>
</template>
<script lang='py'>
import panel as pn
from panel.widgets import GrammarList
from vuepy import ref

# 创建语法列表
grammar_list = GrammarList()
color_grammar = "#JSGF V1.0; grammar colors; public <color> = red | green | blue | yellow | purple | orange | black | white | pink | brown;"
grammar_list.add_from_string(color_grammar, 1)

grammar_text = ref("")
</script>
```

## 显示详细结果

可以通过`results`属性获取更详细的结果，包括置信度级别。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol>
    <PnSpeechToText 
      button_type="danger" 
      v-model="detailed_text.value"
      @change="update_results"
    />
  </PnCol>
  <PnHTML :object="results_html.value" />
</template>
<script lang='py'>
import panel as pn
from vuepy import ref

detailed_text = ref("")
results_html = ref("")

def update_results(event):
    # 通过引用获取SpeechToText组件实例
    speech_component = event.owner
    # 获取格式化的HTML结果
    results_html.value = speech_component.results_as_html
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| results | 识别的结果，字典列表 | ^[List[Dict]] | [] |
| value | 最近的语音识别结果字符串 | ^[str] | "" |
| lang | 当前语音识别服务的语言（BCP 47格式） | ^[str] | 'en-US' |
| continuous | 是否返回每次识别的连续结果，或仅返回单个结果 | ^[boolean] | false |
| interim_results | 是否应返回临时结果 | ^[boolean] | false |
| max_alternatives | 每个结果提供的最大识别替代方案数量 | ^[int] | 1 |
| service_uri | 指定当前语音识别服务使用的语音识别服务位置 | ^[str] | — |
| grammars | 表示当前语音识别服务将理解的语法的GrammarList对象 | ^[GrammarList] | None |
| started | 语音识别服务是否已启动 | ^[boolean] | false |
| audio_started | 音频是否已启动 | ^[boolean] | false |
| sound_started | 声音是否已启动 | ^[boolean] | false |
| speech_started | 用户是否已开始说话 | ^[boolean] | false |
| button_hide | 是否隐藏切换开始/停止按钮 | ^[boolean] | false |
| button_type | 按钮类型 | ^[str] | 'default' |
| button_not_started | 语音识别服务未启动时按钮上显示的文本 | ^[str] | '' |
| button_started | 语音识别服务启动时按钮上显示的文本 | ^[str] | '' |

### Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| change | 当识别结果改变时触发 | ^[Callable]`(event: dict) -> None` |

### 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| results_deserialized | 获取识别的结果，RecognitionResult对象列表 | ^[property] |
| results_as_html | 获取格式化为HTML的结果 | ^[property] |

## Controls

```python
##controls
import panel as pn
from panel.widgets import SpeechToText, GrammarList

pn.extension()

speech_to_text_basic = SpeechToText(button_type="light")
pn.Row(speech_to_text_basic.controls(jslink=False), speech_to_text_basic) 
```
