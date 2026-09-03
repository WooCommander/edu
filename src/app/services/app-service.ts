import { appState } from '../state/app-state'
import type { ActiveScreen, NavTab, UserProfile } from '@/shared/types'

class AppService {
  public setUser(user: UserProfile | null): void {
    appState.user = user
  }

  public navigateToTab(tab: NavTab): void {
    appState.activeTab = tab
    if (tab === 'dashboard') appState.activeScreen = 'dashboard'
    else if (tab === 'search') appState.activeScreen = 'search'
    else if (tab === 'map') appState.activeScreen = 'map'
    else if (tab === 'notes') appState.activeScreen = 'notes'
    else if (tab === 'profile') appState.activeScreen = 'profile'
  }

  public navigateToScreen(screen: ActiveScreen, articleId?: string): void {
    if (articleId) {
      appState.selectedArticleId = articleId
    }
    appState.activeScreen = screen
  }

  public openArticle(articleId: string = 'article_watch'): void {
    appState.selectedArticleId = articleId
    appState.activeScreen = 'article'
  }

  public openTree(): void {
    appState.activeScreen = 'tree'
  }

  public openZenMode(): void {
    appState.activeScreen = 'zen'
  }

  public openQuiz(articleId: string = 'article_watch'): void {
    appState.selectedArticleId = articleId
    appState.activeScreen = 'quiz'
  }

  public openPractice(articleId: string = 'article_watch'): void {
    appState.selectedArticleId = articleId
    appState.activeScreen = 'practice'
  }

  public toggleToc(forceState?: boolean): void {
    appState.isTocOpen = forceState !== undefined ? forceState : !appState.isTocOpen
  }

  public toggleBreadcrumbs(forceState?: boolean): void {
    appState.isBreadcrumbsOpen = forceState !== undefined ? forceState : !appState.isBreadcrumbsOpen
  }

  public toggleNoteModal(forceState?: boolean): void {
    appState.isNoteModalOpen = forceState !== undefined ? forceState : !appState.isNoteModalOpen
  }

  public showToast(message: string): void {
    appState.toastMessage = message
    setTimeout(() => {
      if (appState.toastMessage === message) {
        appState.toastMessage = null
      }
    }, 2500)
  }
}

export const appService = new AppService()
