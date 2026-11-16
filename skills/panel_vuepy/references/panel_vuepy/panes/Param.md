---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Param 参数组件

`PnParam` 组件允许自定义 `param.Parameterized` 类参数的小部件、布局和样式。通过该组件，可以轻松地为参数化模型创建交互式界面。

底层实现为`panel.pane.Param`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/Param.html

## 基本用法

`PnParam` 组件可以用来查看和编辑参数化模型。下面我们构建一个骑行运动员及其功率曲线的模型作为示例：

```python
##controls
import panel as pn
import param

pn.extension()
import datetime
import pandas as pd
import hvplot.pandas

DATE_BOUNDS = (datetime.date(1900, 1, 1), datetime.datetime.now().date())

class PowerCurve(param.Parameterized):
    ten_sec = param.Number(default=1079)
    ten_sec_date = param.Date(default=datetime.date(2018, 8, 21), bounds=DATE_BOUNDS)
    one_min = param.Number(default=684)
    one_min_date = param.Date(default=datetime.date(2017, 8, 31), bounds=DATE_BOUNDS)
    ten_min = param.Number(default=419)
    ten_min_date = param.Date(default=datetime.date(2017, 9, 22), bounds=DATE_BOUNDS)
    twenty_min = param.Number(default=398)
    twenty_min_date = param.Date(default=datetime.date(2017, 9, 22), bounds=DATE_BOUNDS)
    one_hour = param.Number(default=319)
    one_hour_date = param.Date(default=datetime.date(2017, 8, 6), bounds=DATE_BOUNDS)
    
    @param.depends("ten_sec", "one_min", "ten_min", "twenty_min", "one_hour")
    def plot(self):
        data = {
            "duration": [10 / 60, 1, 10, 20, 60],
            "power": [self.ten_sec, self.one_min, self.ten_min, self.twenty_min, self.one_hour],
        }
        dataframe = pd.DataFrame(data)
        line_plot = dataframe.hvplot.line(
            x="duration", y="power", line_color="#007BFF", line_width=3, responsive=True,
        )
        scatter_plot = dataframe.hvplot.scatter(
            x="duration", y="power", marker="o", size=6, color="#007BFF", responsive=True
        )
        fig = line_plot * scatter_plot
        gridstyle = {"grid_line_color": "black", "grid_line_width": 0.1}
        fig = fig.opts(
            min_height=400,
            toolbar=None,
            yticks=list(range(0, 1600, 200)),
            ylim=(0, 1500),
            gridstyle=gridstyle,
            show_grid=True,
        )
        return fig

class Athlete(param.Parameterized):
    name_ = param.String(default="P.A. Nelson")
    birthday = param.Date(default=datetime.date(1976, 9, 17), bounds=DATE_BOUNDS)
    weight = param.Number(default=82, bounds=(20,300))
    power_curve = param.ClassSelector(class_=PowerCurve, default=PowerCurve())
    
athlete = Athlete()
p = pn.Param(athlete)
p
```

## 自定义小部件

我们可以为特定参数自定义小部件类型：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnParam :object="athlete.param" :widgets="widgets"/>
  <hr/>
  <PnParam :object="athlete.param">
    <template #weight>
      <PnLiteralInput name='Weight' />
    </template>
    <template #birthday>
      <PnDatePicker name='Birthday' />
    </template>
  </PnParam>
</template>
<script lang='py'>
import param
import datetime
import panel as pn

DATE_BOUNDS = (datetime.date(1900, 1, 1), datetime.datetime.now().date())

class Athlete(param.Parameterized):
    name_ = param.String(default="P.A. Nelson")
    birthday = param.Date(default=datetime.date(1976, 9, 17), bounds=DATE_BOUNDS)
    weight = param.Number(default=82, bounds=(20, 300))

athlete = Athlete()

import ipywidgets as iw
# 自定义小部件
widgets = {
    "birthday": pn.widgets.DatePicker, 
    "weight": pn.widgets.LiteralInput(),
}
</script>
```

## 展开子对象

我们可以通过 `expand` 参数默认展开子对象：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnParam 
    :object="athlete.param" 
    :expand="True" />
</template>
<script lang='py'>
import param
import datetime
import panel as pn

DATE_BOUNDS = (datetime.date(1900, 1, 1), datetime.datetime.now().date())

class PowerCurve(param.Parameterized):
    one_hour_date = param.Date(default=datetime.date(2017, 8, 6), bounds=DATE_BOUNDS)

class Athlete(param.Parameterized):
    weight = param.Number(default=82, bounds=(20, 300))
    power_curve = param.ClassSelector(class_=PowerCurve, default=PowerCurve())

athlete = Athlete()
</script>
```

