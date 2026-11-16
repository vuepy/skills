# 内置指令 {#built-in-directives}

## v-html {#v-html}

更新元素的 [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)。

- **期望的绑定值类型：**`string`

- **详细信息**

 `v-html` 的内容直接作为普通 HTML 插入—— Vue.py 模板语法是不会被解析的。如果你发现自己正打算用 `v-html` 来编写模板，不如重新想想怎么使用组件来代替。

 ::: warning 安全说明
 在你的站点上动态渲染任意的 HTML 是非常危险的，因为它很容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。请只对可信内容使用 HTML 插值，**绝不要**将用户提供的内容作为插值
  :::

 在[单文件组件](/guide/scaling-up/sfc)，`scoped` 样式将不会作用于 `v-html` 里的内容，因为 HTML 内容不会被 Vue.py 的模板编译器解析。<!-- todo 暂不支持
如果你想让 `v-html` 的内容也支持 scoped CSS，你可以使用 [CSS modules](./sfc-css-features#css-modules) 或使用一个额外的全局 `<style>` 元素，手动设置类似 BEM 的作用域策略。 -->

- **示例**

  ```vue-html
  <div v-html="html"></div>
  ```

- **参考**[模板语法 - 原始 HTML](/guide/essentials/template-syntax#raw-html)

## v-show {#v-show}

基于表达式值的真假性，来改变元素的可见性。

- **期望的绑定值类型：**`any`

- **详细信息**

[//]: # (  `v-show` 通过设置内联样式的 `display` CSS 属性来工作，当元素可见时将使用初始 `display` 值。当条件改变时，也会触发过渡效果。)

  `v-show` 通过设置组件的 `children` 属性来工作，当组件可见时将组件添加到 `children` 属性，不可见时从 `children` 属性中移除，在这个过程中组件始终存在，元素及其所包含的指令/组件**不会销毁和重构**。

- **参考**[条件渲染 - v-show](/guide/essentials/conditional#v-show)

## v-if {#v-if}

基于表达式值的真假性，来条件性地渲染元素或者模板片段。

- **期望的绑定值类型：**`any`

- **详细信息**

  当 `v-if` 元素被触发，元素及其所包含的指令/组件都会销毁和重构。如果初始条件是假，那么其内部的内容根本都不会被渲染。

  可用于 `<template>` 表示仅包含文本或多个元素的条件块。

<!-- todo 暂不支持
  当条件改变时会触发过渡效果。
-->

  当同时使用时，`v-if` 比 `v-for` 优先级更高。我们并不推荐在一元素上同时使用这两个指令 — 查看[列表渲染指南](/guide/essentials/list#v-for-with-v-if)详情。

- **参考**[条件渲染 - v-if](/guide/essentials/conditional#v-if)

## v-else {#v-else}

表示 `v-if` 或 `v-if` / `v-else-if` 链式调用的“else 块”。

- **无需传入表达式**

- **详细信息**

  - 限定：上一个兄弟元素必须有 `v-if` 或 `v-else-if`。

  - 可用于 `<template>` 表示仅包含文本或多个元素的条件块。

- **示例**

  ```vue-html
  <div v-if="0.1 > 0.5">
    Now you see me
  </div>
  <div v-else>
    Now you don't
  </div>
  ```

- **参考**[条件渲染 - v-else](/guide/essentials/conditional#v-else)

## v-else-if {#v-else-if}

表示 `v-if` 的“else if 块”。可以进行链式调用。

- **期望的绑定值类型：**`any`

- **详细信息**

  - 限定：上一个兄弟元素必须有 `v-if` 或 `v-else-if`。

  - 可用于 `<template>` 表示仅包含文本或多个元素的条件块。

- **示例**

  ```vue-html
  <div v-if="a == 'A'">
    A
  </div>
  <div v-else-if="a == 'B'">
    B
  </div>
  <div v-else-if="a == 'C'">
    C
  </div>
  <div v-else>
    Not A/B/C
  </div>
  ```

- **参考**[条件渲染 - v-else-if](/guide/essentials/conditional#v-else-if)

## v-for {#v-for}

基于原始数据多次渲染元素或模板块。

- **期望的绑定值类型：**`List | Dict | str | Iterable`

- **详细信息**

  指令值必须使用语法 `alias in expression` 为正在迭代的元素提供一个别名：

  ```vue-html
  <div v-for="item in items">
    {{ item.text }}
  </div>
  ```

  或者，你也可以为索引指定别名 <!-- todo 暂不支持 (如果用在对象，则是键值)   -->：

  ```vue-html
  <div v-for="(index, item) in items"></div>
  ```

<!-- todo 暂不支持
  ```vue-html
  <div v-for="(index, item) in items"></div>
  <div v-for="(value, key) in object"></div>
  <div v-for="(value, name, index) in object"></div>
  ```
-->

<!-- todo 暂不支持
  `v-for` 的默认方式是尝试就地更新元素而不移动它们。要强制其重新排序元素，你需要用特殊 attribute `key` 来提供一个排序提示：

  ```vue-html
  <div v-for="item in items" :key="item.id">
    {{ item.text }}
  </div>
  ```

  `v-for` 也可以用于 [Iterable Protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) 的实现，包括原生 `Map` 和 `Set`。
-->

- **参考**
  - [列表渲染](/guide/essentials/list)

## v-on {#v-on}

给元素绑定事件监听器。

- **缩写：**`@`

- **期望的绑定值类型：**`Function | Inline Statement | Object (不带参数)`

- **参数：**`*args, **kwargs` (和emit提交的payload一致)

<!-- todo 暂不支持
- **修饰符**

  - `.stop` - 调用 `event.stopPropagation()`。
  - `.prevent` - 调用 `event.preventDefault()`。
  - `.capture` - 在捕获模式添加事件监听器。
  - `.self` - 只有事件从元素本身发出才触发处理函数。
  - `.{keyAlias}` - 只在某些按键下触发处理函数。
  - `.once` - 最多触发一次处理函数。
  - `.left` - 只在鼠标左键事件触发处理函数。
  - `.right` - 只在鼠标右键事件触发处理函数。
  - `.middle` - 只在鼠标中键事件触发处理函数。
  - `.passive` - 通过 `{ passive: true }` 附加一个 DOM 事件。
-->

- **详细信息**

  事件类型由参数来指定。表达式可以是一个函数名，一个方法名<!-- todo 暂不支持 ，一个内联声明，如果有修饰符则可省略  -->。
- 
  当用于自定义元素组件（如ipywui的Button），则监听子组件触发的**自定义事件**。

  (**暂不支持**）当用于原生 html 元素（如span），只监听[**原生 DOM 事件**](https://developer.mozilla.org/en-US/docs/Web/Events)。 当监听原生 DOM 事件时，方法接收原生事件作为唯一参数。<!-- todo 暂不支持 如果使用内联声明，声明可以访问一个特殊的 `$event` 变量：`v-on:click="handle('ok', $event)"`。-->

 <!-- todo 暂不支持 `v-on` 还支持绑定不带参数的事件/监听器对的对象。请注意，当使用对象语法时，不支持任何修饰符。  -->

- **示例**

  ```vue-html
  <!-- 方法处理函数 -->
  <Button v-on:click="doThis"></Button>

  <!-- 动态事件(暂不支持）-->
  <Button v-on:[event]="doThis"></Button>

  <!-- 内联声明 -->
  <Button v-on:click="doThat('hello')"></Button>

  <!-- 缩写 -->
  <Button @click="doThis"></Button>

  <!-- 使用缩写的动态事件(暂不支持） -->
  <Button @[event]="doThis"></Button>

  <!-- 停止传播 (暂不支持）-->
  <button @click.stop="doThis"></button>

  <!-- 阻止默认事件 (暂不支持）-->
  <button @click.prevent="doThis"></button>

  <!-- 不带表达式地阻止默认事件 (暂不支持）-->
  <form @submit.prevent></form>

  <!-- 链式调用修饰符 (暂不支持）-->
  <button @click.stop.prevent="doThis"></button>

  <!-- 按键用于 keyAlias 修饰符 (暂不支持）-->
  <input @keyup.enter="onEnter" />

  <!-- 点击事件将最多触发一次 (暂不支持）-->
  <button v-on:click.once="doThis"></button>

  <!-- 对象语法 (暂不支持）-->
  <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
  ```

  监听子组件的自定义事件 (当子组件的“my-event”事件被触发，处理函数将被调用)：

  ```vue-html
  <MyComponent @my_event="handleThis"></MyComponent>

  <!-- 内联声明 -->
  <MyComponent @my_event="handleThis(123)"></MyComponent>
  ```

- **参考**
  - [事件处理](/guide/essentials/event-handling)
  - [组件 - 自定义事件](/guide/essentials/component-basics#listening-to-events)

## v-bind {#v-bind}

动态的绑定一个或多个 attribute，也可以是组件的 prop。

- **缩写：**
  - `:` 或者 `.` (当使用 `.prop` 修饰符)
  <!-- todo 暂不支持
  - 值可以省略 (当 attribute 和绑定的值同名时) <sup class="vt-badge">3.4+</sup>
  -->

- **期望：**`any (带参数) | Object (不带参数)`

- **参数：**`attrOrProp (可选的)`

<!-- todo 暂不支持
- **修饰符**

  - `.camel` - 将短横线命名的 attribute 转变为驼峰式命名。
  - `.prop` - 强制绑定为 DOM property。<sup class="vt-badge">3.2+</sup>
  - `.attr` - 强制绑定为 DOM attribute。<sup class="vt-badge">3.2+</sup>
-->

- **用途**

  当用于绑定 `class` 或 `style` attribute，`v-bind` 支持额外的值类型如数组或对象。详见下方的指南链接。

  <!-- todo 暂不支持
  在处理绑定时，Vue.py 默认会利用 `in` 操作符来检查该元素上是否定义了和绑定的 key 同名的 DOM property。如果存在同名的 property，则 Vue.py 会将它作为 DOM property 赋值，而不是作为 attribute 设置。这个行为在大多数情况都符合期望的绑定值类型，但是你也可以显式用 `.prop` 和 `.attr` 修饰符来强制绑定方式。有时这是必要的，特别是在和[自定义元素](/guide/extras/web-components#passing-dom-properties)打交道时。
  -->
  
  当用于组件 props 绑定时，所绑定的 props 必须在子组件中已被正确声明。

  <!-- todo 暂不支持
  当不带参数使用时，可以用于绑定一个包含了多个 attribute 名称-绑定值对的对象。
  -->

- **示例**

  ```vue-html
  <!-- 绑定 attribute -->
  <img v-bind:src="imageSrc" />

  <!-- 动态 attribute 名 (暂不支持）-->
  <button v-bind:[key]="value"></button>

  <!-- 缩写 -->
  <img :src="imageSrc" />

  <!-- 缩写形式的动态 attribute 名，扩展为 :src="src" (暂不支持）-->
  <img :src />

  <!-- 动态 attribute 名的缩写 (暂不支持）-->
  <button :[key]="value"></button>

  <!-- 内联字符串拼接 -->
  <img :src="'/path/to/images/' + fileName" />

  <!-- class 绑定 (暂不支持）-->
  <div :class="{ red: isRed }"></div>
  <div :class="[classA, classB]"></div>
  <div :class="[classA, { classB: isB, classC: isC }]"></div>

  <!-- style 绑定 (暂不支持）-->
  <div :style="{ fontSize: size + 'px' }"></div>
  <div :style="[styleObjectA, styleObjectB]"></div>

  <!-- 绑定对象形式的 attribute (暂不支持）-->
  <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

  <!-- prop 绑定。“prop” 必须在子组件中已声明。 -->
  <MyComponent :prop="someThing" />

  <!-- 传递子父组件共有的 prop (暂不支持）-->
  <MyComponent v-bind="$props" />

  <!-- XLink (暂不支持） -->
  <svg><a :xlink:special="foo"></a></svg>
  ```

<!-- todo 暂不支持
  `.prop` 修饰符也有专门的缩写，`.`：

  ```vue-html
  <div :someProperty.prop="someObject"></div>

  等同于
  <div .someProperty="someObject"></div>
  ```

  当在 DOM 内模板使用 `.camel` 修饰符，可以驼峰化 `v-bind` attribute 的名称，例如 SVG `viewBox` attribute：

  ```vue-html
  <svg :view-box.camel="viewBox"></svg>
  ```

  如果使用字符串模板或使用构建步骤预编译模板，则不需要 `.camel`。 
-->

- **参考**
  - [Class 与 Style 绑定](/guide/essentials/class-and-style)
  - [组件 -  Prop 传递细节](/guide/components/props#prop-passing-details)

## v-model {#v-model}

在表单输入元素或组件上创建双向绑定。

- **期望的绑定值类型**：根据表单输入元素或组件输出的值而变化

- **仅限：**

  - components
  <!-- todo 暂不支持
  - `<input>`
  - `<select>`
  - `<textarea>`
  -->

<!-- todo 暂不支持
- **修饰符**

  - [`.lazy`](/guide/essentials/forms#lazy) - 监听 `change` 事件而不是 `input`
  - [`.number`](/guide/essentials/forms#number) - 将输入的合法字符串转为数字
  - [`.trim`](/guide/essentials/forms#trim) - 移除输入内容两端空格
-->

- **参考**

  - [表单输入绑定](/guide/essentials/forms)
  - [组件事件 - 配合 `v-model` 使用](/guide/components/v-model)

## v-slot {#v-slot}

用于声明具名插槽或是期望接收 props 的作用域插槽。

- **缩写：**`#`

- **期望的绑定值类型**：能够合法在函数参数位置使用的 Python 表达式。<!-- todo 暂不支持 支持解构语法。绑定值是可选的——只有在给作用域插槽传递 props 才需要。-->

- **参数**：插槽名 (可选，默认是 `default`)

- **仅限：**

  - `<template>`
  - [components](/guide/components/slots#scoped-slots) (用于带有 prop 的单个默认插槽)

- **示例**

  ```vue-html
  <!-- 具名插槽 -->
  <BaseLayout>
    <template v-slot:header>
      Header content
    </template>

    <template v-slot:default>
      Default slot content
    </template>

    <template v-slot:footer>
      Footer content
    </template>
  </BaseLayout>

  <!-- 接收 prop 的具名插槽 -->
  <InfiniteScroll>
    <template v-slot:item="slotProps">
      <div class="item">
        {{ slotProps.item.text }}
      </div>
    </template>
  </InfiniteScroll>

  <!-- 接收 prop 的默认插槽，并解构 (暂不支持) -->
  <Mouse v-slot="{ x, y }">
    Mouse position: {{ x }}, {{ y }}
  </Mouse>
  ```

- **参考**
  - [组件 - 插槽](/guide/components/slots)
