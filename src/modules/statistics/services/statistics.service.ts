import { apiClient } from '@/api'
import { adaptLearningStats } from '../adapters/statistics.adapter'
import { statisticsState } from '../state/statistics.state'

class StatisticsService {
  public async loadStats(): Promise<void> {
    statisticsState.isLoading = true
    try {
      const dto = await apiClient.getLearningStats()
      statisticsState.stats = adaptLearningStats(dto)
    } finally {
      statisticsState.isLoading = false
    }
  }

  public setPeriod(period: string): void {
    statisticsState.selectedPeriod = period
  }
}

export const statisticsService = new StatisticsService()
