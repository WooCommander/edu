import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/modules/dashboard/ui/DashboardView.vue')
  },
  {
    path: '/search',
    redirect: '/'
  },
  {
    path: '/tree',
    redirect: '/'
  },
  {
    path: '/article/:id?',
    name: 'article',
    component: () => import('@/modules/knowledge/ui/ArticleReaderView.vue')
  },
  {
    path: '/zen/:id?',
    name: 'zen',
    component: () => import('@/modules/knowledge/ui/ZenReaderView.vue')
  },
  {
    path: '/notes',
    name: 'notes',
    component: () => import('@/modules/notes/ui/NotesListView.vue')
  },
  {
    path: '/quiz/:id?',
    name: 'quiz',
    component: () => import('@/modules/quiz/ui/QuizView.vue')
  },
  {
    path: '/practice/:id?',
    name: 'practice',
    component: () => import('@/modules/quiz/ui/PracticeTaskView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/modules/statistics/ui/StatisticsView.vue')
  },
  {
    path: '/map',
    redirect: '/'
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
