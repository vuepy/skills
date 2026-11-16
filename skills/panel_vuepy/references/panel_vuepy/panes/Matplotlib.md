---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Matplotlib 图表

`PnMatplotlib` 组件允许在 Panel 应用程序中显示 [Matplotlib](http://matplotlib.org) 图表。这包括由 [Seaborn](https://seaborn.pydata.org/)、[Pandas `.plot`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.plot.html)、[Plotnine](https://plotnine.readthedocs.io/) 和任何其他基于 `Matplotlib` 构建的绘图库创建的图表。

`PnMatplotlib` 组件将以声明的 DPI 将 `object` 渲染为 PNG 或 SVG，然后显示它。

底层实现为`panel.pane.Matplotlib`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/Matplotlib.html

## 基本用法

创建一个简单的 Matplotlib 图表并显示：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnMatplotlib :object="fig" :dpi="144" />
</template>
<script lang='py'>
import numpy as np
from matplotlib.figure import Figure
from matplotlib import cm

Y, X = np.mgrid[-3:3:100j, -3:3:100j]
U = -1 - X**2 + Y
V = 1 + X - Y**2

fig = Figure(figsize=(4, 3))
ax = fig.subplots()

strm = ax.streamplot(X, Y, U, V, color=U, linewidth=2, cmap=cm.autumn)
fig.colorbar(strm.lines)
</script>
```

通过修改图表并使用组件对象的 `param.trigger('object')` 方法，我们可以轻松更新图表：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnCol>
  <PnMatplotlib :object="fig" :dpi="144" ref="mpl_pane" />
  <PnButton @click="update_cmap()">更新颜色映射</PnButton>
</PnCol>
</template>
<script lang='py'>
import numpy as np
from matplotlib.figure import Figure
from matplotlib import cm
from vuepy import ref

mpl_pane = ref(None)

Y, X = np.mgrid[-3:3:100j, -3:3:100j]
U = -1 - X**2 + Y
V = 1 + X - Y**2

fig = Figure(figsize=(4, 3))
ax = fig.subplots()

strm = ax.streamplot(X, Y, U, V, color=U, linewidth=2, cmap=cm.autumn)
fig.colorbar(strm.lines)

def update_cmap():
    strm.lines.set_cmap(cm.viridis)
    mpl_pane.value.unwrap().param.trigger('object')
</script>
```

与所有其他模型一样，`PnMatplotlib` 组件也可以通过直接设置 `object` 来更新：

```vue
<!-- --plugins vpanel --show-code -->
<template>
<PnCol>
  <PnMatplotlib :object="fig" :dpi="144" ref="mpl_pane" />
  <PnButton @click="update_fig()">更新为3D图表</PnButton>
</PnCol>
</template>
<script lang='py'>
from vuepy import ref
import numpy as np
from matplotlib.figure import Figure
from matplotlib import cm
from mpl_toolkits.mplot3d import axes3d

mpl_pane = ref(None)

Y, X = np.mgrid[-3:3:100j, -3:3:100j]
U = -1 - X**2 + Y
V = 1 + X - Y**2

fig = Figure(figsize=(4, 3))
ax = fig.subplots()

strm = ax.streamplot(X, Y, U, V, color=U, linewidth=2, cmap=cm.autumn)
fig.colorbar(strm.lines)

def update_fig():
    fig3d = Figure(figsize=(8, 6))
    ax = fig3d.add_subplot(111, projection='3d')
    
    X, Y, Z = axes3d.get_test_data(0.05)
    ax.plot_surface(X, Y, Z, rstride=8, cstride=8, alpha=0.3)
    cset = ax.contourf(X, Y, Z, zdir='z', offset=-100, cmap=cm.coolwarm)
    cset = ax.contourf(X, Y, Z, zdir='x', offset=-40, cmap=cm.coolwarm)
    cset = ax.contourf(X, Y, Z, zdir='y', offset=40, cmap=cm.coolwarm)
    
    ax.set_xlabel('X')
    ax.set_xlim(-40, 40)
    ax.set_ylabel('Y')
    ax.set_ylim(-40, 40)
    ax.set_zlabel('Z')
    ax.set_zlim(-100, 100)
    
    mpl_pane.value.unwrap().object = fig3d
</script>
```

## 使用 Matplotlib pyplot 接口

您可能已经注意到，我们在上面没有使用 `matplotlib.pyplot` API。我们这样做是为了避免需要特意关闭图形。如果图形未关闭，将导致内存泄漏。

**您可以使用 `matplotlib.pyplot` 接口，但随后必须像下面所示特别关闭图形！**

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnMatplotlib :object="create_voltage_figure()" :dpi="144" :tight="True" />
</template>
<script lang='py'>
import matplotlib.pyplot as plt
import numpy as np

def create_voltage_figure(figsize=(4,3)):
    t = np.arange(0.0, 2.0, 0.01)
    s = 1 + np.sin(2 * np.pi * t)
    
    fig, ax = plt.subplots(figsize=figsize)
    ax.plot(t, s)
    
    ax.set(xlabel='time (s)', ylabel='voltage (mV)',
          title='Voltage')
    ax.grid()
    
    plt.close(fig)  # 关闭图形！
    return fig
</script>
```

## 修复裁剪问题

如果您发现图形在边缘被裁剪，可以设置 `tight=true`：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnMarkdown>
     ## ❌ tight=false
    </PnMarkdown>
    <PnMatplotlib :object="create_voltage_figure()" :dpi="144" :tight="False" />
  </PnRow>
  <PnRow>
    <PnMarkdown>
     ## ✔️ tight=true
    </PnMarkdown>
    <PnMatplotlib :object="create_voltage_figure()" :dpi="144" :tight="True" />
  </PnROw>
</template>
<script lang='py'>
import matplotlib.pyplot as plt
import numpy as np

def create_voltage_figure(figsize=(4,3)):
    t = np.arange(0.0, 2.0, 0.01)
    s = 1 + np.sin(2 * np.pi * t)
    
    fig, ax = plt.subplots(figsize=figsize)
    ax.plot(t, s)
    
    ax.set(xlabel='time (s)', ylabel='voltage (mV)',
          title='Voltage')
    ax.grid()
    
    plt.close(fig)  # 关闭图形！
    return fig
</script>
```

## 响应式图表

如果您希望您的图表能够响应式地适应它们所在的任何容器，那么您应该使用适当的 `sizing_mode` 结合：

- `format="svg"`：获得更好看的调整大小后的图表
- `fixed_aspect=true`：允许 'svg' 图像独立调整其高度和宽度 
- `fixed_aspect=false`（默认）：允许 'svg' 图像调整其高度和宽度，同时保持宽高比

让我们先使用默认的 `'png'` 格式和 `sizing_mode="stretch_width"` 显示：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnMatplotlib :object="fig" :tight="True" sizing_mode="stretch_width" 
                style="background: pink" />
</template>
<script lang='py'>
import matplotlib.pyplot as plt
import numpy as np

def create_voltage_figure(figsize=(6,1)):
    t = np.arange(0.0, 2.0, 0.01)
    s = 1 + np.sin(2 * np.pi * t)
    
    fig, ax = plt.subplots(figsize=figsize)
    ax.plot(t, s)
    
    ax.set(xlabel='time (s)', ylabel='voltage (mV)',
          title='Voltage')
    ax.grid()
    
    plt.close(fig)
    return fig

fig = create_voltage_figure(figsize=(6,1))
</script>
```

如果您的窗口宽度较大，您会在两侧看到一些大的粉色区域。如果减小窗口宽度，您会看到图表自适应调整大小。

使用 `'svg'` 格式可以使图形占据全宽：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnMatplotlib :object="fig" :tight="True" format="svg" 
                sizing_mode="stretch_width" />
</template>
<script lang='py'>
import matplotlib.pyplot as plt
import numpy as np

def create_voltage_figure(figsize=(6,1)):
    t = np.arange(0.0, 2.0, 0.01)
    s = 1 + np.sin(2 * np.pi * t)
    
    fig, ax = plt.subplots(figsize=figsize)
    ax.plot(t, s)
    
    ax.set(xlabel='time (s)', ylabel='voltage (mV)',
          title='Voltage')
    ax.grid()
    
    plt.close(fig)
    return fig

fig = create_voltage_figure(figsize=(6,1))
</script>
```

但这可能会使图形太高。让我们尝试使用固定的 `height`：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnMatplotlib 
    :object="fig" 
    :tight="True" 
    :height="150" 
    format="svg" 
    sizing_mode="stretch_width" 
    style="background: pink" />
</template>
<script lang='py'>
import matplotlib.pyplot as plt
import numpy as np

def create_voltage_figure(figsize=(6,1)):
    t = np.arange(0.0, 2.0, 0.01)
    s = 1 + np.sin(2 * np.pi * t)
    
    fig, ax = plt.subplots(figsize=figsize)
    ax.plot(t, s)
    
    ax.set(xlabel='时间 (s)', ylabel='电压 (mV)',
          title='电压')
    ax.grid()
    
    plt.close(fig)
    return fig

fig = create_voltage_figure(figsize=(6,1))
</script>
```

但也许我们希望图形占据全宽。让我们将 `fixed_aspect` 更改为 `false`：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnMatplotlib 
    :object="fig" 
    :tight="True" 
    :height="150" 
    format="svg" 
    :fixed_aspect="False" 
    sizing_mode="stretch_width" />
</template>
<script lang='py'>
import matplotlib.pyplot as plt
import numpy as np

def create_voltage_figure(figsize=(6,1)):
    t = np.arange(0.0, 2.0, 0.01)
    s = 1 + np.sin(2 * np.pi * t)
    
    fig, ax = plt.subplots(figsize=figsize)
    ax.plot(t, s)
    
    ax.set(xlabel='time (s)', ylabel='voltage (mV)',
          title='voltage')
    ax.grid()
    
    plt.close(fig)
    return fig

fig = create_voltage_figure(figsize=(6,1))
</script>
```

总之，通过使用适当组合的 `format`、`fixed_aspect` 和 `sizing_mode` 值，您应该能够实现所需的响应式大小调整。

## 使用 Seaborn

我们建议创建一个 Matplotlib `Figure` 并将其提供给 Seaborn：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnMatplotlib :object="fig" :tight="True" />
</template>
<script lang='py'>
import pandas as pd
import numpy as np
import seaborn as sns
from matplotlib.figure import Figure

sns.set_theme()

df = pd.DataFrame(np.random.rand(10, 10), columns=[chr(65+i) for i in range(10)], index=[chr(97+i) for i in range(10)])

fig = Figure(figsize=(2, 2))
ax = fig.add_subplot(111)
sns.heatmap(df, ax=ax)
</script>
```

您也可以直接使用 Seaborn，但请记住手动关闭 `Figure` 以避免内存泄漏：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnMatplotlib :object="fig" :height="300" />
</template>
<script lang='py'>
import matplotlib.pyplot as plt
import seaborn as sns

dots = sns.load_dataset("dots")
fig = sns.relplot(
    data=dots, kind="line",
    x="time", y="firing_rate", col="align",
    hue="choice", size="coherence", style="choice",
    facet_kws=dict(sharex=False),
).fig
plt.close(fig)  # 记住关闭图形！
</script>
```

## 使用 Pandas.plot

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnMatplotlib :object="fig" :height="300" />
</template>
<script lang='py'>
import pandas as pd
from matplotlib.figure import Figure

df = pd.DataFrame({'a': range(10)})
fig = Figure(figsize=(4, 2))
ax = fig.add_subplot(111)
ax = df.plot.barh(ax=ax)
</script>
```

## API

### 属性

| 属性名        | 说明                          | 类型                                                           | 默认值 |
| ------------ | ----------------------------- | ---------------------------------------------------------------| ------- |
| object       | 要显示的 Matplotlib [`Figure`](https://matplotlib.org/stable/api/figure_api.html#matplotlib.figure.Figure) 对象 | ^[object] | None |
| alt_text     | 添加到图像标签的替代文本。当用户无法加载或显示图像时显示替代文本 | ^[str]                   | None |
| dpi          | 导出 png 的每英寸点数         | ^[int]                                                         | 144 |
| encode       | 是否将 'svg' 编码为 base64。默认为 False。'png' 将始终被编码 | ^[boolean]                  | False |
| fixed_aspect | 是否强制图像的宽高比相等       | ^[boolean]                                                     | True |
| format       | 渲染图形的格式：'png' 或 'svg'  | ^[str]                                                         | 'png' |
| high_dpi     | 是否为高 dpi 显示优化输出      | ^[boolean]                                                     | True |
| interactive  | 是否使用交互式 ipympl 后端     | ^[boolean]                                                     | False |
| link_url     | 使图像可点击并链接到其他网站的链接 URL | ^[str]                                                  | None |
| tight        | 自动调整图形大小以适应子图和其他艺术元素 | ^[boolean]                                             | False |
| sizing_mode  | 尺寸调整模式                   | ^[str]                                                         | 'fixed'  |
| width        | 宽度                          | ^[int, str]                                                    | None    |
| height       | 高度                          | ^[int, str]                                                    | None    |
| min_width    | 最小宽度                      | ^[int]                                                         | None    |
| min_height   | 最小高度                      | ^[int]                                                         | None    |
| max_width    | 最大宽度                      | ^[int]                                                         | None    |
| max_height   | 最大高度                      | ^[int]                                                         | None    |
| margin       | 外边距                        | ^[int, tuple]                                                  | 5       |
| css_classes  | CSS类名列表                   | ^[list]                                                        | []      |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

## Controls

```python
##controls
import panel as pn
import numpy as np
from matplotlib.figure import Figure
from matplotlib import cm

pn.extension()

Y, X = np.mgrid[-3:3:100j, -3:3:100j]
U = -1 - X**2 + Y
V = 1 + X - Y**2

fig = Figure(figsize=(4, 3))
ax = fig.subplots()

strm = ax.streamplot(X, Y, U, V, color=U, linewidth=2, cmap=cm.autumn)
fig.colorbar(strm.lines)

mpl_pane = pn.pane.Matplotlib(fig, dpi=144)
pn.Row(mpl_pane.controls())
```
