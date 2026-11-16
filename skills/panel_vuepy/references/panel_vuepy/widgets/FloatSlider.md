---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# FloatSlider 浮点滑块

浮点滑块组件允许使用滑块在设定范围内选择浮点数值。

底层实现为`panel.widgets.FloatSlider`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/FloatSlider.html

## 基本用法

基本的浮点滑块使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFloatSlider name="浮点滑块" 
                :start="0" 
                :end="3.141" 
                :step="0.01" 
                v-model="value.value" />
</template>
<script lang='py'>
from vuepy import ref

value = ref(1.57)
</script>
```

## 自定义格式

可以使用自定义格式字符串或Bokeh TickFormatter来格式化滑块值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFloatSlider name="距离（字符串格式）" 
                format="1[.]00"
                :start="0" 
                :end="10" 
                v-model="value1.value" />
  <PnFloatSlider name="距离（格式化器）" 
                :format="tick_formatter"
                :start="0" 
                :end="10" 
                v-model="value2.value" />
</template>
<script lang='py'>
from vuepy import ref
from bokeh.models.formatters import PrintfTickFormatter

value1 = ref(5)
value2 = ref(5)
tick_formatter = PrintfTickFormatter(format='%.3f 米')
</script>
```

## 垂直方向

滑块可以设置为垂直方向显示：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnFloatSlider name="水平滑块" 
                  orientation="horizontal"
                  :start="0" 
                  :end="10" 
                  :value="5"
                  :width="300" />
    <PnFloatSlider name="垂直滑块" 
                  orientation="vertical"
                  :start="0" 
                  :end="10" 
                  :value="5"
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
  <PnFloatSlider name="蓝色滑块" 
                bar_color="#3498db"
                :start="0" 
                :end="10" 
                :value="5" />
  <PnFloatSlider name="绿色滑块" 
                bar_color="#2ecc71"
                :start="0" 
                :end="10" 
                :value="5" />
  <PnFloatSlider name="从右到左" 
                direction="rtl"
                :start="0" 
                :end="10" 
                :value="5" />
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## API

### 属性

| 属性名          | 说明                           | 类型                                | 默认值     |
| -------------- | ------------------------------ | ---------------------------------- | --------- |
| start          | 范围的下限                     | ^[float]                           | 0.0       |
| end            | 范围的上限                     | ^[float]                           | 1.0       |
| step           | 值之间的间隔                   | ^[float]                           | 0.1       |
| value          | 所选的值                       | ^[float]                           | 0.0       |
| value_throttled| 鼠标释放前阻止的所选值          | ^[float]                           | 0.0       |
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

float_slider = pn.widgets.FloatSlider(name='Float Slider', start=0, end=3.141, step=0.01, value=1.57)
pn.Row(float_slider.controls, float_slider)
```
