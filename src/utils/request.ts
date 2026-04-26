import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError
} from 'axios'

// ★ 新增：明确告诉 TS，后端返回的错误数据里可能会有一个 detail 字段
interface BackendErrorData {
  detail?: string
  [key: string]: unknown // 允许其他未知的属性存在
}

// 1. 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 300000 // 5分钟超时
})

// 2. 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const apiKey = import.meta.env.VITE_API_KEY
    if (apiKey && config.headers) {
      config.headers['x_api_key'] = apiKey
    }
    return config
  },
  // ★ 修复 1：把 any 改为 unknown
  (error: unknown) => {
    return Promise.reject(error)
  }
)

// 3. 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 剥离外层，直接返回后端实际数据
    return response.data
  },
  // ★ 修复 2：把 AxiosError<any> 改为 AxiosError<BackendErrorData>
  (error: AxiosError<BackendErrorData>) => {
    if (error.response) {
      const status = error.response.status
      switch (status) {
        case 401:
          alert('API 密钥无效或未授权！')
          break
        case 429:
          alert('请求过于频繁，请稍后再试！')
          break
        case 500:
          alert('服务器/模型内部错误！')
          break
        default:
          // 现在 TS 知道 data 里面可能有 detail 了，再也不会报错
          alert(`请求失败：${error.response.data?.detail || '未知错误'}`)
      }
    } else if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      alert('模型处理超时，请检查后端状态！')
    } else {
      alert('网络异常，请检查您的网络连接！')
    }

    return Promise.reject(error)
  }
)

export default service
