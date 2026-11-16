---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# MenuButton 菜单按钮

菜单按钮组件允许指定一个菜单项列表供用户选择，当点击菜单项时触发事件。与其他组件不同，它没有`value`参数，而是有一个`clicked`参数，可以通过监听此参数来触发事件，该参数报告最后点击的菜单项。

底层实现为`panel.widgets.MenuButton`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/MenuButton.html

## 基本用法

基本的菜单按钮使用，定义按钮名称和菜单项列表：菜单项可以是单个字符串或元组，用None分隔为不同组。

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol :height='200'>
  <PnMenuButton name="Dropdown" 
               :items="menu_items" 
               button_type="primary" 
               @click="on_click" />
 </PnCol>
 <p>value: {{ clicked_item.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

menu_items = [
    ('A', 'a'), 
    ('B', 'b'), 
    ('C', 'c'), 
    None, 
    ('Help', 'help'),
]
clicked_item = ref("")

def on_click(event):
    clicked_item.value = event.new
</script>
```

## 分离式菜单

可以使用`split`选项将下拉指示器移动到单独的区域：

在`split`模式下，如果点击按钮本身，将报告`name`参数的值。

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol :height='200'>
  <PnMenuButton name="Split Menu" 
               :split="True"
               :items="menu_items" 
               button_type="primary" 
               @click="on_click" />
 </PnCol>
 <p>value: {{ clicked_item.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

menu_items = [
    ('A', 'a'), 
    ('B', 'b'), 
    ('C', 'c'), 
    None, 
    ('Help', 'help'),
]
clicked_item = ref("")

def on_click(event):
    clicked_item.value = event.new # Split Menu, a, b, c
</script>
```

## 按钮样式

可以通过设置`button_type`来改变按钮的颜色：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol>
    <PnMenuButton v-for="type in button_types" 
                 :name="type" 
                 :button_type="type"
                 :items="menu_items" />
  </PnCol>
</template>
<script lang='py'>
from vuepy import ref

menu_items = [('A', 'a'), ('B', 'b'), ('C', 'c')]
button_types = ['default', 'primary', 'success', 'warning', 'light', 'danger']
</script>
```

## 图标

菜单按钮的名称和菜单项可以包含Unicode字符和表情符号，为常见的图形按钮提供了一种便捷的方式：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol style='height: 200px'>
  <PnRow style="border-bottom: 1px solid black">
    <PnMenuButton name="File" 
                 icon="file" 
                 :items="file_items" 
                 :width="75" 
                 button_type="light" />
    <PnMenuButton name="🧏🏻‍♂️ Help" 
                 :items="help_items" 
                 :width="100" 
                 button_type="light" />
  </PnRow>
 </PnCol>
</template>
<script lang='py'>
from vuepy import ref

file_items = ["\U0001F4BE Save", "🚪 Exit"]
help_items = ["⚖️ License", None, "\U0001F6C8 About"]
</script>
```

对于按钮本身，可以通过提供SVG `icon`值或从[tabler-icons.io](https://tabler-icons.io)加载的命名`icon`来使用更高级的图标：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnMenuButton icon="alert-triangle-filled" 
                  button_type="warning" 
                  :items="['Confirm']">Warning</PnMenuButton>
    <PnMenuButton name="Error" 
                  icon="bug" 
                  button_type="danger" 
                  :items="['Retry']" />
    <PnMenuButton name="Payment" 
                  button_type="success" 
                  icon_size="1.5em"
                  :items="['WeChat']">
     <template #icon>
       <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
         <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
         <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
         <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
         <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
       </svg>
     </template>
    </PnMenuButton>
  </PnRow>
</template>
```

## API

### 属性

| 属性名        | 说明                 | 类型                                                | 默认值 |
| ------------ | ------------------- | -------------------------------------------------- | ------- |
| clicked      | 最后点击的菜单项      | ^[str]                                             | None    |
| items        | 下拉菜单中的菜单项，允许字符串、(标题,值)形式的元组或者None分隔组允许字符串、(标题,值)形式的元组或者None分隔组    | ^[list] | []      |
| split        | 是否为按钮添加单独的下拉区域 | ^[bool]                                      | False   |
| button_style | 按钮样式，'solid'或'outline'  | ^[str]                           | 'solid' |
| button_type  | 按钮主题:'default'、'primary'、'success'、'warning'、'light'或'danger'              | ^[str]  | 'default' |
| icon         | 按钮左侧的图标，SVG字符串或tabler-icons.io图标名称         | ^[str]           | None    |
| icon_size    | 图标大小，如"12px"或"1em"               | ^[str]                            | None    |
| disabled     | 是否禁用组件          | ^[bool]                                            | False   |
| name         | 按钮标题              | ^[str]                                             | ""      |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| click | 当菜单项被点击时触发的事件 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()

menu_items = [('Option A', 'a'), ('Option B', 'b'), ('Option C', 'c'), None, ('Help', 'help')]
menu_button = pn.widgets.MenuButton(name='Dropdown', items=menu_items, button_type='primary')
pn.Row(menu_button.controls, menu_button)
```
