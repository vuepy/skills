---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Toggle 切换开关

切换开关组件允许在`True`/`False`状态之间切换单一条件。Toggle、Checkbox和Switch组件功能类似，可互相替换。

底层实现为`panel.widgets.Toggle`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/Toggle.html

## 基本用法

基本的切换开关使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnToggle name="切换开关" button_type="success" 
            v-model='is_toggled.value'/>
  <p>value: {{ is_toggled.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

is_toggled = ref(False)
</script>
```

## 样式

按钮的颜色可以通过设置`button_type`来改变，而`button_style`可以是`'solid'`或`'outline'`：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnCol v-for="style in ['solid', 'outline']">
      <PnToggle v-for="type in button_types" 
                :name="f'{type}-{style}'"
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

## 图标

Toggle组件可以添加图标，支持Unicode、Emoji字符，以及 [tabler-icons.io](https://tabler-icons.io) 的命名图标或自定义SVG：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnToggle :name="u'\u25c0'" :width="50" />
    <PnToggle :name="u'\u25b6'" :width="50" />
    <PnToggle name="🔍" :width="100" />
    <PnToggle name="▶️ 播放" :width="100" />
    <PnToggle name="暂停 ⏸️" :width="100" />
  </PnRow>
  
  <PnRow>
    <PnToggle icon="alert-triangle-filled" button_type="warning" name="警告" />
    <PnToggle icon="2fa" button_type='light' icon_size='2em' />
  </PnRow>
  
  <PnToggle button_type='success' name='随机播放' icon_size='2em'>
    <template #icon>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrows-shuffle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M18 4l3 3l-3 3" />
      <path d="M18 20l3 -3l-3 -3" />
      <path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5" />
      <path d="M21 7h-5a4.978 4.978 0 0 0 -3 1m-4 8a4.984 4.984 0 0 1 -3 1h-3" />
    </svg>
    </template>
  </PnToggle>
</template>
```

## API

### 属性

| 属性名         | 说明                    | 类型                                | 默认值     |
| ------------- | ----------------------- | ---------------------------------- | --------- |
| button_style  | 按钮样式                | ^[str] 'solid'或'outline'          | 'solid'   |
| button_type   | 按钮主题                | ^[str] 'default'、'primary'、'success'、'info'或'danger' | 'default' |
| icon          | 按钮图标                | ^[str] SVG字符串或tabler-icons.io图标名称 | None     |
| icon_size     | 图标大小                | ^[str] 如"12px"或"1em"             | None      |
| value         | 按钮是否切换            | ^[bool]                            | False     |
| disabled      | 是否禁用                | ^[bool]                            | False     |
| name          | 按钮标题/文本           | ^[str]                             | ""        |
| description   | 鼠标悬停时显示的描述     | ^[str]                             | ""        |

### Events

| 事件名  | 说明                | 类型                          |
| ------ | ------------------ | ----------------------------- |
| change | 当状态改变时触发的事件 | ^[Callable]`(value) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()

toggle = pn.widgets.Toggle(name='Toggle', button_type='success')
pn.Row(toggle.controls, toggle) 
```
