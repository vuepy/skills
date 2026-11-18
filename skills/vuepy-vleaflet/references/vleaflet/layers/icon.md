---
outline: deep
titleTemplate: :title | VLeaflet
---

# Icon

## 基础用法

```vue
<template>
  <vl-map :center="p">
    <template #layers>
      <vl-marker :location='p' :rotation_angle=90 rotation_origin='22px 94px' name='icon'>
        <template #icon>
         <vl-icon icon_url='https://leafletjs.com/examples/custom-icons/leaf-green.png'
                  :icon_size='[38, 95]' :icon_anchor='[22,94]'/>
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

p = [52.204793, 360.121558]

</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 验证规则 |
|--------|------|------|--------|------|----------|
| icon_url | 图标图片URL | string | - | 是 | 必须为有效URL |
| shadow_url | 阴影图片URL | string | null | 否 | 必须为有效URL |
| icon_size | 图标尺寸[宽,高] | [number, number] | null | 否 | 2个数字的数组(像素) |
| shadow_size | 阴影尺寸[宽,高] | [number, number] | null | 否 | 2个数字的数组(像素) |
| icon_anchor | 图标锚点[x,y] | [number, number] | null | 否 | 2个数字的数组(像素) |
| popup_anchor | 弹出框锚点[x,y] | [number, number] | null | 否 | 2个数字的数组(像素) |
| shadow_anchor | 阴影锚点[x,y] | [number, number] | null | 否 | 2个数字的数组(像素) |

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
