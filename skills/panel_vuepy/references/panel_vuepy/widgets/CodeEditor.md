---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# CodeEditor 代码编辑器

代码编辑器组件允许嵌入基于[Ace](https://ace.c9.io/)的代码编辑器。

目前仅启用了Ace功能的一小部分：
- 多种语言的**语法高亮**
- **主题**
- 通过`ctrl+space`的基本**自动完成**支持（仅使用代码的静态分析）
- **注释**
- **只读**模式

底层实现为`panel.widgets.CodeEditor`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/CodeEditor.html

## 基本用法

基本的代码编辑器，可以编辑和高亮显示代码：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCodeEditor v-model="code.value" 
               sizing_mode="stretch_width" 
               language="python" 
               :height="200"
               @change="on_change" />
  <div>当前代码长度: {{ len(code.value) }} 字符</div>
</template>
<script lang='py'>
from vuepy import ref

initial_code = """import sys
import math

def calculate_distance(x, y):
    return math.sqrt(x**2 + y**2)

print(calculate_distance(3, 4))  # 输出：5.0
"""
code = ref(initial_code)

def on_change(event):
    print(f"代码已更新，新长度: {len(code.value)}")
</script>
```

## 延迟更新

默认情况下，代码编辑器会在每次按键时更新`value`，但可以设置`on_keyup=False`，使其仅在编辑器失去焦点或按下`<Ctrl+Enter>`/`<Cmd+Enter>`时更新`value`：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCodeEditor v-model="code.value" 
               :on_keyup="False"
               language="python" 
               @change="on_change" />
  <PnButton @click="show_code()">显示当前代码</PnButton>
</template>
<script lang='py'>
from vuepy import ref

initial_code = "# 按Ctrl+Enter/Cmd+Enter或点击外部提交更改\nimport sys\n"
code = ref(initial_code)

def on_change(event):
    print("代码已更新（失去焦点或按下Ctrl+Enter/Cmd+Enter）")
    
def show_code():
    print(f"当前代码:\n{code.value}")
</script>
```

## 语言和主题

可以更改编辑器的语言和主题：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnSelect name="语言" 
              :options="languages"
              v-model="selected_language.value" />
    <PnSelect name="主题" 
              :options="themes"
              v-model="selected_theme.value" />
  </PnRow>
  <PnCodeEditor :value="sample_code" 
               :language="selected_language.value"
               :theme="selected_theme.value"
               :height="300" :width="400"/>
</template>
<script lang='py'>
from vuepy import ref

languages = ['python', 'html', 'javascript', 'css', 'sql']
themes = ['chrome', 'monokai', 'twilight', 'tomorrow_night', 'github']

selected_language = ref('html')
selected_theme = ref('chrome')

sample_code = r"""<!DOCTYPE html>
<html>
    <head>
        <title>示例页面</title>
    </head>
    <body>
        <h1>标题1</h1>
        <h2>标题2</h2>
        <p>段落</p>
    </body>
</html>
"""
</script>
```

## 注释和只读模式

可以为编辑器添加注释，并设置为只读模式：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCodeEditor :value="py_code" 
               :annotations="annotations"
               :readonly="True"
               language="python"
               :height="200" />
</template>
<script lang='py'>
from vuepy import ref

py_code = """import math

# 这里有一个错误
x = math.cos(x)**2 + math.cos(y)**2

# 这里有一个警告
for i in range(10)
    print(i)
"""

annotations = [
    dict(row=3, column=0, text='未定义变量 x 和 y', type='error'),
    dict(row=6, column=17, text='缺少冒号', type='warning')
]
</script>
```

## 通过文件名自动检测语言

如果设置了`filename`属性，编辑器会根据文件扩展名自动检测语言：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnSelect name="文件" 
            :options="files"
            v-model="selected_file.value" />
  <PnCodeEditor :value="file_contents[selected_file.value]"
                :filename="selected_file.value"
                :height="200" />
</template>
<script lang='py'>
from vuepy import ref

files = ['test.py', 'test.html', 'test.js', 'test.css']
file_contents = {
    'test.py': "def hello():\n    print('Hello World')\n\nhello()",
    'test.html': "<html>\n  <body>\n    <h1>Hello World</h1>\n  </body>\n</html>",
    'test.js': "function hello() {\n  console.log('Hello World');\n}\n\nhello();",
    'test.css': "body {\n  background-color: #f0f0f0;\n  color: #333;\n}",
}

selected_file = ref('test.py')
</script>
```

## API

### 属性

| 属性名          | 说明                           | 类型                                | 默认值     |
| -------------- | ------------------------------ | ---------------------------------- | --------- |
| annotations    | 注释列表，每个注释是一个包含'row'、'column'、'text'和'type'键的字典 | ^[list]    | []        |
| filename       | 文件名，如果提供，将使用文件扩展名来确定语言 | ^[str]                     | ""        |
| indent         | 默认缩进的空格数                | ^[int]                             | 4         |
| language       | 用于代码语法高亮的语言字符串      | ^[str]                             | 'text'    |
| on_keyup       | 是否在每次按键时更新值或仅在失去焦点/热键时更新 | ^[bool]                | True      |
| print_margin   | 是否在编辑器中显示打印边距       | ^[bool]                            | False     |
| soft_tabs      | 是否使用空格而不是制表符进行缩进  | ^[bool]                            | True      |
| theme          | 编辑器主题                      | ^[str]                             | 'chrome'  |
| readonly       | 编辑器是否应以只读模式打开       | ^[bool]                            | False     |
| value          | 编辑器中当前代码的状态           | ^[str]                             | ""        |
| value_input    | 在每次按键时更新的当前代码状态    | ^[str]                             | ""        |

### Events

| 事件名         | 说明                       | 类型                                   |
| ------------- | -------------------------- | -------------------------------------- |
| change        | 当值更改时触发的事件         | ^[Callable]`(event: dict) -> None`    |

## Controls

```python
##controls
import panel as pn
import param
pn.extension('codeeditor')

py_code = "import sys"
widget = pn.widgets.CodeEditor(
    name='CodeEditor', value=py_code, language='python', 
    width=300, height=200)
pn.Column(
    widget, 
    widget.controls(jslink=True),
)
```
