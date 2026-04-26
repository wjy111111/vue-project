<template>
  <div class="startup-container min-h-screen relative overflow-hidden bg-[#060913]">
    <div class="background-layers">
      <div class="stars fixed inset-0">
        <div v-for="i in 100" :key="'star-' + i" class="star" :style="getStarStyle()"></div>
      </div>
      <div class="meteor-shower fixed inset-0">
        <div v-for="i in 20" :key="'meteor-' + i" class="meteor" :style="getMeteorStyle()"></div>
      </div>
      <div class="glow-layers">
        <div class="glow-1 absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow"></div>
        <div class="glow-2 absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-900/20 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow-delayed"></div>
        <div class="glow-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-purple-900/10 blur-[150px] rounded-full mix-blend-screen"></div>
      </div>
      <div class="particles fixed inset-0">
        <div v-for="i in 50" :key="'particle-' + i" class="particle" :style="getParticleStyle()"></div>
      </div>
      <div class="scan-line fixed inset-0 bg-linear-to-b from-transparent via-cyan-400/5 to-transparent animate-scan"></div>
    </div>
<div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 overflow-hidden">
  <div class="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
    <div class="tech-grid-bg w-[200%] h-[200%]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#040814_70%)]"></div>
  </div>
  <div class="relative z-10 flex items-center justify-center w-72 h-72 mb-16 -mt-24 animate-fade-in-up">
    <div class="absolute w-56 h-56 border-2 border-dashed border-cyan-500/40 rounded-full animate-[spin_10s_linear_infinite]"></div>
    <div class="absolute w-44 h-44 border-[3px] border-transparent border-t-cyan-400 border-b-blue-500 rounded-full animate-[spin_3s_linear_infinite_reverse] opacity-80"></div>
    <div class="absolute w-32 h-32 border border-purple-500/50 rounded-full animate-pulse shadow-[0_0_20px_rgba(168,85,247,0.4)]"></div>
    <div class="relative z-10 w-24 h-24 bg-[#040814] rounded-full flex items-center justify-center border border-cyan-400/50 shadow-[0_0_30px_rgba(0,245,255,0.3)]">
      <span class="text-3xl font-black text-transparent bg-clip-text bg-linear-to-br from-white to-cyan-400 tracking-tighter">AIFR</span>
    </div>
    <div class="absolute w-72 h-72">
      <div class="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400"></div>
      <div class="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400"></div>
      <div class="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400"></div>
      <div class="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400"></div>
    </div>
  </div>
  <div class="text-center mb-16 relative z-10 animate-fade-in-up-delayed w-full max-w-4xl">
    <div class="text-cyan-500/70 font-mono text-[11px] tracking-[0.4em] uppercase mb-6 flex items-center justify-center gap-2">
      <span class="w-2 h-2 bg-cyan-500 rounded-full animate-ping"></span>
      Secure Connection Established
    </div>
    <h1 class="text-4xl md:text-6xl font-black text-white mb-6 tracking-widest font-euro uppercase leading-snug">
      <span class="inline-block transition-transform duration-300 drop-shadow-[0_0_15px_rgba(0,245,255,0.4)]">
        Age-Invariant
      </span><br/>
      <span class="inline-block text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 pb-2">
        Face Recognition
      </span>
    </h1>
    <p class="text-sm md:text-lg text-slate-400 font-mono tracking-[0.25em] mt-4 uppercase opacity-80">[ 跨时间域生物面部识别系统
    </p>
  </div>
  <div class="w-full max-w-lg mb-16 relative z-10 animate-fade-in-up-delayed-2">
    <div class="flex justify-between text-[11px] font-mono text-cyan-400 mb-3 uppercase tracking-widest">
      <span class="typing-effect overflow-hidden whitespace-nowrap">{{ isStarting ? 'SYS.BOOTING_NEURAL_NET...' : 'SYSTEM_READY_FOR_INPUT' }}</span>
      <span class="text-blue-400">v 1.0</span>
    </div>
    <div class="relative w-full h-2 bg-slate-800/80 rounded-full overflow-hidden border border-cyan-900/50 shadow-inner">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBsNDAtNDBINHptNDAgMGwtNDAtNDB2NHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] z-10"></div>
      <div class="h-full bg-linear-to-r from-cyan-500 to-blue-500 shadow-[0_0_20px_#00f5ff] transition-all duration-2000 ease-out"
           :style="{ width: isStarting ? '100%' : '100%' }">
        <div class="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-r from-transparent to-white/60 blur-[3px] animate-[slideRight_1.5s_infinite]"></div>
      </div>
    </div>
    <div class="mt-4 text-[10px] text-slate-500 font-mono flex justify-between opacity-60 tracking-wider">
      <span></span>
      <span>SECURE_ENCRYPTED</span>
      <span></span>
    </div>
  </div>
  <div class="relative z-10 animate-fade-in-up-delayed-3 mt-6">
    <div class="absolute -inset-2 bg-cyan-500/30 rounded-full blur-xl animate-pulse-slow"></div>
    <button
      @click="enterSystem"
      :disabled="isStarting"
      class="epic-enter-btn group relative flex items-center justify-center gap-2 px-16 py-5 rounded-full font-euro font-bold tracking-[0.3em] uppercase overflow-hidden transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div class="absolute inset-0 bg-[#040814]/80 backdrop-blur-md border-2 border-cyan-400/50 rounded-full transition-all duration-500 group-hover:bg-cyan-500/10 group-hover:border-cyan-300"></div>
      <div class="absolute inset-0 w-[200%] h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-button-sweep"></div>
      <span class="relative z-10 ml-4 text-cyan-300 group-hover:text-white transition-colors duration-300 text-sm md:text-base">
        {{ isStarting ? 'AUTHORIZING...' : 'ENTER SYSTEM' }}
      </span>
      <svg class="relative z-10 w-8 h-8 mr-4 text-cyan-300 group-hover:text-white transition-all duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    </button>
  </div>
</div></div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const isStarting = ref(false)
const getStarStyle = () => {
  const random = Math.random
  return {
    left: `${random() * 100}%`,
    top: `${random() * 100}%`,
    width: `${random() * 3 + 1}px`,
    height: `${random() * 3 + 1}px`,
    animationDelay: `${random() * 10}s`,
    animationDuration: `${random() * 10 + 10}s`,
  }
}
const getMeteorStyle = () => {
  return {
    left: `${Math.floor(Math.random() * 150) - 20}%`,
    top: `${Math.floor(Math.random() * -30) - 10}%`,
    animationDelay: `${Math.random() * 8}s`,
    animationDuration: `${Math.random() * 2 + 1.5}s`,
  }
}
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
const enterSystem = () => {
  if (isStarting.value) return
  isStarting.value = true
  const overlay = document.createElement('div')
  overlay.style.cssText =
    'position: fixed; inset: 0; z-index: 9999; pointer-events: none; overflow: hidden;'
  const styleBlock = document.createElement('style')
  styleBlock.innerHTML = `
    @keyframes cyber-typing { from { width: 0 } to { width: 100% } }
    @keyframes cyber-blink { 50% { border-color: transparent } }
    .cyber-loader-text {
       display: inline-block;
       overflow: hidden;
       white-space: nowrap;
       border-right: 3px solid #00f5ff;
       animation: cyber-typing 0.6s steps(30, end) forwards, cyber-blink 0.5s step-end infinite;
       color: #00f5ff;
       font-family: 'JetBrains Mono', 'Courier New', monospace;
       font-size: 22px;
       font-weight: 900;
       letter-spacing: 3px;
       text-shadow: 0 0 15px rgba(0,245,255,0.8);
    }
  `
  overlay.appendChild(styleBlock)
  const layer1 = document.createElement('div')
  layer1.style.cssText =
    'position: absolute; inset: 0; background: #00f5ff; transform: translateX(-100%); transition: transform 0.5s cubic-bezier(0.85, 0, 0.15, 1); mix-blend-mode: screen;'
  const layer2 = document.createElement('div')
  layer2.style.cssText =
    'position: absolute; inset: 0; background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(12px); border-right: 2px solid #a855f7; transform: translateX(-100%); transition: transform 0.7s cubic-bezier(0.85, 0, 0.15, 1);'
  const layer3 = document.createElement('div')
  layer3.style.cssText =
    'position: absolute; inset: 0; background: #040814; border-right: 1px solid #00f5ff; box-shadow: 10px 0 30px rgba(0,245,255,0.2); transform: translateX(-100%); transition: transform 0.9s cubic-bezier(0.85, 0, 0.15, 1); display: flex; align-items: center; justify-content: center;'
  const textContainer = document.createElement('div')
  const textNode = document.createElement('div')
  textNode.className = 'cyber-loader-text'
  textNode.innerText = 'ACCESSING CENTRAL NODE...'
  textContainer.appendChild(textNode)
  layer3.appendChild(textContainer)
  overlay.appendChild(layer1)
  overlay.appendChild(layer2)
  overlay.appendChild(layer3)
  document.body.appendChild(overlay)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      layer1.style.transform = 'translateX(0)'
      layer2.style.transform = 'translateX(0)'
      layer3.style.transform = 'translateX(0)'
    })
  })
  setTimeout(() => {
    textNode.innerText = 'ACCESS GRANTED'
    textNode.style.color = '#4ade80'
    textNode.style.textShadow = '0 0 20px rgba(74,222,128,0.8)'
    textNode.style.borderRightColor = '#4ade80'
    setTimeout(() => {
      router.push('/home').then(() => {
        layer3.style.transition = 'transform 0.7s cubic-bezier(0.85, 0, 0.15, 1)'
        layer2.style.transition = 'transform 0.8s cubic-bezier(0.85, 0, 0.15, 1)'
        layer1.style.transition = 'transform 0.9s cubic-bezier(0.85, 0, 0.15, 1)'
        layer3.style.transform = 'translateX(100%)'
        layer2.style.transform = 'translateX(100%)'
        layer1.style.transform = 'translateX(100%)'
        setTimeout(() => {
          document.body.removeChild(overlay)
          isStarting.value = false
        }, 900)
      })
    }, 400)
  }, 1100)
}
onMounted(() => {
})
</script>
<style scoped>
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.1);
  }
}
.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}
.animate-pulse-slow-delayed {
  animation: pulse-slow 6s ease-in-out 2s infinite;
}
@keyframes scan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}
.animate-scan {
  animation: scan 3s linear infinite;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}
