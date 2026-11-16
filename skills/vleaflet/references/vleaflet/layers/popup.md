---
outline: deep
titleTemplate: :title | VLeaflet
---

# Popup

## 基础用法

```vue
<template>
  <Button @click='open_or_close()'>popup: open or close</Button>
  <vl-map :center="p" :zoom=9>
    <template #layers>
      <vl-popup name='popup' :location='[52.204793, 360.121558]' ref='popup'>
        <p>popup: {{ loc.value }}</p>
      </vl-popup>
      <vl-marker :location='p' name='marker1' @move='on_move'/>
    </template>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
from vuepy import ref

p = [52.1, 359.9]

loc = ref(str(p))
popup = ref(None)
is_open = True

def open_or_close():
    nonlocal is_open
    if is_open:
        popup.value.close_popup()
    else:
        popup.value.open_popup()
    is_open = not is_open
        

def on_move(**kwargs):
    print(kwargs) # {'event': 'move', 'location': [52, 360]}
    loc.value = str(kwargs)

</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 验证规则 |
|--------|------|------|--------|------|----------|
| location | 弹出框位置[纬度,经度] | [number, number] | [0,0] | 是 | 必须包含2个数字 |
| max_width | 最大宽度(像素) | number | 300 | 否 | - |
| min_width | 最小宽度(像素) | number | 50 | 否 | - |
| max_height | 最大高度(像素) | number | null | 否 | - |
| auto_pan | 是否自动平移地图 | boolean | true | 否 | - |
| auto_pan_padding | 自动平移边距[水平,垂直] | [number, number] | [5,5] | 否 | 像素单位 |
| keep_in_view | 是否保持在视图中 | boolean | false | 否 | - |
| close_button | 是否显示关闭按钮 | boolean | true | 否 | - |
| auto_close | 是否自动关闭 | boolean | true | 否 | 交互时自动关闭 |
| close_on_escape_key | 按ESC键关闭 | boolean | true | 否 | - |
| close_on_click | 点击外部关闭 | boolean | null | 否 | null时自动判断 |
| className | 自定义CSS类名 | string | '' | 否 | - |

### 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| - | - | - |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 弹出框内容 |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| close_popup | 关闭弹出框 | - | void |
| open_popup | 打开弹出框 | location: 可选新位置 | void |
