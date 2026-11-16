---
outline: deep
titleTemplate: :title | VLeaflet
---

# Measure Control

## 基础用法

```vue
<template>
  <vl-map :center="p">
    <template #controls>
      <vl-measure-control position='topleft'></vl-measure-control>
    </template>
  </vl-map>
</template>
<script lang='py'>
from vuepy import ref

p = [52.204793, 360.121558]
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| position | 控件位置 | ^[enum]`'topleft'\|'topright'\|'bottomleft'\|'bottomright'` | 'topleft' |
| primary_length_unit | 主要长度单位 | ^[string] | 'meters' |
| secondary_length_unit | 次要长度单位 | ^[string] | 'kilometers' |
| primary_area_unit | 主要面积单位 | ^[string] | 'sqmeters' |
| secondary_area_unit | 次要面积单位 | ^[string] | 'hectares' |
| active_color | 当前测量时的使用的颜色 | ^[string] | '#ABE67E' |
| completed_color | 已完成的测量使用的颜色| ^[string] | '#C8F2BE' |

### Events

| 事件名 | 说明 | 类型 |
|--------|------|------|

### Slots

| 插槽名 | 说明 |
|--------|------|

### 方法

| 方法名 | 说明 | 类型 |
|--------|------|------|
