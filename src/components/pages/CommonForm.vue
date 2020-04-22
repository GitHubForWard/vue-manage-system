<template>
  <el-form :inline="inline" :model="form">
    <el-form-item v-for="item in formLabel" :key="item.model">
      <el-input v-if="!item.type" v-model="form[item.model]" :placeholder="`请输入${item.label}`"></el-input>
      <el-select v-if="item.type === 'select'" v-model="form[item.model]" :placeholder="`请输入${item.label}`">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-switch v-model="form[item.model]" v-if="item.type === 'switch'"></el-switch>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    inline: Boolean,
    form: Object,
    formLabel: Array
  }
};
</script>

<style>
</style>