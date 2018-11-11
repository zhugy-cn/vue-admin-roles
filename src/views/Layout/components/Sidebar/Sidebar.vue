<template>
  <el-menu :default-active="$route.path" router :collapse="sideStatus" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
    <side-item :routes="permissionRouter" />
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex';
import SideItem from './SideItem';

export default {
  name: 'sidebar',
  components: {
    SideItem
  },
  computed: {
    ...mapGetters(['permissionRouter', 'sideStatus'])
  }
};
</script>
