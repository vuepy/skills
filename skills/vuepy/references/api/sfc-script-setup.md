# \<script lang="py"> {#script-setup}

`<script lang='py'>` 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖。当同时使用 SFC 与组合式 API 时该语法是默认推荐。它具有更多优势：

- 更少的样板内容，更简洁的代码。
- 能够使用纯 Python 声明 props 和自定义事件。
- 更好的运行时性能 (其模板会被编译成同一作用域内的渲染函数，避免了渲染上下文代理对象)。
- 更好的 IDE 类型推导性能 (减少了语言服务器从代码中抽取类型的工作)。

## 基本语法 {#basic-syntax}

要启用该语法，需要在 `<script>` 代码块上添加 `lang='py'` attribute：

```vue
<script lang='py'>
print('hello script setup')
</script>
```

里面的代码会被编译成组件 `setup()` 函数的内容。`<script lang='py'>` 中的代码会在**每次组件实例被创建的时候执行**。

### 顶层的绑定会被暴露给模板 {#top-level-bindings-are-exposed-to-template}

当使用 `<script lang='py'>` 的时候，任何在 `<script lang='py'>` 声明的顶层的绑定 (包括变量，函数声明，以及 import 导入的内容) 都能在模板中直接使用，props, context, app(应用实例对象)等变量会自动传入(在setup函数中作为参数传入)，也会自动暴露给模板，script内可以直接使用：

```vue
<template>
  <Button @click="log()" :label='msg'></Button>
</template>

<script lang='py'>
# 变量
msg = 'Hello!'

# 函数
def log():
  print(msg) # Hello!
  print(props) # {}
  print(context) # {}
  print(app) # <vuepy.runtime.core.api_create_app.App object>
</script>
```

import 导入的内容也会以同样的方式暴露。这意味着我们可以在模板表达式中直接使用导入的 helper 函数。

```vue
<template>
  <div>{{ capitalize('hello') }}</div>
</template>

<script lang='py'>
from helpers import capitalize 
</script>
```

## 响应式 {#reactivity}

响应式状态需要明确使用[响应式 API](/api/reactivity-core) 来创建。<!-- todo 暂不支持 和 `setup()` 函数的返回值一样，ref 在模板中使用的时候会自动解包：-->

```vue
<template>
  <button @click="inc()">{{ count.value }}</button>
</template>

<script lang='py'>
from vuepy import ref

count = ref(0)

def inc():
  count.value += 1

</script>
```

## 使用组件 {#using-components}

`<script setup>` 范围里的值也能被直接作为自定义组件的标签名使用：

```vue
<template>
  <MyComponent></MyComponent>
</template>

<script lang='py'>
from vuepy import import_sfc

MyComponent = import_sfc('./MyComponent.vue')
</script>
```

这里 `MyComponent` 应当被理解为像是在引用一个变量。<!-- todo 暂不支持 如果你使用过 JSX，此处的心智模型是类似的。-->其 kebab-case 格式的 `<my-component>` 同样能在模板中使用——不过，我们强烈建议使用 PascalCase 格式以保持一致性。同时这也有助于区分原生的自定义元素。

## defineProps() 和 defineEmits() {#defineprops-defineemits}

为了在声明 `props` 和 `emits` 选项时获得完整的类型推导支持，我们可以使用 `defineProps` 和 `defineEmits` API。

<!-- todo 暂不支持
```vue
<script lang='py'>
props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
// setup 代码
</script>
```
-->

```vue
<script lang='py'>
from vuepy import defineProps, defineEmits

props = defineProps(['foo'])
emit = defineEmits(['change', 'delete'])
</script>
```

<!-- todo 暂不支持
- `defineProps` 和 `defineEmits` 都是只能在 `<script lang='py'>` 中使用的**编译器宏**。会随着 `<script lang='py'>` 的处理过程一同被编译掉。

- `defineProps` 接收与 `props` 选项相同的值，`defineEmits` 接收与 `emits` 选项相同的值。

- `defineProps` 和 `defineEmits` 在选项传入后，会提供恰当的类型推导。

- 传入到 `defineProps` 和 `defineEmits` 的选项会从 setup 中提升到模块的作用域。因此，传入的选项不能引用在 setup 作用域中声明的局部变量。这样做会引起编译错误。但是，它*可以*引用导入的绑定，因为它们也在模块作用域内。
-->

## defineModel() {#definemodel}

这个宏可以用来声明一个双向绑定 prop，通过父组件的 `v-model` 来使用。[组件 `v-model`](/guide/components/v-model) 指南中也讨论了示例用法。

在底层，这个宏声明了一个 model prop 和一个相应的值更新事件。如果第一个参数是一个字符串字面量，它将被用作 prop 名称；否则，prop 名称将默认为 `"value"`。在这两种情况下，你都可以再传递一个额外的对象，它可以包含 prop 的选项和 model ref 的值转换选项。

```py
# 声明 "modelValue" prop，由父组件通过 v-model 使用
model = defineModel()
# （暂不支持）或者：声明带选项的 "modelValue" prop
model = defineModel({ type: String })

# 在被修改时，触发 "update:modelValue" 事件
model.value = "hello"

# 声明 "count" prop，由父组件通过 v-model:count 使用
count = defineModel("count")
# （暂不支持）或者：声明带选项的 "count" prop
count = defineModel("count", { type: Number, default: 0 })

def inc():
  # 在被修改时，触发 "update:count" 事件
  count.value += 1
```

