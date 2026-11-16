---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Progress 进度条

进度条组件根据当前`value`和`max`值显示朝着某个目标的进度。如果未设置`value`或设置为-1，则`Progress`组件处于不确定模式，若`active`设置为True，将会显示动画效果。

底层实现为`panel.widgets.Progress`，参数基本一致，参考文档：https://panel.holoviz.org/reference/indicators/Progress.html

## 基本用法

`Progress`组件可以使用或不使用值来实例化。如果给定`value`，进度条将根据`max`值（默认为100）的进度进行填充：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol>
  <PnProgress name="Progress" v-model="progress.value" :width="200" />
  <PnIntSlider v-model="progress.value" 
              :start="0" :end="100" name="Progress Value" />
 </PnCol>
</template>

<script lang='py'>
from vuepy import ref

progress = ref(20)
</script>
```

## 不确定状态

`Progress`也可以在不设置`value`的情况下实例化，显示不确定状态：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnProgress name="Indeterminate Progress" :active="True" :width="200" />
</template>
```

## 不同颜色

`Progress`组件支持多种条形颜色：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol>
    <PnRow v-for="(index, color) in bar_colors">
      <PnStaticText :value="color" :width="100" />
      <PnProgress :width="300" :value="10 + index * 10" :bar_color="color" />
    </PnRow>
  </PnCol>
</template>

<script lang='py'>
bar_colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']
</script>
```

## API

### 属性

| 属性名    | 说明                     | 类型                                                           | 默认值 |
| -------- | ----------------------- | ---------------------------------------------------------------| ------- |
| value    | 当前进度值，设置为-1表示不确定状态 | ^[number]                                               | —       |
| max      | 最大进度值               | ^[number]                                                      | 100     |
| active   | 在不确定模式下是否显示动画 | ^[boolean]                                                     | false   |
| bar_color | 条形的颜色              | ^[string] 可选值: 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark' | — |
| style    | 应用于进度条的CSS样式字典 | ^[object]                                                      | —       |
| disabled | 是否禁用                | ^[boolean]                                                      | false    |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当值变化时触发的事件   | ^[Callable]`(event: dict) -> None`     |

## Controls

```python
##controls
import panel as pn
pn.extension()

progress = pn.widgets.Progress(name='Progress', value=20, width=200)
pn.Row(progress.controls, progress)
```
