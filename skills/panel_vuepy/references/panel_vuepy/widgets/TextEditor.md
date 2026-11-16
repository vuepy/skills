---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# TextEditor 文本编辑器

文本编辑器组件允许用户编辑和显示格式化文本，支持多种格式，包括Markdown和HTML。

底层实现为`panel.widgets.TextEditor`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/TextEditor.html

```python
##controls
import panel as pn
import param

pn.extension('texteditor')
wysiwyg = pn.widgets.TextEditor(placeholder='Enter some text')
wysiwyg
```

## 基本用法

基本的文本编辑器使用：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnTextEditor name="基本编辑器" 
               v-model="content.value"/>
  <p>当前内容: {{ content.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

content = ref("这是一个文本编辑器示例")
</script>
```

## 工具栏布局

可以设置工具栏的位置和是否显示：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnRow>
    <PnTextEditor name="基础文本格式" 
                 value="Flat list of options" 
                 :toolbar="['bold', 'italic', 'underline']" />
    
    <PnTextEditor name="分组工具栏" 
                 value="Grouped options" 
                 :toolbar="[['bold', 'italic'], ['link', 'image']]" />
    
    <PnTextEditor name="字体大小" 
                 value="Dropdown of options" 
                 :toolbar="[{'size': ['small', False, 'large', 'huge']}]" />
  </PnRow>
  
  <PnTextEditor name="完整功能编辑器" 
               value="Full configuration" 
               :toolbar="[
                 ['bold', 'italic', 'underline', 'strike'],
                 ['blockquote', 'code-block'],
                 [{ 'header': 1 }, { 'header': 2 }],
                 [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                 [{ 'script': 'sub'}, { 'script': 'super' }],
                 [{ 'indent': '-1'}, { 'indent': '+1' }],
                 [{ 'direction': 'rtl' }],
                 [{ 'size': ['small', False, 'large', 'huge'] }],
                 [{ 'header': [1, 2, 3, 4, 5, 6, False] }],
                 [{ 'color': [] }, { 'background': [] }],
                 [{ 'font': [] }],
                 [{ 'align': [] }],
                 ['clean']
               ]" />
</template>
<script lang='py'>
import panel as pn

pn.config.sizing_mode = 'stretch_width'
</script>
```

## API

### 属性

| 属性名        | 说明                                                                 | 类型                          | 默认值      |
|-------------|--------------------------------------------------------------------|-----------------------------|------------|
| disabled    | 是否禁用编辑器                                                      | ^[bool]                     | False      |
| mode        | 菜单显示模式（'toolbar'-工具栏模式 / 'bubble'-气泡模式）              | ^[str]                      | 'toolbar'  |
| placeholder | 编辑器为空时显示的占位内容                                           | ^[str]                      | ""         |
| toolbar     | 工具栏配置（true/false 开关或详细配置列表）                           | ^[bool] or ^[list]          | True       |
| value       | 组件当前的HTML输出内容                                               | ^[str]                      | ""         |

* 'toolbar'模式下显示顶部工具栏菜单
* 'bubble'模式下显示浮动上下文菜单

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当文本内容变化时触发的事件 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()

text_editor = pn.widgets.TextEditor(name='Text Editor', value='# Hello World\n\nThis is a **markdown** editor!')
pn.Row(text_editor.controls(jslink=True), text_editor) 
```
