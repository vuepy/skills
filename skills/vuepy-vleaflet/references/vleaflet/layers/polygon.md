---
outline: deep
titleTemplate: :title | VLeaflet
---

# Polygon

## 基础用法

```vue
<template>
  <vl-map :center="[37, -109]" :zoom=5>
    <template #layers>
      <vl-polygon
        :locations="[(37, -100), (43, -100), (43, -90)]"
        :color='color.value',
        :fill='True'
        name='polygon'/>
      <vl-polygon
        :locations="[(30, -110), (35, -110), (35, -122)]"
        :color='color.value',
        :fill='True'
        :transform="True"
        name='editable polygon'/>
      <vl-polygon
        :locations="paths"
        color='red',
        :fill='False'
        name='polygon with holes'/>
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
from vuepy import ref

color = ref('green')
paths = [
    [(37, -109.05), (41, -109.03), (41, -102.05), (37, -102.04)],
    [(37.29, -108.58), (40.71, -108.58), (40.71, -102.50), (37.29, -102.50)],
]

def on_click():
    color.value = 'red'
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 验证规则 |
|--------|------|------|--------|------|----------|
| locations | 多边形顶点坐标数组 | Array<[number, number]> | - | 是 | 每个元素必须是[经度,纬度] |
| name | 图层名称 | string | '' | 否 | - |
| color | 边框颜色 | string | '#0000ff' | 否 | CSS颜色值 |
| scaling | 是否可缩放 | boolean | true | 否 | - |
| rotation | 是否可旋转 | boolean | true | 否 | - |
| uniform_scaling | 是否等比例缩放 | boolean | true | 否 | - |
| fill | 是否填充 | boolean | false | 否 | - |
| fill_color | 填充颜色 | string | null | 否 | CSS颜色值 |
| fill_opacity | 填充不透明度 | number | 0.2 | 否 | 0-1之间 |
| fill_rule | 填充规则 | string | 'evenodd' | 否 | 'evenodd'或'nonzero' |
| transform | 是否可变形 | boolean | false | 否 | 修正原文档False为false |
| smooth_factor | 平滑强度 | number | 1.0 | 否 | - |
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
