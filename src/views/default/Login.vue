<template>
  <div class="container">
    <h2>Management system</h2>
    <el-card class="box-card">
      <el-form :model="form" ref="form">
        <el-form-item
          label
          prop="username"
          :rules="{ required: true, message: '请输入用户名', trigger: 'blur'}"
        >
          <el-input placeholder="请输入用户名" prefix-icon="el-icon-user-solid" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item
          label
          prop="password"
          :rules="{
      required: true, message: '请输入密码', trigger: 'blur'
    }"
        >
          <el-input
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            suffix-icon="el-icon-view"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      loading: false
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      this.$http.post("api/permission/getMenu", this.form).then(res => {
        this.loading = false;
        res = res.data;
        console.log(res);
        if (res.code === 20000) {
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("addMenu", this.$router);
          this.$store.commit("setToken", res.data.token);
          this.$router.push({ name: "home" });
        } else {
          this.$message.warning(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
div.container {
  width: 100%;
  height: 100%;
  background: #6e8a94;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h2 {
    font-size: 32px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 24px;
  }

  .el-card {
    width: 500px;

    .el-form {
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
