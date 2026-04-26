<template>
  <div class="intro-container">
    <!-- 动态背景 -->
    <div class="cyber-background">
      <div class="grid-overlay"></div>
      <div class="particles"></div>
    </div>

    <!-- 主要内容 -->
    <div class="intro-content">
      <div class="title-section">
        <h1 class="main-title">
          <span class="glitch" data-text="Cross-Time">Cross-Time</span>
          <span class="glitch" data-text="Facial Recognition">Facial Recognition</span>
          <span class="glitch" data-text="Tech">Tech</span>
        </h1>
        <p class="subtitle">跨时空面部识别技术 · 连接过去与未来</p>
      </div>

      <div class="tech-overview">
        <div class="tech-card">
          <div class="tech-icon">🧬</div>
          <h3>生物特征识别</h3>
          <p>基于深度学习的面部特征提取与匹配</p>
        </div>
        <div class="tech-card">
          <div class="tech-icon">⏰</div>
          <h3>时间域转换</h3>
          <p>跨时空面部特征对比分析</p>
        </div>
        <div class="tech-card">
          <div class="tech-icon">🔍</div>
          <h3>精准定位</h3>
          <p>毫秒级识别响应速度</p>
        </div>
      </div>

      <div class="enter-section">
        <button class="cyber-button" @click="handleEnter">
          <span class="button-text">ENTER SYSTEM</span>
          <div class="button-glitch"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleEnter = () => {
  router.push('/home');
};
</script>

<style scoped>
.intro-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
}

/* 赛博朋克背景 */
.cyber-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%,
    rgba(0, 255, 255, 0.2) 0%,
    transparent 70%);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* 主要内容 */
.intro-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.title-section {
  text-align: center;
  margin-bottom: 4rem;
}

.main-title {
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.glitch {
  display: block;
  position: relative;
  color: #fff;
  text-transform: uppercase;
  animation: glitch 3s infinite;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch::before {
  left: 2px;
  text-shadow: -2px 0 #ff00c1;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 5s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim2 5s infinite linear alternate-reverse;
}

@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

@keyframes glitch-anim {
  0% { clip: rect(31px, 9999px, 94px, 0); }
  5% { clip: rect(70px, 9999px, 71px, 0); }
  10% { clip: rect(29px, 9999px, 85px, 0); }
  15% { clip: rect(15px, 9999px, 61px, 0); }
  20% { clip: rect(91px, 9999px, 48px, 0); }
  25% { clip: rect(85px, 9999px, 41px, 0); }
  30% { clip: rect(54px, 9999px, 79px, 0); }
  35% { clip: rect(51px, 9999px, 46px, 0); }
  40% { clip: rect(42px, 9999px, 93px, 0); }
  45% { clip: rect(13px, 9999px, 75px, 0); }
  50% { clip: rect(33px, 9999px, 55px, 0); }
  55% { clip: rect(11px, 9999px, 44px, 0); }
  60% { clip: rect(66px, 9999px, 96px, 0); }
  65% { clip: rect(43px, 9999px, 58px, 0); }
  70% { clip: rect(88px, 9999px, 48px, 0); }
  75% { clip: rect(78px, 9999px, 22px, 0); }
  80% { clip: rect(85px, 9999px, 66px, 0); }
  85% { clip: rect(56px, 9999px, 97px, 0); }
  90% { clip: rect(9px, 9999px, 40px, 0); }
  95% { clip: rect(35px, 9999px, 8px, 0); }
  100% { clip: rect(76px, 9999px, 93px, 0); }
}

@keyframes glitch-anim2 {
  0% { clip: rect(65px, 9999px, 100px, 0); }
  5% { clip: rect(52px, 9999px, 75px, 0); }
  10% { clip: rect(77px, 9999px, 88px, 0); }
  15% { clip: rect(64px, 9999px, 91px, 0); }
  20% { clip: rect(26px, 9999px, 44px, 0); }
  25% { clip: rect(23px, 9999px, 84px, 0); }
  30% { clip: rect(74px, 9999px, 58px, 0); }
  35% { clip: rect(31px, 9999px, 74px, 0); }
  40% { clip: rect(9px, 9999px, 95px, 0); }
  45% { clip: rect(36px, 9999px, 99px, 0); }
  50% { clip: rect(91px, 9999px, 20px, 0); }
  55% { clip: rect(44px, 9999px, 97px, 0); }
  60% { clip: rect(9px, 9999px, 35px, 0); }
  65% { clip: rect(98px, 9999px, 61px, 0); }
  70% { clip: rect(53px, 9999px, 76px, 0); }
  75% { clip: rect(22px, 9999px, 95px, 0); }
  80% { clip: rect(61px, 9999px, 10px, 0); }
  85% { clip: rect(82px, 9999px, 39px, 0); }
  90% { clip: rect(34px, 9999px, 89px, 0); }
  95% { clip: rect(36px, 9999px, 14px, 0); }
  100% { clip: rect(78px, 9999px, 59px, 0); }
}

.subtitle {
  font-size: 1.2rem;
  color: #00fff9;
  opacity: 0.8;
  font-weight: 300;
  letter-spacing: 2px;
}

/* 技术概览 */
.tech-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  max-width: 1000px;
}

.tech-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 255, 255, 0.5);
  box-shadow: 0 10px 30px rgba(0, 255, 255, 0.2);
}

.tech-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.tech-card h3 {
  color: #00fff9;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.tech-card p {
  color: #b0b0b0;
  line-height: 1.6;
}

/* 进入按钮 */
.enter-section {
  margin-top: 2rem;
}

.cyber-button {
  position: relative;
  padding: 1.2rem 3rem;
  background: transparent;
  border: 2px solid #00fff9;
  border-radius: 8px;
  color: #00fff9;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.cyber-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.4), transparent);
  transition: left 0.5s;
}

.cyber-button:hover::before {
  left: 100%;
}

.cyber-button:hover {
  background: rgba(0, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  transform: scale(1.05);
}

.button-glitch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255, 0, 255, 0.3), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.cyber-button:hover .button-glitch {
  opacity: 1;
  animation: buttonGlitch 0.5s infinite;
}

@keyframes buttonGlitch {
  0%, 100% { transform: translate(0); }
  25% { transform: translate(-2px, 2px); }
  50% { transform: translate(2px, -2px); }
  75% { transform: translate(-1px, -1px); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tech-overview {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .main-title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>