import type { PracticeTaskDTO, QuizQuestionDTO } from '@/api'

export interface QuizQuestionUIModel {
  id: string
  articleId: string
  progressLabel: string
  questionText: string
  options: {
    key: string
    text: string
  }[]
  correctKey: string
  explanationText: string
}

export interface PracticeTaskUIModel {
  id: string
  articleId: string
  progressLabel: string
  title: string
  description: string
  requirements: string[]
  initialCode: string
  solutionCode: string
}

export function adaptQuizQuestion(dto: QuizQuestionDTO): QuizQuestionUIModel {
  return {
    id: dto.id,
    articleId: dto.article_id,
    progressLabel: `Вопрос ${dto.question_number} из ${dto.total_questions}`,
    questionText: dto.question_text,
    options: dto.options,
    correctKey: dto.correct_option_key,
    explanationText: dto.explanation_text
  }
}

export function adaptPracticeTask(dto: PracticeTaskDTO): PracticeTaskUIModel {
  return {
    id: dto.id,
    articleId: dto.article_id,
    progressLabel: `Задание ${dto.task_number} из ${dto.total_tasks}`,
    title: dto.title,
    description: dto.description,
    requirements: dto.requirements,
    initialCode: dto.initial_code,
    solutionCode: dto.solution_code
  }
}
