import { apiClient } from '@/api'
import { adaptContinueStudy, adaptRecentStudy } from '../adapters/dashboard.adapter'
import { dashboardState } from '../state/dashboard.state'

class DashboardService {
  public async loadDashboardData(): Promise<void> {
    dashboardState.isLoading = true
    try {
      const [user, continueItem, recents] = await Promise.all([
        apiClient.getUserProfile(),
        apiClient.getContinueStudyItem(),
        apiClient.getRecentStudies()
      ])

      dashboardState.user = user
      dashboardState.continueStudy = continueItem ? adaptContinueStudy(continueItem) : null
      dashboardState.recentStudies = recents.map(adaptRecentStudy)
    } finally {
      dashboardState.isLoading = false
    }
  }
}

export const dashboardService = new DashboardService()
