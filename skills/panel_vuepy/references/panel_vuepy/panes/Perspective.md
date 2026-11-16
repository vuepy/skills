---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Perspective 数据可视化

`PnPerspective` 组件提供了一个强大的可视化工具，用于处理大型实时数据集，基于 [Perspective 项目](https://perspective.finos.org/)。**`PnPerspective` 为您的数据应用程序带来了*类似Excel*的功能**。查看 [Perspective 示例库](https://perspective.finos.org/examples/) 获取灵感。

`PnPerspective` 组件是 [`Tabulator`](../widgets/Tabulator.ipynb) 小部件的一个很好的替代品。

底层实现为`panel.pane.Perspective`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/Perspective.html

## 基本用法

`PnPerspective` 组件将指定为字典列表或数组以及 pandas DataFrame 的数据列呈现为交互式表格：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnPerspective :object="df" :width="600" :height='300'/>
</template>
<script lang='py'>
import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# 创建示例数据
data = {
    'int': [random.randint(-10, 10) for _ in range(9)],
    'float': [random.uniform(-10, 10) for _ in range(9)],
    'date': [(datetime.now() + timedelta(days=i)).date() for i in range(9)],
    'datetime': [(datetime.now() + timedelta(hours=i)) for i in range(9)],
    'category': ['类别 A', '类别 B', '类别 C', '类别 A', '类别 B',
             '类别 C', '类别 A', '类别 B', '类别 C',],
    'link': ['https://panel.holoviz.org/', 'https://discourse.holoviz.org/', 'https://github.com/holoviz/panel']*3,
}
df = pd.DataFrame(data)
</script>
```

试着与 `PnPerspective` 组件交互：

- 左上角的三个垂直点会切换*配置菜单*
- 每列顶部的三条垂直线会切换*列配置菜单*
- 顶部菜单提供选项来更改*插件*以及*分组*、*拆分*、*排序*和*过滤*数据
- 底部菜单提供选项来*重置*、*下载*和*复制*以及*更改主题*

默认情况下会显示 `index`。如果您默认不想显示它，可以提供要显示的 `columns` 列表：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnPerspective :object="df" :columns="list(df.columns)" 
                 :width="600" :height='300'/>
</template>
<script lang='py'>
import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# 创建示例数据
data = {
    'int': [random.randint(-10, 10) for _ in range(9)],
    'float': [random.uniform(-10, 10) for _ in range(9)],
    'date': [(datetime.now() + timedelta(days=i)).date() for i in range(9)],
    'datetime': [(datetime.now() + timedelta(hours=i)) for i in range(9)],
    'category': ['类别 A', '类别 B', '类别 C', '类别 A', '类别 B',
             '类别 C', '类别 A', '类别 B', '类别 C',],
    'link': [
        'https://panel.holoviz.org/', 
        'https://discourse.holoviz.org/', 
        'https://github.com/holoviz/panel',
    ] * 3,
}
df = pd.DataFrame(data)
</script>
```

您也可以通过 `settings` 参数隐藏*配置菜单*：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnPerspective 
    :object="df" 
    :columns="['float']" 
    :group_by="['category']" 
    plugin="d3_y_bar" 
    :settings="False"
    :width="400" 
    :height="300" />
</template>
<script lang='py'>
import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# 创建示例数据
data = {
    'int': [random.randint(-10, 10) for _ in range(9)],
    'float': [random.uniform(-10, 10) for _ in range(9)],
    'date': [(datetime.now() + timedelta(days=i)).date() for i in range(9)],
    'datetime': [(datetime.now() + timedelta(hours=i)) for i in range(9)],
    'category': ['类别 A', '类别 B', '类别 C', '类别 A', '类别 B',
             '类别 C', '类别 A', '类别 B', '类别 C',],
    'link': ['https://panel.holoviz.org/', 'https://discourse.holoviz.org/', 'https://github.com/holoviz/panel']*3,
}
df = pd.DataFrame(data)
</script>
```

通过点击左上角的 3 个垂直点，尝试切换*配置菜单*与 `PnPerspective` 组件交互。

## 插件配置

您可以手动配置活动*插件*，如下所示为*数据网格*

![perspective_edit](https://panel.holoviz.org/assets/perspective_edit.png)

您还可以通过 `columns_config` 参数以编程方式配置*列*配置：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnPerspective 
    :object="df" 
    :columns="list(df.columns)" 
    :width="600"
    :height='300'
    :columns_config="columns_config" />
</template>
<script lang='py'>
import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# 创建示例数据
data = {
    'int': [random.randint(-10, 10) for _ in range(9)],
    'float': [random.uniform(-10, 10) for _ in range(9)],
    'date': [(datetime.now() + timedelta(days=i)).date() for i in range(9)],
    'datetime': [(datetime.now() + timedelta(hours=i)) for i in range(9)],
    'category': ['类别 A', '类别 B', '类别 C', '类别 A', '类别 B',
             '类别 C', '类别 A', '类别 B', '类别 C',],
    'link': [
        'https://panel.holoviz.org/', 
        'https://discourse.holoviz.org/', 
        'https://github.com/holoviz/panel'] * 3,
}
df = pd.DataFrame(data)

# 列配置
columns_config = {
    'int': {'number_fg_mode': 'color', 'neg_fg_color': '#880808', 'pos_fg_color': '#008000', "fixed": 0},
    'float': {'number_fg_mode': "bar", 'neg_fg_color': '#880808', 'pos_fg_color': '#008000', 'fg_gradient': 7.93,  },
    'category': {'string_color_mode': 'series', 'format': 'italics'},
    'date': {"dateStyle": "short", "datetime_color_mode": "foreground", "color": "#008000"},
    'datetime': {"timeZone": "Asia/Shanghai", "dateStyle": "full", "timeStyle": "full", "datetime_color_mode": "background", "color": "#880808"},
    'link': {'format': 'link', 'string_color_mode': 'foreground', 'color': '#008000'},
}
</script>
```

请注意：

- 提供 `plugin_config` 时，您也可以使用*命名*颜色，如 'green'。但如果这样做，它们将不会在*列配置菜单*的*颜色选择器*中设置。

有关可用选项的更多详细信息，请参阅下面的[列配置选项部分](#列配置选项)。

## 时区处理

底层的 Perspective Viewer 假设*非时区*感知的日期时间是 UTC 时间。默认情况下，它会在您的本地时区中显示它们。

如果您的数据不是时区感知的，您可以将它们设置为时区感知。我的服务器时区是 'cet'，我可以按如下方式使它们感知时区：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnColumn>
    <PnTabulator :value="df_aware.head(3)" />
    <PnPerspective :object="df_aware" :columns="list(df.columns)" 
                   :width="600" :height='300' />
  </PnColumn>
</template>
<script lang='py'>
import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# 创建示例数据
data = {
    'int': [random.randint(-10, 10) for _ in range(9)],
    'float': [random.uniform(-10, 10) for _ in range(9)],
    'date': [(datetime.now() + timedelta(days=i)).date() for i in range(9)],
    'datetime': [(datetime.now() + timedelta(hours=i)) for i in range(9)],
    'category': ['类别 A', '类别 B', '类别 C', '类别 A', '类别 B',
             '类别 C', '类别 A', '类别 B', '类别 C',],
    'link': ['https://panel.holoviz.org/', 'https://discourse.holoviz.org/', 'https://github.com/holoviz/panel']*3,
}
df = pd.DataFrame(data)

# 创建时区感知副本
df_aware = df.copy(deep=True)
df_aware['datetime'] = df_aware['datetime'].dt.tz_localize("cet")
</script>
```

如上节所示，您可以强制日期时间以特定时区显示：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnPerspective 
    :object="df_aware" 
    :width="600"
    :height='300'
    :columns="list(df.columns)" 
    :plugin_config="plugin_config" />
</template>
<script lang='py'>
import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# 创建示例数据
data = {
    'int': [random.randint(-10, 10) for _ in range(9)],
    'float': [random.uniform(-10, 10) for _ in range(9)],
    'date': [(datetime.now() + timedelta(days=i)).date() for i in range(9)],
    'datetime': [(datetime.now() + timedelta(hours=i)) for i in range(9)],
    'category': ['类别 A', '类别 B', '类别 C', '类别 A', '类别 B',
             '类别 C', '类别 A', '类别 B', '类别 C',],
    'link': ['https://panel.holoviz.org/', 'https://discourse.holoviz.org/', 'https://github.com/holoviz/panel']*3,
}
df = pd.DataFrame(data)

# 创建时区感知副本
df_aware = df.copy(deep=True)
df_aware['datetime'] = df_aware['datetime'].dt.tz_localize("cet")

# 插件配置
plugin_config = {'columns': {'datetime': {"timeZone": "Europe/London", "timeStyle": "full"}}}
</script>
```

## 流式处理和补丁更新

`PnPerspective` 组件还支持 `stream` 和 `patch` 方法，使我们能够高效地更新数据：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnPerspective 
    ref="stream_perspective"
    :object="df_stream" 
    plugin="d3_y_line" 
    :columns="['A', 'B', 'C', 'D']" 
    sizing_mode="stretch_width" 
    :height="500" 
    :margin="0" />
  <PnCol>
    <PnNumberInput v-model="period.value" name="更新频率(毫秒)" />
    <PnIntInput v-model="rollover.value" name="保留的数据点数量" />
    <PnButton @click='start_stream()'>开始流式处理</PnButton>
    <PnButton @click='stop_stream()'>停止流式处理</PnButton>
  </PnCol>
</template>
<script lang='py'>
import pandas as pd
import numpy as np
from vuepy import ref
import panel as pn

# 创建示例数据
df_stream = pd.DataFrame(np.random.randn(400, 4), columns=list('ABCD')).cumsum()

# 流式处理控制
period = ref(50)
rollover = ref(500)
streaming = ref(False)
callback = None
stream_perspective = ref(None)

def stream():
    print('xxx')
    data = df_stream.iloc[-1] + np.random.randn(4)
    perspective = strestream_perspective.value.unwrap()
    perspective.stream(data, rollover.value)

def start_stream():
    nonlocal callback
    streaming.value = True
    print('xxxxx')
    callback = pn.state.add_periodic_callback(stream, period.value)

def stop_stream():
    nonlocal callback
    streaming.value = False
    if callback and callback.running:
        callback.stop()
</script>
```

或者，我们也可以使用 `patch` 方法更新数据：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnPerspective 
    ref="perspective_ref"
    :object="mixed_df" 
    :columns="list(mixed_df)" 
    :height="500" />
  <PnButton @click="patch_data()">修补数据</PnButton>
</template>
<script lang='py'>
import pandas as pd
import numpy as np
from vuepy import ref

perspective_ref = ref(None)

# 创建混合类型数据
mixed_df = pd.DataFrame({'A': np.arange(10), 'B': np.random.rand(10), 'C': [f'foo{i}' for i in range(10)]})

def patch_data():
    perspective = perspective_ref.value.unwrap()
    # 修补 'A' 列的第 0 行和 'C' 列的前两行
    perspective.patch({'A': [(0, 3)], 'C': [(slice(0, 1), 'bar')]})
</script>
```

通过流式处理您想要可见的数据并将 rollover 设置为等于新数据的行数，可以实现删除行。通过这种方式，有效地删除旧行。目前不支持以类似于修补的方式按索引删除特定行。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnPerspective 
    ref="perspective_ref"
    :object="data" 
    :height="500" />
  <PnButton @click="stream_smaller()">流式处理更小的数据集</PnButton>
</template>
<script lang='py'>
import pandas as pd
import numpy as np
from vuepy import ref

perspective_ref = ref(None)

# 创建简单数据
data = {'A': np.arange(2)}

def stream_smaller():
    perspective = perspective_ref.value.unwrap()
    smaller_data = {'A': np.arange(5)}
    perspective.stream(smaller_data, rollover=5)
</script>
```

## 列配置选项

底层 FinOS Perspective viewer 的*插件和列配置选项*没有很好的文档记录。找到它们的最佳方法是：

- 通过上面的*Controls*小部件交互式探索
- 探索 [Perspective 示例库](https://perspective.finos.org/examples/)
- 从 [Perspective GitHub 仓库](https://github.com/finos/perspective)进行逆向工程
  - 例如，对于 `Datagrid` 插件，配置*数字*列的选项定义在 [number_column_style.rs](https://github.com/finos/perspective/blob/master/rust/perspective-viewer/src/rust/config/number_column_style.rs)中

以下列出了我们能够找到并且看到有效的一些最有用的选项。

> **注意**：下面的一些选项是*驼峰式*的，如 `timeZone`。我们预计这是一个错误，FinOS Perspective 某天会修复。如果一个*驼峰式*选项停止工作，请尝试将其*蛇形式*化。例如，改为 `time_zone`。请在 [Github](https://github.com/holoviz/panel/issues) 上报告更改。

## API

### 属性

| 属性名            | 说明                          | 类型                                                           | 默认值 |
| ---------------- | ----------------------------- | ---------------------------------------------------------------| ------- |
| object           | 作为字典数组或DataFrame声明的绘图数据 | ^[dict, pd.DataFrame]                                       | None |
| aggregates       | 聚合规范，例如 {x: "distinct count"} | ^[dict]                                                    | None |
| columns          | 要显示的列名列表或带有列配置选项的字典 | ^[list, dict]                                               | None |
| columns_config   | 列配置，允许为每列指定格式化器、着色和各种其他属性 | ^[dict]                                           | None |
| editable         | 项目是否可编辑                | ^[bool]                                                         | True |
| expressions      | 表达式列表，例如 `['"x"+"y"']` | ^[list]                                                        | None |
| filters          | 过滤器列表，例如 `[["x", "<", 3], ["y", "contains", "abc"]]` | ^[list]                           | None |
| group_by         | 要分组的列列表，例如 `["x", "y"]` | ^[list]                                                      | None |
| plugin           | 用于显示数据的插件名称。例如 'datagrid' 或 'd3_xy_scatter' | ^[str]                              | None |
| plugin_config    | PerspectiveViewerPlugin 的配置 | ^[dict]                                                        | None |
| selectable       | 行是否可选择                  | ^[bool]                                                         | True |
| settings         | 是否显示设置面板              | ^[bool]                                                         | True |
| sort             | 排序规范列表，例如 `[["x", "desc"]]` | ^[list]                                                   | None |
| split_by         | 要透视的列列表。例如 `["x", "y"]` | ^[list]                                                     | None |
| theme            | 查看器的主题，可用选项包括 'pro'、'pro-dark'、'monokai'、'solarized'、'solarized-dark' 和 'vaporwave' | ^[str] | None |
| title            | Perspective Viewer 的标题     | ^[str]                                                          | None |
| sizing_mode      | 尺寸调整模式                  | ^[str]                                                         | 'fixed'  |
| width            | 宽度                          | ^[int, str]                                                    | None    |
| height           | 高度                          | ^[int, str]                                                    | None    |
| min_width        | 最小宽度                      | ^[int]                                                         | None    |
| min_height       | 最小高度                      | ^[int]                                                         | None    |
| max_width        | 最大宽度                      | ^[int]                                                         | None    |
| max_height       | 最大高度                      | ^[int]                                                         | None    |
| margin           | 外边距                        | ^[int, tuple]                                                  | 5       |
| css_classes      | CSS类名列表                   | ^[list]                                                        | []      |

### 回调

* **`on_click`**: 允许注册回调，这些回调接收包含被点击项的 `config`、`column_names` 和 `row` 的 `PerspectiveClickEvent` 对象。

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
| patch | 更新特定行和列的数据 | dict, rollover=None |
| stream | 将新数据附加到现有数据上 | obj, rollover=None |

## Controls

```python
##controls
import panel as pn
import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

pn.extension('perspective')

data = {
    'int': [random.randint(-10, 10) for _ in range(9)],
    'float': [random.uniform(-10, 10) for _ in range(9)],
    'date': [(datetime.now() + timedelta(days=i)).date() for i in range(9)],
    'datetime': [(datetime.now() + timedelta(hours=i)) for i in range(9)],
    'category': ['Category A', 'Category B', 'Category C', 'Category A', 'Category B',
             'Category C', 'Category A', 'Category B', 'Category C',],
    'link': ['https://panel.holoviz.org/', 'https://discourse.holoviz.org/', 'https://github.com/holoviz/panel']*3,
}
df = pd.DataFrame(data)

p = pn.pane.Perspective(df, width=1000)
pn.Column(
    # p,
    p.controls(),
)
```
