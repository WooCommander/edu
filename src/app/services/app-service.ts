import { appState } from '../state/app-state'
import type { ActiveScreen, NavTab, UserProfile } from '@/shared/types'
import { router } from '@/router'

class AppService {
  public setUser(user: UserProfile | null): void {
    appState.user = user
  }

  public navigateToTab(tab: NavTab): void {
    appState.activeTab = tab
    if (tab === 'dashboard') router.push({ name: 'dashboard' })
    else if (tab === 'search') router.push({ name: 'search' })
    else if (tab === 'map') router.push({ name: 'map' })
    else if (tab === 'notes') router.push({ name: 'notes' })
    else if (tab === 'profile') router.push({ name: 'profile' })
  }

  public navigateToScreen(screen: ActiveScreen, articleId?: string): void {
    router.push({ name: screen, params: articleId ? { id: articleId } : undefined })
  }

  public openArticle(articleId: string = 'article_watch'): void {
    router.push({ name: 'article', params: { id: articleId } })
  }

  public openTree(): void {
    router.push({ name: 'tree' })
  }

  public openZenMode(): void {
    const id = router.currentRoute.value.params.id
    router.push({ name: 'zen', params: id ? { id } : undefined })
  }

  public openQuiz(articleId?: string): void {
    const id = articleId || router.currentRoute.value.params.id
    router.push({ name: 'quiz', params: id ? { id } : undefined })
  }

  public openPractice(articleId?: string): void {
    const id = articleId || router.currentRoute.value.params.id
    router.push({ name: 'practice', params: id ? { id } : undefined })
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
