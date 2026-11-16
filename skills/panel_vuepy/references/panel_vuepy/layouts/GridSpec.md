---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# GridSpec 网格规格

GridSpec布局是一种类似数组的布局，允许使用简单的API将多个Panel对象排列在网格中，可以将对象分配到单个网格单元或网格跨度。

底层实现为`panel.layout.GridSpec`，参数基本一致，参考文档：https://panel.holoviz.org/reference/layouts/GridSpec.html

## 基本用法

GridSpec可以创建固定大小的网格布局，并通过GridSpecItem放置组件：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnGridSpec :width="400" :height="300">
  <PnGridSpecItem :row_start="0" :row_end="3" :col_start="0" :col_end="1">
    <PnSpacer style="background: red" />
  </PnGridSpecItem>
  
  <PnGridSpecItem :row_start="0" :row_end="1" :col_start="1" :col_end="3">
    <PnSpacer style="background: green" />
  </PnGridSpecItem>
  
  <PnGridSpecItem :row_start="1" :row_end="2" :col_start="2" :col_end="4">
    <PnSpacer style="background: orange" />
  </PnGridSpecItem>
  
  <PnGridSpecItem :row_start="2" :row_end="3" :col_start="1" :col_end="4">
    <PnSpacer style="background: blue" />
  </PnGridSpecItem>
  
  <PnGridSpecItem :row_start="0" :row_end="1" :col_start="3" :col_end="4">
    <PnSpacer style="background: purple" />
  </PnGridSpecItem>
</PnGridSpec>
</template>
```

## 响应式网格

除了固定大小的网格外，GridSpec还支持响应式尺寸，可以在浏览器窗口调整大小时动态调整：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnGridSpec sizing_mode="stretch_both" :max_height="800">
  <PnGridSpecItem :row_start="0" :row_end="3" :col_start="0" :col_end="1">
    <PnSpacer style="background: red" />
  </PnGridSpecItem>
  
  <PnGridSpecItem :row_start="0" :row_end="1" :col_start="1" :col_end="3">
    <PnSpacer style="background: green" />
  </PnGridSpecItem>
  
  <PnGridSpecItem :row_start="1" :row_end="2" :col_start="2" :col_end="4">
      <PnButton name='xxx' />
  </PnGridSpecItem>
  
  <PnGridSpecItem :row_start="2" :row_end="3" :col_start="1" :col_end="4">
      <PnButton name='yyy' />
  </PnGridSpecItem>
  
  <PnGridSpecItem :row_start="0" :row_end="1" :col_start="3" :col_end="4">
    <PnSpacer style="background: purple" />
  </PnGridSpecItem>
</PnGridSpec>
</template>
```

## 复杂布局示例

使用GridSpec可以创建复杂的仪表板布局：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnGridSpec sizing_mode="stretch_both" :height="600">
    <!-- 标题区 -->
    <PnGridSpecItem :row_start="0" :row_end="1" :col_start="0" :col_end="6">
      <PnMarkdown style="background: #e0e0e0; padding: 10px; text-align: center">
        # Dashboard Title
      </PnMarkdown>
    </PnGridSpecItem>
    
    <!-- 左侧控制面板 -->
    <PnGridSpecItem :row_start="1" :row_end="4" :col_start="0" :col_end="1">
      <PnCard title="Controls">
        <PnSelect :options="['Option 1', 'Option 2', 'Option 3']" name="Select" />
        <PnDatePicker name="Date" />
        <PnButton name="Update" />
      </PnCard>
    </PnGridSpecItem>
    
    <!-- 主图表区域 -->
    <PnGridSpecItem :row_start="1" :row_end="3" :col_start="1" :col_end="5">
      <PnCard title="Main Chart">
        <PnDisplay :obj="main_fig" />
      </PnCard>
    </PnGridSpecItem>
    
    <!-- 右侧信息区 -->
    <PnGridSpecItem :row_start="1" :row_end="2" :col_start="5" :col_end="6">
      <PnCard title="Statistics">
        <PnMarkdown>
          - Value 1: 42
          - Value 2: 73
          - Average: 57.5
        </PnMarkdown>
      </PnCard>
    </PnGridSpecItem>
    
    <!-- 底部小图表区域 -->
    <PnGridSpecItem :row_start="3" :row_end="4" :col_start="1" :col_end="3">
      <PnCard title="Information">
        <PnMarkdown>
          This is additional information about the dashboard.
          You can include any relevant details here.
        </PnMarkdown>
      </PnCard>
    </PnGridSpecItem>
  </PnGridSpec>
</template>
<script lang='py'>
from vuepy import ref
from bokeh.plotting import figure
import numpy as np

# 创建主图表
main_fig = figure(height=240)
x = np.linspace(0, 10, 5)
y = np.sin(x)
main_fig.line(x, y, line_width=2)

</script>
```

## GridSpec API

### 属性

| 属性名   | 说明                                       | 类型                | 默认值  |
|---------|-------------------------------------------|---------------------|--------|
| ncols   | 限制可分配的列数                           | ^[Number]           | 3      |
| nrows   | 限制可分配的行数                           | ^[Number]           | 3      |
| mode    | 重叠分配时的行为模式（warn、error、override） | ^[String]           | warn   |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当网格内容改变时触发   | ^[Callable]`(event: dict) -> None` |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | GridSpec的内容，应该是PnGridSpecItem组件 |

## GridSpecItem API

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
pn.extension()

gspec = pn.GridSpec(width=200, height=300)

gspec[:,   0  ] = pn.Spacer(styles=dict(background='red'))
gspec[0,   1:3] = pn.Spacer(styles=dict(background='green'))
gspec[1,   2:4] = pn.Spacer(styles=dict(background='orange'))
gspec[2,   1:4] = pn.Spacer(styles=dict(background='blue'))
gspec[0:1, 3:4] = pn.Spacer(styles=dict(background='purple'))

pn.Row(gspec.controls(jslink=False), gspec)
```
