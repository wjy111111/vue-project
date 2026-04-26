import { createRouter, createWebHistory } from 'vue-router'
import InitialPage from '../views/InitialPage.vue'
import UploadFiles from '../components/layouts/UploadFiles.vue'
import AboutView from '@/views/AboutView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/intro',
      name: 'intro',
      component: () => import('@/components/intro/IntroPage.vue'),
    },
    {
      path: '/',
      name: 'startup',
      component: AboutView,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/components/layouts/BasicLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: '/upload',
          name: 'upload',
          component: () => import('@/views/CoreFunction.vue'),
        },
        {
          path: '/face-recognition',
          name: 'faceRecognition',
          component: () => import('@/views/FaceRecognitionWorkbench.vue'),
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/LogIn.vue'),
        },
        {
          path: '/user-information',
          name: 'userInformation',
          component: () => import('@/views/UserInformation.vue'),
        },
        // 当访问根目录时，展示初始页
        {
          // 当访问根目录时，展示初始页
          path: '/InitialPage',
          name: 'InitialPage',
          component: InitialPage,
        },
        {
          // 点击进入后，跳转到系统主页
          path: '/UploadFiles', // 这里与 router.push('/upload') 对应
          name: 'UploadFiles',
          component: UploadFiles,
        },
        // {
        //   path: '/monkey-recognition',
        //   name: 'monkeyRecognition',
        //   component: () => import('@/views/MonkeyRecognition.vue'),
        // },
        // {
        //   path: '/missing-persons',
        //   name: 'missingPersons',
        //   component: () => import('@/views/MissingPersons.vue'),
        // },
        // {
        //   path: '/user/login',
        //   name: 'userLogin',
        //   component: () => import('@/views/UserLogin.vue'),
        // },
        // {
        //   path: '/system/settings',
        //   name: 'systemSettings',
        //   component: () => import('@/views/SystemSettings.vue'),
        // },
      ],
    },


  ],
})

export default router
