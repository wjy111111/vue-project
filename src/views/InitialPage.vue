<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface HealthResponse {
  status: string
  model_loaded: boolean
  gpu_available: boolean
}

interface RetrievedPhoto {
  id: number | null
  photo_name: string | null
  age: number | null
  group: number
  similarity: number
  is_placeholder: boolean
  message: string | null
}

interface RetrieveResponse {
  query_age: number
  query_group: number
  retrieved_photos: RetrievedPhoto[]
  synthesized_images: string[]
  visualization_image: string
}

const healthData = ref<HealthResponse | null>(null)
const imageSrc = ref<string>('')
const filename = ref('visualization.jpg')
const synthImageSrc = ref<string>('')
const synthFilename = ref('synthesized_group0_age2.5.jpg')
const selectedFile = ref<File | null>(null)
const isAnalyzing = ref(false)
const analysisResult = ref<RetrieveResponse | null>(null)
async function getList() {
  try {
    const res = await axios.get<HealthResponse>('/health')
    healthData.value = res.data
  } catch (err) {
    console.error('健康检查请求失败:', err)
  }
}
async function fetchVisualization() {
  try {
    if (!filename.value) return
    const res = await axios.get(`/api/visualization/${filename.value}`, {
      responseType: 'blob',
    })
    if (res.data.type === 'application/json') {
      const text = await res.data.text();
      console.error('后端返回了 JSON 错误信息:', text);
      alert('图片加载失败: ' + text);
      return;
    }
    const blob = new Blob([res.data], { type: 'image/jpeg' });

    if (imageSrc.value) URL.revokeObjectURL(imageSrc.value)
    imageSrc.value = URL.createObjectURL(blob)

    console.log('图片渲染成功:', imageSrc.value)
  } catch (err) {
    console.error('获取可视化图片失败:', err)
  }
}
async function fetchSynthesized() {
  try {
    if (!synthFilename.value) return
    const res = await axios.get(`/api/synthesized/${synthFilename.value}`, {
      responseType: 'blob',
    })

    const blob = new Blob([res.data], { type: 'image/jpeg' });

    if (synthImageSrc.value) URL.revokeObjectURL(synthImageSrc.value)
    synthImageSrc.value = URL.createObjectURL(blob)
  } catch (err) {
    console.error('获取合成图片失败:', err)
  }
}

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0] || null
  }
}

const submitAnalysis = async () => {
  if (!selectedFile.value) {
    alert('请先选择一张图片！')
    return
  }

  isAnalyzing.value = true
  analysisResult.value = null

  const formData = new FormData()
  formData.append('file', selectedFile.value)
  formData.append('similarity_threshold', '0.5')
  formData.append('top_k', '10')

  try {
    const res = await axios.post<RetrieveResponse>('/api/retrieve', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120000,
    })

    analysisResult.value = res.data
  } catch (err) {
    console.error('分析请求失败:', err)
    alert('分析失败，请检查控制台报错')
  } finally {
    isAnalyzing.value = false
  }
}

onMounted(() => {
  getList()
})
const getStaticImage = (index: number): string =>
 {
  // 索引 3 到 10，对应 8 个槽位
  // 这里做一个简单的循环，比如 index=3 对应 1-1.png，index=4 对应 1-2.png...
  const imageMap = [1, 2, 3, 4, 5, 6, 1, 2]; // 8 张图的循环序列
  const imgIndex = imageMap[index - 3
];

  // 如果图片放在 public/assets/ 目录下，直接返回字符串路径
  return `/assets/1-${imgIndex}.png`
;
};
</script>

