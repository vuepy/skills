---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# GridBox 网格布局

GridBox是一种列表式布局，将对象按照指定的行数和列数包装成网格。

底层实现为`panel.layout.GridBox`，参数基本一致，参考文档：https://panel.holoviz.org/reference/layouts/GridBox.html

## 基本用法

GridBox可以将元素按指定的列数排列，自动换行形成网格：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnGridBox :ncols="4">
    <PnHTML v-for="i in range(8)"
            :object='str(i)'
            :style="f'background: {rcolor()};width:50px;height:50px;'" 
    />
  </PnGridBox>
</template>
<script lang='py'>
from vuepy import ref
import random

random.seed(9)
def rcolor():
    return "#%06x" % random.randint(0, 0xFFFFFF)
</script>
```

## 动态调整列数

可以动态地调整GridBox的列数，从而改变网格的排列：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnColumn>
    <PnRow>
      <PnButton name="2" @click="ncols(2)" />
      <PnButton name="4" @click="ncols(4)" />
    </PnRow>
    <PnGridBox :ncols="columns.value">
        <PnHTML v-for="i in range(8)"
                :object='str(i)'
                :style="f'background: {rcolor()};width:50px;height:50px;'" 
        />
    </PnGridBox>
  </PnColumn>
</template>
<script lang='py'>
from vuepy import ref
import random

random.seed(7)
columns = ref(2)

def ncols(n):
    columns.value = n

def rcolor():
    return "#%06x" % random.randint(0, 0xFFFFFF)
</script>
```

## 按行数排列

除了指定列数，也可以使用`nrows`指定行数：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnGridBox :nrows="4">
    <PnHTML v-for="i in range(8)"
            :object='str(i)'
            :style="f'background: {rcolor()};width:50px;height:50px;'" 
    />
  </PnGridBox>
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

| 属性名   | 说明        | 类型        | 默认值  |
|---------|------------|-------------|--------|
| ncols   | 列数        | ^[Number]   | —      |
| nrows   | 行数        | ^[Number]   | —      |
| scroll  | 是否启用滚动条 | ^[Boolean] | False  |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当布局内容改变时触发   | ^[Callable]`(event: dict) -> None` |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | GridBox的内容      |

## Controls

```python
##controls
import panel as pn
pn.extension()

import random

rcolor = lambda: "#%06x" % random.randint(0, 0xFFFFFF)

box = pn.GridBox(
    *[pn.pane.HTML(styles=dict(background=rcolor()), width=50, height=50) 
      for i in range(8)],
    ncols=6)
box

color = pn.pane.HTML(styles=dict(background=rcolor()), width=50, height=50)
box[5] = color

box.ncols = 2

pn.Row(box.controls(jslink=False), box)
```
