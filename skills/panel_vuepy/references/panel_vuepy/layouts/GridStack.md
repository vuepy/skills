---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# GridStack 可拖拽网格

GridStack布局允许将多个Panel对象排列在网格中，并支持用户拖拽和调整单元格大小。

底层实现为`panel.layout.GridStack`，参数基本一致，参考文档：https://panel.holoviz.org/reference/layouts/GridStack.html

## 基本用法

GridStack可以创建可拖拽和调整大小的网格布局：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnGridStack :height="300" :width='300'>
    <PnGridStackItem :row_start="0" :row_end="3" :col_start="0" :col_end="1">
      <PnSpacer style="background: red" />
    </PnGridStackItem>
    
    <PnGridStackItem :row_start="0" :row_end="1" :col_start="1" :col_end="3">
      <PnSpacer style="background: green" />
    </PnGridStackItem>
    
    <PnGridStackItem :row_start="1" :row_end="2" :col_start="2" :col_end="4">
      <PnSpacer style="background: orange" />
    </PnGridStackItem>
    
    <PnGridStackItem :row_start="2" :row_end="3" :col_start="1" :col_end="4">
      <PnSpacer style="background: blue" />
    </PnGridStackItem>
    
    <PnGridStackItem :row_start="0" :row_end="1" :col_start="3" :col_end="4">
      <PnSpacer style="background: purple" />
    </PnGridStackItem>
  </PnGridStack>
</template>
```

## 响应式网格

通过设置合适的响应式布局参数，GridStack可以适应不同的屏幕尺寸：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnGridStack :width='600' :height='400'>
    <PnGridStackItem :row_start="0" :row_end="1" :col_start="0" :col_end="3">
      <PnSpacer style="background: #FF0000" />
    </PnGridStackItem>
    
    <PnGridStackItem :row_start="1" :row_end="3" :col_start="0" :col_end="1">
      <PnSpacer style="background: #0000FF" />
    </PnGridStackItem>

    <!--
    <PnGridStackItem :row_start="1" :row_end="3" :col_start="1" :col_end="3">
      <PnDisplay :obj="fig" />
    </PnGridStackItem>
    
    <PnGridStackItem :row_start="3" :row_end="5" :col_start="0" :col_end="1">
      <PnDisplay :obj="hv.Curve([1, 2, 3])" />
    </PnGridStackItem>
    -->

    <PnGridStackItem :row_start="3" :row_end="5" :col_start="2" :col_end="3">
      <PnColumn>
        <PnFloatSlider />
        <PnColorPicker />
      </PnColumn>
    </PnGridStackItem>
  </PnGridStack>
</template>
```

## 禁用拖拽或调整大小

可以通过设置`allow_drag`和`allow_resize`参数来控制是否允许拖拽和调整大小：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnCol>
    <PnMarkdown>
      ### 禁用拖拽和调整大小
    </PnMarkdown>
    <PnGridStack :allow_drag="False" :allow_resize="False" :height="200" :width="200">
      <PnGridStackItem :row_start="0" :row_end="1" :col_start="0" :col_end="1">
        <PnCard title="Card 1">Fixed position and size</PnCard>
      </PnGridStackItem>
      <PnGridStackItem :row_start="0" :row_end="1" :col_start="1" :col_end="2">
        <PnCard title="Card 2">Fixed position and size</PnCard>
      </PnGridStackItem>
    </PnGridStack>

    <PnMarkdown>
      ### 只允许拖拽，不允许调整大小
    </PnMarkdown>
    <PnGridStack :allow_drag="True" :allow_resize="False" :height="200" :width="200">
      <PnGridStackItem :row_start="0" :row_end="1" :col_start="0" :col_end="1">
        <PnCard title="Card 1">Can drag but not resize</PnCard>
      </PnGridStackItem>
      <PnGridStackItem :row_start="0" :row_end="1" :col_start="1" :col_end="2">
        <PnCard title="Card 2">Can drag but not resize</PnCard>
      </PnGridStackItem>
    </PnGridStack>
    
    <PnMarkdown>
      ### 只允许调整大小，不允许拖拽
    </PnMarkdown>
    <PnGridStack :allow_drag="False" :allow_resize="True" :height="200" :width="200">
      <PnGridStackItem :row_start="0" :row_end="1" :col_start="0" :col_end="1">
        <PnCard title="Card 1">Can resize but not drag</PnCard>
      </PnGridStackItem>
      <PnGridStackItem :row_start="0" :row_end="1" :col_start="1" :col_end="2">
        <PnCard title="Card 2">Can resize but not drag</PnCard>
      </PnGridStackItem>
    </PnGridStack>
  </PnCol>
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## GridStack API

### 属性

| 属性名        | 说明                                       | 类型                | 默认值  |
|--------------|-------------------------------------------|---------------------|--------|
| allow_resize | 是否允许调整网格单元格大小                   | ^[Boolean]          | True   |
| allow_drag   | 是否允许拖动网格单元格                       | ^[Boolean]          | True   |
| ncols        | 固定列数                                    | ^[Number]           | 3     |
| nrows        | 固定行数                                    | ^[Number]           | 5      |
| mode         | 重叠分配时的行为模式（warn、error、override） | ^[String]           | warn   |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当网格内容改变时触发   | ^[Callable]`(event: dict) -> None` |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | GridStack的内容，通过PnGridStackItem组件包裹 |

## GridStackItem API

### 属性

| 属性名        | 说明                             | 类型    | 默认值  |
|--------------|-------------------------------------------|---------------------|--------|
| row_start    | 开始行的索引                      | ^[Number]           | 0 |
| row_end      | 结束行的索引，开区间               | ^[Number]           | `row_start+1` |
| col_start    | 开始列的索引                      | ^[Number]           | 0 |
| col_end      | 结束列的索引，开区间               | ^[Number]           | `col_start+1` |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 默认内容 |

## Controls

```python
##controls
import panel as pn

from panel.layout.gridstack import GridStack

pn.extension('gridstack')

gstack = GridStack(sizing_mode='stretch_both', min_height=300)

gstack[ : , 0: 3] = pn.Spacer(styles=dict(background='red'))
gstack[0:2, 3: 9] = pn.Spacer(styles=dict(background='green'))
gstack[2:4, 6:12] = pn.Spacer(styles=dict(background='orange'))
gstack[4:6, 3:12] = pn.Spacer(styles=dict(background='blue'))
gstack[0:2, 9:12] = pn.Spacer(styles=dict(background='purple'))

pn.Column(gstack, gstack.controls())
```
