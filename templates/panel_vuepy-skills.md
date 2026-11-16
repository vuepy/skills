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

<!-- CONTENT_PLACEHOLDER -->
