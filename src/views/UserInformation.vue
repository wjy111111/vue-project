<template>
  <div class="meteor-shower-container pointer-events-none">
    <div v-for="i in 15" :key="'meteor-' + i" class="meteor" :style="getMeteorStyle()"></div>
  </div>
  <div v-if="isLoaded" class="user-profile-container animate-fade-in">
    <div class="three-d-background">
      <div class="floating-cube cube-1"></div>
      <div class="floating-cube cube-2"></div>
      <div class="floating-cube cube-3"></div>
      <div class="particle particle-1" :style="getParticleStyle()"></div>
      <div class="particle particle-2" :style="getParticleStyle()"></div>
      <div class="particle particle-3" :style="getParticleStyle()"></div>
      <div class="particle particle-4" :style="getParticleStyle()"></div>
      <div class="particle particle-5" :style="getParticleStyle()"></div>
    </div>
    <div class="profile-header">
      <div class="cover-photo">
        <div class="cover-overlay"></div>
        <div class="cover-glow animate-pulse-slow"></div>
        <div class="cover-glow-delayed animate-pulse-slow-delayed"></div>
        <div class="floating-element element-1"></div>
        <div class="floating-element element-2"></div>
      </div>
      <div class="user-core-info">
        <div class="avatar-wrapper">
          <a-avatar :size="100" src="https://joeschmoe.io/api/v1/random" class="tech-avatar" />
          <div class="vip-badge">User</div>
        </div>
        <div class="user-text-info">
          <h1 class="nickname">
            Neon_Walker
            <SafetyCertificateTwoTone
              two-tone-color="#00f5ff"
              style="font-size: 20px; margin-left: 8px"
            />
          </h1>
          <p class="bio">
            “Carbon-based dreams in a silicon-based world, decoding the whispers of the future.”
          </p>
          <div class="tags-row">
            <a-tag color="rgb(0, 255, 0)">UID: 1008611</a-tag>
            <a-tag color="rgb(0, 0, 255)">♂ 男</a-tag>
            <a-tag color="rgb(255, 165, 0)">24岁 (狮子座)</a-tag>
            <a-tag color="rgb(255, 0, 0)"><EnvironmentOutlined /> China</a-tag>
          </div>
        </div>
      </div>
      <div class="stats-bar">
        <div class="stat-item" v-for="(stat, index) in stats" :key="index">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
    <div class="profile-content">
      <a-tabs v-model:activeKey="activeTab" class="tech-tabs">
        <a-tab-pane key="2" tab="账号与安全">
          <div class="tech-card">
            <a-list item-layout="horizontal" :data-source="securityList" class="tech-list">
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-list-item-meta :description="item.desc">
                    <template #title>
                      <span style="color: #fff">{{ item.title }}</span>
                    </template>
                    <template #avatar>
                      <component :is="item.icon" class="list-icon" :style="{ color: item.color }" />
                    </template>
                  </a-list-item-meta>
                  <template #actions>
                    <a-button type="link" class="tech-link">{{ item.action }}</a-button>
                  </template>
                </a-list-item>
              </template>
            </a-list>
          </div>
        </a-tab-pane>
        <a-tab-pane key="4" tab="系统偏好">
          <div class="tech-card">
            <a-row :gutter="40">
              <a-col :span="12">
                <h3 class="card-title"><BellOutlined /> 通知与隐私</h3>
                <div class="setting-item">
                  <span>系统公告推送</span> <a-switch v-model:checked="settings.sysNotify" />
                </div>
                <div class="setting-item">
                  <span>向他人展示在线状态</span>
                  <a-switch v-model:checked="settings.onlineStatus" />
                </div>
                <div class="setting-item">
                  <span>允许通过手机号搜到我</span>
                  <a-switch v-model:checked="settings.searchByPhone" />
                </div>
              </a-col>
              <a-col :span="12">
                <h3 class="card-title"><SettingOutlined /> 通用设置</h3>
                <div class="setting-item">
                  <span>深色模式 </span> <a-switch v-model:checked="settings.darkMode" disabled />
                </div>
                <div class="setting-item">
                  <span>系统语言</span>
                  <a-select
                    v-model:value="settings.lang"
                    size="small"
                    style="width: 100px"
                    class="tech-select"
                  >
                    <a-select-option value="zh">中文 (简)</a-select-option>
                    <a-select-option value="en">English</a-select-option>
                  </a-select>
                </div>
                <div class="setting-item">
                  <span>本地缓存 (245MB)</span>
                  <a-button size="small" danger ghost>清理缓存</a-button>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {
  EnvironmentOutlined,
  SafetyCertificateTwoTone,
  MobileOutlined,
  MailOutlined,
  WechatOutlined,
  LockOutlined,
  ScanOutlined,
  BellOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'
const activeTab = ref('4')
const isLoaded = ref(false)
onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 50)
})
const stats = [
  { label: '使用次数 (Usage Count)', value: '120' },
  { label: '图片贡献数 (Image Contributions)', value: '86' },
  { label: '查找成功率 (Search Success Rate)', value: '99.3%' },
]
const securityList = [
  {
    icon: MobileOutlined,
    color: '#00f5ff',
    title: '手机号绑定',
    desc: '+86 138****8888',
    action: '修改',
  },
  {
    icon: MailOutlined,
    color: '#00f5ff',
    title: '电子邮箱',
    desc: 'neon_***@cyber.com',
    action: '修改',
  },
  { icon: WechatOutlined, color: '#07c160', title: '微信绑定', desc: '未绑定', action: '去绑定' },
  {
    icon: LockOutlined,
    color: '#ff4d4f',
    title: '登录密码',
    desc: '上次修改于 30 天前',
    action: '重置',
  },
  {
    icon: ScanOutlined,
    color: '#faad14',
    title: '双重验证 (2FA)',
    desc: '已开启身份验证器',
    action: '管理',
  },
]
const settings = reactive({
  sysNotify: true,
  onlineStatus: true,
  searchByPhone: false,
  darkMode: true,
  lang: 'zh',
})
const getParticleStyle = () => {
  const random = Math.random
  return {
    left: `${random() * 100}%`,
    top: `${random() * 100}%`,
    width: `${random() * 4 + 2}px`,
    height: `${random() * 4 + 2}px`,
    animationDelay: `${random() * 20}s`,
    animationDuration: `${random() * 10 + 10}s`,
  }
}
const getMeteorStyle = () => {
  const left = Math.floor(Math.random() * 150) - 20 + '%'
  const top = Math.floor(Math.random() * -30) - 10 + '%'
  const delay = (Math.random() * 8).toFixed(2) + 's'
  const duration = (Math.random() * 2 + 1.5).toFixed(2) + 's'
  return {
    left,
    top,
    animationDelay: delay,
    animationDuration: duration,
  }
}
</script>
<style scoped>
.user-profile-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  min-height: calc(100vh - 40px);
  padding-bottom: 40px;
  color: #fff;
  top: 0;
  position: relative;
  z-index: 1;
}
.profile-header {
  position: relative;
  background: rgba(10, 15, 30, 0.6);
  border-radius: 16px;
  border: 1px solid rgba(0, 245, 255, 0.2);
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 245, 255, 0.1);
  margin-bottom: 24px;
  transition: all 0.3s ease;
}
.profile-header:hover {
  box-shadow: 0 0 30px rgba(0, 245, 255, 0.2);
  transform: translateY(-2px);
}
.cover-photo {
  height: 200px;
  background: url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')
    no-repeat center center;
  background-size: cover;
  position: relative;
}
.cover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(5, 10, 21, 0) 0%, #050a15 100%);
}
.user-core-info {
  display: flex;
  padding: 0 40px;
  margin-top: -50px;
  position: relative;
  z-index: 2;
}
.avatar-wrapper {
  position: relative;
  margin-right: 24px;
}
.tech-avatar {
  border: 3px solid #050a15;
  box-shadow: 0 0 15px rgba(0, 245, 255, 0.8);
  background-color: #000;
}
.vip-badge {
  position: absolute;
  bottom: 0;
  right: -10px;
  background: linear-gradient(90deg, #ff00ff, #00f5ff);
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 10px;
  border: 2px solid #050a15;
}
.user-text-info {
  flex: 1;
  padding-top: 50px;
}
.nickname {
  color: #fff;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 8px;
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.4);
}
.bio {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin-bottom: 12px;
}
.tags-row .ant-tag {
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.2);
}
.stats-bar {
  display: flex;
  justify-content: space-around;
  padding: 24px 40px;
  border-top: 1px solid rgba(0, 245, 255, 0.1);
  margin-top: 24px;
  background: rgba(0, 245, 255, 0.02);
}
.stat-item {
  text-align: center;
}
.stat-value {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #00f5ff;
  font-family: 'Courier New', Courier, monospace;
}
.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}
.tech-card {
  background: rgba(10, 15, 30, 0.6);
  border: 1px solid rgba(0, 245, 255, 0.2);
  border-radius: 12px;
  padding: 24px;
  min-height: 250px;
  box-shadow: inset 0 0 15px rgba(0, 245, 255, 0.05);
  backdrop-filter: blur(10px);
}
.card-title {
  color: #00f5ff;
  margin-bottom: 20px;
  font-size: 16px;
  border-bottom: 1px dashed rgba(0, 245, 255, 0.3);
  padding-bottom: 10px;
}
.badge-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.badge-item img {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
}
.badge-item span {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}
.tech-desc :deep(.ant-descriptions-item-label) {
  color: rgba(255, 255, 255, 0.5);
}
.tech-desc :deep(.ant-descriptions-item-content) {
  color: #fff;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
}
.list-icon {
  font-size: 20px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
}
.tech-list :deep(.ant-list-item) {
  border-bottom: 1px solid rgba(0, 245, 255, 0.1);
}
.tech-link {
  color: #00f5ff;
}
.mini-card {
  min-height: 180px;
  padding: 16px;
}
.mini-title {
  color: #fff;
  margin-bottom: 16px;
  font-weight: bold;
}
.flex-between {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 13px;
}
.text-gray {
  color: rgba(255, 255, 255, 0.5);
}
.text-cyan {
  color: #00f5ff;
}
.text-glow {
  color: #00f5ff;
  text-shadow: 0 0 5px #00f5ff;
  font-weight: bold;
}
.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.8);
}
.tech-tabs :deep(.ant-tabs-nav::before) {
  border-bottom: 1px solid rgba(0, 245, 255, 0.2);
}
.tech-tabs :deep(.ant-tabs-tab) {
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
}
.tech-tabs :deep(.ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: #00f5ff !important;
  text-shadow: 0 0 8px rgba(0, 245, 255, 0.5);
}
.tech-tabs :deep(.ant-tabs-ink-bar) {
  background: #00f5ff;
  box-shadow: 0 0 10px #00f5ff;
}
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.meteor-shower-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}
.meteor {
  position: absolute;
  width: 2px;
  height: 120px;
  background: linear-gradient(to top, rgba(0, 245, 255, 1), transparent);
  transform: rotate(45deg);
  opacity: 0;
  animation: meteorFall linear infinite;
  box-shadow: 0 0 10px 1px rgba(0, 245, 255, 0.3);
  border-radius: 50%;
}
.meteor::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 15px 3px #00f5ff;
}
@keyframes meteorFall {
  0% {
    transform: rotate(45deg) translateY(-200px);
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    transform: rotate(45deg) translateY(1800px);
    opacity: 0;
  }
}
</style>
