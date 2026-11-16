---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Number 数字指示器

数字指示器提供了一个值的可视化表示，该值可以根据提供的阈值进行着色。

底层实现为`panel.widgets.Number`，参数基本一致，参考文档：https://panel.holoviz.org/reference/indicators/Number.html

## 基本用法

`Number`指示器可用于指示一个简单的数字，并根据需要进行格式化：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnNumber name="Failure Rate" :value="10" format="{value}%" />
</template>
```

## 颜色阈值

如果我们想要指定特定的阈值，在这些阈值下指示器会改变颜色：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnNumber 
      name="Failure Rate" 
      :value="10" 
      format="{value}%"
      :colors="[[33, 'green'], [66, 'gold'], [100, 'red']]" 
    />
    <PnNumber 
      name="Failure Rate" 
      :value="42" 
      format="{value}%"
      :colors="[[33, 'green'], [66, 'gold'], [100, 'red']]" 
    />
    <PnNumber 
      name="Failure Rate" 
      :value="93" 
      format="{value}%"
      :colors="[[33, 'green'], [66, 'gold'], [100, 'red']]" 
    />
  </PnRow>
</template>
```

## API

### 属性

| 属性名        | 说明                      | 类型                                                          | 默认值 |
| ------------ | ------------------------ | -------------------------------------------------------------| ------- |
| value        | 数字指示器的值             | ^[number]                                                     | —       |
| colors       | 数字指示器的颜色阈值        | ^[array] 指定为元组列表，每个元组包含绝对阈值和切换颜色         | —       |
| default_color | 如果未提供颜色阈值，使用的颜色 | ^[string]                                                  | black   |
| format       | 接受{value}的格式化字符串   | ^[string]                                                     | {value} |
| font_size    | 数字本身的大小             | ^[string]                                                     | 54pt    |
| nan_format   | 如何格式化nan值            | ^[string]                                                     | -       |
| title_size   | 数字标题的大小             | ^[string]                                                     | 18pt    |
| disabled     | 是否禁用                  | ^[boolean]                                                     | false   |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当值变化时触发的事件   | ^[Callable]`(event: dict) -> None`     |

## Controls

```python
##controls
import panel as pn

pn.extension()

n = pn.widgets.Number(name='Failure Rate', value=10, format='{value}%')
pn.Row(n.controls())
```
