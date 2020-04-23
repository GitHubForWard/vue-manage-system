<template>
  <el-form :inline="inline" :model="form">
    <el-form-item
      v-for="item in formLabel"
      :key="item.model"
      :label="item.label"
      label-width="100px"
    >
      <el-input v-if="!item.type" v-model="form[item.model]" :placeholder="`请输入${item.label}`"></el-input>
      <el-select
        v-if="item.type === 'select'"
        v-model="form[item.model]"
        :placeholder="`请选择${item.label}`"
      >
        <el-option
          v-for="item in item.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-switch v-model="form[item.model]" v-if="item.type === 'switch'"></el-switch>
      <el-date-picker
        v-model="form[item.model]"
        type="date"
        placeholder="选择日期"
        v-if="item.type === 'date'"
      ></el-date-picker>
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