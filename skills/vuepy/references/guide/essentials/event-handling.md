# 事件处理 {#event-handling}

## 监听事件 {#listening-to-events}

我们可以使用 `v-on` 指令 (简写为 `@`) 来监听 DOM 事件，并在事件触发时执行对应的 JavaScript。用法：`v-on:click="handler"` 或 `@click="handler"`。

事件处理器 (handler) 的值可以是：

[//]: # (1. **内联事件处理器**：事件被触发时执行的内联 JavaScript 语句 &#40;与 `onclick` 类似&#41;。)

1. **方法事件处理器**：一个指向组件上定义的方法的属性名或是路径。

<!-- todo 暂不支持
## 内联事件处理器 {#inline-handlers}

内联事件处理器通常用于简单场景，例如：

<div class="composition-api">

```js
count = ref(0)
```

</div>

```vue-html
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```

<div class="composition-api">

[在演练场中尝试一下](https://play.vuejs.org/#eNo9jssKgzAURH/lko0tgrbbEqX+Q5fZaLxiqHmQ3LgJ+fdqFZcD58xMYp1z1RqRvRgP0itHEJCia4VR2llPkMDjBBkmbzUUG1oII4y0JhBIGw2hh2Znbo+7MLw+WjZ/C4TaLT3hnogPkcgaeMtFyW8j2GmXpWBtN47w5PWBHLhrPzPCKfWDXRHmPsCAaOBfgSOkdH3IGUhpDBWv9/e8vsZZ/gFFhFJN)

</div>
-->

## 方法事件处理器 {#method-handlers}

`v-on` 可以接受一个方法名或对某个方法的调用。

举例来说：

<div class="composition-api">

```py
name = ref('Vue.py')

def greet(owner):
  print(f"Hello {name.value}!")
  # `owner` 是事件所在的 widget 对象
  print(owner)  # Button(button_style='info', ...)
```

</div>

```vue-html
<!-- `greet` 是上面定义过的方法名, 只指定方法名时会自动传入当前 widget 对象-->
<Button @click="greet" label="Greet"></Button>
```

<!-- todo 暂不支持
<div class="composition-api">

[在演练场中尝试一下](https://play.vuejs.org/#eNpVj0FLxDAQhf/KMwjtXtq7dBcFQS/qzVMOrWFao2kSkkkvpf/dJIuCEBgm771vZnbx4H23JRJ3YogqaM+IxMlfpNWrd4GxI9CMA3NwK5psbaSVVjkbGXZaCediaJv3RN1XbE5FnZNVrJ3FEoi4pY0sn7BLC0yGArfjMxnjcLsXQrdNJtFxM+Ys0PcYa2CEjuBPylNYb4THtxdUobj0jH/YX3D963gKC5WyvGZ+xR7S5jf01yPzeblhWr2ZmErHw0dizivfK6PV91mKursUl6dSh/4qZ+vQ/+XE8QODonDi)

</div>
-->

<!-- todo 暂不支持
方法事件处理器会自动接收原生 DOM 事件并触发执行。在上面的例子中，我们能够通过被触发事件的 `event.target.tagName` 访问到该 DOM 元素。

<div class="composition-api">

你也可以看看[为事件处理器标注类型](/guide/typescript/composition-api#typing-event-handlers)这一章了解更多。<sup class="vt-badge ts" />

</div>
-->

<!-- todo 暂不支持
### 方法与内联事件判断 {#method-vs-inline-detection}

模板编译器会通过检查 `v-on` 的值是否是合法的 JavaScript 标识符或属性访问路径来断定是何种形式的事件处理器。举例来说，`foo`、`foo.bar` 和 `foo['bar']` 会被视为方法事件处理器，而 `foo()` 和 `count++` 会被视为内联事件处理器。
-->

## 在内联处理器中调用方法 {#calling-methods-in-inline-handlers}

除了直接绑定方法名，你还可以在内联事件处理器中调用方法。这允许我们向方法传入自定义参数以代替原生事件：

<div class="composition-api">

```py
def say(message):
  print(message)
```

</div>

```vue-html
<Button @click="say('hello')" label="Say hello"></Button>
<Button @click="say('bye')" label="Say bye"></Button>
```

也支持 `async def` 异步函数：

```vue
<template>
  <Button button_style="info" @click="async_click()">btn1</Button>
  <Button button_style="info" @click="click()">btn2</Button>
</template>

<script lang="py">
import asyncio

async def async_click():
    print('async_click: start')
    await asyncio.sleep(2)
    print('async_click: end')

def click():
    print('sync_click: click')
</script>
```

先点击btn1，马上再点击btn2，打印的结果如下：
```
async_click: start
sync_click: click
async_click: end
```

<!-- todo 暂不支持
<div class="composition-api">

[在演练场中尝试一下](https://play.vuejs.org/#eNp9jTEOwjAMRa8SeSld6I5CBWdg9ZJGBiJSN2ocpKjq3UmpFDGx+Vn//b/ANYTjOxGcQEc7uyAqkqTQI98TW3ETq2jyYaQYzYNatSArZTzNUn/IK7Ludr2IBYTG4I3QRqKHJFJ6LtY7+zojbIXNk7yfmhahv5msvqS7PfnHGjJVp9w/hu7qKKwfEd1NSg==)

</div>
-->
