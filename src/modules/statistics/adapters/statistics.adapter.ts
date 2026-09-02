import type { CategoryProgressDTO, LearningStatsDTO } from '@/api'

export interface CategoryProgressUIModel {
  categoryId: string
  title: string
  percent: number
}

export interface LearningStatsUIModel {
  period: string
  articlesStudied: number
  articlesGrowthText: string
  studyTimeFormatted: string
  studyTimeGrowthText: string
  testsCompleted: number
  testsGrowthText: string
  categories: CategoryProgressUIModel[]
}

export function adaptLearningStats(dto: LearningStatsDTO): LearningStatsUIModel {
  return {
    period: dto.period,
    articlesStudied: dto.articles_studied,
    articlesGrowthText: `▲ ${dto.articles_growth_percent}%`,
    studyTimeFormatted: dto.study_time_formatted,
    studyTimeGrowthText: `▲ ${dto.study_time_growth_formatted}`,
    testsCompleted: dto.tests_completed,
    testsGrowthText: `▲ ${dto.tests_growth_count}`,
    categories: dto.category_progress.map((c: CategoryProgressDTO) => ({
      categoryId: c.category_id,
      title: c.title,
      percent: c.progress_percent
    }))
  }
}
