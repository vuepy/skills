---
name: textual_vuepy
description: Build terminal TUI apps with Textual-vuepy widgets. Use when the user mentions textual_vuepy, Textual, or a Vuepy app with backend textual.
license: CC BY-NC-SA 4.0
---

# Textual-vuepy

```bash
pip install 'vuepy-core[textual]'
```

```python
from vuepy import create_app, import_sfc

App = import_sfc("App.vue")
app = create_app(App, backend="textual")
app.mount()
```

样式使用 TCSS。`style` 是 TCSS，`<style>` 只作用于当前组件。通过 `ref` 的 `.value.unwrap()` 取得底层 Textual Widget。

使用下表中的组件前，先阅读对应 reference。

## Overview 总览

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| 🚀 快速上手 | Textual-vuepy 是基于 Vue.py 和 Textual 构建终端 TUI（Text User Interface）应用的组件库。 | [🚀 快速上手](./references/textual_vuepy/quick-start/quick-start.md) |
| Textual-vuepy 组件总览 | Textual-vuepy 将 Textual 全部内置 Widget 封装为 Vue.py 组件，让你在 `.vue` SFC 文件中以声明式方式构建终端 TUI 应用。 | [Textual-vuepy 组件总览](./references/textual_vuepy/overview/overview.md) |

## Layout 布局组件

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| VBox / HBox 布局容器 | VBox、HBox 是 Textual-vuepy 最基础的布局容器，用于将子组件分别沿**垂直方向**或**水平方向**排列。 | [VBox / HBox 布局容器](./references/textual_vuepy/layout-box/layout-box.md) |
| Collapsible 折叠容器 | Collapsible 是一个可以展开或收起内容区域的容器组件，适合用于侧边栏、设置面板、详情展示等场景。 | [Collapsible 折叠容器](./references/textual_vuepy/collapsible/collapsible.md) |
| TabbedContent 标签页容器 | TabbedContent 是一个内置标签导航栏的容器组件，配合 TabPane 子组件可快速构建多标签页界面。 | [TabbedContent 标签页容器](./references/textual_vuepy/tabbed-content/tabbed-content.md) |
| Tabs 标签导航 | Tabs 是独立的标签导航栏组件，仅负责渲染可点击的标签，不包含内容区域。 | [Tabs 标签导航](./references/textual_vuepy/tabs/tabs.md) |
| ContentSwitcher 内容切换 | ContentSwitcher 根据子组件的 `id` 切换显示哪个子组件，同一时刻只有一个子组件可见。 | [ContentSwitcher 内容切换](./references/textual_vuepy/content-switcher/content-switcher.md) |

## Basic 基础组件

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| Button 按钮 | 用于触发操作的交互式按钮组件，支持多种样式变体、扁平样式与禁用状态。 | [Button 按钮](./references/textual_vuepy/button/button.md) |
| Label 标签 | 用于显示静态或动态文本的标签组件，支持 Rich markup 语法，可渲染带颜色、粗体等样式的终端文本。 | [Label 标签](./references/textual_vuepy/label/label.md) |
| Static 静态内容 | 用于在终端界面中显示静态或动态文本内容的组件，支持 Rich markup 渲染，适合展示状态信息、说明文字等。 | [Static 静态内容](./references/textual_vuepy/static/static.md) |
| Link 超链接 | 在终端界面中显示可点击链接的组件，点击后会使用系统默认浏览器打开对应 URL。 | [Link 超链接](./references/textual_vuepy/link/link.md) |
| Placeholder 占位符 | 开发阶段用于快速占据布局空间的占位组件，带有醒目的视觉提示。 | [Placeholder 占位符](./references/textual_vuepy/placeholder/placeholder.md) |
| Rule 分隔线 | 在布局中插入水平或垂直分隔线的组件，支持多种线条样式，用于在视觉上分隔不同内容区域。 | [Rule 分隔线](./references/textual_vuepy/rule/rule.md) |

