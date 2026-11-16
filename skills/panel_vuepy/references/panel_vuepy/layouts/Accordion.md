---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Accordion 折叠面板

折叠面板将内容区域组织进多个折叠面板，通过点击面板的标题可以展开或收缩内容。

底层实现为`panel.layout.Accordion`，参数基本一致，参考文档：https://panel.holoviz.org/reference/layouts/Accordion.html

## 基本用法

折叠面板可以包含任意数量的子项，每个子项可以包含任意内容。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnAccordion v-model="active.value" @change='on_change'>
    <PnAccordionItem name="Scatter Plot">
      <!--<PnDisplay :obj="p1" />-->
      <PnButton name='accordion item1'/>
    </PnAccordionItem>
    <PnAccordionItem name="Line Plot">
      <!--<PnDisplay :obj="p2" />-->
      <PnButton name='accordion item2'/>
    </PnAccordionItem>
    <PnAccordionItem name="Square Plot">
      <!--<PnDisplay :obj="p3" />-->
      <PnButton name='accordion item3'/>
    </PnAccordionItem>
  </PnAccordion>
  <p>active: {{ active.value }} </p>
</template>
<script lang='py'>
from vuepy import ref
from bokeh.plotting import figure

# Create sample figures
p1 = figure(width=300, height=300, margin=5)
p1.scatter([0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 2, 1, 0])

p2 = figure(width=300, height=300, margin=5)
p2.line([0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 2, 1, 0])

p3 = figure(width=300, height=300, margin=5)
p3.scatter([0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 2, 1, 0], marker='square', size=10)

# Define active panels (can be multiple when toggle is False)
active = ref([0, 2])

def on_change(event):
    print(event.new)
</script>
```

## 切换模式

当`toggle`属性设置为`True`时，同一时间只能展开一个面板。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnAccordion :toggle="True" v-model="active.value" @change='on_change'>
    <PnAccordionItem name="Panel 1">
      <PnButton name='Panel1'/>
    </PnAccordionItem>

    <PnAccordionItem name="Panel 2">
      <PnButton name='Panel2'/>
    </PnAccordionItem>

    <PnAccordionItem name="Panel 3">
      <PnButton name='Panel3'/>
    </PnAccordionItem>
  </PnAccordion>
  <p>active: {{ active.value }} </p>
</template>
<script lang='py'>
from vuepy import ref

# When toggle=True, only one panel can be active
active = ref([0])

def on_change(event):
    print(event.new)
</script>
```

## Accordion API

### 属性

| 属性名                   | 说明                                    | 类型                | 默认值  |
|------------------------|----------------------------------------|---------------------|--------|
| v-model                | 当前激活的面板索引列表                     | ^[Array]            | []     |
| toggle                 | 是否在面板之间切换，只激活一个面板           | ^[Boolean]          | True   |
| scroll                 | 启用滚动条                               | ^[Boolean]          | False  |
| active_header_background | 展开面板时的标题背景颜色                  | ^[String]           | —      |
| header_color           | 标题文本颜色                             | ^[String]           | —      |
| header_background      | 标题背景颜色                             | ^[String]           | —      |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当激活的面板改变时触发  | ^[Callable]`(event: dict) -> None` |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 折叠面板内容，应该是 PnAccordionItem 组件 |

### 方法

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| append | 添加面板 | ^[Callable]`(any) -> None` |
| insert | 插入面板 | ^[Callable]`(idx: int, any) -> None` |
| remove | 移除面板 | ^[Callable]`(idx: int) -> any` |

## Accordion Item API

### 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| name | 面板标题 | ^[str]                                                       | —       |

### Slots

| 插槽名   | 说明               | 
| ---     | ---               |
| default | 自定义默认内容      |

## Controls

```python
##controls
import panel as pn
pn.extension()

from bokeh.plotting import figure

p1 = figure(width=300, height=300, name='Scatter', margin=5)
p1.scatter([0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 2, 1, 0])

p2 = figure(width=300, height=300, name='Line', margin=5)
p2.line([0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 2, 1, 0])

accordion = pn.Accordion(('Scatter', p1), p2)
accordion

p3 = figure(width=300, height=300, name='Square', margin=5)
p3.scatter([0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 2, 1, 0], marker='square', size=10)

accordion.append(p3)
accordion

pn.Row(accordion.controls(jslink=False), accordion)
```
