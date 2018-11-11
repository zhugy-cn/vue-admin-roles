<template>
  <div>
    <template v-for="item in newRoutes">
      <el-submenu v-if="hasChildren(item)" :index="item.name" :key="item.name">
        <template slot="title">
          <i :class="'el-icon-'+item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
        </template>
        <template v-for="val in item.children">
          <side-item class="nest-menu" v-if="hasChildren(val)" :routes="[val]" :key="val.name" />
          <el-menu-item v-else :index="val.path" :key="val.name">
            <i :class="'el-icon-'+val.meta.icon"></i>
            <span slot="title">{{val.meta.title}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item v-else :index="item.path" :key="item.name">
        <i :class="'el-icon-'+item.meta.icon"></i>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: 'sideItem',
  props: ['routes'],
  computed: {
    newRoutes() {
      return this.filterRoutes();
    }
  },
  methods: {
    hasChildren(route) {
      return route.children && route.children.length !== 0;
    },
    filterRoutes() {
      let newRoutes = this.routes.filter(v => v.children && !v.hideInMenu);
      let tempRoutes = newRoutes.map(item => {
        item.children.forEach(v => {
          // 折叠动画的时候会重新渲染导致添加多次 /，造成路径不对
          if (!v.init) {
            if (item.path === '/') {
              v.path = item.path + v.path;
            } else {
              v.path = item.path + '/' + v.path;
            }
            v.init = true;
          }
        });
        if (item.children.length === 1 && !item.alwaysShow) {
          return item.children[0];
        } else {
          return item;
        }
      });
      return tempRoutes;
    }
  }
};
</script>