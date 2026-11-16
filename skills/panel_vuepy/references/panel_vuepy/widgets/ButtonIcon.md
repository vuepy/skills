---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# ButtonIcon 图标按钮

此小部件最初显示一个默认 `icon` 。点击后，会在指定的 `toggle_duration` 时间内显示 `active_icon`。

例如，可以有效利用 `ButtonIcon` 来实现类似于 `ChatGPT` 的复制到剪贴板按钮的功能。

底层实现为`panel.widgets.ButtonIcon`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/ButtonIcon.html

## 基本用法

基本的图标按钮使用：[tabler-icons.io](https://tabler-icons.io/) 图标

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnColumn>
    <!-- Basic icons -->
    <PnButtonIcon icon="heart" name="favorite" :toggle_duration='1000' />
    <PnButtonIcon icon="heart" size='20px' />
    <PnButtonIcon icon="clipboard" active_icon='check'>copy</PnButtonIcon>
    <PnButtonIcon icon="download" v-model:clicks='count.value'>
     + {{ count.value }}
    </PnButtonIcon>
    
    <!-- With events -->
    <PnButtonIcon icon="refresh" active_icon="check" @click="handle_refresh" />
  </PnColumn>
</template>

<script lang="py">
import asyncio
from vuepy import ref

count = ref(0)

def handle_refresh(event):
    print("Refreshing...")
</script>
```

## 使用SVG图标

可以使用SVG字符串作为图标：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnButtonIcon name='svg icon' :toggle_duration='1000' size='25px'>
    <template #icon>
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-ad-off" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M9 5h10a2 2 0 0 1 2 2v10m-2 2h-14a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2" />
      <path d="M7 15v-4a2 2 0 0 1 2 -2m2 2v4" />
      <path d="M7 13h4" />
      <path d="M17 9v4" />
      <path d="M16.115 12.131c.33 .149 .595 .412 .747 .74" />
      <path d="M3 3l18 18" />
      </svg>
    </template>
    <template #active-icon>
     <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-ad-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
     <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
     <path d="M19 4h-14a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3 -3v-10a3 3 0 0 0 -3 -3zm-10 4a3 3 0 0 1 2.995 2.824l.005 .176v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-1h-2v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-4a3 3 0 0 1 3 -3zm0 2a1 1 0 0 0 -.993 .883l-.007 .117v1h2v-1a1 1 0 0 0 -1 -1zm8 -2a1 1 0 0 1 .993 .883l.007 .117v6a1 1 0 0 1 -.883 .993l-.117 .007h-1.5a2.5 2.5 0 1 1 .326 -4.979l.174 .029v-2.05a1 1 0 0 1 .883 -.993l.117 -.007zm-1.41 5.008l-.09 -.008a.5 .5 0 0 0 -.09 .992l.09 .008h.5v-.5l-.008 -.09a.5 .5 0 0 0 -.318 -.379l-.084 -.023z" stroke-width="0" fill="currentColor" />
     </svg>
    </template>
  </PnButtonIcon>
</template>
```

## 自定义 css style

通过`style`设置组件外层DOM节点(意味着无法设置某些组件内的样式，如background-color，font-size等)的CSS样式:
* `width`、`height` 设置组件的高和宽
* `border` 设置组件的边框
* `size`  设置大小
* ...

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnButtonIcon name="height 60px" :height="60" />
  <PnButtonIcon name="width 30px" :width="30" />
  <PnButtonIcon name='border: 5px solid red;' style='border: 5px solid #FAEBD7;'/>
  <PnButtonIcon :icon="custom_icon" size="2.5em" />
</template>
<script lang='py'>
from vuepy import ref

custom_icon = """
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bulb" 
     width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" 
     fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7"></path>
   <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3"></path>
   <path d="M9.7 17l4.6 0"></path>
</svg>
"""
</script>
```

## API

### 属性

| 属性名        | 说明                 | 类型                                                | 默认值 |
| ------------ | ------------------- | -------------------------------------------------- | ------- |
| icon         | 正常显示的图标（tabler-icons.io图标名称或SVG字符串） | ^[str]            | None    |
| active_icon  | 切换时显示的图标（tabler-icons.io图标名称或SVG字符串） | ^[str]            | None    |
| clicks       | 图标被点击的次数       | ^[int]                                            | 0       |
| toggle_duration | active_icon显示的毫秒数及按钮禁用时间 | ^[int]                            | -       |
| value        | 处理事件时从False切换到True | ^[bool]                                       | False   |
| name         | 小部件的标题           | ^[str]                                            | ""      |
| description  | 悬停时显示的描述        | ^[str]                                            | ""      |
| disabled     | 是否可编辑            | ^[bool]                                           | False   |
| size         | 大小（支持css font-size格式如`1em`, `20px`等） | ^[str]                            | -       |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| click | 当按钮被点击时触发的事件 | ^[Callable]`(event: dict) -> None` |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
|    default     |          按钮文字        |
|    icon |          svg 图标 |

## Controls

```python
##controls
import panel as pn
pn.extension()

button_icon = pn.widgets.ButtonIcon(icon='bell')
pn.Row(button_icon.controls(jslink=True), button_icon) 
```
