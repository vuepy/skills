---
outline: deep
titleTemplate: :title | VLeaflet
---

# Scale Control

A control which shows the Map scale.

## 基础用法

```vue
<template>
  <vl-map :center="p">
    <template #controls>
      <vl-scale-control position='topleft'/>
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

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| position | 控件位置 | ^[enum]`'topleft'\|'topright'\|'bottomleft'\|'bottomright'` | 'bottomleft' |
| max_width | 最大宽度 | ^[number] | 100 |
| metric | 是否使用公制单位 | ^[boolean] | true |
| imperial | 是否使用英制单位 | ^[boolean] | false |

### Events

| 事件名 | 说明 | 类型 |
|--------|------|------|

### Slots

| 插槽名 | 说明 |
|--------|------|

### 方法

| 方法名 | 说明 | 类型 |
|--------|------|------|
