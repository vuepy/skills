# SFC 语法定义 {#sfc-syntax-specification}

## 总览 {#overview}

一个 Vue.py 单文件组件 (SFC)，通常使用 `*.vue` 作为文件扩展名，它是一种使用了类似 HTML 语法的自定义文件格式，用于定义 Vue.py 组件。一个 Vue.py 单文件组件在语法上是兼容 HTML 的。

每一个 `*.vue` 文件都由三种顶层语言块构成：`<template>`、`<script>` 和 `<style>`，以及一些其他的自定义块：

```vue
<template>
  <div class="example">{{ msg.value }}</div>
</template>

<script lang='py'>
from vuepy import ref

msg = ref("Hello World!")
</script>

<style>
.example {
  color: red;
}
</style>

<custom1>
  This could be e.g. documentation for the component.
</custom1>
```

## 相应语言块 {#language-blocks}

### `<template>` {#template}

- 每个 `*.vue` 文件最多可以包含一个顶层 `<template>` 块。

- 语块包裹的内容将会被提取、传递给 `compiler-dom`，预编译为 Python 渲染函数，并附在导出的组件上作为其 `render` 选项。

<!-- todo 暂不支持
### `<script>` {#script}

- 每个 `*.vue` 文件最多可以包含一个 `<script>` 块。(使用 [`<script setup>`](/api/sfc-script-setup) 的情况除外)

- 这个脚本代码块将作为 ES 模块执行。

- **默认导出**应该是 Vue 的组件选项对象，可以是一个对象字面量或是 [defineComponent](/api/general#definecomponent) 函数的返回值。
-->

### `<script lang='py'>` {#script-setup}

- 每个 `*.vue` 文件最多可以包含一个 `<script lang='py'>`。(不包括一般的 `<script>`)

- 这个脚本块将被预处理为组件的 `setup()` 函数，这意味着它将**为每一个组件实例**都执行。`<script lang='py'>` 中的顶层绑定都将自动暴露给模板。要了解更多细节，请看 [`<script lang='py'>` 的专门文档](/api/sfc-script-setup)。

## 自动名称推导 {#automatic-name-inference}

SFC 在以下场景中会根据**文件名**自动推导其组件名：

- 开发警告信息中需要格式化组件名时；
- DevTools 中观察组件时；
- 递归组件自引用时。例如一个名为 `FooBar.vue` 的组件可以在模板中通过 `<FooBar/>` 引用自己。(同名情况下) 这比明确注册/导入的组件优先级低。
-->

## `src` 导入 {#src-imports}

如果你更喜欢将 `*.vue` 组件分散到多个文件中，可以为一个语块使用 `src` 这个 attribute 来导入一个外部文件：

```vue
<!-- 暂不支持 <template src="./template.html"></template>-->
<!-- 暂不支持 <style src="./style.css"></style>-->
<script src="./script.py"></script>
```

请注意 `src` 导入和 Python 模块导入遵循相同的路径解析规则，这意味着：

- 相对路径需要以 `./` 开头
- src文件中需要定义setup函数
<!-- todo 暂不支持
- 你也可以从 npm 依赖中导入资源
-->

<!-- todo 暂不支持
```vue
从所安装的 "todomvc-app-css" npm 包中导入一个文件
<style src="todomvc-app-css/index.css" />
```
-->

## 注释 {#comments}

在每一个语块中你都可以按照相应语言 (HTML、CSS、JavaScript 和 Pug 等等) 的语法书写注释。对于顶层注释，请使用 HTML 的注释语法 `<!-- comment contents here -->`
