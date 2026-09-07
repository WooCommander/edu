import { describe, expect, it } from 'vitest'
import { router } from '../router'
import { appService } from '@/app/services/app-service'
import { appState } from '@/app/state/app-state'

describe('Domain Services & AppService Tests', () => {
  it('AppService updates activeTab and routes strictly', async () => {
    await appService.navigateToTab('search')
    expect(appState.activeTab).toBe('search')
    expect(router.currentRoute.value.name).toBe('search')

    await appService.navigateToTab('notes')
    expect(appState.activeTab).toBe('notes')
    expect(router.currentRoute.value.name).toBe('notes')

    await appService.openArticle('article_split')
    expect(router.currentRoute.value.name).toBe('article')
    expect(router.currentRoute.value.params.id).toBe('article_split')

    await appService.openZenMode()
    expect(router.currentRoute.value.name).toBe('zen')
  })
})
