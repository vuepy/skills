# 应用实例 API {#application-api}

## create_app() {#createapp}

创建一个应用实例。

- **类型**

  ```py
  RootComponent = Type[VueComponent] | SFCType | dict
  
  def create_app(
      root_component: RootComponent, 
      use_wui: bool = True,
      backend: str = codegen_backends.ipywidgets.NAME,
      servable: bool = False,
      debug: bool = False,
      **root_props
  ) -> App:
  ```

- **详细信息**

|  参数           | 说明                              | 类型        | 默认值      |
| -------------- | --------------------------------- | ---------- | ----------- |
| root_component | 根组件，可以是组件类型、SFC类型或字典形式的组件选项  | ^[RootComponnet]`Type[VueComponent] \| SFCType \| dict` | — |
| use_wui        | 是否使用ipywui插件                  | ^[bool]    | True     |
| backend        | 代码生成后端，如`ipywidgets`、`panel` | ^[str]`ipywidgets, panel`  | 'ipywidgets' |
| servable       | 是否启用可服务模式                   | ^[bool]    | False    |
| debug          | 是否启用调试模式                     | ^[bool]    | False    |
| root_props   | 传递给根组件的属性，预留参数             | ^[dict]    | {}     |

tips: 当使用`panel-vuepy`组件库时，建议使用`panel`作为`backend`。

- **示例**

  可以直接内联根组件：

  ```py
  from vuepy import create_app

  app = create_app({
    # 根组件选项
    'setup': lambda *args: {},
    'template': '''
      <Button label='click'></Button>
      <p></p>
    '''
  })
  
  # 或 从 VueOptions 创建
  from vuepy import VueOptions
  Comp = Vueoptions(**{
    # 根组件选项
    'setup': lambda *args: {},
    'template': '''
      <Button label='click'></Button>
      <p></p>
    '''
  })
  app = create_app(Comp)
  
  ```

  也可以使用从别处导入的组件：

  ```py
  from vuepy import create_app, import_sfc
  
  App = import_sfc('./App.vue')

  app = create_app(App)
  ```

- **参考**[指南 - 创建一个 Vue 应用实例](/guide/essentials/application)

<!-- todo 暂不支持
## <sup class=''/> createSSRApp() {#createssrapp}

以 [SSR 激活](/guide/scaling-up/ssr#client-hydration)模式创建一个应用实例。用法与 `createApp()` 完全相同。

-->

## app.mount() {#app-mount}

将应用实例挂载在一个容器元素中。

- **类型**

  ```py
  class App:
    def mount(el: ipywidgets.Output = None) -> Document:
  ```

- **详细信息**

  参数可以是一个实际的 Output, 传入为 None 时自动创建一个Output 元素，可以通过 app._container 访问。返回根组件的实例。

<!-- todo 暂不支持
  如果该组件有模板或定义了渲染函数，它将替换容器内所有现存的 DOM 节点。否则在运行时编译器可用的情况下，容器元素的 `innerHTML` 将被用作模板。

  在 SSR 激活模式下，它将激活容器内现有的 DOM 节点。如果出现了[激活不匹配](/guide/scaling-up/ssr#hydration-mismatch)，那么现有的 DOM 节点将会被修改以匹配客户端的实际渲染结果。

  对于每个应用实例，`mount()` 仅能调用一次。
-->

- **示例**

  ```py
  from vuepy import create_app
  
  app = create_app(...)

  app.mount()
  ```

  也可以挂载到一个已有的 Output 上。

  ```py
  import ipywidgets
  
  output = ipywidgets.Output()
  app.mount(output)
  ```

## app.component() {#app-component}

如果同时传递一个组件名字符串及其定义，则注册一个全局组件；如果只传递一个名字，则会返回用该名字注册的组件 (如果存在的话)。

- **类型**

  ```py
  class App:
    def component(name: str) -> Component | undefined:
    def component(name: str, component: VueComponent): -> self
  ```

- **示例**

  ```py
  from vuepy import create_app

  app = create_app({})

  # 注册一个选项对象
  app.component('MyComponent', MyComponent)

  # 得到一个已注册的组件
  MyComponent = app.component('MyComponent')
  ```

- **参考**[组件注册](/guide/components/registration)

## app.use() {#app-use}

安装一个[插件](/guide/reusability/plugins)。

- **类型**

  ```py
  class App:
    def use(self, plugin: Type["VuePlugin"], options: dict = None) -> self:
  ```

- **详细信息**

  第一个参数应是插件本身，可选的第二个参数是要传递给插件的选项。

  插件可以是一个带 `install()` 方法的对象，亦或直接是一个将被用作 `install()` 方法的函数。插件选项 (`app.use()` 的第二个参数) 将会传递给插件的 `install()` 方法。

  若 `app.use()` 对同一个插件多次调用，该插件只会被安装一次。

- **示例**

  ```py
  from vuepy import create_app
  from plugins import MyPlugin

  const app = create_app({
    # /* ... */
  })

  app.use(MyPlugin)
  ```

- **参考**[插件](/guide/reusability/plugins)

## app.version {#app-version}

提供当前应用所使用的 Vue 版本号。这在[插件](/guide/reusability/plugins)中很有用，因为可能需要根据不同的 Vue 版本执行不同的逻辑。

- **类型**

  ```py
  class App:
    version: str
  ```

- **示例**

  在一个插件中对版本作判断：

  ```py
    def install(self, app):
      version = int(app.version.split('.')[0])
      if app.version < 3:
        print('This plugin requires Vue 3')
  ```

- **参考**[全局 API - version](/api/general#version)

## app.config {#app-config}

每个应用实例都会暴露一个 `config` 对象，其中包含了对这个应用的配置设定。你可以在挂载应用前更改这些属性 (下面列举了每个属性的对应文档)。

```py
from vuepy import create_app

app = create_app({})

print(app.config)
```

## app.config.globalProperties {#app-config-globalproperties}

一个用于注册能够被应用内所有组件实例访问到的全局属性的对象。

- **类型**

  ```py
  class AppConfig:
    globalProperties: Record
  ```

- **详细信息**

  与任何全局的东西一样，应该谨慎使用。

  如果全局属性与组件自己的属性冲突，组件自己的属性将具有更高的优先级。

- **用法**

  ```py
  app.config.globalProperties.msg = 'hello'
  ```

  这使得 `msg` 在应用的任意组件模板上都可用<!-- todo 暂不支持
，并且也可以通过任意组件实例的 `this` 访问到  -->：

  ```vue
  <template>
    {{ msg }} world
  </template>
  ```

<!-- todo 暂不支持
- **参考**[指南 - 扩展全局属性](/guide/typescript/options-api#augmenting-global-properties) <sup class="vt-badge ts" />
-->
