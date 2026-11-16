---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# VTKVolume 3D体积数据组件

`VTKVolume`组件可渲染定义在规则网格上的3D体积数据。它可以从3D NumPy数组或`vtkVolume`构建。该组件提供了许多交互控制，可以通过Python回调或JavaScript回调设置。

底层实现为`panel.pane.VTKVolume`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/VTKVolume.html

## 基本用法

最简单的创建`PnVTKVolume`组件的方法是使用3D NumPy数组。通过设置spacing参数可以产生一个长方体而不是立方体。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVTKVolume :object="data_matrix" 
               :width="800" 
               :height="600" 
               :spacing="(3, 2, 1)" 
               interpolation="nearest"
               :edge_gradient="0"
               :sampling="0" />
</template>

<script lang='py'>
import numpy as np

# Create a 3D volume data
data_matrix = np.zeros([75, 75, 75], dtype=np.uint8)
data_matrix[0:35, 0:35, 0:35] = 50
data_matrix[25:55, 25:55, 25:55] = 100
data_matrix[45:74, 45:74, 45:74] = 150
</script>
```

或者，该组件也可以从`vtkImageData`对象构建。这种类型的对象可以直接使用vtk或pyvista模块构建：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVTKVolume :object="vol" 
               :height="600" 
               sizing_mode="stretch_width"
               :display_slices="True" />
</template>

<script lang='py'>
import pyvista as pv
from pyvista import examples

# Download a volumetric dataset
vol = examples.download_head()
</script>
```

## 交互控制

`PnVTKVolume`组件公开了许多选项，可以从Python和JavaScript更改。尝试交互式地测试这些参数的效果：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnCol>
      <PnVTKVolume :object="vol" 
                   :height="600" 
                   :display_slices="display_slices.value"
                   :slice_i="slice_i.value"
                   :slice_j="slice_j.value"
                   :slice_k="slice_k.value"
                   :ambient="ambient.value"
                   :diffuse="diffuse.value"
                   :specular="specular.value"
                   :display_slices="display_slices.value" />
    </PnCol>
    <PnCol>
      <PnCheckbox v-model="display_slices.value" name="Display Slices" />
      <PnIntSlider v-model="slice_i.value" 
                name="Slice I" 
                :start="0" 
                :end="vol.dimensions[0]-1" 
                :step="1" />
      <PnIntSlider v-model="slice_j.value" 
                name="Slice J" 
                :start="0" 
                :end="vol.dimensions[1]-1" 
                :step="1" />
      <PnIntSlider v-model="slice_k.value" 
                name="Slice K" 
                :start="0" 
                :end="vol.dimensions[2]-1" 
                :step="1" />
      <PnFloatSlider v-model="ambient.value" 
                name="Ambient" 
                :start="0" 
                :end="1" 
                :step="0.1" />
      <PnFloatSlider v-model="diffuse.value" 
                name="Diffuse" 
                :start="0" 
                :end="1" 
                :step="0.1" />
      <PnFloatSlider v-model="specular.value" 
                name="Specular" 
                :start="0" 
                :end="1" 
                :step="0.1" />
    </PnCol>
  </PnRow>
</template>

<script lang='py'>
import pyvista as pv
from pyvista import examples
from vuepy import ref

# Download a volumetric dataset
vol = examples.download_head()

# Control parameters
display_slices = ref(True)
slice_i = ref(vol.dimensions[0]//2)
slice_j = ref(vol.dimensions[1]//2)
slice_k = ref(vol.dimensions[2]//2)
ambient = ref(0.2)
diffuse = ref(0.7)
specular = ref(0.3)

</script>
```

## API

### 属性

| 属性名               | 说明                                                                | 类型                 | 默认值 |
| ------------------- | ------------------------------------------------------------------- | ------------------- | ------ |
| object              | 可以是3D numpy数组或`vtkImageData`类的实例                            | ^[ndarray\|object]  | —      |
| origin              | 场景中体积的原点                                                      | ^[tuple]            | (0,0,0) |
| spacing             | 定义3个维度中2个相邻体素之间的距离                                      | ^[tuple]            | (1,1,1) |
| render_background   | 定义3D渲染的背景颜色                                                  | ^[str]              | '#52576e' |
| camera              | 反映VTK相机当前状态的字典                                              | ^[dict]             | —      |
| controller_expanded | 展开/折叠视图中的体积控制器面板的布尔值                                 | ^[bool]             | —      |
| orientation_widget  | 在3D窗格中激活/停用方向小部件的布尔值                                   | ^[bool]             | —      |
| colormap            | 用于将像素值转换为颜色的colormap名称                                   | ^[str]              | 'erdc_rainbow_bright' |
| rescale             | 如果设置为True，则colormap在非透明像素的最小值和最大值之间重新缩放        | ^[bool]             | True   |
| display_volume      | 如果设置为True，则使用光线投射显示体积的3D表示                           | ^[bool]             | True   |
| display_slices      | 如果设置为true，则显示三个(X, Y, Z)方向的正交切片                       | ^[bool]             | False  |
| mapper              | 存储有关通过3d视图中的javascript小部件设置的颜色映射器的信息的参数        | ^[dict]             | —      |
| sampling            | 调整用于渲染的样本之间距离的参数                                        | ^[Number]           | 0.4    |
| edge_gradient       | 基于体素之间的梯度调整体积不透明度的参数                                 | ^[Number]           | 0.4    |
| interpolation       | 用于采样体积的插值类型                                                 | ^[str]              | 'fast_linear' |
| shadow              | 如果设置为false，则体积的映射器将不执行阴影计算                          | ^[bool]             | True   |
| ambient             | 控制环境光照的值                                                      | ^[Number]           | 0.2    |
| diffuse             | 控制漫反射光照的值                                                    | ^[Number]           | 0.7    |
| specular            | 控制镜面光照的值                                                      | ^[Number]           | 0.3    |
| specular_power      | 镜面功率指的是光线像镜子一样反射的程度                                  | ^[Number]           | 8.0    |
| slice_i             | 控制垂直于X方向的切片位置的参数                                         | ^[int]              | —      |
| slice_j             | 控制垂直于Y方向的切片位置的参数                                         | ^[int]              | —      |
| slice_k             | 控制垂直于Z方向的切片位置的参数                                         | ^[int]              | —      |
| nan_opacity         | 控制切片中NaN值的不透明度的参数                                         | ^[Number]           | 1      |

### 方法

| 方法名    | 说明                  | 类型                  |
| --------- | --------------------- | --------------------- |
| controls  | 返回控制面板组件       | ^[Callable]`(jslink=bool) -> Panel` |

## Controls

```python
##controls
import panel as pn
pn.extension('vtk')

import numpy as np

data_matrix = np.zeros([75, 75, 75], dtype=np.uint8)
data_matrix[0:35, 0:35, 0:35] = 50
data_matrix[25:55, 25:55, 25:55] = 100
data_matrix[45:74, 45:74, 45:74] = 150

pn.pane.VTKVolume(data_matrix, width=800, height=600, spacing=(3,2,1), interpolation='nearest', edge_gradient=0, sampling=0)

import pyvista as pv
from pyvista import examples

# Download a volumetric dataset
vol = examples.download_head()
volume = pn.pane.VTKVolume(vol, height=600, sizing_mode='stretch_width', display_slices=True)
volume

pn.Row(volume.controls(jslink=True), volume) 
```
