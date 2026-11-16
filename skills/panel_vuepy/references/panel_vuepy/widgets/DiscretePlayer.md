---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# DiscretePlayer 离散播放器

离散播放器组件是一个用于循环播放一系列离散值的工具，可用于动画或步进通过数据集。与标准`Player`组件不同，它使用离散的选项值，而不是连续的数值范围。

底层实现为`panel.widgets.DiscretePlayer`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/DiscretePlayer.html

## 基本用法

基本的离散播放器使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol style='height:140px;'>
  <PnDiscretePlayer name="月份播放器" 
                  :options="months" 
                  @change="on_change" />
 </PnCol>
  <p>当前月份: {{ current_month.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

months = ['一月', '二月', '三月', '四月', '五月', '六月', 
         '七月', '八月', '九月', '十月', '十一月', '十二月']
current_month = ref("未选择")

def on_change(event):
    current_month.value = event.new
</script>
```

## 设置循环和间隔

可以设置播放器是否循环以及播放间隔(毫秒）：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol style='height:140px;'>
  <PnDiscretePlayer name="慢速播放" 
                  :options="months"
                  :interval="1000" />
 </PnCol>
 <PnCol style='height:140px;'>
  <PnDiscretePlayer name="不循环播放" 
                  :options="months"
                  loop_policy="once" />
 </PnCol>
</template>
<script lang='py'>
from vuepy import ref

months = ['一月', '二月', '三月', '四月', '五月', '六月', 
         '七月', '八月', '九月', '十月', '十一月', '十二月']
</script>
```

## 使用字典选项

可以使用字典作为选项，其中键是显示的标签，值是实际的数据值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <p>当前季度代码: {{ current_quarter.value }}</p>
 <PnCol style='height:140px;'>
  <PnDiscretePlayer name="季度播放器" 
                  :options="quarters"
                  @change="on_change" />
 </PnCol>
</template>
<script lang='py'>
from vuepy import ref

quarters = {'第一季度': 'Q1', '第二季度': 'Q2', '第三季度': 'Q3', '第四季度': 'Q4'}
current_quarter = ref("未选择")

def on_change(event):
    current_quarter.value = event.new
</script>
```

## 设置显示模式

可以设置播放器的显示模式，如只显示按钮或者同时显示值等：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol style='height:140px;'>
  <PnDiscretePlayer name="只显示按钮" 
                  :options="months"
                  :visible_buttons="['previous', 'play', 'pause', 'next']" />
 </PnCol>
</template>
<script lang='py'>
from vuepy import ref

months = ['一月', '二月', '三月', '四月', '五月', '六月', 
         '七月', '八月', '九月', '十月', '十一月', '十二月']
</script>
```

## API

### 属性

| 属性名                | 说明                                                                 | 类型                                                | 默认值      |
|----------------------|--------------------------------------------------------------------|---------------------------------------------------|------------|
| direction            | 当前播放方向 (-1: 倒放, 0: 暂停, 1: 正放)                           | ^[int]                                            | 0          |
| interval             | 更新间隔时间（毫秒）                                                 | ^[int]                                            | -          |
| loop_policy          | 循环策略 ('once', 'loop', 或 'reflect')                             | ^[str]                                            | 'once'     |
| options              | 可选项列表或字典                                                     | ^[list] or ^[dict]                                | []         |
| value                | 当前值（必须是options中的值之一）                                    | ^[object]                                         | None       |
| value_throttled      | 鼠标抬起前的节流当前值（当使用滑块选择时）                            | ^[object]                                         | None       |
| disabled             | 是否禁用控件                                                        | ^[bool]                                           | False      |
| name                 | 控件标题                                                           | ^[str]                                            | ""         |
| scale_buttons        | 按钮缩放比例                                                        | ^[float]                                          | 1.0        |
| show_loop_controls   | 是否显示循环策略切换的单选按钮                                       | ^[bool]                                           | True       |
| show_value           | 是否显示播放器的当前值                                               | ^[bool]                                           | True       |
| value_align          | 数值显示位置 ('start', 'center', 'end')                             | ^[str]                                            | 'center'   |
| visible_buttons      | 要显示的按钮列表 (‘slower’, ‘first’, ‘previous’, ‘reverse’, ‘pause’, ‘play’, ‘next’, ‘last’, ‘faster’) | ^[list[str]]                                      | all        |
| visible_loop_options | 要显示的循环选项 ('once', 'loop', 'reflect')                        | ^[list[str]]                                      | all        |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当当前值变化时触发的事件 | ^[Callable]`(event: dict) -> None` |

### 方法

| 方法名 | 说明 | 类型 |
| ----- | ---- | ---- |
| pause | 暂停播放 | ^[Callable]`() -> None` |
| play  | 开始播放 | ^[Callable]`() -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()

months = ['January', 'February', 'March', 'April', 'May', 'June', 
          'July', 'August', 'September', 'October', 'November', 'December']
player = pn.widgets.DiscretePlayer(options=months, name='Month')
pn.Column(player, player.controls(jslink=True)) 
```
