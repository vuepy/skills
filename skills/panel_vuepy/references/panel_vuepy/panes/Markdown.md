---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Markdown 文本

`PnMarkdown` 组件允许在面板中渲染任意 [Markdown](https://python-markdown.github.io)。它渲染包含有效 Markdown 的字符串以及具有 `_repr_markdown_` 方法的对象，还可以定义自定义 CSS 样式。

底层实现为`panel.pane.Markdown`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/Markdown.html

## 基本用法

`PnMarkdown`/`PnMD` 组件接受所有*基本* Markdown 语法，包括嵌入式 HTML。它还支持大多数*扩展* Markdown 语法。

要在代码块中启用代码高亮显示，需要安装 `pip install pygments`

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnMarkdown :width="500">
# Markdown 示例

这个示例文本来自 [The Markdown Guide](https://www.markdownguide.org)!

## 基本语法

这些是 John Gruber 原始设计文档中概述的元素。所有 Markdown 应用程序都支持这些元素。

### 标题

# H1
## H2
### H3

### 粗体

**粗体文本**

### 斜体

*斜体文本*

### 引用块

> 引用块

### 有序列表

1. 第一项
2. 第二项
3. 第三项

### 无序列表

- 第一项
- 第二项
- 第三项

### 代码

`代码`

### 水平分割线

---

### 链接

[Markdown 指南](https://www.markdownguide.org)

### 图像

![替代文本](https://www.markdownguide.org/assets/images/tux.png)

## 扩展语法

这些元素通过添加额外的功能来扩展基本语法。并非所有 Markdown 应用程序都支持这些元素。

### 表格

| 语法 | 描述 |
| ----------- | ----------- |
| 标题 | 标题 |
| 段落 | 文本 |

### 围栏代码块

```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

### 脚注

这里有一个带有脚注的句子。[^1]

[^1]: 这是脚注。

### 定义列表

术语
: 该术语的一些定义

### 删除线

~~地球是平的。~~

### 任务列表

- [x] 写新闻稿
- [ ] 更新网站
- [ ] 联系媒体

### 表情符号

太有趣了！😂

(另见 [复制和粘贴表情符号](https://www.markdownguide.org/extended-syntax/#copying-and-pasting-emoji))
"""
</PnMarkdown>
</template>
```

还可以通过`object`设置内容。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnMarkdown :object="markdown_content" :width="500" />
</template>
<script lang='py'>
markdown_content = """
# Markdown 示例

这个示例文本来自 [The Markdown Guide](https://www.markdownguide.org)!
"""
</script>
```

## 动态内容

vuepy 的响应式特性可以与 `Markdown` 组件的无缝集成，`Slider` 调整时，`Markdown` 内容中的值会实时更新，

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnCol>
  <PnIntSlider v-model='val.value' :end='10'/>
  <PnMD :width="500">

# h1
slider value: {{ val.value }}

  </PnMD>
</PnCol>
</template>
<script lang='py'>
from vuepy import ref

val = ref(1)

</script>
```

## 样式

如果您想控制从 Markdown 源生成的 HTML 的行为，通常可以通过向此组件的 `style` 参数传递参数来实现。例如，您可以在 Markdown 表格周围添加蓝色边框，如下所示：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnMarkdown style="border: 4px solid blue">
| 语法 | 描述 |
| ----------- | ----------- |
| 标题 | 标题 |
| 段落 | 文本 |
  </PnMarkdown>
</template>
```

但是，以这种方式指定的样式只会应用于最外层的 Div，目前没有任何方法以这种方式将样式应用于 HTML 的特定内部元素。在这种情况下，我们无法使用 `style` 参数来控制生成表格的行或标题的样式。

如果我们想更改生成的 HTML 的特定内部元素，我们可以通过提供 HTML/CSS &lt;style&gt; 部分来实现。例如，我们可以按如下方式更改标题和数据的边框厚度，但请注意，更改将应用于后续的 Markdown，包括笔记本上下文中的其他单元格：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnMarkdown :object="styled_table_md" />
</template>
<script lang='py'>
styled_table_md = """
<style>
table, th, td {
  border: 5px solid black;
}
</style>
| 语法 | 描述 |
| ----------- | ----------- |
| 标题 | 标题 |
| 段落 | 文本 |
"""
</script>
```

如果您只想为特定的 Markdown 文本更改样式，您可以通过添加可以用样式表针对的 CSS 类来轻松实现这一点。这里我们添加了 `special_table` 类，然后表格使用红色边框：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnMarkdown :object="special_md" :stylesheets="[css]" />
</template>
<script lang='py'>
css = """
div.special_table + table * {
  border: 1px solid red;
}
"""

special_md = """
<div class="special_table"></div>

| 语法 | 描述 |
| ----------- | ----------- |
| 标题 | 标题 |
| 段落 | 文本 |
"""
</script>
```

## 渲染器

自 1.0 版本以来，Panel 使用 [`markdown-it`](https://markdown-it-py.readthedocs.io/en/latest/) 作为默认的 markdown 渲染器。如果您想恢复之前的默认值 `'markdown'` 或切换到 `MyST` 风格的 Markdown，可以通过 `renderer` 参数设置它。例如，这里我们使用 'markdown-it' 和 'markdown' 渲染一个任务列表：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnMarkdown renderer='markdown-it'>
markdown-it  
- [ ] 鸡蛋
- [x] 面粉
- [x] 牛奶
    </PnMarkdown>
    <PnMarkdown renderer='markdown'>
markdown  

- [ ] 鸡蛋
- [x] 面粉
- [x] 牛奶
    </PnMarkdown>
  </PnRow>
</template>
```

## LaTeX 支持

`PnMarkdown` 组件也支持数学渲染，方法是用 `$$` 分隔符封装要渲染的字符串。要启用 LaTeX 渲染，您必须在 `pn.extension` 调用中显式加载 'mathjax' 扩展。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnMarkdown :object="latex_md" :width="800" />

  <PnMarkdown :width="800">
Markdown 组件支持用双 $ 分隔符封装的字符串的数学渲染：$$\sum_{j}{\sum_{i}{a*w_{j, i}}}$$
  </PnMarkdown>
</template>
<script lang='py'>
import panel as pn
pn.extension('mathjax')

latex_md = r"""
Markdown 组件支持用双 $ 分隔符封装的字符串的数学渲染：$$\sum_{j}{\sum_{i}{a*w_{j, i}}}$$
"""
</script>
```

请注意使用 `r` 前缀创建字符串作为*原始*字符串。Python 原始字符串将反斜杠字符 (\\) 视为文字字符。例如，这不起作用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <p>without r</p>
  <PnMarkdown :object="bad_latex" />
  <p>with r</p>
  <PnMarkdown :object="good_latex" />
</template>
<script lang='py'>
bad_latex = "$$\frac{1}{n}$$"
good_latex = r"$$\frac{1}{n}$$"
</script>
```

## API

### 属性

| 属性名             | 说明                          | 类型                                                           | 默认值 |
| ----------------- | ----------------------------- | ---------------------------------------------------------------| ------- |
| object            | 包含 Markdown 的字符串，或具有 `_repr_markdown_` 方法的对象 | ^[str, object]               | None |
| dedent            | 是否对所有行去除共同的空白     | ^[boolean]                                                    | True |
| disable_anchors   | 是否禁用自动为标题添加锚点     | ^[boolean]                                                    | False |
| disable_math      | 是否禁用使用 `$$` 分隔符转义的字符串的 MathJax 数学渲染 | ^[boolean]                     | False |
| enable_streaming  | 是否启用文本片段的流式传输。这将在更新时对 `object` 进行差异比较，只发送添加的尾部块 | ^[boolean] | False |
| extensions        | 要使用的 [Python-Markdown 扩展](https://python-markdown.github.io/extensions/) 列表（不适用于 'markdown-it' 和 'myst' 渲染器） | ^[list] | None |
| hard_line_break   | 简单的新行是否渲染为硬换行。默认为 False 以符合原始 Markdown 规范。`'myst'` 渲染器不支持 | ^[boolean] | False |
| plugins           | 要应用的其他 markdown-it-py 插件的列表 | ^[function]                                          | None |
| renderer          | Markdown 渲染器实现           | ^[literal: `'markdown-it'`, `'markdown'`, `'myst'`]          | 'markdown-it' |
| renderer_options  | 传递给 markdown 渲染器的选项   | ^[dict]                                                       | None |
| styles            | 指定 CSS 样式的字典           | ^[dict]                                                        | {} |
| sizing_mode       | 尺寸调整模式                   | ^[str]                                                         | 'fixed'  |
| width             | 宽度                          | ^[int, str]                                                    | None    |
| height            | 高度                          | ^[int, str]                                                    | None    |
| min_width         | 最小宽度                      | ^[int]                                                         | None    |
| min_height        | 最小高度                      | ^[int]                                                         | None    |
| max_width         | 最大宽度                      | ^[int]                                                         | None    |
| max_height        | 最大高度                      | ^[int]                                                         | None    |
| margin            | 外边距                        | ^[int, tuple]                                                  | 5       |
| css_classes       | CSS类名列表                   | ^[list]                                                        | []      |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | markdown内容      |

## Controls

```python
##controls
import panel as pn
pn.extension('mathjax')

m = pn.pane.Markdown("""
# Markdown Sample
""", width=300)
pn.Row(m.controls)
```
