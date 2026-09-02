import { reactive } from 'vue'
import type { LearningStatsUIModel } from '../adapters/statistics.adapter'

interface StatisticsState {
  stats: LearningStatsUIModel | null
  selectedPeriod: string
  isLoading: boolean
}

export const statisticsState = reactive<StatisticsState>({
  stats: null,
  selectedPeriod: 'За неделю',
  isLoading: false
})
