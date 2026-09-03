import { describe, expect, it } from 'vitest'
import {
  adaptContinueStudy,
  adaptDailyTask,
  adaptRecentStudy
} from '@/modules/dashboard/adapters/dashboard.adapter'
import {
  adaptArticle,
  adaptTreeNode
} from '@/modules/knowledge/adapters/knowledge.adapter'
import { adaptNote } from '@/modules/notes/adapters/notes.adapter'
import { adaptQuizQuestion } from '@/modules/quiz/adapters/quiz.adapter'
import { adaptLearningStats } from '@/modules/statistics/adapters/statistics.adapter'
import {
  mockContinueItem,
  mockDailyTasks,
  mockLearningStats,
  mockNotes,
  mockQuizQuestions,
  mockRecentStudies,
  mockWatchArticle
} from '@/api/mock-data'

describe('Domain Adapters Tests', () => {
  it('adaptContinueStudy transforms DTO correctly', () => {
    const result = adaptContinueStudy(mockContinueItem)
    expect(result.articleId).toBe('article_watch')
    expect(result.title).toBe('watch и watchEffect')
    expect(result.categoryPath).toBe('Vue 3 › Основы > Реактивность')
    expect(result.remainingTimeText).toContain('6 мин')
    expect(result.progress).toBe(60)
  })

  it('adaptDailyTask transforms task DTO', () => {
    const task = adaptDailyTask(mockDailyTasks[0])
    expect(task.id).toBe('task_cards')
    expect(task.type).toBe('cards')
    expect(task.badgeCount).toBe(4)
    expect(task.isCompleted).toBe(false)
  })

  it('adaptRecentStudy formats duration correctly', () => {
    const recent = adaptRecentStudy(mockRecentStudies[0])
    expect(recent.title).toBe('watch и watchEffect')
    expect(recent.durationText).toBe('8 мин')
    expect(recent.timeAgo).toBe('Сегодня')
  })

  it('adaptArticle maps full article DTO to UI model', () => {
    const article = adaptArticle(mockWatchArticle)
    expect(article.id).toBe('article_watch')
    expect(article.tags).toContain('Vue 3')
    expect(article.difficultyText).toBe('Средний уровень')
    expect(article.readTimeText).toBe('7 мин чтения')
    expect(article.sections.length).toBeGreaterThan(0)
    expect(article.blocks.length).toBeGreaterThan(0)
  })

  it('adaptTreeNode builds recursive tree UI model', () => {
    const tree = adaptTreeNode({
      id: 'root',
      code: '1.',
      title: 'Root',
      level: 1,
      has_article: false,
      children_count: 1,
      children: [
        {
          id: 'child_1',
          code: '1.1.',
          title: 'Child',
          level: 2,
          has_article: true,
          article_id: 'art_1',
          children_count: 0
        }
      ]
    })
    expect(tree.id).toBe('root')
    expect(tree.children.length).toBe(1)
    expect(tree.children[0].articleId).toBe('art_1')
    expect(tree.children[0].level).toBe(2)
  })

  it('adaptNote transforms note DTO', () => {
    const note = adaptNote(mockNotes[0])
    expect(note.id).toBe('note_1')
    expect(note.color).toBe('amber')
    expect(note.quoteText).toContain('watch отслеживает')
  })

  it('adaptQuizQuestion sets up question progress label', () => {
    const q = adaptQuizQuestion(mockQuizQuestions[0])
    expect(q.progressLabel).toBe('Вопрос 3 из 5')
    expect(q.correctKey).toBe('B')
    expect(q.options.length).toBe(4)
  })

  it('adaptLearningStats calculates formatted growth indicators', () => {
    const stats = adaptLearningStats(mockLearningStats)
    expect(stats.articlesStudied).toBe(28)
    expect(stats.articlesGrowthText).toBe('▲ 12%')
    expect(stats.studyTimeFormatted).toBe('6ч 40м')
    expect(stats.categories.length).toBe(5)
  })
})
