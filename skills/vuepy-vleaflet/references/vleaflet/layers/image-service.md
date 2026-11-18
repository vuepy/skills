---
outline: deep
titleTemplate: :title | VLeaflet
---

# Image Service

图像服务层，用于通过Web服务提供的栅格数据

## 基础用法

```vue
<template>
  <vl-map :center="[47.655548, -122.303200]" :zoom='12'>
    <template #layers>
      <vl-image-service :url="url" name='image service'
                        :rendering_rule='rendering_rule'
                        format='jpgpng'
                        attribution='USGS, NASA' />
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
url='https://landsat.arcgis.com/arcgis/rest/services/Landsat/PS/ImageServer'
rendering_rule={"rasterFunction":"Pansharpened Enhanced with DRA"}
</script>
```

## API

### 属性

默认情况下，在发起图像服务层请求时，format、band_ids、time、rendering_rule等选项附加到请求URL中。

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 验证规则/备注 |
|--------|------|------|--------|------|--------------|
| url | 图像服务URL | string | '' | 是 | 必须以http/https开头 |
| f | 响应格式 | string | 'image' | 否 | 流式传输使用'image' |
| name | 图层名称 | string | '' | 否 | - |
| format | 图像导出格式 | string | 'jpgpng' | 否 | 支持jpgpng/png/png8/png24/jpg/bmp/gif/tiff/png32/bip/bsq/lerc |
| pixel_type | 栅格数据类型 | string | 'UNKNOWN' | 否 | 支持C128/C64/F32/F64/S16/S32/S8/U1/U16/U2/U32/U4/U8/UNKNOWN |
| no_data | 空值像素值 | Array\<number\> | [] | 否 | - |
| no_data_interpretation | 空值解释方式 | string | '' | 否 | esriNoDataMatchAny/esriNoDataMatchAll |
| interpolation | 像素重采样方法 | string | '' | 否 | RSP_BilinearInterpolation/RSP_CubicConvolution/RSP_Majority/RSP_NearestNeighbor |
| compression_quality | 压缩质量 | number | 100 | 否 | 0-100损失质量 |
| band_ids | 波段ID数组 | Array\<number\> | [] | 否 | 多波段图像使用 |
| time | 时间范围 | Array\<string\> | [] | 否 | 时间过滤条件 |
| rendering_rule | 渲染规则 | Object | {} | 否 | 服务端渲染配置 |
| mosaic_Rule | 镶嵌规则 | Object | {} | 否 | 影像镶嵌配置 |
| endpoint | 服务端点格式 | string | 'Esri' | 否 | 目前仅支持Esri |
| attribution | 数据源属性 | string | '' | 否 | - |
| crs | 坐标参考系统 | string | 'EPSG3857' | 否 | 支持Earth/EPSG3395/EPSG3857/EPSG4326/Base/Simple |
| interactive | 是否交互式 | boolean | false | 否 | 点击事件回调 |
| update_interval | 平移更新间隔(ms) | number | 200 | 否 | 平移时查询更新 |

### 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| click | 点击事件(interactive为true时触发) | {x: number, y: number, latlng: [number,number]} |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| - | - |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| - | - | - | - |

ref: https://ipyleaflet.readthedocs.io/en/latest/layers/image_service.html
