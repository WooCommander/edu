import type { ArticleDTO, TreeNodeDTO } from './types/knowledge.dto'
import type { ContinueStudyItemDTO, DailyTaskDTO, LearningStatsDTO, RecentStudyDTO } from './types/learning.dto'
import type { NoteDTO } from './types/notes.dto'
import type { PracticeTaskDTO, QuizQuestionDTO } from './types/quiz.dto'
import type { KnowledgeGraphDTO } from './types/knowledge-map.dto'
import type { UserProfile } from '@/shared/types'

export const mockUser: UserProfile = {
  id: 'user_1',
  name: 'Сергей',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  greeting: 'Добрый вечер, Сергей!'
}

export const mockContinueItem: ContinueStudyItemDTO = {
  article_id: 'article_watch',
  title: 'watch и watchEffect',
  parent_category: 'Vue 3',
  sub_category: 'Основы > Реактивность',
  remaining_minutes: 6,
  progress_percent: 60
}

export const mockDailyTasks: DailyTaskDTO[] = [
  {
    id: 'task_cards',
    type: 'cards',
    title: 'Повторить карточки',
    subtitle: '12 карточек',
    count_badge: 4,
    is_completed: false
  },
  {
    id: 'task_test',
    type: 'test',
    title: 'Проверка знаний',
    subtitle: '2 теста',
    count_badge: 2,
    is_completed: false
  },
  {
    id: 'task_practice',
    type: 'practice',
    title: 'Практическое задание',
    subtitle: 'Базовый проект на Vue',
    count_badge: 1,
    is_completed: false
  }
]

export const mockRecentStudies: RecentStudyDTO[] = [
  {
    id: 'recent_1',
    title: 'ref и reactive',
    time_ago: 'Сегодня',
    duration_minutes: 8
  },
  {
    id: 'recent_2',
    title: 'Компьютерные сети. Модели OSI',
    time_ago: 'Вчера',
    duration_minutes: 14
  },
  {
    id: 'recent_3',
    title: 'История Рима. Республика',
    time_ago: '2 дня назад',
    duration_minutes: 18
  }
]

export const mockKnowledgeTree: TreeNodeDTO = {
  id: 'node_vue3',
  code: 'Vue 3',
  title: 'Vue 3',
  level: 1,
  has_article: false,
  children_count: 1,
  children: [
    {
      id: 'node_basics',
      code: '1.',
      title: 'Основы',
      level: 2,
      has_article: false,
      children_count: 1,
      children: [
        {
          id: 'node_reactivity',
          code: '1.1.',
          title: 'Реактивность',
          level: 3,
          has_article: false,
          children_count: 5,
          children: [
            {
              id: 'node_ref_reactive',
              code: '1.1.1.',
              title: 'ref и reactive',
              level: 4,
              has_article: true,
              article_id: 'article_ref_reactive',
              is_completed: true,
              children_count: 0
            },
            {
              id: 'node_computed',
              code: '1.1.2.',
              title: 'computed',
              level: 4,
              has_article: true,
              article_id: 'article_computed',
              is_completed: true,
              children_count: 0
            },
            {
              id: 'node_watch',
              code: '1.1.3.',
              title: 'watch и watchEffect',
              level: 4,
              has_article: true,
              article_id: 'article_watch',
              is_completed: false,
              children_count: 3,
              children: [
                {
                  id: 'node_watch_sub',
                  code: '1.1.3.1.',
                  title: 'watch',
                  level: 5,
                  has_article: true,
                  article_id: 'article_watch',
                  children_count: 5,
                  children: [
                    {
                      id: 'node_watch_sub_1',
                      code: '1.1.3.1.1.',
                      title: 'Основы',
                      level: 6,
                      has_article: true,
                      children_count: 0
                    },
                    {
                      id: 'node_watch_sub_2',
                      code: '1.1.3.1.2.',
                      title: 'Параметры',
                      level: 6,
                      has_article: true,
                      children_count: 0
                    },
                    {
                      id: 'node_watch_sub_3',
                      code: '1.1.3.1.3.',
                      title: 'Глубокое наблюдение',
                      level: 6,
                      has_article: true,
                      children_count: 0
                    },
                    {
                      id: 'node_watch_sub_4',
                      code: '1.1.3.1.4.',
                      title: 'immediate и once',
                      level: 6,
                      has_article: true,
                      children_count: 0
                    },
                    {
                      id: 'node_watch_sub_5',
                      code: '1.1.3.1.5.',
                      title: 'flush: pre / post / sync',
                      level: 6,
                      has_article: true,
                      children_count: 0
                    }
                  ]
                },
                {
                  id: 'node_watcheffect_sub',
                  code: '1.1.3.2.',
                  title: 'watchEffect',
                  level: 5,
                  has_article: true,
                  children_count: 2,
                  children: [
                    {
                      id: 'node_watcheffect_sub_1',
                      code: '1.1.3.2.1.',
                      title: 'Основы',
                      level: 6,
                      has_article: true,
                      children_count: 0
                    },
                    {
                      id: 'node_watcheffect_sub_2',
                      code: '1.1.3.2.2.',
                      title: 'Примеры',
                      level: 6,
                      has_article: true,
                      children_count: 0
                    }
                  ]
                },
                {
                  id: 'node_watch_examples',
                  code: '1.1.3.3.',
                  title: 'Практические примеры',
                  level: 5,
                  has_article: true,
                  children_count: 0
                }
              ]
            },
            {
              id: 'node_readonly',
              code: '1.1.4.',
              title: 'readonly и shallow',
              level: 4,
              has_article: true,
              children_count: 0
            },
            {
              id: 'node_torefs',
              code: '1.1.5.',
              title: 'toRefs и toRef',
              level: 4,
              has_article: true,
              children_count: 0
            }
          ]
        }
      ]
    }
  ]
}

