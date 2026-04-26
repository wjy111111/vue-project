import request from '@/utils/request'

// ================= 类型定义 =================
export interface HealthResponse {
  status: string
  model_loaded: boolean
  gpu_available: boolean
}

export interface RetrievedPhoto {
  id: number | null
  photo_name: string | null
  age: number | null
  group: number
  similarity: number
  is_placeholder: boolean
  message: string | null
}

export interface RetrieveResponse {
  query_age: number
  query_group: number
  retrieved_photos: RetrievedPhoto[]
  synthesized_images: string[]
  visualization_image: string
}

// ================= 接口 1 & 2 =================

// 1. 健康检查
export const checkHealth = (): Promise<HealthResponse> => {
  return request({
    url: '/health',
    method: 'get'
  })
}

// 2. 人脸检索与年龄合成
export const uploadFaceImage = (
  file: File,
  threshold: number = 0.5,
  topK: number = 10
): Promise<RetrieveResponse> => {
  const formData = new FormData()
  formData.append('file', file)

  return request({
    url: '/api/retrieve',
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
    params: { similarity_threshold: threshold, top_k: topK }
  })
}

// ================= 接口 3 & 4 =================

// 3. 获取可视化结果
export const getVisualizationResult = (filename: string): Promise<Blob> => {
  return request({
    url: `/api/visualization/${filename}`,
    method: 'get',
    // ★ 极其重要：告诉 Axios 这次请求返回的是二进制文件流，不是 JSON！
    responseType: 'blob'
  })
}

// 4. 获取合成图片
export const getSynthesizedImage = (filename: string): Promise<Blob> => {
  return request({
    url: `/api/synthesized/${filename}`,
    method: 'get',
    responseType: 'blob'
  })
}
