---
outline: deep
titleTemplate: :title | IPywUI | Vue.py
---

# Checkbox 多选框

在一组备选项中进行多选。

## 基础用法

可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。  

`v-model` 绑定按钮的状态，当选中时值为 `True`。

```vue
<!-- basic.vue -->
<template>
  <HBox>
    <Checkbox v-model="checked1.value" label="Option1" @change="on_change"></Checkbox>
    <Checkbox v-model="checked2.value" label="Option2"></Checkbox>
    <Checkbox v-model="checked3.value" label="Option3"></Checkbox>
  </HBox>
  <HBox>
    <Checkbox v-model="checked1.value" label="Option1" :disabled="True"></Checkbox>
    <Checkbox v-model="checked2.value" label="Option2" :disabled="True"></Checkbox>
    <Checkbox v-model="checked3.value" label="Option3" :disabled="True"></Checkbox>
  </HBox>
</template>
<script setup>
import HBox from "../../../src/ipywui/components/HBox";
import Checkbox from "../../../src/ipywui/components/Checkbox";
</script>
<script lang="py">
from vuepy import ref

checked1 = ref(True)
checked2 = ref(True)
checked3 = ref(True)

def on_change(event):
    print(event) # {'new': True, 'old': False, 'owner': Checkbox(...)}
</script>
```

## 禁用状态

多选框不可用状态。  
设置 `disabled` 属性即可。

```vue
<!-- disabled.vue -->
<template>
  <HBox>
    <Checkbox label="Disabled" :disabled="True"></Checkbox>
    <Checkbox label="Not disabled" :value="True" style="border: solid 2px blue"></Checkbox>
  </HBox>
</template>

<script setup>
import HBox from "../../../src/ipywui/components/HBox";
import Checkbox from "../../../src/ipywui/components/Checkbox";
</script>
```

## 缩进排列

选择是否与其它控件对齐。

```vue
<!-- indent.vue -->
<template>
  <HBox>
    <Checkbox label="indent1"></Checkbox>
    <Button label="btn" type="info"></Button>
    <Checkbox label="indent3"></Checkbox>
  </HBox>
  <HBox>
    <Checkbox label="not indent1" :indent="False"></Checkbox>
    <Button label="btn" type="info"></Button>
    <Checkbox label="not indent3" :indent="False"></Checkbox>
  </HBox>
</template>

<script setup>
import Checkbox from "../../../src/ipywui/components/Checkbox";
import HBox from "../../../src/ipywui/components/HBox";
import Button from "../../../src/ipywui/components/Button";
</script>
```

## 自定义样式

您可以自定义按钮的颜色。  
使用 `style` 属性额外配置样式: 
*  `background` 设置背景颜色，可使用`#ffffff`、`blue`等和 `css` 兼容的形式。
* `description-width` 设置距离，可使用`px`、`%`等形式。

```vue
<!-- custom.vue -->
<template>
  <HBox>
    <Checkbox label="background: green"
              style="background: green"></Checkbox>
    <Checkbox label="background: #27bac6"
              style="background: #27bac6"></Checkbox>
  </HBox>

  <VBox>
    <Checkbox label="description-width 20px"
              style="description-width: 20px;background: lightblue;"
    ></Checkbox>

    <Checkbox label="description-width 50px"
              style="description-width: 50px;background: lightcoral;"
    ></Checkbox>
    <Checkbox label="description-width 30%"
              style="description-width: 30%;background: lightcoral;"
    ></Checkbox>
  </VBox>
</template>

<script setup>
import Checkbox from "../../../src/ipywui/components/Checkbox";
import HBox from "../../../src/ipywui/components/HBox";
import VBox from "../../../src/ipywui/components/VBox";
</script>
```

## Checkbox API

### Checkbox 属性

| 属性名    | 说明                 | 类型                                                           | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 选中项绑定值     | ^[bool]                                                      | —       |
| label    | 按钮后的介绍          | ^[str]                                                         | —       |
| indent   | 是否使用缩进          | ^[bool]                                                        | true    |
| disabled | 按钮是否为禁用状态     | ^[boolean]                                                     | false   |
| style    | 自定义css样式         | ^[str]                                                         | -       |

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

### Checkbox 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
