<script setup lang="ts">
import { ref, reactive, onUnmounted, computed, onMounted } from 'vue'
import {
  Upload,
  Scan,
  ChevronDown,
  ChevronUp,
  Download,
  RefreshCcw,
  Info,
  CheckCircle2,
  X,
  Search,
  Crosshair,
  Activity
} from 'lucide-vue-next'
const galleryImages = Array.from({ length: 20 }).map((_, i) => {
  const ages =[8, 6, 7, 9, 7, 6, 8, 7, 10, 11, 6, 9, 10, 8, 12, 6, 8, 9, 7, 10]
  return {
    id: `3-${i + 1}`,
    age: ages[i],
    url: new URL(`../assets/3-${i + 1}.JPG`, import.meta.url).href,
  }
})
const isLoaded = ref(false)
onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 50)
})
const searchQuery = ref('')
const filteredGallery = computed(() => {
  if (!searchQuery.value) return galleryImages
  const query = searchQuery.value.toLowerCase().trim()
  return galleryImages.filter(
    (img) => img.id.toLowerCase().includes(query) || (img.age !== undefined && img.age.toString() === query),
  )
})
const isGalleryOpen = ref(true)
const selectedImage = ref<string | null>(null)
const isProcessing = ref(false)
const showResults = ref(false)
const progressValue = ref(0)
let progressTimer: number | null = null
const imageOptions = ['3-1-1', '3-1-2']
const activeImage = ref('3-1-1')
const recognitionResult = reactive({
  gender: '---',
  age: '---',
  expression: '---',
  glasses: '---',
  beard: '---',
  lighting: '---',
})
const handleSelectFromGallery = (url: string) => {
  selectedImage.value = url
  resetState()
  setTimeout(() => {
    const mainAnalysisSection = document.querySelector('main')
    if (mainAnalysisSection) {
      mainAnalysisSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, 100)
}
const fileInput = ref<HTMLInputElement | null>(null)
const handleLocalUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    selectedImage.value = URL.createObjectURL(file)
    resetState()
  }
}
const startRecognition = () => {
  if (!selectedImage.value || isProcessing.value) return
  isProcessing.value = true
  showResults.value = false
  progressValue.value = 0
  progressTimer = window.setInterval(() => {
    progressValue.value += Math.floor(Math.random() * 15) + 5
    if (progressValue.value >= 100) {
      progressValue.value = 100
      finishRecognition()
    }
  }, 200)
}
const finishRecognition = () => {
  if (progressTimer) clearInterval(progressTimer)
  setTimeout(() => {
    isProcessing.value = false
    showResults.value = true
    activeImage.value = '3-1-1'
    Object.assign(recognitionResult, {
      gender: Math.random() > 0.5 ? 'MALE' : 'FEMALE',
      age: 'MULTI-PHASE',
      expression: 'NEUTRAL',
      glasses: Math.random() > 0.7 ? 'DETECTED' : 'NONE',
      beard: Math.random() > 0.8 ? 'DETECTED' : 'NONE',
      lighting: 'OPTIMAL',
    })
  }, 500)
}
const resetState = () => {
  isProcessing.value = false
  showResults.value = false
  progressValue.value = 0
  activeImage.value = '3-1-1'
  if (progressTimer) clearInterval(progressTimer)
  Object.assign(recognitionResult, {
    gender: '---',
    age: '---',
    expression: '---',
    glasses: '---',
    beard: '---',
    lighting: '---',
  })
}
const clearAll = () => {
  selectedImage.value = null
  resetState()
}
const getImageUrl = (imageName: string) => {
  return new URL(`../assets/${imageName}.JPG`, import.meta.url).href
}
onUnmounted(() => {
  if (progressTimer) clearInterval(progressTimer)
})
const getMeteorStyle = () => {
  const left = Math.floor(Math.random() * 150) - 20 + '%'
  const top = Math.floor(Math.random() * -30) - 10 + '%'
  const delay = (Math.random() * 8).toFixed(2) + 's'
  const duration = (Math.random() * 2 + 1.5).toFixed(2) + 's'
  return { left, top, animationDelay: delay, animationDuration: duration }
}
</script>
<template>
  <div
    v-if="isLoaded"
    class="min-h-screen bg-[#04060d] text-slate-300 font-sans p-4 md:p-6 lg:p-8 animate-fade-in relative overflow-x-hidden"
  >
    <div class="fixed inset-0 z-0 pointer-events-none opacity-[0.15]">
      <div class="tech-grid-bg w-full h-full"></div>
    </div>
    <div class="meteor-shower-container pointer-events-none">
      <div v-for="i in 15" :key="'meteor-' + i" class="meteor" :style="getMeteorStyle()"></div>
    </div>
    <div
      class="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
      style="
        background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');
      "
    ></div>
    <div class="max-w-375 mx-auto space-y-6 relative z-10">
      <header
        class="glass-panel flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-5 md:p-6 rounded-xl relative shadow-[0_0_40px_rgba(0,0,0,0.5)] border-t border-cyan-500/30 border-b "
      >
        <div class="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-cyan-400/80 rounded-tl-xl"></div>
        <div class="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-indigo-400/80 rounded-br-xl"></div>
        <div class="relative z-10 flex items-center gap-5">
          <div class="w-1.5 h-14 bg-linear-to-b from-cyan-400 to-indigo-500 rounded-full neon-glow"></div>
          <div class="group">
            <h1
              class="text-2xl md:text-[28px] font-euro font-black tracking-widest text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-200 to-slate-400 drop-shadow-sm transition-all duration-300 group-hover:from-cyan-100 group-hover:via-white group-hover:to-cyan-100 glitch-hover"
            >
              MISSING POPULATION RETRIEVAL
            </h1>
            <p
              class="text-[11px] font-mono text-cyan-500/90 mt-1.5 uppercase tracking-[0.4em] flex items-center gap-3 font-semibold"
            >
              Cross-Time Facial Node
              <span class="flex gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" style="animation-delay: 0.2s"></span>
              </span>
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4 relative z-10">
          <button
            @click="fileInput?.click()"
            class="glow-btn-cyber btn-cyber px-6 py-3 rounded-lg font-euro font-bold tracking-[0.2em] text-[11px] transition-all duration-300 flex items-center gap-3 shadow-xl relative overflow-hidden"
            :class="
              selectedImage
                ? 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                : 'bg-black/60 border border-slate-700/80 text-slate-300 hover:border-cyan-500/60 hover:text-cyan-300 hover:-translate-y-0.5 active:translate-y-0'
            "
          >
            <Upload
              :size="16"
              class="transition-transform duration-300"
              :class="{ 'group-hover:scale-110 text-cyan-400': !selectedImage }"
            />
            <span>LOCAL UPLOAD</span>
            <input type="file" ref="fileInput" class="hidden" @change="handleLocalUpload" accept="image/*" />
          </button>
          <button
            @click="isGalleryOpen = !isGalleryOpen"
            class="glow-btn-cyber btn-cyber px-6 py-3 rounded-lg font-euro font-bold tracking-[0.2em] text-[11px] transition-all duration-300 flex items-center gap-3 shadow-xl"
            :class="
              isGalleryOpen
                ? 'bg-indigo-950/60 border border-indigo-500/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                : 'bg-black/60 border border-slate-700/80 text-slate-300 hover:border-indigo-500/60 hover:text-indigo-300 hover:-translate-y-0.5 active:translate-y-0'
            "
          >
            <component
              :is="isGalleryOpen ? ChevronUp : ChevronDown"
              :size="16"
              class="transition-all duration-300"
              :class="{ 'rotate-180': isGalleryOpen }"
            />
            <span>{{ isGalleryOpen ? 'CLOSE DB' : 'OPEN DB' }}</span>
          </button>
        </div>
      </header>
      <Transition name="expand">
        <div v-show="isGalleryOpen" class="glass-panel p-6 md:p-8 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] relative border border-slate-800">
          <div class="absolute top-0 right-10 w-32 h-1 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div class="flex items-center gap-3 group">
              <div class="w-1.5 h-6 bg-indigo-500 rounded-sm group-hover:h-8 transition-all duration-300 shadow-[0_0_10px_#6366f1]"></div>
              <h3 class="text-sm font-euro font-bold text-white tracking-[0.3em] uppercase transition-colors duration-300 drop-shadow-md">
                DATABASE
              </h3>
              <span class="ml-2 px-2.5 py-1 bg-black/60 rounded text-[10px] font-mono text-indigo-300 border border-indigo-500/30 shadow-inner">
                {{ filteredGallery.length }} RECORDS
              </span>
            </div>
            <div class="flex items-center gap-3 px-4 py-2.5 bg-black/80 border border-slate-700 focus-within:border-cyan-500 rounded-lg transition-all duration-300 group shadow-inner">
              <Search :size="16" class="text-slate-500 group-focus-within:text-cyan-400 transition-transform duration-300" />
              <input
                v-model="searchQuery"
                placeholder="SEARCH ID OR AGE..."
                class="bg-transparent border-none outline-none text-[13px] text-white font-mono w-48 sm:w-64 placeholder:text-slate-600 focus:placeholder:opacity-30"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 max-h-90 overflow-y-auto no-scrollbar pr-2 pb-4 pt-2">
            <div
              v-for="img in filteredGallery"
              :key="img.id"
              @click="handleSelectFromGallery(img.url)"
              class="group cursor-pointer flex flex-col gap-3 relative"
            >
              <div
                class="relative w-full aspect-4/3 rounded-lg overflow-hidden bg-[#03050a] border-2 transition-all duration-300 shadow-lg"
                :class="
                  selectedImage === img.url
                    ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-[1.02]'
                    : 'border-slate-800 hover:border-indigo-500/60 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                "
              >
                <div class="absolute inset-0 bg-linear-to-b from-transparent via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 animate-scan-vertical pointer-events-none z-10"></div>
                <img
                  :src="img.url"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  :class="selectedImage === img.url ? 'opacity-100 grayscale-0' : 'opacity-60 grayscale-60 group-hover:opacity-100 group-hover:grayscale-0'"
                />
                <div class="absolute top-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur-md rounded text-[9px] font-mono tracking-widest text-white border border-white/10 z-20">
                  RAW_IMG
                </div>
                <div v-if="selectedImage === img.url" class="absolute top-2 right-2 text-black bg-cyan-400 rounded-full z-20 shadow-[0_0_15px_#22d3ee]">
                  <CheckCircle2 :size="16" stroke-width="3" />
                </div>
              </div>
              <div class="flex items-center justify-between px-1">
                <h4 class="text-[13px] font-euro font-bold text-slate-300 group-hover:text-cyan-400 transition-colors tracking-widest">
                  {{ img.id }}
                </h4>
                <div class="flex items-center gap-1.5 px-2 py-0.5 bg-slate-900 rounded border border-slate-700/50">
                  <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]"></span>
                  <span class="text-[11px] font-bold font-mono text-slate-300">A.{{ img.age }}</span>
                </div>
              </div>
            </div>
            <div v-if="filteredGallery.length === 0" class="col-span-full py-20 flex flex-col items-center justify-center text-slate-500 gap-4">
              <Search :size="48" class="opacity-20" />
              <div class="font-euro text-sm uppercase tracking-[0.2em]">NO RECORDS MATCHING "{{ searchQuery }}"</div>
            </div>
          </div>
        </div>
      </Transition>
      <main class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-150">
        <div class="lg:col-span-8 glass-panel border border-slate-800 relative rounded-xl overflow-hidden flex flex-col shadow-2xl bg-[#03050a]/60">
          <div class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          <div v-if="!selectedImage" class="absolute inset-0 flex flex-col items-center justify-center text-slate-700 z-10 bg-[#020308]/80 backdrop-blur-sm">
            <div class="relative w-64 h-64 flex items-center justify-center mb-8">
              <div class="absolute inset-0 rounded-full border border-slate-800 animate-ping" style="animation-duration: 3s;"></div>
              <div class="absolute inset-8 rounded-full border border-cyan-900/30"></div>
              <div class="absolute inset-16 rounded-full border border-dashed border-slate-700 animate-[spin_10s_linear_infinite]"></div>
              <div class="absolute w-[120%] h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent animate-[spin_4s_linear_infinite] blur-[1px]"></div>
              <div class="w-20 h-20 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-700 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,0,0,1)] z-10 relative overflow-hidden">
                <Crosshair class="text-cyan-500/50 text-3xl mb-1 animate-pulse" />
              </div>
            </div>
            <p class="text-[14px] font-euro font-bold tracking-[0.4em] text-cyan-600/60 uppercase">
              AWAITING BIOMETRIC INPUT
            </p>
            <div class="flex gap-2 mt-4 opacity-40">
               <span class="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
               <span class="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
               <span class="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style="animation-delay: 0.3s"></span>
            </div>
          </div>
          <div v-else class="flex-1 flex flex-col md:flex-row relative">
            <div class="flex-1 relative bg-black overflow-hidden border-r border-slate-800/80 group">
              <img
                :src="selectedImage"
                class="w-full h-full object-contain md:object-cover opacity-85 transition-transform duration-1000 group-hover:scale-105"
              />
              <div class="absolute top-4 left-4 px-2.5 py-1 bg-black/80 backdrop-blur-sm border border-slate-700/80 text-[10px] font-mono tracking-[0.2em] text-slate-300 rounded shadow-lg">
                <span class="text-cyan-400 mr-2">▪</span>RAW_SOURCE
              </div>
              <div v-if="isProcessing" class="absolute inset-0 z-20 pointer-events-none overflow-hidden bg-cyan-900/10 mix-blend-screen">
                <div class="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_30px_#22d3ee,0_0_60px_#22d3ee] animate-scan-vertical"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-40 h-40 border border-cyan-500/40 relative transform scale-150 animate-target-lock bg-cyan-400/5">
                    <div class="absolute -top-1 -left-1 w-6 h-6 border-t-[3px] border-l-[3px] border-cyan-300"></div>
                    <div class="absolute -top-1 -right-1 w-6 h-6 border-t-[3px] border-r-[3px] border-cyan-300"></div>
                    <div class="absolute -bottom-1 -left-1 w-6 h-6 border-b-[3px] border-l-[3px] border-cyan-300"></div>
                    <div class="absolute -bottom-1 -right-1 w-6 h-6 border-b-[3px] border-r-[3px] border-cyan-300"></div>
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_#22d3ee] animate-ping"></div>
                  </div>
                </div>
                <div class="absolute bottom-4 right-4 text-[10px] font-mono text-cyan-400 text-right leading-relaxed bg-black/60 p-2 rounded backdrop-blur-sm border border-cyan-500/30">
                  <div class="flex items-center justify-end gap-2 mb-1"><Activity :size="12" class="animate-pulse" /> EXTRACTING...</div>
                  <p>HASH_KEY: <span class="text-white">{{ Math.random().toString(36).substring(2, 10).toUpperCase() }}</span></p>
                  <p>NODES FOUND: <span class="text-white font-bold">{{ Math.floor(Math.random() * 500) + 100 }}</span></p>
                </div>
              </div>
            </div>
            <div class="flex-1 relative bg-[#020308] overflow-hidden cyber-bg-pattern">
              <div v-if="showResults" class="w-full h-full relative flex flex-col">
                <div class="absolute top-4 right-4 z-40 flex bg-black/80 border border-slate-700/80 rounded backdrop-blur-xl shadow-2xl p-1 gap-1">
                  <button
                    v-for="img in imageOptions"
                    :key="img"
                    @click="activeImage = img"
                    class="relative px-3 py-1.5 text-[10px] font-mono tracking-[0.2em] rounded transition-all duration-300 overflow-hidden"
                    :class="
                      activeImage === img
                        ? 'text-cyan-300 font-bold bg-cyan-900/40 border border-cyan-500/30 shadow-[inset_0_0_10px_rgba(34,211,238,0.2)]'
                        : 'text-slate-500 hover:text-slate-300 border border-transparent'
                    "
                  >
                    <span class="relative z-10">VAR_{{ img.split('-').pop() }}</span>
                  </button>
                </div>
                <transition name="fade" mode="out-in">
                  <div :key="activeImage" class="w-full h-full relative group">
                    <img
                      :src="getImageUrl(activeImage)"
                      class="w-full h-full object-contain md:object-cover mix-blend-luminosity opacity-70 transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:mix-blend-normal group-hover:opacity-100"
                    />
                    <div class="absolute bottom-4 left-4 px-2.5 py-1 bg-black/80 backdrop-blur-sm border border-cyan-500/50 text-[10px] font-mono tracking-[0.2em] text-cyan-400 rounded shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                      <span class="text-white mr-2">▪</span>TARGET_MATCH
                    </div>
                  </div>
                </transition>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-cyan-500/20 pointer-events-none z-30 flex items-center justify-center rounded-full bg-cyan-400/5">
                  <div class="absolute w-full h-px bg-cyan-500/20"></div>
                  <div class="absolute h-full w-px bg-cyan-500/20"></div>
                  <Scan :size="32" class="text-cyan-400/40" stroke-width="1.5" />
                </div>
              </div>
              <div v-else class="absolute inset-0 flex items-center justify-center bg-black/40">
                <div class="text-center">
                  <Scan :size="40" class="mx-auto mb-3 opacity-20 text-cyan-500" stroke-width="1" />
                  <p class="text-[11px] font-mono text-slate-600 tracking-[0.3em] px-4 uppercase bg-black/60 py-2 rounded-sm border border-slate-800">
                    {{ isProcessing ? 'GENERATING PROBABILITIES...' : 'PENDING TARGET RENDER' }}
                  </p>
                </div>
              </div>
            </div>
            <button
              @click="clearAll"
              class="absolute top-4 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 z-50 p-2.5 bg-black/90 border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-500/50 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:rotate-90 group"
            >
              <X :size="16" stroke-width="2.5" class="group-hover:scale-110 transition-transform" />
            </button>
          </div>
          <div class="h-25 bg-black/80 backdrop-blur-xl border-t border-slate-800 flex items-center justify-between px-6 md:px-8 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
            <div class="flex-1 pr-8">
              <div class="flex items-center justify-between mb-2.5">
                <p class="text-[11px] font-mono text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Activity :size="14" /> SYS_STATUS
                </p>
                <div class="text-[12px] font-euro tracking-[0.2em] font-bold">
                  <span v-if="!selectedImage" class="text-slate-600">IDLE</span>
                  <span v-else-if="isProcessing" class="text-cyan-400 animate-pulse drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">PROCESSING</span>
                  <span v-else-if="showResults" class="text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.8)]">COMPLETE</span>
                  <span v-else class="text-white">STANDBY</span>
                </div>
              </div>
              <div class="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden shadow-inner border border-slate-800">
                <div
                  class="h-full bg-linear-to-r from-indigo-500 via-cyan-400 to-cyan-200 transition-all duration-200 relative"
                  :class="{ 'neon-glow': isProcessing || showResults }"
                  :style="{ width: `${progressValue}%` }"
                >
                  <div class="absolute inset-0 bg-white/30 animate-[pulse_1s_infinite]"></div>
                </div>
              </div>
            </div>
            <button
              @click="startRecognition"
              :disabled="!selectedImage || isProcessing || showResults"
              class="relative px-8 py-4 rounded-lg font-euro font-bold tracking-[0.2em] text-[13px] transition-all duration-300 flex items-center justify-center gap-3 w-45 overflow-hidden group"
              :class="
                !selectedImage || showResults
                  ? 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
                  : isProcessing
                    ? 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                    : 'bg-linear-to-r from-cyan-600 to-indigo-600 text-white shadow-[0_4px_20px_rgba(6,182,212,0.4)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.6)] hover:-translate-y-1'
              "
            >
              <div v-if="selectedImage && !isProcessing && !showResults" class="absolute top-0 left-full w-[50%] h-full bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] group-hover:animate-button-sweep"></div>
              <RefreshCcw v-if="isProcessing" :size="18" class="animate-spin" />
              <Scan v-else :size="18" class="group-hover:scale-110 transition-transform" />
              <span class="relative z-10">{{ isProcessing ? 'EXECUTING' : showResults ? 'DONE' : 'INITIALIZE' }}</span>
            </button>
          </div>
        </div>
        <aside class="lg:col-span-4 glass-panel border border-slate-800 rounded-xl p-6 md:p-8 flex flex-col relative overflow-hidden shadow-2xl bg-[#03050a]/80">
          <div class="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 blur-[30px]"></div>
          <div class="flex items-center gap-3 mb-8 border-b border-slate-700/80 pb-4">
            <div class="w-8 h-8 rounded bg-indigo-500/20 flex items-center justify-center border border-indigo-500/40">
               <Info class="text-indigo-400" :size="18" />
            </div>
            <h2 class="text-[16px] font-euro font-bold tracking-[0.2em] text-white drop-shadow-sm uppercase">
              Analysis Log
            </h2>
          </div>
          <div class="mb-8 bg-black/40 p-4 rounded-lg border border-slate-800">
            <div class="flex justify-between items-center">
              <span class="text-[11px] font-mono text-slate-400 tracking-[0.2em]">MATCH_CONFIDENCE</span>
              <div class="text-right">
                <span class="text-4xl font-mono font-black text-transparent bg-clip-text bg-linear-to-br from-white to-slate-500"
                  :class="{ 'from-cyan-300 to-indigo-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]': showResults }">
                  {{ progressValue }}
                </span>
                <span class="text-xl text-cyan-500 font-bold ml-1">%</span>
              </div>
            </div>
          </div>
          <div class="flex-1 space-y-4">
            <div
              v-for="(val, label) in recognitionResult"
              :key="label"
              class="group flex flex-col gap-2"
            >
              <div class="flex justify-between items-center">
                <span class="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-sm" :class="showResults ? 'bg-cyan-500 shadow-[0_0_8px_#22d3ee]' : 'bg-slate-700'"></span>
                  {{ label }}
                </span>
                <span
                  class="text-[11px] font-mono font-bold transition-all px-2 py-0.5 rounded bg-black/50 border border-transparent"
                  :class="showResults ? 'text-cyan-300 border-cyan-900 shadow-[0_0_10px_rgba(34,211,238,0.15)]' : 'text-slate-600'"
                >
                  {{ val }}
                </span>
              </div>
              <div class="w-full h-1.5 flex gap-0.5">
                <div
                  v-for="i in 10"
                  :key="i"
                  class="h-full flex-1 rounded-[1px] transition-all duration-600"
                  :class="
                    showResults && i <= Math.random() * 5 + 5
                      ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]'
                      : 'bg-slate-800'
                  "
                  :style="showResults ? `transition-delay: ${i * 50}ms` : ''"
                ></div>
              </div>
            </div>
          </div>
          <button
            :disabled="!showResults"
            class="mt-10 w-full py-4 bg-indigo-600/90 hover:bg-indigo-500 text-white rounded-lg font-euro font-bold text-[14px] tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:-translate-y-1 shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.7)] border border-indigo-400/50"
          >
            <Download :size="20" class="drop-shadow-md" />
            <span>EXPORT DOSSIER</span>
          </button>
        </aside>
      </main>
    </div>
  </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@500;700;800;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;700;800&display=swap');
