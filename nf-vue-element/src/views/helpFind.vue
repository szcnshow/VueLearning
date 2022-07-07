<template>
  <el-row :gutter="30">
    <el-col :span="7">
      <el-card class="box-card" style="height:600px;overflow:auto">
        <template #header>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span>查询控件的属性</span>
          </div>
        </template>
        <!--编辑表单的meta-->
        <edit-find-props/>
        <!--编辑表单子控件的meta-->
        <edit-find-items-props/>
      </el-card>
    </el-col>
    <el-col :span="11">
      <!--编辑子控件的meta-->
      <el-card class="box-card" style="height:600px;overflow:auto">
        <template #header>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span>查询子控件的属性</span>
          </div>
        </template>
        <!--子控件的基础属性-->
        <edit-findItem-base/>
        <!--子控件的扩展属性-->
        <edit-findItem-extend/>
      </el-card>
    </el-col>
    <el-col :span="6">
      <!--显示子控件和json-->
      <div style="height:600px;overflow:auto">
        <show-finditem/>
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
            <span>查询控件</span>
          </div>
        </template>
        <show-find-dom/>
      </el-card>
    </el-col>
    <el-col :span=6>
      <el-card class="box-card" style="height:600px;overflow:auto">
        <template #header>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span>查询控件的meta</span>
          </div>
        </template>
        <show-find-json/>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

// 加载生命周期的钩子
import lifeCycle from '@/jsmodule/lifecycle.js'
// 动态渲染表单控件
import showFindDom from '@/components/plat-help/find/show-find-dom'
// 显示表单控件的json
import showFindJson from '@/components/plat-help/find/show-find-json'

// 显示表单子控件的dom和json
import showFindItem from '@/components/plat-help/find/show-finditem'

// 编辑表单自己的属性
import editFindProps from '@/components/plat-help/find/edit-find-props'
// 编辑表单子控件的属性
import editFindItemsProps from '@/components/plat-help/find/edit-find-items-props'

// 子控件的基础属性
import editFindItemBase from '@/components/plat-help/find/edit-findItem-base'
// 子控件的扩展属性
import editFindItemExtend from '@/components/plat-help/find/edit-findItem-extend'

// 查询控件的meta的辅助工具
export default {
  name: 'findHelp',
  components: {
    'edit-find-props': editFindProps, // 编辑表单控件的meta
    'edit-find-items-props': editFindItemsProps, // 编辑表单控件的子控件的meta
    'edit-findItem-base': editFindItemBase, // 子控件的基础属性
    'edit-findItem-extend': editFindItemExtend, // 子控件的扩展属性
    'show-finditem': showFindItem, // 根据子控件的meta渲染dom
    'show-find-json': showFindJson, // 显示表单控件的json
    'show-find-dom': showFindDom // -- 根据子控件的meta渲染dom
  },
  setup () {
    lifeCycle('helpFind')

    return {
    }
  }

}
</script>
