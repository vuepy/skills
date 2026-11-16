---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Alert 警告

警告组件用于提供针对典型用户操作的上下文反馈消息，具有多种可用且灵活的警告消息样式。

底层实现为`panel.pane.Alert`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/Alert.html

## 基本用法

`PnAlert` 支持 Markdown 和 HTML 语法：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnAlert>
## Alert
This is a warning!
  </PnAlert>
</template>
```

## 不同类型

`PnAlert` 组件有多种 `alert_type` 选项，用于控制警告消息的颜色：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol sizing_mode='stretch_width' >
    <PnAlert :alert_type='alert_type' v-for='alert_type in alert_types'>
    {{ message.replace('{alert_type}', alert_type) }}
    </PnAlert>
  </PnCol>
</template>
<script lang='py'>
alert_types = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
message = "This is a **{alert_type}** alert with [an example link](https://panel.holoviz.org/). Give it a click if you like."
</script>
```

## 长文本消息

它也可以用于较长的消息：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnAlert alert_type="success">{{ long_text }}</PnAlert>
</template>
<script lang='py'>
long_text = """
### Well done!

Aww yeah, you successfully read this important alert message. 
This example text is going to run a bit longer so that you 
can see how spacing within an alert works with this kind of content.

---

Did you notice the use of the divider?
"""
</script>
```

## API

### 属性

| 属性名      | 说明                 | 类型                                                           | 默认值 |
| ---------- | ------------------- | ---------------------------------------------------------------| ------- |
| alert_type | 警告类型             | ^[str] `'primary'`, `'secondary'`, `'success'`, `'danger'`, `'warning'`, `'info'`, `'light'`, `'dark'` | 'primary' |
| sizing_mode | 尺寸调整模式         | ^[str]                                                         | 'fixed'  |
| width      | 宽度                 | ^[int, str]                                                    | None    |
| height     | 高度                 | ^[int, str]                                                    | None    |
| min_width  | 最小宽度             | ^[int]                                                         | None    |
| min_height | 最小高度             | ^[int]                                                         | None    |
| max_width  | 最大宽度             | ^[int]                                                         | None    |
| max_height | 最大高度             | ^[int]                                                         | None    |
| margin     | 外边距               | ^[int, tuple]                                                  | 5       |
| css_classes | CSS类名列表          | ^[list]                                                        | []      |

## Controls

```python
##controls
import panel as pn
pn.extension()

a = pn.pane.Alert("test", alert_type="success")
pn.Row(a.controls, a)
```
