---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# GIF 图片

`PnGif` 组件在提供本地路径时将 `.gif` 图像文件嵌入到面板中，或者在提供 URL 时将链接到远程图像。

底层实现为`panel.pane.GIF`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/GIF.html

## 基本用法

`PnGIF` 组件可以指向任何本地或远程的 `.gif` 文件。如果给定以 `http` 或 `https` 开头的 URL，`embed` 参数决定图像是嵌入还是链接，可以通过设置特定的固定 `width` 或 `height` 来调整图像的大小：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnGif :object="url" :width="100" />
</template>
<script lang='py'>
url = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif'
</script>
```

或者，我们可以使用 `sizing_mode` 来调整宽度和高度：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnGif :object="url" sizing_mode="stretch_width" />
</template>
<script lang='py'>
url = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
</script>
```

请注意，默认情况下，图像的宽高比是固定的，因此即使在响应式调整大小模式下，图像旁边或下方也可能有空隙。要覆盖此行为，请设置 `fixed_aspect=False` 或提供固定的 `width` 和 `height` 值。

## API

### 属性

| 属性名       | 说明                 | 类型                                                           | 默认值 |
| ----------- | ------------------- | ---------------------------------------------------------------| ------- |
| object      | 要显示的字符串或对象  | ^[str, object]                                                 | None |
| alt_text    | 添加到图像标签的替代文本。当用户无法加载或显示图像时显示替代文本 | ^[str]              | None |
| embed       | 如果给定图像 URL，这决定图像是否将被嵌入为 base64 或仅链接到 | ^[boolean]            | False |
| fixed_aspect | 是否强制图像的宽高比相等 | ^[boolean]                                                 | True |
| link_url    | 使图像可点击并链接到其他网站的链接 URL | ^[str]                                       | None |
| styles      | 指定 CSS 样式的字典   | ^[dict]                                                        | {} |
| sizing_mode | 尺寸调整模式         | ^[str]                                                         | 'fixed'  |
| width       | 宽度                 | ^[int, str]                                                    | None    |
| height      | 高度                 | ^[int, str]                                                    | None    |
| min_width   | 最小宽度             | ^[int]                                                         | None    |
| min_height  | 最小高度             | ^[int]                                                         | None    |
| max_width   | 最大宽度             | ^[int]                                                         | None    |
| max_height  | 最大高度             | ^[int]                                                         | None    |
| margin      | 外边距               | ^[int, tuple]                                                  | 5       |
| css_classes | CSS类名列表          | ^[list]                                                        | []      |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

## Controls

```python
##controls
import panel as pn

pn.extension()

gif_pane = pn.pane.GIF('https://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif')
pn.Row(gif_pane.controls)
```
