---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Gauge 仪表盘

仪表盘提供了一个值的可视化表示，以仪表或速度计形式展示。`Gauge`组件使用ECharts库渲染。

底层实现为`panel.widgets.Gauge`，参数基本一致，参考文档：https://panel.holoviz.org/reference/indicators/Gauge.html

## 基本用法

最简单的仪表盘只需要设置一个在指定范围内的`value`。默认的格式化器和范围假设你提供的是百分比值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnGauge name="Failure Rate" :value="10" :bounds="(0, 100)" />
</template>
```

## 自定义格式与颜色阈值

如果我们想要显示其他值，例如发动机每分钟转速，我们可以设置不同的`bounds`值并重写`format`。此外，我们还可以提供一组不同的颜色，定义应在提供范围的哪个点上更改颜色。`colors`接受一个元组列表，定义分数和颜色：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnGauge 
    name="Engine" 
    :value="2500" 
    :bounds="(0, 3000)" 
    format="{value} rpm"
    :colors="[[0.2, 'green'], [0.8, 'gold'], [1, 'red']]" 
  />
</template>
```

## 自定义指针颜色

您还可以通过传递自定义选项来更改指针的颜色：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnGauge 
    name="Engine" 
    :value="2500" 
    :bounds="(0, 3000)" 
    format="{value} rpm"
    :colors="[[0.2, 'green'], [0.8, 'gold'], [1, 'red']]" 
    :custom_opts="{'pointer': {'itemStyle': {'color': 'red'}}}"
  />
</template>
```

## API

### 属性

| 属性名           | 说明                                                                 | 类型                          | 默认值        |
|----------------|--------------------------------------------------------------------|-----------------------------|--------------|
| value          | 仪表当前值（需在bounds范围内）                                         | ^[float\|int]               | 25           |
| annulus_width  | 仪表环宽度（像素）                                                   | ^[int]                      | 10           |
| bounds         | 仪表数值范围（最小值, 最大值）                                         | ^[tuple]                    | (0, 100)     |
| colors         | 颜色阈值配置（[(阈值比例, 颜色), ...]）                                | ^[list]                     | []           |
| custom_opts    | ECharts仪表盘额外配置选项                                             | ^[dict]                     | {}           |
| end_angle      | 仪表结束角度（度）                                                   | ^[float\|int]               | -45          |
| format         | 数值显示格式（支持{value}占位符）                                      | ^[str]                      | '{value}%'   |
| num_splits     | 仪表刻度分割数量                                                     | ^[int]                      | 10           |
| show_ticks     | 是否显示刻度线                                                       | ^[bool]                     | True         |
| show_labels    | 是否显示刻度标签                                                     | ^[bool]                     | True         |
| start_angle    | 仪表起始角度（度）                                                   | ^[float\|int]               | 225          |
| tooltip_format | 悬停提示框格式（{b}:名称, {c}:值）                                     | ^[str]                      | '{b}: {c}%'  |
| title_size     | 标题字体大小（像素）                                                  | ^[int]                      | 18           |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当值变化时触发的事件   | ^[Callable]`(event: dict) -> None`     |

## Controls

```python
##controls
import panel as pn

pn.extension('echarts')

# 自定义指针颜色
g = pn.widgets.Gauge(
    name="Engine", value=2500, bounds=(0, 3000), format='{value} rpm',
    colors=[(0.2, 'green'), (0.8, 'gold'), (1, 'red')],
    custom_opts={"pointer": {"itemStyle": {"color": 'red'}}}
)
pn.Row(g.controls(), g)
```
