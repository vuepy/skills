---
outline: deep
titleTemplate: :title | VLeaflet
---

# GeoJson 

Layer created from a GeoJSON data structure.

## 基础用法

```vue
<template>
  <vl-map :center="[50.6252978589571, 0.34580993652344]" :zoom=3>
    <template #layers>
      <vl-geo-json name='geo json' @click=onclick
                   :data="data" :style='style' :hover_style='hover_style'
                   :style_callback='random_color'/>
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
import os
import json
import random
import requests

if not os.path.exists('europe_110.geo.json'):
    url = 'https://github.com/jupyter-widgets/ipyleaflet/raw/master/examples/europe_110.geo.json'
    r = requests.get(url)
    with open('europe_110.geo.json', 'w') as f:
        f.write(r.content.decode("utf-8"))

with open('europe_110.geo.json', 'r') as f:
    data = json.load(f)

def random_color(feature):
    return {
        'color': 'black',
        'fillColor': random.choice(['red', 'yellow', 'green', 'orange']),
    }

style = {
    'opacity': 1, 
    'dashArray': '9',
    'fillOpacity': 0.1,
    'weight': 1,
}
hover_style={
    'color': 'white', 
    'dashArray': '0',
    'fillOpacity': 0.5,
}

def onclick(**kwargs):
    print(kwargs)

</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 备注 |
|--------|------|------|--------|------|------|
| data | GeoJSON数据结构 | Object | - | 是 | 必须包含有效的GeoJSON数据 |
| name | 图层名称 | string | '' | 否 | - |
| style | 应用到要素的基础样式 | Object | `{}` | 否 | 支持Leaflet Path样式选项 |
| hover_style | 鼠标悬停时的要素样式 | Object | `{}` | 否 | 支持Leaflet Path样式选项 |
| point_style | 点要素的特殊样式 | Object | `{}` | 否 | 支持Leaflet Path样式选项 |
| style_callback | 动态样式回调函数 | Function | null | 否 | `(feature) => styleObject` |

### 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 要素点击事件 | `{ feature: GeoJSONFeature, layer: L.Layer }` |
| hover | 要素悬停事件 | `{ feature: GeoJSONFeature, layer: L.Layer }` |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| - | - |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| - | - | - | - |