## Form 表单组件

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| Input 输入框 | 用于接收用户单行文本输入的表单组件，支持多种输入类型、密码模式、输入验证等功能。 | [Input 输入框](./references/textual_vuepy/input/input.md) |
| TextArea 文本编辑器 | 功能强大的多行文本编辑组件，支持语法高亮、代码编辑器模式、只读模式等，适合构建代码编辑器、日志查看器等场景。 | [TextArea 文本编辑器](./references/textual_vuepy/textarea/textarea.md) |
| MaskedInput 掩码输入 | 基于掩码模板的格式化输入框，强制用户按照指定格式输入内容，适用于日期、电话号码、身份证等固定格式的数据录入场景。 | [MaskedInput 掩码输入](./references/textual_vuepy/masked-input/masked-input.md) |
| Checkbox 复选框 | 用于布尔值选择的复选框组件，支持选中/未选中两种状态，常用于表单的多项勾选场景。 | [Checkbox 复选框](./references/textual_vuepy/checkbox/checkbox.md) |
| RadioButton / RadioSet 单选 | `RadioButton` 是单个单选按钮组件；`RadioSet` 是单选按钮组容器，将多个 `RadioButton` 组合在一起并自动实现互斥选择逻辑。 | [RadioButton / RadioSet 单选](./references/textual_vuepy/radio/radio.md) |
| Select 下拉选择 | 提供下拉列表供用户从多个选项中选择一项的表单组件，支持空选择和自定义提示文字。 | [Select 下拉选择](./references/textual_vuepy/select/select.md) |
| SelectionList 多选列表 | `SelectionList` 是支持多选的列表组件，`Selection` 是其子选项组件。 | [SelectionList 多选列表](./references/textual_vuepy/selection-list/selection-list.md) |
| Switch 开关 | 用于切换布尔状态的开关组件，提供平滑的动画效果，适合用于设置开关、功能启用/禁用等场景。 | [Switch 开关](./references/textual_vuepy/switch/switch.md) |

## Data 数据展示

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| DataTable 数据表格 | DataTable 是功能强大的表格组件，支持键盘导航、光标选择、斑马纹等特性，适合展示结构化数据。 | [DataTable 数据表格](./references/textual_vuepy/data-table/data-table.md) |
| RichLog 富文本日志 | RichLog 是支持 Rich markup 的滚动日志组件，可自动语法高亮，适合展示带样式的实时日志输出。 | [RichLog 富文本日志](./references/textual_vuepy/rich-log/rich-log.md) |
| Log 纯文本日志 | Log 是只支持纯文本的滚动日志组件，轻量高效，适合输出大量无样式的日志内容。 | [Log 纯文本日志](./references/textual_vuepy/log/log.md) |
| Markdown 渲染 | `Markdown` 组件将 Markdown 文本渲染为富文本终端内容；`MarkdownViewer` 在此基础上增加了可折叠的目录侧边栏，适合展示较长文档。 | [Markdown 渲染](./references/textual_vuepy/markdown/markdown.md) |
| Pretty 对象格式化 | Pretty 使用 Rich 的 `Pretty` 渲染器将任意 Python 对象（dict、list、dataclass 等）以美观的格式展示在终端中，自动处理缩进和着色。 | [Pretty 对象格式化](./references/textual_vuepy/pretty/pretty.md) |
| Sparkline 迷你折线图 | Sparkline 在终端中渲染一条迷你折线图，用于直观展示数值序列的趋势变化，常用于监控仪表盘、实时数据可视化等场景。 | [Sparkline 迷你折线图](./references/textual_vuepy/sparkline/sparkline.md) |
| Digits 大号数字 | Digits 以仿 LCD 风格渲染大号数字字符，适合展示时钟、计时器、倒计时、计数器等场景，视觉冲击力强。 | [Digits 大号数字](./references/textual_vuepy/digits/digits.md) |
| ProgressBar 进度条 | ProgressBar 显示任务的完成进度，支持百分比、预计剩余时间（ETA）等信息展示，适合文件下载、数据处理等长时任务的进度反馈。 | [ProgressBar 进度条](./references/textual_vuepy/progress-bar/progress-bar.md) |

