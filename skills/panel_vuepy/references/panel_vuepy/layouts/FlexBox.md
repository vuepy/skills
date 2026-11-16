---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# FlexBox 弹性布局

FlexBox是一种基于CSS Flexbox的列表式布局组件，提供了灵活的内容排列方式，可以自动换行和调整元素布局。

底层实现为`panel.layout.FlexBox`，参数基本一致，参考文档：https://panel.holoviz.org/reference/layouts/FlexBox.html

## 基本用法

默认情况下，FlexBox使用`direction='row'`和`flex_wrap='wrap'`，使得元素按行排列并在必要时换行：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFlexBox>
    <PnHTML v-for="i in range(10)" 
            :object="str(i)" 
            :style="f'background: {rcolor()}; width:100px;height:100px'" 
    />
  </PnFlexBox>
</template>
<script lang='py'>
from vuepy import ref
import random

random.seed(7)

def rcolor():
    return "#%06x" % random.randint(0, 0xFFFFFF)
    
</script>
```

## 列式布局

可以通过设置`flex_direction='column'`让FlexBox按列排列元素：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnFlexBox flex_direction="column" :height='450'>
    <PnHTML v-for="i in range(10)" 
            :object="str(i)" 
            :style="f'background: {rcolor()}; width:100px;height:100px'" 
    />
  </PnFlexBox>
</template>
<script lang='py'>
from vuepy import ref
import random

random.seed(9)

def rcolor():
    return "#%06x" % random.randint(0, 0xFFFFFF)
</script>
```

## 元素对齐方式

可以通过`align_content`、`align_items`和`justify_content`控制元素如何在容器中对齐和分布：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
    <PnCol>
      <PnMarkdown>
       ##### justify_content: space-between
      </PnMarkdown>
      <PnFlexBox justify_content="space-between" style='background: #f5f5f5'>
         <PnHTML v-for="i in range(3)" 
            :object="str(i)" 
            :style="f'background: {rcolor()}; width:100px;height:100px'" 
         />
      </PnFlexBox>
    </PnCol>
    
    <PnCol>
      <PnMarkdown>
       ##### align_items: center
      </PnMarkdown>
      <PnFlexBox align_items="center" align_content="center" style='background: #f5f5f5'>
         <PnHTML v-for="i in range(3)" 
            :object="str(i)" 
            :style="f'background: {rcolor()}; width:100px;height:100px'" 
         />
      </PnFlexBox>
    </PnCol>
</template>
<script lang='py'>
from vuepy import ref
import random

def rcolor():
    return "#%06x" % random.randint(0, 0xFFFFFF)
</script>
```

## API

### 属性

| 属性名                | 说明                                       | 类型                | 默认值  |
|---------------------|-------------------------------------------|---------------------|--------|
| direction           | 主轴方向，决定了flex项目放置的方向            | ^[String]           | row   |
| flex_direction      | 与direction相同，为了兼容性保留                | ^[String]           | row   |
| align_content       | 当交叉轴有多余空间时，如何分配行之间的空间      | ^[String]           | —      |
| align_items         | 定义项目在交叉轴上如何对齐                    | ^[String]           | —      |
| flex_wrap           | 是否允许换行及如何换行                       | ^[String]           | wrap   |
| gap                 | 定义flex项目之间的间距                       | ^[String]           | —      |
| justify_content     | 定义项目在主轴上的对齐方式                    | ^[String]           | —      |
| scroll              | 是否启用滚动条                              | ^[Boolean]          | False  |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当布局内容改变时触发   | ^[Callable]`(event: dict) -> None` |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | FlexBox的内容      |

## Controls

```python
##controls
import panel as pn
pn.extension()

import random

rcolor = lambda: "#%06x" % random.randint(0, 0xFFFFFF)

box = pn.FlexBox(
    *[pn.pane.HTML(str(i), styles=dict(background=rcolor()), width=100, height=100) 
      for i in range(3)])
box

column_box = box.clone(flex_direction='column', height=450)
column_box

# column_box.clone(align_content='space-evenly')

# color = pn.pane.HTML(str(5), styles=dict(background=rcolor()), width=100, height=100)
# column_box[5] = color

pn.Row(column_box.controls(), column_box)
```
