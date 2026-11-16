---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# PDF 文档

`PnPDF` 组件如果提供本地路径，则将 `.pdf` 文档嵌入到面板中，或者如果提供 URL，则会链接到远程文件。

底层实现为`panel.pane.PDF`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/PDF.html

## 基本用法

`PnPDF` 组件可以指向任何本地或远程 `.pdf` 文件。如果给定以 `http` 或 `https` 开头的 URL，则 `embed` 参数决定 PDF 是嵌入还是链接到：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnPDF 
    object="https://assets.holoviz.org/panel/samples/pdf_sample.pdf" 
    :width="700" 
    :height="1000" />
</template>
```

与任何其他组件一样，可以通过设置 `object` 参数来更新 `PnPDF` 组件：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnCol>
  <PnPDF 
    :object="pdf_url.value" 
    :width="700" 
    :height="1000" 
  />
  <PnButton @click="update_pdf()">更新 PDF</PnButton>
</PnCol>
</template>
<script lang='py'>
from vuepy import ref
pdf_url = ref("https://assets.holoviz.org/panel/samples/pdf_sample.pdf")

def update_pdf():
    pdf_url.value = "https://assets.holoviz.org/panel/samples/pdf_sample2.pdf"
</script>
```

## 设置起始页

使用 `start_page` 参数，您可以指定加载页面时 PDF 文件的起始页：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnPDF 
    object="https://assets.holoviz.org/panel/samples/pdf_sample2.pdf" 
    :start_page="2"
    :width="700" 
    :height="1000" />
</template>
```

## API

### 属性

| 属性名       | 说明                          | 类型                                                           | 默认值 |
| ----------- | ----------------------------- | ---------------------------------------------------------------| ------- |
| object      | 要显示的 PDF 文件。可以是指向本地或远程文件的字符串，或具有 `_repr_pdf_` 方法的对象 | ^[str, object] | None |
| embed       | 如果给定 URL 到文件，这决定 PDF 是否将被嵌入为 base64 或仅链接到 | ^[boolean]                 | False |
| start_page  | 加载页面时 `.pdf` 文件的起始页 | ^[int]                                                         | None |
| styles      | 指定 CSS 样式的字典           | ^[dict]                                                        | {} |
| sizing_mode | 尺寸调整模式                   | ^[str]                                                         | 'fixed'  |
| width       | 宽度                          | ^[int, str]                                                    | None    |
| height      | 高度                          | ^[int, str]                                                    | None    |
| min_width   | 最小宽度                      | ^[int]                                                         | None    |
| min_height  | 最小高度                      | ^[int]                                                         | None    |
| max_width   | 最大宽度                      | ^[int]                                                         | None    |
| max_height  | 最大高度                      | ^[int]                                                         | None    |
| margin      | 外边距                        | ^[int, tuple]                                                  | 5       |
| css_classes | CSS类名列表                   | ^[list]                                                        | []      |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

## Controls

```python
##controls
import panel as pn
pn.extension()

pdf_pane = pn.pane.PDF('https://assets.holoviz.org/panel/samples/pdf_sample.pdf', width=700, height=1000)
pn.Column(pdf_pane.controls)
```
