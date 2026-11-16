---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# ToggleGroup 开关组

开关组组件允许从多个选项中切换选择，类似于`RadioButtonGroup`或`CheckButtonGroup`，但默认使用简单的切换按钮而不是按钮。

底层实现为`panel.widgets.ToggleGroup`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/ToggleGroup.html

## 基本用法

基本的开关组使用：

* ToggleGroup 作为工厂类，实例化后不可修改 widget_type 和 behavior 参数
* 所有额外参数将传递给最终生成的组件构造函数

| 属性名        | 说明                                                                 | 类型                          | 默认值      |
|-------------|--------------------------------------------------------------------|-----------------------------|------------|
| widget_type | 组件类型（可选：button-按钮型 / box-checkbox型）                           | ^[str]                      | 'button'   |
| behavior    | 交互行为（可选：check-多选模式 / radio-单选模式）                      | ^[str]                      | 'check'    |

<!-- 组件类型组合结果表 -->
| widget_type | behavior | 生成的组件类型          |
|------------|----------|-----------------------|
| button     | check    | CheckButtonGroup      |
| button     | radio    | RadioButtonGroup      |
| box        | check    | CheckBoxGroup         |
| box        | radio    | RadioBoxGroup         |

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnToggleGroup name="ToggleGroup" 
                :options="['opt1', 'opt2', 'opt3']" 
                v-model='selected.value'/>
  <p>value: {{ selected.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

selected = ref([])
</script>
```

## 使用Box接口

可以设置为CheckBox样式：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnToggleGroup name="Checkbox" 
                :options="['Opt1', 'Opt2', 'Opt3']" 
                behavior="check"
                widget_type='box' />
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## 垂直布局

可以设置为垂直布局：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnToggleGroup name="垂直布局" 
                :options="['选项1', '选项2', '选项3']" 
                orientation="vertical" />
</template>
```

## 使用字典选项

可以使用字典作为选项，其中键是显示的标签，值是实际的数据值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnToggleGroup name="使用字典" 
                :options="city_options"
                v-model='selected_city.value'/>
  <p>value: {{ selected_city.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

city_options = {'北京': 'BJ', '上海': 'SH', '广州': 'GZ', '深圳': 'SZ'}
selected_city = ref(['BJ'])
</script>
```

## API

### 属性

| 属性名        | 说明                 | 类型                                                | 默认值 |
| ------------ | ------------------- | -------------------------------------------------- | ------- |
| widget_type | 组件类型（可选：button-按钮型 / box-Checkbox型）                           | ^[str]                      | 'button'   |
| behavior    | 交互行为（可选：check-多选模式 / radio-单选模式）                      | ^[str]                      | 'check'    |
| options      | 选择选项             | ^[list\|dict]                                      | []      |
| value        | 当前值，多选模式下为列表 | ^[object\|list]                                    | None    |
| behavior     | 用户交互行为          | ^[str] 'radio'、'check'或'button'                   | 'radio' |
| button_style | 按钮样式（行为为button时） | ^[str] 'solid'或'outline'                        | 'solid' |
| button_type  | 按钮主题（行为为button时） | ^[str] 'default'、'primary'、'success'、'info'或'danger' | 'default' |
| disabled     | 是否禁用组件          | ^[bool]                                            | False   |
| name         | 组件标题             | ^[str]                                             | ""      |
| orientation  | 开关组方向           | ^[str] 'horizontal'或'vertical'                     | 'horizontal' |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当选择变化时触发的事件 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()

toggle_group = pn.widgets.ToggleGroup(
    name='Toggle Group', options=['Option 1', 'Option 2', 'Option 3', 'Option 4'], button_type='success')
pn.Row(toggle_group.controls(jslink=True), toggle_group) 
```
