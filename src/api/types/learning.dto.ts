export interface ContinueStudyItemDTO {
  article_id: string
  title: string
  sub_category: string
  parent_category: string
  remaining_minutes: number
  progress_percent: number
}

export interface RecentStudyDTO {
  id: string
  title: string
  time_ago: string
  duration_minutes: number
  article_id: string
}
