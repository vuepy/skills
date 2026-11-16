---
outline: deep
titleTemplate: :title | VLeaflet
---

# GeoData

Layer created from a GeoPandas dataframe.

## 基础用法

```vue
<template>
  <vl-map :center="[46.91, 7.43]" :zoom=15 >
    <template #layers>
      <vl-geo-data name='geo data' @click=on_click
                   :geo_dataframe="gdf" :style='style' 
                   :hover_style='hover_style'
                   :point_style='point_style' />
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
import geopandas, pandas as pd, numpy as np

numpoints = 10
center = (7.43, 46.91)

df = pd.DataFrame(
    {'Conc': 1 * np.random.randn(numpoints) + 17,
     'Longitude': 0.0004 * np.random.randn(numpoints) + center[0],
     'Latitude': 0.0004 * np.random.randn(numpoints) + center[1]})

gdf = geopandas.GeoDataFrame(
    df, geometry=geopandas.points_from_xy(df.Longitude, df.Latitude))

style ={
    'color': 'black',
    'radius':8,
    'fillColor': '#3366cc',
    'opacity':0.5,
    'weight':1.9,
    'dashArray':'2',
    'fillOpacity':0.6
}
point_style = {
    'radius': 5,
    'color': 'red',
    'fillOpacity': 0.8,
    'fillColor': 'blue',
    'weight': 3
}
hover_style = {'fillColor': 'red' , 'fillOpacity': 0.2}

def on_click(**kwargs):
    print(kwargs)

</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 备注 |
|--------|------|------|--------|------|------|
| geo_dataframe | 使用的GeoPandas数据框 | Object | - | 是 | 必须包含有效的GeoDataFrame数据 |
| name | 图层名称 | string | '' | 否 | - |
| style | 应用到要素的额外样式 | Object | `{}` | 否 | 支持Leaflet样式对象 |
| hover_style | 鼠标悬停时的要素样式 | Object | `{}` | 否 | 支持Leaflet样式对象 |
| point_style | 应用到点要素的额外样式 | Object | `{}` | 否 | 支持Leaflet样式对象 |
| style_callback | 要素样式回调函数 | Function | null | 否 | 接收feature参数，返回样式对象 |

### 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| click | 点击要素时触发 | feature: 被点击的要素数据 |
| hover | 鼠标悬停要素时触发 | feature: 被悬停的要素数据 |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| - | - |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| - | - | - | - |
