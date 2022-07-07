
import { provide, inject, reactive } from 'vue'

// 管理类
export default function crudManage () {
  /**
   * 表单的状态
   */
  const formState = reactive({
    isOpen: false,
    editState: 'add' // add/update/show
  })

  const formStates = reactive({})

  /**
   * 数据源
   */
  const dataSource = reactive([])

  // 注入状态
  const register = (id) => {
    provide('dataSource', dataSource)
    provide('formState', formState)

    if (typeof formStates[id] === 'undefined') {
      formStates[id] = {
        id: id,
        isOpen: false,
        editState: 'add' // add/update/show
      }
      provide('formState_' + id, formStates[id])
    }
  }

  /**
   * 获取弹窗表单的状态
   * @returns 返回弹窗表单的状态
   */
  const getFormState = (id) => {
    if (typeof id === 'undefined') {
      if (typeof inject('formState') === 'undefined') {
        return formState
      } else {
        return inject('formState')
      }
    } else {
      if (typeof inject('formState_' + id) === 'undefined') {
        return formState
      } else {
        return inject('formState_' + id)
      }
    }
  }

  /**
   * 表单添加、修改数据，列表获取数据
   * @returns 返回共用的数据源
   */
  const getDataSource = () => {
    if (typeof inject('dataSource') === 'undefined') {
      return dataSource
    } else {
      return inject('dataSource')
    }
  }

  /**
   * 表单里面添加新数据
   */
  const formAddNewData = (obj) => {
    let arr = []
    if (typeof inject('dataSource') === 'undefined') {
      arr = dataSource
    } else {
      arr = inject('dataSource')
    }
    console.log('inject--', inject)
    console.log('dataSource', arr)
    arr.push(obj)
  }

  return {
    formState, // 弹窗表单的状态
    getFormState,
    getDataSource,
    formAddNewData,
    register // 注入
  }
}