export const mockWatchArticle: ArticleDTO = {
  id: 'article_watch',
  code: '1.1.3.',
  title: 'watch и watchEffect',
  tags: ['Vue 3', 'Реактивность'],
  difficulty: 'Средний',
  read_time_min: 7,
  category_path: ['Vue 3', 'Основы', 'Реактивность', 'watch и watchEffect'],
  sections: [
    {
      id: 'sec_1',
      code: '1.',
      title: 'Что такое watch и watchEffect',
      is_read: true
    },
    {
      id: 'sec_2',
      code: '2.',
      title: 'watch',
      is_read: false,
      children: [
        { id: 'sec_2_1', code: '2.1.', title: 'Основы', is_read: true },
        { id: 'sec_2_2', code: '2.2.', title: 'Параметры', is_read: false },
        { id: 'sec_2_3', code: '2.3.', title: 'Глубокое наблюдение', is_read: false },
        { id: 'sec_2_4', code: '2.4.', title: 'immediate и once', is_read: false },
        { id: 'sec_2_5', code: '2.5.', title: 'flush: pre / post / sync', is_read: false }
      ]
    },
    {
      id: 'sec_3',
      code: '3.',
      title: 'watchEffect',
      is_read: false,
      children: [
        { id: 'sec_3_1', code: '3.1.', title: 'Основы', is_read: false },
        { id: 'sec_3_2', code: '3.2.', title: 'Примеры', is_read: false }
      ]
    },
    { id: 'sec_4', code: '4.', title: 'Практические примеры', is_read: false },
    { id: 'sec_5', code: '5.', title: 'Частые ошибки', is_read: false },
    { id: 'sec_6', code: '6.', title: 'Задания для закрепления', is_read: false },
    { id: 'sec_7', code: '7.', title: 'Тест для самопроверки', is_read: false }
  ],
  blocks: [
    {
      id: 'b_1',
      type: 'paragraph',
      content: 'watch и watchEffect позволяют выполнять побочные эффекты в ответ на изменения реактивных данных.'
    },
    {
      id: 'b_2',
      type: 'heading',
      content: 'watch',
      level: 2
    },
    {
      id: 'b_3',
      type: 'paragraph',
      content: 'watch отслеживает конкретные источники данных и запускает колбэк при их изменении.'
    },
    {
      id: 'b_4',
      type: 'code',
      language: 'javascript',
      content: `import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newVal, oldVal) => {
  console.log('Изменилось:', oldVal, '->', newVal)
})`
    },
    {
      id: 'b_5',
      type: 'heading',
      content: 'Параметры watch',
      level: 2
    },
    {
      id: 'b_6',
      type: 'paragraph',
      content: 'Сигнатура вызова: watch(source, callback, options?)'
    },
    {
      id: 'b_7',
      type: 'callout',
      callout_type: 'warning',
      content: 'Важно: По умолчанию watch вызывается только после первого изменения, а не сразу.'
    }
  ],
  likes_count: 32,
  comments_count: 4,
  is_favorite: true,
  current_page_index: 6,
  total_pages: 28
}

