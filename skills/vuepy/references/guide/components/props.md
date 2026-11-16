# Props {#props}

> 此章节假设你已经看过了[组件基础](/guide/essentials/component-basics)。若你还不了解组件是什么，请先阅读该章节。

## Props 声明 {#props-declaration}

一个组件需要显式声明它所接受的 props，这样 Vue.py 才能知道外部传入的哪些是 props，哪些是透传 attribute (关于透传 attribute，我们会在[专门的章节](/guide/components/attrs)中讨论)。

<div class="composition-api">

在使用 `<script lang='py'>` 的单文件组件中，props 可以使用 `defineProps()` 来声明：

```vue
<!-- Hello.vue -->
<template>
  <p>hello {{ props.name.value }}</p>
</template>
<script lang='py'>
from vuepy import defineProps

props = defineProps(['name'])
</script>
```

```vue
<!-- App.vue -->
<template>
  <Hello name="world"></Hello>
</template>
```

在`<script src='xxx.py'>`中的使用示例：

```vue
<!-- Hello.vue -->
<template>
  <p>hello {{ props.name.value }}</p>
</template>
<script src='hello.py'></script>
```

```python
# hello.py
from vuepy import defineProps

def setup(props, ctx, app):
    props = defineProps(['name'])
    return locals()
```

```vue
<!-- App.vue -->
<template>
  <Hello name="world"></Hello>
</template>
```

除了使用字符串数组来声明 prop 外，还可以使用对象的形式：

<!-- todo 暂不支持
```js
// 使用 <script lang='py'>
defineProps({
  title: String,
  likes: Number
})
```
-->

注意传递给 `defineProps()` 的参数和提供给 `props` 选项的值是相同的，两种声明方式背后其实使用的都是 prop 选项。

</div>

<!-- todo 暂不支持
对于以对象形式声明的每个属性，key 是 prop 的名称，而值则是该 prop 预期类型的构造函数。比如，如果要求一个 prop 的值是 `number` 类型，则可使用 `Number` 构造函数作为其声明的值。

