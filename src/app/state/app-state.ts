import { reactive } from 'vue'
import type { ActiveScreen, NavTab, UserProfile } from '@/shared/types'

interface AppState {
  activeTab: NavTab
  activeScreen: ActiveScreen
  selectedArticleId: string
  isTocOpen: boolean
  isBreadcrumbsOpen: boolean
  isNoteModalOpen: boolean
  user: UserProfile | null
  toastMessage: string | null
}

export const appState = reactive<AppState>({
  activeTab: 'dashboard',
  activeScreen: 'dashboard',
  selectedArticleId: 'article_watch',
  isTocOpen: false,
  isBreadcrumbsOpen: false,
  isNoteModalOpen: false,
  user: null,
  toastMessage: null
})
