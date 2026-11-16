---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Audio 音频

音频组件用于展示音频播放器，可以显示本地或远程音频文件、NumPy ndarray 或 Torch Tensor。

该组件还允许访问和控制播放器状态，包括切换播放/暂停和循环状态、当前播放时间和音量。

音频播放器支持 `ogg`、`mp3` 和 `wav` 文件格式。

如果安装了 SciPy，还支持 1 维 NumPy ndarray 和 1 维 Torch Tensor。数据类型必须是以下之一：
- numpy: np.int16, np.uint16, np.float32, np.float64
- torch: torch.short, torch.int16, torch.half, torch.float16, torch.float, torch.float32, torch.double, torch.float64

数组或张量输入将被 SciPy 降采样到 16bit 并转换为 wav 文件。

底层实现为`panel.pane.Audio`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/Audio.html

## 基本用法

`PnAudio` 组件可以通过指向远程音频文件的 URL 或本地音频文件构建（在这种情况下，数据被嵌入）：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnAudio name="Audio" :object="url" />
</template>
<script lang='py'>
url = 'https://ccrma.stanford.edu/~jos/mp3/pno-cs.mp3'
</script>
```

## 控制播放

播放器可以使用其自身的控件控制，也可以通过 Python 代码控制。要在代码中暂停或取消暂停，请使用 `paused` 属性：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnAudio name="Audio" :object="url" ref="audio_ref" />
  <PnRow>
    <PnButton @click="play()">播放</PnButton>
    <PnButton @click="pause()">暂停</PnButton>
    <PnButton @click="set_time()">跳至5秒</PnButton>
    <PnButton @click="set_volume()">设置音量50%</PnButton>
  </PnRow>
</template>
<script lang='py'>
from vuepy import ref

url = 'https://ccrma.stanford.edu/~jos/mp3/pno-cs.mp3'

audio_ref = ref(None)

def play():
    audio = audio_ref.value.unwrap()
    audio.paused = False

def pause():
    audio = audio_ref.value.unwrap()
    audio.paused = True
    
def set_time():
    audio = audio_ref.value.unwrap()
    audio.time = 5.0
    
def set_volume():
    audio = audio_ref.value.unwrap()
    audio.volume = 50
</script>
```

## NumPy 数组输入

当提供 NumPy 数组或 Torch 张量时，应指定 `sample_rate`。

在此示例中，我们绘制了一个频率调制信号：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnAudio :object="waveform_quiet" :sample_rate="sps" />
</template>
<script lang='py'>
import numpy as np

# Samples per second
sps = 44100
# Duration in seconds
duration = 10

modulator_frequency = 2.0
carrier_frequency = 120.0
modulation_index = 2.0

time = np.arange(sps*duration) / sps
modulator = np.sin(2.0 * np.pi * modulator_frequency * time) * modulation_index
carrier = np.sin(2.0 * np.pi * carrier_frequency * time)
waveform = np.sin(2. * np.pi * (carrier_frequency * time + modulator))
    
waveform_quiet = waveform * 0.3
</script>
```

## API

### 属性

| 属性名      | 说明                 | 类型                                                           | 默认值 |
| ---------- | ------------------- | ---------------------------------------------------------------| ------- |
| object     | 本地文件路径、指向音频文件的远程URL、1维numpy数组或1维torch张量 | ^[string, numpy.ndarray, torch.Tensor] | None |
| autoplay   | 当为True时，指定输出将自动播放。在Chromium浏览器中，这需要用户点击一次播放 | ^[boolean] | False |
| loop       | 是否在播放结束时循环    | ^[boolean]                                                    | False |
| muted      | 当为True时，指定输出应该被静音 | ^[boolean]                                                | False |
| name       | 面板的标题            | ^[str]                                                         | None |
| paused     | 播放器是否暂停         | ^[boolean]                                                    | True |
| sample_rate | 给定NumPy数组或Torch张量时的采样率 | ^[int]                                            | 44100 |
| throttle   | 以毫秒为单位的当前播放采样频率 | ^[int]                                                  | 500 |
| time       | 当前播放时间（秒）      | ^[float]                                                      | 0 |
| volume     | 音量范围为0-100        | ^[int]                                                        | 100 |
| sizing_mode | 尺寸调整模式         | ^[str]                                                         | 'fixed'  |
| width      | 宽度                 | ^[int, str]                                                    | None    |
| height     | 高度                 | ^[int, str]                                                    | None    |

## Controls

```python
##controls
import panel as pn

pn.extension()

audio = pn.pane.Audio(
    'https://ccrma.stanford.edu/~jos/mp3/pno-cs.mp3', 
    name='Audio', time=1, volume=20)
pn.Row(audio.controls(jslink=True), audio)
```
