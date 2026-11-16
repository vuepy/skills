---
outline: deep
titleTemplate: :title | IPywUI
---

# File Upload 文件上传

将任何类型的文件上传到 `kernel` 内存中。

## 基础用法

`v-model/value` 包含上传文件的属性，这是一个元组，其中包含每个上传文件的字典。例如：

```python
# once a file is uploaded, use the `.value` attribute to retrieve the content:
(
  {
    'name': 'example.txt',
    'type': 'text/plain',
    'size': 36,
    'last_modified': datetime.datetime(2020, 1, 9, 15, 58, 43, 321000, tzinfo=datetime.timezone.utc), 
    'content': <memory at 0x10c1b37c8>
  },
)
```

上传文件的内容在 content 键的值中。它们是 [memory view](https://docs.python.org/3/library/stdtypes.html#memory-views)。  

您可以将内容提取为字节：  

```python
content.tobytes()
#=> b'This is the content of example.txt.\n'
```

如果文件是文本文件，则可以通过解码来获取字符串形式的内容：

```python
import codecs
codecs.decode(content, encoding="utf-8")
#=> 'This is the content of example.txt.\n'
```

您可以将上传的文件从内核保存到文件系统：  

```python
with open("./saved-output.txt", "wb") as fp:
    fp.write(uploaded_file.content)
```

要将上传的文件转换为 Pandas 数据帧，您可以使用 BytesIO 对象：

```python
import io
import pandas as pd
pd.read_csv(io.BytesIO(uploaded_file.content))
```

```vue
<template>
  <FileUpload v-model="files.value" accept=".txt"></FileUpload>
  <Input label="file info"
         :value="upload_file.value"
         type="textarea"
         style="height: 200px"
  ></Input>
</template>

<script src="./basic_setup.py"></script>
<script setup>
import FileUpload from "../../../src/ipywui/components/FileUpload";
import Input from "../../../src/ipywui/components/Input";
</script>
```

```python
# ./basic_setup.py

import codecs
import json

from vuepy import computed
from vuepy import ref

def setup(props, ctx, vm):
    files = ref([])

    def get_first_file():
        file_info = {}
        if files.value:
            file_info = files.value[0]
            content = file_info['content']
            file_info['content'] = codecs.decode(content, encoding='utf-8')
            file_info['last_modified'] = str(file_info['last_modified'])

        return json.dumps(file_info, indent=2)

    upload_file = computed(get_first_file)

    return locals()
```

## API

### 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 绑定值，上传的文件列表信息 | ^[list]                                                         | —       |
| accept | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) | ^[str]                                                         | '' |
| multiple | 是否支持多选文件	 | ^[bool]                                                         | -      |

### 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
