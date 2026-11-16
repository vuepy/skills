---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# StaticText 静态文本

StaticText组件显示文本值但不允许编辑它，适用于展示只读信息。

底层实现为`panel.widgets.StaticText`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/StaticText.html

## 基本用法

静态文本组件提供了一种简单的方式来显示不可编辑的文本内容。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnStaticText 
    name="静态文本" 
    value="这是一个不可编辑的文本内容"
  />
</template>
```

## 动态内容

静态文本组件可以与响应式数据结合使用，以显示动态更新的内容。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol>
    <PnStaticText 
      name="计数器值" 
      :value="f'当前计数: {counter.value}'"
    />
    <PnButton 
      name="增加计数" 
      button_type="primary" 
      @click="increment()"
    />
  </PnCol>
</template>
<script lang='py'>
import panel as pn
from vuepy import ref

counter = ref(0)

def increment():
    counter.value += 1
</script>
```

## 样式自定义

可以通过样式参数自定义静态文本的外观。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol>
    <PnStaticText 
      name="标准样式" 
      value="默认样式的静态文本"
    />
    
    <PnStaticText 
      name="自定义颜色" 
      value="红色文本内容"
      style="color: red"
    />
    
    <PnStaticText 
      value="无标题但有背景色的文本"
      style="background: #e8f4f8; padding: 10px; border-radius: 5px"
    />
    
    <PnStaticText 
      name="大字体" 
      value="这是一个字体较大的文本"
      style="font-size: 24px; font-weight: bold"
    />
  </PnCol>
</template>
<script lang='py'>
import panel as pn
from vuepy import ref

pn.extension()
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| name | 组件标题 | ^[string] | — |
| value | 文本内容 | ^[string] | — |

## Controls

```python
##controls
import panel as pn
pn.extension()

static_text = pn.widgets.StaticText(name='Static Text', value='A string')

pn.Row(static_text.controls(jslink=True), static_text)
```
