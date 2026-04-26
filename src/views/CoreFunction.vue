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
} from 'lucide-vue-next'
const galleryImages = Array.from({ length: 20 }).map((_, i) => {
  const ages = [8,6,7,9,7,6,8,7,10,11,6,9,10,8,12,6,8,9,7,10]
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
        block: 'start'
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
  return {
    left,
    top,
    animationDelay: delay,
    animationDuration: duration,
  }
}
</script>
<template>
  <div
    v-if="isLoaded"
    class="min-h-screen bg-[#060913] text-slate-300 font-sans p-4 md:p-6 lg:p-8 animate-fade-in"
  >
    <div class="meteor-shower-container pointer-events-none">
      <div v-for="i in 15" :key="'meteor-' + i" class="meteor" :style="getMeteorStyle()"></div>
    </div>
    <div
      class="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
      style="
        background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');
      "
    ></div>
    <div class="max-w-350 mx-auto space-y-6">
      <header
        class="glass-panel flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-5 md:p-6 rounded-2xl relative overflow-hidden shadow-2xl"
      >
        <div class="relative z-10 flex items-center gap-4">
          <div class="w-1.5 h-12 bg-cyan-400 rounded-full neon-glow"></div>
          <div class="group">
            <h1
              class="text-2xl md:text-3xl font-euro font-extrabold tracking-widest text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-100 to-slate-400 drop-shadow-sm transition-all duration-300 group-hover:from-cyan-100 group-hover:via-white group-hover:to-cyan-100 glitch-hover"
            >
              MISSING POPULATION RETRIEVAL
            </h1>
            <p
              class="text-[10px] font-euro text-cyan-500/80 mt-1 uppercase tracking-[0.3em] flex items-center gap-2"
            >
              Cross-Time Facial Node
              <span
                class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-lg shadow-cyan-500/50"
              ></span>
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4 relative z-10">
          <button
            @click="fileInput?.click()"
            class="glow-btn-cyber btn-cyber px-6 py-2.5 rounded-xl font-euro font-bold tracking-[0.15em] text-[11px] transition-all duration-300 flex items-center gap-3 shadow-xl relative overflow-hidden"
            :class="
              selectedImage
                ? 'bg-cyan-950 border border-cyan-900 text-cyan-300'
                : 'bg-linear-to-r from-slate-800 to-slate-900 text-slate-300 hover:from-cyan-600 hover:to-indigo-600 hover:text-white hover:-translate-y-0.5 active:translate-y-0'
            "
          >
            <Upload
              :size="14"
              class="transition-transform duration-300"
              :class="{ 'group-hover:scale-110': !selectedImage }"
            />
            <span>LOCAL UPLOAD</span>
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              @change="handleLocalUpload"
              accept="image/*"
            />
          </button>
          <button
            @click="isGalleryOpen = !isGalleryOpen"
            class="glow-btn-cyber btn-cyber px-6 py-2.5 rounded-xl font-euro font-bold tracking-[0.15em] text-[11px] transition-all duration-300 flex items-center gap-3 shadow-xl"
            :class="
              isGalleryOpen
                ? 'bg-indigo-950 border border-indigo-900 text-indigo-300'
                : 'bg-linear-to-r from-slate-800 to-slate-900 text-slate-300 hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:-translate-y-0.5 active:translate-y-0'
            "
          >
            <component
              :is="isGalleryOpen ? ChevronUp : ChevronDown"
              :size="14"
              class="transition-all duration-300"
              :class="{ 'rotate-180': isGalleryOpen }"
            />
            <span>{{ isGalleryOpen ? 'CLOSE DB' : 'OPEN DB' }}</span>
          </button>
        </div>
      </header>
      <Transition name="expand">
        <div v-show="isGalleryOpen" class="glass-panel p-6 rounded-2xl shadow-xl">
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4"
          >
            <div class="flex items-center gap-3 group">
              <div
                class="w-1 h-6 bg-indigo-400 rounded-full group-hover:h-8 transition-all duration-300"
              ></div>
              <h3
                class="text-sm font-euro font-bold text-white tracking-widest uppercase transition-colors duration-300 group-hover:text-indigo-300"
              >
                DATABASE
              </h3>
              <span
                class="px-2 py-0.5 bg-slate-800/80 rounded text-[10px] font-mono text-slate-400 border border-slate-700/50 transition-all duration-300 group-hover:border-indigo-500/50 group-hover:text-indigo-300 group-hover:shadow-lg group-hover:shadow-indigo-500/20"
              >
                {{ filteredGallery.length }} RECORDS
              </span>
            </div>
            <div
              class="flex items-center gap-2 px-4 py-3 bg-[#03050a]/80 border border-slate-700/80 focus-within:border-cyan-500/80 rounded-xl transition-all duration-300 group shadow-inner backdrop-blur-sm"
            >
              <Search
                :size="14"
                class="text-slate-500 group-focus-within:text-cyan-500 transition-transform duration-300 group-focus-within:scale-110"
              />
              <input
                v-model="searchQuery"
                placeholder="SEARCH ID OR AGE..."
                class="bg-transparent border-none outline-none text-xs text-white font-mono w-48 placeholder:text-slate-700 placeholder:transition-opacity focus:placeholder:opacity-50"
              />
            </div>
          </div>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-112.5 overflow-y-auto custom-scrollbar pr-3 pb-4 pt-2"
          >
            <div
              v-for="img in filteredGallery"
              :key="img.id"
              @click="handleSelectFromGallery(img.url)"
              class="group cursor-pointer flex flex-col gap-3"
            >
              <div
                class="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-slate-950 border transition-all duration-300 shadow-md"
                :class="
                  selectedImage === img.url
                    ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                    : 'border-slate-800/80 group-hover:border-slate-500'
                "
              >
                <img
                  :src="img.url"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  :class="
                    selectedImage === img.url
                      ? 'opacity-100 grayscale-0'
                      : 'opacity-70 grayscale-60 group-hover:opacity-100 group-hover:grayscale-0'
                  "
                />
                <div
                  class="absolute top-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-[9px] font-mono tracking-widest text-white border border-white/10 shadow-sm"
                >
                  RAW_IMG
                </div>
                <div
                  v-if="selectedImage === img.url"
                  class="absolute top-3 right-3 text-cyan-400 bg-black/60 rounded-full backdrop-blur-sm neon-glow"
                >
                  <CheckCircle2 :size="20" />
                </div>
              </div>
              <div class="flex items-center justify-between px-1.5">
                <h4
                  class="text-sm font-euro font-bold text-slate-200 group-hover:text-cyan-400 transition-colors tracking-widest"
                >
                  {{ img.id }}
                </h4>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] text-slate-500 font-mono tracking-widest">AGE</span>
                  <div
                    class="flex items-center gap-1.5 px-2.5 py-1 bg-linear-to-r from-slate-800 to-slate-800/50 rounded border border-slate-700/50 shadow-inner"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.8)]"
                    ></span>
                    <span class="text-[11px] font-bold font-mono text-slate-200">{{
                      img.age
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="filteredGallery.length === 0"
              class="col-span-full py-16 flex items-center justify-center text-slate-600 font-euro text-sm uppercase tracking-widest"
            >
              NO RECORDS MATCHING "{{ searchQuery }}"
            </div>
          </div>
        </div>
      </Transition>
      <main class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-150">
        <div
          class="lg:col-span-8 glass-panel relative rounded-2xl overflow-hidden flex flex-col shadow-2xl"
        >
          <div
            v-if="!selectedImage"
            class="absolute inset-0 flex flex-col items-center justify-center text-slate-700 z-10"
          >
            <Scan :size="64" class="mb-4 opacity-30" stroke-width="1" />
            <p class="text-lg font-euro font-bold tracking-[0.2em] text-slate-500">
              AWAITING INPUT
            </p>
          </div>
          <div v-else class="flex-1 flex flex-col md:flex-row relative">
            <div class="flex-1 relative bg-[#03050a] overflow-hidden border-r border-slate-800/80">
              <img
                :src="selectedImage"
                class="w-full h-full object-contain md:object-cover opacity-80"
              />
              <div
                class="absolute top-4 left-4 px-2 py-1 bg-black/80 border border-slate-700 text-[10px] font-mono tracking-widest text-slate-400 rounded"
              >
                RAW_DATA
              </div>
              <div
                v-if="isProcessing"
                class="absolute inset-0 z-20 pointer-events-none overflow-hidden bg-cyan-900/20 mix-blend-screen"
              >
                <div
                  class="absolute top-0 left-0 w-full h-1 bg-cyan-300 shadow-[0_0_20px_#22d3ee,0_0_40px_#22d3ee] animate-scan-vertical"
                ></div>
                <div class="absolute inset-0 flex items-center justify-center animate-pulse-fast">
                  <div
                    class="w-32 h-32 border border-cyan-500/50 relative transform scale-150 animate-target-lock"
                  >
                    <div
                      class="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-300"
                    ></div>
                    <div
                      class="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-300"
                    ></div>
                    <div
                      class="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-300"
                    ></div>
                    <div
                      class="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-300"
                    ></div>
                    <div
                      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_10px_#22d3ee]"
                    ></div>
                  </div>
                </div>
                <div
                  class="absolute bottom-4 right-4 text-[10px] font-mono text-cyan-400 opacity-80 text-right leading-tight"
                >
                  <p>ANALYZING BIOMETRICS...</p>
                  <p>HASH: {{ Math.random().toString(36).substring(2, 10).toUpperCase() }}</p>
                  <p>NODES: {{ Math.floor(Math.random() * 500) + 100 }} DETECTED</p>
                </div>
              </div>
            </div>
            <div class="flex-1 relative bg-[#03050a] overflow-hidden">
              <div v-if="showResults" class="w-full h-full relative flex flex-col">
                <div
                  class="absolute top-4 right-4 z-40 flex bg-[#060913]/90 border border-slate-700/80 rounded-lg backdrop-blur-xl shadow-2xl p-1 gap-1"
                >
                  <button
                    v-for="img in imageOptions"
                    :key="img"
                    @click="activeImage = img"
                    class="relative px-3 py-1.5 text-[9px] font-mono tracking-[0.15em] rounded-md transition-all duration-300 overflow-hidden"
                    :class="
                      activeImage === img
                        ? 'text-cyan-300 font-bold shadow-[inset_0_0_10px_rgba(34,211,238,0.2)]'
                        : 'text-slate-500 hover:text-slate-300'
                    "
                  >
                    <div
                      v-if="activeImage === img"
                      class="absolute inset-0 bg-cyan-500/10"
                    ></div>
                    <span class="relative z-10">{{ img }}</span>
                  </button>
                </div>
                <transition name="fade" mode="out-in">
                  <div :key="activeImage" class="w-full h-full relative">
                    <img
                      :src="getImageUrl(activeImage)"
                      class="w-full h-full object-contain md:object-cover mix-blend-luminosity opacity-40 transition-all duration-700 ease-in-out"
                    />
                    <div
                      class="absolute bottom-4 left-4 px-2 py-1 bg-black/80 border border-cyan-500/50 text-[10px] font-mono tracking-widest text-cyan-400 rounded"
                    >
                      TARGET
                    </div>
                  </div>
                </transition>
                <div
                  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-cyan-500/30 pointer-events-none z-30"
                >
                  <div
                    class="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400"
                  ></div>
                  <div
                    class="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400"
                  ></div>
                  <div
                    class="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400"
                  ></div>
                  <div
                    class="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400"
                  ></div>
                  <div
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400/30"
                  >
                    <Scan :size="24" stroke-width="1" />
                  </div>
                </div>
              </div>
              <div v-else class="absolute inset-0 flex items-center justify-center">
                <p
                  class="text-[10px] font-mono text-slate-700 tracking-widest text-center px-4 uppercase"
                >
                  {{ isProcessing ? 'GENERATING PHASES...' : 'TARGET PENDING ANALYSIS' }}
                </p>
              </div>
            </div>
            <button
              @click="clearAll"
              class="glow-btn-cyan absolute top-4 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 z-50 p-2 bg-black/80 text-slate-500 hover:text-red-400 rounded-full transition-colors shadow-lg"
            >
              <X :size="14" />
            </button>
          </div>
          <div
            class="h-24 bg-black/60 border-t border-slate-800 flex items-center justify-between px-8 z-30"
          >
            <div class="flex-1">
              <p class="text-[10px] font-euro text-slate-500 mb-2 uppercase tracking-[0.2em]">
                SYS_STATUS:
                <span v-if="!selectedImage" class="font-euro">IDLE</span>
                <span v-else-if="isProcessing" class="text-cyan-400 font-euro">PROCESSING...</span>
                <span v-else-if="showResults" class="text-green-500 font-euro">COMPLETE</span>
                <span v-else class="text-white font-euro">STANDBY</span>
              </p>
              <div
                class="w-full max-w-sm h-1 bg-slate-800 rounded-full overflow-hidden shadow-inner"
              >
                <div
                  class="h-full bg-linear-to-r from-indigo-500 to-cyan-400 neon-glow transition-all duration-200"
                  :style="{ width: `${progressValue}%` }"
                ></div>
              </div>
            </div>
            <button
              @click="startRecognition"
              :disabled="!selectedImage || isProcessing || showResults"
              class="glow-btn-cyan btn-cyber px-8 py-3.5 rounded-xl font-euro font-bold tracking-[0.15em] text-[11px] transition-all duration-300 flex items-center gap-3 shadow-xl"
              :class="
                !selectedImage || showResults
                  ? 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
                  : isProcessing
                    ? 'bg-cyan-950 border border-cyan-900 text-cyan-500'
                    : 'bg-linear-to-r from-cyan-600 to-indigo-600 text-white hover:from-cyan-500 hover:to-indigo-500 hover:-translate-y-0.5 active:translate-y-0'
              "
            >
              <RefreshCcw v-if="isProcessing" :size="16" class="animate-spin" />
              <Scan v-else :size="16" />
              {{ isProcessing ? 'EXECUTING' : showResults ? 'DONE' : 'INITIALIZE' }}
            </button>
          </div>
        </div>
        <aside
          class="lg:col-span-4 glass-panel rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-2xl"
        >
          <div class="flex items-center gap-2 mb-8 border-b border-slate-700/50 pb-5">
            <Info class="text-indigo-400" :size="18" />
            <h2 class="text-[15px] font-euro font-bold tracking-[0.2em] text-white drop-shadow-sm">
              ANALYSIS_LOG
            </h2>
          </div>
          <div class="mb-8">
            <div class="flex justify-between items-end mb-2">
              <span class="text-[10px] font-mono text-slate-500 tracking-[0.2em]">CONFIDENCE</span>
              <span
                class="text-3xl font-mono font-bold text-transparent bg-clip-text bg-linear-to-b from-white to-slate-400"
                >{{ progressValue }}<span class="text-lg text-cyan-500">%</span></span
              >
            </div>
          </div>
          <div class="flex-1 space-y-1">
            <div
              v-for="(val, label) in recognitionResult"
              :key="label"
              class="group flex flex-col py-3 border-b border-slate-800/50"
            >
              <div class="flex justify-between items-center mb-1">
                <span
                  class="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2"
                >
                  <span class="w-1 h-1 bg-cyan-500 rounded-full" v-if="showResults"></span>
                  {{ label }}
                </span>
                <span
                  class="text-xs font-mono font-bold transition-all"
                  :class="
                    showResults
                      ? 'text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]'
                      : 'text-slate-700'
                  "
                >
                  {{ val }}
                </span>
              </div>
              <div class="w-full h-1 bg-slate-900 rounded-full overflow-hidden flex gap-0.5">
                <div
                  v-for="i in 10"
                  :key="i"
                  class="h-full flex-1 transition-all duration-500"
                  :class="
                    showResults && i <= Math.random() * 5 + 5 ? 'bg-cyan-500' : 'bg-slate-800'
                  "
                ></div>
              </div>
            </div>
          </div>
          <button
            :disabled="!showResults"
            class="mt-8 w-full py-4 bg-[#7b78f6] hover:bg-[#6360ef] text-white rounded-full font-bold text-[16px] tracking-[0.15em] flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_4px_15px_rgba(123,120,246,0.4)] hover:shadow-[0_8px_25px_rgba(123,120,246,0.6)] disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1"
          >
            <Download :size="22" />
            <span>EXPORT REPORT</span>
          </button>
        </aside>
      </main>
    </div>
  </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@500;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;700&display=swap');
.font-sans {
  font-family: 'Inter', sans-serif;
}
.font-mono {
  font-family: 'JetBrains Mono', monospace;
}
.font-euro {
  font-family: 'Eurostile', 'Eurostile Extended', 'Exo 2', sans-serif;
}
.glass-panel {
  background-color: rgba(15, 23, 42, 0.4) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
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
  box-shadow:
    0 0 10px rgba(34, 211, 238, 0.8),
    0 0 20px rgba(34, 211, 238, 0.4) !important;
}
.btn-cyber {
  position: relative;
  overflow: hidden;
}
.btn-cyber::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.15), transparent);
  transform: skewX(-25deg);
  transition: left 0.5s ease-in-out;
}
.btn-cyber:not(:disabled):hover::before {
  left: 150%;
}
.cyber-cut {
  clip-path: polygon(
    0 0,
    calc(100% - 20px) 0,
    100% 20px,
    100% 100%,
    20px 100%,
    0 calc(100% - 20px)
  );
  border: 1px solid rgba(34, 211, 238, 0.3);
}
.cyber-btn-cut {
  clip-path: polygon(
    10px 0,
    100% 0,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0 100%,
    0 10px
  );
}
@keyframes scanVertical {
  0% {
    top: 0%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}
.animate-scan-vertical {
  animation: scanVertical 2s linear infinite;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.5);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
  border: 1px solid rgba(15, 23, 42, 1);
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #22d3ee;
}
.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 500px;
  opacity: 1;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  border-width: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}
.glitch-hover:hover {
  animation: glitch-anim 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
  color: #fff;
  text-shadow:
    2px 0 #00f5ff,
    -2px 0 #ff00ff;
}
@keyframes glitch-anim {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 1px);
  }
  40% {
    transform: translate(-1px, -1px);
  }
  60% {
    transform: translate(2px, 1px);
  }
  80% {
    transform: translate(1px, -1px);
  }
  100% {
    transform: translate(0);
  }
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
@keyframes targetLock {
  0% {
    transform: scale(1.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}
.animate-target-lock {
  animation: targetLock 1.5s ease-out forwards;
}
.animate-pulse-fast {
  animation: pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
