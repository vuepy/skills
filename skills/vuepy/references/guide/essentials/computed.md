# 计算属性 {#computed-properties}

## 基础示例 {#basic-example}

模板中的表达式虽然方便，但也只能用来做简单的操作。如果在模板中写太多逻辑，会让模板变得臃肿，难以维护。比如说，我们有这样一个包含嵌套数组的对象：

<div class="composition-api">

```py
author = reactive({
  'name': 'John Doe',
  'books': [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
```

</div>

我们想根据 `author` 是否已有一些书籍来展示不同的信息：

```vue-html
<p>Has published books:</p>
<span>{{ 'Yes' if author.books.length > 0 else 'No' }}</span>
```

这里的模板看起来有些复杂。我们必须认真看好一会儿才能明白它的计算依赖于 `author.books`。更重要的是，如果在模板中需要不止一次这样的计算，我们可不想将这样的代码在模板里重复好多遍。

因此我们推荐使用**计算属性**来描述依赖响应式状态的复杂逻辑。这是重构后的示例：

<div class="composition-api">

```vue
<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>

<script lang='py'>
from vuepy import reactive, computed

author = reactive({
  'name': 'John Doe',
  'books': [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

def f():
    return 'Yes' if author.books.length > 0 else 'No'
    
# 一个计算属性 ref
publishedBooksMessage = computed(f)

# or

# 一个计算属性 ref
@computed()
def publishedBooksMessage():
    return 'Yes' if author.books.length > 0 else 'No'

</script>

```

<!-- todo 暂不支持
[在演练场中尝试一下](https://play.vuejs.org/#eNp1kE9Lw0AQxb/KI5dtoTainkoaaREUoZ5EEONhm0ybYLO77J9CCfnuzta0vdjbzr6Zeb95XbIwZroPlMySzJW2MR6OfDB5oZrWaOvRwZIsfbOnCUrdmuCpQo+N1S0ET4pCFarUynnI4GttMT9PjLpCAUq2NIN41bXCkyYxiZ9rrX/cDF/xDYiPQLjDDRbVXqqSHZ5DUw2tg3zP8lK6pvxHe2DtvSasDs6TPTAT8F2ofhzh0hTygm5pc+I1Yb1rXE3VMsKsyDm5JcY/9Y5GY8xzHI+wnIpVw4nTI/10R2rra+S4xSPEJzkBvvNNs310ztK/RDlLLjy1Zic9cQVkJn+R7gIwxJGlMXiWnZEq77orhH3Pq2NH9DjvTfpfSBSbmA==)
-->

我们在这里定义了一个计算属性 `publishedBooksMessage`。`computed()` 方法期望接收一个 getter 函数，返回值为一个**计算属性 ref**。和其他一般的 ref 类似，你可以通过 `publishedBooksMessage.value` 访问计算结果。

<!-- todo 暂不支持
计算属性 ref 也会在模板中自动解包，因此在模板表达式中引用时无需添加 `.value`。
-->

Vue 的计算属性会自动追踪响应式依赖。它会检测到 `publishedBooksMessage` 依赖于 `author.books`，所以当 `author.books` 改变时，任何依赖于 `publishedBooksMessage` 的绑定都会同时更新。

<!-- todo 暂不支持
也可参考：[为计算属性标注类型](/guide/typescript/composition-api#typing-computed) <sup class="vt-badge ts" />
-->

</div>

## 最佳实践 {#best-practices}

### Getter 不应有副作用 {#getters-should-be-side-effect-free}

计算属性的 getter 应只做计算而没有任何其他的副作用，这一点非常重要，请务必牢记。举例来说，**不要改变其他状态、在 getter 中做异步请求或者更改 DOM**！一个计算属性的声明中描述的是如何根据其他值派生一个值。因此 getter 的职责应该仅为计算和返回该值。在之后的指引中我们会讨论如何使用[侦听器](./watchers)根据其他响应式状态的变更来创建副作用。

### 避免直接修改计算属性值 {#avoid-mutating-computed-value}

从计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照。更改快照是没有意义的，因此计算属性的返回值应该被视为只读的，并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算。
