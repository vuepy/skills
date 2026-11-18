---
outline: deep
titleTemplate: :title | VLeaflet
---

### Aswsome Icon 

## 基础用法

```vue
<template>
  <vl-map :center="p">
    <template #layers>
      <vl-marker :location='p' name='awesome icon'>
        <template #icon>
         <vl-awesome-icon name='bus' marker_color='red' icon_color='black'/>
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

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 备注 |
|--------|------|------|--------|------|------|
| name | FontAwesome图标名称 | string | - | 是 | 参考[FontAwesome 4.7图标库](https://fontawesome.com/v4.7.0/icons)，注意：该组件不支持动态更新 |
| marker_color | 图标背景色 | string | 'blue' | 否 | 使用CSS颜色值 |
| icon_color | 图标颜色 | string | 'white' | 否 | 使用CSS颜色值 |
| spin | 是否旋转图标 | boolean | false | 否 | 启用旋转动画效果 |

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
