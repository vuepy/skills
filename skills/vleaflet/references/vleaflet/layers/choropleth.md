---
outline: deep
titleTemplate: :title | VLeaflet
---

# Choropleth

Layer showing a Choropleth effect on a GeoJSON structure.

## 基础用法

```vue
<template>
  <vl-map :center="[43, -100]" :zoom=4>
    <template #layers>
      <vl-choropleth name='choropleth' 
                     :geo_data="data" 
                     :choro_data="unemployment"
                     :colormap="linear.YlOrRd_04"
                     border_color="black"
                     :style="style"
      />
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
import json
import pandas as pd
import requests
from branca.colormap import linear

def load_data(url, filename, file_type):
    r = requests.get(url)
    with open(filename, 'w') as f:
        f.write(r.content.decode("utf-8"))
    with open(filename, 'r') as f:
        return file_type(f)

data = load_data(
    'https://raw.githubusercontent.com/jupyter-widgets/ipyleaflet/master/examples/us-states.json',
    'us-states.json',
     json.load)

unemployment = load_data(
    'https://raw.githubusercontent.com/jupyter-widgets/ipyleaflet/master/examples/US_Unemployment_Oct2012.csv',
    'US_Unemployment_Oct2012.csv',
     pd.read_csv)

unemployment =  dict(zip(unemployment['State'].tolist(), unemployment['Unemployment'].tolist()))

style = {'fillOpacity': 0.8, 'dashArray': '5, 5'}

</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 验证规则/备注 |
|--------|------|------|--------|------|--------------|
| geo_data | 应用等值线效果的GeoJSON数据结构 | Object | - | 是 | 必须包含有效的GeoJSON数据 |
| name | 图层名称 | string | '' | 否 | - |
| choro_data | 用于构建等值线效果的数据 | Object | null | 否 | - |
| value_min | 颜色映射的最小数据值 | number | 0 | 否 | - |
| value_max | 颜色映射的最大数据值 | number | 100 | 否 | - |
| colormap | 使用的颜色映射 | string\|Object | 'linear.OrRd_06' | 否 | 支持字符串或对象格式 |
| key_on | 用于颜色映射效果的要素键名 | string | 'id' | 否 | - |
| nan_color | NaN值多边形的填充颜色 | string | 'black' | 否 | 使用CSS颜色值 |
| nan_opacity | NaN值多边形的不透明度 | number | 0.4 | 否 | 0-1之间的值 |
| default_opacity | 有效数据(非NaN值)的不透明度 | number | 1.0 | 否 | 0-1之间的值，自动验证 |

### 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| - | - | - |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| - | - |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| - | - | - | - |
