---
outline: deep
titleTemplate: :title | VLeaflet
---

# Image overlay and Video overlay

## 基础用法

```vue
<template>
  <vl-map :center="[25, -115]" :zoom=4>
    <template #layers>
      <vl-image-overlay url="https://www.vuepy.org/images/vuepy-logo.svg" 
                        name='image'
                        :bounds="((13, -130), (32, -100))"/>
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
</script>
```

```vue
<template>
  <vl-map :center="[25, -115]" :zoom=4>
    <template #layers>
      <vl-video-overlay url="https://www.mapbox.com/bites/00188/patricia_nasa.webm" 
                        name='video'
                        :bounds="((13, -130), (32, -100))" />
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
</script>
```

## ImageOverlay

### API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 验证规则 |
|--------|------|------|--------|------|----------|
| url | 图片资源URL(本地或远程) | string | '' | 是 | 必须为有效URL |
| bounds | 图片覆盖范围边界<br>[西南角,东北角] | [[number,number], [number,number]] | [[0,0],[0,0]] | 是 | 必须为2个经纬度坐标点 |
| name | 图层名称 | string | '' | 否 | - |
| attribution | 图片属性说明 | string | '' | 否 | - |
| alt | 图片替代文本 | string | '' | 否 | - |

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

## VideoOverlay API

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 验证规则 |
|--------|------|------|--------|------|----------|
| url | 视频资源URL(本地或远程) | string \| Array\<string\> | '' | 是 | 单个URL或多个视频URL数组 |
| bounds | 视频覆盖范围边界<br>[西南角, 东北角] | [[number,number], [number,number]] | [[0,0],[0,0]] | 是 | 必须为2个经纬度坐标点 |
| name | 图层名称 | string | '' | 否 | - |
| attribution | 视频属性说明 | string | '' | 否 | - |
| alt | 视频替代文本 | string | '' | 否 | 视频无法显示时展示 |

### 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|

### 插槽

| 插槽名 | 说明 |
|--------|------|
| - | - |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
