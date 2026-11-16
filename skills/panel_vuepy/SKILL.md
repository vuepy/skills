---
name: panel_vuepy
description: Build Panel-backed Vuepy apps with panel_vuepy components. Use when the user mentions panel_vuepy, Panel, or a Vuepy app with backend panel.
license: CC BY-NC-SA 4.0
---

# Panel-vuepy

```bash
pip install 'vuepy-core[panel]'
```

```python
from vuepy import create_app, import_sfc
from panel_vuepy import vpanel

App = import_sfc("App.vue")
app = create_app(App, backend="panel")
app.use(vpanel)
app.mount()
```

使用下表中的组件前，先阅读对应 reference。

## Overview 总览

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| 快速上手 | Panel-vuepy 是基于 Vue.py 和 Panel 开发的现代化 Python 组件库。 | [快速上手](./references/panel_vuepy/quick-start.md) |
| Panel-vuepy 组件总览 |  | [Panel-vuepy 组件总览](./references/panel_vuepy/overview.md) |

## Chat 组件

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| ChatInterface 聊天界面 | 高级布局组件，提供用户友好的前端界面，用于输入不同类型的消息：文本、图片、PDF等。 | [ChatInterface 聊天界面](./references/panel_vuepy/chat/ChatInterface.md) |
| ChatAreaInput 聊天输入区域 | 多行文本输入组件，继承自 TextAreaInput，允许通过文本输入框输入任意多行字符串。 | [ChatAreaInput 聊天输入区域](./references/panel_vuepy/chat/ChatAreaInput.md) |
| ChatFeed 聊天信息流 | PnChatFeed是一个中层布局组件，用于管理一系列聊天消息(ChatMessage)项。 | [ChatFeed 聊天信息流](./references/panel_vuepy/chat/ChatFeed.md) |
| ChatMessage 聊天消息 | 用于显示聊天消息的组件，支持多种内容类型。 | [ChatMessage 聊天消息](./references/panel_vuepy/chat/ChatMessage.md) |
| ChatStep 聊天步骤 | 用于显示和管理聊天中的中间步骤组件，比如思维链中的步骤。 | [ChatStep 聊天步骤](./references/panel_vuepy/chat/ChatStep.md) |
| PanelCallbackHandler 回调处理器 | 用于在 Panel 聊天组件中渲染和流式显示 LangChain 对象（如工具、代理和链）的思维链。 | [PanelCallbackHandler 回调处理器](./references/panel_vuepy/chat/PanelCallbackHandler.md) |

