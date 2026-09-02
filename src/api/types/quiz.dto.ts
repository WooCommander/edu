export interface QuizQuestionDTO {
  id: string
  article_id: string
  question_number: number
  total_questions: number
  question_text: string
  options: {
    key: string // 'A', 'B', 'C', 'D'
    text: string
  }[]
  correct_option_key: string
  explanation_text: string
}

export interface PracticeTaskDTO {
  id: string
  article_id: string
  task_number: number
  total_tasks: number
  title: string
  description: string
  requirements: string[]
  initial_code: string
  solution_code: string
}
