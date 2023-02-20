import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { BackTop } from '../index'

describe('BackTop.vue', async () => {
  const wrapper = mount(
    () => {
      return (
        <div class={'target'} style={{ height: 100, overflow: 'auto' }}>
          <div style={{ height: 10000 }}>
            <BackTop
              target=".target"
              visibilityHeight={300}
              bottom={100}
              right={100}
            />
          </div>
        </div>
      )
    },
    { attachTo: document.body }
  )

  await nextTick()
  test('初始时隐藏', () => {
    // 初始时隐藏
    expect(wrapper.find('.vlib-back-top').exists()).toBe(false)
  })
  test('滚动到2000后元素显示', async () => {
    wrapper.element.scrollTop = 2000
    await wrapper.trigger('scroll')
    expect(wrapper.find('.vlib-back-top').exists()).toBe(true)
  })
  test('验证props是否渲染正确', async () => {
    expect(wrapper.find('.vlib-back-top').attributes('style')).toBe(
      'right: 100px; bottom: 100px;'
    )
  })
  test('点击返回触发 click 事件', async () => {
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeDefined()
  })
  test('输出快照到单独的文件', async () => {
    // 输出快照到单独的文件
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('target不存在', () => {
    // const fn = () => {
    //   mount(
    //     () => {
    //       return (
    //         <div class={'target'} style={{ height: 100, overflow: 'auto' }}>
    //           <div style={{ height: 10000 }}>
    //             <BackTop
    //               target=".notExist"
    //               visibilityHeight={300}
    //               bottom={100}
    //               right={100}
    //             />
    //           </div>
    //         </div>
    //       )
    //     },
    //     { attachTo: document.body }
    //   )
    // }
    // expect(fn()).toThrowErrorMatchingInlineSnapshot()
  })
})
