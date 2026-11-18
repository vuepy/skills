---
outline: deep
titleTemplate: :title | VLeaflet
---

# Layers Control

The LayersControl allows one to display a layer selector on the map in order to select which layers to display on the map.

All layers have a name attribute which is displayed in the selector and can be changed by the user.

## 基础用法

```vue
<template>
  <vl-map :center="p" :zoom-control='False'>
    <template #controls>
      <vl-zoom-control position='topleft'/>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
    <template #layers>
      <vl-marker name='mark1' :location='p'/>
      <vl-marker name='mark2' :location='[52.2, 360]'/>
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
| collapsed | 是否折叠 | ^[boolean] | true |

### Events

| 事件名 | 说明 | 类型 |
|--------|------|------|

### Slots

| 插槽名 | 说明 |
|--------|------|

### 方法

| 方法名 | 说明 | 类型 |
|--------|------|------|
