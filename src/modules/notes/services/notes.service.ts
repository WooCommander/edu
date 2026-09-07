import { apiClient } from '@/api'
import type { HighlightColor } from '@/api'
import { knowledgeState } from '@/modules/knowledge/state/knowledge.state'
import { adaptNote, type NoteUIModel } from '../adapters/notes.adapter'
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
    if (!notesState.isCreateModalOpen) notesState.editingNote = null
  }

  public openEditModal(note: NoteUIModel): void {
    notesState.editingNote = note
    notesState.isCreateModalOpen = true
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

  public async updateNote(id: string, quoteText: string, userComment: string, color: HighlightColor): Promise<void> {
    const updatedDto = await apiClient.updateNote(id, {
      quote_text: quoteText,
      user_comment: userComment,
      color
    })

    const index = notesState.notes.findIndex(n => n.id === id)
    if (index !== -1) notesState.notes[index] = adaptNote(updatedDto)

    notesState.isCreateModalOpen = false
    notesState.editingNote = null
  }

  public async deleteNote(id: string): Promise<void> {
    await apiClient.deleteNote(id)
    notesState.notes = notesState.notes.filter(n => n.id !== id)
  }
}

export const notesService = new NotesService()
