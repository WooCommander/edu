import {
  mockContinueItem,
  mockDailyTasks,
  mockKnowledgeGraph,
  mockKnowledgeTree,
  mockLearningStats,
  mockNotes,
  mockPracticeTask,
  mockQuizQuestions,
  mockRecentStudies,
  mockUser,
  mockWatchArticle
} from './mock-data'
import type { ArticleDTO, TreeNodeDTO } from './types/knowledge.dto'
import type { ContinueStudyItemDTO, DailyTaskDTO, LearningStatsDTO, RecentStudyDTO } from './types/learning.dto'
import type { NoteDTO } from './types/notes.dto'
import type { PracticeTaskDTO, QuizQuestionDTO } from './types/quiz.dto'
import type { KnowledgeGraphDTO } from './types/knowledge-map.dto'
import type { UserProfile } from '@/shared/types'

export const apiClient = {
  async getUserProfile(): Promise<UserProfile> {
    return Promise.resolve({ ...mockUser })
  },

  async getContinueStudyItem(): Promise<ContinueStudyItemDTO> {
    return Promise.resolve({ ...mockContinueItem })
  },

  async getDailyTasks(): Promise<DailyTaskDTO[]> {
    return Promise.resolve([...mockDailyTasks])
  },

  async getRecentStudies(): Promise<RecentStudyDTO[]> {
    return Promise.resolve([...mockRecentStudies])
  },

  async getKnowledgeTree(): Promise<TreeNodeDTO> {
    return Promise.resolve(JSON.parse(JSON.stringify(mockKnowledgeTree)))
  },

  async getArticleById(_id: string): Promise<ArticleDTO> {
    return Promise.resolve(JSON.parse(JSON.stringify(mockWatchArticle)))
  },

  async getNotesByArticleId(_articleId?: string): Promise<NoteDTO[]> {
    return Promise.resolve([...mockNotes])
  },

  async addNote(note: Omit<NoteDTO, 'id' | 'created_at' | 'created_at_label'>): Promise<NoteDTO> {
    const newNote: NoteDTO = {
      ...note,
      id: `note_${Date.now()}`,
      created_at: new Date().toISOString(),
      created_at_label: 'Только что'
    }
    mockNotes.unshift(newNote)
    return Promise.resolve(newNote)
  },

  async getQuizQuestionsByArticleId(_articleId: string): Promise<QuizQuestionDTO[]> {
    return Promise.resolve([...mockQuizQuestions])
  },

  async getPracticeTaskByArticleId(_articleId: string): Promise<PracticeTaskDTO> {
    return Promise.resolve({ ...mockPracticeTask })
  },

  async getLearningStats(): Promise<LearningStatsDTO> {
    return Promise.resolve({ ...mockLearningStats })
  },

  async getKnowledgeGraph(): Promise<KnowledgeGraphDTO> {
    return Promise.resolve(JSON.parse(JSON.stringify(mockKnowledgeGraph)))
  }
}
