---
outline: deep
titleTemplate: :title | VLeaflet
---

# Vector Tile Layer

## 基础用法

```vue
<template>
  <vl-map :center="center" :zoom=9 ref='m'>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
from ipyleaflet import VectorTileLayer
from traitlets import Unicode
from vuepy import ref, onMounted

m = ref(None)
center = [52.204793, 360.121558]

# This is a custom VectorTileLayer subclass, allowing to pass our api key to the url
class CustomVectorTileLayer(VectorTileLayer):
    api_key = Unicode('gCZXZglvRQa6sB2z7JzL1w').tag(sync=True, o=True)

water_style = dict(
fill="true",
weight=1,
fillColor="#06cccc",
color="#06cccc",
fillOpacity=0.2,
opacity=0.4,
)

waterway_style = dict(
    weight=1, fillColor="#2375e0", color="#2375e0", fillOpacity=0.2, opacity=0.4
)

admin_style = dict(
    weight=1, fillColor="pink", color="pink", fillOpacity=0.2, opacity=0.4
)

landcover_style = dict(
    fill="true",
    weight=1,
    fillColor="#53e033",
    color="#53e033",
    fillOpacity=0.2,
    opacity=0.4,
)

landuse_style = dict(
    fill="true",
    weight=1,
    fillColor="#e5b404",
    color="#e5b404",
    fillOpacity=0.2,
    opacity=0.4,
)

park_style = dict(
    fill="true",
    weight=1,
    fillColor="#84ea5b",
    color="#84ea5b",
    fillOpacity=0.2,
    opacity=0.4,
)

boundary_style = dict(
    weight=1, fillColor="#c545d3", color="#c545d3", fillOpacity=0.2, opacity=0.4
)

aeroway = dict(
    weight=1, fillColor="#51aeb5", color="#51aeb5", fillOpacity=0.2, opacity=0.4
)

road = dict(
    weight=1, fillColor="#f2b648", color="#f2b648", fillOpacity=0.2, opacity=0.4
)

transit = dict(
    weight=0.5, fillColor="#f2b648", color="#f2b648", fillOpacity=0.2, opacity=0.4
)

buildings = dict(
    fill="true",
    weight=1,
    fillColor="#2b2b2b",
    color="#2b2b2b",
    fillOpacity=0.2,
    opacity=0.4,
)

water_name = dict(
    weight=1, fillColor="#022c5b", color="#022c5b", fillOpacity=0.2, opacity=0.4
)

transportation_name = dict(
    weight=1, fillColor="#bc6b38", color="#bc6b38", fillOpacity=0.2, opacity=0.4
)

place = dict(
    weight=1, fillColor="#f20e93", color="#f20e93", fillOpacity=0.2, opacity=0.4
)

housenumber = dict(
    weight=1, fillColor="#ef4c8b", color="#ef4c8b", fillOpacity=0.2, opacity=0.4
)

poi = dict(weight=1, fillColor="#3bb50a", color="#3bb50a", fillOpacity=0.2, opacity=0.4)

earth = dict(
    fill="true",
    weight=1,
    fillColor="#c0c0c0",
    color="#c0c0c0",
    fillOpacity=0.2,
    opacity=0.4,
)

url = 'https://tile.nextzen.org/tilezen/vector/v1/512/all/{z}/{x}/{y}.mvt?api_key={apiKey}'
vector_tile_layer_styles = dict(
    water=water_style,
    waterway=waterway_style,
    admin=admin_style,
    andcover=landcover_style,
    landuse=landuse_style,
    park=park_style,
    boundaries=boundary_style,
    aeroway=aeroway,
    roads=road,
    transit=transit,
    buildings=buildings,
    water_name=water_name,
    transportation_name=transportation_name,
    places=place,
    housenumber=housenumber,
    pois=poi,
    earth=earth
)

vl = CustomVectorTileLayer(
    name='custom', url=url, vector_tile_layer_styles=vector_tile_layer_styles)

@onMounted
def add_layer():
    m.value.add(vl)
    
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 备注 |
|--------|------|------|--------|------|------|
| url | 矢量tile服务URL | string | - | 是 | 必须为有效矢量瓦片服务地址 |
| name | 图层名称 | string | '' | 否 | - |
| attribution | 数据源属性说明 | string | '' | 否 | - |
| vector_tile_layer_styles | 矢量数据样式配置 | Object | `{}` | 否 | 支持Mapbox GL样式规范 |

### 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| - | - | - |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 自定义图层内容 |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| redraw | 强制重绘矢量tile | - | void |

ref: // https://ipyleaflet.readthedocs.io/en/latest/layers/vector_tile.html
