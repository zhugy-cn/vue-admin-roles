<template>
  <div class="login-page">
    <canvas ref="canvas"></canvas>
    <div :class="['login-container',{active:currentCom=='ResetPassCom'}]">
      <transition name="zui-zoom">
        <!-- <keep-alive :include="['loginCom']"> -->
        <!-- <keep-alive include="loginCom"> -->
        <component :is="currentCom" :currentCom.sync="currentCom"></component>
        <!-- </keep-alive> -->
      </transition>
    </div>
  </div>
</template>
<script src="./Login.js"></script>
<style>
.zui-zoom-enter-active,
.zui-zoom-leave-active {
  position: absolute;
  margin: auto;
}
.zui-zoom-enter-active {
  animation: zoomIn 0.6s;
}
.zui-zoom-leave-active {
  animation: zoomOut 0.6s;
}
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.5, 0.5, 0.5);
  }
  50% {
    opacity: 1;
  }
}
@keyframes zoomOut {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: scale3d(0.6, 0.6, 0.6);
  }
  to {
    opacity: 0;
  }
}
</style>

<style lang="scss" src="./Login.scss"></style>