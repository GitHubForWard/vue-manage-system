<template>
  <el-container>
    <el-aside>
      <side></side>
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <el-main>
        <reuse-tab class="reuse"></reuse-tab>
        <div class="router">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <transition :name="transition">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </transition>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Side from "./../../components/layout/Side";
import CommonHeader from "./../../components/layout/Header";
import ReuseTab from "./../../components/layout/ReuseTab";
export default {
  components: {
    Side,
    CommonHeader,
    ReuseTab
  },
  data() {
    return {
      transition: ""
    };
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.transition = "slide-left";
      } else {
        this.transition = "slide-right";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-aside {
  width: auto !important;
  transition: all 2s !important;
}
.el-header {
  background-color: #6e8a94;
}
.el-main {
  background: #f3f3f3;
  padding: 0;
  .reuse {
    position: fixed;
    top: 60px;
    width: 100%;
    height: 34px;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    z-index: 999;
  }
  .router {
    margin-top: 34px;
    padding: 20px;
  }
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>