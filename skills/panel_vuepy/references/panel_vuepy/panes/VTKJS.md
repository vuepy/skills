---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# VTKJS 三维模型

`PnVTK` 组件可以在 Panel 应用程序中渲染 vtk.js 文件，使得可以加载和交互复杂的 3D 几何体。

底层实现为`panel.pane.VTK`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/VTKJS.html

## 基本用法

构造 `PnVTKJS` 组件最简单的方法是给它一个 vtk.js 文件，它将序列化并嵌入到图表中。`PnVTKJS` 组件还支持 Bokeh 提供的常规尺寸选项，包括响应式尺寸模式。也可以通过替换 `object` 来更新模型。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVTK
    :object="vtkjs_url.value" 
    sizing_mode="stretch_width" 
    :height="400" 
    :enable_keybindings="True" 
    :orientation_widget="True"
  />
  <PnButton @click="update_object()">更换 3D 模型</PnButton>
</template>
<script lang='py'>
from vuepy import ref

vtkjs_url = ref("https://raw.githubusercontent.com/Kitware/vtk-js/master/Data/StanfordDragon.vtkjs")

def update_object():
    vtkjs_url.value = "https://raw.githubusercontent.com/Kitware/vtk-js-datasets/master/data/vtkjs/TBarAssembly.vtkjs"
</script>
```

## 相机控制

一旦显示了 VTKJS 组件，它将自动将相机状态与组件对象同步。相机参数仅在交互结束时更新。我们可以在相应的参数上读取相机状态：

```vue
<!-- --plugins vpanel --show-code --codegen-backend='panel' -->
<template>
  <PnVTK 
    object="https://raw.githubusercontent.com/Kitware/vtk-js/master/Data/StanfordDragon.vtkjs"
    :sizing_mode="'stretch_width'" 
    :height="400" 
    :enable_keybindings="True" 
    :orientation_widget="True"
    ref="vtk_pane_ref" />
  <PnButton @click="read_camera()">读取相机状态</PnButton>
  <PnJSON v-if="camera_state.value" :object="camera_state.value" :depth="1" />
</template>
<script lang='py'>
from vuepy import ref

vtk_pane_ref = ref(None)
camera_state = ref(None)

def read_camera():
    vtk_pane = vtk_pane_ref.value.unwrap()
    if vtk_pane.camera:
        camera_state.value = vtk_pane.camera
</script>
```

这种技术也使得可以将两个或多个 VTKJS 组件的相机链接在一起：

还可以在 Python 中修改相机状态并触发更新：

```vue
<!-- --plugins vpanel --show-code --codegen-backend='panel' -->
<template>
  <PnRow>
    <PnVTK 
      object="https://raw.githubusercontent.com/Kitware/vtk-js/master/Data/StanfordDragon.vtkjs"
      :height="400" 
      :sizing_mode="'stretch_width'"
      ref="dragon1_ref" />
    <PnVTK 
      object="https://raw.githubusercontent.com/Kitware/vtk-js/master/Data/StanfordDragon.vtkjs"
      :height="400" 
      :sizing_mode="'stretch_width'"
      ref="dragon2_ref" />
  </PnRow>
  <PnButton @click="change_view_angle()">改变视角</PnButton>
</template>
<script lang='py'>
from vuepy import ref, onMounted

dragon1_ref = ref(None)
dragon2_ref = ref(None)

@onMounted
def on_render():
    dragon1 = dragon1_ref.value.unwrap()
    dragon2 = dragon2_ref.value.unwrap()
    # 双向链接两个组件的相机
    dragon1.jslink(dragon2, camera='camera', bidirectional=True)
    
def change_view_angle():
    dragon1 = dragon1_ref.value.unwrap()
    if dragon1.camera:
        dragon1.camera['viewAngle'] = 50
        dragon1.param.trigger('camera')
</script>
```

## API

### 属性

| 属性名                      | 说明                          | 类型                                                           | 默认值 |
| -------------------------- | ----------------------------- | ---------------------------------------------------------------| ------- |
| object                     | 可以是指向本地或远程的带有 `.vtkjs` 扩展名的文件的字符串 | ^[str, object]                  | None |
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
### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

### 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| export_scene | 导出场景并生成可以被官方 vtk-js 场景导入器加载的文件 | filename: str |

## Controls

```python
##controls
import panel as pn
pn.extension('vtk')

vtk_pane = pn.pane.VTK(
    'https://raw.githubusercontent.com/Kitware/vtk-js/master/Data/StanfordDragon.vtkjs',
    sizing_mode='stretch_width', height=400, enable_keybindings=True, orientation_widget=True
)
pn.Row(vtk_pane.controls(jslink=True), vtk_pane)
```
