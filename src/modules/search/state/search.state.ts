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
  query: '',
  activeFilter: 'all',
  bestMatches: [],
  otherResults: [],
  totalResultsCount: 0,
  isLoading: false
})
