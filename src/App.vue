<template>
  <div id="app">
    <Layout />
  </div>
</template>
<script>
import Layout from "./views/default/Layout";
export default {
  components: {
    Layout
  }
};
</script>
<style lang="scss">
#app {
  height: 100vh;
}
#nprogress .bar {
  background: red !important;
}
</style>
