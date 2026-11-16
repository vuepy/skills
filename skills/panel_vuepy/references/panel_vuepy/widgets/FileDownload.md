---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# FileDownload 文件下载

文件下载组件允许在前端下载文件，通过在初始化时（如果`embed=True`）或点击按钮时将文件数据发送到浏览器。

底层实现为`panel.widgets.FileDownload`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/FileDownload.html

## 基本用法

基本的文件下载组件使用，默认情况下（`auto=True`和`embed=False`）文件只在按钮被点击后才传输到浏览器：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFileDownload file="FileDownload.ipynb" 
                 filename="FileDownload.ipynb" />
</template>
```

## 嵌入文件数据

可以通过`embed`参数立即嵌入文件数据，这允许在静态导出中使用此组件：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFileDownload file="FileDownload.ipynb" 
                 filename="FileDownload.ipynb"
                 embed />
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## 手动保存

如果设置`auto=False`，文件不会在初次点击时下载，而是会在数据同步后将标签从"Transfer<文件>"更改为"Download<文件>"。这样可以在数据传输后使用"另存为"对话框下载。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFileDownload file="FileDownload.ipynb" 
                 filename="FileDownload.ipynb"
                 :auto="False"
                 button_type="success"
                 name="右键点击使用'另存为'对话框下载" />
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## 使用文件对象

文件下载组件也可以接受文件对象，例如将`pandas DataFrame`保存为`CSV`到`StringIO`对象：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFileDownload :file="file_obj" 
                 filename="data.csv"
                 embed />
</template>
<script lang='py'>
from vuepy import ref
from io import StringIO
import pandas as pd

# 创建示例数据
data = {'名称': ['张三', '李四', '王五'],
        '年龄': [28, 32, 45],
        '城市': ['北京', '上海', '广州']}
df = pd.DataFrame(data)

sio = StringIO()
df.to_csv(sio, index=False)
sio.seek(0)
file_obj = sio
</script>
```

## 动态生成文件

可以提供回调函数动态生成文件，例如根据某些小部件的参数：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFileDownload :file="filtered_file()" 
                 filename="filtered_data.csv" />
  <PnRow :height=400>
    <PnMultiChoice name="选择年份" :options="years" v-model="selected_years.value" />
    <PnRangeSlider name="里程范围" :start="min_mpg" :end="max_mpg" v-model="mpg_range.value" />
  </PnRow>
</template>
<script lang='py'>
from vuepy import ref
from io import StringIO
import pandas as pd

# 创建示例数据
years_list = [2018, 2019, 2020, 2021, 2022]
mpg_data = []
for year in years_list:
    for i in range(10):
        mpg_data.append({'年份': year, '里程': 10 + i * 5})
df = pd.DataFrame(mpg_data)

min_mpg = df['里程'].min()
max_mpg = df['里程'].max()
years = years_list

selected_years = ref([years[0]])
mpg_range = ref((min_mpg, max_mpg))

def filtered_file():
    filtered = df
    if selected_years.value:
        filtered = filtered[filtered['年份'].isin(selected_years.value)]
    filtered = filtered[(filtered['里程'] >= mpg_range.value[0]) & 
                        (filtered['里程'] <= mpg_range.value[1])]
    
    sio = StringIO()
    filtered.to_csv(sio, index=False)
    sio.seek(0)
    print('update file')
    return sio
</script>
```

## 按钮样式

可以通过设置`button_type`和`button_style`来改变文件下载按钮的外观：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnCol v-for="style in ['solid', 'outline']">
      <PnFileDownload v-for="type in button_types" 
                     :button_type="type"
                     :button_style="style"
                     file="FileDownload.ipynb" 
                     :label="type + '-' + style"
                     style="margin: 5px" />
    </PnCol>
  </PnRow>
</template>
<script lang='py'>
from vuepy import ref

button_types = ['default', 'primary', 'success', 'warning', 'light', 'danger']
</script>
```

## 图标按钮

与其他按钮一样，可以提供显式的`icon`，可以是tabler-icons.io的命名图标：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnFileDownload icon="alert-triangle-filled" 
                   button_type="warning" 
                   file="FileDownload.ipynb" />
    <PnFileDownload icon="bug" 
                   button_type="danger" 
                   file="FileDownload.ipynb" />
  </PnRow>
</template>
<script lang='py'>
from vuepy import ref
</script>
```

也可以是显式的SVG：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFileDownload  button_type="success" 
                   icon_size="2em" 
                   file="FileDownload.ipynb">
    <template #icon>
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
        <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
      </svg>
    </template>
  </PnFileDownload>
</template>
```

## API

### 属性

| 属性名        | 说明                 | 类型                                                | 默认值 |
| ------------ | ------------------- | -------------------------------------------------- | ------- |
| auto         | 是否在第一次点击时下载文件 | ^[bool]                                           | True    |
| callback     | 返回文件或类文件对象的可调用对象 | ^[callable]                                  | None    |
| embed        | 是否在初始化时嵌入数据    | ^[bool]                                           | False   |
| file         | 文件路径或类文件对象      | ^[str\|Path\|file-like]                           | None    |
| filename     | 保存文件的文件名        | ^[str]                                             | None    |
| button_style | 按钮样式              | ^[str] 'solid'或'outline'                          | 'solid' |
| button_type  | 按钮主题              | ^[str] 'default'、'primary'、'success'、'info'、'light'或'danger' | 'default' |
| icon         | 按钮左侧的图标         | ^[str] SVG字符串或tabler-icons.io图标名称           | None    |
| icon_size    | 图标大小              | ^[str] 如"12px"或"1em"                             | None    |
| label        | 下载按钮的自定义标签     | ^[str]                                             | None    |
| name         | 组件标题              | ^[str]                                             | ""      |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
|   icon      |          svg 图标         |

```python
##controls
import panel as pn
pn.extension()

file_download = pn.widgets.FileDownload(
    file='FileDownload.ipynb', filename='custom_filename.ipynb')
pn.Row(file_download.controls, file_download)
```