## Widgets 组件

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| ArrayInput 数组输入框 | 数组输入框组件允许使用文本输入框渲染和编辑NumPy数组，其内容随后在Python中解析。 | [ArrayInput 数组输入框](./references/panel_vuepy/widgets/ArrayInput.md) |
| AutocompleteInput 自动完成输入 | 自动完成输入框组件允许通过在自动完成文本字段中输入值来从选项列表或字典中选择一个`value`。 | [AutocompleteInput 自动完成输入](./references/panel_vuepy/widgets/AutocompleteInput.md) |
| Button 按钮 | 常用的操作按钮。 | [Button 按钮](./references/panel_vuepy/widgets/Button.md) |
| ButtonIcon 图标按钮 | 此小部件最初显示一个默认 `icon` 。 | [ButtonIcon 图标按钮](./references/panel_vuepy/widgets/ButtonIcon.md) |
| CheckBoxGroup 复选框组 | 允许通过选中相应的复选框从选项列表中选择多个选项。 | [CheckBoxGroup 复选框组](./references/panel_vuepy/widgets/CheckBoxGroup.md) |
| CheckButtonGroup 复选按钮组 | 多选按钮组组件允许通过切换相应的按钮来选择多个选项。 | [CheckButtonGroup 复选按钮组](./references/panel_vuepy/widgets/CheckButtonGroup.md) |
| Checkbox 复选框 | 复选框组件允许通过勾选框在`True`/`False`状态之间切换单一条件。 | [Checkbox 复选框](./references/panel_vuepy/widgets/Checkbox.md) |
| CodeEditor 代码编辑器 | 代码编辑器组件允许嵌入基于Ace的代码编辑器。 | [CodeEditor 代码编辑器](./references/panel_vuepy/widgets/CodeEditor.md) |
| ColorMap 颜色映射 | ColorMap组件允许从包含色彩映射的字典中选择一个值。 | [ColorMap 颜色映射](./references/panel_vuepy/widgets/ColorMap.md) |
| ColorPicker 颜色选择器 | 颜色选择器组件允许使用浏览器的颜色选择小部件选择颜色。 | [ColorPicker 颜色选择器](./references/panel_vuepy/widgets/ColorPicker.md) |
| CrossSelector 交叉选择器 | 交叉选择器组件允许通过在两个列表之间移动项目来从选项列表中选择多个值。 | [CrossSelector 交叉选择器](./references/panel_vuepy/widgets/CrossSelector.md) |
| DatePicker 日期选择器 | 日期选择器组件允许使用文本框和浏览器的日期选择工具选择日期值。 | [DatePicker 日期选择器](./references/panel_vuepy/widgets/DatePicker.md) |
| DateRangePicker 日期范围选择器 | 日期范围选择器组件允许用户使用文本框和浏览器的日期选择工具选择一个日期范围。 | [DateRangePicker 日期范围选择器](./references/panel_vuepy/widgets/DateRangePicker.md) |
| DateRangeSlider 日期范围滑块 | 日期范围滑块组件允许使用带有两个手柄的滑块选择日期范围。 | [DateRangeSlider 日期范围滑块](./references/panel_vuepy/widgets/DateRangeSlider.md) |
| DateSlider 日期滑块 | DateSlider组件允许用户在设定的日期范围内通过滑块选择一个日期值。 | [DateSlider 日期滑块](./references/panel_vuepy/widgets/DateSlider.md) |
| DatetimeInput 日期时间输入 | 日期时间输入框组件允许以文本形式输入日期时间值，并使用预定义的格式解析它。 | [DatetimeInput 日期时间输入](./references/panel_vuepy/widgets/DatetimeInput.md) |
| DatetimePicker 日期时间选择器 | 日期时间选择器组件允许用户选择日期和时间，可以通过文本输入框和浏览器的日期时间选择工具进行选择。 | [DatetimePicker 日期时间选择器](./references/panel_vuepy/widgets/DatetimePicker.md) |
| DatetimeRangeInput 日期时间范围输入 | 日期时间范围输入框组件允许用户以文本形式输入日期时间范围，并使用预定义的格式解析它。 | [DatetimeRangeInput 日期时间范围输入](./references/panel_vuepy/widgets/DatetimeRangeInput.md) |
| DatetimeRangePicker 日期时间范围选择器 | 日期时间范围选择器组件允许使用文本框和浏览器的日期时间选择工具选择日期时间范围。 | [DatetimeRangePicker 日期时间范围选择器](./references/panel_vuepy/widgets/DatetimeRangePicker.md) |
| DatetimeRangeSlider 日期时间范围滑块 | DatetimeRangeSlider组件允许用户通过带有两个手柄的滑块选择日期时间范围。 | [DatetimeRangeSlider 日期时间范围滑块](./references/panel_vuepy/widgets/DatetimeRangeSlider.md) |
| DatetimeSlider 日期时间滑块 | 日期时间滑块组件允许用户在设定的日期时间范围内使用滑块选择一个日期时间值。 | [DatetimeSlider 日期时间滑块](./references/panel_vuepy/widgets/DatetimeSlider.md) |
| Debugger 调试器 | Debugger是一个不可编辑的Card布局组件，可以在前端显示仪表板运行时可能触发的日志和错误。 | [Debugger 调试器](./references/panel_vuepy/widgets/Debugger.md) |
| DiscretePlayer 离散播放器 | 离散播放器组件是一个用于循环播放一系列离散值的工具，可用于动画或步进通过数据集。 | [DiscretePlayer 离散播放器](./references/panel_vuepy/widgets/DiscretePlayer.md) |
| DiscreteSlider 离散滑块 | 离散滑块组件允许使用滑块从离散列表或字典中选择值，提供了类似Select组件的选择功能，但使用滑块作为交互界面。 | [DiscreteSlider 离散滑块](./references/panel_vuepy/widgets/DiscreteSlider.md) |
| Display 显示组件 | 支持 IPython 提供的所有 display tools，如`Video`、`Audio`、`HTML` 等，详情见 rich output generated by IPython | [Display 显示组件](./references/panel_vuepy/widgets/Display.md) |
| EditableFloatSlider 可编辑浮点滑块 | 可编辑浮点滑块组件允许使用滑块在设定的范围内选择浮点数值，并提供一个可编辑的数字输入框以便进行精确控制。 | [EditableFloatSlider 可编辑浮点滑块](./references/panel_vuepy/widgets/EditableFloatSlider.md) |
| EditableIntSlider 可编辑整数滑块 | EditableIntSlider组件允许用户在设定范围内通过滑块选择整数值，并提供一个可编辑的数字输入框以进行更精确的控制。 | [EditableIntSlider 可编辑整数滑块](./references/panel_vuepy/widgets/EditableIntSlider.md) |
| EditableRangeSlider 可编辑范围滑块 | 可编辑范围滑块组件允许使用带有两个手柄的滑块选择浮点范围，并提供数字输入框以便进行更精确的控制。 | [EditableRangeSlider 可编辑范围滑块](./references/panel_vuepy/widgets/EditableRangeSlider.md) |
| FileDownload 文件下载 | 文件下载组件允许在前端下载文件，通过在初始化时（如果`embed=True`）或点击按钮时将文件数据发送到浏览器。 | [FileDownload 文件下载](./references/panel_vuepy/widgets/FileDownload.md) |
| FileDropper 文件拖放 | FileDropper组件允许用户将一个或多个文件上传到服务器。 | [FileDropper 文件拖放](./references/panel_vuepy/widgets/FileDropper.md) |
| FileInput 文件输入 | 文件输入框组件允许用户上传一个或多个文件，支持拖放或点击选择文件。 | [FileInput 文件输入](./references/panel_vuepy/widgets/FileInput.md) |
| FileSelector 文件选择器 | 文件选择器组件提供了一个用于在服务器端文件系统中选择文件或目录的界面。 | [FileSelector 文件选择器](./references/panel_vuepy/widgets/FileSelector.md) |
| FloatInput 浮点数输入 | 浮点输入框组件允许输入浮点数值，可以通过箭头按钮调整或直接输入数值。 | [FloatInput 浮点数输入](./references/panel_vuepy/widgets/FloatInput.md) |
| FloatSlider 浮点数滑块 | 浮点滑块组件允许使用滑块在设定范围内选择浮点数值。 | [FloatSlider 浮点数滑块](./references/panel_vuepy/widgets/FloatSlider.md) |
| IntInput 整数输入 | 整数输入框组件允许输入整数值，可以通过箭头按钮调整或直接输入数值。 | [IntInput 整数输入](./references/panel_vuepy/widgets/IntInput.md) |
| IntRangeSlider 整数范围滑块 | 整数范围滑块组件允许使用带有两个手柄的滑块选择整数范围，与RangeSlider类似，但专门用于整数值。 | [IntRangeSlider 整数范围滑块](./references/panel_vuepy/widgets/IntRangeSlider.md) |
| IntSlider 整数滑块 | 整数滑块组件允许使用滑块在设定的范围内选择整数值。 | [IntSlider 整数滑块](./references/panel_vuepy/widgets/IntSlider.md) |
| JSONEditor JSON编辑器 | JSONEditor组件提供了一个可视化编辑器，用于编辑JSON可序列化的数据结构，如Python字典和列表，具有不同编辑模式、插入对象和使用JSON Schema进行验证的功能。 | [JSONEditor JSON编辑器](./references/panel_vuepy/widgets/JSONEditor.md) |
| LiteralInput 文本输入 | 字面量输入框组件允许用户输入任意Python字面量（包括int、float、list、dict等）并将其解析为相应的Python对象。 | [LiteralInput 文本输入](./references/panel_vuepy/widgets/LiteralInput.md) |
| MenuButton 菜单按钮 | 菜单按钮组件允许指定一个菜单项列表供用户选择，当点击菜单项时触发事件。 | [MenuButton 菜单按钮](./references/panel_vuepy/widgets/MenuButton.md) |
| MultiChoice 多选 | 多项选择器组件允许用户从可用选项列表中选择多个项目，并支持搜索过滤选项。 | [MultiChoice 多选](./references/panel_vuepy/widgets/MultiChoice.md) |
| MultiSelect 多选选择器 | 多选框组件允许从下拉菜单中选择多个选项。 | [MultiSelect 多选选择器](./references/panel_vuepy/widgets/MultiSelect.md) |
| NestedSelect 嵌套选择器 | 嵌套选择组件允许用户从多层级的嵌套选项中进行选择，每个级别的选择会影响下一个级别的可用选项。 | [NestedSelect 嵌套选择器](./references/panel_vuepy/widgets/NestedSelect.md) |
| PasswordInput 密码输入 | 密码输入框组件是一个专用于输入密码的文本输入框，会将输入的字符显示为掩码以保护隐私。 | [PasswordInput 密码输入](./references/panel_vuepy/widgets/PasswordInput.md) |
| Player 播放器 | 播放器组件是一个用于循环播放数值范围的工具，可用于动画或步进通过数据。 | [Player 播放器](./references/panel_vuepy/widgets/Player.md) |
| RadioBoxGroup 单选框组 | 单选框组组件允许使用一组复选框从值列表或字典中进行选择。 | [RadioBoxGroup 单选框组](./references/panel_vuepy/widgets/RadioBoxGroup.md) |
| RadioButtonGroup 单选按钮组 | 单选按钮组组件允许使用一组切换按钮从列表或字典中选择一个值。 | [RadioButtonGroup 单选按钮组](./references/panel_vuepy/widgets/RadioButtonGroup.md) |
| RangeSlider 范围滑块 | 范围滑块组件允许使用带有两个手柄的滑块选择整数范围。 | [RangeSlider 范围滑块](./references/panel_vuepy/widgets/RangeSlider.md) |
| Select 选择器 | 选择器组件允许用户从下拉菜单或选择区域中选择一个值。 | [Select 选择器](./references/panel_vuepy/widgets/Select.md) |
| SpeechToText 语音转文字 | SpeechToText组件通过封装HTML5 `SpeechRecognition` API控制浏览器的语音识别服务。 | [SpeechToText 语音转文字](./references/panel_vuepy/widgets/SpeechToText.md) |
| StaticText 静态文本 | StaticText组件显示文本值但不允许编辑它，适用于展示只读信息。 | [StaticText 静态文本](./references/panel_vuepy/widgets/StaticText.md) |
| Switch 开关 | 开关组件允许通过滑动开关在`True`/`False`状态之间切换单一条件。 | [Switch 开关](./references/panel_vuepy/widgets/Switch.md) |
| Tabulator 表格 | Tabulator组件提供了一个功能丰富的交互式表格，可用于显示、编辑和操作`Pandas DataFrame`数据。 | [Tabulator 表格](./references/panel_vuepy/widgets/Tabulator.md) |
| Terminal 终端 | 终端组件提供了一个与底层命令行交互的终端界面。 | [Terminal 终端](./references/panel_vuepy/widgets/Terminal.md) |
| TextAreaInput 文本区域输入 | 多行文本输入框允许使用文本输入框输入任何多行字符串。 | [TextAreaInput 文本区域输入](./references/panel_vuepy/widgets/TextAreaInput.md) |
| TextEditor 文本编辑器 | 文本编辑器组件允许用户编辑和显示格式化文本，支持多种格式，包括Markdown和HTML。 | [TextEditor 文本编辑器](./references/panel_vuepy/widgets/TextEditor.md) |
| TextInput 文本输入 | 文本输入框允许使用文本输入框输入任何字符串。 | [TextInput 文本输入](./references/panel_vuepy/widgets/TextInput.md) |
| TextToSpeech 文字转语音 | TextToSpeech组件为Panel带来文本转语音功能，它封装了HTML5 SpeechSynthesis API和HTML SpeechSynthesisUtterance API。 | [TextToSpeech 文字转语音](./references/panel_vuepy/widgets/TextToSpeech.md) |
| TimePicker 时间选择器 | 时间选择器组件允许用户选择一个时间，可以以文本形式输入或使用浏览器的时间选择工具。 | [TimePicker 时间选择器](./references/panel_vuepy/widgets/TimePicker.md) |
| Toggle 切换按钮 | 切换开关组件允许在`True`/`False`状态之间切换单一条件。 | [Toggle 切换按钮](./references/panel_vuepy/widgets/Toggle.md) |
| ToggleGroup 切换按钮组 | 开关组组件允许从多个选项中切换选择，类似于`RadioButtonGroup`或`CheckButtonGroup`，但默认使用简单的切换按钮而不是按钮。 | [ToggleGroup 切换按钮组](./references/panel_vuepy/widgets/ToggleGroup.md) |
| ToggleIcon 切换图标 | 图标切换组件允许在`True`/`False`状态之间切换一个条件，类似于`Checkbox`和`Toggle`组件，但使用图标来表示状态。 | [ToggleIcon 切换图标](./references/panel_vuepy/widgets/ToggleIcon.md) |
| VideoStream 视频流 | VideoStream组件可以显示来自本地流（例如网络摄像头）的视频，并允许从Python访问流式视频数据。 | [VideoStream 视频流](./references/panel_vuepy/widgets/VideoStream.md) |

