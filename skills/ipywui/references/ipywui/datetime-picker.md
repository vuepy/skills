---
outline: deep
titleTemplate: :title | IPywUI
---

# DateTimePicker 日期时间选择器

在同一个选择器里选择日期和时间

::: tip
日期时间选择器来自日期选择器和时间选择器的组合。 关于属性的更详细解释，请参阅日期选择器和时间选择器。
:::

::: top
有关 DateTimePicker 组件支持的浏览器列表，请参阅 [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#Browser_compatibility)。对于不支持的浏览器，会尝试回退到单独的日期和时间输入。
:::

## 基本用法

在同一个选择器里同时进行日期和时间的选择。 

`v-model` 的值为 `datetime.datetime` 类型。

```vue
<!-- basic.vue -->
<template>
  <DateTimePicker label="Pick a time"
                  v-model="datetime.value"
                  @change="on_change"
  ></DateTimePicker>
</template>

<script src="./basic_setup.py"></script>
<script setup>
import DateTimePicker from "../../../src/ipywui/components/DateTimePicker";
</script>
```

```python
# ./basic_setup.py

from vuepy import ref

def setup(props, ctx, vm):
    datetime = ref(None)

    def on_change(event):
        print(event) # {'new': datetime.datetime(2025, 3, 22, 12, 0), 'old': None, 'owner': DateTimePicker(...)}

    return locals()
```

## 限制时间选择范围

可以限制时间选择范围。

通过 `min` 和 `max` 限制可选时间范围。

```vue
<!-- basic-range.vue -->
<template>
  <Input :value="str(min_time) + ' to ' + str(max_time)"></Input>
  <DateTimePicker label="Pick a day"
              v-model="time.value"
              :min="min_time"
              :max="max_time"
  ></DateTimePicker>
</template>

<script src="./basic_range_setup.py"></script>
<script setup>
import DateTimePicker from "../../../src/ipywui/components/DateTimePicker";
import Input from "../../../src/ipywui/components/Input";
</script>
```

```python
# ./basic_range_setup.py

import datetime

from vuepy import ref

def setup(props, ctx, vm):
    time = ref(None)

    tz = datetime.timezone(datetime.timedelta(seconds=28800), 'CST')
    min_time = datetime.datetime(2021, 1, 1, tzinfo=tz)
    max_time = datetime.datetime(2024, 1, 1, tzinfo=tz)

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

## DateTimePicker API

### DateTimePicker 属性

| 属性名    | 说明                 | 类型                                                           | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 绑定值             | ^[datetime.datetime]                                                         | —       |
| label     | 标签文字             | ^[str]                                                         | —       |
| min      | 允许选择的最小时间             | ^[datetime.datetime]                                            | —       |
| max      | 允许选择的最大时间             | ^[datetime.datetime]                                            | —       |
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

### DateTimePicker 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
