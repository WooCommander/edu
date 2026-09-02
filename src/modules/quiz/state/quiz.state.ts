import { reactive } from 'vue'
import type { PracticeTaskUIModel, QuizQuestionUIModel } from '../adapters/quiz.adapter'

interface QuizState {
  currentQuestion: QuizQuestionUIModel | null
  selectedOptionKey: string | null
  isAnswerSubmitted: boolean
  currentPracticeTask: PracticeTaskUIModel | null
  userCode: string
  activePracticeTab: 'condition' | 'solution'
  isTaskVerified: boolean
  isLoading: boolean
}

export const quizState = reactive<QuizState>({
  currentQuestion: null,
  selectedOptionKey: null,
  isAnswerSubmitted: false,
  currentPracticeTask: null,
  userCode: '',
  activePracticeTab: 'condition',
  isTaskVerified: false,
  isLoading: false
})
