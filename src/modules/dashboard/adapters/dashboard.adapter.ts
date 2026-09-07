import type { ContinueStudyItemDTO, RecentStudyDTO } from '@/api'

export interface ContinueStudyUIModel {
  articleId: string
  title: string
  categoryPath: string
  remainingTimeText: string
  progress: number
}

export interface RecentStudyUIModel {
  id: string
  title: string
  timeAgo: string
  durationText: string
  articleId: string
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

export function adaptRecentStudy(dto: RecentStudyDTO): RecentStudyUIModel {
  return {
    id: dto.id,
    title: dto.title,
    timeAgo: dto.time_ago,
    durationText: `${dto.duration_minutes} мин`,
    articleId: dto.article_id
  }
}