## 选择特定参数和自定义布局

我们可以选择只显示特定参数，并自定义布局：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnParam 
    :object="athlete.param"
    :widgets="widgets"
    :parameters="['name_', 'birthday', 'weight']"
    :show_name="False"
    :default_layout="PnRow"
    :width="600" />
  <hr/>
  <PnParam 
    :object="athlete.param"
    :parameters="['name_', 'birthday', 'weight']"
    :show_name="False"
    :default_layout="PnRow"
    :width="600">
    <template #weight>
      <PnLiteralInput name='Weight' :width=100 />
    </template>
    <template #birthday>
      <PnDatePicker name='Birthday' />
    </template>
  </PnParam>
</template>
<script lang='py'>
import param
import datetime
import panel as pn

DATE_BOUNDS = (datetime.date(1900, 1, 1), datetime.datetime.now().date())

class Athlete(param.Parameterized):
    name_ = param.String(default="P.A. Nelson")
    birthday = param.Date(default=datetime.date(1976, 9, 17), bounds=DATE_BOUNDS)
    weight = param.Number(default=82, bounds=(20, 300))

athlete = Athlete()

# 自定义小部件
widgets = {
    "birthday": pn.widgets.DatePicker,
    "weight": {"type": pn.widgets.LiteralInput, "width": 100}
}

# 导入布局组件
PnRow = pn.Column
</script>
```

## 滑块控件的连续更新禁用

当函数运行时间较长并且依赖于某个参数时，实时反馈可能成为负担，而不是有帮助。因此，如果参数使用的是滑块控件，可以通过设置 `throttled` 关键字为 `True` 来仅在释放鼠标按钮后才执行函数。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnParam :object="model.param" :widgets="widgets" />
</template>
<script lang='py'>
import param
import panel as pn

class Model(param.Parameterized):
    without_throttled_enabled = param.Range(
        default=(100, 250),
        bounds=(0, 250),
    )

    with_throttled_enabled = param.Range(
        default=(100, 250),
        bounds=(0, 250),
    )

    @param.depends("without_throttled_enabled", "with_throttled_enabled")
    def result(self):
        return f"无节流: {self.without_throttled_enabled}, 有节流: {self.with_throttled_enabled}"

model = Model()

widgets = {
    "without_throttled_enabled": pn.widgets.IntRangeSlider,
    "with_throttled_enabled": {
        "type": pn.widgets.IntRangeSlider,
        "throttled": True,
    },
}
</script>
```

## 组合参数控件与结果显示

可以组合参数控件与计算结果显示：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol>
    <PnMarkdown>### 运动员</PnMarkdown>
    <PnParam 
      :object="athlete.param"
      :widgets="athlete_widgets"
      :parameters="['name_', 'birthday', 'weight']"
      :show_name="False"
      :default_layout="PnRow"
      :width="600" />
    
    <PnMarkdown>#### 功率曲线</PnMarkdown>
    <PnRow>
      <PnParam 
        :object="athlete.power_curve.param"
        :default_layout="grid_layout"
        :show_name="False"
        :widgets="power_curve_widgets" />
    </PnRow>
    <PnDisplay :obj="athlete.power_curve.plot()" />
  </PnCol>
</template>
<script lang='py'>
import param
import datetime
import pandas as pd
import hvplot.pandas
import panel as pn

DATE_BOUNDS = (datetime.date(1900, 1, 1), datetime.datetime.now().date())

class PowerCurve(param.Parameterized):
    ten_sec = param.Number(default=1079)
    ten_sec_date = param.Date(default=datetime.date(2018, 8, 21), bounds=DATE_BOUNDS)
    one_min = param.Number(default=684)
    one_min_date = param.Date(default=datetime.date(2017, 8, 31), bounds=DATE_BOUNDS)
    ten_min = param.Number(default=419)
    ten_min_date = param.Date(default=datetime.date(2017, 9, 22), bounds=DATE_BOUNDS)
    twenty_min = param.Number(default=398)
    twenty_min_date = param.Date(default=datetime.date(2017, 9, 22), bounds=DATE_BOUNDS)
    one_hour = param.Number(default=319)
    one_hour_date = param.Date(default=datetime.date(2017, 8, 6), bounds=DATE_BOUNDS)
    
    @param.depends("ten_sec", "one_min", "ten_min", "twenty_min", "one_hour")
    def plot(self):
        data = {
            "duration": [10 / 60, 1, 10, 20, 60],
            "power": [self.ten_sec, self.one_min, self.ten_min, self.twenty_min, self.one_hour],
        }
        dataframe = pd.DataFrame(data)
        line_plot = dataframe.hvplot.line(
            x="duration", y="power", line_color="#007BFF", line_width=3, responsive=True,
        )
        scatter_plot = dataframe.hvplot.scatter(
            x="duration", y="power", marker="o", size=6, color="#007BFF", responsive=True
        )
        fig = line_plot * scatter_plot
        gridstyle = {"grid_line_color": "black", "grid_line_width": 0.1}
        fig = fig.opts(
            min_height=400,
            toolbar=None,
            yticks=list(range(0, 1600, 200)),
            ylim=(0, 1500),
            gridstyle=gridstyle,
            show_grid=True,
        )
        return fig

