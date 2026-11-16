---
outline: deep
titleTemplate: :title | VLeaflet
---

# Widget Control

A control that contains any component.

## 基础用法

```vue
<template>
  <vl-map :center="p" :zoom-control='False' ref='m'>
    <template #controls>
      <vl-widget-control position='topright'>
        <HBox>
          <Dropdown v-model=mapname.value :options=maps @change='change_map' />
          <Button @click=clear_layers()>Clear Layers</Button>
          <Button @click=add_marker() icon='map-marker'>+</Button>
        </HBox>
      </vl-widget-control>
    </template>
  </vl-map>
</template>
<script lang='py'>
from ipyleaflet import basemaps
from vuepy import ref

p = [52.204793, 360.121558]
mark_opacity = ref(1.0)
mark_loc = ref(p)
m = ref(None)
maps = list(basemaps.Esri)
mapname = ref(None)

def add_marker():
    m.value.add(Marker(location=p))

def change_map(e):
    esri = basemaps.Esri[e['new']]
    print(esri)
    print('---')
    m.value.basemap = esri

def clear_layers():
    m.value.clear_layers()

</script>
```

## API

### 属性

| 属性名          | 说明                     | 类型                     | 默认值          |
|----------------|------------------------|--------------------------|----------------|
| position       | 控件位置                 | ^[enum]`'topleft'\|'topright'\|'bottomleft'\|'bottomright'` | 'topright'     |
| width          | 控件宽度                 | ^[string]                | '300px'        |
| height         | 控件高度                 | ^[string]                | 'auto'         |
| max_width      | 最大宽度                 | ^[string]                | '100%'         |
| max_height     | 最大高度                 | ^[string]                | '100%'         |
| min_width      | 最小宽度                 | ^[string]                | '0'            |
| min_height     | 最小高度                 | ^[string]                | '0'            |
| margin         | 外边距                   | ^[string]                | '10px'         |
| padding        | 内边距                   | ^[string]                | '10px'         |
| border         | 边框样式                 | ^[string]                | '1px solid #ccc' |
| background     | 背景色                   | ^[string]                | 'white'        |
| border_radius  | 边框圆角                 | ^[string]                | '5px'          |
| box_shadow     | 阴影效果                 | ^[string]                | '0 0 5px rgba(0,0,0,0.2)' |
| z_index        | z-index层级             | ^[number]                | 1000           |
| style          | 自定义CSS样式            | ^[string]                | ''             |

### 事件

| 事件名 | 说明 | 类型 |
|-------|------|------|
| -     | -    | -    |

### 插槽

| 插槽名   | 说明               |
|--------|-------------------|
| default | 控件内部的自定义内容 |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|-------|------|------|--------|
| -     | -    | -    | -      |
