import { reactive } from 'vue'
import type { ContinueStudyUIModel, RecentStudyUIModel } from '../adapters/dashboard.adapter'
import type { UserProfile } from '@/shared/types'

interface DashboardState {
  user: UserProfile | null
  continueStudy: ContinueStudyUIModel | null
  recentStudies: RecentStudyUIModel[]
  isLoading: boolean
}

export const dashboardState = reactive<DashboardState>({
  user: null,
  continueStudy: null,
  recentStudies: [],
  isLoading: false
})
