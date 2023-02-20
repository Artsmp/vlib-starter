import { makeNumericProp, makeStringProp } from 'vant/es/utils'
import type { ExtractPropTypes } from 'vue'

export const backTopProps = {
  /** 滚动高度达到此参数才出现 */
  visibilityHeight: makeNumericProp(200),
  /** 触发滚动的容器 */
  target: makeStringProp(''),
  /** 距离容器右边距 */
  right: makeNumericProp(''),
  /** 距离容器底边距 */
  bottom: makeNumericProp(''),
}

export type BackToProps = ExtractPropTypes<typeof backTopProps>
