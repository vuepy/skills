---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# TextToSpeech 文本转语音

TextToSpeech组件为Panel带来文本转语音功能，它封装了[HTML5 SpeechSynthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)和[HTML SpeechSynthesisUtterance API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)。

底层实现为`panel.widgets.TextToSpeech`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/TextToSpeech.html

## 基本用法

文本转语音组件可以将文本转换为语音并播放出来。请注意，该组件本身在视觉上不显示任何内容，但仍需添加到应用程序中才能使用。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol>
    <PnTextToSpeech 
      name="语音合成" 
      value="你好，欢迎使用Panel的文本转语音组件。"
      @change="on_change"
    />
    <PnButton 
      name="点击播放" 
      button_type="primary" 
      @click="speak()"
    />
  </PnCol>
</template>
<script lang='py'>
import panel as pn
from vuepy import ref

text_to_speech_ref = ref(None)

def speak():
    text_to_speech_ref.value.speak = True
    
def on_change(event):
    text_to_speech_ref.value = event['owner']
    print(f"语音状态变化: {event}")
</script>
```

## 自动播放

当`auto_speak`设置为true时（默认值），每当`value`更改时，都会自动播放语音。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol>
    <PnTextToSpeech 
      name="自动播放" 
      :value="text.value"
      :auto_speak="True"
      ref="tts"
    />
    <PnTextAreaInput 
      v-model="text.value"
      rows="3"
      placeholder="输入文本，修改后会自动播放"
    />
    <PnRow>
      <PnButton label="暂停" @click="pause()" />
      <PnButton label="恢复" @click="resume()" />
      <PnButton label="取消" @click="cancel()" />
    </PnRow>
  </PnCol>
</template>
<script lang='py'>
import panel as pn
from vuepy import ref

text = ref("输入文本，修改后会自动播放")

def pause():
    tts = pn.state.curdoc.select_one({'name': '自动播放'})
    if tts:
        tts.pause = True

def resume():
    tts = pn.state.curdoc.select_one({'name': '自动播放'})
    if tts:
        tts.resume = True
        
def cancel():
    tts = pn.state.curdoc.select_one({'name': '自动播放'})
    if tts:
        tts.cancel = True
</script>
```

## 语音参数调整

可以通过设置`lang`、`pitch`、`rate`和`volume`参数来调整语音的特性。

## 长文本示例

TextToSpeech组件可以处理较长的文本内容。

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| value | 将在发声时合成的文本 | ^[string] | — |
| auto_speak | 值更改时是否自动发声 | ^[boolean] | true |
| lang | 语音的语言 | ^[string] | — |
| voice | 用于发声的语音 | ^[SpeechSynthesisVoice] | — |
| pitch | 语音的音调，0到2之间的数字 | ^[float] | 1 |
| rate | 语音的速度，0.1到10之间的数字 | ^[float] | 1 |
| volume | 语音的音量，0到1之间的数字 | ^[float] | 1 |
| speak | 发声动作 | ^[boolean] | false |
| cancel | 取消所有待发声的语音 | ^[boolean] | false |
| pause | 暂停语音合成 | ^[boolean] | false |
| resume | 恢复语音合成 | ^[boolean] | false |
| voices | 当前设备上可用的所有语音列表 | ^[List[Voice]] | [] |
| paused | 语音合成是否处于暂停状态 | ^[boolean] | false |
| pending | 语音队列中是否有尚未发声的语音 | ^[boolean] | false |
| speaking | 当前是否正在发声 | ^[boolean] | false |
| name | 组件标题 | ^[string] | — |

### Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| change | 当组件状态改变时触发 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn

pn.extension()

text_to_speech = pn.widgets.TextToSpeech(name="Text to Speech Widget", value="Hello Panel World", auto_speak=False)
text = pn.Param(text_to_speech.param.value, widgets={"value": {"widget_type": pn.widgets.TextAreaInput, "height": 300}})

pn.Row(text_to_speech.controls(jslink=False), text, text_to_speech, width=600) 
```
