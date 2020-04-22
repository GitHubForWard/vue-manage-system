<template>
  <div class="common-table">
    <el-table :data="tableData" stripe v-loading="config.loading">
      <el-table-column label="序号" align="center">
        <template slot-scope="scope">
          <span>{{ (config.page - 1) * 20 + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
      >
        <template slot-scope="scope">
          <span>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180">
        <template>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  },
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: right;
  margin-top: 24px;
}
</style>