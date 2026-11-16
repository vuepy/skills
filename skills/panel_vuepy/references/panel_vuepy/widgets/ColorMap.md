---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# ColorMap 色彩映射选择器

ColorMap组件允许从包含色彩映射的字典中选择一个值。该组件类似于Select选择器，但只允许选择有效的色彩映射，即十六进制值列表、命名颜色或matplotlib色彩映射。

底层实现为`panel.widgets.ColorMap`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/ColorMap.html

## 基本用法

色彩映射选择器可以提供色彩映射选项让用户进行选择，选项必须是一个包含色彩列表的字典。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <p>选择的色彩映射: {{selected_map.value}}</p>
  <PnRow :height='200'>
    <PnColorMap 
      :options="cmaps" 
      value_name="Reds" 
      style="width: 200px;"
      v-model="selected_map.value"
      @change="on_change"
    />
  </PnRow>
</template>
<script lang='py'>
from vuepy import ref

cmaps = {
    'Reds': ['lightpink', 'red', 'darkred'],
    'Blues': ['rgba(0, 0, 255, 1)', 'rgba(0, 0, 170, 1)', 'rgba(0, 0, 85, 1)'],
    'Greens': ['#00ff00', '#00aa00', '#004400'],
}

selected_map = ref(['lightpink', 'red', 'darkred'])

def on_change(event):
    print(f"{event.new}") # ['#00ff00', '#00aa00', '#004400']
</script>
```

## 自定义布局

可以通过设置`ncols`参数以及`swatch_width`和`swatch_height`选项来控制色彩映射的显示方式。

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol :height='300'>
  <PnColorMap 
    :options="cc_palette" 
    :ncols="3" 
    :swatch_width="100"
    v-model="selected_palette.value"
  />
 </PnCol>
</template>
<script lang='py'>
from vuepy import ref
import colorcet as cc

cc_palette = cc.palette
selected_palette = ref(cc.b_circle_mgbm_67_c31)
</script>
```

## Matplotlib支持

组件也支持matplotlib色彩映射：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol :height='200'>
  <PnColorMap 
    :options="mpl_maps" 
    v-model="selected_mpl.value"
  />
</PnCol>
</template>
<script lang='py'>
from vuepy import ref
from matplotlib.cm import Reds, Blues, Greens

mpl_maps = {'Reds': Reds, 'Blues': Blues, 'Greens': Greens}
selected_mpl = ref(Reds)
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| options | 色彩映射选项，必须是一个包含色彩列表的字典 | ^[dict] | — |
| ncols | 列数 | ^[int] | 1 |
| swatch_height | 色彩样本高度 | ^[int] | 20 |
| swatch_width | 色彩样本宽度 | ^[int] | 100 |
| value | 当前选中的值 | ^[list[str]] | — |
| value_name | 选定的色彩映射名称 | ^[str] | — |
| disabled | 是否禁用 | ^[boolean] | false |
| name | 组件标题 | ^[str] | — |

### Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| change | 当选择改变时触发 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()

cmaps = {
    'Reds': ['lightpink', 'red', 'darkred'],
    'Blues': ['rgba(0, 0, 255, 1)', 'rgba(0, 0, 170, 1)', 'rgba(0, 0, 85, 1)'],
    'Greens': ['#00ff00', '#00aa00', '#004400']
}

color_map = pn.widgets.ColorMap(options=cmaps, value_name='Reds', width=200, margin=(0, 0, 100, 0))

pn.Row(color_map.controls(jslink=True), color_map) 
```
