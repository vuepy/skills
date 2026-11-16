---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Row 行容器

Row 允许在水平容器中排列多个组件。它拥有类似列表的 API，包含 append 、 extend 、 clear 、 insert 、 pop 、 remove 和 __setitem__ 方法，从而可以交互式地更新和修改布局

底层实现为`panel.Row`，参数基本一致，参考文档：https://panel.holoviz.org/reference/layouts/Row.html

## 基本用法

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnTextInput name="Text:" />
    <PnIntSlider name="Slider" />
  </PnRow>
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## API

### 属性

| 属性名    | 说明                 | 类型   | 默认值 |
| -------- | ------------------- | ------ | ------ |
| objects  | List of child nodes  | list   | —      |
| scroll   | Enable scrollbars    | bool   | False  |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | Custom content     |

## Controls

```python
##controls
import panel as pn
pn.extension()

w1 = pn.widgets.TextInput(name='Text:')
w2 = pn.widgets.FloatSlider(name='Slider')

row = pn.Row('# Row', w1, w2, styles=dict(background='WhiteSmoke'))
row

w3 = pn.widgets.Select(options=['A', 'B', 'C'], name='Select')
row.append(w3)
row

pn.Row(
    pn.Spacer(styles=dict(background='red'),   sizing_mode='stretch_both'),
    pn.Spacer(styles=dict(background='green'), sizing_mode='stretch_both'),
    pn.Spacer(styles=dict(background='blue'),  sizing_mode='stretch_both'),
    height=200, width=600
)

from bokeh.plotting import figure

p1 = figure(height=200, sizing_mode='stretch_width')
p2 = figure(height=200, sizing_mode='stretch_width')

p1.line([1, 2, 3], [1, 2, 3])
p2.scatter([1, 2, 3], [1, 2, 3])

r = pn.Row(p1, p2)
pn.Row(r.controls(jslink=False), r)
```
