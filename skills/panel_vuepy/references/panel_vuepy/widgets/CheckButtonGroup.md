---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# CheckButtonGroup 多选按钮组

多选按钮组组件允许通过切换相应的按钮来选择多个选项。它属于多选项选择组件的广泛类别，提供兼容的API，包括[``MultiSelect``](MultiSelect.md)、[``CrossSelector``](CrossSelector.md)和[``CheckBoxGroup``](CheckBoxGroup.md)组件。

底层实现为`panel.widgets.CheckButtonGroup`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/CheckButtonGroup.html

## 基本用法

基本的多选按钮组使用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCheckButtonGroup name="水果选择" 
                     :value="['苹果', '梨']"
                     :options="['苹果', '香蕉', '梨', '草莓']"
                     @change="on_change" />
  <div>当前选择: {{ selected.value }}</div>
</template>
<script lang='py'>
from vuepy import ref

selected = ref(["苹果", "梨"])

def on_change(event):
    selected.value = event['new']
</script>
```

## 垂直方向

可以将按钮组设置为垂直方向：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCheckButtonGroup name="水果选择" 
                     :value="['苹果']"
                     :options="['苹果', '香蕉', '梨', '草莓']"
                     button_type="primary"
                     orientation="vertical" />
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## 使用字典选项

可以使用字典作为选项，其中键是显示的标签，值是实际的数据值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCheckButtonGroup name="城市选择" 
                     :options="city_options"
                     :value="['BJ', 'SZ']"
                     v-model="selected_cities.value" />
  <div>选中城市代码: {{ selected_cities.value }}</div>
</template>
<script lang='py'>
from vuepy import ref

city_options = {'北京': 'BJ', '上海': 'SH', '广州': 'GZ', '深圳': 'SZ'}
selected_cities = ref(['BJ', 'SZ'])
</script>
```

## 按钮样式

可以通过设置`button_type`和`button_style`来改变按钮的外观：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnCol v-for="style in ['solid', 'outline']">
      <PnCheckButtonGroup v-for="type in button_types" 
                         :name="type"
                         :button_type="type"
                         :button_style="style"
                         :options="['选项1', '选项2', '选项3']"
                         :value="['选项2']" />
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
| value        | 当前值，多个选中项的列表 | ^[list]                                            | []      |
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

checkbutton_group = pn.widgets.CheckButtonGroup(name='Check Button Group', value=['Apple', 'Pear'], options=['Apple', 'Banana', 'Pear', 'Strawberry'])
pn.Row(checkbutton_group.controls(jslink=True), checkbutton_group)
```