## Panes 组件

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| Alert 警告 | 警告组件用于提供针对典型用户操作的上下文反馈消息，具有多种可用且灵活的警告消息样式。 | [Alert 警告](./references/panel_vuepy/panes/Alert.md) |
| Audio 音频 | 音频组件用于展示音频播放器，可以显示本地或远程音频文件、NumPy ndarray 或 Torch Tensor。 | [Audio 音频](./references/panel_vuepy/panes/Audio.md) |
| Bokeh 图表 | `PnBokeh` 组件允许在 Panel 应用程序中显示任何可显示的 Bokeh 模型。 | [Bokeh 图表](./references/panel_vuepy/panes/Bokeh.md) |
| DataFrame 数据框 | `PnDataFrame` 组件将 pandas、dask 和 streamz 的 `DataFrame` 和 `Series` 类型渲染为 HTML 表格。 | [DataFrame 数据框](./references/panel_vuepy/panes/DataFrame.md) |
| DeckGL | Deck.gl 是一个功能强大的基于 WebGL 的框架，用于大型数据集的可视化探索性数据分析。 | [DeckGL](./references/panel_vuepy/panes/DeckGL.md) |
| ECharts 图表 | `PnECharts` 组件在 Panel 中渲染 Apache ECharts 和 pyecharts 图表。 | [ECharts 图表](./references/panel_vuepy/panes/ECharts.md) |
| Folium 地图 | `PnFolium` 组件渲染 folium 交互式地图。 | [Folium 地图](./references/panel_vuepy/panes/Folium.md) |
| GIF 图像 | `PnGif` 组件在提供本地路径时将 `.gif` 图像文件嵌入到面板中，或者在提供 URL 时将链接到远程图像。 | [GIF 图像](./references/panel_vuepy/panes/GIF.md) |
| HTML | `PnHTML` 组件允许在面板中渲染任意 HTML。 | [HTML](./references/panel_vuepy/panes/HTML.md) |
| HoloViews 图表 | HoloViews 是一个流行且功能强大的数据可视化库，支持多种数据和绘图后端。 | [HoloViews 图表](./references/panel_vuepy/panes/HoloViews.md) |
| IPyWidget 小部件 | `PnIPyWidget` 组件可以在 Panel 应用程序中渲染任何 ipywidgets 模型，不论是在笔记本环境中还是在部署的服务器上。 | [IPyWidget 小部件](./references/panel_vuepy/panes/IPyWidget.md) |
| Image 图像 | `PnImage` 组件如果提供本地路径，则将任何已知图像格式文件嵌入到面板中，或者如果提供 URL，则会链接到远程图像。 | [Image 图像](./references/panel_vuepy/panes/Image.md) |
| JPG 图像 | `PnJpg` 组件如果提供本地路径，则将 `.jpg` 或 `.jpeg` 图像文件嵌入到面板中，或者如果提供 URL，则会链接到远程图像。 | [JPG 图像](./references/panel_vuepy/panes/JPG.md) |
| JSON 数据 | `PnJson` 组件允许在面板中渲染任意 JSON 字符串、字典和其他 JSON 可序列化对象。 | [JSON 数据](./references/panel_vuepy/panes/JSON.md) |
| LaTeX 公式 | `PnLaTeX` 组件可以使用 KaTeX 或 MathJax 渲染器将 LaTeX 方程渲染为 HTML。 | [LaTeX 公式](./references/panel_vuepy/panes/LaTeX.md) |
| Markdown 文本 | `PnMarkdown` 组件允许在面板中渲染任意 Markdown。 | [Markdown 文本](./references/panel_vuepy/panes/Markdown.md) |
| Matplotlib 图表 | `PnMatplotlib` 组件允许在 Panel 应用程序中显示 Matplotlib 图表。 | [Matplotlib 图表](./references/panel_vuepy/panes/Matplotlib.md) |
| PDF 文档 | `PnPDF` 组件如果提供本地路径，则将 `.pdf` 文档嵌入到面板中，或者如果提供 URL，则会链接到远程文件。 | [PDF 文档](./references/panel_vuepy/panes/PDF.md) |
| PNG 图像 | `PnPNG` 组件如果提供本地路径，则将 `.png` 图像文件嵌入到面板中，或者如果提供 URL，则会链接到远程图像。 | [PNG 图像](./references/panel_vuepy/panes/PNG.md) |
| Param 参数 | `PnParam` 组件允许自定义 `param.Parameterized` 类参数的小部件、布局和样式。 | [Param 参数](./references/panel_vuepy/panes/Param.md) |
| Perspective 数据表 | `PnPerspective` 组件提供了一个强大的可视化工具，用于处理大型实时数据集，基于 Perspective 项目。 | [Perspective 数据表](./references/panel_vuepy/panes/Perspective.md) |
| Placeholder 占位符 | 占位符组件用于其他Panel组件的占位符。 | [Placeholder 占位符](./references/panel_vuepy/panes/Placeholder.md) |
| Plotly 图表 | `PnPlotly` 组件允许在 Panel 应用程序中显示 Plotly 图表。 | [Plotly 图表](./references/panel_vuepy/panes/Plotly.md) |
| ReactiveExpr 响应式表达式 | `PnReactiveExpr` 组件可以渲染 Param `rx` 对象，它代表一个响应式表达式，同时显示表达式中包含的小部件和表达式的最终输出。 | [ReactiveExpr 响应式表达式](./references/panel_vuepy/panes/ReactiveExpr.md) |
| Reacton | `PnReacton` 组件可以在 Panel 应用程序中渲染 Reacton 组件，无论是在笔记本中还是在部署的服务器上。 | [Reacton](./references/panel_vuepy/panes/Reacton.md) |
| SVG 矢量图 | `PnSVG` 组件如果提供本地路径，则将 `.svg` 矢量图文件嵌入到面板中，或者如果提供 URL，则会链接到远程图像。 | [SVG 矢量图](./references/panel_vuepy/panes/SVG.md) |
| Str 字符串 | `Str`组件允许在面板中呈现任意文本。 | [Str 字符串](./references/panel_vuepy/panes/Str.md) |
| Streamz 流数据 | `PnStreamz` 组件可以渲染 Streamz Stream 对象发出的任意对象，与专门处理 streamz DataFrame 和 Series 对象并公开各种格式化选项的 `DataFrame` 组件不同。 | [Streamz 流数据](./references/panel_vuepy/panes/Streamz.md) |
| Textual 文本 | `PnTextual` 组件允许在 Panel 应用程序中渲染 Textual 应用程序。 | [Textual 文本](./references/panel_vuepy/panes/Textual.md) |
| VTK 3D可视化 | `PnVTK` 组件可以在 Panel 应用程序中渲染 VTK 场景，使得可以与复杂的 3D 几何体进行交互。 | [VTK 3D可视化](./references/panel_vuepy/panes/VTK.md) |
| VTKJS 3D可视化 | `PnVTK` 组件可以在 Panel 应用程序中渲染 vtk.js 文件，使得可以加载和交互复杂的 3D 几何体。 | [VTKJS 3D可视化](./references/panel_vuepy/panes/VTKJS.md) |
| VTKVolume 体积渲染 | `VTKVolume`组件可渲染定义在规则网格上的3D体积数据。 | [VTKVolume 体积渲染](./references/panel_vuepy/panes/VTKVolume.md) |
| Vega 图表 | `PnVega` 组件可以渲染基于 Vega 的图表（包括来自 Altair 的图表）。 | [Vega 图表](./references/panel_vuepy/panes/Vega.md) |
| Video 视频 | `PnVideo` 组件允许在 Panel 应用程序中显示视频播放器，可以用于显示本地或远程视频文件。 | [Video 视频](./references/panel_vuepy/panes/Video.md) |
| Vizzu 图表 | `Vizzu`组件在Panel中渲染Vizzu图表。 | [Vizzu 图表](./references/panel_vuepy/panes/Vizzu.md) |
| WebP 图像 | `WebP`组件可以在面板中嵌入`.webp`图像文件。 | [WebP 图像](./references/panel_vuepy/panes/WebP.md) |

