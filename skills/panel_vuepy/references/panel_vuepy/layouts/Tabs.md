---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Tabs 标签页

标签页组件，允许用户通过点击标签头在多个对象之间切换。标签页的标题可以显式定义，也可以从内容对象的 `name` 参数中推断。`PnTabs` 提供了类似列表的 API，支持 `append`、`extend`、`clear`、`insert`、`pop` 和 `remove` 等方法，可以动态更新和修改标签页。

底层实现为`panel.Tabs`，参数基本一致，参考文档：https://panel.holoviz.org/reference/layouts/Tabs.html

## 基本用法

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabs v-model="active.value" @change='on_change'>
    <PnTabPane name="Scatter Plot">
      <PnDisplay :obj="p1" />
    </PnTabPane>
    <PnTabPane name="Line Plot">
      <PnDisplay :obj="p2" />
    </PnTabPane>
  </PnTabs>
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

# Define active panels (can be multiple when toggle is False)
active = ref(0)

def on_change(event):
    print(event.new) # 1
</script>
```

## 动态添加标签页

==Todo==

## 动态渲染

启用 dynamic 选项后，仅当前活动的标签页会被渲染，只有当切换到新标签页时才会加载其内容。这对于服务器环境或笔记本环境中显示大量标签页，或当单个组件渲染体量极大/渲染成本极高时尤为有用。但需注意：在没有实时服务器的情况下，非活动标签页的内容将不会被加载。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabs dynamic>
    <PnTabPane name="Scatter Plot">
      <PnDisplay :obj="p1" />
    </PnTabPane>
    <PnTabPane name="Line Plot">
      <PnDisplay :obj="p2" />
    </PnTabPane>
  </PnTabs>
</template>
<script lang='py'>
from vuepy import ref
from bokeh.plotting import figure

# Create sample figures
p1 = figure(width=300, height=300, margin=5)
p1.scatter([0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 2, 1, 0])

p2 = figure(width=300, height=300, margin=5)
p2.line([0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 2, 1, 0])
</script>
```

## 可关闭标签页

设置 closable 为 True 后，标签页会显示关闭按钮：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabs closable>
    <PnTabPane name="Red">
      <PnSpacer style="background: red; width: 100px; height: 100px" />
    </PnTabPane>
    <PnTabPane name="Blue">
      <PnSpacer style="background: blue; width: 100px; height: 100px" />
    </PnTabPane>
  </PnTabs>
</template>
```

## 标签位置

通过 tabs_location 参数可以调整标签头的位置：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabs tabs_location="above">
    <PnTabPane name="Above1">
      <PnButton name='xxx' />
    </PnTabPane>
    <PnTabPane name="Above2">
      <PnButton name='yyy' />
    </PnTabPane>
  </PnTabs>
  <PnDivider/>
  <PnTabs tabs_location="right">
    <PnTabPane name="Right1">
      <PnButton name='xxx' />
    </PnTabPane>
    <PnTabPane name="Right2">
      <PnButton name='yyy' />
    </PnTabPane>
  </PnTabs>
</template>
```

## Tabs API

### 属性

| 属性名         | 说明                                                                 | 类型                          | 默认值        |
|--------------|--------------------------------------------------------------------|-----------------------------|--------------|
| active       | 当前选中标签页的索引（可通过选择标签页或编程方式更新）                     | ^[int]                      | 0            |
| dynamic      | 是否仅动态加载当前活动标签页的内容                                       | ^[bool]                     | False        |
| closable     | 是否允许通过界面关闭标签页（关闭后将从对象列表中删除）                      | ^[bool]                     | False        |
| objects      | 标签页内显示的对象列表（通常应整体替换而非直接修改）                       | ^[list]                     | []           |
| tabs_location| 标签位置（'left'-左侧, 'right'-右侧, 'below'-下方, 'above'-上方）       | ^[str]                      | 'above'      |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
|       |                      |                                        |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | Tab panels         |

### 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |

## TabPane API

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

tabs = pn.Tabs(
    ('red', pn.Spacer(styles=dict(background='red'), width=100, height=100)),
    ('blue', pn.Spacer(styles=dict(background='blue'), width=100, height=100)),
    ('green', pn.Spacer(styles=dict(background='green'), width=100, height=100)),
    closable=True
)
tabs

pn.Row(tabs.controls(jslink=False), tabs)
```
