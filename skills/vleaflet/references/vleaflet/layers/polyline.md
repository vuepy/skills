---
outline: deep
titleTemplate: :title | VLeaflet
---

# Polyline

## 基础用法

```vue
<template>
  <Button @click='on_click()'>Switch color</Button>
  <vl-map :center="[42.5, -41]" :zoom=2>
    <template #layers>
      <vl-polyline
        :locations="path"
        :color='color.value',
        :fill='False'
        name='polyline' />
      <vl-polyline
        :locations="paths"
        color='red',
        :fill='False'
        name='multi polyline'/>
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
from vuepy import ref

path = [
   [43.51, -112.68],
   [33.77, -112.43],
   [34.04, -108.22],
]
paths = [
   [[45.51, -122.68],
    [37.77, -122.43],
    [34.04, -118.2]],
   [[40.78, -73.91],
    [41.83, -87.62],
    [32.76, -96.72]]
]
color = ref('green')

def on_click():
    color.value = 'red'
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 验证规则 |
|--------|------|------|--------|------|----------|
| locations | 折线顶点坐标数组 | Array<[number, number]> | - | 是 | 每个元素必须是[经度,纬度] |
| name | 图层名称 | string | '' | 否 | - |
| color | 线条颜色 | string | '#0000ff' | 否 | CSS颜色值 |
| scaling | 是否可缩放 | boolean | true | 否 | - |
| rotation | 是否可旋转 | boolean | true | 否 | - |
| uniform_scaling | 是否等比例缩放 | boolean | true | 否 | - |
| fill | 是否填充(对折线无效) | boolean | false | 否 | 保留属性但实际无效 |
| fill_color | 填充颜色(对折线无效) | string | null | 否 | 保留属性但实际无效 |
| fill_opacity | 填充不透明度(对折线无效) | number | 0.2 | 否 | 保留属性但实际无效 |
| fill_rule | 填充规则(对折线无效) | string | 'evenodd' | 否 | 保留属性但实际无效 |
| transform | 是否可变形 | boolean | false | 否 | - |
| smooth_factor | 平滑强度 | number | 1.0 | 否 | 值越大越平滑 |
| draggable | 是否可拖动 | boolean | false | 否 | - |

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
