---
outline: deep
titleTemplate: :title | IPywUI
---

# Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合。

## 基础用法

基础的、简洁的标签页。  

通过设置 `selected_index` 属性 或 `v-model` 绑定的变量值来指定当前选中的标签页。  
如果设置为 `None` 将关闭所有标签页。

```vue
<!-- basic.vue -->
<template>
  <Tabs v-model="selected.value" @change="on_change">
    <TabPane title="Tab1">
      <Slider description="slider"></Slider>
    </TabPane>

    <TabPane title="Tab2">
      <Input placeholder="input"></Input>
    </TabPane>

    <TabPane title="Tab3">
      <Button label="click" type="info"></Button>
    </TabPane>

  </Tabs>
</template>

<script setup>
import Tabs from "../../../src/ipywui/components/Tabs";
import TabPane from "../../../src/ipywui/components/TabPane";
import Slider from "../../../src/ipywui/components/Slider";
import Input from "../../../src/ipywui/components/Input";
import Button from "../../../src/ipywui/components/Button";
</script>
<script lang="py">
from vuepy import ref

selected = ref(1)

def on_change(event):
    # get selected index
    print(event) # {'new': 0, 'old': 1, 'owner': Tabs(...)}

</script>
```

## Tabs API

### Tabs 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/selected_index | 绑定值，选中标签页的索引值             | ^[int]                                                         | —       |
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

### Tabs Slots

| 插槽名   | 说明               | 子标签 |
| ---     | ---               | --- |
| default | 自定义默认内容      | Accordion Item |

### Tabs 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |

## TabPane API

### TabPane 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| title | 标签页标题 | ^[str]                                                         | —       |

### TabPane Slots

| 插槽名   | 说明               | 
| ---     | ---               |
| default | 自定义默认内容      |
