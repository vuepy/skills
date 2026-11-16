---
outline: deep
titleTemplate: :title | VLeaflet
---

# Map

## 基础用法

```vue
<template>
  <Slider v-model="zoom.value" description='zoom' :min=3 :max=13 />
  <p>zoom: {{ zoom.value }}, center: {{ center.value }}</p>

  <vl-map
    v-model:center="center.value"
    v-model:zoom="zoom.value"
    :zoom-control='False'
    :scroll-wheel-zoom='True'
    :keyboard="True"
    :basemap="basemaps.Esri.WorldTopoMap"
    style='width: 90%; height: 500px; border: 1px solid red;'
    ref=m
  >
    <template #controls>
      <vl-zoom-control position='topleft'/>
    </template>
    <template #layers>
        <vl-marker name='marker' :location='[53, 354]'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
from ipyleaflet import basemaps, Marker
from vuepy import ref

m = ref(None)
zoom = ref(5)
center = ref((53, 354))

</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| v-model:center | 地图中心点 | ^[Array]`[number, number]` | [0, 0] |
| v-model:zoom | 地图缩放级别 | ^[number] | 12 |
| max_zoom | 最大缩放级别 | ^[number] | null |
| min_zoom | 最小缩放级别 | ^[number] | null |
| zoom_snap | 缩放步长 | ^[number] | 1 |
| zoom_delta | 缩放增量 | ^[number] | 1 |
| crs | 坐标参考系统 | ^[enum]`'Earth'\|'EPSG3395'\|'EPSG3857'\|'EPSG4326'\|'Base'\|'Simple'` | 'EPSG3857' |
| dragging | 是否可拖动 | ^[boolean] | true |
| touch_zoom | 是否支持触摸缩放 | ^[boolean] | true |
| scroll_wheel_zoom | 是否支持滚轮缩放 | ^[boolean] | false |
| double_click_zoom | 是否支持双击缩放 | ^[boolean] | true |
| box_zoom | 是否支持框选缩放 | ^[boolean] | true |
| tap | 是否启用移动端点击支持 | ^[boolean] | true |
| tap_tolerance | 触摸容差 | ^[number] | 15 |
| world_copy_jump | 是否支持世界复制跳转 | ^[boolean] | false |
| close_popup_on_click | 点击地图时是否关闭弹窗 | ^[boolean] | true |
| bounce_at_zoom_limits | 是否在缩放限制时反弹 | ^[boolean] | true |
| keyboard | 是否支持键盘控制 | ^[boolean] | true |
| keyboard_pan_offset | 键盘平移偏移量 | ^[number] | 80 |
| keyboard_zoom_offset | 键盘缩放偏移量 | ^[number] | 1 |
| inertia | 是否启用惯性效果 | ^[boolean] | true |
| inertia_deceleration | 惯性减速率 | ^[number] | 3000 |
| inertia_max_speed | 最大惯性速度 | ^[number] | 1500 |
| zoom_control | 是否显示缩放控件 | ^[boolean] | true |
| attribution_control | 是否显示属性控件 | ^[boolean] | true |
| zoom_animation_threshold | 缩放动画阈值 | ^[number] | 4 |
| basemap | 底图样式 | ^[object] | {} |
| style | 自定义样式 | ^[string] | '' |

### 方法

| 方法名 | 说明 | 类型 |
|--------|------|------|
| add | 添加图层或控件 | `(item: any, index?: number) => void` |
| clear | 清除所有图层和控件 | `() => void` |
| fit_bounds | 设置地图视图以包含给定的地理边界 | `(bounds: any) => void` |
| remove | 移除图层或控件 | `(item: any) => void` |
| save | 将地图保存为HTML文件 | `(outfile: string, title: string) => void` |
| substitute | 替换地图上的图层或控件 | `(old: any, new_: any) => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| layers | 地图图层插槽 |
| controls | 地图控件插槽 |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
