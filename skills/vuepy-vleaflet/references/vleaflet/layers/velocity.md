---
outline: deep
titleTemplate: :title | VLeaflet
---

# Velocity

To visualize the direction and intensity of arbitrary velocities

## 基础用法

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 必填 | 备注 |
|--------|------|------|--------|------|------|
| data | 速度场数据源 | Object | - | 是 | 必须包含速度场数据 |
| name | 图层名称 | string | '' | 否 | - |
| zonal_speed | 纬向速度变量名 | string | '' | 否 | 数据源中的字段名 |
| meridional_speed | 经向速度变量名 | string | '' | 否 | 数据源中的字段名 |
| latitude_dimension | 纬度维度名 | string | '' | 否 | 数据源中的纬度字段 |
| longitude_dimension | 经度维度名 | string | '' | 否 | 数据源中的经度字段 |
| display_values | 是否显示悬停数值 | boolean | true | 否 | - |
| display_options | 显示配置选项 | Object | `{velocity_type: 'Global Wind',display_position: 'bottomleft',display_empty_string: 'No wind data',angle_convention: 'bearingCW',speed_unit: 'kts'}` | 否 | 支持多种显示配置 |
| min_velocity | 最小速度值 | number | 0 | 否 | 用于颜色标尺 |
| max_velocity | 最大速度值 | number | 10 | 否 | 用于颜色标尺 |
| velocity_scale | 速度缩放系数 | number | 0.005 | 否 | 控制粒子动画 |
| color_scale | 自定义颜色标尺 | Array\<string\> | [] | 否 | 十六进制/RGB颜色数组 |

### 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| - | - | - |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| - | - |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| - | - | - | - |

ref: https://ipyleaflet.readthedocs.io/en/latest/layers/velocity.html