.font-sans { font-family: 'Inter', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }
.font-euro { font-family: 'Exo 2', 'Eurostile', sans-serif; }
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.tech-grid-bg {
  background-image:
    linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
}
.cyber-bg-pattern {
  background-image: radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.03) 0%, transparent 60%);
}
.glass-panel {
  background-color: rgba(6, 9, 19, 0.6) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
}
.glow-btn-cyan {
  box-shadow: 0 0 15px rgba(34, 211, 238, 0.1) !important;
  transition: all 0.3s ease !important;
}
.glow-btn-cyan:hover:not(:disabled) {
  box-shadow: 0 0 25px rgba(34, 211, 238, 0.5) !important;
  border-color: rgba(34, 211, 238, 0.8) !important;
}
.neon-glow {
  box-shadow: 0 0 10px rgba(34, 211, 238, 0.6), 0 0 20px rgba(34, 211, 238, 0.3) !important;
}
@keyframes buttonSweep {
  0% { left: -100%; }
  100% { left: 200%; }
}
.group-hover\:animate-button-sweep {
  animation: buttonSweep 1.5s ease-in-out infinite;
}
@keyframes scanVertical {
  0% { top: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
.animate-scan-vertical {
  animation: scanVertical 2.5s ease-in-out infinite;
}
.expand-enter-active, .expand-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  max-height: 600px;
  opacity: 1;
  overflow: hidden;
}
.expand-enter-from, .expand-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
  border-width: 0;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.6s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.animate-fade-in { animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1); }
