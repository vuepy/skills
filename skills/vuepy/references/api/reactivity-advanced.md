# 响应式 API：进阶 {#reactivity-api-advanced}

## shallowRef() {#shallowref}

[`ref()`](./reactivity-core#ref) 的浅层作用形式。

- **类型**

  ```py
  def shallowRef(value: Any, debug_msg='') -> ShallowRef:

  class ShallowRef(RefImpl):
    value: Any
  ```
<!--
  ```ts
  function shallowRef<T>(value: T): ShallowRef<T>

  interface ShallowRef<T> {
    value: T
  }
  ```
-->

- **详细信息**

  和 `ref()` 不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 `.value` 的访问是响应式的。

  `shallowRef()` 常常用于对大型数据结构的性能优化或是与外部的状态管理系统集成。

- **示例**

  ```py
  state = shallowRef({ 'count': 1 })

  # 不会触发更改
  state.value.count = 2

  # 会触发更改
  state.value = { 'count': 2 }
  ```

- **参考**
  - [指南 - 减少大型不可变结构的响应性开销](/guide/best-practices/performance#reduce-reactivity-overhead-for-large-immutable-structures)
  - [指南 - 与其他状态系统集成](/guide/extras/reactivity-in-depth#integration-with-external-state-systems)

## triggerRef() {#triggerref}

强制触发依赖于一个[浅层 ref](#shallowref) 的副作用，这通常在对浅引用的内部值进行深度变更后使用。

- **类型**

  ```py
  def triggerRef(ref: ShallowRef):
  ```

- **示例**

  ```py
  shallow = shallowRef({
    'greet': 'Hello, world'
  })

  # 触发该副作用第一次应该会打印 "Hello, world"
  @watchEffect
  def handle(on_cleanup):
      print(shallow.value['greet'])

  # 这次变更不应触发副作用，因为这个 ref 是浅层的
  shallow.value['greet'] = 'Hello, universe'

  # 打印 "Hello, universe"
  triggerRef(shallow)
  ```

## toRaw() {#toraw}

根据一个 Vue 创建的代理返回其原始对象。

- **类型**

  ```py
  def toRaw(proxy) -> T:
  ```

- **详细信息**

  `toRaw()` 可以返回由 [`reactive()`](./reactivity-core#reactive)、[`readonly()`](./reactivity-core#readonly)、[`shallowReactive()`](#shallowreactive) 或者 [`shallowReadonly()`](#shallowreadonly) 创建的代理对应的原始对象。

  这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。不建议保存对原始对象的持久引用，请谨慎使用。

- **示例**

  ```py
  foo = {}
  reactiveFoo = reactive(foo)

  print(toRaw(reactiveFoo) is foo) # true
  ```

## effectScope() {#effectscope}

创建一个 effect 作用域，可以捕获其中所创建的响应式副作用 (即计算属性和侦听器)，这样捕获到的副作用可以一起处理。
<!-- todo 暂不支持
对于该 API 的使用细节，请查阅对应的 [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md)。
-->

- **类型**

  ```py
  def effectScope(detached: bool = False) -> EffectScope:

  class EffectScope:
    # run<T>(fn: () => T): T | undefined // 如果作用域不活跃就为 undefined
    def run(self, fn: Callable[[], Any]) -> Any: 
    def stop() -> None:
  ```

- **示例**

  <!-- todo add test case -->
  ```py
  scope = effectScope()

  def fn():
      @computed
      def doubled():
          return counter.value * 2
  
      @watch(doubled)
      def handle(*args):
          print(doubled.value)
  
      @watchEffect
      def handle(*args):
          print('Count: ', doubled.value)
  
  scope.run(fn)

  # 处理掉当前作用域内的所有 effect
  scope.stop()
  ```

## getCurrentScope() {#getcurrentscope}

如果有的话，返回当前活跃的 [effect 作用域](#effectscope)。

- **类型**

  ```py
  def getCurrentScope() -> EffectScope | None:
  ```

## onScopeDispose() {#onscopedispose}

在当前活跃的 [effect 作用域](#effectscope)上注册一个处理回调函数。当相关的 effect 作用域停止时会调用这个回调函数。

这个方法可以作为可复用的组合式函数中 `onUnmounted` 的替代品，它并不与组件耦合，因为每一个 Vue 组件的 `setup()` 函数也是在一个 effect 作用域中调用的。

- **类型**

  ```py
  def onScopeDispose(fn: Callable[[], None]) -> None:
  ```
