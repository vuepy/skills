---
outline: deep
titleTemplate: :title | IPywUI
---

# ToggleButton 按钮

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

绑定 v-model 到一个 Boolean 类型的变量。 点击后变量值取反，当变量为 `True` 或 `False` 时背景色不同。

```vue
<!-- basic.vue -->
<template>
  <HBox>
    <ToggleButton label="on" :value="True" @change="on_change"></ToggleButton>
    <ToggleButton label="off" :value="False"></ToggleButton>
  </HBox>
  <HBox>
    <ToggleButton type="info" :value="True"></ToggleButton>
    <ToggleButton type="info" :value="False"></ToggleButton>
    </HBox>
  <HBox>
    <ToggleButton type="success" v-model="val1.value"></ToggleButton>
    <ToggleButton type="success" :value="False"></ToggleButton>
    </HBox>
  <HBox>
    <ToggleButton type="warning" :value="True"></ToggleButton>
    <ToggleButton type="warning"></ToggleButton>
    </HBox>
  <HBox>
    <ToggleButton type="danger" :value="True"></ToggleButton>
    <ToggleButton type="danger" :value="False"></ToggleButton>
  </HBox>
</template>

<script setup>
import ToggleButton from "../../../src/ipywui/components/ToggleButton";
import HBox from "../../../src/ipywui/components/HBox";
</script>
<script lang="py">
from vuepy import ref

val1 = ref(True)

def on_change(event):
    print(event) # {'new': True, 'old': False, 'owner': ToggleButton(...)}

</script>
```

## 禁用状态

你可以使用 `disabled` 属性来定义按钮是否被禁用。  
使用 `disabled` 属性来控制按钮是否为禁用状态。该属性接受一个 `bool` 类型的值。

```vue
<!-- disabled.vue -->
<template>
  <HBox>
    <ToggleButton label="Default" disabled></ToggleButton>
    <ToggleButton label="Success" type="success" disabled></ToggleButton>
    <ToggleButton label="Info" type="info" disabled></ToggleButton>
    <ToggleButton label="Warning" type="warning" disabled></ToggleButton>
    <ToggleButton label="Danger" type="danger" disabled></ToggleButton>
  </HBox>
</template>

<script setup>
import ToggleButton from "../../../src/ipywui/components/ToggleButton";
import HBox from "../../../src/ipywui/components/HBox";
</script>
```

## 提示信息

通过 `tooltip` 属性在鼠标 hover 时展示提示信息。

```vue
<!-- tooltip.vue -->
<template>
  <ToggleButton label="hover" type="info" tooltip="tooltip info"></ToggleButton>
</template>

<script setup>
import ToggleButton from "../../../src/ipywui/components/ToggleButton";
</script>
```

## 图标按钮

使用图标为按钮添加更多的含义。你也可以单独使用图标不添加文字来节省显示区域占用。  
使用 `icon` 属性来为按钮添加图标。请参阅 [fontawesome](https://fontawesome.com/v5/search?m=free) 页面获取可用图标。

```vue
<!-- icon.vue -->
<template>
  <HBox>
    <ToggleButton type="info" icon="edit" style="width: auto"></ToggleButton>
    <ToggleButton type="info" icon="share-alt" style="width: auto"></ToggleButton>
    <ToggleButton type="info" icon="trash-alt" style="width: auto"></ToggleButton>
    <ToggleButton label="Search" type="info" icon="search"></ToggleButton>
    <ToggleButton label="Upload" type="info" icon="upload"></ToggleButton>
  </HBox>
</template>

<script setup>
import HBox from "../../../src/ipywui/components/HBox";
import ToggleButton from "../../../src/ipywui/components/ToggleButton";
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
      <ToggleButton label="height 60px" type="info"
              style="height: 60px"></ToggleButton>
      <ToggleButton label="Default" type="info"></ToggleButton>
      <ToggleButton label="width 90px" type="info"
              style="width: 90px"></ToggleButton>
    </HBox>
    <!-- % -->
    <HBox>
      <ToggleButton label="width: 50%" type="info" icon="search"
              style="width: 50%"></ToggleButton>
      <ToggleButton label="width: 50%" type="info" icon="search"
              style="width: 50%"></ToggleButton>
    </HBox>
    <!-- auto -->
    <HBox>
      <ToggleButton label="auto" type="info"
              style="width: auto"></ToggleButton>
      <ToggleButton label="auto" type="info" icon="search"
              style="width: auto"></ToggleButton>
      <ToggleButton type="info" icon="search"
              style="width: auto"></ToggleButton>
    </HBox>
  </VBox>
</template>

<script setup>
import HBox from "../../../src/ipywui/components/HBox";
import VBox from "../../../src/ipywui/components/VBox";
import ToggleButton from "../../../src/ipywui/components/ToggleButton";
</script>
```

## 自定义颜色

您可以自定义按钮的颜色。  
使用 `style` 属性额外配置颜色:
* `color` 设置文字颜色，可使用`#ffffff`、`blue`等和 `css` 兼容的形式。

```vue
<!-- custom.vue -->
<template>
  <HBox>
    <ToggleButton label="color:#626aef"
            style="color: #626aef;"></ToggleButton>
    <ToggleButton label="color: white" type="info"
            style="color: white;"></ToggleButton>
  </HBox>
</template>

<script setup>
import HBox from "../../../src/ipywui/components/HBox";
import ToggleButton from "../../../src/ipywui/components/ToggleButton";
</script>
```

## API

### 属性

| 属性名    | 说明                 | 类型                                                           | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 开关状态绑定值             | ^[bool]                                                      | false       |
| label | 按钮文字             | ^[str]                                                         | —       |
| icon     | 按钮图标             | ^[str]                                                         | —       |
| type     | 类型                | ^[enum]`''\| 'success'\| 'warning'\| 'danger'\| 'info'`        | —       |
| tooltip  | 提示信息             | ^[str]                                                         | —       |
| disabled | 按钮是否为禁用状态     | ^[bool]                                                     | false   |
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

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当绑定值变化时触发的事件 |  ^[Callable]`({'new': val, 'old': val, 'owner': widget) -> None` |

### 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
