---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# IPyWidget 组件

`PnIPyWidget` 组件可以在 Panel 应用程序中渲染任何 ipywidgets 模型，不论是在笔记本环境中还是在部署的服务器上。这使得可以直接从 Panel 中利用这个不断发展的生态系统，只需将组件包装在面板中即可。

在笔记本中，这不是必需的，因为 Panel 只是使用常规的笔记本 ipywidget 渲染器。特别是在 JupyterLab 中，以这种方式导入 ipywidgets 扩展可能会干扰 UI 并使 JupyterLab UI 无法使用，因此请谨慎启用扩展。

底层实现为`panel.pane.IPyWidget`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/IPyWidget.html

## 基本用法

`panel_vuepy` 函数会自动将任何 `ipywidgets` 对象转换为可显示的面板，同时保持其所有交互功能：

## 交互性和回调

任何具有 `value` 参数的 ipywidget 也可以在 `pn.depends` 装饰的回调中使用，例如，这里我们声明一个依赖于 `FloatSlider` 值的函数：

如果您想自己编写回调，也可以像通常一样使用 `traitlets` 的 `observe` 方法。要了解更多信息，请参阅 ipywidgets 文档中的 [Widget Events](https://ipywidgets.readthedocs.io/en/stable/examples/Widget%20Events.html) 部分。

## 外部小部件库

`PnIPyWidget` 组件不仅限于简单的小部件，ipywidget 库（如 [`ipyvolume`](https://ipyvolume.readthedocs.io/en/latest/index.html) 和 [`ipyleaflet`](https://ipyleaflet.readthedocs.io/en/latest/)）也受支持。

## 限制

ipywidgets 支持有一些限制，因为它整合了两个截然不同的生态系统。特别是，目前还不能在 Panel 和 ipywidget 对象之间设置 JS 链接或支持嵌入。这些限制不是基本的技术限制，可能在未来得到解决。

## API

### 属性

| 属性名            | 说明                          | 类型                                                           | 默认值 |
| ---------------- | ----------------------------- | ---------------------------------------------------------------| ------- |
| object           | 被显示的 ipywidget 对象        | ^[object]                                                      | None |
| default_layout   | 包装图表和小部件的布局        | ^[pn.layout.Panel]                                             | Row |
| sizing_mode      | 尺寸调整模式                  | ^[str]                                                         | 'fixed'  |
| width            | 宽度                          | ^[int, str]                                                    | None    |
| height           | 高度                          | ^[int, str]                                                    | None    |
| min_width        | 最小宽度                      | ^[int]                                                         | None    |
| min_height       | 最小高度                      | ^[int]                                                         | None    |
| max_width        | 最大宽度                      | ^[int]                                                         | None    |
| max_height       | 最大高度                      | ^[int]                                                         | None    |
| margin           | 外边距                        | ^[int, tuple]                                                  | 5       |
| css_classes      | CSS类名列表                   | ^[list]                                                        | []      |

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
