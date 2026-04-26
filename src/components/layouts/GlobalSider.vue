<template>
  <div class="sider-container">
    <div class="brand-logo-zone">
      <div class="bio-scanner">
        <div class="corner tl"></div>
        <div class="corner tr"></div>
        <div class="corner bl"></div>
        <div class="corner br"></div>
        <span class="core-text">MF</span>
        <div class="scan-laser"></div>
      </div>
      <div class="brand-text">
        <h2 class="main-title">MANDRILL</h2>
        <p class="sub-title">CROSS-TIME AI <span class="blink-dot"></span></p>
      </div>
    </div>
    <a-menu mode="inline" theme="dark" @click="handleMenuClick" class="custom-sider-menu">
      <a-menu-item key="home">
        <span class="menu-item-text">首页 (HOME)</span>
      </a-menu-item>
      <a-menu-item key="face-recognition">
        <span class="menu-item-text">综合检索 (RETRIEVE)</span>
      </a-menu-item>
      <a-menu-item key="upload">
        <span class="menu-item-text">人口查找(UPLOAD)</span>
      </a-menu-item>
      <a-menu-item key="user-information">
        <span class="menu-item-text">用户信息 (PROFILE)</span>
      </a-menu-item>
      <a-menu-item key="login">
        <span class="menu-item-text">用户登录 (LOGIN)</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const handleMenuClick = ({ key }: { key: string }) => {
  const routeMap: Record<string, string> = {
    home: '/',
    'face-recognition': '/face-recognition',
    upload: '/upload',
    login: '/login',
    'user-information': '/user-information',
  }
  if (routeMap[key]) {
    router.push(routeMap[key])
  }
}
</script>
<style scoped>
.sider-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #040814;
  border-right: 1px solid rgba(34, 211, 238, 0.1);
}
.brand-logo-zone {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 25px 20px;
  margin-bottom: 10px;
  border-bottom: 1px dashed rgba(34, 211, 238, 0.2);
  background: radial-gradient(circle at top left, rgba(34,211,238,0.05) 0%, transparent 70%);
}
.bio-scanner {
  position: relative;
  width: 42px;
  height: 42px;
  background: rgba(34, 211, 238, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 10px rgba(34, 211, 238, 0.1);
}
.corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 2px solid transparent;
}
.tl { top: 0; left: 0; border-top-color: #00f5ff; border-left-color: #00f5ff; }
.tr { top: 0; right: 0; border-top-color: #00f5ff; border-right-color: #00f5ff; }
.bl { bottom: 0; left: 0; border-bottom-color: #00f5ff; border-left-color: #00f5ff; }
.br { bottom: 0; right: 0; border-bottom-color: #00f5ff; border-right-color: #00f5ff; }
.core-text {
  color: #ffffff;
  font-weight: 900;
  font-family: 'Eurostile', 'JetBrains Mono', monospace;
  font-size: 18px;
  letter-spacing: 1px;
  text-shadow: 0 0 8px rgba(34, 211, 238, 0.8);
  z-index: 2;
}
.scan-laser {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #00f5ff;
  box-shadow: 0 0 8px #00f5ff, 0 0 15px #00f5ff;
  animation: laser-scan 2.5s ease-in-out infinite;
  z-index: 3;
}
@keyframes laser-scan {
  0%, 100% { top: 2%; opacity: 0; }
  10%, 90% { opacity: 1; }
  50% { top: 96%; }
}
.brand-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.main-title {
  margin: 0;
  color: #ffffff;
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 3px;
  font-family: 'Georgia', serif;
}
.sub-title {
  margin: 4px 0 0 0;
  color: #22d3ee;
  font-size: 10px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.blink-dot {
  width: 6px;
  height: 6px;
  background-color: #22d3ee;
  border-radius: 50%;
  box-shadow: 0 0 8px #22d3ee;
  animation: blink 1.5s infinite alternate;
}
@keyframes blink {
  0% { opacity: 0.2; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1.1); }
}
.custom-sider-menu {
  background: transparent !important;
  padding: 10px 0;
}
.menu-item-text {
  font-size: 13px;
  letter-spacing: 1px;
  font-family: sans-serif;
}
:deep(.ant-menu-dark.ant-menu-inline .ant-menu-item) {
  margin-bottom: 8px;
  border-radius: 0;
  transition: all 0.3s ease;
}
:deep(.ant-menu-dark.ant-menu-inline .ant-menu-item:hover) {
  background: rgba(34, 211, 238, 0.1) !important;
  color: #22d3ee !important;
  border-right: 3px solid #22d3ee;
}
:deep(.ant-menu-dark.ant-menu-inline .ant-menu-item-selected) {
  background: linear-gradient(90deg, rgba(34,211,238,0.2) 0%, transparent 100%) !important;
  color: #ffffff !important;
  font-weight: bold;
  border-left: 4px solid #00f5ff;
  text-shadow: 0 0 8px rgba(0, 245, 255, 0.5);
}
</style>
