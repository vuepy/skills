---
outline: deep
titleTemplate: :title | Panel-Vuepy
---

# NestedSelect 嵌套选择器

嵌套选择组件允许用户从多层级的嵌套选项中进行选择，每个级别的选择会影响下一个级别的可用选项。

底层实现为`panel.widgets.NestedSelect`，参数基本一致，参考文档：https://panel.holoviz.org/reference/widgets/NestedSelect.html

## 基本用法

基本的嵌套选择组件，提供多层级的选项：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnNestedSelect :options="nested_options" 
                  :levels="['模型', '分辨率', '初始化']" 
                  @change="on_change" />
  <p>value: {{ selected.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

nested_options = {
    "GFS": {
        "0.25度": ["00Z", "06Z", "12Z", "18Z"],
        "0.5度": ["00Z", "12Z"],
        "1度": ["00Z", "12Z"],
    },
    "NAME": {
        "12km": ["00Z", "12Z"],
        "3km": ["00Z", "12Z"],
    },
}

selected = ref({})

def on_change(event):
    selected.value = event.new
</script>
```

## 自定义布局

嵌套选择组件支持不同的布局类型：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnNestedSelect :options="nested_options" 
                  :levels="['模型', '分辨率', '初始化']"
                  layout="row" />
</template>
<script lang='py'>
from vuepy import ref

nested_options = {
    "GFS": {
        "0.25度": ["00Z", "06Z", "12Z", "18Z"],
        "0.5度": ["00Z", "12Z"],
        "1度": ["00Z", "12Z"],
    },
    "NAME": {
        "12km": ["00Z", "12Z"],
        "3km": ["00Z", "12Z"],
    },
}
</script>
```

网格布局示例：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnNestedSelect :options="nested_options" 
                  :levels="['模型', '分辨率', '初始化']"
                  :layout='{"type": pn.GridBox, "ncols": 2}' />
</template>
<script lang='py'>
from vuepy import ref
import panel as pn

nested_options = {
    "GFS": {
        "0.25度": ["00Z", "06Z", "12Z", "18Z"],
        "0.5度": ["00Z", "12Z"],
        "1度": ["00Z", "12Z"],
    },
    "NAME": {
        "12km": ["00Z", "12Z"],
        "3km": ["00Z", "12Z"],
    },
}
</script>
```

## 设置默认值

可以通过设置`v-model`/`value`参数来指定默认选中的值：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnNestedSelect :options="nested_options" 
                  :levels="['模型', '分辨率', '初始化']"
                  v-model="default_value.value" />
 <p>value: {{ default_value.value }}</p>
</template>
<script lang='py'>
from vuepy import ref

nested_options = {
    "GFS": {
        "0.25度": ["00Z", "06Z", "12Z", "18Z"],
        "0.5度": ["00Z", "12Z"],
        "1度": ["00Z", "12Z"],
    },
    "NAME": {
        "12km": ["00Z", "12Z"],
        "3km": ["00Z", "12Z"],
    },
}

default_value = ref({"模型": "NAME", "分辨率": "12km", "初始化": "12Z"})
</script>
```

## 动态选项

动态生成选项options：

```vue
<!-- --plugins vpanel --show-code -->
<template>
  <PnNestedSelect :options="list_options"
                  :levels='["time_step", "level_type", "file_type"]' />
</template>
<script lang='py'>
from vuepy import ref
import panel as pn

# @pn.cache() # can help improve user experience and reduce the risk of rate limits.
def list_options(level, value):
    if level == "time_step":
        options = {
            "Daily": list_options, 
            "Monthly": list_options,
        }
    elif level == "level_type":
        options = {
            f"{value['time_step']}_upper": list_options, 
            f"{value['time_step']}_lower": list_options,
        }
    else:
        options = [
            f"{value['level_type']}.json", 
            f"{value['level_type']}.csv",
        ]

    return options
</script>
```

## API

### 属性

| 属性名    | 说明                 | 类型                                                           | 默认值 |
| -------- | ------------------- | ---------------------------------------------------------------| ------- |
| options  | 选择项，可以是嵌套字典，列表，或返回这些类型的可调用对象 | ^[dict\|callable] | — |
| value    | 所有选择组件的值，键是级别名称 | ^[dict] | — |
| layout   | 组件的布局类型，'column'、'row'、'grid'或包含type和其他参数的字典 | ^[str\|dict] | 'column' |
| levels   | 级别名称列表或字典列表 | ^[list] | None |
| disabled | 是否禁用选择器 | ^[bool] | False |
| name     | 组件标题 | ^[str] | "" |

### Events

| 事件名 | 说明                  | 类型                                   |
| ---   | ---                  | ---                                    |
| change | 当选择发生变化时触发的事件 | ^[Callable]`(event: dict) -> None` |

## Controls

```python
##controls
import panel as pn
pn.extension()
select = pn.widgets.NestedSelect(
    options={
        "GFS": {
            "0.25 deg": ["00Z", "06Z", "12Z", "18Z"],
            "0.5 deg": ["00Z", "12Z"],
            "1 deg": ["00Z", "12Z"],
        },
        "NAME": {
            "12 km": ["00Z", "12Z"],
            "3 km": ["00Z", "12Z"],
        },
    },
    levels=["Model", "Resolution", "Initialization"],
)
pn.Row(select.controls(jslink=False), select)
```