export const mockNotes: NoteDTO[] = [
  {
    id: 'note_1',
    article_id: 'article_watch',
    quote_text: 'watch отслеживает конкретные источники данных и запускает колбэк при их изменении.',
    user_comment: 'Важно запомнить: отслеживание явное, в отличие от watchEffect',
    color: 'amber',
    created_at: '2026-09-02T14:30:00Z',
    created_at_label: 'Сегодня',
    is_related: false
  },
  {
    id: 'note_2',
    article_id: 'article_watch',
    quote_text: "flush: 'post' полезен, когда нужно дождаться обновления DOM.",
    user_comment: 'Использовать для скролла или замера размеров элементов после рендера.',
    color: 'emerald',
    created_at: '2026-09-02T16:45:00Z',
    created_at_label: 'Сегодня',
    is_related: false
  },
  {
    id: 'note_3',
    article_id: 'article_watch',
    quote_text: 'watchEffect автоматически отслеживает все реактивные зависимости.',
    user_comment: 'Не нужно указывать зависимости вручную, но будь аккуратен с бесконечными циклами.',
    color: 'purple',
    created_at: '2026-09-01T10:15:00Z',
    created_at_label: 'Вчера',
    is_related: true
  }
]

export const mockQuizQuestions: QuizQuestionDTO[] = [
  {
    id: 'quiz_q_1',
    article_id: 'article_watch',
    question_number: 3,
    total_questions: 5,
    question_text: 'Что произойдет при использовании watch без параметра immediate?',
    options: [
      { key: 'A', text: 'Колбэк выполнится сразу' },
      { key: 'B', text: 'Колбэк выполнится только при изменении данных' },
      { key: 'C', text: 'Колбэк не выполнится никогда' },
      { key: 'D', text: 'Произойдет ошибка' }
    ],
    correct_option_key: 'B',
    explanation_text: 'Правильно! 🎉 По умолчанию watch срабатывает только при изменении наблюдаемых значений.'
  }
]

export const mockPracticeTask: PracticeTaskDTO = {
  id: 'task_vue_history_counter',
  article_id: 'article_watch',
  task_number: 2,
  total_tasks: 3,
  title: 'Создайте счётчик с историей',
  description: 'Реализуйте компонент, который:',
  requirements: [
    'Увеличивает и уменьшает счётчик',
    'Сохраняет историю изменений',
    'Показывает предыдущее и изменённое значение с помощью watch'
  ],
  initial_code: `<template>
  <div>
    <button @click="count++">+</button>
    <button @click="count--">-</button>
    <p>Count: {{ count }}</p>
    <p>Last: {{ last }}</p>
  </div>
</template>`,
  solution_code: `<script setup lang="ts">
import { ref, watch } from 'vue'

const count = ref(0)
const last = ref('none')

watch(count, (newVal, oldVal) => {
  last.value = \`\${oldVal} -> \${newVal}\`
})
</script>

<template>
  <div>
    <button @click="count++">+</button>
    <button @click="count--">-</button>
    <p>Count: {{ count }}</p>
    <p>Last: {{ last }}</p>
  </div>
</template>`
}

export const mockLearningStats: LearningStatsDTO = {
  period: 'За неделю',
  articles_studied: 28,
  articles_growth_percent: 12,
  study_time_formatted: '6ч 40м',
  study_time_growth_formatted: '+ 1ч 10м',
  tests_completed: 14,
  tests_growth_count: 6,
  category_progress: [
    { category_id: 'vue3', title: 'Vue 3', progress_percent: 75 },
    { category_id: 'js', title: 'JavaScript', progress_percent: 60 },
    { category_id: 'algo', title: 'Алгоритмы', progress_percent: 40 },
    { category_id: 'history', title: 'История', progress_percent: 30 },
    { category_id: 'garden', title: 'Сад и растения', progress_percent: 20 }
  ]
}

export const mockKnowledgeGraph: KnowledgeGraphDTO = {
  id: 'graph_reactivity',
  title: 'Реактивность Vue 3',
  nodes: [
    { id: 'n_center', label: 'Реактивность Vue 3', is_center: true, color_variant: 'primary' },
    { id: 'n_computed', label: 'computed', is_center: false, color_variant: 'neutral' },
    { id: 'n_watch', label: 'watch & watchEffect', is_center: false, color_variant: 'secondary' },
    { id: 'n_torefs', label: 'toRefs & toRef', is_center: false, color_variant: 'neutral' },
    { id: 'n_composition', label: 'Композиция API', is_center: false, color_variant: 'neutral' },
    { id: 'n_readonly', label: 'readonly & shallow', is_center: false, color_variant: 'neutral' },
    { id: 'n_ref_reactive', label: 'ref & reactive', is_center: false, color_variant: 'secondary' }
  ],
  edges: [
    { source_id: 'n_center', target_id: 'n_computed' },
    { source_id: 'n_center', target_id: 'n_watch' },
    { source_id: 'n_center', target_id: 'n_torefs' },
    { source_id: 'n_center', target_id: 'n_composition' },
    { source_id: 'n_center', target_id: 'n_readonly' },
    { source_id: 'n_center', target_id: 'n_ref_reactive' }
  ]
}
