<template>
  <transition>
    <router-view></router-view>
  </transition>
</template>
<script>
</script>
<style lang="scss">
// 路由加载进度条颜色
#nprogress .bar {
  background: red !important;
}
</style>
