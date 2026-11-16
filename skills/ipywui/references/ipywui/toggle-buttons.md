---
outline: deep
titleTemplate: :title | IPywUI
---

# ToggleButtons 切换按钮

在一组备选项中进行单选

## 基础用法

切换按钮不应该有太多的可选项， 如果你有很多的可选项你应该使用 `Select` 选择框而不是单选框。  
要使用 `ToggleButtons` 组件，只需要设置v-model绑定变量， 选中意味着变量的值为对应选项的值。  
选项 `options` 可以是标签的列表，也可以是 `(标签、值)` 形式的列表。

::: tip
`v-model` 或初始值必须是 options 中的值。
:::

使用图标为按钮添加更多的含义。 使用 `icons` 属性来为按钮添加图标。请参阅 [fontawesome](https://fontawesome.com/v5/search?m=free) 页面获取可用图标。

```vue
<!-- basic.vue -->
<template>
  <ToggleButtons description="Options ['pepperoni', 'pineapple', 'anchovies']"
                 v-model="choice1.value"
                 :options="options1"
                 @change="on_change"
  ></ToggleButtons>

  <ToggleButtons description="Options [('One', 1), ('Two', 2), ('Three', 3)]"
                 v-model="choice2.value"
                 :options="options2"
                 @change="on_change"
  ></ToggleButtons>

  <!--  style-->
  <ToggleButtons description="Style success"
                 type="success"
                 :options="options2"
  ></ToggleButtons>
  <ToggleButtons description="Style info"
                 type="info"
                 :options="options2"
  ></ToggleButtons>
  <ToggleButtons description="Style warning"
                 type="warning"
                 :options="options2"
  ></ToggleButtons>
  <ToggleButtons description="Style danger"
                 type="danger"
                 :options="options2"
  ></ToggleButtons>

  <!--  icon-->
  <ToggleButtons description="With icons"
                 :icons="['walking', 'car-side', 'plane']"
                 :options="['walking ', 'car ', 'plane ']"
  ></ToggleButtons>

</template>

<script setup>
import ToggleButtons from "../../../src/ipywui/components/ToggleButtons";
</script>
<script lang="py">
from vuepy import ref

options1 = ['pepperoni', 'pineapple', 'anchovies']
choice1 = ref(options1[0])

options2 = [('One', 1), ('Two', 2), ('Three', 3)]
choice2 = ref(options2[0][1])

def on_change(event):
    print(event) # {'new': 'pepperoni', 'old': 'pineapple', 'owner': ToggleButtons(...)}

def on_change2(event):
    print(event) # {'new': 'pepperoni', 'old': 'pineapple', 'owner': ToggleButtons(...)}

</script>
```

## 禁用状态

你可以使用 `disabled` 属性来定义是否被禁用。  
使用 `disabled` 属性来控制是否为禁用状态。该属性接受一个 `bool` 类型的值。

```vue
<!-- disabled.vue -->
<template>
  <ToggleButtons description="Disabled"
                 :options="['option1', 'option2', 'option3']"
                 disabled
  ></ToggleButtons>
</template>

<script setup>
import ToggleButtons from "../../../src/ipywui/components/ToggleButtons";
</script>
```

## 提示信息

通过 `tooltips` 属性在鼠标 hover 时展示提示信息。

```vue
<!-- tooltips.vue -->
<template>
  <ToggleButtons description="Tooltips"
                 :options="['pepperoni', 'pineapple', 'anchovies']"
                 :tooltips="['tooltip 1', 'tooltip 2', 'tooltip 3']"
  ></ToggleButtons>
</template>

<script setup>
import ToggleButtons from "../../../src/ipywui/components/ToggleButtons";
</script>
```

## 自定义样式

您可以自定义切换按钮样式。  
使用 `style` 属性额外配置样式: 
* `button_width`：按钮的宽度，可使用`px`、`%`、`auto`等形式。可使用`px`、`%`、`auto`等形式。
* `font_weight`：按钮字体的粗细。
* `description-width`：label的宽度。

```vue
<!-- custom.vue -->
<template>
  <ToggleButtons description="button-width 180px"
                 :options="['one', 'two', 'three']"
                 style="button-width: 180px"
  ></ToggleButtons>

  <ToggleButtons description="button-width 150px"
                 :options="['one', 'two', 'three']"
                 style="button-width: 150px"
  ></ToggleButtons>

  <ToggleButtons description="button-width auto"
                 :options="['one', 'two', 'three']"
                 style="button-width: auto"
  ></ToggleButtons>

  <ToggleButtons description="button-width 10%"
                 :options="['one', 'two', 'three']"
                 style="button-width: 10%"
  ></ToggleButtons>

  <ToggleButtons description="font-weight bold"
                 :options="['one', 'two', 'three']"
                 style="font-weight: bold"
  ></ToggleButtons>

</template>

<script setup>
import ToggleButtons from "../../../src/ipywui/components/ToggleButtons";
</script>
```

## API

### 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 绑定值             | ^[any]                                                         | —       |
| description     | 标签文字             | ^[str]                                                         | —       |
| options | 选项列表        | ^[list]                                                        | —       |
| icons | 选项图标列表        | ^[list]                                                        | —       |
| tooltips  | 选项提示信息列表         | ^[str]                                                         | —       |
| type     | 按钮类型                | ^[enum]`''\| 'success'\| 'warning'\| 'danger'\| 'info'`        | —       |
| disabled | 是否为禁用状态     | ^[boolean]                                                     | false   |
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

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当绑定值变化时触发的事件 |  ^[Callable]`({'new': val, 'old': val, 'owner': widget) -> None` |

### 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| index | 当前选择的索引 | int |
| label | 当前选择的标签 | --- |
| value | 当前选择的值 | --- |
