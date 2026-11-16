---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# LoadingSpinner 加载旋转器

加载旋转器提供了加载状态的可视化表示。当`value`设置为`True`时，旋转部分会旋转；设置为`False`时，旋转部分会停止旋转。

底层实现为`panel.widgets.LoadingSpinner`，参数基本一致，参考文档：https://panel.holoviz.org/reference/indicators/LoadingSpinner.html

## 基本用法

`LoadingSpinner`可以实例化为旋转或静止状态：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnLoadingSpinner :value="False" name="Idle..." />
    <PnLoadingSpinner :value="True" :size="20" name="Loading..." />
  </PnRow>
</template>
```

## 颜色与背景

`LoadingSpinner`支持多种旋转部分颜色和背景：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <!--<PnGridBox :ncols="3">
    <PnLabel value="" />
    <PnLabel value="light" />
    <PnLabel value="dark" />-->
    <PnStaticText value="" />
    <PnStaticText value="light" />
    <PnStaticText value="dark" />
    
    <PnRow v-for="color in colors">
      <!--<PnLabel :value="color" />-->
      <PnStaticText :value="color" :width='80' />
      <PnLoadingSpinner :size="50" :value="True" :color="color" bgcolor="light" />
      <PnLoadingSpinner :size="50" :value="True" :color="color" bgcolor="dark" />
    </PnRow>
  <!--</PnGridBox>-->
</template>

<script lang='py'>
colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']
</script>
```

## API

### 属性

| 属性名    | 说明                 | 类型                                                           | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| value    | 指示器是否旋转        | ^[boolean]                                                     | false   |
| color    | 旋转部分的颜色        | ^[string] 可选值: 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark' | — |
| bgcolor  | 旋转器背景部分的颜色  | ^[string] 可选值: 'light', 'dark'                              | —       |
| name     | 显示在旋转器旁边的标签 | ^[string]                                                      | —       |
| size     | 旋转器的大小（像素）   | ^[number]                                                      | —       |
| disabled | 是否禁用              | ^[boolean]                                                     | false   |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当值变化时触发的事件   | ^[Callable]`(event: dict) -> None`     |

## Controls

```python
##controls
import panel as pn

pn.extension()

idle = pn.widgets.LoadingSpinner(value=False, name='Idle...')
loading = pn.widgets.LoadingSpinner(value=True, size=20, name='Loading...')

pn.Row(idle.controls(), loading)
```
