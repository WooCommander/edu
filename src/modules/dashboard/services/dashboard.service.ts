import { apiClient } from '@/api'
import {
  adaptContinueStudy,
  adaptDailyTask,
  adaptRecentStudy
} from '../adapters/dashboard.adapter'
import { dashboardState } from '../state/dashboard.state'

class DashboardService {
  public async loadDashboardData(): Promise<void> {
    dashboardState.isLoading = true
    try {
      const [user, continueItem, tasks, recents] = await Promise.all([
        apiClient.getUserProfile(),
        apiClient.getContinueStudyItem(),
        apiClient.getDailyTasks(),
        apiClient.getRecentStudies()
      ])

      dashboardState.user = user
      dashboardState.continueStudy = adaptContinueStudy(continueItem)
      dashboardState.dailyTasks = tasks.map(adaptDailyTask)
      dashboardState.recentStudies = recents.map(adaptRecentStudy)
    } finally {
      dashboardState.isLoading = false
    }
  }

  public toggleTaskCompletion(taskId: string): void {
    const task = dashboardState.dailyTasks.find(t => t.id === taskId)
    if (task) {
      task.isCompleted = !task.isCompleted
    }
  }
}

export const dashboardService = new DashboardService()
