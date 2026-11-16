---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Swipe 滑动对比布局

滑动对比布局使您能够快速比较两个面板，通过滑块控制显示前后两个面板的比例。

底层实现为`panel.layout.Swipe`，参数基本一致，参考文档：https://panel.holoviz.org/reference/layouts/Swipe.html

## 基本用法

Swipe布局可以接受任意两个对象进行比较，为了获得最佳效果，这两个对象应具有相同的尺寸设置。

以下示例比较了1945-1949年和2015-2019年的平均地表温度图像：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnSwipe :before="gis_1945" :after="gis_2015" />
</template>
<script lang='py'>
from vuepy import ref

# URLs of images to compare
gis_1945 = 'https://earthobservatory.nasa.gov/ContentWOC/images/globaltemp/global_gis_1945-1949.png'
gis_2015 = 'https://earthobservatory.nasa.gov/ContentWOC/images/globaltemp/global_gis_2015-2019.png'
</script>
```

## 比较数据可视化

该布局可以比较任何类型的组件，例如，我们可以比较两个小提琴图：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnSwipe :before="plot1" :after="plot2" :value="51" />
</template>
<script lang='py'>
import pandas as pd
import hvplot.pandas
from vuepy import ref

# Load dataset
penguins = pd.read_csv('https://datasets.holoviz.org/penguins/v1/penguins.csv')

# Create plots to compare
plot1 = penguins[penguins.species=='Chinstrap'].hvplot.violin('bill_length_mm', color='#00cde1')
plot2 = penguins[penguins.species=='Adelie'].hvplot.violin('bill_length_mm', color='#cd0000')
</script>
```

## 自定义滑块样式

您可以自定义滑块的宽度和颜色：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnSwipe :before="gis_1945" :after="gis_2015" :slider_width="20" slider_color="red" />
  </PnRow>
</template>
<script lang='py'>
from vuepy import ref

# URLs of images to compare
gis_1945 = 'https://earthobservatory.nasa.gov/ContentWOC/images/globaltemp/global_gis_1945-1949.png'
gis_2015 = 'https://earthobservatory.nasa.gov/ContentWOC/images/globaltemp/global_gis_2015-2019.png'
</script>
```

## API

### 属性

| 属性名        | 说明                            | 类型            | 默认值    |
| ------------ | ------------------------------- | --------------- | --------- |
| before       | 左侧显示的组件                   | ^[any]          | —         |
| after        | 右侧显示的组件                   | ^[any]          | —         |
| value        | 右侧面板显示的百分比              | ^[int]          | 50        |
| slider_width | 滑块的宽度（像素）                | ^[int]          | 12        |
| slider_color | 滑块的颜色                       | ^[str]          | 'black'   |
| width        | 组件宽度                         | ^[int, str]     | —         |
| height       | 组件高度                         | ^[int, str]     | —         |
| margin       | 组件边距                         | ^[int, tuple]   | —         |
| css_classes  | 应用于组件的CSS类                 | ^[list]         | []        |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当滑块值改变时触发     | ^[Callable]`(value: int) -> None`      |

## Controls

```python
##controls
import panel as pn
pn.extension()

gis_1945 = 'https://earthobservatory.nasa.gov/ContentWOC/images/globaltemp/global_gis_1945-1949.png'
gis_2015 = 'https://earthobservatory.nasa.gov/ContentWOC/images/globaltemp/global_gis_2015-2019.png'

s = pn.Swipe(gis_1945, gis_2015)
pn.Column(s.controls)
```
