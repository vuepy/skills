---
outline: deep
titleTemplate: :title | VLeaflet
---

# Marker 

## 基础用法

```vue
<template>
  <vl-map :center="[50, 0]" :zoom=5>
    <template #layers>
      <vl-marker v-model="loc.value" name='mark1' @move="on_move" title='move'/>
      <vl-marker :location="(50, 0)" name='with popup'>
          <template #popup>
            <p>mark1 loc {{ loc.value }}</p>
            <Button>ok</Button>
          </template>
      </vl-marker>
      <vl-marker :location='(52, 2)' name='with icon'>
        <template #icon>
         <vl-awesome-icon name='bus'/>
        </template>
      </vl-marker>
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
from vuepy import ref

loc = ref((48, -2))

def on_move(**kwargs):
    print(kwargs) # {'event': 'move', 'location': [49, -5]}
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 验证规则/备注 |
|--------|------|------|--------|------|--------------|
| location | 标记位置[纬度,经度] | [number, number] | [0,0] | 是 | 支持v-model绑定 |
| name | 图层名称 | string | '' | 否 | - |
| opacity | 标记透明度 | number | 1.0 | 否 | 0-1之间 |
| visible | 是否可见 | boolean | true | 否 | - |
| icon | 图标配置 | Object | null | 否 | 支持自定义图标 |
| draggable | 是否可拖动 | boolean | true | 否 | - |
| keyboard | 是否支持键盘操作 | boolean | true | 否 | - |
| title | 悬停提示文本 | string | '' | 否 | - |
| alt | 无障碍文本 | string | '' | 否 | - |
| rotation_angle | 旋转角度 | number | 0 | 否 | 角度值 |
| rotation_origin | 旋转原点 | string | '' | 否 | CSS格式 |
| z_index_offset | z-index偏移量 | number | 0 | 否 | - |
| rise_offset | 悬停时上升偏移量 | number | 250 | 否 | 像素单位 |

### 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| move | 标记移动时触发 | newLocation: 新位置[lat,lng] |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| icon | 自定义标记图标 |
| popup | 自定义弹出内容 |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| - | - | - | - |

ref: https://ipyleaflet.readthedocs.io/en/latest/layers/marker.html
