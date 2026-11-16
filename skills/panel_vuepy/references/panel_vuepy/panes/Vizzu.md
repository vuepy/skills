---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Vizzu 可视化图表组件

`Vizzu`组件在Panel中渲染[Vizzu](https://lib.vizzuhq.com/)图表。注意，要在notebook中使用`Vizzu`组件，必须在加载Panel扩展时将'vizzu'作为参数传递，以确保初始化vizzu.js。

底层实现为`panel.pane.Vizzu`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/Vizzu.html

## 基本用法

`PnVizzu`组件可以根据`config`定义如何绘制数据（以列字典或DataFrame的形式定义）：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVizzu :object="data" 
           :config="{'geometry': 'rectangle', 'x': 'Name', 
                     'y': 'Weight', 'title': 'Weight by person'}"
           :duration="400" 
           :height="400" 
           sizing_mode="stretch_width" 
           :tooltip="True" />
</template>

<script lang='py'>
import numpy as np

# Create sample data
data = {
    'Name': ['Alice', 'Bob', 'Ted', 'Patrick', 'Jason', 'Teresa', 'John'],
    'Weight': 50+np.random.randint(0, 10, 7)*10
}
</script>
```

Vizzu的主要卖点之一是在数据或`config`更新时的动态动画。例如，如果我们更改"geometry"，可以看到动画在两种状态之间平滑过渡。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVizzu ref="vizzu_ref" 
           :object="data" 
           :config="config.value"
           :duration="400" 
           :height="400" 
           sizing_mode="stretch_width" 
           :tooltip="True" />
  <PnRow>
    <PnButton @click="changeToCircle()">Change to Circle</PnButton>
    <PnButton @click="changeToArea()">Change to Area</PnButton>
    <PnButton @click="changeToRectangle()">Change to Rectangle</PnButton>
  </PnRow>
</template>

<script lang='py'>
import numpy as np
from vuepy import ref

# Create sample data
data = {
    'Name': ['Alice', 'Bob', 'Ted', 'Patrick', 'Jason', 'Teresa', 'John'],
    'Weight': 50+np.random.randint(0, 10, 7)*10
}

config = ref({'geometry': 'rectangle', 'x': 'Name', 'y': 'Weight', 
              'title': 'Weight by person'})
vizzu_ref = ref(None)

def changeToCircle():
    config.value = {**config.value, 'geometry': 'circle'}
    
def changeToArea():
    config.value = {**config.value, 'geometry': 'area'}
    
def changeToRectangle():
    vizzu = vizzu_ref.value.unwrap()
    vizzu.animate({'geometry': 'rectangle'})
    config.value = vizzu.config
</script>
```

## 列类型

`PnVizzu`支持两种列类型：

- `'dimension'`：通常用于非数值数据和/或图表的独立维度（例如x轴）
- `'measure'`：数值通常用于图表的因变量（例如y轴值）

`PnVizzu`组件会根据数据的dtypes自动推断类型，但在某些情况下，可能需要使用`column_types`参数显式覆盖列的类型。一个常见的例子是在x轴上绘制整数时，通常会被视为"measure"，但在折线图或条形图的情况下应该被视为独立维度。

下面的示例演示了这种情况，这里我们希望将"index"视为独立变量，并使用`column_types={'index': 'dimension'}`覆盖默认推断的类型：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVizzu :object="df" 
           :column_types="{'index': 'dimension'}" 
           :config="{'x': 'index', 'y': 'Y', 'geometry': 'line'}"
           :height="300" 
           sizing_mode="stretch_width" />
</template>

<script lang='py'>
import numpy as np
import pandas as pd

# Create sample data
df = pd.DataFrame(np.random.randn(50), columns=list('Y')).cumsum()
</script>
```

## 预设

Vizzu提供了各种[预设图表类型](https://lib.vizzuhq.com/latest/examples/presets/)。在`PnVizzu`组件中，您可以通过在`config`中提供`'preset'`作为键来使用这些预设。在下面的示例中，我们动态创建一个`config`，根据`RadioButtonGroup`切换`preset`：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnRadioButtonGroup 
        v-model="chart_type.value" 
        :options="{'Stream': 'stream', 'Bar': 'stackedColumn'}" 
        align="center" />
  </PnRow>
  <PnVizzu :object="agg"
           :config="getConfig()"
           :column_types="{'p_year': 'dimension'}"
           :height="500"
           sizing_mode="stretch_width"
           :style="{
             'plot': {
               'xAxis': {
                 'label': {
                   'angle': '-45deg'
                 }
               }
             }
           }" />
</template>

<script lang='py'>
import pandas as pd
from vuepy import ref

# Load data
windturbines = pd.read_csv('https://datasets.holoviz.org/windturbines/v1/windturbines.csv')
agg = windturbines.groupby(['p_year', 't_manu'])[['p_cap']]\
      .sum().sort_index(level=0).reset_index()

# Chart type selection
chart_type = ref('stream')

def getConfig():
    return {
        'preset': chart_type.value, 
        'x': 'p_year', 
        'y': 'p_cap', 
        'stackedBy': 't_manu'
    }
</script>
```

