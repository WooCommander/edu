import { appState } from '../state/app-state'
import type { ActiveScreen, NavTab, UserProfile } from '@/shared/types'
import { router } from '@/router'
import { knowledgeService } from '@/modules/knowledge/services/knowledge.service'
import { notesService } from '@/modules/notes/services/notes.service'

class AppService {
  public setUser(user: UserProfile | null): void {
    appState.user = user
  }

  public navigateToTab(tab: NavTab): Promise<unknown> {
    appState.activeTab = tab
    if (tab === 'dashboard') return router.push({ name: 'dashboard' })
    if (tab === 'search') return router.push({ name: 'search' })
    return router.push({ name: 'notes' })
  }

  public navigateToScreen(screen: ActiveScreen, articleId?: string): Promise<unknown> {
    return router.push({ name: screen, params: articleId ? { id: articleId } : undefined })
  }

  public goBack(): void {
    router.back()
  }

  public openArticle(articleId: string = 'article_watch'): Promise<unknown> {
    return router.push({ name: 'article', params: { id: articleId } })
  }

  public openZenMode(): Promise<unknown> {
    const id = router.currentRoute.value.params.id
    return router.push({ name: 'zen', params: id ? { id } : undefined })
  }

  public toggleToc(forceState?: boolean): void {
    knowledgeService.toggleToc(forceState)
  }

  public toggleBreadcrumbs(forceState?: boolean): void {
    knowledgeService.toggleBreadcrumbs(forceState)
  }

  public toggleNoteModal(forceState?: boolean): void {
    notesService.toggleCreateModal(forceState)
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