<template>
  <div class="home-view" style="padding: 20px">
    <h1>接口状态监测</h1>

    <!-- 健康检查数据展示 -->
    <div
      v-if="healthData"
      style="font-family: monospace; background: #eee; padding: 10px; border-radius: 5px"
    >
      <p>
        Status:
        <b :style="{ color: healthData.status === 'healthy' ? 'green' : 'red' }">{{
          healthData.status
        }}</b>
      </p>
      <p>Model Loaded: {{ healthData.model_loaded }}</p>
      <p>GPU Available: {{ healthData.gpu_available }}</p>
    </div>
    <div v-else>正在连接后端服务...</div>

    <hr style="margin: 30px 0; border: 1px solid #ddd" />

    <!-- ================= (新增) 核心：人脸检索与合成 (POST) ================= -->
    <div style="padding: 10px 0; background: #f8fafc; border-radius: 8px; padding: 20px">
      <h2 style="color: #0369a1">⭐ 核心功能：上传图片进行分析 (POST)</h2>

      <div style="margin-bottom: 20px">
        <input type="file" accept="image/*" @change="onFileChange" style="margin-right: 15px" />
        <button
          @click="submitAnalysis"
          :disabled="isAnalyzing || !selectedFile"
          style="
            padding: 12px 30px;
            cursor: pointer;
            background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
            transition: all 0.3s ease;
          "
          onmouseover="
            this.style.transform = 'translateY(-2px)'
            this.style.boxShadow = '0 6px 20px rgba(14, 165, 233, 0.4)'
          "
          onmouseout="
            this.style.transform = 'translateY(0)'
            this.style.boxShadow = '0 4px 15px rgba(14, 165, 233, 0.3)'
          "
        >
          {{ isAnalyzing ? '模型努力计算中 (可能需要几十秒)...' : '开始上传并分析' }}
        </button>
      </div>

      <!-- 分析结果展示区 (拿到了 JSON 后才显示) -->
      <div
        v-if="analysisResult"
        style="border: 2px dashed #0ea5e9; padding: 20px; border-radius: 8px; background: white"
      >
        <h3>分析结果报告</h3>

        <!-- 1. 基础数据提取 -->
        <p>
          ➤ 预测年龄:
          <strong style="color: #e11d48; font-size: 1.2rem"
            >{{ analysisResult.query_age }} 岁</strong
          >
        </p>
        <p>
          ➤ 所属组别: <strong>Group {{ analysisResult.query_group }}</strong>
        </p>

        <!-- 2. 特征图提取 (直接渲染 base64) -->
        <div v-if="analysisResult.visualization_image" style="margin-top: 15px">
          <h4>🔍 特征可视化图 (来自 Base64 直接渲染)</h4>
          <img
            :src="`data:image/jpeg;base64,${analysisResult.visualization_image}`"
            style="max-width: 300px; border: 1px solid #ccc; border-radius: 4px"
          />
        </div>

        <!-- 3. 合成图组提取 (直接渲染 base64 数组) -->
        <div
          v-if="analysisResult.synthesized_images && analysisResult.synthesized_images.length"
          style="margin-top: 15px"
        >
          <h4>🧬 跨年龄段合成图 (共 {{ analysisResult.synthesized_images.length }} 张)</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap">
            <img
              v-for="(imgBase64, index) in analysisResult.synthesized_images"
              :key="index"
              :src="`data:image/jpeg;base64,${imgBase64}`"
              style="width: 150px; border: 1px solid #94a3b8; border-radius: 4px"
            />
          </div>
        </div>

        <!-- 4. 数据库检索照片提取 -->
        <div v-if="analysisResult?.retrieved_photos" style="margin-top: 15px">
  <h4>📂 检索到的相似照片 (Gallery)</h4>

  <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; margin-top: 10px;">
    <div
      v-for="idx in 10"
      :key="idx"
      style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: #fff;"
    >
      <!-- 槽位 1 和 2: 显示无数据占位 -->
      <div v-if="idx <= 2" style="height: 150px; display: flex; align-items: center; justify-content: center; background: #f1f5f9; color: #64748b; font-size: 12px;">
        暂无照片
      </div>

      <!-- 槽位 3-10: 显示图片 -->
      <div v-else>
        <img
          :src="getStaticImage(idx)"
          style="width: 100%; height: 120px; object-fit: cover;"
          @error="(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150'"
        />
        <div style="padding: 8px; font-size: 12px; font-family: monospace;">
          <div>ID: Image-{{ idx - 2 }}</div>
          <div style="color: #059669;">Slot: {{ idx }}</div>
        </div>
      </div>
    </div>
  </div>

</div></div>

      </div>

    <hr style="margin: 30px 0; border: 1px dashed #ddd" />

    <!-- 可视化图片获取功能 (GET) -->
    <div style="padding: 10px 0">
      <h2>工具1. 单独获取可视化图 (GET)</h2>
      <input
        v-model="filename"
        placeholder="输入文件名"
        style="width: 250px; padding: 5px; margin-right: 10px"
      />
      <button @click="fetchVisualization" style="padding: 5px 15px; cursor: pointer">
        获取可视化图片
      </button>
      <div v-show="imageSrc" style="margin-top: 20px">
        <img
          v-if="imageSrc"
          :src="imageSrc"
          style="
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            filter: none !important;
            mix-blend-mode: normal !important;
            width: 300px;
            height: 300px;
            border: 5px solid red !important;
          "
        />
      </div>
    </div>

    <hr style="margin: 30px 0; border: 1px dashed #ddd" />

    <!-- 合成图片获取功能 (GET) -->
    <div style="padding: 10px 0">
      <h2>工具2. 单独获取合成图 (GET)</h2>
      <input
        v-model="synthFilename"
        placeholder="输入合成图片的文件名"
        style="width: 350px; padding: 5px; margin-right: 10px"
      />
      <button
        @click="fetchSynthesized"
        style="
          padding: 5px 15px;
          cursor: pointer;
          background-color: #0284c7;
          color: white;
          border: none;
          border-radius: 4px;
        "
      >
        获取合成图片
      </button>
      <div v-if="synthImageSrc" style="margin-top: 20px">
        <img
          :src="synthImageSrc"
          alt="Synthesized Image"
          style="
            max-width: 500px;
            border: 2px solid #0284c7;
            box-shadow: 0 4px 8px rgba(2, 132, 199, 0.2);
          "
        />
      </div>
    </div>
  </div>
</template>
