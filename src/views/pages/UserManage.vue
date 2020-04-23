<template>
  <div class="manage">
    <!-- 新增修改dialog -->
    <el-dialog :title="title" :visible.sync="isVisible" width="500px">
      <common-form :formLabel="operateLabel" :form="operateForm"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isVisible = false">取 消</el-button>
        <el-button type="primary" @click="save" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>
    <el-card shadow="hover">
      <div class="manage-form">
        <el-button type="primary">
          <i class="el-icon-plus"></i>新增
        </el-button>
        <common-form inline :formLabel="formLabel" :form="searchForm">
          <el-button type="primary">
            <i class="el-icon-search"></i>搜索
          </el-button>
        </common-form>
      </div>
      <common-table
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        @changePage="getUserList"
        @edit="editUser($event)"
      ></common-table>
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
      title: "新增",
      isVisible: false,
      btnLoading: false,
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
      searchForm: {
        keyword: ""
      },
      formLabel: [
        {
          model: "keyword",
          label: "用户姓名"
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      operateLabel: [
        {
          model: "name",
          label: "姓名"
        },
        {
          model: "age",
          label: "年龄"
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          options: [
            {
              label: "男",
              value: 1
            },
            {
              label: "女",
              value: 0
            }
          ]
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date"
        },
        {
          model: "addr",
          label: "地址"
        }
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: ""
      }
    };
  },
  methods: {
    getUserList() {
      this.config.loading = true;
      this.$http
        .get("/user/getUser", {
          params: {
            page: this.config.page
          }
        })
        .then(res => {
          this.config.loading = false;
          this.tableData = res.data.list.map(item => {
            item.sexLabel = item.sex === 0 ? "女" : "男";
            return item;
          });
          this.config.total = res.data.count;
          console.log(this.tableData, this.config.total);
        });
    },
    changePage(page) {
      console.log(page);
    },
    editUser(row) {
      console.log("要编辑的数据", row);
      this.operateForm = row;
      this.title = "编辑";
      this.isVisible = true;
    },
    save() {
      this.btnLoading = true;
      if (this.title === "编辑") {
        this.$http.post("/user/edit", this.operateForm).then(res => {
          console.log(res);
          this.btnLoading = false;
          if (res.data.code === 20000) {
            this.isVisible = false;
            this.$message({
              message: res.data.data.message,
              type: "success"
            });
          } else {
            this.$message({
              message: res.data.data.message,
              type: "error"
            });
          }
        });
      }
    }
  },
  mounted() {
    this.getUserList();
  }
};
</script>

<style lang="scss" scoped>
.manage {
  height: 100%;
  .manage-form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>