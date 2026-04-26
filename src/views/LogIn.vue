<template>
  <div v-if="isLoaded" class="login-container animate-fade-in">
    <div class="meteor-shower-container pointer-events-none">
      <div v-for="i in 15" :key="'meteor-' + i" class="meteor" :style="getMeteorStyle()"></div>
    </div>
    <div class="cyber-3d-background pointer-events-none">
      <div class="sphere-container">
        <div class="sphere">
          <div v-for="i in 30" :key="i" class="ring" :style="getRingStyle(i)"></div>
          <div class="core-glow"></div>
        </div>
      </div>
    </div>
    <div class="login-box">
      <div class="login-header">
        <h2>SYSTEM LOGIN</h2>
        <p>face-recognition-system</p>
      </div>
      <a-form :model="formState" layout="vertical" class="custom-form">
        <a-form-item>
          <a-input
            v-model:value="formState.account"
            placeholder="请输入账号 / 邮箱"
            size="large"
            class="tech-input"
          >
            <template #prefix><UserOutlined style="color: rgba(0, 245, 255, 0.6)" /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password
            v-model:value="formState.password"
            placeholder="请输入密码"
            size="large"
            class="tech-input"
          >
            <template #prefix><LockOutlined style="color: rgba(0, 245, 255, 0.6)" /></template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <div class="code-wrapper">
            <a-input
              v-model:value="formState.code"
              placeholder="请输入验证码"
              size="large"
              class="tech-input code-input"
            >
              <template #prefix><SafetyOutlined style="color: rgba(0, 245, 255, 0.6)" /></template>
            </a-input>
            <a-button
              type="primary"
              size="large"
              class="send-code-btn"
              :disabled="countdown > 0"
              @click="handleSendCode"
            >
              {{ countdown > 0 ? `${countdown}秒后重发` : '发送验证码' }}
            </a-button>
          </div>
        </a-form-item>
        <a-form-item style="margin-top: 30px">
          <a-button type="primary" size="large" block class="login-btn" @click="handleLogin">
            登 录
          </a-button>
        </a-form-item>
      </a-form>
      <div class="login-footer">
        <span class="footer-link" @click="goTo('forgot')">忘记密码？</span>
        <span class="footer-link" @click="goTo('register')">用户注册</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onUnmounted, onMounted } from 'vue'
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons-vue'
const isLoaded = ref(false)
onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 50)
})
const formState = reactive({
  account: '',
  password: '',
  code: '',
})
const countdown = ref(0)
let timer: number | null = null
const handleSendCode = () => {
  if (countdown.value > 0) return
  countdown.value = 59
  timer = window.setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer as number)
      timer = null
    }
  }, 1000)
}
const handleLogin = () => {
  console.log('提交的登录数据:', formState)
}
const goTo = (type: string) => {
  if (type === 'forgot') {
    console.log('跳转到忘记密码页')
  } else {
    console.log('跳转到注册页')
  }
}
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
const getRingStyle = (index: number) => {
  const rotateY = index * 12 + 'deg'
  const rotateX = index * 6 + 'deg'
  const delay = index * -0.2 + 's'
  return {
    transform: `rotateY(${rotateY}) rotateX(${rotateX})`,
    animationDelay: delay,
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
.login-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  width: 100%;
  background-color: #050a15;
  background-image: radial-gradient(circle at 50% 50%, rgba(0, 245, 255, 0.05) 0%, transparent 60%);
  padding-top: 12vh;
}
.login-box {
  width: 100%;
  max-width: 420px;
  padding: 40px;
  background: rgba(10, 15, 30, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(0, 245, 255, 0.3);
  box-shadow:
    0 0 20px rgba(0, 245, 255, 0.15),
    inset 0 0 10px rgba(0, 245, 255, 0.05);
  backdrop-filter: blur(10px);
}
.login-header {
  text-align: center;
  margin-bottom: 30px;
}
.login-header h2 {
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 2px;
  margin: 0 0 8px 0;
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
}
.login-header p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  margin: 0;
}
.custom-form :deep(.ant-input-affix-wrapper),
.custom-form :deep(.ant-input) {
  background: rgba(0, 245, 255, 0.05) !important;
  border: 1px solid rgba(0, 245, 255, 0.2) !important;
  color: #fff !important;
}
.custom-form :deep(.ant-input-affix-wrapper:hover),
.custom-form :deep(.ant-input-affix-wrapper-focused) {
  border-color: #00f5ff !important;
  box-shadow: 0 0 8px rgba(0, 245, 255, 0.3) !important;
}
.code-wrapper {
  display: flex;
  gap: 12px;
}
.code-input {
  flex: 1;
}
.send-code-btn {
  width: 130px;
  background: rgba(0, 245, 255, 0.1);
  border: 1px solid #00f5ff;
  color: #00f5ff;
}
.send-code-btn:hover {
  background: rgba(0, 245, 255, 0.2);
  color: #fff;
}
.send-code-btn[disabled] {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.4);
}
.login-btn {
  background: linear-gradient(90deg, #0099ff, #00f5ff);
  border: none;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 4px;
  box-shadow: 0 4px 15px rgba(0, 245, 255, 0.4);
}
.login-btn:hover {
  background: linear-gradient(90deg, #00bfff, #33ffff);
  box-shadow: 0 6px 20px rgba(0, 245, 255, 0.6);
}
.login-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.footer-link {
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
}
.footer-link:hover {
  color: #00f5ff;
  text-decoration: underline;
}
.custom-form :deep(.ant-input::placeholder) {
  color: rgba(255, 255, 255, 0.4) !important;
}
.custom-form :deep(.ant-input::-webkit-input-placeholder) {
  color: rgba(255, 255, 255, 0.4) !important;
}
.custom-form :deep(.ant-input::-moz-placeholder) {
  color: rgba(255, 255, 255, 0.4) !important;
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
.cyber-3d-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  z-index: 0;
}
.sphere-container {
  width: 500px;
  height: 500px;
  transform-style: preserve-3d;
  animation: rotateSphere 25s linear infinite;
  margin-left: -30%;
  opacity: 0.6;
}
@media (max-width: 768px) {
  .sphere-container {
    margin-left: 0;
    opacity: 0.3;
    width: 350px;
    height: 350px;
  }
}
.sphere {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}
.ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px dashed rgba(0, 245, 255, 0.2);
  box-shadow:
    0 0 15px rgba(0, 245, 255, 0.05),
    inset 0 0 15px rgba(0, 245, 255, 0.05);
  transform-origin: center;
  animation: pulseRing 4s ease-in-out infinite alternate;
}
.ring::before {
  content: '';
  position: absolute;
  top: -2px;
  left: 50%;
  width: 4px;
  height: 4px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow:
    0 0 10px 2px #00f5ff,
    0 0 20px 4px #0099ff;
}
.core-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(0, 245, 255, 0.4) 0%,
    rgba(0, 153, 255, 0.1) 40%,
    transparent 70%
  );
  filter: blur(20px);
  animation: corePulse 3s ease-in-out infinite alternate;
}
@keyframes rotateSphere {
  0% {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg) rotateZ(180deg);
  }
}
@keyframes pulseRing {
  0% {
    transform: scale(0.95);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.05);
    opacity: 1;
  }
}
@keyframes corePulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 1;
  }
}
.data-stream-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.05;
  background-image:
    repeating-linear-gradient(
      to bottom,
      transparent 0%,
      transparent 50%,
      #00f5ff 50%,
      #00f5ff 100%
    ),
    repeating-linear-gradient(to right, #000 0%, #000 90%, transparent 90%, transparent 100%);
  background-size:
    2px 4px,
    20px 100%;
  animation: dataStream 10s linear infinite;
  pointer-events: none;
}
@keyframes dataStream {
  0% {
    background-position:
      0 0,
      0 0;
  }
  100% {
    background-position:
      0 1000px,
      0 0;
  }
}
.global-scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: rgba(0, 245, 255, 0.8);
  box-shadow: 0 0 20px 5px rgba(0, 245, 255, 0.4);
  z-index: 5;
  opacity: 0.6;
  animation: scanDown 6s ease-in-out infinite;
  pointer-events: none;
}
@keyframes scanDown {
  0% {
    top: -10%;
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    top: 110%;
    opacity: 0;
  }
}
.login-box {
  width: 100%;
  max-width: 420px;
  padding: 40px;
  background: rgba(10, 15, 30, 0.7);
  border-radius: 16px;
  border: 1px solid rgba(0, 245, 255, 0.2);
  box-shadow:
    0 0 30px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(0, 245, 255, 0.1),
    inset 0 0 15px rgba(0, 245, 255, 0.05);
  backdrop-filter: blur(12px);
  position: relative;
  overflow: hidden;
}
.glow-pointer {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  opacity: 0;
}
.login-box:hover .glow-pointer {
  opacity: 1;
}
.custom-form,
.login-header,
.login-footer {
  position: relative;
  z-index: 10;
}
.glitch-text {
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 3px;
  margin: 0 0 8px 0;
  position: relative;
  text-shadow: 0 0 15px rgba(0, 245, 255, 0.6);
}
.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  pointer-events: none;
}
.glitch-text::before {
  color: #0ff;
  z-index: -1;
  animation: glitch-anim-1 4s infinite linear alternate-reverse;
}
.glitch-text::after {
  color: #f0f;
  z-index: -2;
  animation: glitch-anim-2 5s infinite linear alternate-reverse;
}
@keyframes glitch-anim-1 {
  0%,
  95% {
    clip-path: inset(0 0 0 0);
    transform: translate(0);
  }
  96% {
    clip-path: inset(20% 0 80% 0);
    transform: translate(-2px, 1px);
  }
  97% {
    clip-path: inset(60% 0 10% 0);
    transform: translate(2px, -1px);
  }
  98% {
    clip-path: inset(40% 0 50% 0);
    transform: translate(-2px, 2px);
  }
  99% {
    clip-path: inset(80% 0 5% 0);
    transform: translate(2px, -2px);
  }
  100% {
    clip-path: inset(0 0 0 0);
    transform: translate(0);
  }
}
@keyframes glitch-anim-2 {
  0%,
  95% {
    clip-path: inset(0 0 0 0);
    transform: translate(0);
  }
  96% {
    clip-path: inset(10% 0 60% 0);
    transform: translate(2px, 1px);
  }
  97% {
    clip-path: inset(80% 0 20% 0);
    transform: translate(-2px, -1px);
  }
  98% {
    clip-path: inset(30% 0 40% 0);
    transform: translate(2px, 2px);
  }
  99% {
    clip-path: inset(50% 0 30% 0);
    transform: translate(-2px, -2px);
  }
  100% {
    clip-path: inset(0 0 0 0);
    transform: translate(0);
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
