import { reactive } from 'vue'
import type { NavTab, UserProfile } from '@/shared/types'

interface AppState {
  activeTab: NavTab
  isTocOpen: boolean
  isBreadcrumbsOpen: boolean
  isNoteModalOpen: boolean
  user: UserProfile | null
  toastMessage: string | null
}

export const appState = reactive<AppState>({
  activeTab: 'dashboard',
  isTocOpen: false,
  isBreadcrumbsOpen: false,
  isNoteModalOpen: false,
  user: null,
  toastMessage: null
})
