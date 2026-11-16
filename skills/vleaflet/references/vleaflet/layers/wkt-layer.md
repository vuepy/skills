---
outline: deep
titleTemplate: :title| VLeaflet
---

# WKT Layer

WKTLayer is an ipyleaflet class that allows you to visualize a WKT data on the Map.

## 基础用法

```vue
<template>
  <vl-map :center="[42.3152960829043, -71.1031627617667]" :zoom=17>
    <template #layers>
      <vl-wkt-layer :path="path" :hover_style='hover_style' name='wkt file'/>
      <vl-wkt-layer :wkt_string="wkt_string" :hover_style='hover_style' name='wkt str'/>
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
import os
import requests

hover_style = {"fillColor": "red"}
path = "test.wkt"
if not os.path.exists(path):
    url = "https://github.com/jupyter-widgets/ipyleaflet/raw/master/examples/data/test.wkt"
    r = requests.get(url)
    with open(path, "w") as f:
        f.write(r.content.decode("utf-8"))

wkt_string="POLYGON((10.689697265625 -25.0927734375, 34.595947265625 -20.1708984375, 38.814697265625 -35.6396484375, 13.502197265625 -39.1552734375, 10.689697265625 -25.0927734375))"
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 备注 |
|--------|------|------|--------|------|------|
| path | WKT文件本地路径 | string | "" | 否 | 与wkt_string二选一 |
| wkt_string | WKT格式字符串 | string | "" | 否 | 与path二选一 |
| name | 图层名称 | string | '' | 否 | - |

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

ref: https://ipyleaflet.readthedocs.io/en/latest/layers/wkt_layer.html
