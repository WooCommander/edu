import { reactive } from 'vue'
import type { NavTab, UserProfile } from '@/shared/types'

interface AppState {
  activeTab: NavTab
  user: UserProfile | null
  toastMessage: string | null
}

export const appState = reactive<AppState>({
  activeTab: 'dashboard',
  user: null,
  toastMessage: null
})
