---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# WebP WebP图像组件

`WebP`组件可以在面板中嵌入`.webp`图像文件。如果提供本地路径，则嵌入该文件；如果提供URL，则链接到远程图像。

底层实现为`panel.pane.WebP`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/WebP.html

## 基本用法

`PnWebP`组件可以指向任何本地或远程的`.webp`文件。如果给定的URL以`http`或`https`开头，`embed`参数决定图像是嵌入还是链接：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnWebP object="https://assets.holoviz.org/panel/samples/webp_sample.webp" />
</template>
```

我们可以通过设置特定的固定`width`或`height`来调整图像的大小：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnWebP object="https://assets.holoviz.org/panel/samples/webp_sample.webp" :width="400" />
</template>
```

或者，我们可以使用`sizing_mode`来调整宽度和高度：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnWebP object="https://assets.holoviz.org/panel/samples/webp_sample2.webp" 
          sizing_mode="scale_width" />
</template>
```

请注意，默认情况下，图像的宽高比是固定的，因此即使在响应式尺寸模式下，图像的旁边或下方也可能存在间隙。要覆盖此行为，请设置`fixed_aspect=False`或提供固定的`width`和`height`值。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnWebP object="https://assets.holoviz.org/panel/samples/webp_sample2.webp" 
             :fixed_aspect="False"
             :width="300"
             :height="150" />
    <PnWebP object="https://assets.holoviz.org/panel/samples/webp_sample2.webp" 
             :fixed_aspect="True"
             :width="300"
             :height="150" />
  </PnRow>
</template>
```

## API

### 属性

| 属性名        | 说明                                    | 类型       | 默认值 |
| ------------- | --------------------------------------- | ---------- | ------ |
| value         | 要显示的WebP文件。可以是指向本地或远程文件的字符串 | ^[str\|object] | —      |
| alt_text      | 添加到图像标签的替代文本。当用户无法加载或显示图像时显示 | ^[str] | None   |
| embed         | 如果给定图像URL，这将决定图像是作为base64嵌入还是仅链接 | ^[bool] | False  |
| fixed_aspect  | 是否强制图像的宽高比相等                | ^[bool]    | True   |
| link_url      | 链接URL，使图像可点击并链接到其他网站    | ^[str]     | None   |
| styles        | 指定CSS样式的字典                       | ^[dict]    | {}     |

## Controls

```python
##controls
import panel as pn

pn.extension()

w = pn.pane.WebP(
    'https://assets.holoviz.org/panel/samples/webp_sample2.webp',
    width=200
) 
pn.Row(w.controls)
```
