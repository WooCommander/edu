import { reactive } from 'vue'
import type { ContinueStudyUIModel, DailyTaskUIModel, RecentStudyUIModel } from '../adapters/dashboard.adapter'
import type { UserProfile } from '@/shared/types'

interface DashboardState {
  user: UserProfile | null
  continueStudy: ContinueStudyUIModel | null
  dailyTasks: DailyTaskUIModel[]
  recentStudies: RecentStudyUIModel[]
  isLoading: boolean
}

export const dashboardState = reactive<DashboardState>({
  user: null,
  continueStudy: null,
  dailyTasks: [],
  recentStudies: [],
  isLoading: false
})
