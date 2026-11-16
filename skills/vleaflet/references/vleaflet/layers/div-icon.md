---
outline: deep
titleTemplate: :title | VLeaflet
---

# DivIcon

## 基础用法

```vue
<template>
  <vl-map :center="p">
    <template #layers>
      <vl-marker :location='p' name='div icon' @move='on_move'>
        <template #icon>
          <vl-div-icon :icon_size='[100, 100]' :icon_anchor='[22,94]'>
            <p>hello</p>
          </vl-div-icon>
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

loc = ref('')

def on_move(**kwargs):
    print(kwargs)
    loc.value = str(kwargs)

</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 验证规则 |
|--------|------|------|--------|------|----------|
| html | 自定义HTML内容 | string | '' | 否 | - |
| icon_size | 图标大小[宽,高](像素) | [number, number] | null | 否 | 必须为包含2个数字的数组 |
| icon_anchor | 图标锚点坐标[x,y] | [number, number] | null | 否 | 必须为包含2个数字的数组 |
| popup_anchor | 弹出框锚点坐标[x,y] | [number, number] | null | 否 | 必须为包含2个数字的数组 |
| bg_pos | 背景相对位置[x,y](像素) | [number, number] | [0,0] | 否 | 必须为包含2个数字的数组 |

### 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| - | - | - |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 自定义图标内容 |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| - | - | - | - |
