---
outline: deep
titleTemplate: :title | VLeaflet
---

# Heatmap

## 基础用法

```vue
<template>
  <vl-map :center="[0, 0]" :zoom=2>
    <template #layers>
      <vl-heatmap name='heatmap' :locations="heat" :radius="20"/>
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
from random import uniform

heat = [[uniform(-80, 80), uniform(-180, 180), uniform(0, 1000)] for i in range(1000)]
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 验证规则/备注 |
|--------|------|------|--------|------|--------------|
| locations | 热力图数据点位置数组 | Array<[number, number, number?]> | - | 是 | 每个元素至少包含[纬度,经度]，可选第三参数表示热度值 |
| name | 图层名称 | string | '' | 否 | - |
| blur | 模糊强度 | number | 15 | 否 | 值越大越模糊 |
| radius | 数据点半径 | number | 25 | 否 | 像素单位 |
| gradient | 热力颜色渐变映射 | Object | {0.4:'blue',<br>0.6:'cyan',<br>0.7:'lime',<br>0.8:'yellow',<br>1.0:'red'} | 否 | 键为0-1的比例值，值为CSS颜色 |

### 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| - | - | - |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| popup | 自定义弹出窗口内容 |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| - | - | - | - |
