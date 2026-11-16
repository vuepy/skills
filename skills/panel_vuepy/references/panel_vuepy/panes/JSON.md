---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# JSON 数据

`PnJson` 组件允许在面板中渲染任意 JSON 字符串、字典和其他 JSON 可序列化对象。

底层实现为`panel.pane.JSON`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/JSON.html

## 基本用法

`PnJSON` 组件可用于渲染任意 JSON 对象的树视图，这些对象可以定义为字符串或 JSON 可序列化的 Python 对象。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnJson :object="json_obj" name="JSON" />
</template>
<script lang='py'>
json_obj = {
    'boolean': False,
    'dict': {'a': 1, 'b': 2, 'c': 3},
    'int': 1,
    'float': 3.1,
    'list': [1, 2, 3],
    'null': None,
    'string': '一个字符串',
}
</script>
```

## 控制选项

`PnJson` 组件公开了许多可以从 Python 和 Javascript 更改的选项。尝试交互式地体验这些参数的效果：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnCol>
      <PnCheckbox v-model="hover_preview.value" name="悬停预览" />
      <PnIntSlider v-model="depth.value" name='展开深度' :start="-1" :end="5" />
      <PnRadioButtonGroup v-model="theme.value" :options="['light', 'dark']" name="主题" />
    </PnCol>
    <PnCol>
      <PnJson 
        :object="json_obj" 
        :hover_preview="hover_preview.value" 
        :depth="depth.value"
        :theme="theme.value" />
    </PnCol>
  </PnRow>
</template>
<script lang='py'>
from vuepy import ref

json_obj = {
    'boolean': False,
    'dict': {
        'a': 1, 
        'b': 2, 
        'c': 3,
        'nested': {
            'd': 4,
            'e': 5,
            'f': {
                'g': 6,
                'h': 7
            }
        }
    },
    'int': 1,
    'float': 3.1,
    'list': [1, 2, 3],
    'null': None,
    'string': '一个字符串',
}

hover_preview = ref(True)
depth = ref(1)
theme = ref('light')
</script>
```

## API

### 属性

| 属性名         | 说明                          | 类型                                                           | 默认值 |
| ------------- | ----------------------------- | ---------------------------------------------------------------| ------- |
| object        | JSON 字符串或 JSON 可序列化对象 | ^[str, object]                                                | None |
| depth         | 初始化时 JSON 结构展开的深度（`depth=-1` 表示完全展开） | ^[int]                              | 1 |
| hover_preview | 是否为折叠节点启用悬停预览      | ^[boolean]                                                    | True |
| theme         | 如果未提供值，则默认为由 pn.config.theme 设置的当前主题，如 JSON.THEME_CONFIGURATION 字典中所指定。如果未在那里定义，则回退到默认参数值（'light'）。 | ^[string] | 'light' |
| sizing_mode   | 尺寸调整模式                   | ^[str]                                                         | 'fixed'  |
| width         | 宽度                          | ^[int, str]                                                    | None    |
| height        | 高度                          | ^[int, str]                                                    | None    |
| min_width     | 最小宽度                      | ^[int]                                                         | None    |
| min_height    | 最小高度                      | ^[int]                                                         | None    |
| max_width     | 最大宽度                      | ^[int]                                                         | None    |
| max_height    | 最大高度                      | ^[int]                                                         | None    |
| margin        | 外边距                        | ^[int, tuple]                                                  | 5       |
| css_classes   | CSS类名列表                   | ^[list]                                                        | []      |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

## Controls

```python
##controls
import panel as pn
import json
pn.extension()

json_obj = {
    'boolean': False,
    'dict': {'a': 1, 'b': 2, 'c': 3},
    'int': 1,
    'float': 3.1,
    'list': [1, 2, 3],
    'null': None,
    'string': 'A string',
}

json_pane = pn.pane.JSON(json_obj, name='JSON')
pn.Row(json_pane.controls, json_pane)
```
