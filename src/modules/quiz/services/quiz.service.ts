import { apiClient } from '@/api'
import { adaptPracticeTask, adaptQuizQuestion } from '../adapters/quiz.adapter'
import { quizState } from '../state/quiz.state'

class QuizService {
  public async loadQuizQuestion(articleId: string = 'article_watch'): Promise<void> {
    quizState.isLoading = true
    try {
      const questions = await apiClient.getQuizQuestionsByArticleId(articleId)
      if (questions.length > 0) {
        quizState.currentQuestion = adaptQuizQuestion(questions[0])
        quizState.selectedOptionKey = null
        quizState.isAnswerSubmitted = false
      }
    } finally {
      quizState.isLoading = false
    }
  }

  public async loadPracticeTask(articleId: string = 'article_watch'): Promise<void> {
    quizState.isLoading = true
    try {
      const taskDto = await apiClient.getPracticeTaskByArticleId(articleId)
      quizState.currentPracticeTask = adaptPracticeTask(taskDto)
      quizState.userCode = taskDto.initial_code
      quizState.isTaskVerified = false
    } finally {
      quizState.isLoading = false
    }
  }

  public selectOption(key: string): void {
    if (!quizState.isAnswerSubmitted) {
      quizState.selectedOptionKey = key
    }
  }

  public submitAnswer(): void {
    if (quizState.selectedOptionKey) {
      quizState.isAnswerSubmitted = true
    }
  }

  public setPracticeTab(tab: 'condition' | 'solution'): void {
    quizState.activePracticeTab = tab
  }

  public verifySolution(): void {
    quizState.isTaskVerified = true
  }

  public updateUserCode(code: string): void {
    quizState.userCode = code
  }
}

export const quizService = new QuizService()
