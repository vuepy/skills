# 组合式 API：生命周期钩子 {#composition-api-lifecycle-hooks}

:::info 使用方式注意
所有罗列在本页的 API 都应该在组件的 `setup()` 阶段被同步调用。相关细节请看[指南 - 生命周期钩子](/guide/essentials/lifecycle)。
:::

## onMounted() {#onmounted}

注册一个回调函数，在组件挂载完成后执行。

- **类型**

  ```py
  def onMounted(callback: Callback[[], None]) -> None:
  ```

- **详细信息**

  组件在以下情况下被视为已挂载：

  - 其所有同步子组件都已经被挂载<!-- todo 暂不支持 (不包含异步组件或 `<Suspense>` 树内的组件)  -->。

  - 其自身的 Widget 树已经创建完成并插入了父容器中。注意仅当根容器在文档中时，才可以保证组件 Widget 树也在文档中。

  这个钩子通常用于执行需要访问组件所渲染的 Widget 树相关的副作用<!-- todo 暂不支持 ，或是在[服务端渲染应用](/guide/scaling-up/ssr)中用于确保 DOM 相关代码仅在客户端执行  -->。

<!-- todo 暂不支持
  **这个钩子在服务器端渲染期间不会被调用。**
-->

- **示例**

  通过模板引用访问一个元素：

  ```vue
  <template>
    <div ref="el"></div>
  </template>
  
  <script lang='py'>
  from vuepy import ref, onMounted

  const el = ref(None)

  @onMounted
  def handle():
      el.value  # <div>
  
  </script>
  ```

## onBeforeMount() {#onbeforemount}

注册一个钩子，在组件被挂载之前被调用。

- **类型**

  ```py
  def onBeforeMount(callback: Callback[[], None]) -> None:
  ```

- **详细信息**

  当这个钩子被调用时，组件已经完成了其响应式状态的设置，但还没有创建 DOM 节点。它即将首次执行 Widget 渲染过程。

<!-- todo 暂不支持
  **这个钩子在服务器端渲染期间不会被调用。**
-->
