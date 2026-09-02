import { reactive } from 'vue'
import type { SearchResultUIModel } from '../adapters/search.adapter'

interface SearchState {
  query: string
  activeFilter: string // 'all' | 'articles' | 'sections' | 'notes'
  bestMatches: SearchResultUIModel[]
  otherResults: SearchResultUIModel[]
  totalResultsCount: number
  isLoading: boolean
}

export const searchState = reactive<SearchState>({
  query: 'reactive',
  activeFilter: 'all',
  bestMatches: [
    {
      id: 'sr_1',
      title: 'Реактивность в Vue 3: что это такое',
      categoryPath: 'Vue 3 › Основы › Реактивность',
      snippetText: '...фундаментальная концепция...',
      entityType: 'article',
      articleId: 'article_watch'
    },
    {
      id: 'sr_2',
      title: 'ref и reactive: сравнение',
      categoryPath: 'Vue 3 › Основы › Реактивность',
      snippetText: '...разница между ref и reactive...',
      entityType: 'article',
      articleId: 'article_ref_reactive'
    },
    {
      id: 'sr_3',
      title: 'watch и watchEffect: реактивные эффекты',
      categoryPath: 'Vue 3 › Основы › Реактивность › watch',
      snippetText: '...как создавать реактивные побочные...',
      entityType: 'article',
      articleId: 'article_watch'
    }
  ],
  otherResults: [
    {
      id: 'sr_4',
      title: 'Computed: производные состояния',
      categoryPath: 'Vue 3 › Реактивность',
      snippetText: '',
      entityType: 'section',
      articleId: 'article_computed'
    },
    {
      id: 'sr_5',
      title: 'Deep reactive objects',
      categoryPath: '',
      snippetText: '',
      entityType: 'section',
      articleId: 'article_watch'
    },
    {
      id: 'sr_6',
      title: 'Ошибки реактивности',
      categoryPath: 'Vue 3 › Практика',
      snippetText: '',
      entityType: 'section',
      articleId: 'article_watch'
    }
  ],
  totalResultsCount: 42,
  isLoading: false
})
