<template>
  <!--json的格式化显示-->
  <div>
    <div style="margin: 5px">
      <el-radio-group v-model="jsonType" size="mini">
        <el-radio-button :label="1">js</el-radio-button>
        <el-radio-button :label="2">json</el-radio-button>
      </el-radio-group>
    </div>
    <el-card class="box-card" contenteditable="true">
      <!--开头-->
      <template v-if="jsonType === 1">
        const meta_{{json.colName}} = reactive({
      </template>
      <template v-if="jsonType === 2">
        "{{json.controlId}}": {
      </template>
      <!--循环内容-->
      <div
        class="text item"
        v-for="(value, key, index) in json"
        :key="'jsonformat_' + index"
      >
        <!--key 的格式化-->
        <template v-if="jsonType === 1">
          &nbsp;&nbsp;{{key}}:
        </template>
        <template v-if="jsonType === 2">
          &nbsp;&nbsp;"{{key}}":
        </template>
        <!--array 的格式化-->
        <template v-if="valueIsArray(value)">[
          <json-format-array :json="value" :jsonType="jsonType"/>
          ]
        </template>
        <!--object 的格式化-->
        <template v-else-if="typeof value === 'object'">
          <json-format-object :json="value" :jsonType="jsonType"/>,
        </template>
        <!--基础类型-->
        <template v-else>
          &nbsp;{{showBytype(value)}},
        </template>
      </div>
      <!--结尾-->
      <template v-if="jsonType === 1">
        })
      </template>
      <template v-if="jsonType === 2">
        }
      </template>
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import josnFormat1 from '@/components/plat-help/showjson/json-format-object'
import josnFormat2 from '@/components/plat-help/showjson/json-format-array'

/**
 * json的格式化显示
 */
export default {
  name: 'josn-format',
  components: {
    'json-format-object': josnFormat1,
    'json-format-array': josnFormat2
  },
  props: {
    json: Object
  },
  setup (props) {
    const value = ref(props)

    // meta的格式，1：js；2：json文件
    const jsonType = ref(1)

    // 根据类型返回适合的格式
    const showBytype = (value) => {
      const yinhao = jsonType.value === 2 ? '"' : '\''
      let re = ''
      switch (typeof value) {
        case 'string':
          re = yinhao + value + yinhao
          break
        case 'number':
        case 'bigint':
        case 'boolean':
          re = value
          break
        case 'object':
          re = value
          break
        case 'undefined':
          re = value
          break
      }
      return re
    }

    // 判断是不是数组
    const valueIsArray = (value) => {
      const re = value &&
        typeof value === 'object' &&
        typeof value.length === 'number' &&
        typeof value.splice === 'function' &&
        // 判断length属性是否是可枚举的 对于数组 将得到false
        // eslint-disable-next-line no-prototype-builtins
        !(value.propertyIsEnumerable('length'))

      return re
    }

    return {
      valueIsArray, // 判断是不是数组
      jsonType, // meta的格式
      showBytype, // 判断类型，然后按照类型做转换
      value
    }
  }
}
</script>
