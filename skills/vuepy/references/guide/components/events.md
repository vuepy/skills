<script setup>
import { onMounted } from 'vue'

if (typeof window !== 'undefined') {
  const hash = window.location.hash

  // The docs for v-model used to be part of this page. Attempt to redirect outdated links.
  if ([
    '#usage-with-v-model',
    '#v-model-arguments',
    '#multiple-v-model-bindings',
    '#handling-v-model-modifiers'
  ].includes(hash)) {
    onMounted(() => {
      window.location = './v-model.html' + hash
    })
  }
}
</script>

# 组件事件 {#component-events}

> 此章节假设你已经看过了[组件基础](/guide/essentials/component-basics)。若你还不了解组件是什么，请先阅读该章节。

## 触发与监听事件 {#emitting-and-listening-to-events}

<!-- todo 暂不支持
在组件的模板表达式中，可以直接使用 `$emit` 方法触发自定义事件 (例如：在 `v-on` 的处理函数中)：

```vue-html
<button @click="$emit('someEvent')">click me</button>
```
-->

父组件可以通过 `v-on` (缩写为 `@`) 来监听事件：

```vue-html
<MyComponent @some_event="callback"></MyComponent>
```

<!-- todo 暂不支持
同样，组件的事件监听器也支持 `.once` 修饰符：

```vue-html
<MyComponent @some-event.once="callback"></MyComponent>
```
-->

注意这里我们触发了一个以 snake_case 形式命名的事件，但在父组件中可以使用 snake_case 形式来监听。与 [prop 大小写格式](/guide/components/props#prop-name-casing)一样，在模板中我们也推荐使用 snake_case 形式来编写监听器。

:::tip
和原生 DOM 事件不一样，组件触发的事件**没有冒泡机制**。你只能监听直接子组件触发的事件。
<!-- todo 暂不支持
平级组件或是跨越多层嵌套的组件间通信，应使用一个外部的事件总线，或是使用一个[全局状态管理方案](/guide/scaling-up/state-management)。
-->
:::

## 事件参数 {#event-arguments}

有时候我们会需要在触发事件时附带一个特定的值。举例来说，我们想要 `<BlogPost>` 组件来管理文本会缩放得多大。在这个场景下，我们可以给 `emits` 提供一个额外的参数：

```vue-html
<Button @click="emits('increase_by', 1)" 
        label="Increase by 1"
></Button>
```

<!-- todo 暂不支持
然后我们在父组件中监听事件，我们可以先简单写一个内联的箭头函数作为监听器，此函数会接收到事件附带的参数：

```vue-html
<MyButton @increase_by="(n) => count += n" />
```
-->

然后我们在父组件中监听事件，可以用一个组件方法来作为事件处理函数：

```vue-html
<MyButton @increase_by="increaseCount"></MyButton>
```

该方法也会接收到事件所传递的参数：

<div class="composition-api">

```py
def increaseCount(n):
  count.value += n
```

</div>

# ==todo==
:::tip
所有传入 `emits()` 的额外参数都会被直接传向监听器。举例来说，`emits('foo', 1, 2, 3)` 触发后，监听器函数将会收到这三个参数值。
:::

## 声明触发的事件 {#declaring-emitted-events}

组件可以显式地通过 <span class="composition-api">[`defineEmits()`](/api/sfc-script-setup#defineprops-defineemits) </span><span class="options-api">[`emits`](/api/options-state#emits) 选项</span>来声明它要触发的事件, `defineEmits()` 会返回一个函数供我们在 `<template>` 和 `<script lang='py'>` 中使用：

<div class="composition-api">

在`<script lang='py'>`中的使用示例：

```vue
<!-- Hello.vue -->
<template>
  <p>hello</p>
  <Button @click="submit">submit</Button>
</template>
<script lang='py'>
from vuepy import defineEmits

emit = defineEmits(['submit'])

def submit(ev):
    print(ev) # Button(description='submit', ...)
    emit('submit', 1, 2, 3)
</script>
```

```vue
<!-- App.vue -->
<template>
  <Hello @submit="on_child_submit"></Hello>
</template>
<script lang='py'>
def on_child_submit(a, b, c):
    print(a, b, c) # 1 2 3
</script>
```

在`<script src='xxx.py'>`中的使用示例：

```vue
<!-- Hello.vue -->
<template>
  <p>hello</p>
  <Button @click="submit">submit</Button>
</template>
<script src='hello.py'></script>
```

```python
# hello.py
from vuepy import defineEmits

def setup(props, ctx, app):
    emit = defineEmits(['submit'])

    def submit(ev):
        print(ev) # Button(description='submit', ...)
        emit('submit', 1, 2, 3)

    return locals()
```

```vue
<!-- App.vue -->
<template>
  <Hello @submit="on_child_submit"></Hello>
</template>
<script lang='py'>
def on_child_submit(a, b, c):
    print(a, b, c) # 1 2 3
</script>
```

`defineEmits()` **不能**在子函数中使用。如上所示，它必须直接放置在 `<script lang='py'>` 的顶级作用域下。

</div>

:::tip
如果一个原生事件的名字 (例如 `click`) 被定义在 `emits` 选项中，则监听器只会监听组件触发的 `click` 事件而不会再响应原生的 `click` 事件。
:::
