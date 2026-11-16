---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Button 按钮

常用的操作按钮。

按钮组件可以在被点击时触发事件。除了在处理点击事件期间会从`False`切换到`True`的`value`参数外，还有一个额外的`clicks`参数，可以被监听以订阅点击事件。

底层实现为`panel.widgets.Button`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/Button.html

## 基本用法

基本的按钮使用，点击时触发事件：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnButton button_type="primary" @click="update_clicks()">
    click: {{ clicks.value }} 
  </PnButton>
</template>
<script lang='py'>
from vuepy import ref

clicks = ref(0)

def update_clicks():
    clicks.value += 1
</script>
```

## 按钮样式

按钮的颜色可以通过设置`button_type`来改变，而`button_style`可以是`'solid'`或`'outline'`：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnCol v-for="style in ['solid', 'outline']">
      <PnButton v-for="type in button_types" 
                :name="type" 
                :button_type="type" 
                :button_style="style" 
                style="margin: 5px" />
    </PnCol>
  </PnRow>
</template>
<script lang='py'>
from vuepy import ref

button_types = ['default', 'primary', 'success', 'warning', 'danger', 'light']
</script>
```

## 图标按钮

Button 组件可以添加图标，支持 Unicode、Emoji 字符，以及 [tabler-icons.io](https://tabler-icons.io) 的命名图标或自定义 SVG：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <!-- emoji -->
  <PnButton name="🔍" :width="100" />
  <PnButton :width="100">💾 Save</PnButton>
  <PnButton name="Copy ✂️" :width="100" />
  
  <!-- tabler-icons -->
  <PnButton icon="alert-triangle" />
  <PnButton icon="bug" />

  <!-- svg -->
  <PnButton name='svg icon'>
    <template #icon>
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
        <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
      </svg>
    </template>
  </PnButton>
</template>
<script lang='py'>
from vuepy import ref

cash_icon = """
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
  <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
  <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
</svg>
"""
</script>
```

## 加载状态按钮

通过设置 loading 属性为 true 来显示加载中状态。  

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnButton loading>Loading</PnButton>
  <PnButton @click="click1">Click to Loading</PnButton>
</template>
<script lang="py">
from vuepy import ref

def click1(ev):
    btn = ev.obj
    btn.loading = not btn.loading
</script>
```

## 自定义 css style

通过`style`设置组件外层DOM节点(意味着无法设置某些组件内的样式，如background-color，font-size等)的CSS样式:
* `width`、`height` 设置组件的高和宽
* `border` 设置组件的边框
* ...

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <HBox>
    <PnButton name="height 60px" style="height: 60px" />
    <PnButton name="width 90px" style="width: 90px" />
    <PnButton name="border: 5px solid red;" style="border: 5px solid #FAEBD7;" />
  </HBox>
</template>
```

## API

### 属性

| 属性名         | 说明                    | 类型                                | 默认值     |
| ------------- | ----------------------- | ---------------------------------- | --------- |
| button_style  | 按钮样式                | ^[str]`'solid','outline'`          | 'solid'   |
| button_type   | 按钮主题                | ^[str]`'default'、'primary'、'success'、'info'、'light'、'danger'` | 'default' |
| clicks        | 点击次数                | ^[int]                             | 0         |
| disabled      | 是否禁用                | ^[bool]                            | False     |
| icon          | 按钮图标(SVG字符串或tabler-icons.io图标名称)               | ^[str] | None     |
| icon_size     | 图标大小(如"12px"或"1em")                | ^[str]              | None      |
| name          | 按钮标题/文本           | ^[str]                             | ""        |
| value         | 按钮值，处理点击事件时切换 | ^[bool]                          | False     |
| description   | 鼠标悬停时显示的描述     | ^[str]                             | ""        |

### Events

| 事件名  | 说明                | 类型                        |
| ------ | ------------------ | --------------------------- |
| click  | 当按钮被点击时触发的事件 | ^[Callable]`(Event) -> None`    |

### Slots

| 插槽名   | 说明               |
| ------- | ----------------- |
|    default     |          按钮文字        |
|    icon |          svg 图标 |

## Controls

```python
##controls
import panel as pn
pn.extension()

button = pn.widgets.Button(name='Click me', button_type='primary')
pn.Row(button.controls, button)
```
