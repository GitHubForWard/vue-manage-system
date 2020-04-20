<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#647277"
    text-color="#fff"
    active-text-color="#fcb3b3"
    :collapse="isCollapse"
    unique-opened
    router
  >
    <a href="/">
      <img class="logo" src="./../../assets/logo.png" />
      <span v-show="!isCollapse">Vue.js</span>
    </a>
    <el-menu-item
      v-for="item in noChild"
      :key="item.id"
      :index="item.path"
      @click="menuClickHandle(item)"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu v-for="item in hasChild" :key="item.id" :index="item.path">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
          :index="subItem.path"
          @click="menuClickHandle(subItem)"
        >{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          path: "/",
          label: "首页",
          name: "home",
          icon: "s-home",
          id: 1000
        },
        {
          path: "/video",
          name: "video",
          label: "视频管理",
          icon: "video-play",
          id: 2000
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          id: 3000
        },
        {
          path: "/other",
          name: "other",
          label: "其它",
          icon: "burger",
          id: 4000,
          children: [
            {
              path: "/one",
              name: "one",
              label: "页面一",
              icon: "/setting",
              id: 4100
            },
            {
              path: "two",
              name: "two",
              label: "页面二",
              icon: "setting",
              id: 4200
            },
            {
              path: "three",
              name: "three",
              label: "页面三",
              icon: "setting",
              id: 4300
            },
            {
              path: "four",
              name: "setting",
              label: "页面四",
              icon: "setting",
              id: 4400
            }
          ]
        }
      ]
    };
  },
  computed: {
    noChild() {
      return this.menu.filter(item => !item.children);
    },
    hasChild() {
      return this.menu.filter(item => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    }
  },
  methods: {
    menuClickHandle(item) {
      this.$router.push({ name: item.name });
      this.$store.commit("selectMenu", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;

  a {
    display: flex;
    align-items: center;
    justify-items: center;
    max-width: 200px;
    height: 60px;
    padding: 0 20px;
    color: #fff;
    font-size: 20px;
    font-weight: 700;

    .logo {
      max-height: 30px;
      margin-right: 10px;
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>