---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Dial 刻度盘指示器

刻度盘指示器提供了一个简单的径向刻度盘来可视化表示数值。

底层实现为`panel.widgets.Dial`，参数基本一致，参考文档：https://panel.holoviz.org/reference/indicators/Dial.html

## 基本用法

最简单的刻度盘只需要设置一个在指定范围内的`value`。默认的格式化器和范围假设你提供的是百分比值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDial name="Failure Rate" :value="10" :bounds="(0, 100)" />
</template>
```

## 自定义格式与颜色阈值

如果我们想要显示其他值，例如发动机每分钟转速，我们可以设置不同的`bounds`值并重写`format`。此外，我们还可以提供一组不同的颜色，定义应在提供范围的哪个点上更改颜色。`colors`接受一个元组列表，定义分数和颜色：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDial 
    name="Engine" 
    :value="2500" 
    :bounds="(0, 3000)" 
    format="{value} rpm"
    :colors="[[0.2, 'green'], [0.8, 'gold'], [1, 'red']]" 
  />
</template>
```

## API

### 属性

| 属性名            | 说明                                                                 | 类型                          | 默认值         |
|------------------|--------------------------------------------------------------------|-----------------------------|---------------|
| annulus_width    | 仪表环宽度（像素）                                                   | ^[int]                      | 10            |
| bounds           | 仪表数值范围（最小值, 最大值）                                         | ^[tuple]                    | (0, 100)      |
| colors           | 颜色阈值配置（[(阈值比例, 颜色), ...]）                                | ^[list]                     | []            |
| default_color    | 默认填充颜色（无颜色阈值时使用）                                        | ^[str]                      | 'lightblue'   |
| end_angle        | 仪表结束角度（度）                                                   | ^[float\|int]               | -45           |
| format           | 数值显示格式（支持{value}占位符）                                      | ^[str]                      | '{value}%'    |
| nan_format       | NaN值显示格式                                                       | ^[str]                      | '-'           |
| needle_color     | 指针颜色                                                            | ^[str]                      | 'black'       |
| needle_width     | 指针径向宽度（弧度）                                                  | ^[float]                    | 0.1           |
| start_angle      | 仪表起始角度（度）                                                   | ^[float\|int]               | 225           |
| tick_size        | 刻度标签字体大小                                                     | ^[int]                      | -             |
| title_size       | 标题字体大小                                                        | ^[int]                      | -             |
| unfilled_color   | 未填充区域颜色                                                       | ^[str]                      | 'whitesmoke'  |
| value            | 仪表当前值（需在bounds范围内）                                         | ^[float\|int]               | 25            |
| value_size       | 数值标签字体大小                                                     | ^[str]                      | -             |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当值变化时触发的事件   | ^[Callable]`(event: dict) -> None`     |

## Controls

```python
##controls
import panel as pn

pn.extension()

# 简单示例
d = pn.widgets.Dial(name='Failure Rate', value=10, bounds=(0, 100))

pn.Row(d.controls(), d)
```
