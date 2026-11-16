---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# SVG 矢量图

`PnSVG` 组件如果提供本地路径，则将 `.svg` 矢量图文件嵌入到面板中，或者如果提供 URL，则会链接到远程图像。

底层实现为`panel.pane.SVG`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/SVG.html

## 基本用法

`PnSVG` 组件可以指向任何本地或远程 `.svg` 文件。如果给定以 `http` 或 `https` 开头的 URL，则 `embed` 参数决定图像是嵌入还是链接到：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnSVG 
    object="https://panel.holoviz.org/_static/logo_stacked.svg" 
    link_url="https://panel.holoviz.org" 
    :width="300" />
</template>
```

## 调整大小

我们可以通过设置特定的固定 `width` 或 `height` 来调整图像的大小：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnSVG 
    object="https://panel.holoviz.org/_static/logo_stacked.svg" 
    :width="150" />
</template>
```

与任何其他组件一样，`PnSVG` 组件可以通过设置 `object` 参数来更新：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnCol>
  <PnSVG 
    :object="svg_url.value" 
    :width="150" 
  />
  <PnButton @click="update_svg()">更新 SVG</PnButton>
</PnCol>
</template>
<script lang='py'>
from vuepy import ref
svg_url = ref("https://panel.holoviz.org/_static/logo_stacked.svg")

def update_svg():
    svg_url.value = "https://panel.holoviz.org/_static/jupyterlite.svg"
</script>
```

## 响应式 SVG

您也可以使用 *响应式* `sizing_mode`，如 `'stretch_width'`：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnSVG 
    object="https://assets.holoviz.org/panel/samples/svg_sample2.svg" 
    sizing_mode="stretch_width" />
</template>
```

请注意，默认情况下图像的宽高比是固定的，要覆盖此行为，请设置 `fixed_aspect=false` 或提供固定的 `width` 和 `height` 值。

## 编码选项

SVG 图像可以使用 base64 编码进行嵌入。使用 `encode` 参数可以控制是否对 SVG 进行编码：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnRow>
    <PnColumn>
      <PnMD>## encode=true（默认）</PnMD>
      <PnSVG 
        object="https://panel.holoviz.org/_static/logo_stacked.svg" 
        :encode="True"
        :width="200" />
    </PnColumn>
    <PnColumn>
      <PnMD>## encode=false</PnMD>
      <PnSVG 
        object="https://panel.holoviz.org/_static/logo_stacked.svg" 
        :encode="False"
        :width="200" />
    </PnColumn>
  </PnRow>
</template>
```

当启用编码时，SVG 链接可能无法工作，而禁用编码会阻止图像缩放正常工作。

## API

### 属性

| 属性名          | 说明                          | 类型                                                           | 默认值 |
| -------------- | ----------------------------- | ---------------------------------------------------------------| ------- |
| object         | 要显示的 SVG 文件。可以是指向本地或远程文件的字符串，或具有 `_repr_svg_` 方法的对象 | ^[str, object] | None |
| alt_text       | 添加到图像标签的替代文本。当用户无法加载或显示图像时显示替代文本 | ^[str]                   | None |
| embed          | 如果给定图像 URL，这决定图像是否将被嵌入为 base64 或仅链接到 | ^[boolean]                  | False |
| encode         | 是否将 SVG 编码为 base64。启用时 SVG 链接可能无法工作，而禁用编码会阻止图像缩放正常工作 | ^[boolean] | True |
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

svg_pane = pn.pane.SVG('https://panel.holoviz.org/_static/logo_stacked.svg', width=100)
pn.Row(svg_pane.controls())
```
