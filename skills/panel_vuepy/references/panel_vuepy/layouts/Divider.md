---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Divider 分割线

分割线用于分隔内容，在视觉上创建一个水平分隔，自动占据容器的全宽。

底层实现为`panel.layout.Divider`，参数基本一致，参考文档：https://panel.holoviz.org/reference/layouts/Divider.html

## 基本用法

使用分割线将不同组件清晰地分隔开：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol :width='400' style='background: whitesmoke'>
    <PnMarkdown>
      # Lorem Ipsum
    </PnMarkdown>
    <PnDivider />
    <PnMarkdown>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.  
      $$ x^{2} - 1 $$
    </PnMarkdown>
  </PnCol>
</template>
```

## 响应式布局

启用响应式尺寸后，分割线会自动占据全宽：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnColumn sizing_mode="stretch_width">
    <PnMarkdown>
      ## Slider
    </PnMarkdown>
    <PnDivider :margin="(-20, 0, 0, 0)" />
    <PnRow>
      <PnFloatSlider name="Float" />
      <PnIntSlider name="Int" />
      <PnRangeSlider name="Range" />
      <PnIntRangeSlider name="Int Range" />
    </PnRow>
    <PnMarkdown>
      ## Input
    </PnMarkdown>
    <PnDivider :margin="(-20, 0, 0, 0)" />
    <PnRow>
      <PnTextInput name="Text" />
      <PnDatetimeInput name="Date" />
      <PnPasswordInput name="Password" />
      <PnNumberInput name="Number" />
    </PnRow>
  </PnColumn>
</template>
<script lang='py'>
from vuepy import ref
import panel as pn

pn.config.sizing_mode = 'stretch_width'
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| style | 分割线的样式 | ^[Object] | — |
| margin | 分割线的外边距 | ^[Tuple] | — |

## Controls

```python
##controls
import panel as pn
import panel.widgets as pnw

pn.extension()

d = pn.layout.Divider(margin=(-20, 0, 0, 0))
pn.Row(d.controls, d)
```
