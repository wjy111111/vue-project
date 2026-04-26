<template>
  <div class="basic-layout flex h-screen w-screen">
    <a-layout class="layout-wrapper" style="background: transparent">
      <a-layout-sider class="sider" style="background: #040814" collapsible>
        <GlobalSider />
      </a-layout-sider>
      <a-layout class="layout-content">
        <a-layout-header class="header" style="padding: 0; background: transparent; z-index: 100">
          <GlobalHeader />
        </a-layout-header>
        <a-layout-content class="content" flex justify-center>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script lang="ts" setup>
import GlobalSider from './GlobalSider.vue'
import GlobalHeader from './GlobalHeader.vue'
</script>
<style scoped>
.basic-layout {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #040814;
  overflow: hidden !important;
}
.layout-wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  background: transparent;
  overflow: hidden !important;
}
.sider {
  background: rgba(4, 8, 20, 0.95);
  border-right: 1px solid rgba(0, 245, 255, 0.1);
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 240px;
  z-index: 200;
}
.layout-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  background: transparent;
  overflow: hidden !important;
}
.header {
  height: 64px;
  flex-shrink: 0;
  padding: 0;
  background: transparent;
  z-index: 100;
}
.content {
  flex: 1;
  padding: 0 !important;
  overflow: hidden;
  background: #040814;
  position: relative;
}
.ant-layout,
.ant-layout-header,
.ant-layout-content {
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
}
@media (max-width: 768px) {
  .sider {
    width: 200px;
  }
}
</style>
