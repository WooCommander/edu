import { reactive } from 'vue'
import type { NoteUIModel } from '../adapters/notes.adapter'

interface NotesState {
  notes: NoteUIModel[]
  activeTab: 'all' | 'current' | 'related'
  isCreateModalOpen: boolean
  isLoading: boolean
}

export const notesState = reactive<NotesState>({
  notes: [],
  activeTab: 'current',
  isCreateModalOpen: false,
  isLoading: false
})
