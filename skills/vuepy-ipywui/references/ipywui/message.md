---
outline: deep
titleTemplate: :title | IPywUI
---

# Message 消息提示

常用于主动操作后的反馈提示。

::: warning
当前页面只能展示组件的样式，具体交互效果需要在 `notebook` 使用。
:::

## 基础用法

从顶部出现，3 秒后自动消失。  
`ipywui` 注册了一个全局的 `message` 方法用于调用。 `Message` 可以接收一个字符串作为参数，它会被显示为正文内容。在最简单的情况下，你可以通过设置 `message` 属性来设置消息内容。 默认情况下，通知在`3000`毫秒后自动关闭，但你可以通过设置 `duration` 属性来自定义消息的展示时间。 如果你将它设置为 `0`，那么通知将不会自动关闭。 需要注意的是 `duration` 接收一个 `int` ，单位为毫秒。

```vue
<!-- basic.vue -->
<template>
  <Button label="Show Message" type="info" @click="show_msg()"></Button>
  <Label value="" style="height: 80px"></Label>
</template>

<script src="./basic_setup.py"></script>
<script setup>
import Button from "../../../src/ipywui/components/Button";
import Label from "../../../src/ipywui/components/Label";
</script>
```

```python
# ./basic_setup.py

def setup(props, ctx, vm):
    def show_msg():
        vm.message.info({
            'message': 'This is message.',
            'duration': 2000,
        })

    return locals()
```

## 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。  
当需要自定义更多属性时，Message 也可以接收一个对象为参数。 

```vue
<!-- different-types.vue -->
<template>
  <Button label="Success" type="info" @click="show_success()"></Button>
  <Button label="Info" type="info" @click="show_info()"></Button>
  <Button label="Warning" type="info" @click="show_warning()"></Button>
  <Button label="Error" type="info" @click="show_error()"></Button>
  <Label value="" style="height: 80px"></Label>
</template>

<script src="./different_types_setup.py"></script>
<script setup>
import Button from "../../../src/ipywui/components/Button";
import Label from "../../../src/ipywui/components/Label";
</script>
```

```python
# ./different_types_setup.py

def setup(props, ctx, vm):
    def show_success():
        vm.message.success({
            'message': 'Congrats, this is a success message.',
        })

    def show_info():
        vm.message.info({
            'message': 'This is message.',
        })

    def show_warning():
        vm.message.warning({
            'message': 'Warning, this is a warning message.',
        })

    def show_error():
        vm.message.error({
            'message': 'Oops, this is a error message.',
        })

    return locals()
```

## 可关闭的消息提示

可以添加关闭按钮。  
默认的 Message 是不可以被人工关闭的。 如果你需要手动关闭功能，你可以把 `show_close` 设置为 `True` 此外，Message 拥有可控的 duration， 默认的关闭时间为 3000 毫秒，当把这个属性的值设置为0便表示该消息不会被自动关闭。

```vue
<!-- closeable.vue -->
<template>
  <Button label="Success" type="info" @click="show_success()"></Button>
  <Button label="Info" type="info" @click="show_info()"></Button>
  <Button label="Warning" type="info" @click="show_warning()"></Button>
  <Button label="Error" type="info" @click="show_error()"></Button>
  <Label value="" style="height: 80px"></Label>
</template>

<script src="./closeable_setup.py"></script>
<script setup>
import Button from "../../../src/ipywui/components/Button";
import Label from "../../../src/ipywui/components/Label";
</script>
```

```python
# ./closeable_setup.py

def setup(props, ctx, vm):
    def show_success():
        msg = vm.message.success({
            'message': 'Congrats, this is a success message.',
            'show_close': True,
        })
        # msg.close()

    def show_info():
        vm.message.info({
            'message': 'This is message.',
            'show_close': True,
        })

    def show_warning():
        vm.message.warning({
            'message': 'Warning, this is a warning message.',
            'show_close': True,
        })

    def show_error():
        vm.message.error({
            'message': 'Oops, this is a error message.',
            'show_close': True,
        })

    return locals()
```

## API

### Message Options

| Name                       | Description                                    | Type                                | Default |
| -------------------------- | -----------------------------------------------| ----------------------------------- | ------- |
| message      | 消息文字 | ^[str]                          | —       |
| type                     | 消息类型 | ^[enum]`'success' \| 'warning' \| 'info' \| 'error'` | - |
| show_close | 是否显示关闭按钮	 | ^[bool]                           | False      |
| duration | 显示时间，单位为毫秒。 设为 0 则不会自动关闭                        | ^[number]               | 3000      |

### Message 方法

调用 Message 会返回当前 Message 的实例。 如果需要手动关闭实例，可以调用它的 close 方法。

| Name             | Description                | Type                    |
| ---------------- | ---------------------------| ----------------------- |
| success          | 发送成功消息                 | ^[Function]`(Message Options) => msg` |
| info             | 发送通知消息                 | ^[Function]`(Message Options) => msg` |
| warning          | 发送警告消息                 | ^[Function]`(Message Options) => msg` |
| error            | 发送错误消息                 | ^[Function]`(Message Options) => void` |
| close            | 关闭当前消息                 | ^[Function]`() => void` |
