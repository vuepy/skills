---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Reacton 组件

`PnReacton` 组件可以在 Panel 应用程序中渲染 [Reacton](https://reacton.solara.dev/en/latest/) 组件，无论是在笔记本中还是在部署的服务器上。Reacton 提供了一种以类似 React 的方式编写可重用组件的方法，用于使用 ipywidgets 生态系统（ipywidgets、ipyvolume、bqplot、threejs、leaflet、ipyvuetify 等）构建基于 Python 的 UI。请注意，Reacton 主要是一种编写应用程序的方法。

在笔记本中，这不是必需的，因为 Panel 只是使用常规的笔记本 ipywidget 渲染器。特别是在 JupyterLab 中，以这种方式导入 ipywidgets 扩展可能会干扰 UI 并使 JupyterLab UI 无法使用，因此请谨慎启用扩展。

底层实现为`panel.pane.Reacton`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/Reacton.html

## 基本用法

`panel_vuepy` 函数会自动将任何 Reacton 组件转换为可显示的面板，同时保持其所有交互功能：

## 结合 Reacton 和 Panel 组件

Reacton 可以与 Panel 组件结合使用，但我们需要做两个修改：

1. Panel 组件必须使用 `pn.ipywidget` 包装器包装为 ipywidget（这需要 `jupyter_bokeh`）。
2. 包装后的 Panel 组件必须添加到 reacton 布局组件中。

在下面的示例中，我们将 `reacton.ipywidgets.Button` 替换为 `PnButton`，然后用 `pn.ipywidget` 和 `reacton.ipywidgets.VBox` 包装它：

## 复杂示例

可以在 Reacton 中构建更复杂的应用程序并在 Panel 中显示。以下是 Reacton 文档中的计算器示例。

### 逻辑

## 使用 ipyvuetify

Reacton 也可以与 ipyvuetify 结合使用，创建更美观的界面：

## API

### 属性

| 属性名           | 说明                          | 类型                                                           | 默认值 |
| --------------- | ----------------------------- | ---------------------------------------------------------------| ------- |
| object          | 被显示的 Reacton 组件对象      | ^[object]                                                      | None |
| default_layout  | 包装图表和小部件的布局        | ^[pn.layout.Panel]                                             | Row |
| sizing_mode     | 尺寸调整模式                  | ^[str]                                                         | 'fixed'  |
| width           | 宽度                          | ^[int, str]                                                    | None    |
| height          | 高度                          | ^[int, str]                                                    | None    |
| min_width       | 最小宽度                      | ^[int]                                                         | None    |
| min_height      | 最小高度                      | ^[int]                                                         | None    |
| max_width       | 最大宽度                      | ^[int]                                                         | None    |
| max_height      | 最大高度                      | ^[int]                                                         | None    |
| margin          | 外边距                        | ^[int, tuple]                                                  | 5       |
| css_classes     | CSS类名列表                   | ^[list]                                                        | []      |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

### 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
