---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# VTK 三维可视化

`PnVTK` 组件可以在 Panel 应用程序中渲染 VTK 场景，使得可以与复杂的 3D 几何体进行交互。
它允许在 Python 端定义的 `vtkRenderWindow` 与通过 vtk-js 在组件中显示的窗口之间保持状态同步。
在这种情况下，Python 充当服务器，向客户端发送有关场景的信息。
同步只在一个方向进行：Python => JavaScript。在 JavaScript 端所做的修改不会反映回 Python 的 `vtkRenderWindow`。

底层实现为`panel.pane.VTK`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/VTK.html

## 基本用法

与直接使用 `VTK` 相比，在 Panel 中使用它有一些区别。由于 VTK 面板处理对象的渲染和与视图的交互，我们不需要调用 `vtkRenderWindow` 的 `Render` 方法（这会弹出传统的 VTK 窗口），也不需要指定 `vtkRenderWindowInteractor`。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnVTK :object="ren_win" :width="500" :height="500" />
</template>
<script lang='py'>
import vtk
from vtk.util.colors import tomato

# 创建一个具有八个周向面的多边形圆柱体模型
cylinder = vtk.vtkCylinderSource()
cylinder.SetResolution(8)

# 映射器负责将几何体推送到图形库中
# 它还可以进行颜色映射（如果定义了标量或其他属性）
cylinder_mapper = vtk.vtkPolyDataMapper()
cylinder_mapper.SetInputConnection(cylinder.GetOutputPort())

# actor 是一种分组机制：除了几何体（映射器），它还有属性、变换矩阵和/或纹理映射
# 这里我们设置它的颜色并旋转 -22.5 度
cylinder_actor = vtk.vtkActor()
cylinder_actor.SetMapper(cylinder_mapper)
cylinder_actor.GetProperty().SetColor(tomato)
# 我们必须将 ScalarVisibilty 设置为 0 以使用 tomato 颜色
cylinder_mapper.SetScalarVisibility(0)
cylinder_actor.RotateX(30.0)
cylinder_actor.RotateY(-45.0)

# 创建图形结构。渲染器渲染到渲染窗口中
ren = vtk.vtkRenderer()
ren_win = vtk.vtkRenderWindow()
ren_win.AddRenderer(ren)

# 将 actor 添加到渲染器，设置背景和大小
ren.AddActor(cylinder_actor)
ren.SetBackground(0.1, 0.2, 0.4)
</script>
```

我们还可以向场景添加其他 actor，然后调用 `synchronize` 方法来更新组件：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVTK :object="ren_win" :width="500" :height="500" ref="vtk_pane_ref" />
  <PnButton @click="add_sphere()">添加球体</PnButton>
</template>
<script lang='py'>
from vuepy import ref
import vtk
from vtk.util.colors import tomato

vtk_pane_ref = ref(None)

# 创建一个具有八个周向面的多边形圆柱体模型
cylinder = vtk.vtkCylinderSource()
cylinder.SetResolution(8)

# 映射器负责将几何体推送到图形库中
cylinder_mapper = vtk.vtkPolyDataMapper()
cylinder_mapper.SetInputConnection(cylinder.GetOutputPort())

# actor 是一种分组机制
cylinder_actor = vtk.vtkActor()
cylinder_actor.SetMapper(cylinder_mapper)
cylinder_actor.GetProperty().SetColor(tomato)
cylinder_mapper.SetScalarVisibility(0)
cylinder_actor.RotateX(30.0)
cylinder_actor.RotateY(-45.0)

# 创建图形结构
ren = vtk.vtkRenderer()
ren_win = vtk.vtkRenderWindow()
ren_win.AddRenderer(ren)

# 将 actor 添加到渲染器，设置背景
ren.AddActor(cylinder_actor)
ren.SetBackground(0.1, 0.2, 0.4)

def add_sphere():
    sphere = vtk.vtkSphereSource()
    
    sphere_mapper = vtk.vtkPolyDataMapper()
    sphere_mapper.SetInputConnection(sphere.GetOutputPort())
    
    sphere_actor = vtk.vtkActor()
    sphere_actor.SetMapper(sphere_mapper)
    sphere_actor.GetProperty().SetColor(tomato)
    sphere_mapper.SetScalarVisibility(0)
    sphere_actor.SetPosition(0.5, 0.5, 0.5)
    
    ren.AddActor(sphere_actor)
    vtk_pane = vtk_pane_ref.value.unwrap()
    vtk_pane.reset_camera()
    vtk_pane.synchronize()
</script>
```

