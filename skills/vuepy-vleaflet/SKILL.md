---
name: vleaflet
description: Build reactive Jupyter maps with vleaflet components such as Map, layers, and controls. Use when the user mentions vleaflet, ipyleaflet, or a Vuepy map.
license: CC BY-NC-SA 4.0
---

# vleaflet

```bash
pip install 'vuepy-core[vleaflet]'
```

地图、图层和控件都是响应式组件。使用下表中的组件前，先阅读对应 reference。

## Overview 组件总览

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| VLeaflet 组件总览 |  | [VLeaflet 组件总览](./references/vleaflet/overview.md) |

## Basic 基础组件

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| 🔥 快速上手 | vleaflet 是基于 Vue.py 和 ipyleaflet 开发的响应式地图组件库，在 Jupyter 中实现交互式地图。 | [🔥 快速上手](./references/vleaflet/quick-start.md) |
| Map 地图 |  | [Map 地图](./references/vleaflet/map.md) |
| Basemaps 底图 | 在此页面中，您可以查看 ipyleaflet 提供的默认底图选项。 | [Basemaps 底图](./references/vleaflet/basemaps.md) |

## Layers 图层组件

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| TileLayer 瓦片图层 |  | [TileLayer 瓦片图层](./references/vleaflet/layers/tile-layer.md) |
| LocalTileLayer 本地瓦片图层 |  | [LocalTileLayer 本地瓦片图层](./references/vleaflet/layers/local-tile-layer.md) |
| MagnifyingGlass 放大镜 |  | [MagnifyingGlass 放大镜](./references/vleaflet/layers/magnifying-glass.md) |
| Marker 标记 | ref: https://ipyleaflet.readthedocs.io/en/latest/layers/marker.html | [Marker 标记](./references/vleaflet/layers/marker.md) |
| MarkerCluster 标记聚合 |  | [MarkerCluster 标记聚合](./references/vleaflet/layers/marker-cluster.md) |
| Icon 图标 |  | [Icon 图标](./references/vleaflet/layers/icon.md) |
| DivIcon 自定义图标 |  | [DivIcon 自定义图标](./references/vleaflet/layers/div-icon.md) |
| AwesomeIcon 字体图标 |  | [AwesomeIcon 字体图标](./references/vleaflet/layers/awesome-icon.md) |
| Popup 弹出框 |  | [Popup 弹出框](./references/vleaflet/layers/popup.md) |
| WMS Layer WMS图层 | ref: https://ipyleaflet.readthedocs.io/en/latest/layers/wms_layer.html | [WMS Layer WMS图层](./references/vleaflet/layers/wms-layer.md) |
| ImageOverly 图片覆盖层 |  | [ImageOverly 图片覆盖层](./references/vleaflet/layers/image-overly.md) |
| ImageService 图片服务 | 图像服务层，用于通过Web服务提供的栅格数据 | [ImageService 图片服务](./references/vleaflet/layers/image-service.md) |
| AntPath 蚂蚁线 |  | [AntPath 蚂蚁线](./references/vleaflet/layers/ant-path.md) |
| Polyline 折线 |  | [Polyline 折线](./references/vleaflet/layers/polyline.md) |
| Polygon 多边形 |  | [Polygon 多边形](./references/vleaflet/layers/polygon.md) |
| Rectangle 矩形 |  | [Rectangle 矩形](./references/vleaflet/layers/rectangle.md) |
| Circle 圆形 |  | [Circle 圆形](./references/vleaflet/layers/circle.md) |
| CircleMarker 圆形标记 |  | [CircleMarker 圆形标记](./references/vleaflet/layers/circle-marker.md) |
| Heatmap 热力图 |  | [Heatmap 热力图](./references/vleaflet/layers/heatmap.md) |
| Velocity 速度场图层 | To visualize the direction and intensity of arbitrary velocities | [Velocity 速度场图层](./references/vleaflet/layers/velocity.md) |
| LayerGroup 图层组 |  | [LayerGroup 图层组](./references/vleaflet/layers/layer-group.md) |
| GeoJson GeoJSON数据 | Layer created from a GeoJSON data structure. | [GeoJson GeoJSON数据](./references/vleaflet/layers/geo-json.md) |
| GeoData 地理数据 | Layer created from a GeoPandas dataframe. | [GeoData 地理数据](./references/vleaflet/layers/geo-data.md) |
| Choropleth 等值区域图 | Layer showing a Choropleth effect on a GeoJSON structure. | [Choropleth 等值区域图](./references/vleaflet/layers/choropleth.md) |
| VectorTileLayer 矢量瓦片图层 | ref: // https://ipyleaflet.readthedocs.io/en/latest/layers/vector_tile.html | [VectorTileLayer 矢量瓦片图层](./references/vleaflet/layers/vector-tile-layer.md) |
| WKTLayer WKT图层 | WKTLayer is an ipyleaflet class that allows you to visualize a WKT data on the Map. | [WKTLayer WKT图层](./references/vleaflet/layers/wkt-layer.md) |
| LayerLikeObjects 图层对象 | The ipyleaflet.Map.add() method supports “layer-like” objects; meaning any object with an as_leaflet_layer method. This interface can be especially useful for downstream developers who want their users to more easily be able to add their ob… | [LayerLikeObjects 图层对象](./references/vleaflet/layers/layer-like-objects.md) |

## Controls 控件组件

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| Zoom 缩放控件 | A control which contains buttons for zooming in/out the Map. | [Zoom 缩放控件](./references/vleaflet/controls/zoom.md) |
| Scale 比例尺 | A control which shows the Map scale. | [Scale 比例尺](./references/vleaflet/controls/scale.md) |
| Layers 图层控制 | The LayersControl allows one to display a layer selector on the map in order to select which layers to display on the map. | [Layers 图层控制](./references/vleaflet/controls/layers.md) |
| Fullscreen 全屏 |  | [Fullscreen 全屏](./references/vleaflet/controls/fullscreen.md) |
| Measure 测量工具 |  | [Measure 测量工具](./references/vleaflet/controls/measure.md) |
| SplitMap 分屏地图 |  | [SplitMap 分屏地图](./references/vleaflet/controls/split-map.md) |
| GeomanDraw 绘图工具 | GeomanDrawControl allows one to draw various shapes on the map. The drawing functionality on the front-end is provided by geoman. | [GeomanDraw 绘图工具](./references/vleaflet/controls/geoman-draw.md) |
| Widget 小部件 | A control that contains any component. | [Widget 小部件](./references/vleaflet/controls/widget.md) |
| Legend 图例 |  | [Legend 图例](./references/vleaflet/controls/legend.md) |
| Search 搜索控件 |  | [Search 搜索控件](./references/vleaflet/controls/search.md) |
