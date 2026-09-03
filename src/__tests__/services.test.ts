import { describe, expect, it } from 'vitest'
import { router } from '../router'
import { appService } from '@/app/services/app-service'
import { appState } from '@/app/state/app-state'
import { dashboardService } from '@/modules/dashboard/services/dashboard.service'
import { dashboardState } from '@/modules/dashboard/state/dashboard.state'
import { quizService } from '@/modules/quiz/services/quiz.service'
import { quizState } from '@/modules/quiz/state/quiz.state'

describe('Domain Services & AppService Tests', () => {
  it('AppService updates activeTab and activeScreen strictly', () => {
    appService.navigateToTab('search')
    expect(appState.activeTab).toBe('search')
    expect(router.currentRoute.value.name).toBe('search')

    appService.navigateToTab('map')
    expect(appState.activeTab).toBe('map')
    expect(router.currentRoute.value.name).toBe('map')

    appService.openZenMode()
    expect(router.currentRoute.value.name).toBe('zen')

    appService.openArticle('article_ref_reactive')
    expect(router.currentRoute.value.name).toBe('article')
    expect(router.currentRoute.value.params.id).toBe('article_ref_reactive')
  })

  it('DashboardService loads data and updates state', async () => {
    await dashboardService.loadDashboardData()
    expect(dashboardState.user).not.toBeNull()
    expect(dashboardState.continueStudy).not.toBeNull()
    expect(dashboardState.dailyTasks.length).toBeGreaterThan(0)
    expect(dashboardState.recentStudies.length).toBeGreaterThan(0)
  })

  it('QuizService loads question and checks option selection', async () => {
    await quizService.loadQuizQuestion()
    expect(quizState.currentQuestion).not.toBeNull()
    expect(quizState.selectedOptionKey).toBeNull()

    quizService.selectOption('B')
    expect(quizState.selectedOptionKey).toBe('B')

    quizService.submitAnswer()
    expect(quizState.isAnswerSubmitted).toBe(true)
  })
})
