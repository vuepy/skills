---
outline: deep
titleTemplate: :title | VLeaflet
---

# Geoman Draw Control

GeomanDrawControl allows one to draw various shapes on the map. The drawing functionality on the front-end is provided by [geoman](https://geoman.io/).

The following shapes are supported: - marker - circlemarker - circle - polyline - rectangle - polygon - text

Additionally, there are modes that allow editing of previously drawn shapes:
* edit
* drag
* remove
* cut
* rotate

To have a drawing tool active on the map, pass it a non-empty dictionary with the desired options, see [geoman documentation](https://www.geoman.io/docs/modes/draw-mode#customize-style) for details.

## 基础用法

```vue
<template>
  <vl-map :center="p" :zoom-control='False'>
    <template #controls>
      <vl-geoman-draw-control 
        position='topright' 
        :polyline="polyline" 
        :polygon="polygon" 
        :circlemarker="circlemarker" 
        :rectangle="rectangle" 
      />
    </template>
  </vl-map>
</template>
<script lang='py'>
from vuepy import ref

p = [52.204793, 360.121558]
polyline = {
    "pathOptions": {
        "color": "red",
        "weight": 8,
        "opacity": 1.0
    }
}

polygon = {
    "pathOptions": {
        "fillColor": "#6be5c3",
        "color": "#6be5c3",
        "fillOpacity": 1.0
    }
}
circlemarker = {
    "pathOptions": {
        "fillColor": "#efed69",
        "color": "#efed69",
        "fillOpacity": 0.62
    }
}
rectangle = {
    "pathOptions": {
        "fillColor": "#fca45d",
        "color": "#fca45d",
        "fillOpacity": 1.0
    }
}
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| position | 控件位置 | ^[enum]`'topleft'\|'topright'\|'bottomleft'\|'bottomright'` | 'topleft' |
| draw | 绘制选项 | ^[object] | {} |
| edit | 编辑选项 | ^[object] | {} |

### Events

| 事件名 | 说明 | 类型 |
|--------|------|------|
| draw | 绘制完成时触发 | `(layer: any) => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|

### 方法

| 方法名 | 说明 | 类型 |
|--------|------|------|
|clear_text() | 清除所有文字 ||
