---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# BooleanStatus 布尔状态指示器

布尔状态指示器提供了布尔状态的可视化表示，以填充或非填充圆圈的形式展示。当`value`设置为`True`时，指示器将被填充；设置为`False`时，指示器将不被填充。

底层实现为`panel.widgets.BooleanStatus`，参数基本一致，参考文档：https://panel.holoviz.org/reference/indicators/BooleanStatus.html

## 基本用法

BooleanStatus组件可以实例化为`False`或`True`状态：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnBooleanStatus :value="False" />
    <PnBooleanStatus :value="True" />
  </PnRow>
</template>
```

## 颜色设置

BooleanStatus指示器支持多种颜色：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnStaticText value="" />
    <PnStaticText value="False" />
    <PnStaticText value="True" />
  </PnRow>
    
    <PnRow v-for="color in colors">
      <PnStaticText :value="color" :width='80' />
      <PnBooleanStatus :width="50" :height="50" :value="False" :color="color" />
      <PnBooleanStatus :width="50" :height="50" :value="True" :color="color" />
    </PnRow>
</template>

<script lang='py'>
colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']
</script>
```

## API

### 属性

| 属性名    | 说明                 | 类型                                                           | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| value/`v-model`    | 指示器是否填充        | ^[boolean]                                                      | false   |
| color    | 指示器的颜色,可选值: 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'          | ^[string]  | — |
| disabled | 是否禁用             | ^[boolean]                                                     | false   |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当值变化时触发的事件   | ^[Callable]`(event: dict) -> None`     |

## Controls

```python
##controls
import panel as pn
pn.extension()

true_status = pn.widgets.BooleanStatus(value=True)

pn.Row(true_status.controls, true_status)
```
