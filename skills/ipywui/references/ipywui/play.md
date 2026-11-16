---
outline: deep
titleTemplate: :title | IPywUI
---

# Play 播放动画

通过一定速度来执行动画。

## 基础用法

通过一定速度 `interval` 定时将值从 `min` 按 `step` 更新到 `max`。

```vue
<template>
  <VBox>
    <Input :value="str(frame.value)"></Input>
    <Play label="int"
          v-model="frame.value"
          :min="1"
          :max="10"
          :step="1"
          :interval="500"
    ></Play>

    <Input :value="str(frame2.value)"></Input>
    <Play label="int"
          v-model="frame2.value"
          :min="1"
          :max="10"
          :step="1"
          :interval="1000"
    ></Play>
  </VBox>
</template>

<script src="./basic_setup.py"></script>
<script setup>
import VBox from "../../../src/ipywui/components/VBox";
import Play from "../../../src/ipywui/components/Play";
import Input from "../../../src/ipywui/components/Input";
</script>
```

```python
# ./basic_setup.py

from vuepy import ref

def setup(props, ctx, vm):
    frame = ref(1)
    frame2 = ref(1)
    return locals()
```

## 禁用状态

你可以使用 `disabled` 属性来定义是否被禁用。  
使用 `disabled` 属性来控制是否为禁用状态。该属性接受一个 `bool` 类型的值。

```vue
<template>
  <Play label="Disabled" disabled></Play>
</template>

<script setup>
import Play from "../../../src/ipywui/components/Play";
</script>
```

## API

### 属性

| 属性名    | 说明                 | 类型                                                           | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 绑定值             | ^[int]                                                      | —       |
| label    | 标签文字             | ^[str]                                                         | —       |
| min | 设置计数器的最小值       | ^[int\|float]                                                         | -inf       |
| max | 设置计数器的最大值       | ^[int\|float]                                                         | inf        |
| step | 计数器步长                | ^[int\|float]                                                         | 1       |
| interval | 定时更新的时间间隔，单位：毫秒 | ^[int]                                                         | -       |
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

### 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
