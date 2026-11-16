---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# FileSelector 文件选择器

文件选择器组件提供了一个用于在服务器端文件系统中选择文件或目录的界面。

底层实现为`panel.widgets.FileSelector`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/FileSelector.html

## 基本用法

基本的文件选择器使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFileSelector name="选择文件"
                  directory="/Users/test"
                 @change="on_change" />
  <p>当前选择: {{ selected_file.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

selected_file = ref("未选择")

def on_change(event):
    selected_file.value = event.new
</script>
```

## 显示隐藏文件

可以控制是否显示隐藏文件：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFileSelector name="显示隐藏文件"
                  directory="/Users/test"
                  show_hidden />
</template>
```

## 文件过滤

可以通过正则表达式过滤文件：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFileSelector name="只显示Python文件"
                  directory="/Users/test"
                  file_pattern="*.txt" />
</template>
```

## 远程文件系统

利用 [fsspec](https://filesystem-spec.readthedocs.io/en/latest/) 的强大功能，我们可以连接到远程文件系统。在下面的示例中，我们使用 s3fs 包连接到远程 S3 服务器。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnFileSelector :fs='fs'
                  directory="s3://datasets.holoviz.org" />
</template>
<script lang='py'>
import s3fs

fs = s3fs.S3FileSystem(anon=True)
</script>
```

## API

### 属性

| 属性名                   | 说明                 | 类型                                             | 默认值 |
| ----------------------- | ------------------- | ------------------------------------------------ | ------- |
| directory               | 当前浏览的目录       | ^[str]                                           | None    |
| fs | 文件系统 | ^[AbstractFileSystem]                                           | None    |
| file_pattern            | 用于过滤文件的正则表达式 | ^[str]                                         | None    |
| only_files | 是否只允许选择文件    | ^[bool]                                          | False   |
| root_directory          | 文件选择器的根目录     | ^[str]                                           | None    |
| show_hidden             | 是否显示隐藏文件      | ^[bool]                                          | False   |
| value                   | 当前选中的文件或目录   | ^[str\|list] 多选为list，单选为str              | None    |
| disabled                | 是否禁用组件          | ^[bool]                                          | False   |
| name                    | 组件标题              | ^[str]                                           | ""      |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当选择变化时触发的事件 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()
import panel as pn
pn.extension()
files = pn.widgets.FileSelector('/User/test')

pn.Column(files, files.controls(jslink=False))
```
