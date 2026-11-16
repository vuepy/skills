---
outline: deep
titleTemplate: :title | VLeaflet
---

# Layer Group

## 基础用法

```vue
<template>
  <vl-map :center="[53, 354]" :zoom=5>
    <template #layers>
      <vl-layer-group name='layer group'>
        <vl-rectangle :bounds="[(52, 354), (53, 360)]"/>
        <vl-circle :location="(50, 370)" :radius="50000"/>
        <vl-marker :location="(50, 354)"/>
      </vl-layer-group>
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 |
|--------|------|------|--------|------|
| name | 图层组名称 | string | '' | 否 |

### 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| - | - | - |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 自定义图层内容 |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| add | 添加图层到组 | layer: 图层对象 | void |
| clear | 清空所有图层 | - | void |
| remove | 移除指定图层 | rm_layer: 要移除的图层 | void |
| substitute | 替换图层 | old: 旧图层<br>new_: 新图层 | void |
