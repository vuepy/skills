---
outline: deep
titleTemplate: :title | VLeaflet
---

# Marker Cluster

## 基础用法

```vue
<template>
  <vl-map :center="[50, 0]" :zoom=5>
    <template #layers>
      <vl-marker-cluster name='marker cluster'>
        <vl-marker :location="(48, -2)"/>
        <vl-marker :location="(50, 0)"/>
        <vl-marker :location="(52, 2)"/>
      </vl-marker-cluster>
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 备注 |
|--------|------|------|--------|------|------|
| name | 图层名称 | string | '' | 否 | - |
| max_cluster_radius | 聚类最大半径(像素) | number | 80 | 否 | 值越小聚类越多 |
| spiderfy_on_max_zoom | 最大缩放级别时展开聚类 | boolean | true | 否 | 显示所有标记 |
| show_coverage_on_hover | 悬停时显示覆盖范围 | boolean | true | 否 | - |
| zoom_to_bounds_on_click | 点击时缩放到聚类范围 | boolean | true | 否 | - |
| disable_clustering_at_zoom | 禁用聚类的缩放级别 | number | 18 | 否 | 该级别以下不聚类 |
| remove_outside_visible_bounds | 移出视口的标记 | boolean | true | 否 | 提升性能 |
| animate | 启用动画效果 | boolean | true | 否 | 需浏览器支持 |
| animate_adding_markers | 添加标记时动画 | boolean | false | 否 | 影响批量添加性能 |
| spider_leg_polyline_options | 样式配置 | dict | ^[dict]`{weight:1.5,color: #222,opacity:0.5}` | 否 | 折线样式 |
| spiderfy_distance_multiplier | 距离系数 | number | 1 | 否 | 大图标需调整 |

### 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|

### 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 包含要聚类的标记 |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
