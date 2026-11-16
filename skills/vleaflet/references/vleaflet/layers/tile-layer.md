---
outline: deep
titleTemplate: :title | VLeaflet
---

# Tile Layer

## 基础用法

```vue
<template>
  <vl-map :center="[52.204793, 360.121558]">
    <template #layers>
      <vl-tile-layer :url="url1" name='World Street' @load='on_load'/>
      <vl-tile-layer :url="url2" name='World Topo' :base="True"/>
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
from ipyleaflet import basemaps

# from xyzservices.lib.TileProvider
st_map1 = basemaps.Esri.WorldStreetMap
url1 = st_map1.build_url(time='2025-04-01')

url2 = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'

def on_load(**kwargs):
    print(kwargs) #  {'event': 'load'}
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 备注 |
|--------|------|------|--------|------|------|
| url | tile 服务URL模板 | string | "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" | 是 | 需包含{z}/{x}/{y}占位符 |
| base | 是否作为底图 | boolean | false | 否 | - |
| name | 图层名称 | string | '' | 否 | - |
| min_zoom | 最小显示级别 | number | 0 | 否 | - |
| max_zoom | 最大显示级别 | number | 18 | 否 | - |
| max_native_zoom | tile 源最大原生级别 | number | null | 否 | - |
| min_native_zoom | tile 源最小原生级别 | number | null | 否 | - |
| bounds | 显示范围边界<br>[西南角,东北角] | [[number,number],[number,number]] | null | 否 | 经纬度坐标 |
| tile_size | tile 尺寸(像素) | number | 256 | 否 | - |
| attribution | 数据源属性说明 | string | '' | 否 | - |
| no_wrap | 是否禁止跨180度经线 | boolean | false | 否 | - |
| tms | 是否使用TMS tile坐标系 | boolean | false | 否 | 反转Y轴编号 |
| zoom_offset | tile URL缩放级别偏移 | number | 0 | 否 | - |
| show_loading | 是否显示加载指示器 | boolean | false | 否 | - |
| loading | tile 是否正在加载 | boolean | false | 否 | - |
| detect_retina | 是否检测Retina屏幕 | boolean | false | 否 | - |
| opacity | 图层透明度 | number | 1.0 | 否 | 0-1之间 |
| visible | 是否可见 | boolean | true | 否 | - |

### 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| load | tile加载完成时触发 | - |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| - | - |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| redraw | 强制重绘 | - | void |
