<template>
  <header class="tech-topbar">
    <div class="logo-container">
      <span class="text1">Age-Invariant</span>
      <span class="text2">Face</span>
      <span class="text3">Recognition</span>
      <span class="cursor-blink">_</span>
    </div>
    <div class="menu-container">
      <a-menu
        v-model:selectedKeys="current"
        mode="horizontal"
        theme="dark"
        :items="items"
        class="custom-tech-menu"
        :selectable="false"
      />
    </div>
  </header>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue';
import {
  SettingOutlined,
  BulbOutlined,
  GlobalOutlined
} from '@ant-design/icons-vue';
import type { MenuProps } from 'ant-design-vue';
const current = ref<string[]>([]);
const items = ref<MenuProps['items']>([
  {
    key: 'settings',
    icon: () => h(SettingOutlined),
    label: '设置',
    title: '设置',
    children:[
      { key: 'sound', label: '声音 (SOUND)' },
      { key: 'network', label: '网络 (NETWORK)' },
      { key: 'accessibility', label: '辅助功能 (A11Y)' },
    ],
  },
  {
    key: 'mode',
    icon: () => h(BulbOutlined),
    label: '模式',
    title: '模式',
    children:[
      { key: 'light', label: '白天模式 (LIGHT)' },
      { key: 'dark', label: '暗黑节点 (DARK)' },
    ],
  },
  {
    key: 'language',
    icon: () => h(GlobalOutlined),
    label: '语言',
    title: '语言',
    children:[
      { key: 'zh-CN', label: '中文 (ZH-CN)' },
      { key: 'en-US', label: '英文 (EN-US)' },
    ],
  },
]);
</script>
<style scoped>
.tech-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 64px;
  width: 100%;
  background: rgba(0, 1, 1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(34, 211, 238, 0.15);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
  position: sticky;
  top: 0;
  z-index: 100;
}
.logo-container {
  font-family: 'Eurostile', 'JetBrains Mono', sans-serif;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
  filter: drop-shadow(0 0 10px rgba(9, 213, 244, 0.3));
}
.text1 {
  background: linear-gradient(90deg, #0cf045, #04c5fb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.text2 {
  background: linear-gradient(90deg, #22d3ee, #06b6d4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.text3 {
  background: linear-gradient(90deg, #04c9fb, #0471b5);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.cursor-blink {
  color: #22d3ee;
  font-weight: bold;
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.menu-container {
  height: 100%;
  display: flex;
  align-items: center;
}
.custom-tech-menu {
  background: transparent !important;
  border-bottom: none !important;
  line-height: 64px;
}
:deep(.ant-menu-dark .ant-menu-item),
:deep(.ant-menu-dark .ant-menu-submenu-title) {
  color: #94a3b8 !important;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  padding: 0 20px;
}
:deep(.ant-menu-dark .ant-menu-item:hover),
:deep(.ant-menu-dark .ant-menu-submenu-title:hover),
:deep(.ant-menu-dark .ant-menu-submenu-open.ant-menu-submenu-title) {
  color: #22d3ee !important;
  background-color: rgba(34, 211, 238, 0.05) !important;
  text-shadow: 0 0 8px rgba(34, 211, 238, 0.5);
}
:deep(.ant-menu-horizontal > .ant-menu-item::after),
:deep(.ant-menu-horizontal > .ant-menu-submenu::after) {
  border-bottom: 2px solid #22d3ee !important;
  transition: border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
:deep(.ant-menu-sub.ant-menu-vertical) {
  background: rgba(6, 11, 20, 0.95) !important;
  border: 1px solid rgba(34, 211, 238, 0.2) !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.8) !important;
  backdrop-filter: blur(10px);
  border-radius: 8px;
}
</style>
