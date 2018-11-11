<template>
  <div id="app" v-loading="globalLoading" :element-loading-text="loadingMessage">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapGetters(['globalLoading', 'loadingMessage'])
  }
};
</script>