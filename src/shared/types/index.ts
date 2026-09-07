export type Id = string

export type EntityStatus = 'idle' | 'loading' | 'success' | 'error'

export type NavTab = 'dashboard' | 'search' | 'notes'

export type ActiveScreen =
  | 'dashboard'
  | 'search'
  | 'notes'
  | 'article'
  | 'zen'
  | 'profile'

export interface UserProfile {
  id: Id
  name: string
  avatarUrl: string
  greeting: string
  email: string
}
