---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# DiscreteSlider 离散滑块

离散滑块组件允许使用滑块从离散列表或字典中选择值，提供了类似Select组件的选择功能，但使用滑块作为交互界面。

底层实现为`panel.widgets.DiscreteSlider`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/DiscreteSlider.html

## 基本用法

基本的离散滑块使用列表作为选项：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDiscreteSlider name="数值列表" 
                   :options="[2, 4, 8, 16, 32, 64, 128]"
                   v-model="value.value"/>
  <p>当前值: {{ value.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

value = ref(32)
</script>
```

## 使用字典作为选项

`options`参数也接受一个字典，其键将作为滑块上显示的文本标签：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDiscreteSlider name="选择速度" 
                   :options="{'慢': 'slow', '中': 'medium', '快': 'fast'}"
                   :value="'medium'"
                   @change="update_value" />
  <p>当前速度: {{ value.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

value = ref('medium')

def update_value(new_value):
    value.value = new_value.new
</script>
```

## 垂直方向

滑块可以设置为垂直方向显示：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnRow>
    <PnDiscreteSlider name="垂直滑块" 
                     orientation="vertical"
                     :options="[1, 2, 3, 4, 5]"
                     :value="3"
                     :height="200"
                     @change="update_value" />
  </PnRow>
  <div>当前值: {{ value.value }}</div>
</template>
<script lang='py'>
from vuepy import ref

value = ref(3)

def update_value(new_value):
    value.value = new_value
</script>
```

## 自定义样式

可以自定义滑块条的颜色和方向：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnDiscreteSlider name="蓝色滑块" 
                   bar_color="#3498db"
                   :options="['A', 'B', 'C', 'D', 'E']"
                   v-model="value1.value"/>
  <PnDiscreteSlider name="从右到左" 
                   direction="rtl"
                   :options="['A', 'B', 'C', 'D', 'E']"
                   v-model="value2.value"/>
  <div>蓝色滑块值: {{ value1.value }}</div>
  <div>从右到左滑块值: {{ value2.value }}</div>
</template>
<script lang='py'>
from vuepy import ref

value1 = ref('C')
value2 = ref('C')

</script>
```

## API

### 属性

| 属性名          | 说明                           | 类型                                | 默认值        |
| -------------- | ------------------------------ | ---------------------------------- | ------------ |
| options        | 选项列表或字典                  | ^[list\|dict]                      | []           |
| value          | 当前选中的值                    | ^[Any]                             | None         |
| value_throttled| 鼠标释放前阻止的值              | ^[Any]                             | None         |
| bar_color      | 滑块条的颜色，十六进制RGB值      | ^[str]                             | None         |
| direction      | 滑块方向，从左到右('ltr')或从右到左('rtl') | ^[str]               | 'ltr'        |
| disabled       | 是否禁用                       | ^[bool]                            | False        |
| name           | 组件标题                       | ^[str]                             | ""           |
| orientation    | 滑块的显示方向，'horizontal'或'vertical' | ^[str]                 | 'horizontal' |
| tooltips       | 是否在滑块手柄上显示工具提示     | ^[bool]                            | True         |

### Events

| 事件名         | 说明                       | 类型                                   |
| ------------- | -------------------------- | -------------------------------------- |
| change        | 当值更改时触发的事件         | ^[Callable]`(value) -> None`          |

## Controls

```python
##controls
import panel as pn
pn.extension()

discrete_slider = pn.widgets.DiscreteSlider(name='Discrete Slider', options=[2, 4, 8, 16, 32, 64, 128], value=32)
pn.Row(discrete_slider.controls, discrete_slider) 
```
