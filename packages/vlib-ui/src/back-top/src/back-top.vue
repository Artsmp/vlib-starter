<script lang="ts" setup>
import { Button } from 'vant'
import { onMounted, ref, shallowRef } from 'vue'
import { backTopProps } from './props'
import { addUnit, getScrollTop, unitToPx } from 'vant/es/utils'
import { useEventListener } from '@vant/use'
import { createNamespace } from '../../utils'
import { throttle } from 'lodash-es'

const props = defineProps(backTopProps)
const emitter = defineEmits(['click'])

const [_, bem] = createNamespace('back-top')

const visible = ref(false)
const target = shallowRef<HTMLElement | Window>(window)

const handleClick = (event: MouseEvent) => {
  emitter('click', event)

  target.value.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// 监听滚动
const handleScroll = () => {
  visible.value = getScrollTop(target.value) >= unitToPx(props.visibilityHeight)
}

const throttleScroll = throttle(handleScroll, 200)
useEventListener('scroll', throttleScroll, { target })

// 获取目标元素
onMounted(() => {
  if (props.target) {
    const el = document.querySelector<HTMLElement>(props.target)
    if (!el) {
      throw new Error(`[Vlib] target is not existed: ${props.target}`)
    }
    target.value = el
  }
})
</script>

<script lang="ts">
export default {
  name: 'VlibBackTop',
}
</script>

<template>
  <Transition name="van-fade">
    <div
      v-if="visible"
      :class="bem()"
      :style="{
        right: addUnit(props.right),
        bottom: addUnit(props.bottom),
      }"
      @click="handleClick"
    >
      <slot>
        <Button type="primary" icon="back-top" round vlib-back-top></Button>
      </slot>
    </div>
  </Transition>
</template>
