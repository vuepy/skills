---
outline: deep
titleTemplate: :title | VLeaflet
---

# Fullscreen Control

## 基础用法

```vue
<template>
  <vl-map :center="p">
    <template #controls>
      <vl-fullscreen-control position='topleft'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
from vuepy import ref

p = [52.204793, 360.121558]
</script>
```

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| position | 控件位置 | ^[enum]`'topleft'\|'topright'\|'bottomleft'\|'bottomright'` | 'topleft' |
| title | 全屏按钮标题 | ^[string] | '全屏' |
| title_cancel | 全屏退出按钮标题 | ^[string] | '全屏' |

### Events

| 事件名 | 说明 | 类型 |
|--------|------|------|

### Slots

| 插槽名 | 说明 |
|--------|------|

### 方法

| 方法名 | 说明 | 类型 |
|--------|------|------|
