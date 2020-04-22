<template>
  <div class="common-table">
    <el-table :data="tableData">
      <el-table-column label="序号">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column v-for="item in tableLabel" :key="item.prop" :label="item.label">
        <template slot-scope="scope">
          <span>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  }
};
</script>

<style>
</style>