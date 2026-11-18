---
outline: deep
titleTemplate: :title | VLeaflet
---

# Local Tile Layer

## 基础用法

```vue
<template>
  <vl-map :center="[0, 0]" :zoom='1'>
    <template #layers>
      <vl-local-tile-layer :path="path" name='local'/>
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
from vuepy.utils import magic

# for jupyterlab
# path = "../tiles/{z}-{x}-{y}.jpg"
path = "/files/nb_llm/pyvue/examples/vleaflet/layers/tiles/{z}-{x}-{y}.jpg"
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 验证规则 |
|--------|------|------|--------|------|----------|
| path | 本地 tile 路径模板 | string | - | 是 | 需包含{z}/{x}/{y}占位符 |
| name | 图层名称 | string | '' | 否 | - |
| min_zoom | 最小显示缩放级别 | number | 0 | 否 | - |
| max_zoom | 最大显示缩放级别 | number | 18 | 否 | - |
| max_native_zoom | tile 源最大原生缩放级别 | number | null | 否 | - |
| min_native_zoom | tile 源最小原生缩放级别 | number | null | 否 | - |
| bounds | 显示范围边界<br>[西南角, 东北角] | [[number,number],[number,number]] | null | 否 | 经纬度坐标 |
| tile_size | tile 尺寸(像素) | number | 256 | 否 | - |
| attribution | 数据源属性说明 | string | '' | 否 | - |
| no_wrap | 是否禁止跨180度经线 | boolean | false | 否 | - |
| tms | 是否使用TMS tile坐标系 | boolean | false | 否 | 反转Y轴编号 |
| zoom_offset | tile URL缩放级别偏移量 | number | 0 | 否 | - |
| show_loading | 是否显示加载指示器 | boolean | false | 否 | - |
| loading | tile 是否正在加载 | boolean | false | 否 | - |
| detect_retina | 是否检测Retina屏幕 | boolean | false | 否 | - |
| opacity | 图层透明度 | number | 1.0 | 否 | 0-1之间 |
| visible | 是否可见 | boolean | true | 否 | - |

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
