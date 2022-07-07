<!--查询用的单行文本-->
<template>
  <find-kind
    v-model="findChoiceKind"
    :findKind="findKind"
    @change="myChange"
  />
  <template v-if="findChoiceKind === 417 || findChoiceKind === 427">
    <component
      :is="ctlList[controlType]"
      style="width:130px;"
      v-model="findRange[0]"
      v-bind="$attrs"
      @myChange="myChange">
    </component>
    至
    <component
      :is="ctlList[controlType]"
      style="width:130px;"
      v-model="findRange[1]"
      v-bind="$attrs"
      @myChange="myChange">
    </component>
  </template>
  <template v-else>
    <component
      :is="ctlList[controlType]"
      style="width:100px;"
      v-model="findText"
      v-bind="$attrs"
      @myChange="myChange">
    </component>
  </template>
</template>

<script>
import { defineComponent } from 'vue'
// 引入查询子控件的管理类
import formItemManage from '../controlManage/findItemManage.js'
// 查询方式的控件
import selectFindKind from './s-findkind'

// 异步组件，引入表单子控件
import { formItemToFindItem } from '@/components/nf-el-find-item/map-el-find-item.js'

/*
* 查询子控件，基础版，包括文本查询、数字查询、下拉选择、单选组、复选组、日期和时间
*
*/
export default defineComponent({
  name: 'el-find-base',
  inheritAttrs: false,
  props: {
    controlId: Number, // 控件ID
    controlType: Number, // 控件类型
    colName: String, // 字段名称
    modelValue: [Array, Object], // 查询结果，数组形式
    findKind: {
      type: Array,
      default: () => { return [401, 402, 403, 404, 405, 406] }
    }
  },
  components: {
    'find-kind': selectFindKind
  },
  emits: ['update:modelValue', 'myChange', 'input', 'change'],
  setup (props, context) {
    // 表单子控件 to 查询子控件 的 字典
    const ctlList = formItemToFindItem
    // console.log('ctlType', ctlList)
    const {
      findChoiceKind, // 选择的查询方式
      findText, // 一个关键字查询
      findRange, // 范围查询
      mySubmit
    } = formItemManage(props, context)
    findChoiceKind.value = 401

    findText.value = null
    // 提交查询结果
    const myChange = () => {
      switch (findChoiceKind) {
        case 417:
        case 427:
          mySubmit(findRange.value) // 范围查询，开始到结束
          break
        default:
          mySubmit(findText.value) // 查询关键字
          break
      }
    }

    return {
      ctlList,
      findChoiceKind,
      findText,
      findRange,
      myChange
    }
  }
})
</script>
