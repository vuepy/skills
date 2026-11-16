---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Notifications 通知

NotificationsArea 组件是一个全局组件，允许用户显示所谓的“toast”，以向用户提供信息。可以通过 pn.extension 设置 notifications=True 或直接设置 pn.config.notifications = True 来启用通知。

参考文档：https://panel.holoviz.org/reference/global/Notifications.html

## 基本用法

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnButton name='notify' @click='msg()'/>
</template>
<script lang='py'>
import panel as pn

pn.extension(notifications=True)

def msg():
    pn.state.notifications.error('This is error.', duration=1000)
    pn.state.notifications.info('This is info.', duration=2000)
    pn.state.notifications.success('This is success.', duration=0)
    pn.state.notifications.warning('This is warning.', duration=4000)
</script>
```

## Controls

```python
##controls
import panel as pn
pn.extension(notifications=True)

pn.io.notifications.NotificationArea.demo()
```
