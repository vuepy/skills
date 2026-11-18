---
outline: deep
titleTemplate: :title | IPywUI
---

# AppLayout 应用布局

用于布局的容器组件，方便快速搭建页面的基本结构：  

`<AppLayout>`：外层容器。有`header`，`left_sidebar`，`center`，`right_sider`，`footer`等5个插槽，分别表示顶栏、左侧边栏、主要区域、右侧边栏、底栏。

## 常见页面布局

```vue
<!-- layout-hc.vue -->
<template>
  <AppLayout>
    <template v-slot:header>
      <Button
          label="header"
          style="width: auto; height: auto; background-color: #c8e3fe"
      ></Button>
    </template>
    <template v-slot:center>
      <Button
          style="width: auto; height: auto; background-color: #ecf5fe"
      ></Button>
      <Button
          label="center"
          style="width: auto; height: auto; background-color: #ecf5fe"
      ></Button>
      <Button
          style="width: auto; height: auto; background-color: #ecf5fe"
      ></Button>
    </template>
  </AppLayout>
</template>

<script setup>
import Button from "../../../src/ipywui/components/Button";
import AppLayout from "../../../src/ipywui/components/AppLayout";
</script>
```

```vue
<!-- layout-hcf.vue -->
<template>
  <AppLayout>
    <template v-slot:header>
      <Button label="header" style="width: auto; height: auto; background-color: #c8e3fe"></Button>
    </template>
    <template v-slot:center>
      <Button style="width: auto; height: auto; background-color: #ecf5fe"></Button>
      <Button label="center" style="width: auto; height: auto; background-color: #ecf5fe"></Button>
      <Button style="width: auto; height: auto; background-color: #ecf5fe"></Button>
    </template>
    <template v-slot:footer>
      <Button label="footer" style="width: auto; height: auto; background-color: #c8e3fe"></Button>
    </template>
  </AppLayout>
</template>

<script setup>
import Button from "../../../src/ipywui/components/Button";
import AppLayout from "../../../src/ipywui/components/AppLayout";
</script>
```

```vue
<!-- layout-lcr.vue -->
<template>
  <AppLayout>
    <template v-slot:left_sidebar>
      <Button label="" style="width: auto; height: auto; background-color: #c8e3fe"></Button>
      <Button label="left" style="width: auto; height: auto; background-color: #c8e3fe"></Button>
      <Button label="" style="width: auto; height: auto; background-color: #c8e3fe"></Button>
    </template>
    <template v-slot:right_sidebar>
      <Button label="" style="width: auto; height: auto; background-color: #c8e3fe"></Button>
      <Button label="right" style="width: auto; height: auto; background-color: #c8e3fe"></Button>
      <Button label="" style="width: auto; height: auto; background-color: #c8e3fe"></Button>
    </template>
    <template v-slot:center>
      <Button style="width: auto; height: auto; background-color: #ecf5fe"></Button>
      <Button label="center" style="width: auto; height: auto; background-color: #ecf5fe"></Button>
      <Button style="width: auto; height: auto; background-color: #ecf5fe"></Button>
    </template>
  </AppLayout>
</template>

<script setup>
import Button from "../../../src/ipywui/components/Button";
import AppLayout from "../../../src/ipywui/components/AppLayout";
</script>
```

```vue
<!-- layout-hlc.vue -->
<template>
  <AppLayout>
    <template v-slot:header>
      <Button label="header" style="width: auto; height: auto; background-color: #c8e3fe"></Button>
    </template>
    <template v-slot:left_sidebar>
      <Button label="" style="width: auto; height: auto; background-color: #dbecfe"></Button>
      <Button label="left" style="width: auto; height: auto; background-color: #dbecfe"></Button>
      <Button label="" style="width: auto; height: auto; background-color: #dbecfe"></Button>
    </template>
    <template v-slot:center>
      <Button style="width: auto; height: auto; background-color: #ecf5fe"></Button>
      <Button label="center" style="width: auto; height: auto; background-color: #ecf5fe"></Button>
      <Button style="width: auto; height: auto; background-color: #ecf5fe"></Button>
    </template>
  </AppLayout>
</template>

<script setup>
import Button from "../../../src/ipywui/components/Button";
import AppLayout from "../../../src/ipywui/components/AppLayout";
</script>
```

