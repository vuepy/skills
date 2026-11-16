---
outline: deep
titleTemplate: :title | VLeaflet
---

# Basemaps

在此页面中，您可以查看 ipyleaflet 提供的默认底图选项。当然，您也可以通过创建自定义的 `TileLayer` 来使用其他地图服务提供商。
这些底图均源自 [xyzservices](https://xyzservices.readthedocs.io/) 这个 Python 包。

## 基础用法

```vue
<template>
  <vl-map
    :center="(38.128, 2.588)"
    :zoom="5"
    :basemap="basemap"
  >
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
from ipyleaflet import basemaps

# basemap = basemaps.OpenStreetMap.France
# basemap = basemaps.OpenStreetMap.HOT
# basemap = basemaps.Gaode.Normal
# basemap = basemaps.OpenTopoMap
# basemap = basemaps.Gaode.Satellite
# basemap = basemaps.Esri.WorldStreetMap
# basemap = basemaps.Esri.DeLorme
# basemap = basemaps.Esri.WorldTopoMap
# basemap = basemaps.Esri.WorldImagery
# basemap = basemaps.Esri.NatGeoWorldMap
# basemap = basemaps.CartoDB.DarkMatter
# basemap = basemaps.CartoDB.Positron
# basemap = basemaps.NASAGIBS.ModisTerraTrueColorCR
# basemap = basemaps.NASAGIBS.ModisTerraBands367CR
# basemap = basemaps.NASAGIBS.ModisTerraBands721CR
# more https://ipyleaflet.readthedocs.io/en/latest/map_and_basemaps/basemaps.html
basemap = basemaps.OpenStreetMap.Mapnik
</script>
```
