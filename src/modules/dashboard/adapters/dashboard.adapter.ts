import type { ContinueStudyItemDTO, DailyTaskDTO, RecentStudyDTO } from '@/api'

export interface ContinueStudyUIModel {
  articleId: string
  title: string
  categoryPath: string
  remainingTimeText: string
  progress: number
}

export interface DailyTaskUIModel {
  id: string
  type: 'cards' | 'test' | 'practice'
  title: string
  subtitle: string
  badgeCount: number
  isCompleted: boolean
}

export interface RecentStudyUIModel {
  id: string
  title: string
  timeAgo: string
  durationText: string
}

export function adaptContinueStudy(dto: ContinueStudyItemDTO): ContinueStudyUIModel {
  return {
    articleId: dto.article_id,
    title: dto.title,
    categoryPath: `${dto.parent_category} › ${dto.sub_category}`,
    remainingTimeText: `Осталось: ${dto.remaining_minutes} мин`,
    progress: dto.progress_percent
  }
}

export function adaptDailyTask(dto: DailyTaskDTO): DailyTaskUIModel {
  return {
    id: dto.id,
    type: dto.type,
    title: dto.title,
    subtitle: dto.subtitle,
    badgeCount: dto.count_badge,
    isCompleted: dto.is_completed
  }
}

export function adaptRecentStudy(dto: RecentStudyDTO): RecentStudyUIModel {
  return {
    id: dto.id,
    title: dto.title,
    timeAgo: dto.time_ago,
    durationText: `${dto.duration_minutes} мин`
  }
}
