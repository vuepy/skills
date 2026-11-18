---
outline: deep
titleTemplate: :title | VLeaflet
---

# Legend Control

## 基础用法

```vue
<template>
  <Button @click='add()'>Add</Button>
  <vl-map :center="p" :zoom-control='False'>
    <template #controls>
      <vl-legend-control :title="title.value" :legend="dict(legend.value)"/>
      <vl-legend-control :title="title.value" :legend="dict(legend_r)"/>
    </template>
  </vl-map>
</template>
<script lang='py'>
from vuepy import ref, reactive

title = ref('Risk')
legend = ref({"low":"#FAA", "medium":"#A55", "High":"#500"})
legend_r = reactive({"low":"#FAA", "medium":"#A55", "High":"#500"})

def add():
    title.value = 'Risk!'
    legend.value['Higher'] = 'black'
    legend_r['Higher'] = 'black'

p = [52.204793, 360.121558]
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| position | 控件位置 | ^[enum]`'topleft'\|'topright'\|'bottomleft'\|'bottomright'` | 'topleft' |
| title | 图例标题 | ^[string] | '图例' |
| legend | 图例项, {'name': 'css_color'}形式| ^[dict] | {} |

### Events

| 事件名 | 说明 | 类型 |
|--------|------|------|

### Slots

| 插槽名 | 说明 |
|--------|------|

### 方法

| 方法名 | 说明 | 类型 |
|--------|------|------|
