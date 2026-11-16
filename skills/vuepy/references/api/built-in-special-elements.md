# 内置特殊元素 {#built-in-special-elements}

:::info 不是组件
`<component>`、`<slot>` 和 `<template>` 具有类似组件的特性，也是模板语法的一部分。但它们并非真正的组件，同时在模板编译期间会被编译掉。因此，它们通常在模板中用小写字母书写。
:::

## `<slot>` {#slot}

表示模板中的插槽内容出口。

- **Props**

  ```ts
  interface SlotProps {
    /**
     * 任何传递给 <slot> 的 prop 都可以作为作用域插槽
     * 的参数传递
     */
    [key: string]: any
    /**
     * 保留，用于指定插槽名。
     */
    name?: string
  }
  ```

- **详细信息**

  `<slot>` 元素可以使用 `name` attribute 来指定插槽名。当没有指定 `name` 时，将会渲染默认插槽。传递给插槽元素的附加 attributes 将作为插槽 props，传递给父级中定义的作用域插槽。

  元素本身将被其所匹配的插槽内容替换。

  Vue 模板里的 `<slot>` 元素会被编译到 JavaScript，因此不要与[原生 `<slot>` 元素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot)进行混淆。

- **参考**[组件 - 插槽](/guide/components/slots)

## `<template>` {#template}

当我们想要使用内置指令而不在 DOM 中渲染元素时，`<template>` 标签可以作为占位符使用。

- **详细信息**

  对 `<template>` 的特殊处理只有在它与以下任一指令一起使用时才会被触发：

  - `v-if`、`v-else-if` 或 `v-else`
  - `v-for`
  - `v-slot`

  如果这些指令都不存在，那么它将被渲染成一个[原生的 `<template>` 元素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)。

  带有 `v-for` 的 `<template>` 也可以有一个 [`key` 属性](/api/built-in-special-attributes#key)。所有其他的属性和指令都将被丢弃，因为没有相应的元素，它们就没有意义。

  单文件组件使用[顶层的 `<template>` 标签](/api/sfc-spec#language-blocks)来包裹整个模板。这种用法与上面描述的 `<template>` 使用方式是有区别的。该顶层标签不是模板本身的一部分，不支持指令等模板语法。

- **参考**
  - [指南 - `<template>` 上的 `v-if`](/guide/essentials/conditional#v-if-on-template)
  - [指南 - `<template>` 上的 `v-for`](/guide/essentials/list#v-for-on-template)
  - [指南 - 具名插槽](/guide/components/slots#named-slots)
