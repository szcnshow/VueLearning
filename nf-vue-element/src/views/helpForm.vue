<template>
  <el-row :gutter="30">
    <el-col :span="7">
      <el-card class="box-card" style="height:600px;overflow:auto">
        <template #header>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span>表单控件的属性</span>
          </div>
        </template>
        <!--编辑表单的meta-->
        <edit-form-props/>
        <!--编辑表单子控件的meta-->
        <edit-form-items-props/>
      </el-card>
    </el-col>
    <el-col :span="11">
      <!--编辑子控件的meta-->
      <el-card class="box-card" style="height:600px;overflow:auto">
        <template #header>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span>表单子控件的属性</span>
          </div>
        </template>
        <!--子控件的基础属性-->
        <edit-formItem-base/>
        <!--子控件的扩展属性-->
        <edit-formItem-extend/>
      </el-card>
    </el-col>
    <el-col :span="6">
      <!--显示子控件和json-->
      <div style="height:600px;overflow:auto">
        <show-formitem/>
      </div>
    </el-col>
  </el-row>
  <br>
  <el-row :gutter="30">
    <!--显示表单控件和json-->
    <el-col :span=18>
      <el-card class="box-card" style="height:600px;overflow:auto">
        <template #header>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span>表单控件</span>
          </div>
        </template>
        <show-form-dom/>
      </el-card>
    </el-col>
    <el-col :span=6>
      <el-card class="box-card" style="height:600px;overflow:auto">
        <template #header>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span>表单控件的meta</span>
          </div>
        </template>
        <show-form-json/>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

// 加载生命周期的钩子
import lifeCycle from '@/jsmodule/lifecycle.js'
// 动态渲染表单控件
import showFormDom from '@/components/plat-help/form/show-form-dom'
// 显示表单控件的json
import showFormJson from '@/components/plat-help/form/show-form-json'

// 显示表单子控件的dom和json
import showFormItem from '@/components/plat-help/form/show-formitem'

// 编辑表单自己的属性
import editFormProps from '@/components/plat-help/form/edit-form-props'
// 编辑表单子控件的属性
import editFormItemsProps from '@/components/plat-help/form/edit-form-items-props'

// 子控件的基础属性
import editFormItemBase from '@/components/plat-help/form/edit-formItem-base'
// 子控件的扩展属性
import editFormItemExtend from '@/components/plat-help/form/edit-formItem-extend'

export default {
  name: 'formHelp',
  components: {
    'edit-form-props': editFormProps, // 编辑表单控件的meta
    'edit-form-items-props': editFormItemsProps, // 编辑表单控件的子控件的meta
    'edit-formItem-base': editFormItemBase, // 子控件的基础属性
    'edit-formItem-extend': editFormItemExtend, // 子控件的扩展属性
    'show-formitem': showFormItem, // 根据子控件的meta渲染dom
    'show-form-json': showFormJson, // 显示表单控件的json
    'show-form-dom': showFormDom // -- 根据子控件的meta渲染dom
  },
  setup () {
    lifeCycle('helpForm')

    return {
    }
  }

}
</script>
