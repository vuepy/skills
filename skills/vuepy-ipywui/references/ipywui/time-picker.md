---
outline: deep
titleTemplate: :title | IPywUI
---

# TimePicker 时间选择器

用于选择或输入日期

::: tip
有关 TimePicker 组件支持的浏览器列表，请参阅 [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#Browser_compatibility)。
:::

## 基本用法

可以选择任意时间

`v-model` 的值为 `datetime.time` 类型。指定 `step` 后可以在`秒`维度进行选择。

```vue
<!-- basic.vue -->
<template>
  <TimePicker label="HH::mm"
              v-model="time.value"
              @change="on_change"
  ></TimePicker>

  <TimePicker label="HH::mm::ss"
              v-model="time.value"
              :step="1"
  ></TimePicker>
</template>

<script setup>
import TimePicker from "../../../src/ipywui/components/TimePicker";
</script>
<script lang="py">
from vuepy import ref

time = ref(None)

def on_change(event):
    print(event) # {'new': datetime.time(12, 0), 'old': None, 'owner': TimePicker(...)}

</script>
```

## 限制时间选择范围

可以限制时间选择范围。

通过 `min` 和 `max` 限制可选时间范围。

```vue
<!-- basic-range.vue -->
<template>
  <Input :value="str(min_time) + ' to ' + str(max_time)"></Input>
  <TimePicker label="HH::mm::ss"
              v-model="time.value"
              :min="min_time"
              :max="max_time"
              :step="1"
  ></TimePicker>
</template>

<script src="./basic_range_setup.py"></script>
<script setup>
import TimePicker from "../../../src/ipywui/components/TimePicker";
import Input from "../../../src/ipywui/components/Input";
</script>
```

```python
# ./basic_range_setup.py

import datetime

from vuepy import ref

def setup(props, ctx, vm):
    time = ref(None)
    min_time = datetime.time(10, 10, 0)
    max_time = datetime.time(12, 10, 0)

    return locals()
```

## 禁用状态

你可以使用 `disabled` 属性来定义是否被禁用。  
使用 `disabled` 属性来控制是否为禁用状态。该属性接受一个 `bool` 类型的值。

```vue
<!-- disabled.vue -->
<template>
  <DateTimePicker label="Disabled" disabled></DateTimePicker>
</template>

<script setup>
import DateTimePicker from "../../../src/ipywui/components/DateTimePicker";
</script>
```

## 自定义样式

您可以自定义输入框样式。  
使用 `style` 属性额外配置样式: 
* `description-width`：label的宽度。

```vue
<!-- custom.vue -->
<template>
  <DateTimePicker label="Description-width 150px"
              style="description-width: 150px"
  ></DateTimePicker>

  <DateTimePicker label="Description-width 180px"
              style="description-width: 180px"
  ></DateTimePicker>
</template>

<script setup>
import DateTimePicker from "../../../src/ipywui/components/DateTimePicker";
</script>
```

## TimePicker API

### TimePicker 属性

| 属性名    | 说明                 | 类型                                                           | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 绑定值             | ^[datetime.time]                                            | —       |
| label     | 标签文字             | ^[str]                                                         | —       |
| min      | 允许选择的最小时间             | ^[datetime.time]                                            | —       |
| max      | 允许选择的最大时间             | ^[datetime.time]                                            | —       |
| step     | 时间选择器的步长             | ^[float]                                            | —       |
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

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当绑定值变化时触发的事件 |  ^[Callable]`({'new': val, 'old': val, 'owner': widget) -> None` |

### TimePicker 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
