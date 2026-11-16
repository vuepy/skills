---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# ReactiveExpr 响应式表达式

`PnReactiveExpr` 组件可以渲染 [Param `rx` 对象](https://param.holoviz.org/user_guide/Reactive_Expressions.html)，它代表一个响应式表达式，同时显示表达式中包含的小部件和表达式的最终输出。小部件相对于输出的位置可以设置，也可以完全移除小部件。

请注意，当导入 `panel_vuepy as vpanel` 时，可以使用 `vpanel.rx` 代替 [`param.rx`](https://param.holoviz.org/user_guide/Reactive_Expressions.html)。

有关使用 `rx` 的详细信息，请参阅 [`param.rx` 文档](https://param.holoviz.org/user_guide/Reactive_Expressions.html)。

底层实现为`panel.pane.ReactiveExpr`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/ReactiveExpr.html

建议用`vuepy`的`computed` 来代替该功能。

## 基本用法

[`param.rx`](https://param.holoviz.org/user_guide/Reactive_Expressions.html) API 是构建声明式和响应式 UI 的强大工具。

让我们看几个例子：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnReactiveExpr :object="rx_model" />
</template>
<script lang='py'>
import panel as pn

def model(n):
    return f"🤖 {n}x2 等于 {n*2}"

n = pn.widgets.IntSlider(value=2, start=0, end=10)
rx_model = pn.rx(model)(n=n)
</script>
```

在底层，Panel 确保上面的*响应式表达式*被渲染在 `PnReactiveExpr` 组件中。您也可以显式地这样做：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnReactiveExpr :object="rx_model" />
</template>
<script lang='py'>
import panel as pn

def model(n):
    return f"🤖 {n}x2 等于 {n*2}"

n = pn.widgets.IntSlider(value=2, start=0, end=10)
rx_model = pn.rx(model)(n=n)
</script>
```

响应式表达式从不是"死胡同"。您始终可以更新和更改*响应式表达式*。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnReactiveExpr :object="expr" />
</template>
<script lang='py'>
import panel as pn

def model(n):
    return f"🤖 {n}x2 等于 {n*2}"

n = pn.widgets.IntSlider(value=2, start=0, end=10)
expr = pn.rx(model)(n=n) + "\n\n🧑 谢谢"
</script>
```

您还可以组合*响应式表达式*：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnReactiveExpr :object="expr" />
</template>
<script lang='py'>
import panel as pn

x = pn.widgets.IntSlider(value=2, start=0, end=10, name="x")
y = pn.widgets.IntSlider(value=2, start=0, end=10, name="y")

expr = x.rx()*"⭐" + y.rx()*"⭐"
</script>
```

## 布局选项

您可以更改 `widget_location`：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnReactiveExpr :object="expr" widget_location="top" />
</template>
<script lang='py'>
import panel as pn

x = pn.widgets.IntSlider(value=2, start=0, end=10, name="x")
y = pn.widgets.IntSlider(value=2, start=0, end=10, name="y")

expr = x.rx()*"⭐" + "\n\n" + y.rx()*"❤️"
</script>
```

您可以将 `widget_layout` 更改为 `Row`：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnReactiveExpr :object="expr" :widget_layout="PnRow" />
</template>
<script lang='py'>
import panel as pn

x = pn.widgets.IntSlider(value=2, start=0, end=10, name="x")
y = pn.widgets.IntSlider(value=2, start=0, end=10, name="y")

expr = x.rx()*"⭐" + "\n\n" + y.rx()*"❤️"
PnRow = pn.Row
</script>
```

您可以水平 `center` 输出：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnReactiveExpr :object="expr" :center="True" />
</template>
<script lang='py'>
import panel as pn

x = pn.widgets.IntSlider(value=2, start=0, end=10, name="x")
y = pn.widgets.IntSlider(value=2, start=0, end=10, name="y")

expr = x.rx()*"⭐" + "\n\n" + y.rx()*"❤️"
</script>
```

通过设置 `show_widgets=False` 可以隐藏小部件：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnReactiveExpr :object="expr" :show_widgets="False" />
</template>
<script lang='py'>
import panel as pn

x = pn.widgets.IntSlider(value=2, start=0, end=10, name="x")
y = pn.widgets.IntSlider(value=2, start=0, end=10, name="y")

expr = x.rx()*"⭐" + "\n\n" + y.rx()*"❤️"
</script>
```

## 响应式表达式作为引用

在笔记本中显式或隐式地使用 `PnReactiveExpr` 组件非常适合探索。但这并不是很高效，因为每当响应式表达式重新渲染时，Panel 都必须创建一个新的组件来渲染您的输出。

相反，您可以并且应该将*响应式表达式*作为*引用*传递给特定的 Panel 组件。Panel 组件可以动态解析表达式的值：

> **引用方法通常应该是首选**，因为它更具声明性和明确性，允许 Panel 有效地更新现有视图，而不是完全重新渲染输出。

## 样式化 DataFrame 示例

让我们通过一个稍微复杂一点的例子来展示，构建一个表达式来动态加载一些数据并从中采样 N 行：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnReactiveExpr :object="df_rx" />
</template>
<script lang='py'>
import pandas as pd
import panel as pn

dataset = pn.widgets.Select(name='选择数据集', options={
    'penguins': 'https://datasets.holoviz.org/penguins/v1/penguins.csv',
    'stocks': 'https://datasets.holoviz.org/stocks/v1/stocks.csv'
})
nrows = pn.widgets.IntSlider(value=5, start=0, end=20, name='N 行')

# 加载当前选择的数据集并从中采样 nrows
df_rx = pn.rx(pd.read_csv)(dataset).sample(n=nrows)
</script>
```

现在我们有了一个符合我们需求的表达式，可以将其用作引用来响应式地更新 `Tabulator` 小部件的 `value`：

```vue
<!-- --plugins vpanel --show-code -->
<template>
    <PnCol>
      <PnSelect v-model="dataset.value" name='选择数据集' :options="options" />
      <PnIntSlider v-model="nrows.value" :start="0" :end="20" name="N 行" />
    </PnCol>
    <PnTabulator :value="df_rx.value" :page_size="5" pagination="remote" />
</template>
<script lang='py'>
import pandas as pd
import panel as pn
from vuepy import ref, computed

dataset = ref('https://datasets.holoviz.org/stocks/v1/stocks.csv')
nrows = ref(5)
options = {'penguins': 'https://datasets.holoviz.org/penguins/v1/penguins.csv',
           'stocks': 'https://datasets.holoviz.org/stocks/v1/stocks.csv'}

# 创建响应式表达式
# df_rx = pn.rx(lambda url, n: pd.read_csv(url).sample(n=n))(url=dataset, n=nrows)
@computed
def df_rx():
    return pd.read_csv(dataset.value).sample(n=nrows.value)
</script>
```

## API

### 属性

| 属性名            | 说明                          | 类型                                                           | 默认值 |
| ---------------- | ----------------------------- | ---------------------------------------------------------------| ------- |
| object           | 一个 `param.reactive` 表达式    | ^[param.reactive]                                              | None |
| center           | 是否水平居中输出               | ^[bool]                                                        | False |
| show_widgets     | 是否显示小部件                 | ^[bool]                                                        | True |
| widget_layout    | 用于显示小部件的布局对象。例如 `pn.WidgetBox`（默认），`pn.Column` 或 `pn.Row` | ^[ListPanel] | WidgetBox |
| widget_location  | 小部件相对于响应式表达式输出的位置。可选值包括 'left', 'right', 'top', 'bottom', 'top_left', 'top_right', 'bottom_left', 'bottom_right', 'left_top'（默认）, 'right_top', 'right_bottom' | ^[str] | 'left_top' |
| sizing_mode      | 尺寸调整模式                  | ^[str]                                                         | 'fixed'  |
| width            | 宽度                          | ^[int, str]                                                    | None    |
| height           | 高度                          | ^[int, str]                                                    | None    |
| min_width        | 最小宽度                      | ^[int]                                                         | None    |
| min_height       | 最小高度                      | ^[int]                                                         | None    |
| max_width        | 最大宽度                      | ^[int]                                                         | None    |
| max_height       | 最大高度                      | ^[int]                                                         | None    |
| margin           | 外边距                        | ^[int, tuple]                                                  | 5       |
| css_classes      | CSS类名列表                   | ^[list]                                                        | []      |

### 属性值

* **`widgets`** (ListPanel): 返回位于 `widget_layout` 中的小部件。

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |
