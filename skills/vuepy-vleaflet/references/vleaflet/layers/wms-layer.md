---
outline: deep
titleTemplate: :title | VLeaflet
---

# WMS Layer

## 基础用法

```vue
<template>
  <vl-map :center="[38.491, -95.712]" :zoom=4 :basemap="basemaps.CartoDB.Positron">
    <template #layers>
      <vl-wms-layer 
        :url="url1" 
        layers='nexrad-n0r-900913' 
        :transparent='True'
        format='image/png'
        name='World Street' @load='on_load'/>
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
from ipyleaflet import basemaps

url1 = "http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi"

def on_load(**kwargs):
    print(kwargs) #  {'event': 'load'}
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 验证规则/备注 |
|--------|------|------|--------|------|--------------|
| url | WMS服务地址 | string | - | 是 | 必须为有效WMS服务URL |
| layers | WMS图层列表(逗号分隔) | string | '' | 是 | 多个图层用逗号分隔 |
| name | 图层名称 | string | '' | 否 | - |
| styles | WMS样式列表(逗号分隔) | string | '' | 否 | 多个样式用逗号分隔 |
| format | 图像格式 | string | 'image/png' | 否 | 透明图层建议使用png |
| transparent | 是否透明 | boolean | true | 否 | - |
| crs | 坐标参考系统 | string | 'EPSG3857' | 否 | 支持'Earth','EPSG3395','EPSG3857','EPSG4326','Base','Simple' |

### 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| load | WMS图层加载完成时触发 | - |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| - | - |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| - | - | - | - |

ref: https://ipyleaflet.readthedocs.io/en/latest/layers/wms_layer.html
