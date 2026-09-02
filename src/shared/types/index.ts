export type Id = string

export type EntityStatus = 'idle' | 'loading' | 'success' | 'error'

export type NavTab = 'dashboard' | 'search' | 'map' | 'notes' | 'profile'

export type ActiveScreen = 
  | 'dashboard'
  | 'search'
  | 'map'
  | 'notes'
  | 'profile'
  | 'tree'
  | 'article'
  | 'zen'
  | 'quiz'
  | 'practice'
  | 'breadcrumbs'

export interface UserProfile {
  id: Id
  name: string
  avatarUrl: string
  greeting: string
}
