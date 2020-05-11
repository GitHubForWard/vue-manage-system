<template>
  <header>
    <div>
      <i :class="isCollapsed" @click="toggleCollapsedSidebar"></i>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{ current.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link">
          <el-avatar :src="userImg"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
          <el-dropdown-item @click.native="logout" icon="el-icon-bottom-left">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      userImg: require("./../../assets/images/user.png")
    };
  },
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu,
      isCollapsed: state =>
        state.tab.isCollapse ? "el-icon-s-unfold" : "el-icon-s-fold"
    })
  },
  methods: {
    toggleCollapsedSidebar() {
      this.$store.commit("collapseMenu");
    },
    logout() {
      this.$store.commit("clearMenu");
      this.$store.commit("clearToken");
      this.$router.push({ name: "login" });
      location.reload();
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;

    .el-dropdown {
      cursor: pointer;
    }

    i {
      display: block;
      min-width: 50px;
      padding: 8px 2px;
      line-height: 100%;
      text-align: center;
      border-radius: 2px;
      font-size: 18px;
      outline: none;
      cursor: pointer;
      transition: background-color 300ms;
      margin-right: 20px;

      &:hover {
        background-color: #bad1d1;
      }
    }
  }
}
</style>