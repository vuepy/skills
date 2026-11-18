---
outline: deep
titleTemplate: :title | IPywUI
---

# Slider 滑块

通过拖动滑块在一个固定区间内进行选择

## 基础用法

在拖动滑块时，显示当前值  
通过设置绑定值自定义滑块的初始值。  
`continuous_update` 表示滑动过程中是否持续发送更新事件。

```vue
<!-- basic.vue -->
<template>
  <Slider description="Default" v-model="default.value"></Slider>
  <Slider description="Init val 5" v-model="init_val.value"></Slider>
  <Slider description="Float"
          v-model="float_val.value"
          :min="0"
          :max="30"
          @change="on_change"
  ></Slider>
  <Slider description="Selection"
          v-model="selection_val.value"
          :options="selection_options"
  ></Slider>
  <Slider description="Disabled" :value="1" disabled></Slider>
</template>

<script setup>
import Slider from "../../../src/ipywui/components/Slider";
</script>
<script lang="py">
from vuepy import ref

default = ref(0)
init_val = ref(5)
float_val = ref(10.1)
selection_val = ref('a')
selection_options = ['a', 'b', 'c', 'd']

def on_change(event):
    print(event) # {'new': 10.1, 'old': 10.1, 'owner': Slider(...)}

</script>
```

## 范围选择

你还可以选择一个范围值  
配置 range 属性以激活范围选择模式，该属性的绑定值是一个数组，由最小边界值和最大边界值组成。

```vue
<!-- range-selection.vue -->
<template>
  <Slider description="Int range"
          v-model="int_range.value"
          :max="10"
          range
          @change="on_change"
  ></Slider>
  <Slider description="Float range"
          v-model="float_range.value"
          :min="0.0"
          :max="10.0"
          range
  ></Slider>
  <Slider description="Selection range"
          v-model="selection_range.value"
          :options="selection_options"
          style="description-width: 100px"
          range
  ></Slider>
</template>

<script setup>
import Slider from "../../../src/ipywui/components/Slider";
</script>
<script lang="py">
from vuepy import ref

int_range = ref([1, 3])
float_range = ref([1.1, 3.1])
selection_range = ref(['a', 'c'])
selection_options = ['a', 'b', 'c', 'd']

def on_change(event):
    print(event) # {'new': (1, 3), 'old': (1, 5), 'owner': Slider(...)}

</script>
```

## 垂直模式

默认情况下，方向 `direction` 为 水平 `horizontal`。 通过设置 `direction` 为 `vertical` 来让 Slider 在垂直方向上显示。

```vue
<!-- vertical.vue -->
<template>
  <HBox>
    <Slider description="Float"
            :value="3"
            :min="0.0"
            :max="30"
            vertical
    ></Slider>
    <Slider description="Selection"
            value="b"
            :options="['a', 'b', 'c']"
            vertical
    ></Slider>
  </HBox>
</template>

<script setup>
import Slider from "../../../src/ipywui/components/Slider";
import HBox from "../../../src/ipywui/components/HBox";
</script>
```

## 显示标记

设置 `options` 属性可以在滑块上显示标记。

::: tip
`v-model` 或初始值必须是 options 中的值。
:::

```vue
<!-- show-marks.vue -->
<template>
  <Input :value="str(selection.value)"></Input>
  <Slider description="Selection"
          v-model="selection.value"
          :options="selection_options"
          style="description-width: 100px"
  ></Slider>
  <Input :value="str(selection_range.value)"></Input>
  <Slider description="Selection range"
          v-model="selection_range.value"
          :options="selection_options"
          style="description-width: 100px"
          range
  ></Slider>
</template>

<script src="./show_marks_setup.py"></script>
<script setup>
import Slider from "../../../src/ipywui/components/Slider";
import Input from "../../../src/ipywui/components/Input";
</script>
```

```python
# ./show_marks_setup.py

from vuepy import ref

def setup(props, ctx, vm):
    selection_options = [('0°C', 0), ('5°C', 5), ('10°C', 10), ('37°C', 37)]
    selection = ref(10)
    selection_range = ref([5, 37])

    return locals()
```

## 格式化展示

对于数值的展示可以使用 `format` 来格式化。

```vue
<!-- format.vue -->
<template>
  <Input value="use format '$,d'"></Input>
  <Slider description="Float"
          :value="3"
          :min="0.0"
          :max="30"
          readout_format="$,d"
  ></Slider>

  <Input value="use format '.2f'"></Input>
  <Slider description="Float"
          :value="3"
          :min="0"
          :max="30"
          readout_format=".2f"
  ></Slider>
</template>

<script setup>
import SelectNumbers from "../../../src/ipywui/components/SelectNumbers";
import Input from "../../../src/ipywui/components/Input";
import Slider from "../../../src/ipywui/components/Slider";
</script>
```

## 提示信息

通过 `tooltip` 属性在鼠标 hover 标签时展示提示信息。

```vue
<!-- tooltip.vue -->
<template>
  <Slider description="Float"
          :value="3"
          :min="0.0"
          :max="30.0"
          tooltip="show tooltip info!"
  ></Slider>
</template>

<script setup>
import Slider from "../../../src/ipywui/components/Slider";
</script>
```

## API

### 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 选中项绑定值              | ^[int\|float\|list]                                                        | —       |
| min          | 允许的最小值          | ^[int\|float]                                                  | -inf    |
| max          | 允许的最大值          | ^[int\|float]                                                  | inf     |
| step         | 步进                 | ^[int\|float]                                                  | inf     |
| options      | 可选项               | ^[list[]                                                         | —       |
| disabled | 按钮是否为禁用状态     | ^[boolean]                                                     | false   |
| description     | 标签文字             | ^[str]                                                         | —       |
| continuous_update| 滑动过程中是否持续发送更新事件 | ^[boolean]                                      | false   |
| readout      | 否是显示当前值| ^[boolean]                                                     | true |
| readout_format       | 数据展示格式化        | ^[str]                                                         | —       |
| range | 是否开启选择范围 | ^[boolean]                                                     | false |
| vertical | 是否为垂直排列        | ^[boolean]                                                     | false   |
| tooltip      | 提示信息             | ^[str]                                                         | —       |
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
| index | 选中项的索引 | ^[int\|list] |
| label | 选中项的标签 | ^[int\|float\|list] |
| value | 选中项的值 | ^[int\|float\|list] |
