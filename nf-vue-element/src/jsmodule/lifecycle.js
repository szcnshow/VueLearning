import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onActivated,
  onDeactivated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered
} from 'vue'

/**
 * @function 显示生命周期
 * @description 默认调用生命周期，体验具体的执行效果
 * @param {string} flag 组件标识，区分不同的组件
 */
export default function (flag) {
  const debug = false

  // 渲染dom之前
  onBeforeMount(() => {
    if (debug) {
      console.log(`【${flag}】—— onBeforeMount`)
    }
  })
  // dom渲染结束
  onMounted(() => {
    if (debug) {
      console.log(`【${flag}】—— onMounted`)
    }
  })

  // 数据更新之前
  onBeforeUpdate(() => {
    if (debug) {
      console.log(`【${flag}】—— onBeforeUpdate`)
    }
  })

  // 重新渲染dom之后
  onUpdated(() => {
    if (debug) {
      console.log(`【${flag}】—— onUpdated`)
    }
  })

  // 被 keep-alive 缓存的组件激活时调用
  onActivated(() => {
    if (debug) {
      console.log(`【${flag}】—— onActivated`)
    }
  })

  // 被 keep-alive 缓存的组件停用时调用
  onDeactivated(() => {
    if (debug) {
      console.log(`【${flag}】—— onDeactivated`)
    }
  })

  // 数据更新之前
  onBeforeUnmount(() => {
    if (debug) {
      console.log(`【${flag}】—— onBeforeUnmount`)
    }
  })

  // 卸载组件实例后调用
  onUnmounted(() => {
    if (debug) {
      console.log(`【${flag}】—— onUnmounted`)
    }
  })

  // 当捕获一个来自子孙组件的错误时被调用
  onErrorCaptured((err, instance, info) => {
    if (debug) {
      console.log(`【${flag}】—— onErrorCaptured`)
      console.log('err', err)
      // console.log('instance', instance)
      console.log('info', info)
    }
  })

  // 跟踪虚拟 DOM 重新渲染时调用
  onRenderTracked((debuggerEvent) => {
    if (debug) {
      console.log(`【${flag}】—— onRenderTracked`, debuggerEvent)
    }
  })

  // 当虚拟 DOM 重新渲染
  onRenderTriggered((debuggerEvent) => {
    if (debug) {
      console.log(`【${flag}】—— onRenderTriggered`)
      console.log('debuggerEvent', debuggerEvent)
    }
  })
}
