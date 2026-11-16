---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# Tqdm 进度指示器

Tqdm指示器包装了著名的[`tqdm`](https://github.com/tqdm/tqdm)进度指示器，并显示某个目标的进度。可以在笔记本或Panel Web应用程序中使用它。

[![Tqdm](https://raw.githubusercontent.com/tqdm/tqdm/master/images/logo.gif)](https://github.com/tqdm/tqdm)

底层实现为`panel.widgets.Tqdm`，参数基本一致，参考文档：https://panel.holoviz.org/reference/indicators/Tqdm.html

## 基本用法

要使用`Tqdm`指示器，只需实例化该对象，然后像使用`tqdm.tqdm`一样使用生成的变量，即可迭代任何可迭代对象：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol>
  <PnTqdm ref="tqdm_ref" />
  <PnButton name="Run Loop" @click="run_loop()" />
 </PnCol>
</template>

<script lang='py'>
import time
import numpy as np
import panel as pn
from vuepy import ref

tqdm_ref = ref(None)

def run_loop():
    tqdm = tqdm_ref.value.unwrap()
    for i in tqdm(range(0, 10), desc="My loop bar", leave=True, colour='#666666'):
        if pn.state._is_pyodide:
            # time.sleep does not work in pyodide
            np.random.random((10**6, 30))  
        else:
            time.sleep(0.2)
</script>
```

大多数[tqdm支持的参数](https://github.com/tqdm/tqdm#parameters)都可以传递给`Tqdm`指示器的call方法。

## 嵌套使用

当嵌套使用`Tqdm`指示器时，使用`margin`参数可以直观地表示嵌套级别。

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnCol>
    <PnTqdm ref="tqdm_outer_ref" />
    <PnTqdm ref="tqdm_inner_ref" :margin="(0, 0, 0, 20)" />
    <PnButton name="Run Nested Loop" @click="run_nested_loop()" />
  </PnCol>
</template>

<script lang='py'>
import time
import numpy as np
import panel as pn
from vuepy import ref

tqdm_outer_ref = ref(None)
tqdm_inner_ref = ref(None)

def run_nested_loop():
    tqdm_outer = tqdm_outer_ref.value.unwrap()
    tqdm_inner = tqdm_inner_ref.value.unwrap()
    for i in tqdm_outer(range(10)):
        for j in tqdm_inner(range(10)):
            if pn.state._is_pyodide:
                # time.sleep does not work in pyodide
                np.random.random((10**6, 30))  
            else:
                time.sleep(0.01)
</script>
```

## Pandas集成

要使用tqdm pandas集成，可以通过调用`tqdm.pandas`并传入所有配置选项来激活它。激活后，`progress_apply`方法在`pandas.DataFrame`上可用：

```vue
<!-- --plugins vpanel --show-code -->
<template>
 <PnCol>
  <PnTqdm ref="tqdm_pandas_ref" :width="500" />
  <PnButton name="Run Pandas Apply" button_type="success" @click="run_df()" />
 </PnCol>
</template>

<script lang='py'>
import numpy as np
import pandas as pd
from vuepy import ref

df = pd.DataFrame(np.random.randint(0, 100, (100000, 6)))
tqdm_pandas_ref = ref(None)

def run_df():
    tqdm_pandas = tqdm_pandas_ref.value.unwrap()
    # Register Pandas. This gives DataFrame.progress_apply method
    tqdm_pandas.pandas(desc="Pandas Progress")
    df.progress_apply(lambda x: x**2)
</script>
```

## API

### 属性

| 属性名          | 说明                           | 类型                                                          | 默认值 |
| -------------- | ----------------------------- | -------------------------------------------------------------| ------- |
| value          | 当前进度值                      | ^[number]                                                    | —       |
| max            | 最大进度值                      | ^[number]                                                    | —       |
| text           | 当前由tqdm输出的文本             | ^[string]                                                    | —       |
| layout         | `progress`指示器和`text_pane`的布局 | ^[object] Column或Row                                    | —       |
| progress       | 显示进度的Progress指示器         | ^[object]                                                    | —       |
| text_pane      | 显示进度`text`的Pane            | ^[object]                                                    | —       |
| write_to_console | 是否也写入控制台，仅在服务器上有效 | ^[boolean]                                                  | —       |
| disabled       | 是否禁用                        | ^[boolean]                                                   | false   |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当值变化时触发的事件   | ^[Callable]`(event: dict) -> None`     |

### Slots

| 插槽名   | 说明               |
| ---     | ---               |

### 方法

| 名称      | 说明                                   | 参数                                               |
| -------- | ------------------------------------- | --------------------------------------------------|
| pandas   | 注册Pandas，提供DataFrame.progress_apply | **kwargs: tqdm.pandas支持的参数                    |

## Controls
