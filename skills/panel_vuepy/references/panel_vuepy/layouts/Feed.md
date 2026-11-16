---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Feed 信息流

Feed组件继承自Column布局，允许在垂直容器中排列多个组件，但限制了任何时刻渲染的对象数量，适用于显示大量条目。

底层实现为`panel.layout.Feed`，参数基本一致，参考文档：https://panel.holoviz.org/reference/layouts/Feed.html

## 基本用法

Feed组件可以显示大量条目，但只会加载和渲染当前可见的部分和缓冲区内的内容：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnFeed :load_buffer="5" :height="200">
    <p v-for="i in range(0, 10)">
      item {{ i }}
    </p>
  </PnFeed>
</template>
```

## 初始化显示最新条目

通过设置`view_latest=True`，可以让Feed在初始化时显示最新条目：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnFeed :view_latest="True" :height="200">
    <PnMarkdown v-for="i in range(0, 7)">
      item {{ i }}
    </PnMarkdown>
  </PnFeed>
</template>
```

## 添加滚动按钮

通过设置`scroll_button_threshold`，可以让Feed显示一个可点击的滚动按钮，帮助用户快速滚动到底部：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnFeed :scroll_button_threshold="10" :width="300" :height="150">
    <PnMarkdown v-for="i in range(0, 7)">
      item {{ i }}
    </PnMarkdown>
  </PnFeed>
</template>
```

## API

### 属性

| 属性名                 | 说明                                       | 类型                | 默认值  |
|----------------------|-------------------------------------------|---------------------|--------|
| v-model              | 当前的posts数据                              | ^[Array]            | []     |
| load_buffer          | 可见对象两侧加载的对象数量                    | ^[Number]           | —      |
| scroll               | 是否启用滚动条                              | ^[Boolean]          | True |
| scroll_position      | 当前滚动位置                                | ^[Number]           | —      |
| auto_scroll_limit    | 自动滚动激活的最大像素距离                   | ^[Number]           | —      |
| scroll_button_threshold | 显示滚动按钮的最小像素距离                | ^[Number]           | —      |
| view_latest          | 初始化时是否滚动到最新对象                   | ^[Boolean]          | False |
| visible_range        | 当前可见Feed对象的上下边界（只读）            | ^[Array]            | —      |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当Feed内容改变时触发   | ^[Callable]`(event: dict) -> None` |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | Feed的内容         |

### 方法

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| scroll_to | 滚动到指定索引的对象 | ^[Function]`(index: int) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()

f = pn.Feed(scroll_button_threshold=20, width=300)
pn.Row(f.controls(), f)
```
