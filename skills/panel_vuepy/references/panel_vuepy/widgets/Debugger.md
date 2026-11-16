---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Debugger 调试器

Debugger是一个不可编辑的Card布局组件，可以在前端显示仪表板运行时可能触发的日志和错误。

底层实现为`panel.widgets.Debugger`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/Debugger.html

## 基本用法

调试器可以在应用程序运行时显示日志和错误信息，对于在前端跟踪和调试问题非常有用。如果未指定logger_names，则必须使用`panel`记录器或自定义子记录器（例如`panel.myapp`）记录事件。

注意：调试器基于terminal组件，需要调用`pn.extension('terminal')`。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnRow>
    <PnDebugger name="我的调试器" />
  </PnRow>
</template>
<script lang='py'>
import panel as pn
# 需要初始化terminal扩展
pn.extension('terminal', console_output='disable')
</script>
```

## 错误捕获

调试器可以捕获和显示应用程序中发生的错误，帮助用户了解交互过程中遇到的问题。

```vue
<!-- --plugins vpanel --show-code --backend='panel' -->
<template>
  <PnCol>
    <PnRadioButtonGroup 
      name="触发错误" 
      value="no error" 
      :options="['ZeroDivision', 'no error', 'Custom error']" 
      button_type="danger" 
      v-model="error_type.value"
      @change="throw_error"
    />
    <PnDebugger name="错误调试器" />
  </PnCol>
</template>
<script lang='py'>
import panel as pn
from vuepy import ref

# 需要初始化terminal扩展
pn.extension('terminal', console_output='disable')

error_type = ref('no error')

def throw_error(event):
    if event['new'] == 'ZeroDivision':
        try:
            1/0
        except Exception as e:
            raise e
    elif event['new'] == 'Custom error':
        raise Exception('自定义错误示例')
</script>
```

## 日志级别

通过设置不同的日志级别，可以控制显示哪些级别的日志信息。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol sizing_mode="stretch_both">
    <PnRadioButtonGroup 
      name="显示信息" 
      :options="['debug', 'info', 'warning']" 
      v-model="info_type.value"
      @change="log_message"
    />
    <PnDebugger 
      name="信息级别调试器" 
      :level="logging.INFO" 
      sizing_mode="stretch_both"
      :logger_names="['panel.myapp']"
    />
  </PnCol>
</template>
<script lang='py'>
import panel as pn
import logging
from vuepy import ref

# 需要初始化terminal扩展
pn.extension('terminal', console_output='disable')

logger = logging.getLogger('panel.myapp')
info_type = ref('info')

def log_message(event):
    msg = (event['new'] + ' 通过按钮发送').capitalize()
    if event['new'] == 'info':
        logger.info(msg)
    elif event['new'] == 'debug':
        logger.debug(msg)
    elif event['new'] == 'warning':
        logger.warning(msg)
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| only_last | 记录异常时，指示是否仅提示堆栈中的最后一个跟踪 | ^[boolean] | false |
| level | 要在前端提示的日志级别 | ^[int] | logging.ERROR |
| formatter_args | 传递给格式化程序对象的参数 | ^[dict] | `{'fmt':"%(asctime)s [%(name)s - %(levelname)s]: %(message)s"}` |
| logger_names | 将提示到终端的记录器名称列表 | ^[list] | ['panel'] |
| name | 组件标题 | ^[string] | — |

### 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| btns | 获取调试器控制按钮 | ^[function] |
