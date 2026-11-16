---
outline: deep
titleTemplate: :title | IPywUI
---

# Button 按钮

常用的操作按钮。

## 基础用法
使用 `type` 来定义按钮的样式。

```vue
<!-- basic.vue -->
<template>
  <HBox>
    <Button @click="on_click()">Default</Button>
    <Button type="info" @click="async_click">Info</Button>
    <Button type="success">Success</Button>
    <Button type="warning">Warning</Button>
    <Button label="Danger" type="danger"></Button>
  </HBox>
  <HBox>
    <Button icon="search" @click="on_click2"></Button>
    <Button type="info" icon="edit"></Button>
    <Button type="success" icon="check"></Button>
    <Button type="warning" icon="star">{{ count.value }}</Button>
    <Button type="danger" icon="trash-alt"></Button>
  </HBox>
</template>

<script setup>
import Button from "../../../src/ipywui/components/Button";
import HBox from "../../../src/ipywui/components/HBox";
</script>
<script lang="py">
import asyncio
from vuepy import ref

count = ref(1)

def on_click():
  count.value += 1
  print("on click")

def on_click2(btn):
  print(f"{btn} on click") # Button(icon='search', style=ButtonStyle()) on click

# support async def
async def async_click(btn):
  btn.loading = True
  await asyncio.sleep(1)
  btn.loading = False
</script>
```

## 禁用状态

你可以使用 `disabled` 属性来定义按钮是否被禁用。  
使用 `disabled` 属性来控制按钮是否为禁用状态。该属性接受一个 `bool` 类型的值。

```vue
<!-- disabled.vue -->
<template>
  <HBox>
    <Button label="Default" disabled></Button>
    <Button label="Success" type="success" disabled></Button>
    <Button label="Info" type="info" disabled></Button>
    <Button label="Warning" type="warning" disabled></Button>
    <Button label="Danger" type="danger" disabled></Button>
  </HBox>
</template>

<script setup>
import Button from "../../../src/ipywui/components/Button";
import HBox from "../../../src/ipywui/components/HBox";
</script>
```

## 提示信息

通过 `tooltip` 属性在鼠标 hover 时展示提示信息。

```vue
<!-- tooltip.vue -->
<template>
  <Button label="hover" type="info" tooltip="tooltip info"></Button>
</template>

<script setup>
import Button from "../../../src/ipywui/components/Button";
</script>
```

## 图标按钮

使用图标为按钮添加更多的含义。你也可以单独使用图标不添加文字来节省显示区域占用。  
使用 `icon` 属性来为按钮添加图标。请参阅 [fontawesome](https://fontawesome.com/v5/search?m=free) 页面获取可用图标。

```vue
<!-- icon.vue -->
<template>
  <HBox>
    <Button type="info" icon="edit" style="width: auto"></Button>
    <Button type="info" icon="share-alt" style="width: auto"></Button>
    <Button type="info" icon="trash-alt" style="width: auto"></Button>
    <Button label="Search" type="info" icon="search"></Button>
    <Button label="Upload" type="info" icon="upload"></Button>
  </HBox>
</template>

<script setup>
import HBox from "../../../src/ipywui/components/HBox";
import Button from "../../../src/ipywui/components/Button";
</script>
```

## 加载状态按钮

通过设置 loading 属性为 true 来显示加载中状态。  
您可以使用`loading-icon`属性自定义您的loading图标（fontawesome图标）。

```vue
<!-- loading.vue -->
<template>
  <Button type="info" loading @click="click1">Default Loading</Button>
  <Button loading-icon="snowflake"
          :loading="loading.value"
          @click="click2()"
  >Custom Loading</Button>
</template>
<script setup>
import Button from "../../../src/ipywui/components/Button";
</script>
<script lang="py">
from vuepy import ref

def click1(btn):
    btn.loading = not btn.loading

loading = ref(True)

def click2():
    loading.value = not loading.value
</script>
```

## 调整尺寸

除了默认的大小，按钮组件还提供了自定义尺寸能力，以便适配不同的场景。  
使用 `style` 属性额外配置尺寸:
* `width` 和 `height` 指定大小，可使用`px`、`%`、`auto`等形式。

```vue
<!-- size.vue -->
<template>
  <VBox>
    <!-- px -->
    <HBox>
      <Button label="height 60px" type="info"
              style="height: 60px"></Button>
      <Button label="Default" type="info"></Button>
      <Button label="width 90px" type="info"
              style="width: 90px"></Button>
    </HBox>
    <!-- % -->
    <HBox>
      <Button label="width: 50%" type="info" icon="search"
              style="width: 50%"></Button>
      <Button label="width: 50%" type="info" icon="search"
              style="width: 50%"></Button>
    </HBox>
    <!-- auto -->
    <HBox>
      <Button label="auto" type="info"
              style="width: auto"></Button>
      <Button label="auto" type="info" icon="search"
              style="width: auto"></Button>
      <Button type="info" icon="search"
              style="width: auto"></Button>
    </HBox>
  </VBox>
</template>

<script setup>
import HBox from "../../../src/ipywui/components/HBox";
import VBox from "../../../src/ipywui/components/VBox";
import Button from "../../../src/ipywui/components/Button";
</script>
```

## 自定义颜色

您可以自定义按钮的颜色。  
使用 `style` 属性额外配置颜色:
* `background-color` 设置背景颜色，可使用`#ffffff`、`blue`等和 `css` 兼容的形式。
* `color` 设置文字颜色，可使用`#ffffff`、`blue`等和 `css` 兼容的形式。

```vue
<!-- custom.vue -->
<template>
  <HBox>
    <Button label="bg:#626aef"
            style="background-color: #626aef;"></Button>
    <Button label="color: white" type="info"
            style="color: white;"></Button>
  </HBox>
</template>

<script setup>
import HBox from "../../../src/ipywui/components/HBox";
import Button from "../../../src/ipywui/components/Button";
</script>
```

## Button API

### Button 属性

| 属性名    | 说明                 | 类型                                                           | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/label | 绑定值             | ^[str]                                                      | —       |
| label | 按钮文字             | ^[str]                                                         | —       |
| icon     | 按钮图标             | ^[str]                                                         | —       |
| type     | 类型                | ^[enum]`''\| 'success'\| 'warning'\| 'danger'\| 'info'`        | —       |
| tooltip  | 提示信息             | ^[str]                                                         | —       |
| loading | 是否为加载中状态 | ^[boolean]                                                     | false   |
| loading-icon | 自定义加载中状态图标 | ^[str]                                                     | fa-spinner |
| disabled | 按钮是否为禁用状态     | ^[boolean]                                                     | false   |
| style    | 自定义css样式             | ^[str]                                                         | -       |

::: tip

**style 支持的其它css属性**

Sizes相关
* height
* width
* max_height
* max_width
* min_height
* min_width

Display相关
* visibility
* display
* overflow

Box model相关
* border
* margin
* padding

Positioning相关
* top
* left
* bottom
* right

:::

<!--@include: @examples/ipywui/component/style-layout.md-->

### Button Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| click | 当按钮被点击时触发的事件 |  ^[Callable]`(button: Widget) -> None` |

### Button 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
