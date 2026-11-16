---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Terminal 终端

终端组件提供了一个与底层命令行交互的终端界面。它基于xterm.js，并通过WebSocket连接到服务器端的虚拟终端。

底层实现为`panel.widgets.Terminal`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/Terminal.html

## 基本用法

创建一个基本的终端界面：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnTerminal 
    output="Welcome to the Panel Terminal!\nI'm based on xterm.js\n\n"
    :height="300" sizing_mode='stretch_width'/>
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## 自定义参数

可以设置各种终端参数，如字体大小、是否显示光标等：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnTerminal :height='200' :width='300' output='> hello'
              :options="{
               'cursorBlink': True,
               'fontSize': 18,
               'theme': {
                 'background': '#42b883',
                 'foreground': '#f8f8f8'
               }
             }" />
</template>
<script lang='py'>
from vuepy import ref
</script>
```

## 交互处理

终端还可以通过命令随时更新：

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnRow>
    <PnButton name="run python" @click="run_py()" />
    <PnButton name="clear" @click="clear_term()" />
  </PnRow>
  <PnTerminal output='>>> Python 3.10.12' ref='terminal'
             :height='300' sizing_mode='stretch_width'/>
</template>
<script lang='py'>
from vuepy import ref, onMounted

terminal = ref(None)

def run_py():
    if terminal.value:
        t = terminal.value.unwrap()
        if t.subprocess.running:
            return
        # t.subprocess.run("python", "-c", 'print(\"Hello from Python!\")')
        t.subprocess.run("python")

def clear_term():
    if terminal.value:
        t = terminal.value.unwrap()
        t.subprocess.kill()
        t.clear()

@onMounted
def run():
    run_py()
</script>
```

## API

### 属性

| 属性名          | 说明                 | 类型                          | 默认值 |
| -------------- | ------------------- | ----------------------------- | ------ |
| output         | 终端目前的输出内容     | ^[str]                        | ""     |
| options        | 传递给终端后端的选项   | ^[dict]                       | None   |
| disabled       | 是否禁用组件          | ^[bool]                       | False  |
| name           | 组件标题              | ^[str]                        | ""     |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当终端内容变化时触发   | ^[Callable]`(event: dict) -> None` |

### 方法

| 方法名 | 说明 | 类型 |
| ----- | ---- | ---- |
| clear | 清空终端内容 | ^[Callable]`() -> None` |
| write | 向终端写入内容 | ^[Callable]`(content: str) -> None` |
| subprocess.run | 运行命令子进程 | ^[Callable]`(command: List[str]) -> None` |
| subprocess.kill | 杀死命令子进程 | |

## Controls

```python
##controls
import panel as pn
pn.extension('terminal')

terminal = pn.widgets.Terminal(width=400, height=300, options={'shell': True})
pn.Column(terminal, terminal.controls())
```
