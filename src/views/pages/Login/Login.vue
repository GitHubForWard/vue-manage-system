<template>
  <common-form :formLabel="formLabel" :form="form"></common-form>
</template>

<script>
import CommonForm from "./../../../components/pages/CommonForm";
export default {
  components: {
    CommonForm
  },
  data() {
    return {
      formLabel: [
        {
          model: "user",
          label: "用户名"
        },
        {
          model: "password",
          label: "密码"
        }
      ],
      form: {
        user: "",
        password: ""
      }
    };
  }
};
</script>

<style lang="sass" scoped>
</style>