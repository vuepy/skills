---
outline: deep
titleTemplate: :title | IPywUI
---

# Image 图片

图片容器，用于显示图片

## 基础用法

读取图片并显示。可以通过 `100px`, `50%` 等形式设置图片的宽、高。也可以通过 `style` 的 `border` 设置边框。

```vue
<!-- basic.vue -->
<template>
  <Image v-model="img.value" format="png" style="width: 200px"></Image>

  <Image
      v-model="img.value" format="png"
      style="width: 200px; border: 2px solid deepskyblue"
  ></Image>

  <Image
      v-model="img.value" format="png"
      :style="'width: 200px; border: 2px solid {}'.format('blue')"
  ></Image>
</template>

<script setup>
import Image from "../../../src/ipywui/components/Image";
</script>
<script lang="py">
from vuepy import ref

file = open("jupyter_logo.png", "rb")
img = ref(file.read())
</script>
```

## 显示 PIL 图片

组件内部会自动将 `PIL` 图片通过 `convert_pil_image_to_bin` 转换为二进制。

```vue
<!-- pil_img.vue -->
<template>
  <Image :value="pil_img" style="width: 200px"></Image>
</template>

<script setup>
import Image from "../../../src/ipywui/components/Image";
</script>
<script lang="py">
from vuepy import ref
from PIL import Image

pil_img = Image.open("jupyter_logo.png")
</script>
```

## 显示 OpenCV 图片 / numpy ndarray

可以将 opencv 图片 / ndarray 装换为 PIL 图片后再显示。

```vue
<!-- numpy_ndarray.vue -->
<template>
  <Image :value="rgb_png" width="30%"></Image>
  <Image :value="gray_png" width="100px"></Image>
  <Image :value="img_png" width="100px"></Image>
</template>

<script src="./numpy_ndarray.py"></script>
<script>
import Image from "../../../src/ipywui/components/Image";
</script>
```

```python
# ./numpy_ndarray.py

import numpy as np
from PIL import Image

from vuepy.utils.image_processer import convert_opencv_image_to_bin
from vuepy.utils.image_processer import convert_pil_image_to_bin

def setup(props, ctx, vm):
    img_array = np.zeros([100, 100, 3], dtype=np.uint8)
    img_array[:, :, 2] = 200
    # ndarray to rgb img
    rgb_png = Image.fromarray(img_array, mode='RGB')
    # 必须指定format
    rgb_png.format = 'PNG'

    img_array = np.zeros([100, 100, 1], dtype=np.uint8)
    img_array += 122
    # ndarray to gray img
    img = Image.fromarray(img_array.squeeze(), 'L')
    gray_png = convert_pil_image_to_bin(img, 'PNG')

    import cv2 as cv
    cv_img = cv.imread("jupyter_logo.png", cv.IMREAD_UNCHANGED)

    # method1: opencv to pil
    img_png = Image.fromarray(cv.cvtColor(cv_img, cv.COLOR_BGRA2RGBA))
    img_png.format = "PNG"

    # # method2: opencv to bin
    # img_png = convert_opencv_image_to_bin(cv_img, '.png')

    return locals()
```

## API

### 属性

| 属性名        | 说明                 | 类型                                                           | 默认值 |
| --------     | ------------------- | ---------------------------------------------------------------| ------- |
| v-model/value | 绑定值，图片二进制数据 | ^[bytes]                                                         | —       |
| format | 图片格式 | ^[str]                                                         | png      |
| width | 图片的宽 | ^[str]                                                         | -      |
| height | 图片的高 | ^[str]                                                         | -      |
| style    | 自定义css样式             | ^[str]                                                         | -       |

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

### 方法

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
