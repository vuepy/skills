---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# DeckGL 可视化

[Deck.gl](https://deck.gl/#/) 是一个功能强大的基于 WebGL 的框架，用于大型数据集的可视化探索性数据分析。`PnDeckGL` 组件可以渲染 Deck.gl JSON 规范以及 `PyDeck` 图表。如果数据被编码在 deck.gl 图层中，该组件将提取数据并通过二进制格式的 websocket 发送，加速渲染。

[`PyDeck`](https://deckgl.readthedocs.io/en/latest/) 软件包提供 Python 绑定。请严格按照[安装说明](https://github.com/uber/deck.gl/blob/master/bindings/pydeck/README.md)进行操作，以便在 Jupyter Notebook 中使用它。

底层实现为`panel.pane.DeckGL`，参数基本一致，参考文档：https://panel.holoviz.org/reference/panes/DeckGL.html

## 基本用法

要使用 Deck.gl，您需要一个 MAP BOX 密钥，可以在 [mapbox.com](https://account.mapbox.com/access-tokens/) 上免费获取（有限使用）。

现在我们可以定义一个 JSON 规范并将其与 Mapbox 密钥（如果有）一起传递给 DeckGL 组件：

如果您没有 Mapbox API 密钥，可以使用 [Carto basemaps](https://deck.gl/docs/api-reference/carto/basemap#supported-basemaps) 之一。

与其他组件一样，DeckGL 对象可以被替换或更新。在此示例中，我们将更改 HexagonLayer 的 `colorRange` 然后触发更新：

## 工具提示

默认情况下，可以通过设置 `tooltips=True/False` 禁用和启用工具提示。为了更多的自定义，可以传入定义格式的字典。让我们首先声明具有两个图层的图：

## PyDeck

除了编写原始的类 JSON 字典外，`PnDeckGL` 组件还可以接收 PyDeck 对象进行渲染：

注意，使用 pydeck 指定工具提示时，还必须使用 `{properties.<DATA_FIELD_NAME>}` 语法引用任何数据字段。

## API

### 属性

| 属性名           | 说明                          | 类型                                                           | 默认值 |
| --------------- | ----------------------------- | --------------------------------------------------------------| ------- |
| object          | 要显示的 deck.GL JSON 或 PyDeck 对象 | ^[object, dict, string]                                 | None |
| mapbox_api_key  | 如果 PyDeck 对象未提供，则为 MapBox API 密钥 | ^[string]                                     | None |
| tooltips        | 是否启用工具提示或自定义工具提示格式化程序 | ^[bool, dict]                                    | True |
| throttle        | 视图状态和悬停事件的节流超时（以毫秒为单位） | ^[dict]                                         | {'view': 200, 'hover': 200} |
| click_state     | 包含 DeckGL 图上最后一次点击事件的信息 | ^[dict]                                               | {} |
| hover_state     | 包含有关 DeckGL 图上当前悬停位置的信息 | ^[dict]                                              | {} |
| view_state      | 包含有关 DeckGL 图当前视口的信息 | ^[dict]                                                     | {} |
| sizing_mode     | 尺寸调整模式                   | ^[str]                                                        | 'fixed'  |
| width           | 宽度                         | ^[int, str]                                                    | None    |
| height          | 高度                         | ^[int, str]                                                    | None    |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 自定义默认内容      |

## Controls

```python
##controls
import panel as pn
import pydeck as pdk
pn.extension('deckgl')

MAPBOX_KEY = ""

if MAPBOX_KEY:
    map_style = "mapbox://styles/mapbox/dark-v9"
else:
    map_style = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"

json_spec = {
    "initialViewState": {
        "bearing": -27.36,
        "latitude": 52.2323,
        "longitude": -1.415,
        "maxZoom": 15,
        "minZoom": 5,
        "pitch": 40.5,
        "zoom": 6
    },
    "layers": [{
        "@@type": "HexagonLayer",
        "autoHighlight": True,
        "coverage": 1,
        "data": "https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv",
        "elevationRange": [0, 3000],
        "elevationScale": 50,
        "extruded": True,
        "getPosition": "@@=[lng, lat]",
        "id": "8a553b25-ef3a-489c-bbe2-e102d18a3211",
        "pickable": True
    }],
    "mapStyle": map_style,
    "views": [
        {"@@type": "MapView", "controller": True}
    ]
}

g = pn.pane.DeckGL(json_spec, mapbox_api_key=MAPBOX_KEY, sizing_mode='stretch_width', height=600) 
pn.Column(g, g.controls)
```
