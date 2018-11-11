<template>
  <div class="app-main">
    <transition name="breadcrumb">
      <keep-alive :include="cachedRoutes">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: '',
  computed: {
    ...mapGetters(['cachedRoutes'])
  }
};
</script>
<style lang='scss' scoped>
</style>