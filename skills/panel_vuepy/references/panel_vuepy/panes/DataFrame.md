---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# DataFrame 数据框

`PnDataFrame` 组件将 pandas、dask 和 streamz 的 `DataFrame` 和 `Series` 类型渲染为 HTML 表格。该组件支持 `DataFrame.to_html` 函数的所有参数。

如果需要显示更大的 `DataFrame` 或使用高级表格功能和交互性，我们建议使用 `PnTabulator` 组件或 `PnPerspective` 组件。

底层实现为`panel.pane.DataFrame`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/DataFrame.html

## 基本用法

`PnDataFrame` 使用内置的 HTML 表示来渲染底层的 DataFrame：

## 参数控制

与所有其他 Panel 对象一样，更改参数将更新视图，使我们能够控制数据框的样式：

## HTML 标记

通过将 `escape` 设置为 False，您可以在 `DataFrame` 组件中包含 *HTML 标记*：

## 大型数据框

对于较大的数据框，设置 `sizing_mode="stretch_both"` 可以确保它们不会*溢出*很有用。这样做时，可以使用 `max_height` 指定（最大）高度：

## Streamz DataFrames

除了渲染标准的 pandas `DataFrame` 和 `Series` 类型外，`PnDataFrame` 组件还将渲染更新的 `streamz` 类型：
注意：
- 在活动内核中，您应该看到数据框每 0.5 秒更新一次。
- `streamz` 当前在 Pyodide/PyScript 中不起作用。

## API

### 属性

| 属性名      | 说明                 | 类型                                                           | 默认值 |
| ---------- | ------------------- | ---------------------------------------------------------------| ------- |
| object     | 被显示的DataFrame对象 | ^[pandas.DataFrame, dask.DataFrame, streamz.DataFrame]          | None |
| bold_rows  | 在输出中使行标签加粗  | ^[boolean]                                                      | True |
| border     | 在开始的table标签中包含的边框宽度 | ^[int]                                                | 0 |
| classes    | 应用于结果HTML表格的CSS类 | ^[list[str]]                                                | None |
| col_space  | 每列的最小宽度（以CSS长度单位表示）| ^[int, str, dict]                                    | None |
| decimal    | 识别为小数分隔符的字符，例如欧洲的',' | ^[str]                                             | '.' |
| escape     | 将字符 <, >, 和 & 转换为HTML安全序列 | ^[boolean]                                        | True |
| float_format | 如果列元素是浮点数，则应用的格式化函数 | ^[function]                                     | None |
| formatters | 按位置或名称应用于列元素的格式化函数 | ^[dict, list]                                       | None |
| header     | 是否打印列标签        | ^[boolean]                                                     | True |
| index      | 是否打印索引（行）标签 | ^[boolean]                                                     | True |
| index_names | 是否打印索引的名称    | ^[boolean]                                                     | True |
| justify    | 如何对齐列标签        | ^[str]                                                          | None |
| max_rows   | 要显示的最大行数      | ^[int]                                                          | None |
| max_cols   | 要显示的最大列数      | ^[int]                                                          | None |
| na_rep     | NAN的字符串表示      | ^[str]                                                          | 'NaN' |
| render_links | 将URL转换为HTML链接 | ^[boolean]                                                     | False |
| show_dimensions | 显示DataFrame维度（行数乘以列数） | ^[boolean]                                       | False |
| sparsify   | 对于具有分层索引的DataFrame，设置为False以在每行打印每个多索引键 | ^[boolean]            | True |
| text_align | 如何对齐非标题单元格  | ^[str]                                                         | None |
| sizing_mode | 尺寸调整模式         | ^[str]                                                         | 'fixed' |
| width      | 宽度                 | ^[int, str]                                                    | None |
| height     | 高度                 | ^[int, str]                                                    | None |
| max_height | 最大高度             | ^[int]                                                         | None |

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
