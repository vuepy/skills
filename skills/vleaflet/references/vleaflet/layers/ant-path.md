---
outline: deep
titleTemplate: :title | VLeaflet
---

# AntPath

## 基础用法

```vue
<template>
  <Button @click='on_click()'>Switch color</Button>
  <vl-map :center="[51.332, 6.853]" :zoom=10>
    <template #layers>
      <vl-ant-path
        :locations="path"
        :dash_array="[1, 10]"
        :delay="1000"
        :color='color.value',
        pulse_color='#3f6fba'
        name='ant path'
      />
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
from vuepy import ref

path = [
    [51.185, 6.773], [51.182, 6.752], [51.185, 6.733], [51.194, 6.729],
    [51.205, 6.732], [51.219, 6.723], [51.224, 6.723], [51.227, 6.728],
    [51.228, 6.734], [51.226, 6.742], [51.221, 6.752], [51.221, 6.758],
    [51.224, 6.765], [51.230, 6.768], [51.239, 6.765], [51.246, 6.758],
    [51.252, 6.745], [51.257, 6.724], [51.262, 6.711], [51.271, 6.701],
    [51.276, 6.702], [51.283, 6.710], [51.297, 6.725], [51.304, 6.732],
    [51.312, 6.735], [51.320, 6.734], [51.326, 6.726], [51.334, 6.713],
    [51.340, 6.696], [51.344, 6.678], [51.349, 6.662], [51.354, 6.655],
    [51.360, 6.655], [51.366, 6.662], [51.369, 6.675], [51.373, 6.704],
    [51.376, 6.715], [51.385, 6.732], [51.394, 6.741], [51.402, 6.743],
    [51.411, 6.742], [51.420, 6.733], [51.429, 6.718], [51.439, 6.711],
    [51.448, 6.716], [51.456, 6.724], [51.466, 6.719], [51.469, 6.713],
    [51.470, 6.701], [51.473, 6.686], [51.479, 6.680], [51.484, 6.680],
    [51.489, 6.685], [51.493, 6.700], [51.497, 6.714]
]
color = ref('#7590ba')

def on_click():
    color.value = 'red'
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 |
|--------|------|------|--------|------|
| locations | ant-path 经过的坐标点 | Array<[lat: number, long: number]> | - | 是 |
| name | 图层名称 | string | '' | 否 |
| use | 路径形状类型 | 'polyline'\|'polygon'\|'rectangle'\|'circle' | 'polyline' | 否 |
| color | 主虚线颜色 | string | '#0000FF' | 否 |
| weight | 路径宽度 | number | 5 | 否 |
| radius | 圆形半径(当use为circle时生效) | number | 10 | 否 |
| dash_array | 动画虚线大小 | string | '10, 20' | 否 |
| delay | 动画延迟时间(毫秒) | number | 400 | 否 |
| paused | 是否暂停动画 | boolean | false | 否 |
| reverse | 是否反向动画 | boolean | false | 否 |
| hardware_accelerated | 是否使用硬件加速 | boolean | false | 否 |
| pulse_color | 次虚线颜色 | string | '#ffffff' | 否 |

### 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| - | - | - |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| popup | 自定义弹出内容 |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| - | - | - | - |
