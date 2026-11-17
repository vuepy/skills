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

运行示例：
```bash
vuepy run App.vue
```

## 通用说明

- **布局**：原生 HTML 标签（`div` 等）内不能嵌套自定义组件，始终用 `VBox`/`HBox` 代替
- **样式**：样式使用 TCSS。`style` 是 TCSS，`<style>` 只作用于当前组件
- **v-model**：显式写 `.value`，如 `v-model="text.value"`
- **store_true 属性**：`disabled`、`compact`、`code_editor` 等——模板中只需写属性名即表示 True
- **ref 取值**：`ref_var.value.unwrap()` 获取底层 Widget 对象，再调用 Textual API
- **完整 Textual API**：见 [Textual 文档](https://textual.textualize.io/widgets/)


使用下表中的组件前，先阅读对应 reference。

<!-- CONTENT_PLACEHOLDER -->
