---
name: vuepy
description: Build Vuepy apps with Python single-file components in Jupyter or as terminal TUI apps (textual_vuepy). Use when creating or modifying .vue files, calling vuepy APIs such as ref, reactive, computed, watch, or create_app, or when the user mentions vuepy, Vue.py, textual_vuepy, or a TUI app.
license: CC BY-NC-SA 4.0
---

# Vuepy

Vuepy（Vue.py）用 Python 编写 Vue 风格单文件组件，在 Jupyter 中构建界面。脚本是 Python（`<script lang="py">`），不是 JavaScript。

实现功能前，先在下面的索引里找对应指南或 API，并阅读 `references` 中的文档再写代码。

## 与 Vue.js 的关键差异

| 特性 | Vuepy |
|------|--------|
| 脚本 | `<script lang="py">`，代码作为 setup 函数体；闭包变量用 `nonlocal` |
| ref | 模板里显式 `.value`：`{{ count.value }}` |
| v-for | `(index, item)`，不需要 key |
| props / emit / model | `from vuepy import defineProps, defineEmits, defineModel` |
| 布局 | 不能把自定义组件嵌进原生 HTML；用 `VBox` / `HBox` |
| 事件 | 只绑在自定义组件上。`@click="handle"` 传入 widget，签名 `def handle(widget):`；`@click="handle()"` 不传参 |

## 创建应用

```python
from vuepy import create_app, import_sfc

App = import_sfc("./App.vue")
app = create_app(App)
app.mount()
```

## guide

### 开始

* [简介](./references/guide/introduction.md)
* [快速上手](./references/guide/quick-start.md)
* [使用 LLMs 开发 Vuepy 应用](./references/guide/build-vuepy-withs-llms.md)

### 基础

* [创建一个应用](./references/guide/essentials/application.md)
* [模板语法](./references/guide/essentials/template-syntax.md)
* [响应式基础](./references/guide/essentials/reactivity-fundamentals.md)
* [计算属性](./references/guide/essentials/computed.md)
* [条件渲染](./references/guide/essentials/conditional.md)
* [列表渲染](./references/guide/essentials/list.md)
* [事件处理](./references/guide/essentials/event-handling.md)
* [表单输入绑定](./references/guide/essentials/forms.md)
* [侦听器](./references/guide/essentials/watchers.md)
* [模板引用](./references/guide/essentials/template-refs.md)
* [组件基础](./references/guide/essentials/component-basics.md)

### 深入组件

* [注册](./references/guide/components/registration.md)
* [Props](./references/guide/components/props.md)
* [事件](./references/guide/components/events.md)
* [组件 v-model](./references/guide/components/v-model.md)
* [插槽](./references/guide/components/slots.md)

### 逻辑复用

* [组合式函数](./references/guide/reusability/composables.md)
* [插件](./references/guide/reusability/plugins.md)

### 组件库

* [ipywui 组件库](./references/ipywui/overview.md)
* [Panel-vuepy 组件库](./references/panel_vuepy/quick-start.md)
* [Textual-vuepy 终端 TUI 组件库](./references/textual_vuepy/quick-start/quick-start.md)
* [vleaflet 组件库](./references/vleaflet/overview.md)
* [集成 anywidget](./references/guide/Integration-with-anywidget.md)

### 应用规模化

* [单文件组件](./references/guide/scaling-up/sfc.md)
* [工具链](./references/guide/scaling-up/tooling.md)

### 最佳实践

* [使用 LLMs 辅助开发 vleaflet](./references/guide/best-practices/dev-vleaflet-with-llms.md)
* [安全](./references/guide/best-practices/security.md)

## api

### 全局 API

* [应用实例](./references/api/application.md)
* [应用管理](./references/api/appstore.md)
* [通用](./references/api/general.md)
* [日志系统](./references/api/log.md)
* [IPython Magic](./references/api/ipython-magic.md)

### 组合式 API

* [setup()](./references/api/composition-api-setup.md)
* [响应式: 核心](./references/api/reactivity-core.md)
* [响应式: 工具](./references/api/reactivity-utilities.md)
* [响应式: 进阶](./references/api/reactivity-advanced.md)
* [生命周期钩子](./references/api/composition-api-lifecycle.md)
* [依赖注入](./references/api/composition-api-dependency-injection.md)

### 内置内容

* [指令](./references/api/built-in-directives.md)
* [组件](./references/api/built-in-components.md)
* [特殊元素](./references/api/built-in-special-elements.md)
* [特殊 Attributes](./references/api/built-in-special-attributes.md)

### 单文件组件

* [语法定义](./references/api/sfc-spec.md)
* [<script lang="py">](./references/api/sfc-script-setup.md)
* [作为 Python 模块导入](./references/api/sfc-import-sfc.md)

### 进阶 API

* [自定义渲染](./references/api/custom-renderer.md)
