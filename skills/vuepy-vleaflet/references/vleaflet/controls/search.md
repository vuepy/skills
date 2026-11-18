---
outline: deep
titleTemplate: :title | VLeaflet
---

# Search Control

## 基础用法

```vue
<template>
  <vl-map :center="p" :zoom-control='False'>
    <template #controls>
      <vl-search-control 
        url="https://nominatim.openstreetmap.org/search?format=json&q={s}" 
        position="topleft" @location_found=on_loc @feature_found=on_feat
        placeholder='search.'
      >
        <vl-marker v-model="mark_loc.value" name="mark1" @move="on_move" :opacity="mark_opacity.value" title="drag" >
          <template #popup>
            loc: {{ loc_ret.value }}
            feat: {{ feat_ret.value }}
          </template>
        </vl-marker>
      </vl-search-control>
    </template>
  </vl-map>
</template>
<script lang='py'>
from vuepy import ref
from ipyleaflet import basemaps

p = [52.204793, 360.121558]

mark_opacity = ref(1.0)
mark_loc = ref(p)
maps = list(basemaps.Esri)
mapname = ref(None)

loc_ret = ref(None)
feat_ret = ref(None)

def on_loc(**kwargs):
    print('on_loc', kwargs) # {'event': 'locationfound', 'text': '杭州市, 浙江省, 中国', 'feature': None, 'location': [30.2489634, 120.2052342]}
    loc_ret.value = str(kwargs)

def on_feat(**kwargs):
    print('on_feat', kwargs) # {'event': 'locationfound', 'text': '杭州市, 浙江省, 中国', 'feature': None, 'location': [30.2489634, 120.2052342]}
    feat_ret.value = str(kwargs)
    
def on_move(**kwargs):
    print(kwargs)
    print("--")
</script>
</script>
```

## API

### 属性

| 属性名          | 说明                                                                 | 类型                                                                 | 默认值                          |
|----------------|--------------------------------------------------------------------|----------------------------------------------------------------------|---------------------------------|
| position       | 控件位置                                                             | ^[enum]`'topleft' \| 'topright' \| 'bottomleft' \| 'bottomright'`   | 'topleft'                      |
| url            | 用于搜索查询的URL                                                     | ^[string]                                                           | - (必填)                        |
| layer          | 用于搜索查询的图层组                                                   | ^[LayerGroup]                                                       | null                           |
| zoom           | 移动到搜索位置后的缩放级别，默认不改变缩放级别                              | ^[number]                                                           | null                           |
| found_style    | 在图层组中搜索时，搜索到要素的样式                                        | ^[object]                                                           | `{'fillColor': '#3f0', 'color': '#0f0'}` |
| property_name  | 用于显示的属性名称                                                     | ^[string]                                                           | 'display_name'                 |
| auto_complete  | 是否启用自动补全功能                                                   | ^[boolean]                                                          | true                           |

### 事件

| 事件名           | 说明                     | 参数类型 |
|-----------------|------------------------|---------|
| feature_found    | 当要素被找到时触发          | -       |
| location_found   | 当位置被找到时触发          | -       |

### 插槽

| 插槽名    | 说明                  |
|---------|----------------------|
| default | 用于自定义标记(marker)内容 |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|------|-----|------|--------|
| -    | -   | -    | -      |
