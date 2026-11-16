---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# RadioButtonGroup 单选按钮组

单选按钮组组件允许使用一组切换按钮从列表或字典中选择一个值。它属于单值选项选择组件的广泛类别，提供兼容的API，包括[``RadioBoxGroup``](RadioBoxGroup.md)、[``Select``](Select.md)和[``DiscreteSlider``](DiscreteSlider.md)组件。

底层实现为`panel.widgets.RadioButtonGroup`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/RadioButtonGroup.html

## 基本用法

基本的单选按钮组使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRadioButtonGroup name="RadioButtonGroup" 
                     :options="['Apple', 'Orange', 'Banana']" 
                     v-model="selected.value"
                     button_type="success"
                     @change="on_change" />
  <p>value: {{ selected.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

selected = ref('Apple')

def on_change(event):
    print(event.new)
</script>
```

## 垂直方向

可以将按钮组设置为垂直方向：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRadioButtonGroup button_type="primary"
                     :options="['Apple', 'Orange', 'Banana']" 
                     orientation="vertical" />
</template>
```

## 使用字典选项

可以使用字典作为选项，其中键是显示的标签，值是实际的数据值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRadioButtonGroup name="RadioButtonGroup" 
                     :options="city_options"
                     button_type="warning"
                     v-model="selected_city.value" />
  <p>value: {{ selected_city.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

city_options = {'Beijing': 'BJ', 'Shanghai': 'SH', 'Guangzhou': 'GZ'}
selected_city = ref('BJ')
</script>
```

## 按钮样式

可以通过设置`button_type`和`button_style`来改变按钮的外观：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnCol v-for="style in ['solid', 'outline']">
      <PnRadioButtonGroup v-for="type in button_types" 
                         :name="type"
                         :button_type="type"
                         :button_style="style"
                         :options="['opt1', 'opt2', 'opt3']"
                         value="opt2" />
    </PnCol>
  </PnRow>
</template>
<script lang='py'>
from vuepy import ref

button_types = ['default', 'primary', 'success', 'warning', 'danger', 'light']
</script>
```

## API

### 属性

| 属性名        | 说明                 | 类型                                                | 默认值 |
| ------------ | ------------------- | -------------------------------------------------- | ------- |
| options      | 选择选项             | ^[list\|dict]                                      | []      |
| value        | 当前值，必须是选项值之一 | ^[object]                                          | None    |
| button_style | 按钮样式             | ^[str] 'solid'或'outline'                           | 'solid' |
| button_type  | 按钮主题             | ^[str] 'default'、'primary'、'success'、'info'或'danger' | 'default' |
| description  | 鼠标悬停时显示的描述   | ^[str]                                             | ""      |
| disabled     | 是否禁用组件          | ^[bool]                                            | False   |
| name         | 组件标题             | ^[str]                                             | ""      |
| orientation  | 按钮组方向           | ^[str] 'horizontal'或'vertical'                     | 'horizontal' |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当选择变化时触发的事件 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()

radio_group = pn.widgets.RadioButtonGroup(
    name='Radio Button Group', options=['Biology', 'Chemistry', 'Physics'], button_type='success')
pn.Row(radio_group.controls(jslink=True), radio_group)
```
