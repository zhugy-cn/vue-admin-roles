<template>
  <div>
    Form2
    <el-button type="primary" @click="openLoading">打开loading</el-button>

  </div>
</template>
<script>
export default {
  name: 'form2',
  data() {
    return {};
  },
  mounted() {
    console.log('fom2');
  },
  methods: {
    openLoading() {
      this.$global.openLoading();
      setTimeout(() => {
        this.$global.closeLoading();
      }, 2000);
    }
  }
};
</script>
<style lang='scss' scoped>
</style>