```vue
<!-- layout-hlcf.vue -->
<template>
  <AppLayout>
    <template v-slot:header>
      <Button label="header" style="width: auto; height: auto; background-color: #c8e3fe"></Button>
    </template>
    <template v-slot:left_sidebar>
      <Button label="" style="width: auto; height: auto; background-color: #dbecfe"></Button>
      <Button label="left" style="width: auto; height: auto; background-color: #dbecfe"></Button>
      <Button label="" style="width: auto; height: auto; background-color: #dbecfe"></Button>
    </template>
    <template v-slot:center>
      <Button style="width: auto; height: auto; background-color: #ecf5fe"></Button>
      <Button label="center" style="width: auto; height: auto; background-color: #ecf5fe"></Button>
      <Button style="width: auto; height: auto; background-color: #ecf5fe"></Button>
    </template>
    <template v-slot:footer>
      <Button label="footer" style="width: auto; height: auto; background-color: #c8e3fe"></Button>
    </template>
  </AppLayout>
</template>

<script setup>
import Button from "../../../src/ipywui/components/Button";
import AppLayout from "../../../src/ipywui/components/AppLayout";
</script>
```

```vue
<!-- layout-hl-cf.vue -->
<template>
  <AppLayout>
    <template v-slot:header>
      <Button label="header" style="width: auto; height: auto; background-color: #c8e3fe"></Button>
    </template>

    <template v-slot:left_sidebar>
      <Button label="" style="width: auto; height: auto; background-color: #dbecfe"></Button>
      <Button label="left" style="width: auto; height: auto; background-color: #dbecfe"></Button>
      <Button label="" style="width: auto; height: auto; background-color: #dbecfe"></Button>
      <Button label="" style="width: auto; height: auto; background-color: #dbecfe"></Button>
    </template>

    <template v-slot:center>
      <AppLayout>
        <template v-slot:center>
          <Button style="width: auto; height: auto; background-color: #ecf5fe"></Button>
          <Button label="center" style="width: auto; height: auto; background-color: #ecf5fe"></Button>
          <Button style="width: auto; height: auto; background-color: #ecf5fe"></Button>
        </template>

        <template v-slot:footer>
          <Button label="footer" style="width: auto; height: auto; background-color: #c8e3fe"></Button>
        </template>
      </AppLayout>
    </template>
  </AppLayout>
</template>

<script setup>
import Button from "../../../src/ipywui/components/Button";
import AppLayout from "../../../src/ipywui/components/AppLayout";
</script>
```

```vue
<!-- layout-l-hc.vue -->
<template>
  <AppLayout>
    <template v-slot:left_sidebar>
      <Button label="" style="width: auto; height: auto; background-color: #dbecfe"></Button>
      <Button label="left" style="width: auto; height: auto; background-color: #dbecfe"></Button>
      <Button label="" style="width: auto; height: auto; background-color: #dbecfe"></Button>
      <Button label="" style="width: auto; height: auto; background-color: #dbecfe"></Button>
    </template>

    <template v-slot:center>
      <AppLayout>
        <template v-slot:header>
          <Button label="header" style="width: auto; height: auto; background-color: #c8e3fe"></Button>
        </template>
        <template v-slot:center>
          <Button style="width: auto; height: auto; background-color: #ecf5fe"></Button>
          <Button label="center" style="width: auto; height: auto; background-color: #ecf5fe"></Button>
          <Button style="width: auto; height: auto; background-color: #ecf5fe"></Button>
        </template>
      </AppLayout>
    </template>
  </AppLayout>
</template>

<script setup>
import Button from "../../../src/ipywui/components/Button";
import AppLayout from "../../../src/ipywui/components/AppLayout";
</script>
```

