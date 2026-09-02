import type { HighlightColor, NoteDTO } from '@/api'

export interface NoteUIModel {
  id: string
  articleId: string
  quoteText: string
  userComment?: string
  color: HighlightColor
  createdLabel: string
  isRelated: boolean
}

export function adaptNote(dto: NoteDTO): NoteUIModel {
  return {
    id: dto.id,
    articleId: dto.article_id,
    quoteText: dto.quote_text,
    userComment: dto.user_comment,
    color: dto.color,
    createdLabel: dto.created_at_label,
    isRelated: !!dto.is_related
  }
}
