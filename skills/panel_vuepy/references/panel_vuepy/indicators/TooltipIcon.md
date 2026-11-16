---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# TooltipIcon 提示图标

提示图标组件提供了一个带有工具提示的图标。`value`将是工具提示内的文本。

底层实现为`panel.widgets.TooltipIcon`，参数基本一致，参考文档：https://panel.holoviz.org/reference/indicators/TooltipIcon.html

## 基本用法

`TooltipIcon`指示器可以使用字符串进行实例化：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTooltipIcon value="This is a simple tooltip by using a string" />
</template>
```

## 使用Bokeh.models.Tooltip

也可以使用`bokeh.models.Tooltip`进行实例化：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnTooltipIcon :value="tooltip_value" />
</template>

<script lang='py'>
from bokeh.models import Tooltip

tooltip_value = Tooltip(content="This is a tooltip using a bokeh.models.Tooltip", position="right")
</script>
```

## 与其他组件组合使用

`TooltipIcon`可以用来为组件添加更多信息：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnButton name="Click me!" />
    <PnTooltipIcon value="Nothing happens when you click the button!" />
  </PnRow>
</template>
```

## API

### 属性

| 属性名    | 说明                 | 类型                                                           | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| value    | 工具提示内的文本      | ^[string\|object] 字符串或`bokeh.models.Tooltip`对象           | —       |
| disabled | 是否禁用             | ^[boolean]                                                     | false   |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当值变化时触发的事件   | ^[Callable]`(event: dict) -> None`     |

## Controls

```python
##controls
import panel as pn
from bokeh.models import Tooltip

pn.extension()

t = pn.widgets.TooltipIcon(value="This is a simple tooltip by using a string")
pn.Row(t.controls, t)
```
