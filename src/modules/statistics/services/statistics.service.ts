import { apiClient } from '@/api'
import { adaptLearningStats } from '../adapters/statistics.adapter'
import { statisticsState } from '../state/statistics.state'

class StatisticsService {
  public async loadStats(period: string = statisticsState.selectedPeriod): Promise<void> {
    statisticsState.isLoading = true
    try {
      const dto = await apiClient.getLearningStats(period)
      statisticsState.stats = adaptLearningStats(dto)
    } finally {
      statisticsState.isLoading = false
    }
  }

  public async setPeriod(period: string): Promise<void> {
    statisticsState.selectedPeriod = period
    await this.loadStats(period)
  }
}

export const statisticsService = new StatisticsService()