## Layouts 组件

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| Accordion 手风琴 | 折叠面板将内容区域组织进多个折叠面板，通过点击面板的标题可以展开或收缩内容。 | [Accordion 手风琴](./references/panel_vuepy/layouts/Accordion.md) |
| Card 卡片 | 卡片组件提供了一个可折叠的容器，带有标题栏，用于组织和展示内容。 | [Card 卡片](./references/panel_vuepy/layouts/Card.md) |
| Column 列布局 | Column组件允许在垂直容器中排列多个组件。 | [Column 列布局](./references/panel_vuepy/layouts/Column.md) |
| Divider 分隔线 | 分割线用于分隔内容，在视觉上创建一个水平分隔，自动占据容器的全宽。 | [Divider 分隔线](./references/panel_vuepy/layouts/Divider.md) |
| Feed 信息流 | Feed组件继承自Column布局，允许在垂直容器中排列多个组件，但限制了任何时刻渲染的对象数量，适用于显示大量条目。 | [Feed 信息流](./references/panel_vuepy/layouts/Feed.md) |
| FlexBox 弹性盒子 | FlexBox是一种基于CSS Flexbox的列表式布局组件，提供了灵活的内容排列方式，可以自动换行和调整元素布局。 | [FlexBox 弹性盒子](./references/panel_vuepy/layouts/FlexBox.md) |
| FloatPanel 浮动面板 | FloatPanel提供一个可拖动的容器，可以放置在其父容器内部或完全自由浮动。 | [FloatPanel 浮动面板](./references/panel_vuepy/layouts/FloatPanel.md) |
| GridBox 网格布局 | GridBox是一种列表式布局，将对象按照指定的行数和列数包装成网格。 | [GridBox 网格布局](./references/panel_vuepy/layouts/GridBox.md) |
| GridSpec 网格规格 | GridSpec布局是一种类似数组的布局，允许使用简单的API将多个Panel对象排列在网格中，可以将对象分配到单个网格单元或网格跨度。 | [GridSpec 网格规格](./references/panel_vuepy/layouts/GridSpec.md) |
| GridStack 可拖拽网格 | GridStack布局允许将多个Panel对象排列在网格中，并支持用户拖拽和调整单元格大小。 | [GridStack 可拖拽网格](./references/panel_vuepy/layouts/GridStack.md) |
| Modal 模态框 | Modal 布局在布局顶部提供了一个对话框窗口。 | [Modal 模态框](./references/panel_vuepy/layouts/Modal.md) |
| Row 行布局 | Row 允许在水平容器中排列多个组件。 | [Row 行布局](./references/panel_vuepy/layouts/Row.md) |
| Swipe 滑动 | 滑动对比布局使您能够快速比较两个面板，通过滑块控制显示前后两个面板的比例。 | [Swipe 滑动](./references/panel_vuepy/layouts/Swipe.md) |
| Tabs 标签页 | 标签页组件，允许用户通过点击标签头在多个对象之间切换。 | [Tabs 标签页](./references/panel_vuepy/layouts/Tabs.md) |
| WidgetBox 小部件盒子 | 用于分组小部件的垂直容器，具有默认样式。 | [WidgetBox 小部件盒子](./references/panel_vuepy/layouts/WidgetBox.md) |

## Global 组件

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| Notifications 通知 | NotificationsArea 组件是一个全局组件，允许用户显示所谓的“toast”，以向用户提供信息。 | [Notifications 通知](./references/panel_vuepy/global/Notifications.md) |

## Indicators 组件

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| BooleanStatus 布尔状态 | 布尔状态指示器提供了布尔状态的可视化表示，以填充或非填充圆圈的形式展示。 | [BooleanStatus 布尔状态](./references/panel_vuepy/indicators/BooleanStatus.md) |
| Dial 表盘 | 刻度盘指示器提供了一个简单的径向刻度盘来可视化表示数值。 | [Dial 表盘](./references/panel_vuepy/indicators/Dial.md) |
| Gauge 仪表 | 仪表盘提供了一个值的可视化表示，以仪表或速度计形式展示。 | [Gauge 仪表](./references/panel_vuepy/indicators/Gauge.md) |
| LinearGauge 线性仪表 | 线性仪表提供了某个范围内值的简单线性可视化表示。 | [LinearGauge 线性仪表](./references/panel_vuepy/indicators/LinearGauge.md) |
| LoadingSpinner 加载动画 | 加载旋转器提供了加载状态的可视化表示。 | [LoadingSpinner 加载动画](./references/panel_vuepy/indicators/LoadingSpinner.md) |
| Number 数字 | 数字指示器提供了一个值的可视化表示，该值可以根据提供的阈值进行着色。 | [Number 数字](./references/panel_vuepy/indicators/Number.md) |
| Progress 进度条 | 进度条组件根据当前`value`和`max`值显示朝着某个目标的进度。 | [Progress 进度条](./references/panel_vuepy/indicators/Progress.md) |
| TooltipIcon 提示图标 | 提示图标组件提供了一个带有工具提示的图标。 | [TooltipIcon 提示图标](./references/panel_vuepy/indicators/TooltipIcon.md) |
| Tqdm 进度条 | Tqdm指示器包装了著名的`tqdm`进度指示器，并显示某个目标的进度。 | [Tqdm 进度条](./references/panel_vuepy/indicators/Tqdm.md) |
| Trend 趋势 | 趋势指示器提供了一个值及其最近趋势的可视化表示。 | [Trend 趋势](./references/panel_vuepy/indicators/Trend.md) |
