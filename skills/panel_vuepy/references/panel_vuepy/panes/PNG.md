---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# PNG 图像

`PnPNG` 组件如果提供本地路径，则将 `.png` 图像文件嵌入到面板中，或者如果提供 URL，则会链接到远程图像。

底层实现为`panel.pane.PNG`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/PNG.html

## 基本用法

`PnPNG` 组件可以指向任何本地或远程 `.png` 文件。如果给定以 `http` 或 `https` 开头的 URL，则 `embed` 参数决定图像是嵌入还是链接到：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnPNG object="https://assets.holoviz.org/panel/samples/png_sample.png" />
</template>
```

## 调整大小

我们可以通过设置特定的固定 `width` 或 `height` 来调整图像的大小：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnPNG 
    object="https://assets.holoviz.org/panel/samples/png_sample.png"
    :width="400" />
</template>
```

或者，我们可以使用 `sizing_mode` 来调整宽度和高度：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnPNG 
    object="https://assets.holoviz.org/panel/samples/png_sample2.png"
    sizing_mode="scale_width" />
</template>
```

请注意，默认情况下，图像的宽高比是固定的，因此即使在响应式调整大小模式下，图像旁边或下方也可能有空隙。要覆盖此行为，请设置 `fixed_aspect=false` 或提供固定的 `width` 和 `height` 值。

## 设置链接 URL

使用 `link_url` 参数，您可以使图像可点击并链接到其他网站：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnPNG 
    object="https://assets.holoviz.org/panel/samples/png_sample.png"
    link_url="https://panel.holoviz.org/"
    :width="400" />
</template>
```

## API

### 属性

| 属性名          | 说明                          | 类型                                                           | 默认值 |
| -------------- | ----------------------------- | ---------------------------------------------------------------| ------- |
| object         | 要显示的 PNG 文件。可以是指向本地或远程文件的字符串，或具有 `_repr_png_` 方法的对象 | ^[str, object] | None |
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

png_pane = pn.pane.PNG('https://assets.holoviz.org/panel/samples/png_sample.png')
pn.Column(png_pane.controls)
```
