---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Image 图像

`PnImage` 组件如果提供本地路径，则将任何已知图像格式文件嵌入到面板中，或者如果提供 URL，则会链接到远程图像。

`PnImage` 组件作为一种宏组件，它会选择一种更具体的图像组件来显示图像（首先识别特定图像格式的组件）。

底层实现为`panel.pane.Image`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/Image.html

## 基本用法

`PnImage` 组件可以指向任何本地或远程图像文件。如果给定以 `http` 或 `https` 开头的 URL，则 `embed` 参数决定图像是嵌入还是链接到：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnCol>
      <PnImage object="https://assets.holoviz.org/panel/samples/jpeg_sample.jpeg" />
    </PnCol>
    <PnCol>
      <PnImage object="https://assets.holoviz.org/panel/samples/png_sample.png" />
    </PnCol>
    <PnCol>
      <PnImage object="https://assets.holoviz.org/panel/samples/webp_sample.webp" />
    </PnCol>
  </PnRow>
</template>
```

## 调整大小

我们可以通过设置特定的固定 `width` 或 `height` 来调整图像的大小：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnImage object="https://assets.holoviz.org/panel/samples/png_sample.png" :width="400" />
</template>
```

或者，我们可以使用 `sizing_mode` 来调整宽度和高度：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnImage object="https://assets.holoviz.org/panel/samples/png_sample2.png" 
           sizing_mode="scale_width" />
</template>
```

您可以通过使用 `caption` 为图像添加标题：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnImage 
    object="https://assets.holoviz.org/panel/samples/png_sample2.png" 
    sizing_mode="scale_width" 
    caption="世界地图" />
</template>
```

请注意，默认情况下，图像的宽高比是固定的，因此即使在响应式调整大小模式下，图像旁边或下方也可能有空隙。要覆盖此行为，请设置 `fixed_aspect=false` 或提供固定的 `width` 和 `height` 值。

## PIL 图像支持

Image 组件将渲染任何定义了 `_repr_[png | jpeg | svg]_` 方法的组件，包括 PIL 图像：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnImage :object="pil_image" />
</template>
<script lang='py'>
from PIL import Image, ImageDraw

im = Image.new(mode='RGB', size=(256, 256))

draw = ImageDraw.Draw(im)
draw.line((0, 0) + im.size, fill=128, width=5)
draw.line((0, im.size[1], im.size[0], 0), fill=128, width=5)
draw.rectangle([(96, 96), (160, 160)], fill=(0, 0, 128), width=10)

pil_image = im
</script>
```

## API

### 属性

| 属性名          | 说明                          | 类型                                                           | 默认值 |
| -------------- | ----------------------------- | ---------------------------------------------------------------| ------- |
| object         | 要显示的图像文件。可以是指向本地或远程文件的字符串，或具有 `_repr_extension_` 方法的对象，其中扩展名是图像文件扩展名 | ^[str, object] | None |
| alt_text       | 添加到图像标签的替代文本。当用户无法加载或显示图像时显示替代文本 | ^[str]                   | None |
| embed          | 如果给定图像 URL，这决定图像是否将被嵌入为 base64 或仅链接到 | ^[boolean]                  | False |
| fixed_aspect   | 是否强制图像的宽高比相等       | ^[boolean]                                                     | True |
| link_url       | 使图像可点击并链接到其他网站的链接 URL | ^[str]                                                  | None |
| styles         | 指定 CSS 样式的字典           | ^[dict]                                                        | {} |
| sizing_mode    | 尺寸调整模式                   | ^[str]                                                         | 'fixed'  |
| width          | 宽度                          | ^[int, str]                                                    | None    |
| height         | 高度                          | ^[int, str]                                                    | None    |
| min_width      | 最小宽度                      | ^[int]                                                         | None    |
| min_height     | 最小高度                      | ^[int]                                                         | None    |
| max_width      | 最大宽度                      | ^[int]                                                         | None    |
| max_height     | 最大高度                      | ^[int]                                                         | None    |
| margin         | 外边距                        | ^[int, tuple]                                                  | 5       |
| css_classes    | CSS类名列表                   | ^[list]                                                        | []      |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

## Controls

```python
##controls
import panel as pn
pn.extension()

jpg_pane = pn.pane.Image('https://assets.holoviz.org/panel/samples/jpeg_sample.jpeg')

pn.Column(jpg_pane.controls())
```
