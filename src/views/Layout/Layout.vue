<template>
  <div class="app-wrapper">
    <!-- 侧边栏 -->
    <sidebar></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <tags-nav></tags-nav>
      <app-main></app-main>
    </div>
  </div>
</template>
<script>
import { Sidebar, Navbar, TagsNav, AppMain } from './components';
export default {
  name: 'layout',
  components: {
    Sidebar,
    Navbar,
    TagsNav,
    AppMain
  }
};
</script>