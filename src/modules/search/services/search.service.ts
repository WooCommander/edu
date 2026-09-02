import { searchState } from '../state/search.state'

class SearchService {
  public setQuery(query: string): void {
    searchState.query = query
  }

  public setFilter(filterKey: string): void {
    searchState.activeFilter = filterKey
  }
}

export const searchService = new SearchService()
