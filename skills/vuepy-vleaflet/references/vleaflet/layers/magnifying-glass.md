---
outline: deep
titleTemplate: :title | VLeaflet
---

# Icon Glass

## 基础用法

```vue
<template>
  <Slider v-model=radius.value description='radius' :min=50 :max=100 />
  <Slider v-model=zoom.value description='zoom' :min=1 :max=5 />
  <vl-map :center="[52.204793, 360.121558]">
    <template #layers>
      <vl-magnifying-glass name='glass' :radius="radius.value" :zoom_offset="zoom.value">
        <vl-tile-layer :url="url2" name='World Topo'/>
      </vl-magnifying-glass>
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
from vuepy import ref

radius = ref(60)
zoom = ref(1)

url2 = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'

</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 验证规则/备注 |
|--------|------|------|--------|------|--------------|
| radius | 放大镜半径(像素) | number | 100 | 否 | - |
| zoom_offset | 主地图与放大镜的缩放级别差 | number | 3 | 否 | 正值表示放大 |
| fixed_position | 是否固定位置 | boolean | false | 否 | true时不跟随鼠标 |
| lat_lng | 初始位置[纬度,经度] | [number,number] \| null | [0,0] | 否 | 固定位置时使用 |
| fixed_zoom | 固定缩放级别 | number \| null | null | 否 | -1表示禁用 |
| layers | 放大镜显示的图层数组 | Array\<Object\> | [] | 否 | 不应已添加到地图 |
| name | 图层名称 | string | '' | 否 | - |
| visible | 是否可见 | boolean | true | 否 | - |

### 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| - | - | - |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 自定义放大镜内容图层 |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| - | - | - | - |