## 与 PyVista 集成

这些示例大多使用 [PyVista](https://docs.pyvista.org/) 库作为 VTK 的便捷接口。

虽然这些示例通常可以重写为仅依赖于 VTK 本身，但 `pyvista` 支持简洁的 Python 语法，用于处理 VTK 对象所需的主要功能。

例如，上面的 VTK 示例可以使用 PyVista 重写如下：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnVTK :object="plotter.ren_win" :width="500" :height="500" />
</template>
<script lang='py'>
import pyvista as pv
from vtk.util.colors import tomato

# 创建 PyVista plotter
plotter = pv.Plotter()
plotter.background_color = (0.1, 0.2, 0.4)

# 创建并添加对象到 PyVista plotter
pvcylinder = pv.Cylinder(resolution=10, direction=(0, 1, 0))
cylinder_actor = plotter.add_mesh(pvcylinder, color=tomato, smooth_shading=True)
cylinder_actor.RotateX(30.0)
cylinder_actor.RotateY(-45.0)
</script>
```

## 导出场景

场景可以导出，生成的文件可以由官方的 vtk-js 场景导入器加载：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVTK :object="plotter.ren_win" :width="500" :height="500" ref="vtk_pane_ref" />
  <PnButton @click="export_scene()">导出场景</PnButton>
  <div v-if="filename.value">导出的文件：{{ filename.value }}</div>
</template>
<script lang='py'>
import os
import pyvista as pv
from vuepy import ref
from vtk.util.colors import tomato

filename = ref("")
vtk_pane_ref = ref(None)

# 创建 PyVista plotter
plotter = pv.Plotter()
plotter.background_color = (0.1, 0.2, 0.4)

# 创建并添加对象到 PyVista plotter
pvcylinder = pv.Cylinder(resolution=8, direction=(0, 1, 0))
cylinder_actor = plotter.add_mesh(pvcylinder, color=tomato, smooth_shading=True)
cylinder_actor.RotateX(30.0)
cylinder_actor.RotateY(-45.0)

def export_scene():
    vtk_pane = vtk_pane_ref.value.unwrap()
    exported_filename = vtk_pane.export_scene(filename='vtk_example')
    filename.value = os.path.join(os.getcwd(), exported_filename)
</script>
```

## 高级用法和交互性

### 键盘绑定和方向部件

`PnVTK` 组件支持键盘绑定和方向部件，以增强用户交互体验：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnVTK 
    :object="plotter.ren_win" 
    :width="500" 
    :height="500" 
    :enable_keybindings="True"
    :orientation_widget="True" />
</template>
<script lang='py'>
import pyvista as pv
from vtk.util.colors import tomato

# 创建 PyVista plotter
plotter = pv.Plotter()
plotter.background_color = (0.1, 0.2, 0.4)

# 创建并添加对象到 PyVista plotter
pvcylinder = pv.Cylinder(resolution=8, direction=(0, 1, 0))
cylinder_actor = plotter.add_mesh(pvcylinder, color=tomato, smooth_shading=True)
cylinder_actor.RotateX(30.0)
cylinder_actor.RotateY(-45.0)
</script>
```

键盘绑定允许用户使用以下键:
- s: 将所有 actor 表示设置为*表面*
- w: 将所有 actor 表示设置为*线框*
- v: 将所有 actor 表示设置为*顶点*
- r: 居中 actor 并移动相机，使所有 actor 可见

## 添加坐标轴

使用 `axes` 参数可以在 3D 视图中显示坐标轴：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVTK 
    :object="plotter.ren_win" 
    :width="500" 
    :height="500" 
    :axes="axes" />
</template>
<script lang='py'>
import numpy as np
import pyvista as pv
from vtk.util.colors import tomato

# 创建 PyVista plotter
plotter = pv.Plotter()
plotter.background_color = (0.1, 0.2, 0.4)

# 创建并添加对象到 PyVista plotter
pvcylinder = pv.Cylinder(resolution=8, direction=(0, 1, 0))
cylinder_actor = plotter.add_mesh(pvcylinder, color=tomato, smooth_shading=True)
cylinder_actor.RotateX(30.0)
cylinder_actor.RotateY(-45.0)

# 定义坐标轴
axes = {
    'origin': [-5, 5, -2],
    'xticker': {'ticks': np.linspace(-5, 5, 5).tolist()},
    'yticker': {'ticks': np.linspace(-5, 5, 5).tolist()},
    'zticker': {'ticks': np.linspace(-2, 2, 5).tolist(), 
                'labels': [''] + [str(int(item)) for item in np.linspace(-2, 2, 5)[1:]]},
    'fontsize': 12,
    'digits': 1,
    'show_grid': True,
    'grid_opacity': 0.5,
    'axes_opacity': 1.0
}
</script>
```

## API

### 属性

| 属性名                      | 说明                          | 类型                                                           | 默认值 |
| -------------------------- | ----------------------------- | ---------------------------------------------------------------| ------- |
| object                        | `vtkRenderWindow` 实例        | ^[vtkRenderWindow]                                             | None |
| axes                       | 在 3D 视图中构造的坐标轴的参数字典。必须至少包含 `xticker`、`yticker` 和 `zticker` | ^[dict]    | None |
| camera                     | 反映 VTK 相机当前状态的字典      | ^[dict]                                                       | None |
| enable_keybindings         | 激活/禁用键盘绑定的布尔值。绑定的键有：s（将所有 actor 表示设置为*表面*）、w（将所有 actor 表示设置为*线框*）、v（将所有 actor 表示设置为*顶点*）、r（居中 actor 并移动相机，使所有 actor 可见） | ^[boolean] | False |
| orientation_widget         | 激活/禁用 3D 面板中的方向部件的布尔值 | ^[boolean]                                                  | False |
| interactive_orientation_widget | 如果为 True，则方向部件可点击并允许将场景旋转到正交投影之一 | ^[boolean]                | False |
| sizing_mode                | 尺寸调整模式                   | ^[str]                                                         | 'fixed'  |
| width                      | 宽度                          | ^[int, str]                                                    | None    |
| height                     | 高度                          | ^[int, str]                                                    | None    |
| min_width                  | 最小宽度                      | ^[int]                                                         | None    |
| min_height                 | 最小高度                      | ^[int]                                                         | None    |
| max_width                  | 最大宽度                      | ^[int]                                                         | None    |
| max_height                 | 最大高度                      | ^[int]                                                         | None    |
| margin                     | 外边距                        | ^[int, tuple]                                                  | 5       |
| css_classes                | CSS类名列表                   | ^[list]                                                        | []      |

### 属性值

* **`actors`**：返回场景中的 vtkActors 列表
* **`vtk_camera`**：返回组件持有的渲染器的 vtkCamera

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

### 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| set_background | 设置场景背景颜色为 RGB 颜色 | r: float, g: float, b: float |
| synchronize | 同步 Python 端 `vtkRenderWindow` 对象状态与 JavaScript | 无 |
| unlink_camera | 创建一个新的 vtkCamera 对象，允许面板拥有自己的相机 | 无 |
| link_camera | 设置两个面板共享相同的相机 | other: VTK |
| export_scene | 导出场景并生成可以被官方 vtk-js 场景导入器加载的文件 | filename: str |

## Controls

```python
##controls
import panel as pn
import vtk
from vtk.util.colors import tomato

pn.extension('vtk')

# 创建一个具有八个周向面的多边形圆柱体模型
cylinder = vtk.vtkCylinderSource()
cylinder.SetResolution(8)

# 映射器负责将几何体推送到图形库中
cylinder_mapper = vtk.vtkPolyDataMapper()
cylinder_mapper.SetInputConnection(cylinder.GetOutputPort())

# actor 是一种分组机制
cylinder_actor = vtk.vtkActor()
cylinder_actor.SetMapper(cylinder_mapper)
cylinder_actor.GetProperty().SetColor(tomato)
cylinder_mapper.SetScalarVisibility(0)
cylinder_actor.RotateX(30.0)
cylinder_actor.RotateY(-45.0)

# 创建图形结构
ren = vtk.vtkRenderer()
renWin = vtk.vtkRenderWindow()
renWin.AddRenderer(ren)

# 将 actor 添加到渲染器，设置背景
ren.AddActor(cylinder_actor)
ren.SetBackground(0.1, 0.2, 0.4)

v = pn.pane.VTK(renWin, width=500, height=500)
pn.Column(v, v.controls)
```
