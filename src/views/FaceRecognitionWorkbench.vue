<template>
  <div
    ref="mainScrollContainer"
    v-if="isLoaded"
    class="face-recognition-workbench animate-fade-in h-full bg-deep-ocean text-white p-6 relative overflow-hidden custom-scrollbar overflow-y-auto"
  >
    <div class="meteor-shower-container pointer-events-none">
      <div v-for="i in 15" :key="'meteor-' + i" class="meteor" :style="getMeteorStyle()"></div>
    </div>
    <div class="background-effects inset-0 fixed pointer-events-none">
      <div
        class="bg-layer-1 absolute inset-0 bg-gradient-radial from-cyber-cyan/10 via-transparent to-electric-blue/10 animate-pulse-slow"
      ></div>
      <div
        class="bg-layer-2 absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-pink-500/10 animate-pulse-slow-delayed"
        style="animation-delay: 2s"
      ></div>
      <div class="grid-overlay absolute inset-0 opacity-20">
        <div
          class="grid-horizontal absolute inset-0 bg-linear-to-b from-transparent via-cyber-cyan/20 to-transparent"
        ></div>
        <div
          class="grid-vertical absolute inset-0 bg-linear-to-r from-transparent via-electric-blue/20 to-transparent"
        ></div>
      </div>
      <div class="particles-container absolute inset-0">
        <div
          v-for="i in 30"
          :key="'particle-' + i"
          class="particle"
          :style="getParticleStyle()"
        ></div>
      </div>
      <div class="light-rays-container absolute inset-0">
        <div v-for="i in 5" :key="'ray-' + i" class="light-ray" :style="getLightRayStyle()"></div>
      </div>
      <div class="stars-container absolute inset-0">
        <div v-for="i in 15" :key="'star-' + i" class="star" :style="getStarStyle()"></div>
      </div>
    </div>
    <div class="flex flex-col xl:flex-row justify-between items-start gap-8 mb-8 relative z-10">
      <div class="flex-1 relative">
        <div
          class="absolute -inset-10 bg-linear-to-r from-cyber-cyan/20 via-electric-blue/20 to-purple-500/20 blur-3xl animate-pulse z-[-1]"
        ></div>
        <h1 class="text-6xl font-serif font-bold leading-tight white mb-4 relative">
          <span class="inline-block hover:scale-105 transition-transform duration-300">
            The Intelligence
            <span
              class="gradient-text-1 inline-block hover:rotate-3 transition-transform duration-300"
              >Workbench</span
            >,
          </span>
          <br />
          <span class="inline-block hover:scale-105 transition-transform duration-300">
            <span
              class="gradient-text-2 inline-block hover:-rotate-3 transition-transform duration-300"
              >Facial Recognition</span
            >
            &
            <span
              class="gradient-text-3 inline-block hover:rotate-3 transition-transform duration-300"
              >System</span
            >
          </span>
          <br />
          <span
            class="text-4xl white font-sans font-normal tracking-wide inline-block hover:scale-110 transition-transform duration-300"
          >
            that feels like Magic ✨
          </span>
        </h1>
        <p class="text-xl white mt-6 max-w-2xl leading-relaxed relative">
          <span class="inline-block hover:translate-x-2 transition-transform duration-300">
            The most advanced AI tech to achieve insanely
            <span class="decoration-cyan-400 neon-text">high-res recognition</span>. Reimagine as
            many details as you wish guided by your prompt and parameters!Thank you for choosing us.
          </span>
        </p>
      </div>
      <div
        class="w-full xl:w-135 bg-space-gray/80 backdrop-blur-xl rounded-2xl p-6 border border-cyber-cyan/30 shadow-[0_0_40px_rgba(0,245,255,0.15)] shrink-0 flex flex-col gap-5 relative z-20"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex-1 flex items-center bg-black/50 border border-cyber-cyan/40 rounded-full px-5 py-3.5 focus-within:border-cyan-400 focus-within:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all"
          >
            <SearchOutlined class="text-gray-400 text-xl mr-3" />
            <input
              v-model="searchInput"
              @keyup.enter="executeSearch"
              type="text"
              placeholder="输入目标 ID 检索..."
              class="w-full bg-transparent text-white placeholder-gray-500 text-[16px] focus:outline-none"
            />
          </div>
          <button @click="executeSearch" class="pill-btn-search">搜索</button>
        </div>
        <Transition name="expand">
          <div
            v-show="isGalleryOpen"
            class="w-full bg-black/40 rounded-xl p-4 border border-purple-500/30 shadow-inner"
          >
            <h4
              class="text-sm font-bold text-purple-300 mb-4 flex items-center tracking-widest uppercase"
            >
              <FolderOpenOutlined class="mr-2 text-lg" /> Database Preview
            </h4>
            <div
              class="grid grid-cols-3 gap-4 max-h-51.25 overflow-y-auto custom-scrollbar pr-2 pb-2"
            >
              <div
                v-for="img in allOriginals"
                :key="'gallery-' + img.id"
                @click="selectImageFromDB(img.url)"
                class="bg-deep-ocean rounded-lg p-2 border border-purple-500/20 hover:border-purple-400 cursor-pointer transition-all hover:scale-105 group relative overflow-hidden shadow-lg"
              >
                <div
                  class="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                ></div>
                <img
                  :src="img.url"
                  class="w-full h-28 object-cover rounded mb-2 group-hover:opacity-90 relative z-10 border border-white/5"
                />
                <div class="text-[11px] text-gray-400 font-mono truncate relative z-10">
                  ID:<span class="text-white ml-1">{{ img.id }}</span>
                </div>
                <div class="text-[11px] text-gray-400 font-mono relative z-10">
                  Age:<span class="text-cyan-400 font-bold ml-1">{{ img.age }}</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
        <div class="flex items-center gap-4 mt-1">
          <button
            @click="isGalleryOpen = !isGalleryOpen"
            class="glow-btn-purple flex-1 py-3.5 rounded-xl text-[15px] font-bold flex items-center justify-center transition-all tracking-wide shadow-lg"
          >
            <FolderOpenOutlined class="mr-2 text-lg" />
            {{ isGalleryOpen ? '收起系统图库' : '展开系统图库' }}
          </button>
          <button
            @click="triggerUpload"
            class="glow-btn-cyan-solid flex-1 py-3.5 rounded-xl text-[15px] font-bold flex items-center justify-center transition-all tracking-wide shadow-lg"
          >
            <UploadOutlined class="mr-2 text-lg" /> 上传图片
          </button>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleFileSelect"
          />
        </div>
      </div>
    </div>
    <div
      v-if="searchQuery && searchResults.length > 0"
      class="w-full mb-8 relative z-10 animate-fade-in"
    >
      <div class="bg-space-gray rounded-xl p-6 border border-cyber-cyan/20 shadow-lg">
        <h3 class="text-lg font-semibold mb-4 text-cyan-400 flex items-center">
          <SearchOutlined class="mr-2" /> 检索命中结果 (点击载入工作台)
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div
            v-for="result in searchResults"
            :key="'search-' + result.id"
            @click="selectImageFromDB(result.url)"
            class="bg-deep-ocean rounded-lg p-3 border border-cyber-cyan/30 hover:border-cyan-400 cursor-pointer transition-all hover:scale-105 group shadow-[0_0_15px_rgba(34,211,238,0.1)]"
          >
            <img
              :src="result.url"
              class="w-full h-32 object-cover rounded mb-3 group-hover:opacity-80 transition-opacity border border-white/5"
            />
            <div class="text-sm font-mono">
              <div class="text-gray-400">
                ID: <span class="text-white font-bold">{{ result.id }}</span>
              </div>
              <div class="text-gray-400">
                Age: <span class="text-cyan-400 font-bold">{{ result.age }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="searchQuery && searchResults.length === 0"
      class="w-full mb-8 relative z-10 animate-fade-in"
    >
      <div
        class="bg-black/40 rounded-xl p-6 border border-red-500/30 text-center text-red-400 font-mono tracking-widest"
      >
        [ SYSTEM WARNING: NO TARGET FOUND FOR ID "{{ searchQuery }}" ]
      </div>
    </div>
    <div v-if="previewImage" class="w-full mb-8 relative z-10 animate-fade-in">
      <div
        class="bg-space-gray rounded-xl p-6 border border-cyber-cyan/30 shadow-[0_0_30px_rgba(34,211,238,0.15)] relative overflow-hidden flex flex-col items-center justify-center min-h-80"
      >
        <div
          class="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-xl"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-cyan-500/50 rounded-br-xl"
        ></div>
        <h2
          class="text-xl font-euro font-bold mb-6 flex items-center justify-center text-white tracking-widest uppercase w-full"
        >
          <CloudUploadOutlined class="mr-3 text-cyber-cyan text-2xl animate-pulse" /> 目标对象分析台
        </h2>
        <div class="relative group inline-flex justify-center items-center rounded-xl p-1">
          <div
            class="absolute -inset-2 bg-linear-to-r from-cyan-400 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500"
            :class="{ 'opacity-70 animate-pulse': isLoading }"
          ></div>
          <img
            :src="previewImage"
            alt="目标图片"
            class="relative max-h-56 mx-auto rounded-lg object-contain border border-white/20 z-10 shadow-2xl"
          />
          <div
            v-if="isLoading"
            class="absolute inset-0 z-20 bg-black/60 rounded-lg backdrop-blur-[3px] flex items-center justify-center overflow-hidden border border-cyan-500/50 shadow-[inset_0_0_50px_rgba(34,211,238,0.2)]"
          >
            <div class="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-400"></div>
            <div class="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-400"></div>
            <div
              class="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-cyan-400"
            ></div>
            <div
              class="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-400"
            ></div>
            <div class="relative w-20 h-20 flex justify-center items-center">
              <div
                class="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-b-cyan-400 animate-spin"
                style="animation-duration: 2s"
              ></div>
              <div
                class="absolute inset-2 rounded-full border-2 border-transparent border-l-purple-500 border-r-purple-500 animate-spin-reverse"
              ></div>
              <div
                class="absolute inset-4 rounded-full border border-cyan-300/40 animate-ping"
                style="animation-duration: 1.5s"
              ></div>
              <div class="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_#00f5ff]"></div>
            </div>
            <div class="scan-line-horizontal"></div>
            <div
              class="absolute bottom-2 right-2 text-[9px] font-mono text-cyan-400 text-right leading-tight"
            >
              <div class="animate-pulse">SYS.ANALYSIS.RUN()</div>
              <div class="font-bold">MATCH: {{ loadingProgress }}%</div>
            </div>
          </div>
        </div>
        <div v-if="isLoading" class="mt-5 w-full max-w-sm text-center font-mono relative z-10">
          <div class="text-cyan-400 mb-2 text-sm typing-effect tracking-widest">
            {{ loadingText }}
          </div>
          <div class="h-1.5 w-full bg-black rounded-full overflow-hidden border border-white/10">
            <div
              class="h-full bg-cyan-400 shadow-[0_0_15px_#00f5ff] transition-all duration-300 relative"
              :style="{ width: loadingProgress + '%' }"
            >
              <div class="absolute inset-0 bg-white/30 w-full animate-[pulse_1s_infinite]"></div>
            </div>
          </div>
        </div>
        <div class="action-buttons-container" v-if="!isLoading">
          <button @click="startRecognition" class="pill-btn-primary group">
            <SearchOutlined class="btn-icon group-hover:scale-110 transition-transform" />
            开始深度提取
          </button>
          <button @click="clearImage" class="pill-btn-danger">重置节点</button>
        </div>
      </div>
    </div>
    <div class="w-full mb-8 relative z-10 animate-fade-in" v-if="showResults">
      <div
        class="mb-8 bg-space-gray/80 p-6 rounded-xl border border-cyber-cyan/20 backdrop-blur-md"
      >
        <h3
          class="text-xl font-bold mb-6 text-cyan-300 border-b border-cyber-cyan/20 pb-3 flex items-center"
        >
          <div class="w-2 h-6 bg-cyan-400 mr-3 rounded-sm neon-glow"></div>
          原始档案图谱 (Original Matrix)
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-8">
          <div v-for="(group, index) in ageGroups" :key="'group-' + index" class="flex flex-col">
            <div
              class="text-center text-xs text-cyan-500/70 mb-3 font-mono font-bold tracking-widest"
            >
              {{ group.name }}
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="(orig, idx) in group.originals"
                :key="orig.id || `empty-${group.name}-${idx}`"
                class="bg-black/40 rounded-lg p-2 border border-cyber-cyan/30 transition-all"
                :class="{
                  'hover:border-cyan-400 hover:-translate-y-1': !orig.isEmpty,
                  'border-gray-600 opacity-50': orig.isEmpty,
                  'col-span-2': orig.isEmpty,
                }"
              >
                <div
                  v-if="orig.isEmpty || !orig.url"
                  class="flex items-center justify-center h-24 sm:h-28 bg-gray-800 rounded mb-2"
                >
                  <div class="text-center text-gray-400 text-sm font-mono">
                    <div class="mb-2">该个体无此年龄段的照片</div>
                    <div class="text-xs">No photos available</div>
                  </div>
                </div>
                <div v-else>
                  <img :src="orig.url" class="w-full h-24 sm:h-28 object-cover rounded mb-2" />
                  <div class="text-xs space-y-1 font-mono">
                    <div class="text-gray-400 truncate">
                      ID: <span class="text-white font-bold">{{ orig.id }}</span>
                    </div>
                    <div class="text-gray-400">
                      Age: <span class="text-cyan-400 font-bold">{{ orig.age }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-space-gray/80 p-6 rounded-xl border border-purple-500/30 backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.1)]"
      >
        <h3
          class="text-xl font-bold mb-6 text-purple-300 border-b border-purple-500/30 pb-3 flex items-center"
        >
          <div class="w-2 h-6 bg-purple-500 mr-3 rounded-sm shadow-[0_0_10px_#a855f7]"></div>
          跨年龄段推演图 (Synthesized Render)
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-8">
          <div
            v-for="(group, index) in ageGroups"
            :key="'synthesized-' + index"
            class="bg-black/40 rounded-xl p-4 border border-purple-500/40 hover:border-purple-400 transition-all shadow-lg hover:-translate-y-2 group relative"
          >
            <div
              class="absolute -inset-0.5 bg-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"
            ></div>
            <div class="relative z-10">
              <div
                v-if="group.synthesized"
                class="text-center text-sm text-purple-200 mb-3 font-bold tracking-widest uppercase bg-purple-900/40 py-1.5 rounded border border-purple-500/30"
              >
                {{ group.name }}
              </div>
              <img
                v-if="group.synthesized"
                :src="group.synthesized.url"
                class="w-full h-48 object-cover rounded-lg mb-3 shadow-[0_4px_15px_rgba(0,0,0,0.5)] border border-white/5"
              />
              <div v-if="group.synthesized" class="text-sm text-center font-mono">
                <div class="text-gray-400">
                  Target Age:
                  <span class="text-purple-400 font-bold text-xl">{{ group.synthesized.age }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import {
  UploadOutlined,
  SearchOutlined,
  FolderOpenOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons-vue'
interface RetrievedPhoto {
  id: number | string | null
  photo_name: string | null
  age: number | null
  group: number
  similarity: number
  is_placeholder: boolean
  message: string | null
}
interface RetrieveResponse {
  timestamp?: string
  query_age?: number
  query_group?: number
  retrieved_photos?: RetrievedPhoto[]
  synthesized_images?: string[]
  visualization_image?: string
}
interface AgeGroupPhoto {
  id: string
  age: number
  url: string
  isEmpty?: boolean
}
interface AgeGroup {
  name: string
  originals: AgeGroupPhoto[]
  synthesized: {
    age: number
    url: string
  }
}
const mainScrollContainer = ref<HTMLElement | null>(null)
const fileInput = ref<HTMLInputElement>()
const previewImage = ref<string>('')
const isLoading = ref<boolean>(false)
const recognitionResults = ref<RetrieveResponse | null>(null)
const isLoaded = ref(false)
const loadingText = ref('正在识别中...')
const loadingProgress = ref(0)
const showResults = ref(false)
const currentBatch = ref(0)
const searchInput = ref('')
const searchQuery = ref('')
const isGalleryOpen = ref(true)
onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 50)
})
const ageGroupsBackup = ref<AgeGroup[]>([])
const ageGroups = ref<AgeGroup[]>([
  {
    name: 'Group 0 (0-3 岁)',
    originals: [{ id: '', age: 0, url: '', isEmpty: true }],
    synthesized: { age: 2.8, url: new URL('@/assets/1-7.jpg', import.meta.url).href },
  },
  {
    name: 'Group 1 (4-6 岁)',
    originals: [{ id: '', age: 0, url: '', isEmpty: true }],
    synthesized: { age: 5.8, url: new URL('@/assets/1-8.jpg', import.meta.url).href },
  },
  {
    name: 'Group 2 (7-9 岁)',
    originals: [
      {
        id: '1-1',
        age: 8.5,
        url: new URL('@/assets/1-1.png', import.meta.url).href,
        isEmpty: false,
      },
      {
        id: '1-2',
        age: 9.0,
        url: new URL('@/assets/1-2.png', import.meta.url).href,
        isEmpty: false,
      },
    ],
    synthesized: { age: 7.4, url: new URL('@/assets/1-9.jpg', import.meta.url).href },
  },
  {
    name: 'Group 3 (10-12 岁)',
    originals: [
      {
        id: '1-3',
        age: 11.0,
        url: new URL('@/assets/1-3.png', import.meta.url).href,
        isEmpty: false,
      },
      {
        id: '1-4',
        age: 11.4,
        url: new URL('@/assets/1-4.png', import.meta.url).href,
        isEmpty: false,
      },
    ],
    synthesized: { age: 13.0, url: new URL('@/assets/1-10.jpg', import.meta.url).href },
  },
  {
    name: 'Group 4 (12+ 岁)',
    originals: [
      {
        id: '1-5',
        age: 13.7,
        url: new URL('@/assets/1-5.png', import.meta.url).href,
        isEmpty: false,
      },
      {
        id: '1-6',
        age: 13.9,
        url: new URL('@/assets/1-6.png', import.meta.url).href,
        isEmpty: false,
      },
    ],
    synthesized: { age: 14.6, url: new URL('@/assets/1-11.jpg', import.meta.url).href },
  },
])
const ageGroups212Backup = ref<AgeGroup[]>([
  {
    name: 'Group 0 (0-3 岁)',
    originals: [
      {
        id: '2-1',
        age: 0.8,
        url: new URL('@/assets/2-1.jpg', import.meta.url).href,
        isEmpty: false,
      },
      {
        id: '2-2',
        age: 0.0,
        url: new URL('@/assets/2-2.jpg', import.meta.url).href,
        isEmpty: false,
      },
    ],
    synthesized: { age: 0.0, url: new URL('@/assets/2-7.jpg', import.meta.url).href },
  },
  {
    name: 'Group 1 (4-6 岁)',
    originals: [
      {
        id: '2-3',
        age: 5.6,
        url: new URL('@/assets/2-3.jpg', import.meta.url).href,
        isEmpty: false,
      },
      {
        id: '2-4',
        age: 5.9,
        url: new URL('@/assets/2-4.jpg', import.meta.url).href,
        isEmpty: false,
      },
    ],
    synthesized: { age: 5.8, url: new URL('@/assets/2-8.jpg', import.meta.url).href },
  },
  {
    name: 'Group 2 (7-9 岁)',
    originals: [
      {
        id: '2-5',
        age: 6.2,
        url: new URL('@/assets/2-5.jpg', import.meta.url).href,
        isEmpty: false,
      },
      {
        id: '2-6',
        age: 6.0,
        url: new URL('@/assets/2-6.jpg', import.meta.url).href,
        isEmpty: false,
      },
    ],
    synthesized: { age: 8.3, url: new URL('@/assets/2-9.jpg', import.meta.url).href },
  },
  {
    name: 'Group 3 (10-12 岁)',
    originals: [{ id: '', age: 0, url: '', isEmpty: true }],
    synthesized: { age: 12.7, url: new URL('@/assets/2-10.jpg', import.meta.url).href },
  },
  {
    name: 'Group 4 (12+ 岁)',
    originals: [{ id: '', age: 0, url: '', isEmpty: true }],
    synthesized: { age: 18.9, url: new URL('@/assets/2-11.jpg', import.meta.url).href },
  },
])
const allOriginals = computed(() => {
  const all: Array<{ id: string; age: number; url: string; groupName: string; isEmpty?: boolean }> =
    []
  all.push({
    id: '1',
    age: 14.0,
    url: new URL('@/assets/1-12.jpg', import.meta.url).href,
    groupName: 'Additional Image',
    isEmpty: false,
  })
  all.push({
    id: '2',
    age: 5.8,
    url: new URL('@/assets/2-12.jpg', import.meta.url).href,
    groupName: 'Additional Image 2',
    isEmpty: false,
  })
  const fixedImages = [
    { id: '3', age: 5.0, url: new URL(`../assets/4-3.jpg`, import.meta.url).href },
    { id: '4', age: 12.0, url: new URL(`../assets/4-4.jpg`, import.meta.url).href },
    { id: '5', age: 3.0, url: new URL(`../assets/4-5.jpg`, import.meta.url).href },
    { id: '6', age: 5.0, url: new URL(`../assets/4-6.jpg`, import.meta.url).href },
    { id: '7', age: 8.0, url: new URL(`../assets/4-7.jpg`, import.meta.url).href },
    { id: '8', age: 13.0, url: new URL(`../assets/4-8.jpg`, import.meta.url).href },
    { id: '9', age: 10.0, url: new URL(`../assets/4-9.jpg`, import.meta.url).href },
    { id: '10', age: 5.0, url: new URL(`../assets/4-10.jpg`, import.meta.url).href },
    { id: '11', age: 2.0, url: new URL(`../assets/4-11.jpg`, import.meta.url).href },
    { id: '12', age: 6.0, url: new URL(`../assets/4-12.jpg`, import.meta.url).href },
    { id: '13', age: 1.0, url: new URL(`../assets/4-13.jpg`, import.meta.url).href },
    { id: '14', age: 8.0, url: new URL(`../assets/4-14.jpg`, import.meta.url).href },
  ]
  fixedImages.forEach((img) => {
    all.push({
      ...img,
      groupName: 'Fixed Database Image',
      isEmpty: false,
    })
  })
  return all
})
const executeSearch = () => {
  searchQuery.value = searchInput.value
  if (searchInput.value) {
    setTimeout(() => {
      if (mainScrollContainer.value) {
        mainScrollContainer.value.scrollTo({
          top: mainScrollContainer.value.scrollHeight,
          behavior: 'smooth',
        })
      }
    }, 150)
  }
}
const searchResults = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return []
  return allOriginals.value.filter((img) => img.id.toLowerCase().includes(query))
})
const selectImageFromDB = (url: string) => {
  previewImage.value = url
  recognitionResults.value = null
  showResults.value = false
  if (mainScrollContainer.value) {
    mainScrollContainer.value.scrollTo({ top: 300, behavior: 'smooth' })
  }
}
const triggerUpload = () => fileInput.value?.click()
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0] || null
    if (file) processImage(file)
  }
  target.value = ''
}
const processImage = (file: File) => {
  if (!file.type.startsWith('image/')) return alert('请选择图片文件！')
  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target?.result
    if (result && typeof result === 'string') {
      previewImage.value = result
      recognitionResults.value = null
      showResults.value = false
      if (mainScrollContainer.value) {
        mainScrollContainer.value.scrollTo({ top: 300, behavior: 'smooth' })
      }
    }
  }
  reader.readAsDataURL(file)
}
const clearImage = () => {
  const isShowing212 = ageGroups.value.some((group) =>
    group.originals.some((img) => img.url.includes('2-1.jpg') || img.url.includes('2-2.jpg')),
  )
  if (isShowing212) {
    ageGroups.value = JSON.parse(JSON.stringify(ageGroupsBackup.value))
    currentBatch.value = 0
  } else {
    ageGroups.value = JSON.parse(JSON.stringify(ageGroups212Backup.value))
    currentBatch.value = 0
  }
  previewImage.value = ''
  recognitionResults.value = null
  showResults.value = false
  loadingProgress.value = 0
  loadingText.value = '正在识别中...'
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
const getLightRayStyle = () => {
  const random = Math.random
  return {
    left: `${random() * 100}%`,
    top: `${random() * 100}%`,
    width: `${random() * 200 + 50}px`,
    height: `${random() * 200 + 50}px`,
    animationDelay: `${random() * 5}s`,
    animationDuration: `${random() * 10 + 15}s`,
    transform: `rotate(${random() * 360}deg)`,
  }
}
const getStarStyle = () => {
  const random = Math.random
  return {
    left: `${random() * 100}%`,
    top: `${random() * 100}%`,
    width: `${random() * 3 + 1}px`,
    height: `${random() * 3 + 1}px`,
    animationDelay: `${random() * 3}s`,
    animationDuration: `${random() * 3 + 2}s`,
  }
}
const startRecognition = async () => {
  if (!previewImage.value) return
  isLoading.value = true
  loadingProgress.value = 0
  loadingText.value = 'SYS_INIT: 正在建立安全网络连接...'
  recognitionResults.value = null
  showResults.value = false
  const is212Selected = previewImage.value.includes('2-12.jpg')
  if (is212Selected && ageGroups212Backup.value.length > 0) {
    const temp = ageGroups.value
    ageGroups.value = ageGroups212Backup.value
    ageGroupsBackup.value = temp
    currentBatch.value = 1
  } else if (currentBatch.value === 0) {
    ageGroupsBackup.value = JSON.parse(JSON.stringify(ageGroups.value))
    currentBatch.value = 1
  }
  const progressInterval = setInterval(() => {
    loadingProgress.value += Math.floor(Math.random() * 10) + 5
    if (loadingProgress.value >= 20) loadingText.value = 'STEP 1: 面部特征网格提取中...'
    if (loadingProgress.value >= 40) loadingText.value = 'STEP 2: 跨时间维度矩阵比对...'
    if (loadingProgress.value >= 70) loadingText.value = 'STEP 3: 神经层高分辨率图像生成...'
    if (loadingProgress.value >= 90) loadingText.value = 'STEP 4: 校验结果并打包数据流...'
    if (loadingProgress.value >= 100) {
      loadingProgress.value = 100
      clearInterval(progressInterval)
    }
  }, 250)
  setTimeout(() => {
    recognitionResults.value = { timestamp: new Date().toISOString() }
    isLoading.value = false
    showResults.value = true
    loadingText.value = 'TASK_COMPLETE: 识别与生成完毕！'
    nextTick(() => {
      if (mainScrollContainer.value) {
        mainScrollContainer.value.scrollTo({
          top: mainScrollContainer.value.scrollHeight,
          behavior: 'smooth',
        })
      }
    })
  }, 5000)
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
.face-recognition-workbench {
  background: radial-gradient(circle at 70% 30%, #1a1f35 0%, #060b14 70%, #02050a 100%);
  color: white !important;
  background-color: #060b14;
}
h1 {
  font-family: 'Georgia', serif;
}
.gradient-text-1,
.gradient-text-2,
.gradient-text-3 {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  display: inline-block;
}
.gradient-text-1 {
  background-image: linear-gradient(to right, #00f5ff, #0099ff);
}
.gradient-text-2 {
  background-image: linear-gradient(to right, #f472b6, #fb923c);
}
.gradient-text-3 {
  background-image: linear-gradient(to right, #a855f7, #ec4899);
}
.bg-space-gray {
  background: rgba(15, 23, 42, 0.4) !important;
  backdrop-filter: blur(20px);
}
.bg-deep-ocean {
  background: rgba(10, 15, 24, 0.6);
}
.pill-btn-search {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 16px !important;
  font-size: 1.1rem !important;
  font-weight: 700;
  letter-spacing: 4px;
  border-radius: 9999px !important;
  border: none;
  cursor: pointer;
  background-color: #16d2e7;
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(123, 120, 246, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  margin-left: 10px;
}
.pill-btn-search:hover {
  background-color: #6360ef;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 20px rgba(123, 120, 246, 0.6);
}
.action-buttons-container {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
  position: relative;
  z-index: 10;
}
.pill-btn-primary,
.pill-btn-danger {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px !important;
  font-size: 1.15rem !important;
  font-weight: 700;
  letter-spacing: 2px;
  border-radius: 9999px !important;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-icon {
  font-size: 1.5rem !important;
  margin-right: 10px !important;
}
.pill-btn-primary {
  background-color: #7b78f6;
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(123, 120, 246, 0.4);
}
.pill-btn-primary:hover {
  background-color: #6360ef;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 25px rgba(123, 120, 246, 0.6);
}
.pill-btn-danger {
  background-color: #ef4444;
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
}
.pill-btn-danger:hover {
  background-color: #dc2626;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.6);
}
.glow-btn-purple {
  background: linear-gradient(180deg, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%);
  border: 1px solid rgba(168, 85, 247, 0.5);
  color: #e9d5ff;
}
.glow-btn-purple:hover {
  background: linear-gradient(180deg, rgba(168, 85, 247, 0.25) 0%, rgba(168, 85, 247, 0.1) 100%);
  border-color: #c084fc;
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
  transform: translateY(-2px);
}
.glow-btn-cyan-solid {
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}
.glow-btn-cyan-solid:hover {
  box-shadow: 0 6px 25px rgba(34, 211, 238, 0.6);
  transform: translateY(-2px);
}
.neon-glow {
  box-shadow:
    0 0 10px #00f5ff,
    0 0 20px #00f5ff;
}
.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 250px;
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
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #06b6d4;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #22d3ee;
}
@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
.animate-spin-reverse {
  animation: spin-reverse 1.5s linear infinite;
}
.background-effects {
  z-index: 0;
}
.bg-gradient-radial {
  background: radial-gradient(ellipse at center, var(--tw-gradient-stops));
}
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}
.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}
.animate-pulse-slow-delayed {
  animation: pulse-slow 8s ease-in-out infinite;
  animation-delay: 2s;
}
.grid-overlay {
  background-image:
    linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
.particle {
  position: absolute;
  background: linear-gradient(45deg, #00f5ff, #3b82f6);
  border-radius: 50%;
  opacity: 0.6;
  animation: float-particle 15s infinite ease-in-out;
}
@keyframes float-particle {
  0%,
  100% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0.6;
  }
  25% {
    transform: translateY(-20px) translateX(10px) rotate(90deg);
    opacity: 1;
  }
  50% {
    transform: translateY(-10px) translateX(-10px) rotate(180deg);
    opacity: 0.8;
  }
  75% {
    transform: translateY(10px) translateX(5px) rotate(270deg);
    opacity: 0.4;
  }
}
.light-ray {
  position: absolute;
  background: linear-gradient(45deg, transparent, rgba(34, 211, 238, 0.3), transparent);
  border-radius: 50%;
  animation: light-ray-move 20s infinite ease-in-out;
  filter: blur(20px);
}
@keyframes light-ray-move {
  0%,
  100% {
    transform: scale(0.8) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.5) rotate(180deg);
    opacity: 0.6;
  }
}
.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle 3s infinite ease-in-out;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}
@keyframes twinkle {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}
.scan-line-horizontal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: #00f5ff;
  box-shadow:
    0 0 20px #00f5ff,
    0 0 40px #00f5ff;
  animation: scanHorizontal 2s ease-in-out infinite;
}
@keyframes scanHorizontal {
  0%,
  100% {
    top: 2%;
    opacity: 0;
  }
  10%,
  90% {
    opacity: 1;
  }
  50% {
    top: 98%;
  }
}
.typing-effect {
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto;
  animation: typing 2.5s steps(40) infinite alternate;
}
@keyframes typing {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.particle {
  position: absolute;
  background: rgba(0, 245, 255, 0.5);
  border-radius: 50%;
  animation: floatParticle linear infinite;
  filter: blur(1px);
}
@keyframes floatParticle {
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) translateX(50px) scale(0);
    opacity: 0;
  }
}
:deep(.ant-btn) {
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
}
.action-buttons-container {
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
  position: relative;
  z-index: 10;
}
.pill-btn-primary,
.pill-btn-danger {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 42px;
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: 3px;
  border-radius: 9999px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}
.btn-icon {
  font-size: 1.4rem;
  margin-right: 10px;
}
.pill-btn-primary {
  background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
  color: #ffffff;
  border: none;
  box-shadow:
    0 4px 15px rgba(0, 242, 254, 0.3),
    inset 0 -3px 10px rgba(0, 0, 0, 0.15);
}
.pill-btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  transform: skewX(-25deg);
  transition: all 0.6s ease;
  z-index: -1;
}
.pill-btn-primary:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow:
    0 10px 30px rgba(0, 242, 254, 0.6),
    inset 0 -3px 10px rgba(0, 0, 0, 0.15);
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}
.pill-btn-primary:hover::before {
  left: 150%;
}
.pill-btn-danger {
  background: rgba(220, 38, 38, 0.08);
  color: #f87171;
  border: 1px solid rgba(220, 38, 38, 0.4);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.05);
}
.pill-btn-danger:hover {
  background: rgba(220, 38, 38, 0.85);
  color: #ffffff;
  border-color: #ef4444;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 25px rgba(220, 38, 38, 0.5);
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
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
