---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# HTML 文本

`PnHTML` 组件允许在面板中渲染任意 HTML。它可以渲染包含有效 HTML 的字符串以及具有 `_repr_html_` 方法的对象，还可以定义自定义 CSS 样式。

底层实现为`panel.pane.HTML`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/HTML.html

## 基本用法

`PnHTML` 组件接受整个 HTML5 规范，包括任何嵌入的脚本标签（这些标签将被执行）。它还支持 `styles` 字典来控制渲染 HTML 内容的 `<div>` 标签的样式。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnHTML :object="html_content" :styles="styles" />
  <PnHTML :object="html_content" style="border: 2px solid red" />
</template>
<script lang='py'>
styles = {
    'background-color': '#F6F6F6', 
    'border': '2px solid black',
    'border-radius': '5px', 
    'padding': '10px'
}

html_content = """
<h1>这是一个 HTML 面板</h1>

<code>
x = 5;<br>
y = 6;<br>
z = x + y;
</code>

<br>
<br>

<table>
  <tr>
    <th>名字</th>
    <th>姓氏</th> 
    <th>年龄</th>
  </tr>
  <tr>
    <td>张</td>
    <td>三</td> 
    <td>50</td>
  </tr>
  <tr>
    <td>李</td>
    <td>四</td> 
    <td>94</td>
  </tr>
</table>
"""
</script>
```

要更新 `object` 或 `styles`，我们可以直接设置它：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnHTML :object="html_content" :styles="dict(styles.value)"/>
  <PnButton @click="update_style()">更新样式</PnButton>
</template>
<script lang='py'>
from vuepy import ref

styles = ref({
    'background-color': '#F6F6F6', 
    'border': '2px solid black',
    'border-radius': '5px', 
    'padding': '10px'
})

html_content = """
<h1>这是一个 HTML 面板</h1>

<code>
x = 5;<br>
y = 6;<br>
z = x + y;
</code>

<br>
<br>

<table>
  <tr>
    <th>名字</th>
    <th>姓氏</th> 
    <th>年龄</th>
  </tr>
  <tr>
    <td>张</td>
    <td>三</td> 
    <td>50</td>
  </tr>
  <tr>
    <td>李</td>
    <td>四</td> 
    <td>94</td>
  </tr>
</table>
"""

def update_style():
    styles.value['border'] = '2px solid red'
</script>
```

## HTML 文档

`PnHTML` 组件设计用于显示*基本* HTML 内容。它不适合渲染包含 JavaScript 或其他动态元素的完整 HTML 文档。

要显示完整的 HTML 文档，您可以转义 HTML 内容并将其嵌入在 [`iframe`](https://www.w3schools.com/html/html_iframe.asp) 中。以下是实现方式：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnHTML :object="iframe_html" :height="350" sizing_mode="stretch_width" />
</template>
<script lang='py'>
import html
import numpy as np
import pandas as pd
import hvplot.pandas
from io import StringIO

# 设置随机种子以便结果可重现
np.random.seed(1)

# 创建时间序列数据框
idx = pd.date_range("1/1/2000", periods=1000)
df = pd.DataFrame(np.random.randn(1000, 4), index=idx, columns=list("ABCD")).cumsum()

# 使用 hvplot 绘制数据
plot = df.hvplot()

# 保存图表。这里使用 StringIO 对象而不是保存到磁盘
plot_file = StringIO()
hvplot.save(plot, plot_file)
plot_file.seek(0)  # 移动到 StringIO 对象的开头

# 读取 HTML 内容并转义
html_content = plot_file.read()
escaped_html = html.escape(html_content)

# 创建嵌入转义 HTML 的 iframe 并显示它
iframe_html = f'<iframe srcdoc="{escaped_html}" style="height:100%; width:100%" frameborder="0"></iframe>'
</script>
```

这种方法确保嵌入的 HTML 安全地隔离在 iframe 中，防止任何脚本直接在 Panel 环境中执行。这种方法特别适用于嵌入需要自己独立 HTML 结构的丰富内容，如交互式可视化。

## API

### 属性

| 属性名             | 说明                          | 类型                                                           | 默认值 |
| ----------------- | ----------------------------- | ---------------------------------------------------------------| ------- |
| object            | 要显示的字符串或具有 `_repr_html_` 方法的对象 | ^[str, object]                                  | None |
| disable_math      | 是否禁用使用 `$$` 分隔符转义的字符串的 MathJax 数学渲染 | ^[boolean]                          | True |
| enable_streaming  | 是否启用文本片段的流式传输。这将在更新时对 `object` 进行差异比较，只发送添加的尾部块 | ^[boolean] | False |
| sanitize_html     | 是否对发送到前端的 HTML 进行净化 | ^[boolean]                                                    | False |
| sanitize_hook     | 如果 `sanitize_html=True`，应用的净化回调 | ^[Callable]                                        | bleach.clean |
| styles            | 指定 CSS 样式的字典           | ^[dict]                                                        | {} |
| style            | 指定 CSS 样式           | ^[]                                                        | '' |
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
| default | 自定义默认内容      |

## Controls

```python
##controls
import panel as pn
pn.extension()

styles = {
    'background-color': '#F6F6F6', 'border': '2px solid black',
    'border-radius': '5px', 'padding': '10px'
}

html_pane = pn.pane.HTML("""
<h1>This is an HTML pane</h1>

<code>
x = 5;<br>
y = 6;<br>
z = x + y;
</code>

<br>
<br>

<table>
  <tr>
    <th>Firstname</th>
    <th>Lastname</th> 
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td> 
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td> 
    <td>94</td>
  </tr>
</table>
""", styles=styles)

pn.Column(html_pane, html_pane.controls)
```
