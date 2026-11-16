---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# LaTeX 公式

`PnLaTeX` 组件可以使用 [KaTeX](https://katex.org/) 或 [MathJax](https://www.mathjax.org) 渲染器将 LaTeX 方程渲染为 HTML。

您必须手动加载所需的渲染器（例如，`pn.extension('katex')` 或 `pn.extension('mathjax')`）。如果同时加载了两个渲染器，则默认使用 KaTeX。

请注意，[KaTeX](https://katex.org/) 和 [MathJax](https://www.mathjax.org) 都只支持完整 LaTeX 渲染器中可用功能的一个子集。有关支持的功能的详细信息，请参阅它们各自的文档。

底层实现为`panel.pane.LaTeX`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/LaTeX.html

## 基本用法

`PnLaTeX` 组件将渲染任何具有 `_repr_latex_` 方法的对象、[SymPy](https://www.sympy.org/en/index.html) 表达式或包含 LaTeX 的任何字符串。任何 LaTeX 内容都应该包装在 `$...$` 或 `\(...\)` 分隔符中，例如：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnLatex 
    object="supports two delimiters: $\frac{1}{n}$ and \(\frac{1}{n}\)" 
    :styles="{'font-size': '18pt'}" />
</template>
```

为 LaTeX 字符串添加前缀 `r` 很重要，这样可以使字符串成为*原始*字符串，不会转义 `\\` 字符：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol>
    <PnLatex :object="rs" :styles="{'font-size': '18pt'}"/>
    <PnLatex :object="s" :styles="{'font-size': '18pt'}"/>  <!-- 不起作用 -->
  </PnCol>
</template>
<script lang='py'>
rs = r'$\frac{1}{n}$'
s = '$\frac{1}{n}$'
</script>
```

与其他组件一样，`PnLaTeX` 组件可以动态更新：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnCol>
  <PnLatex :object="latex_formula.value" />
  <PnButton @click="update_formula()">更新公式</PnButton>
</PnCol>
</template>
<script lang='py'>
from vuepy import ref
latex_formula = ref(r'The LaTeX pane supports two delimiters: $LaTeX$ and \(LaTeX\)')

def update_formula():
    latex_formula.value = r'$\sum_{j}{\sum_{i}{a*w_{j, i}}}$'
</script>
```

如果两个渲染器都已加载，我们可以覆盖默认渲染器：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnLaTeX 
    object="The LaTeX pane supports two delimiters: $LaTeX$ and \(LaTeX\)" 
    renderer="mathjax"
    :styles="{'font-size': '18pt'}" />
</template>
```

## 复杂公式示例

`PnLaTeX` 组件可以渲染复杂的数学公式：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnLaTeX :object="maxwell" style="font-size: 24pt" />
    <PnSpacer :width="50" />
    <PnLaTeX :object="cross_product" style="font-size: 24pt" />
    <PnSpacer :width="50" />
    <PnLaTeX :object="cauchy_schwarz" style="font-size: 24pt" />
  </PnRow>
</template>
<script lang='py'>
maxwell = r"""
$\begin{aligned}
  \nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} & = \frac{4\pi}{c}\vec{\mathbf{j}} \\
  \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\
  \nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\
  \nabla \cdot \vec{\mathbf{B}} & = 0
\end{aligned}
$"""

cauchy_schwarz = r"""
$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$
"""

cross_product = r"""
$\mathbf{V}_1 \times \mathbf{V}_2 =  \begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
\frac{\partial X}{\partial u} &  \frac{\partial Y}{\partial u} & 0 \\
\frac{\partial X}{\partial v} &  \frac{\partial Y}{\partial v} & 0
\end{vmatrix}
$"""
</script>
```

## SymPy 集成

可以渲染 SymPy 表达式：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnColumn>
    <PnMarkdown>
    # SymPy 表达式渲染：
    </PnMarkdown>
    <PnLaTeX :object="expression" style="font-size: 20px" />
  </PnColumn>
</template>
<script lang='py'>
import sympy as sp

# 使用 SymPy 定义符号和符号表达式
x = sp.symbols('x')
expression = sp.integrate(sp.sin(x)**2, x)
expression_latex = sp.latex(expression) # \frac{x}{2} - ...
</script>
```

## API

### 属性

| 属性名     | 说明                          | 类型                                                           | 默认值 |
| --------- | ----------------------------- | ---------------------------------------------------------------| ------- |
| object    | 包含 LaTeX 代码的字符串，具有 `_repr_latex_` 方法的对象，或 SymPy 表达式 | ^[str, object] | None |
| renderer  | 当前渲染器；必须是可用选项之一  | ^[str]                                                        | 'katex' |
| styles    | 指定 CSS 样式的字典           | ^[dict]                                                        | {} |
| sizing_mode | 尺寸调整模式                | ^[str]                                                         | 'fixed'  |
| width     | 宽度                          | ^[int, str]                                                    | None    |
| height    | 高度                          | ^[int, str]                                                    | None    |
| min_width | 最小宽度                      | ^[int]                                                         | None    |
| min_height| 最小高度                      | ^[int]                                                         | None    |
| max_width | 最大宽度                      | ^[int]                                                         | None    |
| max_height| 最大高度                      | ^[int]                                                         | None    |
| margin    | 外边距                        | ^[int, tuple]                                                  | 5       |
| css_classes| CSS类名列表                  | ^[list]                                                        | []      |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

## Controls

```python
##controls
import panel as pn
pn.extension('katex')

latex = pn.pane.LaTeX(r'$LaTeX$ and \(LaTeX\)', styles={'font-size': '18pt'})
pn.Row(latex.controls, latex)
```
