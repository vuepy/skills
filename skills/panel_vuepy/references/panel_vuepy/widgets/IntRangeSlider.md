---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# IntRangeSlider 整数范围滑块

整数范围滑块组件允许使用带有两个手柄的滑块选择整数范围，与RangeSlider类似，但专门用于整数值。

底层实现为`panel.widgets.IntRangeSlider`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/IntRangeSlider.html

## 基本用法

基本的整数范围滑块使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnIntRangeSlider name="整数范围滑块" 
                   :start="0" 
                   :end="10" 
                   :value="(2, 8)"
                   :step="1"
                   @change="update_value" />
</template>
<script lang='py'>
from vuepy import ref

value = ref((2, 8))

def update_value(event):
    print(event.new) # (3, 9)
</script>
```

## 自定义步长

可以设置`step`参数来控制值的间隔：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnIntRangeSlider name="步长为2" 
                   :start="0" 
                   :end="20" 
                   :value="(4, 12)"
                   :step="2" />
</template>
<script lang='py'>
from vuepy import ref

value = ref((4, 12))
</script>
```

## 垂直方向

滑块可以设置为垂直方向显示：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnIntRangeSlider name="垂直范围滑块" 
                     orientation="vertical"
                     :value="(30, 70)"
                     :height="300" />
  </PnRow>
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## 滑块颜色和方向

可以自定义滑块条的颜色和方向：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnIntRangeSlider name="蓝色范围滑块" 
                   bar_color="#3498db"
                   :start="0" 
                   :end="100" 
                   :value="(20, 80)"
                   :step="10" />
  <PnIntRangeSlider name="从右到左" 
                   direction="rtl"
                   :start="0" 
                   :end="100" 
                   :value="(20, 80)" 
                   :step="10" />
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
| step           | 值之间的间隔                   | ^[int]                             | 1         |
| value          | 所选范围的上下界元组            | ^[(int, int)]                      | (0, 1)    |
| value_throttled| 鼠标释放前阻止的所选范围的上下界元组 | ^[(int, int)]                 | (0, 1)    |
| bar_color      | 滑块条的颜色，十六进制RGB值      | ^[str]                             | None      |
| direction      | 滑块方向，从左到右('ltr')或从右到左('rtl') | ^[str]                    | 'ltr'     |
| disabled       | 是否禁用                       | ^[bool]                            | False     |
| name           | 组件标题                       | ^[str]                             | ""        |
| orientation    | 滑块的显示方向，'horizontal'或'vertical' | ^[str]                    | 'horizontal' |
| tooltips       | 是否在滑块手柄上显示工具提示      | ^[bool]                           | True      |

### Events

| 事件名         | 说明                       | 类型                                   |
| ------------- | -------------------------- | -------------------------------------- |
| change        | 当值更改时触发的事件         | ^[Callable]`(value) -> None`          |

## Controls

```python
##controls
import panel as pn
pn.extension()

int_range_slider = pn.widgets.IntRangeSlider(name='Integer Range Slider', start=0, end=10, value=(2, 8), step=2)
pn.Row(int_range_slider.controls, int_range_slider)
```
