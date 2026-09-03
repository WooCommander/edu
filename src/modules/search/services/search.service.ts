import { apiClient } from '@/api'
import { adaptSearchResult } from '../adapters/search.adapter'
import { searchState } from '../state/search.state'

const DEBOUNCE_MS = 250

class SearchService {
  private debounceTimer: ReturnType<typeof setTimeout> | undefined

  public setQuery(query: string): void {
    searchState.query = query
    if (this.debounceTimer) clearTimeout(this.debounceTimer)
    this.debounceTimer = setTimeout(() => {
      void this.runSearch()
    }, DEBOUNCE_MS)
  }

  public setFilter(filterKey: string): void {
    searchState.activeFilter = filterKey
    void this.runSearch()
  }

  public async runSearch(): Promise<void> {
    const query = searchState.query.trim()
    if (!query) {
      searchState.bestMatches = []
      searchState.otherResults = []
      searchState.totalResultsCount = 0
      return
    }

    searchState.isLoading = true
    try {
      const dtos = await apiClient.searchContent(query)
      const results = dtos.map(adaptSearchResult)
      const filtered =
        searchState.activeFilter === 'all' ? results : results.filter(r => `${r.entityType}s` === searchState.activeFilter)

      searchState.bestMatches = filtered.filter(r => r.entityType === 'article')
      searchState.otherResults = filtered.filter(r => r.entityType !== 'article')
      searchState.totalResultsCount = filtered.length
    } finally {
      searchState.isLoading = false
    }
  }
}

export const searchService = new SearchService()
