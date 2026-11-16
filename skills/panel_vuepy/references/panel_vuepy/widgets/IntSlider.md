---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# IntSlider 整数滑块

整数滑块组件允许使用滑块在设定的范围内选择整数值。

底层实现为`panel.widgets.IntSlider`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/IntSlider.html

## 基本用法

基本的整数滑块，可以通过滑动选择整数值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnIntSlider name="整数滑块" 
              :start="0" 
              :end="8" 
              :step="2" 
              :value="4" 
              v-model="value.value"/>
</template>
<script lang='py'>
from vuepy import ref

value = ref(4)
</script>
```

## 自定义格式

可以使用自定义格式字符串或Bokeh TickFormatter来格式化滑块值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnIntSlider name="计数" 
               :format="tick_formatter" 
               :start="0" 
               :end="100" 
               :value="42" />
</template>
<script lang='py'>
from vuepy import ref
from bokeh.models.formatters import PrintfTickFormatter

tick_formatter = PrintfTickFormatter(format='%d 只鸭子')
</script>
```

## 垂直方向

滑块可以设置为垂直方向显示：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnIntSlider name="垂直滑块" 
               orientation="vertical" 
               :start="0" 
               :end="100" 
               :value="50"
               :height="200" />
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## API

### 属性

| 属性名          | 说明                           | 类型                                | 默认值     |
| -------------- | ------------------------------ | ---------------------------------- | --------- |
| start          | 范围的下限                     | ^[int]                             | 0         |
| end            | 范围的上限                     | ^[int]                             | 1         |
| step           | 值之间的间隔                    | ^[int]                             | 1         |
| value          | 所选值，整数类型                | ^[int]                             | 0         |
| value_throttled| 鼠标释放前阻止的所选值，整数类型  | ^[int]                             | 0         |
| bar_color      | 滑块条的颜色，十六进制RGB值      | ^[str]                             | None      |
| direction      | 滑块方向，从左到右('ltr')或从右到左('rtl') | ^[str]                    | 'ltr'     |
| disabled       | 是否禁用                       | ^[bool]                            | False     |
| format         | 应用于滑块值的格式化器           | ^[str\|bokeh.models.TickFormatter] | None      |
| name           | 组件标题                       | ^[str]                             | ""        |
| orientation    | 滑块的显示方向，'horizontal'或'vertical' | ^[str]                    | 'horizontal' |
| tooltips       | 是否在滑块手柄上显示工具提示      | ^[bool]                           | True      |

### Events

| 事件名         | 说明                       | 类型                                   |
| ------------- | -------------------------- | -------------------------------------- |
| change        | 当值更改时触发的事件         | ^[Callable]`(event: dict) -> None`    |

## Controls

```python
##controls
import panel as pn
pn.extension()

int_slider = pn.widgets.IntSlider(name='Integer Slider', start=0, end=8, step=2, value=4)
pn.Row(int_slider.controls(jslink=True), int_slider)
```
