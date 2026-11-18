---
outline: deep
titleTemplate: :title | IPywUI
---

# Valid 状态指示器

指示有效状态或无效状态

## 基础用法

```vue
<template>
  <Valid :value="True" description="Valid"></Valid>
  <Valid :value="False" description="Invalid"></Valid>
</template>

<script setup>
import Valid from "../../../src/ipywui/components/Valid";
</script>
```

## API

### Attributes

| Name                       | Description                                    | Type                                | Default |
| -------------------------- | -----------------------------------------------| ----------------------------------- | ------- |
| value    | 是否有效     | ^[boolean]                          | False       |
| label | 标签文本                      | ^[string]                           | ''      |
| style        | 自定义css样式        | ^[str]                                                         | -       |

::: tip

**style 支持的其它css属性**

Sizes相关
* height
* width
* max_height
* max_width
* min_height
* min_width

Display相关
* visibility
* display
* overflow

Box model相关
* border
* margin
* padding

Positioning相关
* top
* left
* bottom
* right

:::
