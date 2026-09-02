export type HighlightColor = 'amber' | 'emerald' | 'purple' | 'blue'

export interface NoteDTO {
  id: string
  article_id: string
  quote_text: string
  user_comment?: string
  color: HighlightColor
  created_at: string
  created_at_label: string
  is_related?: boolean
}
