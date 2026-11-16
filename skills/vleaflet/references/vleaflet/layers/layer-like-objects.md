---
outline: deep
titleTemplate: :title | VLeaflet
---

# Layer-Like Objects

The ipyleaflet.Map.add() method supports “layer-like” objects; meaning any object with an as_leaflet_layer method. This interface can be especially useful for downstream developers who want their users to more easily be able to add their objects to an ipyleaflet.Map.

Downstream objects should implement an `as_leaflet_layer` method that returns an `ipyleaflet` type capable of being added to the Map.

## 基础用法

```vue
<template>
  <vl-map :center="center" :zoom=2 ref='m'>
    <template #controls>
      <vl-layers-control position='topleft' :collapsed='False'/>
    </template>
  </vl-map>
</template>
<script lang='py'>
import numpy as np
from vuepy import ref, onMounted

class MyHeatMap:
    def __init__(self, name, points, values, radius=20):
        self.name = name
        self.points = points
        self.values = values
        self.radius = radius

    @property
    def data(self):
        return np.column_stack((self.points, self.values))

    def as_leaflet_layer(self):
        from ipyleaflet import Heatmap
        return Heatmap(
            name=self.name,
            locations=self.data.tolist(),
            radius=self.radius,
        )

m = ref(None)
center = [0, 0]

n = 1000
data = MyHeatMap(
    'layer-like',
    np.random.uniform(-80, 80, (n, 2)),
    np.random.uniform(0, 1000, n),
)

@onMounted
def add_layer():
    m.value.add(data)
    
</script>
```
