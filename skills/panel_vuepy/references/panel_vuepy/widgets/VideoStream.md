---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# VideoStream 视频流

VideoStream组件可以显示来自本地流（例如网络摄像头）的视频，并允许从Python访问流式视频数据。

底层实现为`panel.widgets.VideoStream`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/VideoStream.html

## 基本用法

视频流组件默认情况下会显示视频流，可用于如网络摄像头实时视频的展示。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVideoStream name="视频流" />
</template>
```

## 截图功能

可以调用`snapshot`方法触发组件的`value`更新，以获取当前视频帧的图像。

```python
##controls
import panel as pn
pn.extension()

video_stream = pn.widgets.VideoStream(name='Video Stream')
video_stream.snapshot()

html = pn.pane.HTML(width=320, height=240)

def update(event):
    html.object = '<img src="'+event.new+'" width=320 height=240 />'
    
video_stream.param.watch(update, 'value')

html
```

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol>
    <PnVideoStream 
      name="video stream" 
      @change="update_snapshot"
      v-model="snapshot_img.value"
      ref="video_stream_ref"
    />
    <PnButton 
      name="Snapshot" 
      button_type="primary" 
      @click="take_snapshot()"
    />
  </PnCol>
  <img alt='snap' :src="snapshot_img.value" />
  <PnHTML :object="snapshot_html.value" :width='320' :height='240' />
</template>
<script lang='py'>
import panel as pn
from vuepy import ref

snapshot_html = ref("")
video_stream_ref = ref(None)
snapshot_img = ref('')

def take_snapshot():
    if video_stream_ref.value:
        print('img', video_stream_ref.value.unwrap().value)
        video_stream_ref.value.unwrap().snapshot()

def update_snapshot(event):
    print(event.new)
    if event.new:
        snapshot_html.value = f'<img src="{event.new}" width=320 height=240 />'
        # video_stream_ref.value = event['owner']
</script>
```

## 定时截图

通过设置`timeout`参数，可以指定视频流将以多大频率更新。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol>
    <PnToggle name="暂停" v-model="paused.value" />
    <PnRow>
      <PnVideoStream 
        :timeout="1000" 
        :paused="paused.value"
        @change="update_timed_snapshot"
      />
    </PnRow>
  <PnHTML :object="timed_html.value" />
  </PnCol>
</template>
<script lang='py'>
import panel as pn
from vuepy import ref

pn.extension()

paused = ref(False)
timed_html = ref("")

def update_timed_snapshot(event):
    if 'value' in event and event.new:
        timed_html.value = f'<img src="{event.new}" width=320 height=240 />'
</script>
```

## 图像格式

可以通过`format`参数指定捕获的图像格式，如果需要高频率的截图，可以选择'jpeg'格式，因为图像尺寸要小得多。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol>
    <PnRow>
      <PnVideoStream 
        name="PNG格式" 
        format="png"
        :timeout="500"
        :width="320"
        :height="240"
      />
      <PnVideoStream 
        name="JPEG格式" 
        format="jpeg"
        :timeout="500"
        :width="320"
        :height="240"
      />
    </PnRow>
    <PnStaticText value="JPEG格式适合高频率截图，因为图像尺寸更小" />
  </PnCol>
</template>
<script lang='py'>
import panel as pn
from vuepy import ref

pn.extension()
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| format | 捕获图像的格式，'png'或'jpeg' | ^[string] | 'png' |
| paused | 视频流是否暂停 | ^[boolean] | false |
| timeout | 截图之间的间隔（毫秒），如果为None则仅在调用snapshot方法时才拍摄截图 | ^[int]^[None] | None |
| value | 当前截图的字符串表示 | ^[string] | — |
| snapshot | 触发截图的动作 | ^[boolean] | false |
| name | 组件标题 | ^[string] | — |

### Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| change | 当组件状态（特别是value）改变时触发 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()

video_stream = pn.widgets.VideoStream(name='Video Stream')

pn.Row(video_stream.controls(jslink=True), video_stream)
```
