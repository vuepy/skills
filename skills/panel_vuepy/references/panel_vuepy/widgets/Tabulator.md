---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Tabulator 表格

Tabulator组件提供了一个功能丰富的交互式表格，可用于显示、编辑和操作`Pandas DataFrame`数据。

底层实现为`panel.widgets.Tabulator`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/Tabulator.html

## 基本用法

在编辑单元格时，Tabulator 的 value 数据会实时更新，你可以通过常规的 `@change` 监听变化。但如果需要精确获取被修改的单元格信息，还可以绑定 `@edit`，该回调会接收一个 TableEditEvent 对象，其中包含以下字段：
* column：被编辑列的名称
* row：被编辑行在 DataFrame 中的整数索引
* old：单元格的旧值
* value：单元格的新值

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator :value="df.value" 
               @change='on_change'
               @edit='on_edit' 
               @click='on_click' />
</template>
<script lang='py'>
import pandas as pd
from vuepy import ref

df = ref(pd.DataFrame({
    'int': [1, 2, 3],
    'float': [3.14, 6.28, 9.42],
    'str': ['A', 'B', 'C'],
    'bool': [True, False, True],
    'date': ['2019-01-01', '2020-01-01', '2020-01-10']
}))

def on_change(event):
    print('on change')
    print(event.new) #    int  float str   bool        date
                     # 0    1   3.14   A  False  2019-01-01
                     # 1    2   6.28   B  False  2020-01-01
                     # 2    3   9.42   C   True  2020-01-10

def on_edit(event):
    print('on edit')
    print(event) # TableEditEvent(column=bool, row=0, value=False, old=True)
    print(df.value) #    int  float str   bool        date
                    # 0    1   3.14   A  False  2019-01-01
                    # 1    2   6.28   B  False  2020-01-01
                    # 2    3   9.42   C   True  2020-01-10

def on_click(event):
    print(event) # CellClickEvent(column=int, row=0, value=1)

</script>
```

## Formatter 格式化器

### 使用 Bokeh Formatter

默认情况下，该组件会根据列的数据类型自动选择适合的Bokeh `CellFormatter`（单元格格式化器）和`CellEditor`（单元格编辑器）类型。用户也可以通过显式指定字典来覆盖默认设置，将列名映射到特定的编辑器或格式化器实例。例如在下面的示例中，我们创建了一个`NumberFormatter`来定制`float`列的数字格式，并使用`BooleanFormatter`实例以勾选/叉号形式显示`bool`列的值。

有效的 Bokeh 格式化程序列表包括：
* [BooleanFormatter](https://docs.bokeh.org/en/latest/docs/reference/models/widgets/tables.html#bokeh.models.BooleanFormatter)
* [DateFormatter](https://docs.bokeh.org/en/latest/docs/reference/models/widgets/tables.html#bokeh.models.DateFormatter)
* [NumberFormatter](https://docs.bokeh.org/en/latest/docs/reference/models/widgets/tables.html#bokeh.models.NumberFormatter)
* [HTMLTemplateFormatter](https://docs.bokeh.org/en/latest/docs/reference/models/widgets/tables.html#bokeh.models.HTMLTemplateFormatter)
* [StringFormatter](https://docs.bokeh.org/en/latest/docs/reference/models/widgets/tables.html#bokeh.models.StringFormatter)
* [ScientificFormatter](https://docs.bokeh.org/en/latest/docs/reference/models/widgets/tables.html#bokeh.models.ScientificFormatter)

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator :value="df.value" :formatters="formatters" />
</template>
<script lang='py'>
import pandas as pd
from vuepy import ref
from bokeh.models.widgets.tables import NumberFormatter, BooleanFormatter

df = ref(pd.DataFrame({
    'float': [3.14, 6.28, 9.42],
    'bool': [True, False, True]
}))

formatters = {
    'float': NumberFormatter(format='0.00000'),
    'bool': BooleanFormatter(),
}
</script>
```

### 使用 Tabulator Formatter

