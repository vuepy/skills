---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Folium 地图

`PnFolium` 组件渲染 [folium](http://python-visualization.github.io/folium/) 交互式地图。

底层实现为`panel.pane.plot.Folium`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/Folium.html

## 基本用法

`PnFolium` 组件使用 `folium` 提供的内置 HTML 表示来渲染地图：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnFolium :object="m" :width='400' :height="400" />
</template>
<script lang='py'>
import folium

m = folium.Map(location=[52.51, 13.39], zoom_start=12)
</script>
```

## 更新地图

与任何其他组件一样，可以通过设置 `object` 参数来更新 `PnFolium` 组件的视图：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnFolium :object="m" :width='400' :height="400" ref="folium_pane" />
  <PnButton @click="add_marker()">添加标记</PnButton>
</template>
<script lang='py'>
from vuepy import ref
import folium

folium_pane = ref(None)
m = folium.Map(location=[52.51, 13.39], zoom_start=12)

def add_marker():
    # Add a marker to the map
    folium.Marker(
        [52.516, 13.381], popup="<i>Brandenburg Gate</i>", tooltip="Click me!"
    ).add_to(m)
    
    # Update the Folium pane
    folium_pane.value.unwrap().object = m
</script>
```

## API

### 属性

| 属性名      | 说明                 | 类型                                                           | 默认值 |
| ---------- | ------------------- | ---------------------------------------------------------------| ------- |
| object     | 要显示的 Folium 对象  | ^[object]                                                      | None |
| sizing_mode | 尺寸调整模式         | ^[str]                                                         | 'fixed'  |
| width      | 宽度                 | ^[int, str]                                                    | None    |
| height     | 高度                 | ^[int, str]                                                    | None    |
| min_width  | 最小宽度             | ^[int]                                                         | None    |
| min_height | 最小高度             | ^[int]                                                         | None    |
| max_width  | 最大宽度             | ^[int]                                                         | None    |
| max_height | 最大高度             | ^[int]                                                         | None    |
| margin     | 外边距               | ^[int, tuple]                                                  | 5       |
| css_classes | CSS类名列表          | ^[list]                                                        | []      |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

## Controls
