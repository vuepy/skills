# 内置的特殊 Attributes {#built-in-special-attributes}

## ref {#ref}

用于注册[模板引用](/guide/essentials/template-refs)。

- **预期**：`string | Function`

- **详细信息**

  使用组合式 API，引用将存储在与名字匹配的 ref 里：

  ```vue
  <template>
    <p ref="p.value">hello</p>
  </template>
  <script lang='py'>
  from vuepy import ref

  p = ref(None)
  </script>
  ```

  如果用于普通 DOM 元素(暂不支持)，引用将是元素本身；如果用于子组件，引用将是子组件的实例。

<!-- todo 暂不支持
  或者 `ref` 可以接收一个函数值，用于对存储引用位置的完全控制：

  ```vue-html
  <ChildComponent :ref="(el) => child = el" />
  ```
-->

  关于 ref 注册时机的重要说明：因为 ref 本身是作为渲染函数的结果来创建的，必须等待组件挂载后才能对它进行访问。

- **参考**
  - [指南 - 模板引用](/guide/essentials/template-refs)
  <!-- todo 暂不支持
  - [指南 - 为模板引用标注类型](/guide/typescript/composition-api#typing-template-refs) <sup class="vt-badge ts" />
  - [指南 - 为组件模板引用标注类型](/guide/typescript/composition-api#typing-component-template-refs) <sup class="vt-badge ts" />
  -->
