---
outline: deep
---

# 模板语法 {#template-syntax}

Vue.py 使用一种基于 HTML 的模板语法，使我们能够声明式地将其组件实例的数据绑定到呈现的 DOM 上。所有的 Vue 模板都是语法层面合法的 HTML，可以被符合规范的浏览器和 HTML 解析器解析。

在底层机制中，Vue.py 会将模板编译成高度优化的 Python 代码。结合响应式系统，当应用状态变更时，Vue.py 能够智能地推导出需要重新渲染的组件的最少数量，并应用最少的更新操作。

[//]: # (如果你对虚拟 DOM 的概念比较熟悉，并且偏好直接使用 JavaScript，你也可以结合可选的 JSX 支持[直接手写渲染函数]&#40;/guide/extras/render-function&#41;而不采用模板。但请注意，这将不会享受到和模板同等级别的编译时优化。)

## 文本插值 {#text-interpolation}

最基本的数据绑定形式是文本插值，它使用的是“Mustache”语法 (即双大括号)：

```vue-html
<span>Message: {{ msg }}</span>
```

双大括号标签会被替换为[相应组件实例中](/guide/essentials/reactivity-fundamentals#declaring-reactive-state) `msg` 属性的值。同时每次 `msg` 属性更改时它也会同步更新。

## 原始 HTML {#raw-html}

双大括号会将数据解释为纯文本，而不是 HTML。若想插入 HTML，你需要使用 [`v-html` 指令](/api/built-in-directives#v-html)：

```vue-html
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

<script setup>
  const rawHtml = '<span style="color: red">This should be red.</span>'
</script>

<p class="demo">
  <p>Using text interpolation: {{ rawHtml }}</p>
  <p>Using v-html directive: <span v-html="rawHtml"></span></p>
</p>

这里我们遇到了一个新的概念。这里看到的 `v-html` attribute 被称为一个**指令**。指令由 `v-` 作为前缀，表明它们是一些由 Vue.py 提供的特殊 attribute，你可能已经猜到了，它们将为渲染的 DOM 应用特殊的响应式行为。这里我们做的事情简单来说就是：在当前组件实例上，将此元素的 innerHTML 与 `rawHtml` 属性保持同步。

`span` 的内容将会被替换为 `rawHtml` 属性的值，插值为纯 HTML——数据绑定将会被忽略。注意，你不能使用 `v-html` 来拼接组合模板，因为 Vue.py 不是一个基于字符串的模板引擎。在使用 Vue.py 时，应当使用组件作为 UI 重用和组合的基本单元。

:::warning 安全警告
在网站上动态渲染任意 HTML 是非常危险的，因为这非常容易造成 [XSS 漏洞](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC)。请仅在内容安全可信时再使用 `v-html`，并且**永远不要**使用用户提供的 HTML 内容。
:::

## Attribute 绑定 {#attribute-bindings}

双大括号不能在 HTML attributes 中使用。想要响应式地绑定一个 attribute，应该使用 [`v-bind` 指令](/api/built-in-directives#v-bind)：

```vue-html
<div v-bind:id="dynamicId"></div>
```

`v-bind` 指令指示 Vue 将元素的 `id` attribute 与组件的 `dynamicId` 属性保持一致。

[//]: # (如果绑定的值是 `null` 或者 `undefined`，那么该 attribute 将会从渲染的元素上移除。)

### 简写 {#shorthand}

因为 `v-bind` 非常常用，我们提供了特定的简写语法：

```vue-html
<div :id="dynamicId"></div>
```

开头为 `:` 的 attribute 可能和一般的 HTML attribute 看起来不太一样，但它的确是合法的 attribute 名称字符，并且所有支持 Vue.py 的浏览器都能正确解析它。此外，他们不会出现在最终渲染的 DOM 中。简写语法是可选的，但相信在你了解了它更多的用处后，你应该会更喜欢它。

> 接下来的指引中，我们都将在示例中使用简写语法，因为这是在实际开发中更常见的用法。

### 布尔型 Attribute {#boolean-attributes}

[布尔型 attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes#%E5%B8%83%E5%B0%94%E5%80%BC%E5%B1%9E%E6%80%A7) 依据 true / false 值来决定 attribute 是否应该存在于该元素上。[`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled) 就是最常见的例子之一。

`v-bind` 在这种场景下的行为略有不同：

```vue-html
<button :disabled="isButtonDisabled">Button</button>
```

当 `isButtonDisabled` 为[真值](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)或一个空字符串 (即 `<button disabled="">`) 时，元素会包含这个 `disabled` attribute。而当其为其他[假值](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)时 attribute 将被忽略。
-->

## 使用 Python 表达式 {#using-python-expressions}

至此，我们仅在模板中绑定了一些简单的属性名。但是 Vue.py 实际上在所有的数据绑定中都支持完整的 Python 表达式：

```vue-html
  <pre>
    number({{ number.value }}) + 1 = {{ number.value + 1 }}
    {{ 'YES' if ok.value else 'No'}}
    {{ '-'.join(message.value.split()) }}
  </pre>
  <!-- 注意：原生html tag不支持该语法 -->
  <Input :value="f'list-{did.value}'">
    div
  </Input>
```

这些表达式都会被作为 Python，以当前组件实例为作用域解析执行。

在 Vue.py 模板内，Python 表达式可以被使用在如下场景上：

- 在文本插值中 (双大括号)
- 在任何 Vue 指令 (以 `v-` 开头的特殊 attribute) attribute 的值中

### 仅支持表达式 {#expressions-only}

每个绑定仅支持**单一表达式**，也就是一段能够被求值的 Python 代码。一个简单的判断方法是是否可以合法地写在 `return` 后面。

因此，下面的例子都是**无效**的：

```vue-html
<!-- 这是一个语句，而非表达式 -->
{{ a = 1 }}

<!-- 条件控制也不支持，请使用条件表达式 -->
{{ if ok: return message; } }}
```

### 调用函数 {#calling-functions}

可以在绑定的表达式中使用一个组件暴露的方法：

```vue-html
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
```

:::tip
绑定在表达式中的方法在组件每次更新时都会被重新调用，因此**不**应该产生任何副作用，比如改变数据或触发异步操作。
:::

### 受限的全局访问 {#restricted-globals-access}

模板中的表达式将被沙盒化，仅能够访问到[有限的 `__builtin__` ](https://github.com/vuejs/core/blob/main/packages/shared/src/globalsAllowList.ts#L3)。该列表中会暴露常用的 `__builtin__`，比如 `type` 和 `dict` 等。

没有显式包含在列表中的全局对象将不能在模板内表达式中访问。然而，你也可以自行在 [`app.config.globalProperties`](/api/application#app-config-globalproperties) 上显式地添加它们，供所有的 Vue 表达式使用。

## 指令 Directives {#directives}

指令是带有 `v-` 前缀的特殊 attribute。Vue.py 提供了许多[内置指令](/api/built-in-directives)，包括上面我们所介绍的 `v-bind` 和 `v-html`。

指令 attribute 的期望值为一个 Python 表达式 (除了少数几个例外，即之后要讨论到的 `v-for`、`v-on` 和 `v-slot`)。一个指令的任务是在其表达式的值变化时响应式地更新 DOM。以 [`v-if`](/api/built-in-directives#v-if) 为例：

```vue-html
<p v-if="seen.value">Now you see me</p>
```

这里，`v-if` 指令会基于表达式 `seen` 的值的真假来移除/插入该 `<p>` 元素。

### 参数 Arguments {#arguments}

:::warning
原生 html tag 暂不支持。
:::

某些指令会需要一个“参数”，在指令名后通过一个冒号隔开做标识。例如用 `v-bind` 指令来响应式地更新一个 HTML attribute：

```vue-html
<Input v-bind:value="url"> ... </Input>

<!-- 简写 -->
<Input :value="url"> ... </Input>
```

这里 `href` 就是一个参数，它告诉 `v-bind` 指令将表达式 `url` 的值绑定到元素的 `href` attribute 上。在简写中，参数前的一切 (例如 `v-bind:`) 都会被缩略为一个 `:` 字符。

另一个例子是 `v-on` 指令，它将监听 DOM 事件：

```vue-html
<Button v-on:click="doSomething"> ... </Button>

<!-- 简写 -->
<Button @click="doSomething"> ... </Button>
```

这里的参数是要监听的事件名称：`click`。`v-on` 有一个相应的缩写，即 `@` 字符。我们之后也会讨论关于事件处理的更多细节。
