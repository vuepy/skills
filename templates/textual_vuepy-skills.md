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

<!-- CONTENT_PLACEHOLDER -->
