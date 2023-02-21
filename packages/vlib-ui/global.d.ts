export {}

// Helper for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VlibBackTop: typeof import('@art-test/vlib-ui')['BackTop']
  }
}