对象形式的 props 声明不仅可以一定程度上作为组件的文档，而且如果其他开发者在使用你的组件时传递了错误的类型，也会在浏览器控制台中抛出警告。我们将在本章节稍后进一步讨论有关 [prop 校验](#prop-validation)的更多细节。

<div class="composition-api">

如果你正在搭配 TypeScript 使用 `<script setup>`，也可以使用类型标注来声明 props：

```vue
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```

更多关于基于类型的声明的细节请参考[组件 props 类型标注](/guide/typescript/composition-api#typing-component-props)。<sup class="vt-badge ts" />

</div>

-->

## 传递 prop 的细节 {#prop-passing-details}

### Prop 名字格式 {#prop-name-casing}

如果一个 prop 的名字很长，应使用 snake_case 形式，因为它们是合法的 Python 标识符，可以直接在模板的表达式中使用。

<div class="composition-api">

```py
props = defineProps([
  'greeting_message',
])
```

</div>

```vue-html
<span>{{ props.greeting_message.value }}</span>
```

虽然理论上你也可以在向子组件传递 props 时使用 camelCase 形式 (使用 [DOM 内模板](/guide/essentials/component-basics#in-dom-template-parsing-caveats)时例外)，但实际上为了一致性，我们通常会将其写为 snake_case 形式：

```vue-html
<MyComponent greeting_message="hello"></MyComponent>
```

对于组件名我们推荐使用 [PascalCase](/guide/components/registration#component-name-casing)，因为这提高了模板的可读性，能帮助我们区分 Vue.py 组件和原生 HTML 元素。然而对于传递 props 来说，使用 camelCase 并没有太多优势，因此我们推荐更贴近 HTML 的书写风格。

### 静态 vs. 动态 Prop {#static-vs-dynamic-props}

至此，你已经见过了很多像这样的静态值形式的 props：

```vue-html
<BlogPost title="My journey with Vue.py"></BlogPost>
```

相应地，还有使用 `v-bind` 或缩写 `:` 来进行动态绑定的 props：

```vue-html
<!-- 根据一个变量的值动态传入 -->
<BlogPost :title="post.title"></BlogPost>

<!-- 根据一个更复杂表达式的值动态传入 -->
<BlogPost :title="post.title + ' by ' + post.author.name"></BlogPost>
```

### 传递不同的值类型 {#passing-different-value-types}

在上述的两个例子中，我们只传入了字符串值，但实际上**任何**类型的值都可以作为 props 的值被传递。

#### Int {#number}

```vue-html
<!-- 虽然 `42` 是个常量，我们还是需要使用 v-bind -->
<!-- 因为这是一个 Python 表达式而不是一个字符串 -->
<BlogPost :likes="42"></BlogPost>

<!-- 根据一个变量的值动态传入 -->
<BlogPost :likes="post.likes"></BlogPost>
```

#### Boolean {#boolean}

```vue-html
<!-- 仅写上 prop 但不传值，会隐式转换为 `true` -->
<BlogPost is_published></BlogPost>

<!-- 虽然 `false` 是静态的值，我们还是需要使用 v-bind -->
<!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
<BlogPost :is_published="false"></BlogPost>

<!-- 根据一个变量的值动态传入 -->
<BlogPost :is_published="post.isPublished"></BlogPost>
```

#### List {#array}

```vue-html
<!-- 虽然这个数组是个常量，我们还是需要使用 v-bind -->
<!-- 因为这是一个 Python 表达式而不是一个字符串 -->
<BlogPost :comment_ids="[234, 266, 273]"></BlogPost>

<!-- 根据一个变量的值动态传入 -->
<BlogPost :comment_ids="post.commentIds"></BlogPost>
```

#### Dict {#dict}

```vue-html
<!-- 虽然这个字典字面量是个常量，我们还是需要使用 v-bind -->
<!-- 因为这是一个 Python 表达式而不是一个字符串 -->
<BlogPost
  :author="{
    'name': 'Veronica',
    'company': 'Veridian Dynamics'
  }"
></BlogPost>

<!-- 根据一个变量的值动态传入 -->
<BlogPost :author="post.author"></BlogPost>
```

## 单向数据流 {#one-way-data-flow}

所有的 props 都遵循着**单向绑定**原则，props 因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递。这避免了子组件意外修改父组件的状态的情况，不然应用的数据流将很容易变得混乱而难以理解。

另外，每次父组件更新后，所有的子组件中的 props 都会被更新到最新值，这意味着你**不应该**在子组件中去更改一个 prop。若你这么做了，Vue.py 会在日志中向你抛出警告：

<div class="composition-api">

```py
props = defineProps(['foo'])

# ❌ 警告！prop 是只读的！
props.foo.value = 'bar'
```

</div>

导致你想要更改一个 prop 的需求通常来源于以下两种场景：

1. **prop 被用于传入初始值；而子组件想在之后将其作为一个局部数据属性**。在这种情况下，最好是新定义一个局部数据属性，从 props 上获取初始值即可：

   <div class="composition-api">

   ```py
   props = defineProps(['initialCounter'])

   # 计数器只是将 props.initialCounter 作为初始值
   # 像下面这样做就使 prop 和后续更新无关了
   counter = ref(props.initialCounter.value)
   ```

   </div>

2. **需要对传入的 prop 值做进一步的转换**。在这种情况中，最好是基于该 prop 值定义一个计算属性：

   <div class="composition-api">

   ```python
   props = defineProps(['size'])

   # 该 prop 变更时计算属性也会自动更新
   @computed()
   def normalizedSize(): 
       return props.size.strip().lower()
   ```

   </div>

### 更改对象 / 数组类型的 props {#mutating-object-array-props}

当对象或数组作为 props 被传入时，虽然子组件无法更改 props 绑定，但仍然**可以**更改对象或数组内部的值。这是因为 Python 的对象和数组是按引用传递，而对 Vue.py 来说，禁止这样的改动，虽然可能生效，但有很大的性能损耗，比较得不偿失。

这种更改的主要缺陷是它允许了子组件以某种不明显的方式影响父组件的状态，可能会使数据流在将来变得更难以理解。在最佳实践中，你应该尽可能避免这样的更改，除非父子组件在设计上本来就需要紧密耦合。在大多数场景下，子组件应该[抛出一个事件](/guide/components/events)来通知父组件做出改变。