class Athlete(param.Parameterized):
    name_ = param.String(default="P.A. Nelson")
    birthday = param.Date(default=datetime.date(1976, 9, 17), bounds=DATE_BOUNDS)
    weight = param.Number(default=82, bounds=(20, 300))
    power_curve = param.ClassSelector(class_=PowerCurve, default=PowerCurve())

athlete = Athlete()

# 自定义小部件
athlete_widgets = {
    "birthday": pn.widgets.DatePicker,
    "weight": {"type": pn.widgets.LiteralInput, "width": 100}
}

power_curve_widgets = {
    "ten_sec_date": pn.widgets.DatePicker, 
    "one_min_date": pn.widgets.DatePicker, 
    "ten_min_date": pn.widgets.DatePicker,
    "twenty_min_date": pn.widgets.DatePicker, 
    "one_hour_date": pn.widgets.DatePicker
}

# 导入布局组件
PnRow = pn.Row
PnColumn = pn.Column

# 创建一个新的网格布局类
def new_class(cls, **kwargs):
    "创建一个覆盖参数默认值的新类。"
    return type(type(cls).__name__, (cls,), kwargs)

grid_layout = new_class(pn.GridBox, ncols=2)
</script>
```

## API

### 属性

| 属性名            | 说明                          | 类型                                                           | 默认值 |
| ---------------- | ----------------------------- | ---------------------------------------------------------------| ------- |
| object           | `param.Parameterized` 类的 `param` 属性 | ^[param.parameterized.Parameters]                     | None |
| parameters       | 标识要包含在窗格中的参数子集的列表 | ^[List[str]]                                                | [] |
| widgets          | 指定特定参数使用哪些小部件的字典。还可以指定小部件属性 | ^[Dict]                               | {} |
| default_layout   | 布局，如 Column、Row 等，或自定义 GridBox | ^[ClassSelector]                                    | Column |
| display_threshold | 优先级低于此值的参数不会显示 | ^[float]                                                        | 0 |
| expand           | 参数化子对象在实例化时是否展开或折叠 | ^[bool]                                                   | False |
| expand_button    | 是否添加展开和折叠子对象的按钮 | ^[bool]                                                        | True |
| expand_layout    | 展开子对象的布局 | ^[layout]                                                                   | Column |
| name             | 窗格的标题 | ^[str]                                                                           | '' |
| show_labels      | 是否显示标签 | ^[bool]                                                                        | True |
| show_name        | 是否显示参数化类的名称 | ^[bool]                                                              | True |
| sizing_mode      | 尺寸调整模式 | ^[str]                                                                         | 'fixed'  |
| width            | 宽度 | ^[int, str]                                                                           | None    |
| height           | 高度 | ^[int, str]                                                                           | None    |
| min_width        | 最小宽度 | ^[int]                                                                            | None    |
| min_height       | 最小高度 | ^[int]                                                                            | None    |
| max_width        | 最大宽度 | ^[int]                                                                            | None    |
| max_height       | 最大高度 | ^[int]                                                                            | None    |
| margin           | 外边距 | ^[int, tuple]                                                                       | 5       |
| css_classes      | CSS类名列表 | ^[list]                                                                        | []      |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| Param的字段 | 自定义widget      |

## Controls

```python
##controls
import panel as pn
import param
import datetime
import pandas as pd
import hvplot.pandas

pn.extension()

DATE_BOUNDS = (datetime.date(1900, 1, 1), datetime.datetime.now().date())

class Athlete(param.Parameterized):
    name_ = param.String(default="P.A. Nelson")
    birthday = param.Date(default=datetime.date(1976, 9, 17), bounds=DATE_BOUNDS)
    weight = param.Number(default=82, bounds=(20, 300))

athlete = Athlete()

p = pn.Param(athlete)
pn.Row(p.controls, p)
```
