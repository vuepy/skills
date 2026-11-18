---
outline: deep
titleTemplate: :title | IPywUI
---

# MarkdownViewer 渲染器

渲染 `markdown` 内容，基于 [Python-Markdown](https://github.com/Python-Markdown/markdown) 实现。

## 基础用法

```vue
<!-- basic.vue -->
<template>
  <HBox>
    <Input v-model="md.value" type="textarea" style="height: 400px">
    </Input>
    <MarkdownViewer :value="md.value"></MarkdownViewer>
  </HBox>
</template>

<script src="./basic_setup.py"></script>
<script setup>
import Input from "../../../src/ipywui/components/Input";
import MarkdownViewer from
      "../../../src/ipywui/components/MarkdownViewer";
import HBox from "../../../src/ipywui/components/HBox";
</script>
```

```python
# ./basic_setup.py

from vuepy import ref

md_src = r"""
### H3

This is a **bold** text and this is an *italic* text.   
link to [vuepy](https://github.com/vuepy)

### Code

    def foo():
        print("hello world")
        return 1

### List

- item1
- item2

### LaTeX
$$
a > b,b > c \Rightarrow a > c 
$$

$$
\begin{array}{c} 
  \forall A \in S \\ 
  P \left( A \right) \ge 0 
\end{array}
$$
"""

def setup(props, ctx, vm):
    md = ref(md_src)
    return locals()
```

## MarkdownViewer API

### MarkdownViewer 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| value |    markdown文本 | ^[str]                                                         | —       |
| style        | 自定义css样式        | ^[str]                                                         | -       |

::: tip

**style 支持的其它css属性**

Sizes相关
* height
* width
* max_height
* max_width
* min_height
* min_width

Display相关
* visibility
* display
* overflow

Box model相关
* border
* margin
* padding

Positioning相关
* top
* left
* bottom
* right

:::

### MarkdownViewer 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