.glitch-hover:hover {
  animation: glitch-anim 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
  color: #fff;
  text-shadow: 2px 0 #22d3ee, -2px 0 #818cf8;
}
@keyframes glitch-anim {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 1px); }
  40% { transform: translate(-1px, -1px); }
  60% { transform: translate(2px, 1px); }
  80% { transform: translate(1px, -1px); }
  100% { transform: translate(0); }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); filter: blur(5px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes targetLock {
  0% { transform: scale(2) rotate(45deg); opacity: 0; }
  50% { transform: scale(1.1) rotate(-10deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
}
.animate-target-lock {
  animation: targetLock 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.meteor-shower-container {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; z-index: 1;
}
.meteor {
  position: absolute; width: 2px; height: 120px;
  background: linear-gradient(to top, rgba(34, 211, 238, 1), transparent);
  transform: rotate(45deg); opacity: 0; animation: meteorFall linear infinite;
  box-shadow: 0 0 10px 1px rgba(34, 211, 238, 0.3); border-radius: 50%;
}
.meteor::before {
  content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 4px; height: 4px; background: #ffffff; border-radius: 50%; box-shadow: 0 0 15px 3px #22d3ee;
}
@keyframes meteorFall {
  0% { transform: rotate(45deg) translateY(-200px); opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { transform: rotate(45deg) translateY(1800px); opacity: 0; }
}
</style>
