---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Column 垂直布局

Column组件允许在垂直容器中排列多个组件。

底层实现为`panel.layout.Column`，参数基本一致，参考文档：https://panel.holoviz.org/reference/layouts/Column.html

## 基本用法

Column组件可以垂直排列多个元素。

`Col`是`Column`的同名组件。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol style="background: WhiteSmoke">
    <PnTextInput name="Text:" />
    <PnFloatSlider name="Slider" />
    <PnSelect :options="['A', 'B', 'C']" />
  </PnCol>
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## 固定尺寸

可以给Column设置固定的宽度和高度，内部元素会根据布局模式进行调整。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnColumn :height="300" :width="200">
    <PnSpacer style="background: red" sizing_mode="stretch_both" />
    <PnSpacer style="background: green" sizing_mode="stretch_both" />
    <PnSpacer style="background: blue" sizing_mode="stretch_both" />
  </PnColumn>
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## 自适应宽度

当没有指定固定尺寸时，Column会根据其内容的大小自动调整。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnColumn>
    <PnSpacer style="background: red; " />
    <PnSpacer style="background: green" sizing_mode="stretch_both" />
    <PnDisplay :obj="p1" />
    <PnDisplay :obj="p2" />
  </PnColumn>
</template>
<script lang='py'>
from vuepy import ref
from bokeh.plotting import figure

p1 = figure(height=150, sizing_mode='stretch_width')
p2 = figure(height=150, sizing_mode='stretch_width')

p1.line([1, 2, 3], [1, 2, 3])
p2.scatter([1, 2, 3], [1, 2, 3])
</script>
```

## 启用滚动条

当内容超出容器大小时，可以启用滚动条。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnColumn scroll :height="420">
    <PnSpacer style="background: red" :width="200" :height="200" />
    <PnSpacer style="background: green" :width="200" :height="200" />
    <PnSpacer style="background: blue" :width="200" :height="200" />
  </PnColumn>
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## API

### 属性

| 属性名                 | 说明                                       | 类型                | 默认值  |
|----------------------|-------------------------------------------|---------------------|--------|
| scroll               | 是否启用滚动条                              | ^[Boolean]          | False  |
| scroll_position      | 当前滚动位置                                | ^[Number]           | —      |
| auto_scroll_limit    | 自动滚动激活的最大像素距离                   | ^[Number]           | —      |
| scroll_button_threshold | 显示滚动按钮的最小像素距离                | ^[Number]           | —      |
| view_latest          | 初始化时是否滚动到最新对象                   | ^[Boolean]          | False  |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当布局内容改变时触发   | ^[Callable]`(event: dict) -> None` |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | Column的内容       |

### 方法

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| scroll_to | 滚动到指定索引的对象 | ^[Function]`(index: int) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()

w2 = pn.widgets.FloatSlider(name='Slider')
column = pn.Column(w2, styles={'background': 'WhiteSmoke'})

pn.Row(column.controls(jslink=False), column)
```
