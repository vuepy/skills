---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# LinearGauge 线性仪表

线性仪表提供了某个范围内值的简单线性可视化表示。它类似于`Dial`和`Gauge`元素，但在视觉上更紧凑。

底层实现为`panel.widgets.LinearGauge`，参数基本一致，参考文档：https://panel.holoviz.org/reference/indicators/LinearGauge.html

## 基本用法

最简单的线性仪表只需要设置一个在指定范围内的`value`。默认的格式化器和范围假设你提供的是百分比值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnLinearGauge name="Failure Rate" :value="30" :bounds="(0, 100)" />
</template>
```

## 自定义格式与颜色

如果我们想要显示其他值，例如发动机每分钟转速，我们可以设置不同的`bounds`值并重写`format`。此外，我们还可以提供一组不同的颜色，定义应在提供范围的哪个点上更改颜色。`colors`可以接受颜色列表或元组列表：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnLinearGauge 
    name="Engine" 
    :value="2500" 
    :bounds="(0, 3000)" 
    format="{value:.0f} rpm"
    :colors="['green', 'gold', 'red']" 
    :horizontal="True" 
    :width="125" 
  />
</template>
```

## 显示颜色边界

如果我们想要显示不同颜色之间的过渡点，我们也可以启用`show_boundaries`：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnLinearGauge 
    name="Engine" 
    :value="2800" 
    :bounds="(0, 3000)" 
    format="{value:.0f} rpm"
    :colors="[(0.2, 'green'), (0.8, 'gold'), (1, 'red')]" 
    show_boundaries
  />
</template>
```

## API

### 属性

| 属性名          | 说明                      | 类型                                                           | 默认值 |
| -------------- | ------------------------ | --------------------------------------------------------------| ------- |
| value          | 仪表上指示的值            | ^[number]                                                      | 25      |
| bounds         | 仪表的上下限              | ^[array]                                                       | [0, 100] |
| colors         | 仪表的颜色阈值            | ^[array] 可以是均匀分布的颜色列表或元组列表，每个元组包含阈值分数和切换颜色 | —       |
| default_color  | 如果未提供颜色阈值，使用的颜色 | ^[string]                                                   | lightblue |
| format         | 值指示器的格式化字符串     | ^[string]                                                      | {value}% |
| nan_format     | 如何格式化nan值           | ^[string]                                                      | -        |
| needle_color   | 指针的颜色                | ^[string]                                                      | black    |
| show_boundaries | 是否显示颜色之间的过渡    | ^[boolean]                                                     | false    |
| unfilled_color | 仪表未填充区域的颜色      | ^[string]                                                      | whitesmoke |
| horizontal     | 是否水平显示              | ^[boolean]                                                     | false    |
| show_value     | 是否显示值                | ^[boolean]                                                     | true     |
| disabled       | 是否禁用                  | ^[boolean]                                                     | false    |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当值变化时触发的事件   | ^[Callable]`(event: dict) -> None`     |

## Controls

```python
##controls
import panel as pn

pn.extension()

l = pn.widgets.LinearGauge(name='Failure Rate', value=30, bounds=(0, 100))
pn.Row(l.controls, l)
```
