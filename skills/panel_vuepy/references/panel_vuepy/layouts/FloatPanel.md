---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# FloatPanel 浮动面板

FloatPanel提供一个可拖动的容器，可以放置在其父容器内部或完全自由浮动。

底层实现为`panel.layout.FloatPanel`，参数基本一致，参考文档：https://panel.holoviz.org/reference/layouts/FloatPanel.html

## 基本用法

浮动面板可以包含在父容器内：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnColumn :height="250">
    <PnMarkdown>
      **Example: Basic `FloatPanel`**
    </PnMarkdown>
    <PnFloatPanel name="Basic FloatPanel" :margin="20">
      <PnTextInput name="Text:" />
    </PnFloatPanel>
  </PnColumn>
</template>
```

## 自由浮动

浮动面板也可以配置为自由浮动，不受父容器限制：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnFloatPanel name="Free Floating FloatPanel" 
               :contained="False" 
               position="center">
    <p>
      Try dragging me around.
    </p>
  </PnFloatPanel>
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## 自定义配置

FloatPanel可以通过`config`参数进行高度自定义，比如移除关闭按钮：

要了解更多配置选项，请查看 [jsPanel 文档](https://jspanel.de/)

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnColumn :height="200">
    <PnMarkdown>
      Example: `FloatPanel` without *close button*
    </PnMarkdown>
    <PnFloatPanel name="FloatPanel without close button" 
                 :margin="20" 
                 :config="config">
      <PnMarkdown>
        You can't close me!
      </PnMarkdown>
    </PnFloatPanel>
  </PnColumn>
</template>
<script lang='py'>
from vuepy import ref

# Custom configuration to remove close button
config = {"headerControls": {"close": "remove"}}
</script>
```

## 状态控制

可以通过`status`属性控制FloatPanel的状态：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnColumn>
    <PnRow>
      <PnButton name="Norm" @click="set_normal()" />
      <PnButton name="Max" @click="set_max()" />
      <PnButton name="Min" @click="set_min()" />
      <PnButton name="Small" @click="set_small()" />
      <PnButton name="Closed" @click="set_closed()" />
    </PnRow>
    <PnFloatPanel name="FloatPanel with Status Control" 
                 v-model="status.value"
                 :contained="False"
                 @change="handle_change">
      <PnMarkdown>
        Try changing my status with the buttons above.
      </PnMarkdown>
    </PnFloatPanel>
  </PnColumn>
</template>
<script lang='py'>
from vuepy import ref

status = ref("normalized")

def set_normal():
    status.value = 'normalized'

def set_max():
    status.value = 'maximized'
    
def set_min():
    status.value = 'minimized'
    
def set_small():
    status.value = 'smallified'
    
def set_closed():
    status.value = 'closed'

def handle_change(event):
    print(event.new)
</script>
```

## API

### 属性

| 属性名        | 说明                     | 类型           | 默认值        |
|-------------|---------------------------|--------------|--------------|
| contained   | 组件是否包含在父容器内（否则自由浮动）| ^[bool]                     | True |
| config      | 优先级高于参数值的额外jsPanel配置   | ^[dict]                     | {}           |
| objects     | 列中显示的对象列表（通常不应直接修改）| ^[list]                     | []           |
| position    | 自由浮动时的初始位置               | ^[str]                      | -            |
| offsetx     | 水平偏移量（像素）                 | ^[int]                      | 0            |
| offsety     | 垂直偏移量（像素）                 | ^[int]                      | 0            |
| theme       | 主题样式（内置选项/颜色值/Material Design颜色系统，可带修饰符） | ^[str]                      | 'default'    |
| v-model/status      | 面板当前状态（"normalized"/"maximized"/"minimized"等） | ^[str]                      | 'normalized' |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当面板状态改变时触发   | ^[Callable]`(event: dict) -> None` |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |
| default | 浮动面板内容        |

## Controls

```python
##controls
import panel as pn
pn.extension('floatpanel')

w2 = pn.widgets.FloatSlider(name='Slider')
floatpanel = pn.layout.FloatPanel(w2, name='FloatPanel with Controls', margin=20)

pn.Row(
    floatpanel.controls(jslink=False),
    # floatpanel,
)
```
