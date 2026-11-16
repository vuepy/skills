---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# FileDropper 文件拖放上传器

FileDropper组件允许用户将一个或多个文件上传到服务器。它基于[FilePond](https://pqina.nl/filepond/)库构建，如果您广泛使用此组件，请考虑向他们捐款。FileDropper类似于FileInput组件，但增加了对分块上传的支持，使上传大文件成为可能。UI还支持图像文件的预览。与FileInput不同，上传的文件存储为以文件名为索引的字节对象字典。

底层实现为`panel.widgets.FileDropper`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/FileDropper.html

## 基本用法

FileDropper提供了一个拖放区域，允许用户通过拖放或点击选择上传文件。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnFileDropper 
    v-model="uploaded_files.value"
    @change="on_change"
  />
  <PnStaticText :value="f'上传的文件: {list(uploaded_files.value.keys())}'" />
</template>
<script lang='py'>
from vuepy import ref

uploaded_files = ref({})

def on_change(event):
    print(f"{event}") # Event(what='value', name='value', 
                      #  obj=FileDropper(mime_type={'a.txt': 'text/plain'}, value={'a.txt': 'hello\n'}), 
                      #  cls=FileDropper(mime_type={'a.txt': 'text/plain'}, value={'a.txt': 'hello\n'}), 
                      #  old={'a.txt': 'hello\n'}, new={'a.txt': 'hello\n'},
</script>
```

## 文件类型限制

通过`accepted_filetypes`参数可以限制用户可以选择的文件类型。这包括一个也允许通配符的mime类型列表。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnCol>
    <PnStaticText value="只允许上传PNG和JPEG图片" />
    <PnFileDropper 
      :accepted_filetypes="['.png', 'image/jpeg']"
    />
    
    <PnStaticText value="允许上传所有图片" />
    <PnFileDropper 
      :accepted_filetypes="['image/*']"
    />
  </PnCol>
</template>
```

## 多文件上传

通过设置`multiple=True`可以允许上传多个文件。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnFileDropper 
    multiple
    v-model="multiple_files.value"
  />
  <PnStaticText :value="f'上传的文件数量: {len(multiple_files.value)}'" />
</template>
<script lang='py'>
from vuepy import ref

multiple_files = ref({})
</script>
```

## 布局选项

FileDropper支持几种不同的布局选项：
- `"compact"`: 移除边距
- `"integrated"`: 移除背景和其他样式，当组件嵌入到更大的组件中时很有用
- `"circle"`: 圆形上传区域，适用于个人资料图片上传

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnCol>
    <PnFileDropper layout="compact" />
    <PnFileDropper 
      layout="integrated" 
      style="background-color: black; border-radius: 1em; color: white" 
    />
    <PnFileDropper layout="circle" />
  </PnCol>
</template>
```

## 上传大小限制

与FileInput组件不同，FileDropper组件通过分块上传绕过了网络浏览器、Bokeh、Tornado、笔记本等对最大文件大小的限制。这使得上传比以前可能的大得多的文件变得可行。默认的`chunk_size`是10MB（表示为10000000字节）。您可以配置`max_file_size`、`max_total_file_size`（如果设置了`multiple=True`，则限制总上传大小）和`max_files`，以提供对可上传数据量的上限。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnCol>
    <PnStaticText value="限制单个文件大小为1MB" />
    <PnFileDropper 
      max_file_size="1MB"
      v-model="limited_size.value"
    />
    
    <PnStaticText value="限制最多上传3个文件，总大小不超过5MB" />
    <PnFileDropper 
      :multiple="True"
      :max_files="3"
      max_total_file_size="5MB"
      v-model="limited_total.value"
    />
  </PnCol>
</template>
<script lang='py'>
from vuepy import ref

limited_size = ref({})
limited_total = ref({})
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| accepted_filetypes | 接受的文件类型列表 | ^[list] | [] |
| chunk_size | 每个分块通过WebSocket传输的大小（以字节为单位） | ^[int] | 10000000 |
| layout | 布局模式 | ^[string] | None |
| max_file_size | 文件的最大大小（以KB或MB为单位的字符串表示） | ^[string] | — |
| max_files | 如果`multiple=True`，可以上传的最大文件数 | ^[int] | — |
| max_total_file_size | 所有上传文件的最大大小（以KB或MB为单位的字符串表示） | ^[string] | — |
| mime_type | 包含上传文件的mime类型的字典，以文件名为索引 | ^[dict[str, str]] | — |
| multiple | 是否允许上传多个文件 | ^[boolean] | false |
| value | 包含上传文件的字典，以文件名为索引 | ^[dict[str, str \| bytes]] | {} |

### Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| change | 当上传文件改变时触发 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn
import io
pn.extension('filedropper')

file_dropper = pn.widgets.FileDropper()

pn.Row(file_dropper.controls(jslink=True), file_dropper)
```