:::warning
如果为 `defineModel` prop 设置了一个 `default` 值且父组件没有为该 prop 提供任何值，会导致父组件与子组件之间不同步。在下面的示例中，父组件的 `myRef` 是 undefined，而子组件的 `model` 是 1：

```py
# 子组件：
# model = defineModel({ default: 1 })
model = defineModel()
model.value = 1

# 父组件
myRef = ref(None)
```

```html
<Child v-model="myRef"></Child>
```

:::

### 在 TypeScript 中使用 <sup class="vt-badge ts" /> {#usage-with-typescript}

与 `defineProps` 和 `defineEmits` 一样，`defineModel` 也可以接收类型参数来指定 model 值和修饰符的类型：

```ts
const modelValue = defineModel<string>()
//    ^? Ref<string | undefined>

// 用带有选项的默认 model，设置 required 去掉了可能的 undefined 值
const modelValue = defineModel<string>({ required: true })
//    ^? Ref<string>

const [modelValue, modifiers] = defineModel<string, "trim" | "uppercase">()
//                 ^? Record<'trim' | 'uppercase', true | undefined>
```
-->

## <sup class=''/> defineSlots()<sup class="vt-badge ts"/> {#defineslots}

这个宏可以用于为 IDE 提供插槽名称和 props 类型检查的类型提示。

`defineSlots()` 只接受类型参数，没有运行时参数。类型参数应该是一个类型字面量，其中属性键是插槽名称，值类型是插槽函数。函数的第一个参数是插槽期望接收的 props，其类型将用于模板中的插槽 props。返回类型目前被忽略，可以是 `any`，但我们将来可能会利用它来检查插槽内容。

它还返回 `slots` 对象，该对象等同于在 setup 上下文中暴露或由 `useSlots()` 返回的 `slots` 对象。

```vue
<script setup lang="ts">
const slots = defineSlots<{
  default(props: { msg: string }): any
}>()
</script>
```

- 仅支持 Vue 3.3+。
-->

## <sup class=''/> 与普通的 `<script>` 一起使用 {#usage-alongside-normal-script}

`<script setup>` 可以和普通的 `<script>` 一起使用。普通的 `<script>` 在有这些需要的情况下或许会被使用到：

- 声明无法在 `<script setup>` 中声明的选项，例如 `inheritAttrs` 或插件的自定义选项 (在 3.3+ 中可以通过 [`defineOptions`](/api/sfc-script-setup#defineoptions) 替代)。
- 声明模块的具名导出 (named exports)。
- 运行只需要在模块作用域执行一次的副作用，或是创建单例对象。

```vue
<script>
// 普通 <script>, 在模块作用域下执行 (仅一次)
runSideEffectOnce()

// 声明额外的选项
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup>
// 在 setup() 作用域中执行 (对每个实例皆如此)
</script>
```

在同一组件中将 `<script setup>` 与 `<script>` 结合使用的支持仅限于上述情况。具体来说：

- **不要**为已经可以用 `<script setup>` 定义的选项使用单独的 `<script>` 部分，如 `props` 和 `emits`。
- 在 `<script setup>` 中创建的变量不会作为属性添加到组件实例中，这使得它们无法从选项式 API 中访问。我们强烈反对以这种方式混合 API。

如果你发现自己处于以上任一不被支持的场景中，那么你应该考虑切换到一个显式的 [`setup()`](/api/composition-api-setup) 函数，而不是使用 `<script setup>`。

## <sup class=''/> 顶层 `await` {#top-level-await}

`<script setup>` 中可以使用顶层 `await`。结果代码会被编译成 `async setup()`：

```vue
<script setup>
const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```

另外，await 的表达式会自动编译成在 `await` 之后保留当前组件实例上下文的格式。

:::warning 注意
`async setup()` 必须与 [`Suspense` 内置组件](/guide/built-ins/suspense.html)组合使用，`Suspense` 目前还是处于实验阶段的特性，会在将来的版本中稳定。
:::

## <sup class=''/> 泛型 <sup class="vt-badge ts" /> {#generics}

可以使用 `<script>` 标签上的 `generic` 属性声明泛型类型参数：

```vue
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()
</script>
```

`generic` 的值与 TypeScript 中位于 `<...>` 之间的参数列表完全相同。例如，您可以使用多个参数，`extends` 约束，默认类型和引用导入的类型：

```vue
<script
  setup
  lang="ts"
  generic="T extends string | number, U extends Item"
>
import type { Item } from './types'
defineProps<{
  id: T
  list: U[]
}>()
</script>
```

-->

## 限制 {#restrictions}

- 由于模块执行语义的差异，`<script lang='py'>` 中的代码依赖单文件组件的上下文。当将其移动到外部的 `.py` 文件中的时候，对于开发者和工具来说都会感到混乱。因此，**`<script lang='py'>`** 不能和 `src` attribute 一起使用。
- `<script lang='py'>` 不支持 DOM 内根组件模板。<!-- todo 暂不支持 ([相关讨论](https://github.com/vuejs/core/issues/8391)) -->