## 交互控制

`PnVizzu`组件公开了许多选项，可以从Python和JavaScript更改。尝试交互式地测试这些参数的效果：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnVizzu ref="vizzu_ref" 
           :object="data" 
           :config="dict(config.value)"
           :duration="duration.value" 
           :height="400" 
           sizing_mode="stretch_width" 
           :tooltip="tooltip.value" />
  <PnRow>
    <PnCol>
      <PnCheckbox v-model="tooltip.value" name="Show Tooltip" />
      <PnIntSlider v-model="duration.value" 
                   name="Animation Duration" 
                   :start="100" 
                   :end="2000" 
                   :step="100" />
    </PnCol>
    <PnCol>
      <PnButton @click="changeToCircle()">Change to Circle</PnButton>
      <PnButton @click="changeToArea()">Change to Area</PnButton>
      <PnButton @click="changeToRectangle()">Change to Rectangle</PnButton>
    </PnCol>
  </PnRow>
</template>

<script lang='py'>
import numpy as np
from vuepy import ref

# Create sample data
data = {
    'Name': ['Alice', 'Bob', 'Ted', 'Patrick', 'Jason', 'Teresa', 'John'],
    'Weight': 50+np.random.randint(0, 10, 7)*10
}

# Control parameters
tooltip = ref(True)
duration = ref(400)
vizzu_ref = ref(None)
config = ref({
    'geometry': 'rectangle', 'x': 'Name', 'y': 
    'Weight', 'title': 'Weight by person'
})

def changeToCircle():
    config.value.geometry = 'circle'
    
def changeToArea():
    config.value.geometry = 'area'
    
def changeToRectangle():
    config.value.geometry = 'rectangle'
</script>
```

## API

### 属性

| 属性名        | 说明                                     | 类型                | 默认值 |
| ------------- | ---------------------------------------- | ------------------- | ------ |
| value         | 以Python数组字典或DataFrame表示的数据     | ^[dict\|pd.DataFrame] | —      |
| animation     | 动画设置                                 | ^[dict]             | {}     |
| config        | 包含渲染特定静态图表或动画图表状态所需的所有参数 | ^[dict]        | {}     |
| columns       | 可选的列定义。如果未定义，将从数据中推断   | ^[list]             | None   |
| column_types  | 列类型定义，覆盖自动推断的类型            | ^[dict]             | {}     |
| tooltip       | 是否在图表上启用工具提示                  | ^[bool]             | False  |
| duration      | 动画持续时间（毫秒）                      | ^[int]              | 500    |
| style         | 图表样式配置                             | ^[dict]             | {}     |

### 方法

| 方法名    | 说明                            | 类型                         |
| --------- | ------------------------------- | ---------------------------- |
| animate   | 接受一个新的'data'、'config'和'style'值的字典，用于更新图表 | ^[Callable]`(obj: dict) -> None` |
| stream    | 向图表流式传输新数据            | ^[Callable]`(data: dict) -> None` |
| patch     | 修补数据中的一行或多行          | ^[Callable]`(data: dict) -> None` |
| controls  | 返回控制面板组件                | ^[Callable]`(jslink=bool) -> Panel` |

## Controls

```python
##controls
import pandas as pd
import numpy as np
import panel as pn

pn.extension('vizzu')
data = {
    'Name': ['Alice', 'Bob', 'Ted', 'Patrick', 'Jason', 'Teresa', 'John'],
    'Weight': 50+np.random.randint(0, 10, 7)*10
}

vizzu = pn.pane.Vizzu(
    data, config={'geometry': 'rectangle', 'x': 'Name', 'y': 'Weight', 'title': 'Weight by person'},
    duration=400, height=400, sizing_mode='stretch_width', tooltip=True
)

pn.Row(vizzu.controls(), vizzu)
```
