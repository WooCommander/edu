export interface ContinueStudyItemDTO {
  article_id: string
  title: string
  sub_category: string
  parent_category: string
  remaining_minutes: number
  progress_percent: number
}

export interface DailyTaskDTO {
  id: string
  type: 'cards' | 'test' | 'practice'
  title: string
  subtitle: string
  count_badge: number
  is_completed: boolean
}

export interface RecentStudyDTO {
  id: string
  title: string
  time_ago: string
  duration_minutes: number
}

export interface CategoryProgressDTO {
  category_id: string
  title: string
  progress_percent: number
}

export interface LearningStatsDTO {
  period: string
  articles_studied: number
  articles_growth_percent: number
  study_time_formatted: string
  study_time_growth_formatted: string
  tests_completed: number
  tests_growth_count: number
  category_progress: CategoryProgressDTO[]
}
