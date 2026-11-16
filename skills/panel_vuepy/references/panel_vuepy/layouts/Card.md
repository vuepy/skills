---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Card 卡片

卡片组件提供了一个可折叠的容器，带有标题栏，用于组织和展示内容。

底层实现为`panel.layout.Card`，参数基本一致，参考文档：https://panel.holoviz.org/reference/layouts/Card.html

## 基本用法

卡片可以包含任意内容，并可以设置标题。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCard title="Card" style="background: WhiteSmoke">
    <PnTextInput name="Text:" />
    <PnFloatSlider name="Slider" />
  </PnCard>
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## 折叠控制

卡片可以通过`collapsible`和`collapsed`属性来控制是否可折叠以及初始状态是否折叠。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol>
    <PnCard title="Collapsible (Default)" >
      <PnTextInput placeholder="This card can be collapsed" />
    </PnCard>
    
    <PnCard title='Initially Collapsed' 
            collapsible collapsed >
      <PnTextInput placeholder="This card is initially collapsed" />
    </PnCard>
    
    <PnCard title="Not Collapsible" :collapsible="False">
      <PnTextInput placeholder="This card cannot be collapsed" />
    </PnCard>
  </PnCol>
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## 自定义头部

卡片可以使用自定义的头部，而不仅仅是标题文本。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnCard header_background="#2f2f2f" header_color="white" :width="300">
    <template #header>
      <PnButton name='header' :height="50" />
    </template>
    <PnButton name='content1' :height="50" />
    <PnButton name='content2' :height="50" />
  </PnCard>
</template>
<script lang='py'>
from vuepy import ref

</script>
```

## 隐藏头部

可以通过`hide_header`属性完全隐藏卡片的头部。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCard hide_header :width="160" style="background: lightgray">
    <PnNumber :value="42" :default_color="'white'" name="Completion" format="{value}%" />
  </PnCard>
</template>
```

## 布局控制

可以设置卡片的固定尺寸，或者让它根据内容自适应。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnCol>
    <!-- fixed size -->
    <PnCard title="Fixed Size" :height="300" :width="200">
      <PnButton name='fixed' sizing_mode="stretch_both" />
    </PnCard>
    
    <!-- Responsive -->
    <PnCard title='Responsive' sizing_mode='stretch_width'>
      <!--<PnDisplay :obj="p1" />-->
      <PnButton name='responsive' sizing_mode="stretch_both" />
      <PnDivider />
      <!--<PnDisplay :obj="p2" />-->
    </PnCard>
  </PnCol>
</template>
<script lang='py'>
from vuepy import ref
from bokeh.plotting import figure

p1 = figure(height=250, sizing_mode='stretch_width', margin=5)
p2 = figure(height=250, sizing_mode='stretch_width', margin=5)

p1.line([1, 2, 3], [1, 2, 3])
p2.scatter([1, 2, 3], [1, 2, 3])
</script>
```

## API

### 属性

| 属性名                   | 说明                                    | 类型                | 默认值  |
|------------------------|----------------------------------------|---------------------|--------|
| title                  | 卡片标题                                 | ^[String]           | —      |
| collapsed              | 是否折叠                                 | ^[Boolean]          | False  |
| collapsible            | 是否可折叠                               | ^[Boolean]          | False  |
| hide_header            | 是否隐藏头部                             | ^[Boolean]          | False  |
| active_header_background | 展开卡片时的标题背景颜色                 | ^[String]           | —      |
| header_background      | 标题背景颜色                             | ^[String]           | —      |
| header_color           | 标题文本颜色                             | ^[String]           | —      |
| background             | 内容区域背景颜色                         | ^[String]           | —      |
| button_css_classes     | 应用于折叠按钮的CSS类列表                 | ^[Array]            | —      |
| css_classes            | 应用于主区域的CSS类列表                   | ^[Array]            | —      |
| header_css_classes     | 应用于头部的CSS类列表                     | ^[Array]            | —      |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当卡片折叠状态改变时触发  | ^[Callable]`(event: dict) -> None` |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 卡片内容            |
| header  | 自定义卡片头部       |
| footer  | 自定义卡片底部       |

## Controls

```python
##controls
import panel as pn
pn.extension()

w1 = pn.widgets.TextInput(name='Text:')
w2 = pn.widgets.FloatSlider(name='Slider')

card = pn.Card(title='Card', styles={'background': 'WhiteSmoke'})
pn.Row(card.controls(jslink=False), card)
```
