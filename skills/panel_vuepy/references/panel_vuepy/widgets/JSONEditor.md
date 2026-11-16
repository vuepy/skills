---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# JSONEditor JSON编辑器

JSONEditor组件提供了一个可视化编辑器，用于编辑JSON可序列化的数据结构，如Python字典和列表，具有不同编辑模式、插入对象和使用JSON Schema进行验证的功能。

底层实现为`panel.widgets.JSONEditor`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/JSONEditor.html

## 基本用法

JSON编辑器提供了一个直观的界面来查看和编辑JSON数据。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnJSONEditor 
    :width="400"
    v-model="json_data.value"
    @change="on_change"
    ref='e'
  />
  <p> {{ json_data.value }} </p>
</template>
<script lang='py'>
# import panel as pn
# pn.extension('ace', 'jsoneditor')
from vuepy import ref, onMounted
import os

e = ref(None)
# os.environ['PANEL_NPM_CDN'] = 'https://cdn.jsdelivr.net/npm'
# print('cdn', os.environ.get('PANEL_NPM_CDN'))

json_data = ref({
    'dict'  : {'key': 'value'},
    'float' : 3.14,
    'int'   : 1,
    'list'  : [1, 2, 3],
    'string': 'A string',
})

@onMounted
def on():
    # print(type(e.value.unwrap()._widget_type))
    pass

def on_change(event):
    print(event.new)
</script>
```

## 编辑模式

JSON编辑器有多种模式，提供不同的查看和编辑`JSONEditor.value`的方式。注意，要启用对`mode='code'`的支持，必须使用`pn.extension('ace')`加载ace编辑器。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnCol>
    <PnStaticText value="tree 树形模式" />
    <PnJSONEditor :value="json_data" mode='tree' :width='300' />
  </PnCol>
  
  <PnCol>
    <PnStaticText value="form 表单模式" />
    <PnJSONEditor :value="json_data" mode='form' :width="300" />
  </PnCol>
 
  <PnCol>
    <PnStaticText value="text 文本模式" />
    <PnJSONEditor :value="json_data" mode='text' :width="300" />
  </PnCol>
  
  <PnCol>
    <PnStaticText value="preview 预览模式" />
    <PnJSONEditor :value="json_data" mode='preview' :width="300" />
  </PnCol>
  
  <PnCol>
    <PnStaticText value="view 查看模式" />
    <PnJSONEditor :value="json_data" mode='view' :width="300" />
  </PnCol>
</template>
<script lang='py'>
import panel as pn
from vuepy import ref

json_data = {
    'dict'  : {'key': 'value'},
    'float' : 3.14,
    'int'   : 1,
    'list'  : [1, 2, 3],
    'string': 'A string',
}
</script>
```

## 验证

JSONEditor通过提供JSON Schema可以对`value`进行验证。JSON Schema描述了JSON对象必须具有的结构，如必需的属性或值必须具有的类型。更多信息请参见 http://json-schema.org/。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnJSONEditor 
    :schema="schema" 
    :value="person_data"
    :height="500"
    :width="400"
  />
</template>
<script lang='py'>
import panel as pn
from vuepy import ref

# 需要初始化jsoneditor扩展
pn.extension('ace', 'jsoneditor')

schema = {
    "title": "Person",
    "type": "object",
    "properties": {
        "firstName": {
            "type": "string",
            "description": "The person's first name."
        },
        "lastName": {
            "type": "string",
            "description": "The person's last name."
        },
        "age": {
            "description": "Age in years which must be equal to or greater than zero.",
            "type": "integer",
            "minimum": 0
        }
    }
}

person_data = {
    'firstName': 2,  # 这将引发验证错误，因为应该是字符串
    'lastName': 'Smith',
    'age': 13.5  # 这将引发验证错误，因为应该是整数
}
</script>
```

## API

### 属性

| 属性名        | 说明                                                                 | 类型                          | 默认值  |
|-------------|--------------------------------------------------------------------|-----------------------------|--------|
| disabled    | 是否禁用编辑器（等同于设置 mode='view'）                               | ^[bool]                     | False  |
| menu        | 是否显示主菜单栏（包含格式、排序、转换、搜索等功能）                        | ^[bool]                     | True   |
| mode        | 编辑器模式：'view'(只读)、'form'(仅值可修改)、'tree'(树)、'text'(纯文本)、'preview'(预览大文件) | ^[str]                      | 'tree' |
| search      | 是否在右上角显示搜索框（仅在 tree/view/form 模式下可用）                   | ^[bool]                     | True   |
| schema      | 用于验证JSON数据的JSON模式（定义必需属性和值类型等）                       | ^[dict]                     | None   |
| value       | 当前可编辑的JSON数据结构                                               | ^[str]                      | ""     |

### Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| change | 当JSON数据改变时触发 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn
import param

pn.extension('ace', 'jsoneditor')

json_editor = pn.widgets.JSONEditor(value={
    'dict'  : {'key': 'value'},
    'float' : 3.14,
    'int'   : 1,
    'list'  : [1, 2, 3],
    'string': 'A string',
}, width=400)

pn.Column(json_editor, json_editor.controls(jslink=True))
```
