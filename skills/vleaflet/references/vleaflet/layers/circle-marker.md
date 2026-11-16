---
outline: deep
titleTemplate: :title | VLeaflet
---

# Circle Marker

## 基础用法

```vue
<template>
  <Button @click='on_click()'>Switch color</Button>
  <vl-map :center="[53, 354]" :zoom=5>
    <template #layers>
      <vl-circle-marker
        :location="(50, 360)"
        :radius="50"
        :color='color.value',
        :fill='False'
        name='circle marker'/>
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
from vuepy import ref

color = ref('green')

def on_click():
    color.value = 'red'
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 验证规则 |
|--------|------|------|--------|------|----------|
| location | 标记位置[纬度,经度] | [float, float] | [0,0] | 是 | 必须为包含2个数字的数组 |
| radius | 圆半径(像素) | number | - | 是 | 必须为数字 |
| name | 图层名称 | string | '' | 否 | - |
| color | 边框颜色 | string | '#0000ff' | 否 | CSS颜色值 |
| scaling | 是否可缩放 | boolean | true | 否 | - |
| rotation | 是否可旋转 | boolean | true | 否 | - |
| uniform_scaling | 是否保持比例缩放 | boolean | true | 否 | - |
| fill | 是否填充 | boolean | false | 否 | - |
| fill_color | 填充颜色 | string | null | 否 | CSS颜色值 |
| fill_opacity | 填充不透明度 | number | 0.2 | 否 | 0-1之间的值 |
| fill_rule | 填充规则 | string | 'evenodd' | 否 | 'evenodd'或'nonzero' |
| transform | 是否可变形 | boolean | false | 否 | - |
| smooth_factor | 平滑强度 | number | 1.0 | 否 | - |
| draggable | 是否可拖动 | boolean | false | 否 | - |

### 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|

### 插槽

| 插槽名 | 说明 |
|--------|------|

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
