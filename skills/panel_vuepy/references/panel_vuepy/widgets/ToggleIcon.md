---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# ToggleIcon 图标切换

图标切换组件允许在`True`/`False`状态之间切换一个条件，类似于`Checkbox`和`Toggle`组件，但使用图标来表示状态。

底层实现为`panel.widgets.ToggleIcon`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/ToggleIcon.html

## 基本用法

基本的图标切换组件使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnToggleIcon size="4em" 
               description="favorite desc" 
               name="favorite" 
               v-model='is_toggled.value'/>
  <p>value: {{ is_toggled.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

is_toggled = ref(False)
</script>
```

## 自定义图标

可以自定义默认图标和激活状态图标：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnToggleIcon icon="thumb-down" 
                 active_icon="thumb-up" 
                 size="3em" />
    <PnToggleIcon icon="bell" 
                 active_icon="bell-ringing" 
                 size="3em" />
    <PnToggleIcon icon="star" 
                 active_icon="star-filled" 
                 size="3em" />
  </PnRow>
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## 使用SVG图标

可以使用SVG字符串作为图标：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnToggleIcon size="3em">
  <template #icon>
   <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-ad-off" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h10a2 2 0 0 1 2 2v10m-2 2h-14a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2" /><path d="M7 15v-4a2 2 0 0 1 2 -2m2 2v4" /><path d="M7 13h4" /><path d="M17 9v4" /><path d="M16.115 12.131c.33 .149 .595 .412 .747 .74" /><path d="M3 3l18 18" /></svg>
  </template>                  
  <template #active-icon>
   <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-ad-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 4h-14a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3 -3v-10a3 3 0 0 0 -3 -3zm-10 4a3 3 0 0 1 2.995 2.824l.005 .176v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-1h-2v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-4a3 3 0 0 1 3 -3zm0 2a1 1 0 0 0 -.993 .883l-.007 .117v1h2v-1a1 1 0 0 0 -1 -1zm8 -2a1 1 0 0 1 .993 .883l.007 .117v6a1 1 0 0 1 -.883 .993l-.117 .007h-1.5a2.5 2.5 0 1 1 .326 -4.979l.174 .029v-2.05a1 1 0 0 1 .883 -.993l.117 -.007zm-1.41 5.008l-.09 -.008a.5 .5 0 0 0 -.09 .992l.09 .008h.5v-.5l-.008 -.09a.5 .5 0 0 0 -.318 -.379l-.084 -.023z" stroke-width="0" fill="currentColor" /></svg>
  </template>                  
</PnToggleIcon>
</template>
```

## API

### 属性

| 属性名       | 说明                 | 类型                                         | 默认值 |
| ----------- | ------------------- | ------------------------------------------- | ------- |
| active_icon | 切换开启时显示的图标   | ^[str] tabler-icons.io图标名称或SVG字符串    | —       |
| icon        | 切换关闭时显示的图标   | ^[str] tabler-icons.io图标名称或SVG字符串    | —       |
| value       | 切换的状态            | ^[bool]                                     | False   |
| description | 鼠标悬停时显示的描述   | ^[str]                                       | —      |
| disabled    | 是否禁用组件          | ^[bool]                                      | False  |
| name        | 组件标题              | ^[str]                                       | ""     |
| size        | 图标大小              | ^[str] CSS字体大小值，如'1em'或'20px'         | —      |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当切换状态变化时触发的事件 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()

toggle = pn.widgets.ToggleIcon(size="4em", description="favorite")
pn.Row(toggle.controls(jslink=True), toggle)
```
