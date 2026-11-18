---
outline: deep
titleTemplate: :title | IPywUI
---

# Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

## 基础用法

通过 `bar_style` 来定义进度条的样式。

```vue
<template>
  <VBox>
    <Progress label="Default"
              :value="80" :min="1" :max="100"></Progress>

    <Progress label="Info" type="info"
              :value="60" :min="1" :max="100"></Progress>

    <Progress label="Success" type="success"
              :value="50" :min="1" :max="100"></Progress>

    <Progress label="Warning" type="warning"
              :value="40" :min="1" :max="100"></Progress>

    <Progress label="Danger" type="danger"
              :value="30" :min="1" :max="100"></Progress>
  </VBox>
</template>

<script src="./basic_setup.py"></script>
<script setup>
import Progress from "../../../src/ipywui/components/Progress";
import VBox from "../../../src/ipywui/components/VBox";
</script>
```

```python
# ./basic_setup.py

from vuepy import ref

def setup(props, ctx, vm):
    progress = ref(0)
    return locals()
```

## 垂直排列

默认情况下，方向 `direction` 为 水平 `horizontal`。 通过设置 `direction` 为 `vertical` 来让进度条在垂直方向上显示。

```vue

<template>
  <HBox>
    <Progress label="Default" vertical
              :value="80" :min="1" :max="100"></Progress>

    <Progress label="Info" type="info" vertical
              :value="60" :min="1" :max="100"></Progress>

    <Progress label="Success" type="success" vertical
              :value="50" :min="1" :max="100"></Progress>

    <Progress label="Warning" type="warning" vertical
              :value="40" :min="1" :max="100"></Progress>

    <Progress label="Danger" type="danger" vertical
              :value="30" :min="1" :max="100"></Progress>
  </HBox>
</template>

<script src="./basic_setup.py"></script>
<script setup>
import Progress from "../../../src/ipywui/components/Progress";
import HBox from "../../../src/ipywui/components/HBox";
</script>
```

```python
# ./basic_setup.py

from vuepy import ref

def setup(props, ctx, vm):
    progress = ref(0)
    return locals()
```

## 自定义进度条的颜色

您可以自定义进度条的颜色  
使用 `style` 属性额外配置样式: 
* `color` 设置颜色，可使用`#ffffff`、`blue`等和 `css` 兼容的形式。

```vue

<template>
  <VBox>
    <Progress label="lightblue"
              style="color: lightblue"
              :value="80" :min="1" :max="100"></Progress>

    <Progress label="#8a54a8"
              style="color: #8a54a8"
              :value="60" :min="1" :max="100"></Progress>
  </VBox>
</template>
```

## API

### 属性

| 属性名    | 说明                 | 类型                                                           | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| value    | 当前进度值           | ^[int/float]                                                   | —       |
| label    | 标签文字             | ^[str]                                                         | —       |
| min      | 进度条的最小值        | ^[int\|float]                                                  | -inf    |
| max      | 进度条的最大值        | ^[int\|float]                                                  | inf     |
| type     | 类型                | ^[enum]`''\| 'success'\| 'warning'\| 'danger'\| 'info'`        | —       |
| vertical | 是否为垂直排列        | ^[boolean]                                                     | false   |
| disabled | 按钮是否为禁用状态    | ^[boolean]                                                      | false   |
| style    | 自定义css样式        | ^[str]                                                         | -       |

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

### 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
