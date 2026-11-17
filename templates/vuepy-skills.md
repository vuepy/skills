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

<!-- CONTENT_PLACEHOLDER -->
