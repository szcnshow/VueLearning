<template>
  <!--快捷查询-->
  <el-card class="box-card">
    <el-form
      inline
      label-position="right"
      :model="findItemModel"
      ref="formControl"
      class="demo-form-expand"
      label-width="1px"
      size="mini"
    >
      <el-form-item style="width:100px">
        <el-dropdown size="small">
          <el-button type="primary">
            快捷查询<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>方案一</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-form-item>
      <el-form-item
        v-for="(ctrId, index) in arrQuickFind"
        :key="'form_'+index"
        style="width:180px"
      >
        <!--判断要不要加载插槽-->
        <template v-if="getCtrMeta(ctrId).controlType === 1">
          <slot :name="ctrId">父组件没有设置插槽</slot>
        </template>
        <!--查询的子控件，采用动态组件的方式-->
        <template v-else>
          <component
            :is="ctlList[getCtrMeta(ctrId).controlType]"
            v-model="findItemModel[ctrId]"
            v-bind="getCtrMeta(ctrId)"
            @myChange="mySubmit">
          </component>
        </template>
      </el-form-item>
      <el-form-item style="width:60px">
        <el-button type="primary" round @click="moreClick">更多</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!--更多查询，放在抽屉里面-->
  <el-drawer
    title="查询条件"
    :before-close="handleClose"
    v-model="isShow"
    direction="ttb"
    custom-class="demo-drawer"
    ref="drawer"
    >
    <div class="demo-drawer__content">
      <el-form
        inline
        label-position="right"
        :model="formModel"
        ref="formControl"
        class="demo-form-expand"
        label-suffix="："
        label-width="100px"
        size="mini"
      >
        <el-form-item
          v-for="(ctrId, index) in meta.baseMeta.allFind"
          :key="'form_'+index"
          :label="getCtrMeta(ctrId).label"
          style="width:300px"
        >
          <!--判断要不要加载插槽-->
          <template v-if="getCtrMeta(ctrId).controlType === 1">
            <slot :name="ctrId">父组件没有设置插槽</slot>
          </template>
          <!--查询的子控件，采用动态组件的方式-->
          <template v-else>
            <component
              :is="ctlList[getCtrMeta(ctrId).controlType]"
              v-model="findItemModel[ctrId]"
              v-bind="getCtrMeta(ctrId)"
              @myChange="moreChange">
            </component>
          </template>
        </el-form-item>
        <el-form-item style="width:60px">
          <el-button type="primary" round>查询</el-button>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { ref, onMounted, reactive } from 'vue'
import { findItemListKey } from '@/components/nf-el-find-item/map-el-find-item.js'

/**
 * 查询控件的管理类
*/
const findManage = (props, context) => {
  // 查询子控件的model
  const findItemModel = ref({})
  // 查询控件的meta
  const findMeta = props.meta.baseMeta
  // 查询子控件需要的meta
  const findItemMeta = props.meta.itemMeta
  // 快捷查询的数组
  const arrQuickFind = reactive([])

  // 放入快捷查询
  arrQuickFind.push(...findMeta.quickFind)

  // 修改默认属性，以适合查询环境
  for (const key in findItemMeta) {
    const meta = findItemMeta[key]
    // 修改默认属性
    switch (meta.controlType) {
      case 100:
        meta['show-word-limit'] = false
        break
      case 101:
        meta['show-word-limit'] = false
        break
    }
    // 设置查询子控件的model，都设置为空
    findItemModel.value[key] = []
  }
  // 属性里的查询条件
  const findModel = props.modelValue || {}

  // 子控件变化时，向上层组件返回查询对象
  const mySubmit = (query, ctlId, colName) => {
    console.log('ss', colName, query)
    if (typeof query[1] === 'undefined' || query[1] === '' || query[1] === null) {
      // 删掉不想查询的字段
      delete findModel[colName]
    } else {
      // 设置查询条件
      findModel[colName] = query
    }
  }

  // 更多查询里面子控件的事件
  const moreChange = (query, ctlId, colName) => {
    console.log('more', colName, query)
    if (arrQuickFind.filter((id) => id === ctlId).length === 0) {
      arrQuickFind.push(ctlId)
    }
    mySubmit(query, ctlId, colName)
  }

  // 抽屉是否打开
  const isShow = ref(false)
  // 点击“更多”，清空快捷
  const moreClick = () => {
    arrQuickFind.length = 0
    isShow.value = true
  }

  // 收起抽屉判断快捷是否为空
  const moreClose = () => {
    if (arrQuickFind.length === 0) {
      arrQuickFind.push(...findMeta.quickFind)
    }
  }

  return {
    isShow, // 抽屉是否打开
    arrQuickFind, // 快捷栏的数组
    findItemModel, // 查询子控件的model
    moreChange, // 更多查询里面子控件的事件
    moreClick, // 点击更多，清空快捷
    moreClose, // 收起抽屉，设置默认
    mySubmit // 查询子控件的事件
  }
}

/**
 * @function div格式的表单控件
 * @description 可以依据json动态生成表单，可以多行多列、排序、插槽、验证等
 * @returns {*} Vue组件，表单控件
 */
export default {
  name: 'el-find-class',
  props: {
    modelValue: Object, // 查询条件集合
    meta: Object
  },
  setup (props, context) {
    // 控件字典
    const ctlList = findItemListKey
    // console.log('ctlList', ctlList)

    // 依据ID获取组件的meta，因为model不支持【】嵌套
    const getCtrMeta = (id) => {
      return props.meta.itemMeta[id] || {}
    }

    // 获取 $ref
    const formControl = ref(null)
    onMounted(() => {
      // console.log('表单dom', formControl)
    })

    const resetForm = () => {
      // 清空表单
      formControl.value.resetFields()
    }

    const {
      isShow, // 抽屉是否打开
      arrQuickFind, // 快捷栏的数组
      findItemModel, // 查询子控件的model
      moreChange, // 更多查询里面子控件的事件
      moreClick, // 点击更多，清空快捷
      moreClose, // 收起抽屉，设置默认
      mySubmit // 查询子控件的事件
    } = findManage(props, context)

    return {
      isShow, // 抽屉是否打开
      arrQuickFind, // 快捷栏的数组
      ctlList, // 子控件字典
      resetForm, // 重置表单
      formControl, // 获取表单的dom
      getCtrMeta, // 返回子控件的meta
      findItemModel, // 查询子控件的model
      moreChange, // 更多查询里面子控件的事件
      moreClick, // 点击更多，清空快捷
      moreClose, // 收起抽屉，设置默认
      mySubmit
    }
  }
}
</script>
