---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Player 播放器

播放器组件是一个用于循环播放数值范围的工具，可用于动画或步进通过数据。它提供了播放、暂停、步进和循环控制。

底层实现为`panel.widgets.Player`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/Player.html

## 基本用法

基本的播放器使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol :height='150'>
  <PnPlayer name="Player" 
           :start="0" 
           :end="10" 
           :step="1"
           v-model='current_value.value'/>
 </PnCol>
 <p>value: {{ current_value.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

current_value = ref(0)

</script>
```

## 设置循环和间隔

可以设置播放器是否循环以及播放间隔：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol :height=150>
  <PnPlayer name="Player" 
           :start="0" 
           :end="10" 
           :step="1"
           loop_policy='loop'
           :interval="1000" />
  </PnCol>
</template>
```

## 设置显示模式

可以设置播放器的显示模式，如只显示按钮或者同时显示值等：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol style='height:140px;'>
  <PnPlayer name="Player" 
           :start="0" 
           :end="10" 
           :step="1"
           show_value
           :visible_buttons="['previous', 'play', 'pause', 'next']" />
 </PnCol>
</template>
```

## API

### 属性

| 属性名               | 说明                                                                 | 类型                          | 默认值      |
|---------------------|--------------------------------------------------------------------|-----------------------------|------------|
| value/v-model               | 当前整数值                                                          | ^[int]                      | 0          |
| direction           | 当前播放方向 (-1: 倒放, 0: 暂停, 1: 正放)                           | ^[int]                      | 0          |
| interval            | 更新间隔时间（毫秒）                                                 | ^[int]                      | 500        |
| loop_policy         | 循环策略 ('once': 一次, 'loop': 循环, 'reflect': 反射)              | ^[str]                      | 'once'     |
| start               | 数值范围下限                                                        | ^[int]                      | 0          |
| end                 | 数值范围上限                                                        | ^[int]                      | 100        |
| step                | 数值变化步长                                                        | ^[int]                      | 1          |
| value_throttled     | 鼠标释放前的节流当前值（使用滑块选择时）                              | ^[int]                      | 0          |
| disabled            | 是否禁用控件                                                        | ^[bool]                     | False      |
| name                | 控件标题                                                           | ^[str]                      | ""         |
| scale_buttons       | 按钮缩放比例                                                        | ^[float]                    | 1.0        |
| show_loop_controls  | 是否显示循环策略切换选项                                             | ^[bool]                     | True       |
| show_value          | 是否显示当前值                                                      | ^[bool]                     | True       |
| value_align         | 数值显示位置 ('start': 左, 'center': 中, 'end': 右)                 | ^[str]                      | 'center'   |
| visible_buttons     | 可见按钮列表 ('slower','first','previous',...,'faster')             | ^[list[str]]                | all        |
| visible_loop_options| 可见循环选项 ('once', 'loop', 'reflect')                            | ^[list[str]]                | all        |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当当前值变化时触发的事件 | ^[Callable]`(event: dict) -> None` |

### 方法

| 方法名 | 说明 | 类型 |
| ----- | ---- | ---- |
| pause | 暂停播放 | ^[Callable]`() -> None` |
| play  | 开始播放 | ^[Callable]`() -> None` |
| reverse | 反向播放 | ^[Callable]`() -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()

player = pn.widgets.Player(name='Player', start=0, end=10, step=1)
pn.Column(player, player.controls(jslink=True))
```
