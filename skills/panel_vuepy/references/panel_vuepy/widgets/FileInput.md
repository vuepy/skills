---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# FileInput 文件输入框

文件输入框组件允许用户上传一个或多个文件，支持拖放或点击选择文件。上传的文件可以作为字节字符串获取，也可以自动转换为其他格式。

底层实现为`panel.widgets.FileInput`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/FileInput.html

## 基本用法

基本的文件输入框使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFileInput name="上传文件" @change="on_change" />
</template>
<script lang='py'>
from vuepy import ref

def on_change(event):
    print(event) # Event(what='value', name='value', 
                 #  obj=FileInput(name='上传文件', value=b'hello\n'), 
                 #  cls=FileInput(name='上传文件', value=b'hello\n'), 
                 #  old=None, new=b'hello\n', type='changed')
</script>
```

## 多文件上传

可以通过设置`multiple=True`支持多文件上传：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFileInput name="上传多个文件" :multiple="True" @change="on_change" />
</template>
<script lang='py'>
from vuepy import ref

def on_change(event):
    print(event) # Event(what='value', name='value', 
                 #  obj=FileInput(filename=['a.txt'], mime_type=['text/plain'], multiple=True, name='上传多个文件', value=[b'hello\n', b'hello\n']),
                 #  cls=FileInput(filename=['a.txt'], mime_type=['text/plain'], multiple=True, name='上传多个文件', value=[b'hello\n', b'hello\n']), 
                 #  old=None, new=[b'hello\n', b'hello\n'], type='changed')
</script>
```

## 接受特定文件类型

可以通过`accept`参数限制可接受的文件类型：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFileInput name="上传图片" 
              accept=".jpg,.jpeg,.png,.gif" 
              @change="on_change" />
  <PnFileInput name="上传PDF" 
              accept=".pdf" 
              @change="on_change_pdf" />
</template>
<script lang='py'>
from vuepy import ref

def on_change(event):
    print(event)
        
def on_change_pdf(event):
    print(event)
</script>
```

## API

### 属性

| 属性名       | 说明                  | 类型      | 默认值    |
| ----------- | -------------------- | --------- | --------- |
| accept      | 接受的文件MIME类型或扩展名 | ^[str]     | ""       |
| multiple    | 是否允许多文件上传     | ^[bool]   | False     |
| filename    | 上传文件的文件名       | ^[str]    | ""        |
| value       | 上传文件的内容         | ^[bytes\|str] | b""    |
| mime_type   | 上传文件的MIME类型     | ^[str]    | ""        |
| decode      | 是否自动解码为文本     | ^[bool]   | False     |
| disabled    | 是否禁用组件          | ^[bool]   | False     |
| name        | 组件标题             | ^[str]    | ""        |
| description | 鼠标悬停时显示的描述   | ^[str]    | ""        |

### Events

| 事件名  | 说明                | 类型                          |
| ------ | ------------------ | ----------------------------- |
| change | 当文件上传时触发的事件 | ^[Callable]`(event) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()

file_input = pn.widgets.FileInput(name='File Input')
pn.Row(file_input.controls, file_input)
```