.animate-fade-in-up-delayed {
  animation: fadeInUp 1s ease-out 0.5s forwards;
  opacity: 0;
}
.animate-fade-in-up-delayed-2 {
  animation: fadeInUp 1s ease-out 1s forwards;
  opacity: 0;
}
.animate-fade-in-up-delayed-3 {
  animation: fadeInUp 1s ease-out 1.5s forwards;
  opacity: 0;
}
@keyframes loadingBar {
  0% {
    width: 0%;
  }
  50% {
    width: 70%;
  }
  100% {
    width: 100%;
  }
}
.animate-loading-bar {
  animation: loadingBar 2s ease-in-out forwards;
}
.star {
  position: absolute;
  background: #fff;
  border-radius: 50%;
  opacity: 0;
  animation: twinkle linear infinite;
}
@keyframes twinkle {
  0%,
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
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
.particle {
  position: absolute;
  background: rgba(0, 245, 255, 0.3);
  border-radius: 50%;
  animation: float linear infinite;
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) translateX(0px);
    opacity: 0;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    transform: translateY(-20px) translateX(10px);
    opacity: 0.3;
  }
  75% {
    opacity: 0.5;
  }
}
.enter-btn:hover {
  box-shadow: 0 0 30px rgba(0, 245, 255, 0.8);
  transform: scale(1.05);
}
@media (max-width: 768px) {
  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 1.2rem;
  }
}
.font-euro {
  font-family: 'Eurostile', 'Exo 2', 'Orbitron', sans-serif;
}
.tech-grid-bg {
  background-image:
    linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  transform: perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px);
  animation: gridMove 20s linear infinite;
}
@keyframes gridMove {
  0% {
    transform: perspective(500px) rotateX(60deg) translateY(0) translateZ(-200px);
  }
  100% {
    transform: perspective(500px) rotateX(60deg) translateY(40px) translateZ(-200px);
  }
}
@keyframes slideRight {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(300%);
  }
}
.typing-effect {
  border-right: 2px solid #00f5ff;
  animation: blink-cursor 0.75s step-end infinite;
  padding-right: 4px;
}
@keyframes blink-cursor {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #00f5ff;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
    filter: blur(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-fade-in-up-delayed {
  opacity: 0;
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
}
.animate-fade-in-up-delayed-2 {
  opacity: 0;
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
}
.animate-fade-in-up-delayed-3 {
  opacity: 0;
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards;
}
.epic-enter-btn {
  box-shadow:
    0 0 20px rgba(0, 245, 255, 0.2),
    inset 0 0 20px rgba(0, 245, 255, 0.1);
}
.epic-enter-btn:hover {
  box-shadow:
    0 0 30px rgba(0, 245, 255, 0.6),
    inset 0 0 30px rgba(0, 245, 255, 0.3);
  transform: translateY(-3px) scale(1.02);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}
@keyframes buttonSweep {
  0% { transform: translateX(-100%) skewX(-15deg); }
  100% { transform: translateX(50%) skewX(-15deg); }
}
.group:hover .group-hover\:animate-button-sweep {
  animation: buttonSweep 1.5s ease-in-out infinite;
}
</style>
