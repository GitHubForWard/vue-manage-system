<template>
  <div>
    <el-tag
      v-for="(tag, index) in reuse"
      :key="tag.name"
      effect="plain"
      type="info"
      :closable="tag.label !== '首页'"
      @close="closeTab(tag, index)"
      @click="changeMenu(tag)"
      :class="{ active: $route.name === tag.name }"
    >{{tag.label}}</el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      reuse: state => state.tab.tabList
    })
  },
  methods: {
    ...mapMutations({
      close: "closeTab",
      _changeMenu: "selectMenu"
    }),
    closeTab(tag, index) {
      let len = this.reuse.len - 1;
      this.close(tag);
      if (tag.name !== this.$route.name) {
        return;
      }
      // 如果点击的是最后一个（最右） 就往左跳一个
      if (index === len) {
        this.$router.push({ name: this.reuse[index - 1].name });
      } else {
        // 否则往右边跳转
        this.$router.push({ name: this.reuse[index].name });
      }
    },
    changeMenu(tag) {
      this.$router.push({ name: tag.name });
      this._changeMenu(tag);
    }
  },
  mounted() {
    console.log("路由复用", this.reuse);
  }
};
</script>

<style lang="sass" scoped>
.el-tag
  margin-right: 10px
  cursor: pointer
  display: inline-block
  position: relative
  cursor: pointer
  height: 26px
  line-height: 26px
  border: 1px solid #d8dce5
  color: #495060
  background: #fff
  padding: 0 8px
  font-size: 12px
  margin-left: 5px
  margin-top: 4px
  border-radius: 0
.active
  background-color: #42b983!important
  color: #fff!important
  border-color: #42b983!important
  &:before
    content: ""
    background: #fff
    display: inline-block
    width: 8px
    height: 8px
    border-radius: 50%
    position: relative
    margin-right: 2px
</style>