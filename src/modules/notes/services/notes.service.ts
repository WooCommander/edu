import { apiClient } from '@/api'
import type { HighlightColor } from '@/api'
import { knowledgeState } from '@/modules/knowledge/state/knowledge.state'
import { adaptNote } from '../adapters/notes.adapter'
import { notesState } from '../state/notes.state'

class NotesService {
  public async loadNotes(articleId?: string): Promise<void> {
    notesState.isLoading = true
    try {
      const dtos = await apiClient.getNotesByArticleId(articleId)
      notesState.notes = dtos.map(adaptNote)
    } finally {
      notesState.isLoading = false
    }
  }

  public setActiveTab(tab: 'all' | 'current' | 'related'): void {
    notesState.activeTab = tab
  }

  public toggleCreateModal(open?: boolean): void {
    notesState.isCreateModalOpen = open !== undefined ? open : !notesState.isCreateModalOpen
  }

  public async createNote(
    quoteText: string,
    userComment: string,
    color: HighlightColor,
    articleId: string = knowledgeState.currentArticle?.id ?? 'article_watch'
  ): Promise<void> {
    const newNoteDto = await apiClient.addNote({
      article_id: articleId,
      quote_text: quoteText,
      user_comment: userComment,
      color: color,
      is_related: false
    })

    notesState.notes.unshift(adaptNote(newNoteDto))
    notesState.isCreateModalOpen = false
  }
}

export const notesService = new NotesService()