除了使用 Bokeh 提供的格式化器之外，还可以使用 Tabulator 库内置的有效格式化器。这些格式化器可以定义为字符串，或者以字典形式声明类型及其他参数（作为 `formatterParams` 传递给 Tabulator）。  

可用的 Tabulator 格式化器列表可在 [Tabulator 文档](https://tabulator.info/docs/6.3.1/format#format-builtin)中查阅。  

需要注意的是，类似的规则也可通过 `title_formatters` 参数应用于列标题（但不支持 Bokeh 的 `CellFormatter` 类型）。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator :value="df.value" :formatters="formatters" />
</template>
<script lang='py'>
import pandas as pd
from vuepy import ref

df = ref(pd.DataFrame({
    'float': [3.14, 6.28, 9.42],
    'bool': [True, False, True]
}))

formatters = {
    'float': {'type': 'progress', 'max': 10},
    'bool': {'type': 'tickCross'}
}
</script>
```

## Editors 编辑器

与格式化器类似，Tabulator 能够原生支持 Bokeh 的编辑器类型，但在底层实现中，它会将大部分 Bokeh 编辑器替换为 Tabulator 库原生支持的等效编辑器。

因此，通常更推荐直接使用 Tabulator 的原生编辑器。将某列的编辑器设为 None 会使该列不可编辑。需要注意的是，除了标准的 Tabulator 编辑器外，Tabulator 组件还额外支持 'date'（日期）和 'datetime'（日期时间）编辑器。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator :value="df.value" :editors="bokeh_editors" />
  <PnTabulator :value="df.value" :editors="tabulator_editors" />
</template>
<script lang='py'>
import pandas as pd
import datetime as dt
from bokeh.models.widgets.tables import CheckboxEditor, NumberEditor, SelectEditor
from vuepy import ref

df = ref(pd.DataFrame({
    'int': [1, 2, 3],
    'float': [3.14, 6.28, 9.42],
    'str': ['A', 'B', 'C'],
    'bool': [True, False, True],
    'date': [dt.date(2019, 1, 1), dt.date(2020, 1, 1), dt.date(2020, 1, 10)],
    'datetime': [dt.datetime(2019, 1, 1, 10), dt.datetime(2020, 1, 1, 12), dt.datetime(2020, 1, 10, 13)]
}, index=[1, 2, 3]))

bokeh_editors = {
    'float': NumberEditor(),
    'bool': CheckboxEditor(),
    'str': SelectEditor(options=['A', 'B', 'C', 'D']),
}

tabulator_editors = {
    'int': None,
    'float': {'type': 'number', 'max': 10, 'step': 0.1},
    'bool': {'type': 'tickCross', 'tristate': True, 'indeterminateValue': None},
    'str': {'type': 'list', 'valuesLookup': True},
    'date': 'date',
    'datetime': 'datetime'
}
</script>
```

### 嵌套编辑器

假设你需要让某个单元格的编辑器依赖于另一个单元格的值，可以使用 `nested type`。嵌套类型需要两个参数：`options` 和 `lookup_order`，其中 `lookup_order` 用于指定选项的查找顺序。

我们创建一个包含三列的简单 DataFrame，其中第 `2` 列的选项取决于第 `0` 列和第 `1` 列的值：
* 如果第 `0` 列的值为 `A`，则第 `2` 列的选项范围固定为 `1` 到 `5`。
* 如果第 `0` 列的值为 `B`，则第 `2` 列的选项还会进一步取决于第 `1` 列的值。

关于嵌套编辑器，需要注意以下几点：
* `options` 字典的键只能是字符串。
* 必须确保 `nested` 编辑器始终有可用的有效选项。
* 无法保证当前显示的值一定是有效选项（可能存在依赖关系变化导致的值失效）。

针对最后一点，你可以使用 `@edit`来修正或清空无效值。以下是一个清空无效值的示例：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator :value="nested_df.value" 
               :editors="tabulator_editors" 
               show_index
               @change='on_change'
               @edit='on_edit'
  />
</template>
<script lang='py'>
import pandas as pd
import datetime as dt
from bokeh.models.widgets.tables import CheckboxEditor, NumberEditor, SelectEditor
from vuepy import ref

options = {
    "A": ["A.1", "A.2", "A.3", "A.4", "A.5"],
    "B": {
        "1": ["B1.1", "B1.2", "B1.3"],
        "2": ["B2.1", "B2.2", "B2.3"],
        "3": ["B3.1", "B3.2", "B3.3"],
    },
}
tabulator_editors = {
    "0": {"type": "list", "values": ["A", "B"]},
    "1": {"type": "list", "values": [1, 2, 3]},
    "Nested Selection": {
        "type": "nested", 
        "options": options,
        "lookup_order": ["0", "1"],
    },
}

nested_df = ref(pd.DataFrame({
    "0": ["A", "B", "A"], 
    "1": [1, 2, 3], 
    "Nested Selection": [None, None, None],
}))

def on_change(event):
    print(event.new) #    0  1 Nested Selection
                     # 0  A  1              A.5
                     # 1  B  2             None
                     # 2  A  3             None

def on_edit(event):
    if event.column in ["0", "1"]:
        nested_table.patch({"2": [(event.row, None)]})
</script>
```

## 列布局

默认情况下，DataFrame 组件会根据内容自动调整列宽和表格大小，这对应参数 `layout="fit_data_table"` 的默认行为。此外，还支持其他布局模式，例如手动指定列宽、均分列宽或仅调整列尺寸。

### 手动设置列宽

如需手动设置列宽，只需为每列显式指定宽度：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <p> widths = {{  widths }}</p>
  <PnTabulator :value="df.value" :widths="widths" />

  <!-- declare a single width for all columns this way: -->
  <p> widths = {{ 130 }}</p>
  <PnTabulator :value="df.value" :widths="130" />

  <!-- use percentage widths: -->
  <p> widths = {{ percent_widths }}</p>
  <PnTabulator :value="df.value" :widths="percent_widths" 
               sizing_mode='stretch_width' />
</template>
<script lang='py'>
import pandas as pd
from vuepy import ref

df = ref(pd.DataFrame({
    'int': [1, 2, 3],
    'float': [3.14, 6.28, 9.42],
    'str': ['A', 'B', 'C']
}))

widths = {'int': 70, 'float': 100, 'str': 50}
percent_widths = {'index': '15%', 'int': '25%', 'float': '25%', 'str': '35%'}
</script>
```

### 自动调整列宽

通过 `layout` 参数自动调整列宽:
* fit_data_table（默认模式）：自动调整列宽并优化表格整体尺寸（最常用且推荐）：
* fit_data：根据列内容自动调整列宽（不拉伸表格整体宽度）。
* fit_data_stretch：在适应内容的同时，拉伸最后一列以填满可用空间。
* fit_data_fill：适应内容并填充空间，但不拉伸最后一列（其余列均分剩余宽度）。
* fit_columns：每列相同大小

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <p>layout='fit_data_table'</p>
  <PnTabulator :value="df.value" layout='fit_data_table' />

  <p>layout='fit_data'</p>
  <PnTabulator :value="df.value" layout='fit_data' :width="400" />

  <p>layout='fit_data_stretch'</p>
  <PnTabulator :value="df.value" layout='fit_data_stretch' :width="400" />

  <p>layout='fit_data_fill'</p>
  <PnTabulator :value="df.value" layout='fit_data_fill' :width="400" />

  <p>layout='fit_columns'</p>
  <PnTabulator :value="df.value" layout='fit_columns' :width="350" />
</template>
<script lang='py'>
import pandas as pd
from vuepy import ref

df = ref(pd.DataFrame({
    'int': [1, 2, 3],
    'float': [3.14, 6.28, 9.42],
    'str': ['A', 'B', 'C']
}))
</script>
```

## 对齐方式

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator 
    :value="df.value" 
    :header_align="'center'" 
    :text_align="{'int': 'center', 'float': 'left'}" 
    :widths="150" 
  />
</template>
<script lang='py'>
import pandas as pd
from vuepy import ref

df = ref(pd.DataFrame({
    'int': [1, 2, 3],
    'float': [3.14, 6.28, 9.42]
}))
</script>
```

## 样式设置

### 基本样式设置

根据表格内容或其他条件进行样式定制是一项非常重要的功能。幸运的是，`pandas` 提供了一个强大的 [styling APIiiii](https://pandas.pydata.org/pandas-docs/stable/user_guide/style.html)，可与 `Tabulator` 组件配合使用。具体来说，`Tabulator` 组件暴露了与 `pandas.DataFrame` 类似的 `.style` 属性，允许用户通过 `.apply` 和 `.applymap` 等方法应用自定义样式。详细指南可参考 [Pandas 官方文档](https://pandas.pydata.org/pandas-docs/stable/user_guide/style.html)。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator :value="df.value" ref='styled' />
</template>
<script lang='py'>
import pandas as pd
import numpy as np
from vuepy import ref, onMounted

df = ref(pd.DataFrame(np.random.randn(4, 5), columns=list('ABCDE')))
styled = ref(None)

def color_negative_red(val):
    color = 'red' if val < 0 else 'black'
    return f'color: {color}'

def highlight_max(s):
    is_max = s == s.max()
    return ['background-color: yellow' if v else '' for v in is_max]

@onMounted
def set_style():
    tab = styled.value.unwrap()
    tab.style.map(color_negative_red).apply(highlight_max)
    # tab.value.iloc[0, 0] = 1
</script>
```

### 渐变样式设置

通过 `.text_gradient`（文本渐变）或 `.background_gradient`（背景渐变）方法，配合 [Matplotlib 配色方案](https://matplotlib.org/stable/gallery/color/colormap_reference.html)，可以为表格添加渐变效果：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator :value="df.value" ref='styled'/>
</template>
<script lang='py'>
import pandas as pd
import numpy as np
from vuepy import ref, onMounted

df = ref(pd.DataFrame(np.random.randn(4, 5), columns=list('ABCDE')))
styled = ref(None)

@onMounted
def set_style():
    tab = styled.value.unwrap()
    tab.style.text_gradient(cmap="RdYlGn", subset=["B", "C"])
    tab.style.background_gradient(cmap="RdYlGn", subset=["D", "E"])
    # tab.value.iloc[0, 0] = 1
</script>
```

## 主题

Tabulator 库内置了多种主题，这些主题以 CSS 样式表的形式定义。因此，更改一个表格的主题会影响页面上的所有表格。通常建议在类级别统一设置主题，例如：

完整的主题列表请参阅 [Tabulator 文档](http://tabulator.info/docs/4.9/theme)，默认提供的主题包括：

* 'simple'
* 'default'
* 'midnight'
* 'site'
* 'modern'
* 'bootstrap'
* 'bootstrap4'
* 'materialize'
* 'semantic-ui'
* 'bulma'

此外，您还可以按照 [官方说明](https://tabulator.info/docs/6.2/theme#framework) 添加自定义主题类。

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol>
  <PnSelect :options='themes' v-model='theme.value' />
  <PnTabulator :value='df.value' :theme='theme.value'
               :theme_classes="['thead-dark', 'table-sm']" />
 </PnCol>
</template>
<script lang='py'>
import pandas as pd
from vuepy import ref

df = ref(pd.DataFrame({
    'int': [1, 2, 3],
    'float': [3.14, 6.28, 9.42]
}))

themes = [
    'simple',
    'default',
    'midnight',
    'site',
    'modern',
    'bootstrap',
    'bootstrap4',
    'materialize',
    'semantic-ui',
    'bulma',
]

theme = ref('simple')
</script>
```

### 更改字体大小

不同主题的字体大小可能有所不同。例如，“bootstrap”主题的字体大小为 13px，而“bootstrap5”主题的字体大小为 16px。以下是将主题“bootstrap5”的字体大小值覆盖为 10px 的一种方法。

```python
 <PnTabulator :stylesheets='[":host .tabulator {font-size: 10px;}"]' ...
```

## 选择/点击

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator :value="df.value" :selection="[0, 2]" selectable="checkbox" />
</template>
<script lang='py'>
import pandas as pd
from vuepy import ref

df = ref(pd.DataFrame({
    'int': [1, 2, 3],
    'float': [3.14, 6.28, 9.42]
}))
</script>
```

## 冻结行列
### 冻结列

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator :value="df.value" :frozen_columns="['int']" :width="200" />
</template>
<script lang='py'>
import pandas as pd
from vuepy import ref

df = ref(pd.DataFrame({
    'int': [1, 2, 3],
    'float': [3.14, 6.28, 9.42],
    'str': ['A', 'B', 'C']
}))
</script>
```

### 冻结行

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator :value="agg_df" :frozen_rows="[-2, -1]" :height="150" />
</template>
<script lang='py'>
import pandas as pd
from vuepy import ref

date_df = pd.DataFrame({
    'int': [1, 2, 3],
    'float': [3.14, 6.28, 9.42]
})
agg_df = pd.concat([
    date_df, 
    date_df.median().to_frame('Median').T, 
    date_df.mean().to_frame('Mean').T,
])
agg_df.index= agg_df.index.map(str)
</script>
```

## Row Content 行内容扩展

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator :value="periodic_df" :height=350 
               layout='fit_columns' sizing_mode='stretch_width'
               :row_content='content_fn' :embed_content='True' />
</template>
<script lang='py'>
from vuepy import ref
import panel as pn
from bokeh.sampledata.periodic_table import elements

periodic_df = elements[['atomic number', 'name', 'atomic mass', 'metal', 'year discovered']].set_index('atomic number')
content_fn = lambda row: pn.pane.HTML(
    f'<p>{row["name"]}</p>',
    sizing_mode='stretch_width'
)

# periodic_table = pn.widgets.Tabulator(
#     periodic_df, height=350, layout='fit_columns', sizing_mode='stretch_width',
#     row_content=content_fn, embed_content=True
# )

# periodic_table
</script>
```

## Groupby 分组

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator :value="df.value" :groups="{'Group 1': ['A', 'B'], 'Group 2': ['C', 'D']}" />
</template>
<script lang='py'>
import pandas as pd
from vuepy import ref

df = ref(pd.DataFrame({
    'A': [1, 2, 3],
    'B': [4, 5, 6],
    'C': [7, 8, 9],
    'D': [10, 11, 12]
}))
</script>
```

### 分层多级索引

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator :value="autompg_df" hierarchical  :height='200'
               :aggregators='{"origin": "mean", "yr": "mean"}'/>
</template>
<script lang='py'>
import pandas as pd
from bokeh.sampledata.autompg import autompg_clean as autompg_df

autompg_df = autompg_df.set_index(["origin", "yr", "mfr"])
</script>
```

## 分页

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator :value="df.value" pagination='remote' :page_size="3" />
</template>
<script lang='py'>
import pandas as pd
import numpy as np
from vuepy import ref

df = ref(pd.DataFrame({'A': np.random.rand(10000)}))
</script>
```

## 过滤

### 客户端过滤

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator 
    :value="df.value" 
    :header_filters="{
      'int': {'type': 'number', 'placeholder': 'Enter number'},
      'str': {'type': 'input', 'placeholder': 'Enter string'}
    }" 
    :height="140" 
    :width="400" 
    layout="fit_columns" 
  />
</template>
<script lang='py'>
import pandas as pd
from vuepy import ref

df = ref(pd.DataFrame({
    'int': [1, 2, 3],
    'str': ['A', 'B', 'C']
}))
</script>
```

## 下载

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol>
  <PnButton name='download' @click='on_click()'/>
  <PnTabulator :value="df.value" ref='tab'/>
 </PnCol>
</template>
<script lang='py'>
import pandas as pd
from vuepy import ref

df = ref(pd.DataFrame({
    'int': [1, 2, 3],
    'float': [3.14, 6.28, 9.42]
}))
tab = ref(None)

def on_click():
    if tab.value:
        tab.value.unwrap().download()
    
</script>
```

## 按钮

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator :value="df.value" :buttons="buttons" />
</template>
<script lang='py'>
import pandas as pd
from vuepy import ref

buttons = {
    'print': '<i class=\"fa fa-print\"></i>', 
    'check': '<i class=\"fa fa-check\"></i>',
}

df = ref(pd.DataFrame({
    'int': [1, 2, 3],
    'float': [3.14, 6.28, 9.42]
}))
</script>
```

## 流式数据

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator :value="df.value" layout='fit_columns' 
               :width='450' :height="200" ref='stream_tab' />
</template>
<script lang='py'>
import pandas as pd
import numpy as np
from vuepy import ref
import panel as pn

df = ref(pd.DataFrame(np.full((1, 5), 0), columns=list('ABCDE')))
stream_tab = ref(None)

count = 0

# In a real app, you would call this method periodically
def stream_data(follow=True):
    nonlocal count
    count += 1
    new_data = pd.DataFrame(np.full((1, 5), count), columns=list('ABCDE'))
    stream_tab.value.unwrap().stream(new_data, follow=follow)

pn.state.add_periodic_callback(stream_data, period=1000, count=4);
</script>
```

## 数据补丁

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol>
  <PnButton name='Patch' @click='on_click()'/>
  <PnTabulator :value="df.value" ref='tab_ref'/>
 </PnCol>
</template>
<script lang='py'>
import pandas as pd
from vuepy import ref

df = ref(pd.DataFrame({
    'int': [1, 2, 3],
    'float': [3.14, 6.28, 9.42],
    'bool': [True, False, True]
}))

tab_ref = ref(None)

def patch_data():
    tab = tab_ref.value
    if not tab:
        return
    tab.unwrap().patch({
        'bool': [(0, False), (2, False)],
        'int': [(slice(0, 2), [3, 2])]
    })

def on_click():
    patch_data()
</script>
```

## 静态配置

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTabulator 
    :value="df.value" 
    :configuration="{
      'clipboard': True,
      'rowHeight': 50,
      'columnDefaults': {
        'headerSort': False
      }
    }" 
  />
</template>
<script lang='py'>
import pandas as pd
from vuepy import ref

df = ref(pd.DataFrame({
    'int': [1, 2, 3],
    'float': [3.14, 6.28, 9.42]
}))
</script>
```

## API

### 属性
| 属性名               | 说明                                                                 | 类型                                                | 默认值            |
|----------------------|--------------------------------------------------------------------|---------------------------------------------------|------------------|
| aggregators          | 多级索引聚合配置（支持'min','max','mean','sum'）                      | ^[dict]                                           | {}               |
| buttons              | 表格按钮配置（列名到HTML内容的映射）                                   | ^[dict]                                           | {}               |
| configuration        | Tabulator原生配置选项                                                | ^[dict]                                           | {}               |
| editors              | 列编辑器配置（列名到编辑器实例的映射）                                  | ^[dict]                                           | {}               |
| embed_content        | 是否嵌入展开行内容                                                    | ^[bool]                                           | False            |
| expanded             | 当前展开的行索引列表                                                  | ^[list]                                           | []               |
| filters              | 客户端过滤器配置列表                                                  | ^[list]                                           | []               |
| formatters           | 列格式化器配置（列名到格式化器的映射）                                  | ^[dict]                                           | {}               |
| frozen_columns       | 固定列配置（列表或字典形式）                                            | ^[list\|dict]                                     | []               |
| frozen_rows          | 固定行索引列表                                                        | ^[list]                                           | []               |
| groupby              | 分组依据列名列表                                                      | ^[list]                                           | []               |
| header_align         | 表头对齐方式（'left','center','right'）                               | ^[dict\|str]                                      | 'left'           |
| header_filters       | 表头过滤器配置（布尔值或列配置字典）                                     | ^[bool\|dict]                                     | False            |
| header_tooltips      | 表头提示文本映射                                                      | ^[dict]                                           | {}               |
| hidden_columns       | 隐藏列名列表                                                          | ^[list]                                           | []               |
| hierarchical         | 是否启用多级索引分层显示                                                | ^[bool]                                           | False            |
| initial_page_size    | 初始每页行数（分页启用时）                                              | ^[int]                                            | 20               |
| layout               | 列布局模式（'fit_columns','fit_data'等）                              | ^[str]                                            | 'fit_data_table' |
| page                 | 当前页码（分页启用时）                                                 | ^[int]                                            | 1                |
| page_size            | 每页行数（None时自动计算）                                             | ^[int\|None]                                      | None             |
| pagination           | 分页模式（'local','remote'或None禁用）                                 | ^[str\|None]                                      | None             |
| row_content          | 行展开内容生成函数                                                     | ^[callable]                                       | None             |
| selection            | 当前选中行索引列表                                                     | ^[list]                                           | []               |
| selectable           | 选择模式配置（布尔/字符串/整数）                                         | ^[bool\|str\|int]                                 | True             |
| selectable_rows      | 可选行过滤函数                                                         | ^[callable]                                       | None             |
| show_index           | 是否显示索引列                                                         | ^[bool]                                           | True             |
| sortable             | 是否可排序（全局或按列配置）                                             | ^[bool\|dict]                                     | True             |
| sorters              | 排序器配置列表                                                         | ^[list]                                           | []               |
| text_align           | 文本对齐方式（'left','center','right'）                                | ^[dict\|str]                                      | 'left'           |
| theme                | CSS主题（'simple','bootstrap'等）                                     | ^[str]                                            | 'simple'         |
| theme_classes        | 额外CSS类列表                                                         | ^[list[str]]                                      | []               |
| title_formatters     | 标题格式化器配置                                                       | ^[dict]                                           | {}               |
| titles               | 列标题重写映射                                                         | ^[dict]                                           | {}               |
| value                | 显示的DataFrame数据                                                   | ^[pd.DataFrame]                                   | None             |
| widths               | 列宽度配置映射                                                         | ^[dict]                                           | {}               |
| disabled             | 是否禁用单元格编辑                                                     | ^[bool]                                           | False            |

### 计算属性

| 属性名            | 说明                                  | 类型                |
|-------------------|-------------------------------------|--------------------|
| | | |

### 事件

| 事件名    | 说明                          | 类型                     |
|----------|-----------------------------|------------------------|
| click | 单元格点击事件（含行列值信息）   | ^[CellClickEvent]      |
| edit  | 单元格编辑事件（含新旧值信息）    | ^[TableEditEvent]      |
| change | 数据更新事件   | ^[Event]      |

### 方法

| 方法名       | 说明                | 返回值类型  |
|-------------|-------------------|------------|
| download | 下载表格数据 | ^[Callable]`(filename: str, filetype: str) -> None` |
| patch | 更新数据表格 | ^[Callable]`(...) -> None` |

## Controls

```python
##controls
import panel as pn
import datetime as dt
import numpy as np
import pandas as pd

np.random.seed(7)
pn.extension('tabulator')
df = pd.DataFrame({
    'int': [1, 2, 3],
    'float': [3.14, 6.28, 9.42],
    'str': ['A', 'B', 'C'],
    'bool': [True, False, True],
    'date': [dt.date(2019, 1, 1), dt.date(2020, 1, 1), dt.date(2020, 1, 10)],
    'datetime': [dt.datetime(2019, 1, 1, 10), dt.datetime(2020, 1, 1, 12), dt.datetime(2020, 1, 10, 13)]
}, index=[1, 2, 3])

df_widget = pn.widgets.Tabulator(df, buttons={'Print': "<i class='fa fa-print'></i>"})
pn.Column(df_widget, df_widget.controls(jslink=False))
```