## Navigation 导航组件

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| ListView 列表视图 | `ListView` 是可键盘导航的滚动列表容器，每个列表项用 `ListItem` 包裹，`ListItem` 内部可放置 `Label`、`Static` 等子组件。 | [ListView 列表视图](./references/textual_vuepy/list-view/list-view.md) |
| OptionList 选项列表 | `OptionList` 是带键盘导航的选项列表，使用 `Option` 定义每个选项。 | [OptionList 选项列表](./references/textual_vuepy/option-list/option-list.md) |
| Tree 树形结构 | Tree 以可折叠的树形结构展示层级数据，支持键盘导航和节点展开/折叠操作，适合文件系统、组织架构、JSON 结构等场景。 | [Tree 树形结构](./references/textual_vuepy/tree/tree.md) |
| DirectoryTree 目录树 | DirectoryTree 以树形结构展示文件系统目录，支持文件/目录点击选中事件，以及通过 `filter_query` 按文件名子串过滤，适合构建文件浏览器或项目浏览工具。 | [DirectoryTree 目录树](./references/textual_vuepy/directory-tree/directory-tree.md) |

## Feedback 反馈组件

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| Dialog 对话框 | Dialog 是模态对话框组件，在应用前端弹出覆盖层，阻止背景交互，适合确认操作、展示详情、表单填写等场景。 | [Dialog 对话框](./references/textual_vuepy/dialog/dialog.md) |
| LoadingIndicator 加载动画 | LoadingIndicator 显示一个全屏或容器内的旋转加载动画，在数据加载、异步操作等场景下向用户反馈"正在处理"的状态。 | [LoadingIndicator 加载动画](./references/textual_vuepy/loading-indicator/loading-indicator.md) |
| Tooltip 工具提示 | Tooltip 在鼠标悬停或聚焦组件时显示提示文字。 | [Tooltip 工具提示](./references/textual_vuepy/tooltip/tooltip.md) |

## Structure 结构组件

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| Header / Footer | `Header` 是应用顶部标题栏，显示应用名称、副标题，可选显示时钟；`Footer` 是应用底部状态栏，自动展示当前绑定的键盘快捷键列表。 | [Header / Footer](./references/textual_vuepy/header-footer/header-footer.md) |
| Display 组件展示器 | Display 是桥接组件，用于将 Python 代码中创建的原生 Textual Widget 实例（或 Widget 类）直接嵌入到 Vue 模板布局中，实现 Vue 声明式布局与 Textual 原生组件的混用。 | [Display 组件展示器](./references/textual_vuepy/display/display.md) |
| Welcome 欢迎页 | Welcome 是 Textual 框架内置的欢迎/介绍页面组件，展示 Textual 的基本信息和快捷键说明，适合作为应用的初始欢迎屏或帮助页面使用。 | [Welcome 欢迎页](./references/textual_vuepy/welcome/welcome.md) |

## 自定义 SFC 组件

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| ShimmerText 流光文字 | ShimmerText 是内置的 SFC 自定义组件，以动画效果逐字高亮文字，产生"流光"视觉效果。 | [ShimmerText 流光文字](./references/textual_vuepy/shimmer-text/shimmer-text.md) |
| Spinner 加载旋转器 | Spinner 是内置的 SFC 自定义组件，以 Braille 点阵风格的旋转动画配合文字，向用户展示"正在处理"状态。 | [Spinner 加载旋转器](./references/textual_vuepy/spinner/spinner.md) |

## VueUse 组合式函数

| 组件 | 描述 | 详细文档 |
|------|------|----------|
| onKeyStroke / useMouse | Textual-vuepy 在 `textual_vuepy.vueuse` 中提供了一组组合式函数（Composables），在 ` | [onKeyStroke / useMouse](./references/textual_vuepy/vueuse/vueuse.md) |
