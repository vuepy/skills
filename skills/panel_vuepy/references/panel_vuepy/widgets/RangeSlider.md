---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# RangeSlider 范围滑块

范围滑块组件允许使用带有两个手柄的滑块选择整数范围。

底层实现为`panel.widgets.RangeSlider`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/RangeSlider.html

## 基本用法

基本的范围滑块，通过拖动两个手柄选择一个范围：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRangeSlider name="RangeSlider" 
                :start="0" 
                :end="100" 
                v-model="value.value"
                :step="1" />
  <p>value: {{ value.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

value = ref((25, 75))

</script>
```

## 自定义格式

可以使用自定义格式字符串或Bokeh TickFormatter来格式化滑块值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRangeSlider name="Price" 
                format="$%d"
                :start="0" 
                :end="1000" 
                v-model="value.value"
                :step="100" />
  <p>value: {{ value.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

value = ref((200, 800))
</script>
```

## 垂直方向

滑块可以设置为垂直方向显示：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnRangeSlider name="垂直" 
                  orientation="vertical"
                  :start="0" 
                  :end="100" 
                  :value="(30, 70)"
                  :height="300" />
  </PnRow>
</template>
```

## 滑块颜色和方向

可以自定义滑块条的颜色和方向：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRangeSlider name="Blue RangeSlider" 
                bar_color="#3498db"
                :start="0" 
                :end="100" 
                :value="(20, 80)" />
  <PnRangeSlider name="Right to Left" 
                direction="rtl"
                :start="0" 
                :end="100" 
                :value="(20, 80)" />
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
| value          | 所选范围的上下界元组            | ^[(int, int)]                       | (0, 1)    |
| value_throttled| 鼠标释放前阻止的所选范围的上下界元组 | ^[(int, int)]                    | (0, 1)    |
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
| change        | 当值更改时触发的事件         | ^[Callable]`(value) -> None`          |

## Controls

```python
##controls
import panel as pn
pn.extension()

range_slider = pn.widgets.RangeSlider(name='Range Slider', start=0, end=100, value=(25, 75))
pn.Row(range_slider.controls, range_slider)
```
