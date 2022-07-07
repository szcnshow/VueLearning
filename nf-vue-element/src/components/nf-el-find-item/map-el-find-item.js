import { defineAsyncComponent } from 'vue'
import { formItemList } from '@/components/nf-el-form-item/map-el-form-item.js'

/**
 * 组件内部注册用，查询子控件的动态加载
 * * 文本
 * ** el-find-text 单行文本、电话、邮件、搜索
 * **  多行文本
 * ** 无 不可以查询密码 密码
 * ** url
 * * 数字
 * ** el-find-number 数字
 * * 日期
 * ** el-find-date 日期、年月、年周、年
 * ** el-find-time 时间
 * * 选择
 * **  勾选  开关 改成 el-find-radios
 * ** el-find-checkboxs 多选组
 * ** el-find-radios 单选组
 * ** el-find-select 下拉选择
 */
export const findItemForComponent = {
  // 文本类 defineComponent
  'el-find-base': defineAsyncComponent(() => import('./t-base.vue'))
  // 数字
  // 日期、时间
  // 'el-find-date': defineAsyncComponent(() => import('./d-date.vue')),
  // 'el-find-time': defineAsyncComponent(() => import('./d-time.vue')),
  // 选择、开关
  // 'el-find-checkboxs': defineAsyncComponent(() => import('./s-checkboxs.vue')),
  // 'el-find-radios': defineAsyncComponent(() => import('./s-radios.vue')),
  // 'el-find-select': defineAsyncComponent(() => import('./s-select.vue'))
  // 'el-find-selwrite': defineAsyncComponent(() => import('./s-selwrite.vue')),
  // 'el-find-select-cascader': defineAsyncComponent(() => import('./s-select-cascader.vue'))
}

/**
 * 查询子控件，基于控件类型动态加载，不用在组件里面注册
 */
export const findItemListKey = {
  // 文本类
  100: findItemForComponent['el-find-base'], // 单行文本
  101: findItemForComponent['el-find-base'], // 单行文本
  102: findItemForComponent['el-find-base'], // 单行文本
  103: findItemForComponent['el-find-base'], // 单行文本
  104: findItemForComponent['el-find-base'], // 单行文本
  105: findItemForComponent['el-find-base'], // 单行文本
  106: findItemForComponent['el-find-base'], // 单行文本
  // 数字
  120: findItemForComponent['el-find-base'], // 数字
  121: findItemForComponent['el-find-base'], // 滑块
  // 日期、时间
  110: findItemForComponent['el-find-date'], // 日期
  111: findItemForComponent['el-find-date'], // 日期 + 时间
  112: findItemForComponent['el-find-date'], // 年月
  113: findItemForComponent['el-find-date'], // 年周
  114: findItemForComponent['el-find-date'], // 年
  115: findItemForComponent['el-find-time'], // 任意时间
  116: findItemForComponent['el-find-time'], // 选择固定时间
  // 选择、开关
  150: findItemForComponent['el-find-base'], // 多选组
  151: findItemForComponent['el-find-base'], // 多选组
  152: findItemForComponent['el-find-base'], // 多选组
  153: findItemForComponent['el-find-base'], // 单选组
  160: findItemForComponent['el-find-base'], // 下拉
  161: findItemForComponent['el-find-base'], // 下拉
  // 161: findItemForComponent['el-find-selwrite'], // 下拉多选
  162: findItemForComponent['el-find-base'] // 下拉联动

}

/**
 * 表单子控件转换成查询子控件，通过类型编号对应不同的组件实现
 */
export const formItemToFindItem = {
  // 文本类 =》 el-form-text
  100: formItemList['el-form-text'], // 单行文本
  101: formItemList['el-form-text'], // 单行文本
  102: formItemList['el-form-text'], // 单行文本
  103: formItemList['el-form-text'], // 单行文本
  104: formItemList['el-form-text'], // 单行文本
  105: formItemList['el-form-text'], // 单行文本
  106: formItemList['el-form-text'], // 单行文本
  // 数字 =》 el-form-number
  120: formItemList['el-form-number'], // 数组
  121: formItemList['el-form-number'], // 数组
  // 日期 =》 el-form-date
  110: formItemList['el-form-date'], // 日期
  111: formItemList['el-form-date'], // 日期 + 时间
  112: formItemList['el-form-date'], // 年月
  113: formItemList['el-form-date'], // 年周
  114: formItemList['el-form-date'], // 年
  // 时间 =》 el-form-time
  115: formItemList['el-form-time'], // 任意时间
  116: formItemList['el-form-time'], // 选择固定时间
  // 选择、开关 =》el-form-checkboxs
  150: formItemList['el-form-checkboxs'], // 多选组
  151: formItemList['el-form-checkboxs'], // 多选组
  152: formItemList['el-form-checkboxs'], // 多选组
  153: formItemList['el-form-radios'], // 单选组
  160: formItemList['el-form-select'], // 下拉
  161: formItemList['el-form-select'], // 下拉
  // 161: findItemForComponent['el-find-selwrite'], // 下拉多选
  162: formItemList['el-form-select-cascader'] // 下拉联动

}
