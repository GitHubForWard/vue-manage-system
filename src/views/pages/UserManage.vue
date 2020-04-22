<template>
  <div class="manage">
    <div class="manage-form">
      <el-button type="primary">
        <i class="el-icon-plus"></i>新增
      </el-button>
      <common-form inline :formLabel="formLabel" :form="searchFrom">
        <el-button type="primary">
          <i class="el-icon-search"></i>搜索
        </el-button>
      </common-form>
    </div>
    <el-card shadow="hover">
      <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config"></common-table>
    </el-card>
  </div>
</template>

<script>
import CommonForm from "./../../components/pages/CommonForm";
import CommonTable from "./../../components/pages/CommonTable";

export default {
  components: {
    CommonForm,
    CommonTable
  },
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
      ],
      searchFrom: {
        keyword: ""
      },
      formLabel: [
        {
          model: "keyword",
          label: ""
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      }
    };
  },
  methods: {
    getUserList() {
      this.config.loading = true;
      this.$http.get("/user/getUser").then(res => {
        this.config.loading = false;
        this.tableData = res.data.list.map(item => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.data.count;
        console.log(this.tableData, this.config.total);
      });
    }
  },
  mounted() {
    this.getUserList();
  }
};
</script>

<style lang="scss" scoped>
.manage {
  .manage-form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>