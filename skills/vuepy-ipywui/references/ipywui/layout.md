---
outline: deep
titleTemplate: :title | IPywUI
---

# Row-Col Layout 网格布局

通过基础的 24 分栏，迅速简便地创建布局。

## 基础布局

使用列创建基础网格布局。  
通过 `row` 和 `col` 组件，并通过 col 组件的 `span` 属性我们就可以自由地组合布局。

```vue
<template>
  <Row>
    <Col :span="24">
      <Button label="span 24" style="width: auto; background-color: #9dacc1"></Button>
    </Col>
  </Row>

  <Row>
    <Col :span="12">
      <Button label="span 12" style="width: auto; background-color: #d4dde6"></Button>
    </Col>
    <Col :span="12">
      <Button label="span 12" style="width: auto; background-color: #e5e9f2"></Button>
    </Col>
  </Row>

  <Row>
    <Col :span="8">
      <Button label="span 8" style="width: auto; background-color: #d4dde6"></Button>
    </Col>
    <Col :span="8">
      <Button label="span 8" style="width: auto; background-color: #e5e9f2"></Button>
    </Col>
    <Col :span="8">
      <Button label="span 8" style="width: auto; background-color: #d4dde6"></Button>
    </Col>
  </Row>

  <Row>
    <Col :span="6">
      <Button label="span 6" style="width: auto; background-color: #d4dde6"></Button>
    </Col>
    <Col :span="6">
      <Button label="span 6" style="width: auto; background-color: #e5e9f2"></Button>
    </Col>
    <Col :span="6">
      <Button label="span 6" style="width: auto; background-color: #d4dde6"></Button>
    </Col>
    <Col :span="6">
      <Button label="span 6" style="width: auto; background-color: #e5e9f2"></Button>
    </Col>
  </Row>
</template>

<script setup>
import Col from "../../../src/ipywui/components/Col";
import Row from "../../../src/ipywui/components/Row";
import Button from "../../../src/ipywui/components/Button";
</script>
```

## 分栏间隔

支持列间距

`Row` 组件提供 `gutter` 属性来指定列之间的间距，单位为 `px`。

```vue
<template>
  <Row gutter="20px">
    <Col :span="6">
      <Button style="width: auto; background-color: #d4dde6"></Button>
    </Col>
    <Col :span="6">
      <Button style="width: auto; background-color: #d4dde6"></Button>
    </Col>
    <Col :span="6">
      <Button style="width: auto; background-color: #d4dde6"></Button>
    </Col>
    <Col :span="6">
      <Button style="width: auto; background-color: #d4dde6"></Button>
    </Col>
  </Row>
</template>

<script setup>
import Col from "../../../src/ipywui/components/Col";
import Row from "../../../src/ipywui/components/Row";
import Button from "../../../src/ipywui/components/Button";
</script>
```

## 混合布局

通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。

```vue
<template>
  <Row gutter="20px">
    <Col :span="16">
      <Button label="span 16" style="width: auto; background-color: #d4dde6"></Button>
    </Col>
    <Col :span="8">
      <Button label="span 8" style="width: auto; background-color: #e5e9f2"></Button>
    </Col>
  </Row>

  <Row gutter="20px">
    <Col :span="8">
      <Button label="span 8" style="width: auto; background-color: #d4dde6"></Button>
    </Col>
    <Col :span="8">
      <Button label="span 8" style="width: auto; background-color: #e5e9f2"></Button>
    </Col>
    <Col :span="4">
      <Button label="span 4" style="width: auto; background-color: #d4dde6"></Button>
    </Col>
    <Col :span="4">
      <Button label="span 4" style="width: auto; background-color: #e5e9f2"></Button>
    </Col>
  </Row>

  <Row gutter="20px">
    <Col :span="4">
      <Button label="span 4" style="width: auto; background-color: #d4dde6"></Button>
    </Col>
    <Col :span="16">
      <Button label="span 16" style="width: auto; background-color: #e5e9f2"></Button>
    </Col>
    <Col :span="4">
      <Button label="span 4" style="width: auto; background-color: #d4dde6"></Button>
    </Col>
  </Row>
</template>

<script setup>
import Col from "../../../src/ipywui/components/Col";
import Row from "../../../src/ipywui/components/Row";
import Button from "../../../src/ipywui/components/Button";
</script>
```

## 列偏移

可以指定列偏移量

通过制定 `col ` 组件的 `offset ` 属性可以指定分栏偏移的栏数。

```vue
<template>
  <Row>
    <Col :span="6">
      <Button label="span 6" style="width: auto; background-color: #d4dde6"></Button>
    </Col>
    <Col :span="6" :offset="6">
      <Button label="offset 6 span 8" style="width: auto; background-color: #e5e9f2"></Button>
    </Col>
  </Row>

  <Row>
    <Col :span="6" :offset="6">
      <Button label="offset 6 span 6" style="width: auto; background-color: #d4dde6"></Button>
    </Col>
    <Col :span="6" :offset="6">
      <Button label="offset 6 span 6" style="width: auto; background-color: #e5e9f2"></Button>
    </Col>
  </Row>

  <Row>
    <Col :span="12" :offset="6">
      <Button label="offset 6 span 12" style="width: auto; background-color: #d4dde6"></Button>
    </Col>
  </Row>
</template>

<script setup>
import Col from "../../../src/ipywui/components/Col";
import Row from "../../../src/ipywui/components/Row";
import Button from "../../../src/ipywui/components/Button";
</script>
```

## Row API

### Row 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| width        | 行宽                 | ^[str]                                                         | -       |
| height       | 行高                 | ^[str]                                                         | -       |
| gutter       | 栅格间隔, css flex布局下的 gride-gap  | ^[str]                                              | -       |
| justify(保留参数） | css flex布局下的水平排列方式  | ^[enum]`'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | start   |
| align(保留参数）   | css flex布局下的垂直排列方式 | ^[enum]`'top' \| 'middle' \| 'bottom'`                                                       | —       |
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

### Accordion Slots

| 插槽名   | 说明               | 子标签 |
| ---     | ---               | --- |
| default | 自定义默认内容      | Col |

### Accordion 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |

## Col API

### Col 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| -----  | ------------------- | ---------------------------------------------------------------| ------- |
| span   | 栅格占据的列数	       | ^[number]                                                      | 24      |
| offset | 栅格左侧的间隔格数	   | ^[number]                                                      | 0       |

### Col Slots

| 插槽名   | 说明               | 
| ---     | ---               |
| default | 自定义默认内容      |