```vue
<!-- layout-l-hcf.vue -->
<template>
  <AppLayout>
    <template v-slot:left_sidebar>
      <Button label="" style="width: auto; height: auto; background-color: #dbecfe"></Button>
      <Button label="" style="width: auto; height: auto; background-color: #dbecfe"></Button>
      <Button label="left" style="width: auto; height: auto; background-color: #dbecfe"></Button>
      <Button label="" style="width: auto; height: auto; background-color: #dbecfe"></Button>
      <Button label="" style="width: auto; height: auto; background-color: #dbecfe"></Button>
    </template>

    <template v-slot:center>
      <AppLayout>
        <template v-slot:header>
          <Button label="header" style="width: auto; height: auto; background-color: #c8e3fe"></Button>
        </template>
        <template v-slot:center>
          <Button style="width: auto; height: auto; background-color: #ecf5fe"></Button>
          <Button label="center" style="width: auto; height: auto; background-color: #ecf5fe"></Button>
          <Button style="width: auto; height: auto; background-color: #ecf5fe"></Button>
        </template>
        <template v-slot:footer>
          <Button label="footer" style="width: auto; height: auto; background-color: #c8e3fe"></Button>
        </template>
      </AppLayout>
    </template>
  </AppLayout>
</template>

<script setup>
import Button from "../../../src/ipywui/components/Button";
import AppLayout from "../../../src/ipywui/components/AppLayout";
</script>
```

## 自定义面板宽高

您还可以使用以下参数自定义面板宽高：
* `pane_widths`: 左侧边栏，主要区域，右侧边栏的绝对或相对宽度
* `pane_heights`: 顶栏，主要区域，底栏的绝对或相对高度

两者都接受三个元素的序列，每个元素要么是整数或`'1fr'`（与整数相同）表示相对占比。或者为`'100px'`形式，表示绝对占比。

```vue
<!-- custom.vue -->
<template>
  <AppLayout :pane_widths="['100px', 1, 1]" :pane_heights="[1, 3, '30px']">
    <template v-slot:header>
      <Button label="header" style="width: auto; height: auto; background-color: #c8e3fe"></Button>
    </template>
    <template v-slot:left_sidebar>
      <Button label="" style="width: auto; height: auto; background-color: #dbecfe"></Button>
      <Button label="left 100px" style="width: auto; height: auto; background-color: #dbecfe"></Button>
      <Button label="" style="width: auto; height: auto; background-color: #dbecfe"></Button>
    </template>
    <template v-slot:right_sidebar>
      <Button label="" style="width: auto; height: auto; background-color: #dbecfe"></Button>
      <Button label="right" style="width: auto; height: auto; background-color: #dbecfe"></Button>
      <Button label="" style="width: auto; height: auto; background-color: #dbecfe"></Button>
    </template>
    <template v-slot:center>
      <Button style="width: auto; height: auto; background-color: #ecf5fe"></Button>
      <Button label="center" style="width: auto; height: auto; background-color: #ecf5fe"></Button>
      <Button style="width: auto; height: auto; background-color: #ecf5fe"></Button>
    </template>
    <template v-slot:footer>
      <Button label="footer" style="width: auto; height: auto; background-color: #c8e3fe"></Button>
    </template>
  </AppLayout>
</template>

<script setup>
import Button from "../../../src/ipywui/components/Button";
import AppLayout from "../../../src/ipywui/components/AppLayout";
</script>
```

## AppLayout API

### AppLayout 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| width        | 容器宽                 | ^[str]                                                         | -       |
| height       | 容器高                 | ^[str]                                                         | -       |
| pane_widths   | (左侧边栏，主要区域，右侧边栏)的绝对或相对宽度                 | ^[str]                                                         | -       |
| pane_heights   | (顶栏，主要区域，底栏)的绝对或相对高度                 | ^[str]                                                         | -       |
| gutter（保留参数）       | 栅格间隔, css flex布局下的 gride-gap  | ^[str]                                              | -       |
| justify（保留参数） | css flex布局下的水平排列方式  | ^[enum]`'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | start   |
| align（保留参数）   | css flex布局下的垂直排列方式 | ^[enum]`'top' \| 'middle' \| 'bottom'`                                                       | —       |
| style        | 自定义css样式        | ^[str]                                                         | -       |

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

### AppLayout Slots

| 插槽名   | 说明               | 子标签 |
| ---     | ---               | --- |
| header |  顶栏自定义内容 |  |
| left_sidebar | 左侧边栏自定义内容      | |
| right_sidebar | 右侧边栏自定义内容      | |
| center | 主要区域自定义内容      | |
| footer | 底栏自定义内容      | |

### AppLayout 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |

<style>
.example {
  margin-bottom: 2em !important;
}
</style>
