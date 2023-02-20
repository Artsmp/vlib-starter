<script lang="ts" setup></script>

<template>
  <div>
    <!-- examples/src/App.vue -->
    <van-cell-group>
      <van-cell v-for="i in 100" :key="i">Cell {{ i }}</van-cell>
    </van-cell-group>
    <vlib-back-top />
  </div>
</template>

<style lang="scss" scoped></style>
