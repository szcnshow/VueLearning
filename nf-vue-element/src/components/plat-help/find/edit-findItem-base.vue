<template>
  <!--
    全部：{{model}}<br>
    部分：{{partModel}}<br>
    精简：{{miniModel}}<br>
  -->
  <elForm
    v-model:modelValue="model"
    v-model:partModel="partModel"
    v-model:miniModel="miniModel"
    :meta="metaBaseProps"
    @mychange="formChange"
  >
    <!--插槽实现备选项-->
    <template v-slot:123="">
      <el-input-number
        style="width:100px"
        controls-position="right"
        v-model="optionCount"
        @input="addOption"
        :min="0"
        :max="100"
        label="备选项的数量">
      </el-input-number>
      <el-table
        stripe
        border
        :data="optionItem"
        style="width: 100%"
      >
          <el-table-column
            prop="value"
            label="value"
            width="130">
            <template #default="scope">
              <el-input-number
                style="width:100px"
                controls-position="right"
                v-model="scope.row.value"
                @input="optionInput"
                :min="0"
                :max="100"
                label="备选项的编号">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            prop="label"
            label="label"
            width="180">
            <template #default="scope">
              <el-input
                @input="optionInput"
                v-model="scope.row.label"
                placeholder="备选项的内容"
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">
                删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </elForm>
  <div>
    <el-button type="primary" @click="submit">确定</el-button>
  </div>
  <!--
    完整的 model 值：<br><br>
    <template v-for="(item, key) in model" :key="key">
      {{key}}：{{item}}<br>
    </template>
    <br>
    <hr>
    相应的 model 值：<br><br>
    <template v-for="(item, key) in partModel" :key="key">
      {{key}}：{{item}}<br>
    </template>22<br>
    {{model}}
  -->
</template>

<script>
import { reactive, ref, unref, toRaw, watch } from 'vue'
import { getControlTypeFindOptionList } from '@/components/controlConfig/config.js'
// 状态管理里面的表单meta
import { manageFormMetaHelp } from '@/store/manage/manage-form'
import elForm from '@/components/nf-el-form/el-form-div'
import lifeCycle from '@/jsmodule/lifecycle.js'

/**
 * 管理备选项
 * ** 下列表
 * ** 联动
 * ** 多选组和单选组
 * ** 文本框的备选
 */
const optionListManage = (model1, model2, model3) => {
  // 别选项的项目
  const optionItem = reactive([
    {
      value: 1,
      label: ''
    }
  ])

  // 备选项的数量
  const optionCount = ref(optionItem.length)

  // 同步数据
  const optionInput = (val) => {
    if (typeof model1.optionList === 'undefined') {
      model1.optionList = []
    }
    if (typeof model2.optionList === 'undefined') {
      model2.optionList = []
    }
    if (typeof model3.optionList === 'undefined') {
      model3.optionList = []
    }
    model1.optionList.length = 0
    model1.optionList.push(...optionItem)
    model2.optionList.length = 0
    model2.optionList.push(...optionItem)
    model3.optionList.length = 0
    model3.optionList.push(...optionItem)
  }

  // 添加新的选项
  const addOption = (val) => {
    if (val < optionItem.length) {
      for (let i = 0; i < optionItem.length - val; i++) {
        for (let i = optionItem.length - 1; i > 0; i--) {
          if (optionItem[i].label === '') {
            // delete optionItem[i]
            i = 0
          }
        }
      }
    }
    for (let i = optionItem.length; i < val; i++) {
      optionItem.push(
        {
          value: i + 1,
          label: ''
        }
      )
    }
    optionInput() // 同步
  }

  // 删掉一个备选项
  const handleDelete = (index, row) => {
    // console.log(index, row)
    optionItem.splice(index, 1)
    optionInput() // 同步
    optionCount.value--
  }

  return {
    optionItem, // 备选项目列表
    optionCount, // 备选项的数量
    optionInput, // 同步完整版、标准版和简洁版的数据
    addOption, // 添加新的选项
    handleDelete // 删掉指定的选项
  }
}

// 删除对象的属性
const delObjectProperty = (obj) => {
  for (const key in obj) {
    delete obj[key]
  }
}

/**
 * 生成表单子控件meta的辅助工具
 * * 基础属性
 */
export default {
  name: 'edit-formItem-base',
  components: {
    elForm // 表单控件
  },
  setup () {
    lifeCycle('edit-formItem-base -子控件的基础属性')

    const model = reactive({})
    const partModel = reactive({})
    const miniModel = reactive({})
    const { typeOptionList } = getControlTypeFindOptionList()

    // 读取json，获得配置。
    // 基础属性的表单的meta
    // 扩展属性的表单的meta
    const json = require('@/components/plat-help/json-find/meta-find-item.json')
    const metaBaseProps = reactive(json.formMeta) // 表单的meta
    // 添加重新绑定的开关
    metaBaseProps.reload = false
    // 设置组件类型
    metaBaseProps.itemMeta[103].optionList = typeOptionList
    // console.log('meta', meta)

    // 重新渲染表单
    const spanChange = () => {
      metaBaseProps.reload = !metaBaseProps.reload
    }

    // 获取状态管理里面的当前表单子控件的meta信息
    const { getCurrFormItemMeta, getFormItemMeta } = manageFormMetaHelp()
    // 当前表单子控件meta
    const currItemmeta = getCurrFormItemMeta()
    // console.log('当前表单子控件meta', currItemmeta)
    // 状态管理里的表单的子控件的meta列表
    const formItemMeta = getFormItemMeta()

    // 监听当前子控件的ID
    watch(() => currItemmeta.id, (v1, v2) => {
      console.log('子控件编辑页面-currItemmeta.id', currItemmeta.id)
      Object.assign(model, currItemmeta.allItemMeta)
      // Object.assign(partModel, currItemmeta.allItemMeta)
      // Object.assign(miniModel, currItemmeta.allItemMeta)

      spanChange()
    })

    // 同步到当前的子控件
    const formChange = (val, controlId, colName, formModel, formPartModel) => {
      console.log('表单控件的change：', val, controlId, colName)
      // delObjectProperty(currItemmeta.allItemMeta)
      // delObjectProperty(currItemmeta.partItemMeta)
      delObjectProperty(currItemmeta.miniItemMeta)

      Object.assign(currItemmeta.allItemMeta, model)
      Object.assign(currItemmeta.partItemMeta, partModel)
      Object.assign(currItemmeta.miniItemMeta, miniModel)
    }

    // 处理备选项
    const {
      optionItem,
      optionCount,
      optionInput,
      addOption, // 添加新的选项
      handleDelete
    } = optionListManage(model, partModel, miniModel)

    // 把表单子控件的属性设置到状态里面
    const submit = () => {
      delObjectProperty(formItemMeta[currItemmeta.id])
      Object.assign(formItemMeta[currItemmeta.id], toRaw(unref(miniModel)))
    }

    return {
      // 备选项
      optionItem,
      optionCount,
      optionInput,
      addOption, // 添加新的选项
      handleDelete,
      // 表单控件里面的子控件的事件
      formChange,
      model, // 完整的meta
      partModel, // 部分meta
      miniModel, // 精简meta
      metaBaseProps, // 基础属性表单需要的meta
      submit, // 把表单自己的属性设置到状态里面
      spanChange // 重新渲染表单
    }
  }

}
</script>
