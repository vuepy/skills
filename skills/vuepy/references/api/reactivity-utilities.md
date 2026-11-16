# 响应式 API：工具函数 {#reactivity-api-utilities}

## isRef() {#isref}

检查某个值是否为 ref。

- **类型**

  ```py
  def isRef(r) -> bool:
  ```
  
<!-- todo 暂不支持
  请注意，返回值是一个[类型判定](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) (type predicate)，这意味着 `isRef` 可以被用作类型守卫：

  ```py
  let foo: unknown
  if (isRef(foo)) {
    // foo 的类型被收窄为了 Ref<unknown>
    foo.value
  }
  ```
-->

## unref() {#unref}

如果参数是 ref，则返回内部值，否则返回参数本身。这是 `ref.value if isRef(ref) else ref` 计算的一个语法糖。

- **类型**

  ```py
  def unref(ref):
  ```

- **示例**

  ```py
  def useFoo(x: int | Ref) {
      unwrapped = unref(x)
      # unwrapped 现在保证为 int 类型
      ...
  ```

## toRef() {#toref}

可以将值、refs 或 getters 规范化为 refs

也可以基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。

- **类型**

  ```py
  # 规范化签名
  def toRef(value) -> Ref:

  # 对象属性签名
  def toRef(object key defaultValue=None) -> Ref:

  ```
<!--
  ```ts
  // 规范化签名 (3.3+)
  function toRef<T>(
    value: T
  ): T extends () => infer R
    ? Readonly<Ref<R>>
    : T extends Ref
    ? T
    : Ref<UnwrapRef<T>>

  // 对象属性签名
  function toRef<T extends object, K extends keyof T>(
    object: T,
    key: K,
    defaultValue?: T[K]
  ): ToRef<T[K]>

  type ToRef<T> = T extends Ref ? T : Ref<T>
  ```
-->

- **示例**

  规范化签名

  ```py
  # 按原样返回现有的 ref
  toRef(existingRef)

  # 创建一个只读的 ref，当访问 .value 时会调用此 getter 函数
  toRef(lambda: props.foo)

  # 从非函数的值中创建普通的 ref
  # 等同于 ref(1)
  toRef(1)
  ```

  对象属性签名：

  <!-- todo add test case -->
  ```py
  state = reactive({
    'foo': 1,
    'bar': 2,
  })

  # 双向 ref，会与源属性同步
  fooRef = toRef(state, 'foo')

  # 更改该 ref 会更新源属性
  fooRef.value += 1
  print(state.foo) # 2

  # 更改源属性也会更新该 ref
  state.foo += 1
  print(fooRef.value) # 3
  ```

  请注意，这不同于：

  ```py
  fooRef = ref(state.foo)
  ```

  上面这个 ref **不会**和 `state.foo` 保持同步，因为这个 `ref()` 接收到的是一个纯数值。

  `toRef()` 这个函数在你想把一个 prop 的 ref 传递给一个组合式函数时会很有用：

  ```vue
  <script lang='py'>
  from vuepy import toRef

  props = defineProps(...)

  # 将 `props.foo` 转换为 ref，然后传入
  # 一个组合式函数
  useSomeFeature(toRef(props, 'foo'))

  # getter 语法
  useSomeFeature(toRef(lambda: props.foo))
  </script>
  ```

  当 `toRef` 与组件 props 结合使用时，关于禁止对 props 做出更改的限制依然有效。尝试将新的值传递给 ref 等效于尝试直接更改 props，这是不允许的。在这种场景下，你可能可以考虑使用带有 `get` 和 `set` 的 [`computed`](./reactivity-core#computed) 替代。详情请见[在组件上使用 `v-model`](/guide/components/v-model) 指南。

  当使用对象属性签名时，即使源属性当前不存在，`toRef()` 也会返回一个可用的 ref。这让它在处理可选 props 的时候格外实用，相比之下 [`toRefs`](#torefs) 就不会为可选 props 创建对应的 refs。

## toValue() {#tovalue}

将值、refs 或 getters 规范化为值。这与 [unref()](#unref) 类似，不同的是此函数也会规范化 getter 函数。如果参数是一个 getter，它将会被调用并且返回它的返回值。

这可以在[组合式函数](/guide/reusability/composables.html)中使用，用来规范化一个可以是值、ref 或 getter 的参数。

- **类型**

  ```py
  def toValue(source):
  ```
  
  <!--
  ```ts
  function toValue<T>(source: T | Ref<T> | (() => T)): T
  ```
  -->

- **示例**

  ```py
  toValue(1)       # --> 1
  toValue(ref(1))  # --> 1
  toValue(() => 1) # --> 1
  ```

  在组合式函数中规范化参数：

  <!-- todo add test case -->
  ```py
  def useFeature(_id):
      @watch(lambda: toValue(id))
      def handle(new_id, _, __):
          # 处理 id 变更
          pass

  # 这个组合式函数支持以下的任意形式：
  useFeature(1)
  useFeature(ref(1))
  useFeature(lambda: 1)
  ```
<!--
  ```ts
  import type { MaybeRefOrGetter } from 'vue'

  function useFeature(id: MaybeRefOrGetter<number>) {
    watch(() => toValue(id), id => {
      // 处理 id 变更
    })
  }

  // 这个组合式函数支持以下的任意形式：
  useFeature(1)
  useFeature(ref(1))
  useFeature(() => 1)
  ```
  -->

## isProxy() {#isproxy}

检查一个对象是否是由 [`reactive()`](./reactivity-core#reactive)、[`readonly()`](./reactivity-core#readonly)、[`shallowReactive()`](./reactivity-advanced#shallowreactive) 或 [`shallowReadonly()`](./reactivity-advanced#shallowreadonly) 创建的代理。

- **类型**

  ```py
  def isProxy(value) -> bool:
  ```

## isReactive() {#isreactive}

检查一个对象是否是由 [`reactive()`](./reactivity-core#reactive) 或 [`shallowReactive()`](./reactivity-advanced#shallowreactive) 创建的代理。

- **类型**

  ```py
  def isReactive(value) -> bool:
  ```
