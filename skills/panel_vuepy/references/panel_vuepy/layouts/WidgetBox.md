---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# WidgetBox 组件容器

用于分组小部件的垂直容器，具有默认样式。

底层实现为`panel.WidgetBox`，参数基本一致，参考文档：https://panel.holoviz.org/reference/layouts/WidgetBox.html

## 基本用法

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnWidgetBox>
    <PnTextInput name="Text:" />
    <PnIntSlider name="Slider" />
  </PnWidgetBox>
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## API

### 属性

| 属性名     | 说明                                                                 | 类型           | 默认值   |
|----------|--------------------------------------------------------------------|--------------|--------|
| objects  | 组件框内显示的对象列表（通常应整体替换而非直接修改）                       | ^[list]      | []     |
| disabled | 是否禁用组件框内的所有控件                                               | ^[bool]      | False  |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
|       |                      |                                        |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | Custom content     |

### 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |

```python
##controls
import panel as pn
pn.extension()

w2 = pn.widgets.FloatSlider(name='Slider')

box = pn.WidgetBox('WidgetBox', w2)
box

pn.Row(box.controls(jslink=False), box)
```
