<template>
  <div>
    <template>
      <el-table :data="tableData" style="width: 100%" >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column
          v-for="(item, key) in tableLabel"
          :key="key"
          :prop="item.prop"
          :label="item.label"
        ></el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "age",
          label: "年龄"
        },
        {
          prop: "sexLabel",
          label: "性别"
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200
        },
        {
          prop: "addr",
          label: "地址",
          width: 320
        }
      ]
    };
  },
  methods: {
    getUserList() {
      this.$http.get("/user/getUser").then(res => {
        console.log("userData", res);
        this.tableData = res.data.list;
      });
    }
  },
  mounted() {
    this.getUserList();
  }
};
</script>

<style>
</style>