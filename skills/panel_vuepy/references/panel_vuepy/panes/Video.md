---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Video 视频组件

`PnVideo` 组件允许在 Panel 应用程序中显示视频播放器，可以用于显示本地或远程视频文件。该组件还提供对播放器状态的访问和控制，包括切换播放/暂停状态、循环状态、当前时间和音量。根据浏览器的不同，视频播放器支持 `mp4`、`webm` 和 `ogg` 容器以及多种编解码器。

底层实现为`panel.pane.Video`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/Video.html

## 基本用法

`PnVideo` 组件可以通过 URL 指向远程视频文件或本地视频文件（在这种情况下，数据将被嵌入）：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVideo 
    object="https://assets.holoviz.org/panel/samples/video_sample.mp4" 
    :width="640" 
    :loop="True" />
</template>
```

## 控制视频播放

可以通过播放器自身的控件以及使用组件属性来控制视频播放。例如，通过修改 `paused` 属性来暂停或恢复播放：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVideo 
    :object="video_url" 
    :width="640" 
    :loop="True"
    :paused="is_paused.value" 
  />
  <PnButton @click="toggle_play()">{{ play_button_text.value }}</PnButton>
</template>
<script lang='py'>
from vuepy import ref, computed

video_url = "https://assets.holoviz.org/panel/samples/video_sample.mp4"
is_paused = ref(True)

def toggle_play():
    is_paused.value = not is_paused.value

play_button_text = computed(lambda: "播放" if is_paused.value else "暂停")
</script>
```

## 音量控制

可以通过设置 `volume` 属性来控制视频的音量：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVideo 
    object="https://assets.holoviz.org/panel/samples/video_sample.mp4" 
    :width="640" 
    :volume="volume.value" 
  />
  <PnRow>
    <PnMD>音量：</PnMD>
    <PnIntSlider v-model="volume.value" :start="0" :end="100" />
  </PnRow>
</template>
<script lang='py'>
from vuepy import ref

volume = ref(50)
</script>
```

## 访问当前播放时间

可以通过 `time` 属性读取和设置当前播放时间（以秒为单位）：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnCol>
  <PnVideo 
    v-model:time='current_time.value'
    object="https://assets.holoviz.org/panel/samples/video_sample.mp4" 
    :width="640" 
  />
  <PnRow>
    <PnMD>当前时间：{{ current_time.value }} 秒</PnMD>
    <PnButton @click="jump_to_middle()">跳转到中间</PnButton>
  </PnRow>
</PnCol>
</template>
<script lang='py'>
from vuepy import ref

current_time = ref(0)

def jump_to_middle():
    # 获取视频总时长（这里假设为30秒）
    current_time.value = 15
</script>
```

## API

### 属性

| 属性名      | 说明                          | 类型                                                           | 默认值 |
| ---------- | ----------------------------- | ---------------------------------------------------------------| ------- |
| object     | 指向视频文件的本地文件路径或远程 URL | ^[str]                                                    | None |
| loop       | 是否在播放结束时循环            | ^[boolean]                                                     | False |
| paused     | 播放器是否暂停                 | ^[boolean]                                                     | True |
| autoplay   | 当为 True 时，指定输出将自动播放。在 Chromium 浏览器中，这需要用户点击一次播放 | ^[boolean]   | False |
| muted      | 当为 True 时，指定输出应该静音  | ^[boolean]                                                     | False |
| throttle   | 以毫秒为单位，多久采样一次当前播放时间 | ^[int]                                                   | 250 |
| time       | 当前播放时间（以秒为单位）      | ^[float]                                                       | 0.0 |
| volume     | 音量范围从 0 到 100            | ^[int]                                                         | 100 |
| sizing_mode| 尺寸调整模式                   | ^[str]                                                         | 'fixed'  |
| width      | 宽度                          | ^[int, str]                                                    | None    |
| height     | 高度                          | ^[int, str]                                                    | None    |
| min_width  | 最小宽度                      | ^[int]                                                         | None    |
| min_height | 最小高度                      | ^[int]                                                         | None    |
| max_width  | 最大宽度                      | ^[int]                                                         | None    |
| max_height | 最大高度                      | ^[int]                                                         | None    |
| margin     | 外边距                        | ^[int, tuple]                                                  | 5       |
| css_classes| CSS类名列表                   | ^[list]                                                        | []      |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

## Controls

```python
##controls
import panel as pn
pn.extension()

video = pn.pane.Video('https://assets.holoviz.org/panel/samples/video_sample.mp4', width=300, loop=True)
pn.Row(video.controls(), video)
```
