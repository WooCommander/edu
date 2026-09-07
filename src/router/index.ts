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
    name: 'search',
    component: () => import('@/modules/search/ui/GlobalSearchView.vue')
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
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
