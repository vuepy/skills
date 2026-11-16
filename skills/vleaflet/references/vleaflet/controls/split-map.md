---
outline: deep
titleTemplate: :title | VLeaflet
---

# SplitMap Control

## 基础用法

```vue
<template>
  <vl-map :center="p" :zoom='5'>
    <template #controls>
      <vl-split-map-control>
         <template #left>
           <vl-tile-layer :url="url1" name='left'/>
         </template>
         <template #right>
           <vl-tile-layer :url="url2" name='right'/>
         </template>
      </vl-split-map-control>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
from ipyleaflet import basemaps

url1 = basemaps.NASAGIBS.ModisTerraTrueColorCR.build_url(time='2017-11-11')
url2 = basemaps.NASAGIBS.ModisAquaBands721CR.build_url(time='2017-11-11')

p = [52.204793, 360.121558]
</script>
```

## API

## API

### 属性

| 属性名          | 说明                     | 类型                     | 默认值      |
|----------------|------------------------|--------------------------|------------|
| position       | 控件位置                 | ^[string]                | 'topleft'  |
| left_layer     | 左侧图层                 | ^[object]                | - (必填)    |
| right_layer    | 右侧图层                 | ^[object]                | - (必填)    |
| direction      | 分割方向                 | ^[string]                | 'vertical' |
| split_position | 分割线位置(百分比)        | ^[number]                | 50         |

### 事件

| 事件名 | 说明 | 类型 |
|-------|------|------|
| -     | -    | -    |

### 插槽

| 插槽名   | 说明               |
|--------|-------------------|
| left   | 左侧图层      |
| right  | 右侧图层      |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|-------|------|------|--------|
| -     | -    | -    | -      |
