import type { ArticleDTO, TreeNodeDTO } from './types/knowledge.dto'
import type { ContinueStudyItemDTO, RecentStudyDTO } from './types/learning.dto'
import type { NoteDTO } from './types/notes.dto'
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

export const mockRecentStudies: RecentStudyDTO[] = [
  {
    id: 'recent_1',
    title: 'watch и watchEffect',
    time_ago: 'Сегодня',
    duration_minutes: 8,
    article_id: 'article_watch'
  },
  {
    id: 'recent_2',
    title: 'Как быстро сесть на шпагат',
    time_ago: 'Вчера',
    duration_minutes: 14,
    article_id: 'article_split'
  },
  {
    id: 'recent_3',
    title: 'Аккорды и табулатура',
    time_ago: '2 дня назад',
    duration_minutes: 18,
    article_id: 'article_guitar_chords'
  }
]

export const mockKnowledgeTree: TreeNodeDTO = {
  id: 'node_root',
  code: '',
  title: 'Все темы',
  level: 0,
  has_article: false,
  children_count: 3,
  children: [
    {
      id: 'node_vue3',
      code: 'Vue 3',
      title: 'Vue 3',
      level: 1,
      has_article: false,
      children_count: 2,
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
                      article_id: 'article_watch',
                      children_count: 0
                    },
                    {
                      id: 'node_watch_sub_2',
                      code: '1.1.3.1.2.',
                      title: 'Параметры',
                      level: 6,
                      has_article: true,
                      article_id: 'article_watch',
                      children_count: 0
                    },
                    {
                      id: 'node_watch_sub_3',
                      code: '1.1.3.1.3.',
                      title: 'Глубокое наблюдение',
                      level: 6,
                      has_article: true,
                      article_id: 'article_watch',
                      children_count: 0
                    },
                    {
                      id: 'node_watch_sub_4',
                      code: '1.1.3.1.4.',
                      title: 'immediate и once',
                      level: 6,
                      has_article: true,
                      article_id: 'article_watch',
                      children_count: 0
                    },
                    {
                      id: 'node_watch_sub_5',
                      code: '1.1.3.1.5.',
                      title: 'flush: pre / post / sync',
                      level: 6,
                      has_article: true,
                      article_id: 'article_watch',
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
                  article_id: 'article_watch',
                  children_count: 2,
                  children: [
                    {
                      id: 'node_watcheffect_sub_1',
                      code: '1.1.3.2.1.',
                      title: 'Основы',
                      level: 6,
                      has_article: true,
                      article_id: 'article_watch',
                      children_count: 0
                    },
                    {
                      id: 'node_watcheffect_sub_2',
                      code: '1.1.3.2.2.',
                      title: 'Примеры',
                      level: 6,
                      has_article: true,
                      article_id: 'article_watch',
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
                  article_id: 'article_watch',
                  children_count: 0
                }
              ]
            },
            {
              id: 'node_readonly',
              code: '1.1.4.',
              title: 'readonly, shallowRef и shallowReactive',
              level: 4,
              has_article: true,
              article_id: 'article_readonly_shallow',
              children_count: 0
            },
            {
              id: 'node_torefs',
              code: '1.1.5.',
              title: 'toRefs и toRef',
              level: 4,
              has_article: true,
              article_id: 'article_torefs',
              children_count: 0
            }
          ]
        }
      ]
    },
    {
      id: 'node_vue3_advanced',
      code: '1.2.',
      title: 'Продвинутый Vue 3',
      level: 2,
      has_article: false,
      children_count: 5,
      children: [
        {
          id: 'node_composables',
          code: '1.2.1.',
          title: 'Composables — переиспользуемая логика',
          level: 3,
          has_article: true,
          article_id: 'article_composables',
          children_count: 0
        },
        {
          id: 'node_provide_inject',
          code: '1.2.2.',
          title: 'provide / inject',
          level: 3,
          has_article: true,
          article_id: 'article_provide_inject',
          children_count: 0
        },
        {
          id: 'node_advanced_reactivity',
          code: '1.2.3.',
          title: 'Продвинутая реактивность: customRef, toRaw, effectScope',
          level: 3,
          has_article: true,
          article_id: 'article_advanced_reactivity',
          children_count: 0
        },
        {
          id: 'node_typescript_vue',
          code: '1.2.4.',
          title: 'TypeScript в Vue 3',
          level: 3,
          has_article: true,
          article_id: 'article_typescript_vue',
          children_count: 0
        },
        {
          id: 'node_ts_lessons',
          code: '1.2.5.',
          title: 'Уроки: типизированные компоненты',
          level: 3,
          has_article: false,
          children_count: 2,
          children: [
            {
              id: 'node_lesson1',
              code: '1.2.5.1.',
              title: 'Урок 1. Типизированный контракт компонента',
              level: 4,
              has_article: true,
              article_id: 'article_typed_contract_lesson1',
              children_count: 0
            },
            {
              id: 'node_lesson2',
              code: '1.2.5.2.',
              title: 'Урок 2. Типизированный v-model без копирования props',
              level: 4,
              has_article: true,
              article_id: 'article_typed_vmodel_lesson2',
              children_count: 0
            }
          ]
        }
      ]
    }
      ]
    },
    {
      id: 'node_stretching',
      code: '2.',
      title: 'Растяжка',
      level: 1,
      has_article: false,
      children_count: 1,
      children: [
        {
          id: 'node_split',
          code: '2.1.',
          title: 'Как быстро сесть на шпагат',
          level: 2,
          has_article: true,
          article_id: 'article_split',
          children_count: 0
        }
      ]
    },
    {
      id: 'node_guitar',
      code: '3.',
      title: 'Гитара',
      level: 1,
      has_article: false,
      children_count: 1,
      children: [
        {
          id: 'node_guitar_chords',
          code: '3.1.',
          title: 'Аккорды и табулатура',
          level: 2,
          has_article: true,
          article_id: 'article_guitar_chords',
          children_count: 0
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

export const mockRefReactiveArticle: ArticleDTO = {
  id: 'article_ref_reactive',
  code: '1.1.1.',
  title: 'ref и reactive',
  tags: ['Vue 3', 'Реактивность'],
  difficulty: 'Легкий',
  read_time_min: 6,
  category_path: ['Vue 3', 'Основы', 'Реактивность', 'ref и reactive'],
  sections: [
    { id: 'refre_sec_1', code: '1.', title: 'Введение', is_read: false },
    { id: 'refre_sec_2', code: '2.', title: 'reactive()', is_read: false },
    { id: 'refre_sec_3', code: '3.', title: 'ref()', is_read: false },
    { id: 'refre_sec_4', code: '4.', title: 'Развёртывание ref (unwrapping)', is_read: false },
    { id: 'refre_sec_5', code: '5.', title: 'ref или reactive — что выбрать', is_read: false },
    { id: 'refre_sec_6', code: '6.', title: 'Частые ошибки', is_read: false }
  ],
  blocks: [
    {
      id: 'refre_b_1',
      type: 'paragraph',
      content:
        'JavaScript не умеет сам отслеживать чтение и изменение переменных — Vue решает это двумя способами: reactive() оборачивает объект в Proxy, который перехватывает доступ к свойствам, а ref() оборачивает любое значение в объект с единственным реактивным свойством .value.'
    },
    { id: 'refre_b_2', type: 'heading', level: 2, content: 'reactive()' },
    {
      id: 'refre_b_3',
      type: 'paragraph',
      content:
        'reactive(obj) создаёт глубоко реактивный Proxy: чтение и запись любого вложенного свойства отслеживаются автоматически. Работает только с объектами, массивами, Map и Set — не с примитивами.'
    },
    {
      id: 'refre_b_4',
      type: 'code',
      language: 'javascript',
      content: `import { reactive } from 'vue'

const state = reactive({ count: 0, user: { name: 'Аня' } })

state.count++             // реактивно
state.user.name = 'Оля'   // реактивно даже во вложенном объекте`
    },
    {
      id: 'refre_b_5',
      type: 'callout',
      callout_type: 'warning',
      content: 'reactive() не может обернуть примитив: reactive(0) не даст реактивности — number не проксируется. Для примитивов используйте ref().'
    },
    { id: 'refre_b_6', type: 'heading', level: 2, content: 'ref()' },
    {
      id: 'refre_b_7',
      type: 'paragraph',
      content:
        'ref(value) оборачивает любое значение — примитив или объект — в объект с единственным свойством .value. Именно через .value Vue перехватывает чтение и переприсваивание, чего нельзя сделать с обычной переменной.'
    },
    {
      id: 'refre_b_8',
      type: 'code',
      language: 'javascript',
      content: `import { ref } from 'vue'

const count = ref(0)

console.log(count.value) // 0 — в script нужен .value
count.value++`
    },
    {
      id: 'refre_b_9',
      type: 'paragraph',
      content: 'В шаблоне .value указывать не нужно — Vue разворачивает ref автоматически: {{ count }}, а не {{ count.value }}.'
    },
    { id: 'refre_b_10', type: 'heading', level: 2, content: 'Развёртывание ref (unwrapping)' },
    {
      id: 'refre_b_11',
      type: 'paragraph',
      content:
        'ref разворачивается автоматически (без .value) в двух местах: в шаблоне компонента и когда ref лежит свойством внутри reactive-объекта. А вот внутри обычного массива или Map — даже реактивных — .value по-прежнему нужен, потому что развёртывание работает только на уровне свойств объекта.'
    },
    {
      id: 'refre_b_12',
      type: 'code',
      language: 'javascript',
      content: `const count = ref(0)
const state = reactive({ count }) // ref как свойство reactive-объекта

state.count++        // .value не нужен — Vue развернул ref
console.log(count.value) // 1, всё та же ссылка

const list = reactive([count])
list[0].value++      // а внутри массива .value всё ещё обязателен`
    },
    { id: 'refre_b_13', type: 'heading', level: 2, content: 'ref или reactive — что выбрать' },
    {
      id: 'refre_b_14',
      type: 'list',
      content:
        'Примитив (строка, число, boolean) — только ref, у reactive() нет выбора\nНужно целиком переприсвоить значение (например, заменить весь объект) — ref, потому что reactive-переменную нельзя переприсвоить без потери реактивности\nОбъект, у которого меняются отдельные поля, а сама ссылка стабильна — reactive() читается чуть чище (без .value)\nЕсли сомневаетесь — используйте ref() везде: он работает и с примитивами, и с объектами, и ведёт себя предсказуемо'
    },
    { id: 'refre_b_15', type: 'heading', level: 2, content: 'Частые ошибки' },
    {
      id: 'refre_b_16',
      type: 'callout',
      callout_type: 'warning',
      content:
        'Деструктуризация reactive-объекта рвёт связь с реактивностью: const { count } = state — count становится обычной несвязанной переменной. Чтобы деструктурировать безопасно, оберните свойства через toRefs(state) — этому посвящена отдельная статья.'
    }
  ],
  likes_count: 0,
  comments_count: 0,
  is_favorite: false,
  current_page_index: 0,
  total_pages: 10
}

export const mockComputedArticle: ArticleDTO = {
  id: 'article_computed',
  code: '1.1.2.',
  title: 'computed',
  tags: ['Vue 3', 'Реактивность'],
  difficulty: 'Легкий',
  read_time_min: 6,
  category_path: ['Vue 3', 'Основы', 'Реактивность', 'computed'],
  sections: [
    { id: 'comp_sec_1', code: '1.', title: 'Что такое computed', is_read: false },
    { id: 'comp_sec_2', code: '2.', title: 'Кэширование', is_read: false },
    { id: 'comp_sec_3', code: '3.', title: 'Computed с сеттером', is_read: false },
    { id: 'comp_sec_4', code: '4.', title: 'computed vs метод', is_read: false },
    { id: 'comp_sec_5', code: '5.', title: 'Побочные эффекты — почему их избегать', is_read: false },
    { id: 'comp_sec_6', code: '6.', title: 'Отладка', is_read: false }
  ],
  blocks: [
    {
      id: 'comp_b_1',
      type: 'paragraph',
      content:
        'computed(getter) создаёт производное реактивное значение: функция-геттер автоматически отслеживает, какие реактивные данные она читает, и результат пересчитывается только тогда, когда эти данные меняются.'
    },
    {
      id: 'comp_b_2',
      type: 'code',
      language: 'javascript',
      content: `import { ref, computed } from 'vue'

const firstName = ref('Иван')
const lastName = ref('Петров')

const fullName = computed(() => \`\${firstName.value} \${lastName.value}\`)`
    },
    { id: 'comp_b_3', type: 'heading', level: 2, content: 'Кэширование' },
    {
      id: 'comp_b_4',
      type: 'paragraph',
      content:
        'В отличие от метода, вызванного прямо в шаблоне (он выполняется заново при каждом ре-рендере), computed кэширует результат и пересчитывает его только при изменении отслеживаемых зависимостей. Для дорогих вычислений (сортировка, фильтрация больших списков) это существенная экономия.'
    },
    {
      id: 'comp_b_5',
      type: 'callout',
      callout_type: 'info',
      content: 'Если в геттере не читается ни одно реактивное значение, computed вычислится один раз и больше никогда не обновится — Vue просто не увидит зависимостей для отслеживания.'
    },
    { id: 'comp_b_6', type: 'heading', level: 2, content: 'Computed с сеттером' },
    {
      id: 'comp_b_7',
      type: 'paragraph',
      content: 'По умолчанию computed доступен только для чтения. Передав объект { get, set }, можно сделать его записываемым — запись через .value вызовет ваш set.'
    },
    {
      id: 'comp_b_8',
      type: 'code',
      language: 'javascript',
      content: `const fullName = computed({
  get() {
    return \`\${firstName.value} \${lastName.value}\`
  },
  set(newValue) {
    const [first, last] = newValue.split(' ')
    firstName.value = first
    lastName.value = last ?? ''
  }
})

fullName.value = 'Пётр Сидоров' // вызовет set и обновит firstName/lastName`
    },
    { id: 'comp_b_9', type: 'heading', level: 2, content: 'computed vs метод' },
    {
      id: 'comp_b_10',
      type: 'list',
      content:
        'computed — для производного состояния, которое читается многократно и зависит от реактивных данных: кэшируется\nМетод — для действий и обработчиков событий, а также когда нужны аргументы: пересчитывается при каждом вызове\nЕсли в шаблоне используете {{ someMethod() }} для чистого вычисления без аргументов — почти всегда стоит заменить на computed'
    },
    { id: 'comp_b_11', type: 'heading', level: 2, content: 'Побочные эффекты — почему их избегать' },
    {
      id: 'comp_b_12',
      type: 'callout',
      callout_type: 'warning',
      content:
        'Геттер computed должен быть чистой функцией: без мутации другого состояния, без async/await, без побочных эффектов. В dev-режиме Vue выведет предупреждение при попытке изменить реактивное состояние внутри геттера. Для побочных эффектов используйте watch/watchEffect.'
    },
    { id: 'comp_b_13', type: 'heading', level: 2, content: 'Отладка' },
    {
      id: 'comp_b_14',
      type: 'paragraph',
      content: 'В dev-сборке computed принимает второй аргумент с колбэками onTrack (сработал при отслеживании зависимости) и onTrigger (сработал при пересчёте) — удобно, чтобы понять, из-за какого именно свойства произошёл пересчёт.'
    },
    {
      id: 'comp_b_15',
      type: 'code',
      language: 'javascript',
      content: `const total = computed(() => cart.value.length, {
  onTrigger(event) {
    console.log('Пересчёт из-за:', event)
  }
})`
    }
  ],
  likes_count: 0,
  comments_count: 0,
  is_favorite: false,
  current_page_index: 0,
  total_pages: 9
}

export const mockReadonlyShallowArticle: ArticleDTO = {
  id: 'article_readonly_shallow',
  code: '1.1.4.',
  title: 'readonly, shallowRef и shallowReactive',
  tags: ['Vue 3', 'Реактивность', 'Производительность'],
  difficulty: 'Средний',
  read_time_min: 7,
  category_path: ['Vue 3', 'Основы', 'Реактивность', 'readonly, shallowRef и shallowReactive'],
  sections: [
    { id: 'rosh_sec_1', code: '1.', title: 'readonly', is_read: false },
    { id: 'rosh_sec_2', code: '2.', title: 'shallowRef', is_read: false },
    { id: 'rosh_sec_3', code: '3.', title: 'shallowReactive', is_read: false },
    { id: 'rosh_sec_4', code: '4.', title: 'shallowReadonly', is_read: false },
    { id: 'rosh_sec_5', code: '5.', title: 'Когда использовать shallow-варианты', is_read: false }
  ],
  blocks: [
    {
      id: 'rosh_b_1',
      type: 'paragraph',
      content:
        'Кроме базовых ref и reactive, Vue даёт набор специализированных обёрток: read-only версии для защиты от записи и «неглубокие» (shallow) версии для контроля над производительностью на больших структурах данных.'
    },
    { id: 'rosh_b_2', type: 'heading', level: 2, content: 'readonly' },
    {
      id: 'rosh_b_3',
      type: 'paragraph',
      content:
        'readonly(obj) создаёт Proxy, через который нельзя менять свойства: в dev-режиме попытка записи выведет предупреждение в консоль и будет проигнорирована. Исходный объект при этом остаётся изменяемым — readonly не блокирует источник, а только конкретную «только для чтения» проекцию на него.'
    },
    {
      id: 'rosh_b_4',
      type: 'code',
      language: 'javascript',
      content: `import { reactive, readonly } from 'vue'

const state = reactive({ count: 0 })
const readonlyState = readonly(state)

readonlyState.count++ // предупреждение в dev, значение не изменится
state.count++          // а так — можно, это оригинал`
    },
    {
      id: 'rosh_b_5',
      type: 'callout',
      callout_type: 'info',
      content: 'Типичный сценарий: передать readonly-версию состояния глубоко вниз по дереву компонентов (например, через provide), чтобы гарантировать одностороннее движение данных — потомки читают, но не мутируют напрямую.'
    },
    { id: 'rosh_b_6', type: 'heading', level: 2, content: 'shallowRef' },
    {
      id: 'rosh_b_7',
      type: 'paragraph',
      content:
        'shallowRef реактивен только на уровне переприсваивания .value целиком — вложенные свойства объекта внутри НЕ становятся реактивными. Если нужно вручную сообщить об изменении вложенных данных, используется triggerRef.'
    },
    {
      id: 'rosh_b_8',
      type: 'code',
      language: 'javascript',
      content: `import { shallowRef, triggerRef } from 'vue'

const state = shallowRef({ count: 0 })

state.value.count++   // НЕ вызовет обновление — вложенное свойство не отслеживается
triggerRef(state)     // принудительно уведомить об изменении

state.value = { count: 1 } // а вот полная замена .value — реактивна как обычно`
    },
    { id: 'rosh_b_9', type: 'heading', level: 2, content: 'shallowReactive' },
    {
      id: 'rosh_b_10',
      type: 'paragraph',
      content: 'shallowReactive делает реактивными только свойства верхнего уровня объекта — вложенные объекты остаются обычными, не проксируются.'
    },
    {
      id: 'rosh_b_11',
      type: 'code',
      language: 'javascript',
      content: `const state = shallowReactive({ count: 0, nested: { value: 1 } })

state.count++             // реактивно
state.nested.value++       // НЕ реактивно — nested остался обычным объектом`
    },
    { id: 'rosh_b_12', type: 'heading', level: 2, content: 'shallowReadonly' },
    {
      id: 'rosh_b_13',
      type: 'paragraph',
      content: 'shallowReadonly — то же, что readonly, но защита от записи действует только для свойств верхнего уровня, без глубокого прохода по вложенным объектам.'
    },
    { id: 'rosh_b_14', type: 'heading', level: 2, content: 'Когда использовать shallow-варианты' },
    {
      id: 'rosh_b_15',
      type: 'list',
      content:
        'Большие списки или деревья данных, где глубокое проксирование каждого элемента заметно бьёт по производительности\nИнтеграция со сторонними немодифицируемыми структурами (например, большие иммутабельные объекты из внешней библиотеки)\nТочечная оптимизация «горячего» участка кода после профилирования — не выбор по умолчанию'
    },
    {
      id: 'rosh_b_16',
      type: 'callout',
      callout_type: 'warning',
      content: 'По умолчанию используйте обычные reactive/ref. shallow-варианты — осознанная оптимизация для конкретной измеренной проблемы, а не привычка «на всякий случай».'
    }
  ],
  likes_count: 0,
  comments_count: 0,
  is_favorite: false,
  current_page_index: 0,
  total_pages: 11
}

export const mockToRefsArticle: ArticleDTO = {
  id: 'article_torefs',
  code: '1.1.5.',
  title: 'toRefs и toRef',
  tags: ['Vue 3', 'Реактивность'],
  difficulty: 'Средний',
  read_time_min: 6,
  category_path: ['Vue 3', 'Основы', 'Реактивность', 'toRefs и toRef'],
  sections: [
    { id: 'toref_sec_1', code: '1.', title: 'Проблема потери реактивности', is_read: false },
    { id: 'toref_sec_2', code: '2.', title: 'toRefs', is_read: false },
    { id: 'toref_sec_3', code: '3.', title: 'toRef', is_read: false },
    { id: 'toref_sec_4', code: '4.', title: 'toRef с геттером', is_read: false },
    { id: 'toref_sec_5', code: '5.', title: 'Практика: composable с toRefs', is_read: false }
  ],
  blocks: [
    {
      id: 'toref_b_1',
      type: 'paragraph',
      content: 'Деструктуризация reactive-объекта — частый источник багов: она отрывает переменную от Proxy, и обновления перестают приходить.'
    },
    {
      id: 'toref_b_2',
      type: 'code',
      language: 'javascript',
      content: `const state = reactive({ count: 0 })
const { count } = state // ОШИБКА: count — обычное число, а не ref

state.count++
console.log(count) // всё ещё 0, переменная не связана с state`
    },
    { id: 'toref_b_3', type: 'heading', level: 2, content: 'toRefs' },
    {
      id: 'toref_b_4',
      type: 'paragraph',
      content: 'toRefs(reactiveObj) превращает каждое свойство reactive-объекта в отдельный ref, связанный с источником. После этого деструктуризация безопасна — каждая переменная остаётся синхронизирована с оригиналом.'
    },
    {
      id: 'toref_b_5',
      type: 'code',
      language: 'javascript',
      content: `const state = reactive({ count: 0 })
const { count } = toRefs(state) // count — это ref, связанный с state.count

state.count++
console.log(count.value) // 1 — обновилось`
    },
    { id: 'toref_b_6', type: 'heading', level: 2, content: 'toRef' },
    {
      id: 'toref_b_7',
      type: 'paragraph',
      content: 'toRef(obj, key) делает то же самое, но только для одного свойства — не нужно создавать ref для всех остальных полей объекта, если требуется лишь одно.'
    },
    {
      id: 'toref_b_8',
      type: 'code',
      language: 'javascript',
      content: `const state = reactive({ count: 0, name: 'Аня' })
const count = toRef(state, 'count')

count.value++
console.log(state.count) // 1`
    },
    { id: 'toref_b_9', type: 'heading', level: 2, content: 'toRef с геттером' },
    {
      id: 'toref_b_10',
      type: 'paragraph',
      content: 'Начиная с Vue 3.3, toRef принимает функцию-геттер и возвращает readonly ref на её основе — удобно, чтобы превратить проп или любое вычисляемое значение в ref, не создавая полноценный computed.'
    },
    {
      id: 'toref_b_11',
      type: 'code',
      language: 'javascript',
      content: `const props = defineProps<{ count: number }>()
const countRef = toRef(() => props.count) // readonly ref, синхронный с props.count`
    },
    { id: 'toref_b_12', type: 'heading', level: 2, content: 'Практика: composable с toRefs' },
    {
      id: 'toref_b_13',
      type: 'paragraph',
      content: 'Стандартный паттерн для composables: хранить состояние в одном reactive-объекте внутри функции, а наружу возвращать toRefs(state) — тогда вызывающий код может деструктурировать результат, не теряя реактивность.'
    },
    {
      id: 'toref_b_14',
      type: 'code',
      language: 'javascript',
      content: `function useCounter() {
  const state = reactive({ count: 0 })

  function increment() {
    state.count++
  }

  return { ...toRefs(state), increment }
}

// в компоненте:
const { count, increment } = useCounter() // count — реактивен`
    }
  ],
  likes_count: 0,
  comments_count: 0,
  is_favorite: false,
  current_page_index: 0,
  total_pages: 9
}

export const mockComposablesArticle: ArticleDTO = {
  id: 'article_composables',
  code: '1.2.1.',
  title: 'Composables — переиспользуемая логика',
  tags: ['Vue 3', 'Продвинутый Vue', 'Composition API'],
  difficulty: 'Продвинутый',
  read_time_min: 9,
  category_path: ['Vue 3', 'Продвинутый Vue 3', 'Composables — переиспользуемая логика'],
  sections: [
    { id: 'comp2_sec_1', code: '1.', title: 'Что такое composable', is_read: false },
    { id: 'comp2_sec_2', code: '2.', title: 'Соглашение об именовании', is_read: false },
    { id: 'comp2_sec_3', code: '3.', title: 'Пример: useMouse', is_read: false },
    { id: 'comp2_sec_4', code: '4.', title: 'Комбинирование composables', is_read: false },
    { id: 'comp2_sec_5', code: '5.', title: 'Побочные эффекты и очистка', is_read: false },
    { id: 'comp2_sec_6', code: '6.', title: 'Composables vs миксины (Vue 2)', is_read: false }
  ],
  blocks: [
    {
      id: 'comp2_b_1',
      type: 'paragraph',
      content:
        'Composable — обычная функция, которая использует Composition API (ref, computed, watch, хуки жизненного цикла) для инкапсуляции и переиспользования логики с состоянием между разными компонентами. Это главный инструмент для избежания дублирования кода в Vue 3.'
    },
    { id: 'comp2_b_2', type: 'heading', level: 2, content: 'Соглашение об именовании' },
    {
      id: 'comp2_b_3',
      type: 'paragraph',
      content: 'По конвенции composables называются useXxx и обычно возвращают объект с реактивным состоянием и методами для работы с ним. Файлы принято класть в src/composables/ или рядом с модулем, к которому они относятся.'
    },
    { id: 'comp2_b_4', type: 'heading', level: 2, content: 'Пример: useMouse' },
    {
      id: 'comp2_b_5',
      type: 'code',
      language: 'javascript',
      content: `import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}`
    },
    {
      id: 'comp2_b_6',
      type: 'paragraph',
      content: 'Использование в компоненте предельно простое — вся логика подписки и очистки инкапсулирована внутри composable:'
    },
    {
      id: 'comp2_b_7',
      type: 'code',
      language: 'javascript',
      content: `const { x, y } = useMouse()
// x.value и y.value обновляются автоматически, компонент ничего про addEventListener не знает`
    },
    { id: 'comp2_b_8', type: 'heading', level: 2, content: 'Комбинирование composables' },
    {
      id: 'comp2_b_9',
      type: 'paragraph',
      content: 'Composables свободно вызывают другие composables — так из простых переиспользуемых кусочков собираются более сложные фичи, каждая часть остаётся маленькой и тестируемой отдельно.'
    },
    {
      id: 'comp2_b_10',
      type: 'code',
      language: 'javascript',
      content: `function useEventListener(target, event, callback) {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}

function useMouse() {
  const x = ref(0)
  const y = ref(0)
  useEventListener(window, 'mousemove', (e) => {
    x.value = e.pageX
    y.value = e.pageY
  })
  return { x, y }
}`
    },
    { id: 'comp2_b_11', type: 'heading', level: 2, content: 'Побочные эффекты и очистка' },
    {
      id: 'comp2_b_12',
      type: 'callout',
      callout_type: 'warning',
      content: 'Всегда снимайте подписки, таймеры и другие побочные эффекты в onUnmounted. Если этого не сделать, при частом монтировании/размонтировании компонентов (например, переключение вкладок) накопятся утечки памяти и «зомби»-обработчики.'
    },
    { id: 'comp2_b_13', type: 'heading', level: 2, content: 'Composables vs миксины (Vue 2)' },
    {
      id: 'comp2_b_14',
      type: 'list',
      content:
        'Миксины неявно сливали свойства в компонент — при чтении this.someValue было непонятно, откуда оно взялось; composables явно возвращают именованные значения\nКоллизии имён между несколькими миксинами разрешались неявно и непредсказуемо; при комбинировании composables имена задаёт вызывающий код через деструктуризацию\nComposable — обычная функция, поэтому её результат легко типизировать в TypeScript; типизировать миксины было куда сложнее'
    }
  ],
  likes_count: 0,
  comments_count: 0,
  is_favorite: false,
  current_page_index: 0,
  total_pages: 13
}

export const mockProvideInjectArticle: ArticleDTO = {
  id: 'article_provide_inject',
  code: '1.2.2.',
  title: 'provide / inject',
  tags: ['Vue 3', 'Продвинутый Vue', 'Composition API'],
  difficulty: 'Продвинутый',
  read_time_min: 8,
  category_path: ['Vue 3', 'Продвинутый Vue 3', 'provide / inject'],
  sections: [
    { id: 'pi_sec_1', code: '1.', title: 'Проблема prop drilling', is_read: false },
    { id: 'pi_sec_2', code: '2.', title: 'provide', is_read: false },
    { id: 'pi_sec_3', code: '3.', title: 'inject', is_read: false },
    { id: 'pi_sec_4', code: '4.', title: 'Типизация с InjectionKey', is_read: false },
    { id: 'pi_sec_5', code: '5.', title: 'Сохранение реактивности', is_read: false },
    { id: 'pi_sec_6', code: '6.', title: 'Значения по умолчанию', is_read: false },
    { id: 'pi_sec_7', code: '7.', title: 'Когда не стоит использовать', is_read: false }
  ],
  blocks: [
    {
      id: 'pi_b_1',
      type: 'paragraph',
      content:
        '«Prop drilling» — проброс пропсов через цепочку промежуточных компонентов, которым эти данные не нужны, только чтобы передать их глубже по дереву. provide/inject решает эту проблему: предок один раз «предоставляет» значение, а любой потомок на любой глубине может его «внедрить» напрямую, без ручного проброса.'
    },
    { id: 'pi_b_2', type: 'heading', level: 2, content: 'provide' },
    {
      id: 'pi_b_3',
      type: 'code',
      language: 'javascript',
      content: `import { provide, ref } from 'vue'

// в компоненте-предке
const theme = ref('dark')
provide('theme', theme)`
    },
    { id: 'pi_b_4', type: 'heading', level: 2, content: 'inject' },
    {
      id: 'pi_b_5',
      type: 'code',
      language: 'javascript',
      content: `import { inject } from 'vue'

// в любом компоненте-потомке, на любой глубине вложенности
const theme = inject('theme')`
    },
    { id: 'pi_b_6', type: 'heading', level: 2, content: 'Типизация с InjectionKey' },
    {
      id: 'pi_b_7',
      type: 'paragraph',
      content: 'Строковые ключи рискуют коллизией между разными частями приложения и не дают проверки типов. InjectionKey<T> — типизированный Symbol: TypeScript свяжет тип с ключом, и inject() автоматически выведет правильный тип без явного указания.'
    },
    {
      id: 'pi_b_8',
      type: 'code',
      language: 'typescript',
      content: `import type { InjectionKey, Ref } from 'vue'
import { provide, inject, ref } from 'vue'

const ThemeKey: InjectionKey<Ref<string>> = Symbol('theme')

// у предка
provide(ThemeKey, ref('dark'))

// у потомка
const theme = inject(ThemeKey) // тип выведен как Ref<string> | undefined`
    },
    { id: 'pi_b_9', type: 'heading', level: 2, content: 'Сохранение реактивности' },
    {
      id: 'pi_b_10',
      type: 'paragraph',
      content:
        'Если предоставить обычный примитив, инъекция не будет реактивной — изменения у предка не дойдут до потомка. Предоставлять нужно ref/reactive. А чтобы потомки не мутировали состояние напрямую в обход предка, распространён паттерн: провайдить readonly-версию состояния вместе с отдельной функцией для его изменения.'
    },
    {
      id: 'pi_b_11',
      type: 'code',
      language: 'javascript',
      content: `const state = reactive({ count: 0 })

function increment() {
  state.count++
}

provide('counter', {
  state: readonly(state),
  increment
})

// у потомка: inject('counter').increment() — можно менять только через явный метод`
    },
    { id: 'pi_b_12', type: 'heading', level: 2, content: 'Значения по умолчанию' },
    {
      id: 'pi_b_13',
      type: 'paragraph',
      content: 'inject принимает второй аргумент — значение по умолчанию на случай, если ни один предок ничего не предоставил. Если значение по умолчанию дорого создавать, третьим аргументом true можно передать его как функцию-фабрику, которая вызовется только при отсутствии provide.'
    },
    {
      id: 'pi_b_14',
      type: 'code',
      language: 'javascript',
      content: `const theme = inject('theme', 'light')                     // просто значение
const config = inject('config', () => createDefault(), true) // фабрика`
    },
    { id: 'pi_b_15', type: 'heading', level: 2, content: 'Когда не стоит использовать' },
    {
      id: 'pi_b_16',
      type: 'callout',
      callout_type: 'info',
      content: 'Для прямой связи родитель → потомок используйте обычные props/emits — их проще отследить: видно, что и откуда пришло. provide/inject хорош для глубоко вложенных деревьев компонентов и для API плагинов/библиотек, а не как замена обычных пропсов везде подряд.'
    }
  ],
  likes_count: 0,
  comments_count: 0,
  is_favorite: false,
  current_page_index: 0,
  total_pages: 14
}

export const mockAdvancedReactivityArticle: ArticleDTO = {
  id: 'article_advanced_reactivity',
  code: '1.2.3.',
  title: 'Продвинутая реактивность: customRef, toRaw, effectScope',
  tags: ['Vue 3', 'Продвинутый Vue', 'Реактивность'],
  difficulty: 'Продвинутый',
  read_time_min: 9,
  category_path: ['Vue 3', 'Продвинутый Vue 3', 'Продвинутая реактивность'],
  sections: [
    { id: 'adv_sec_1', code: '1.', title: 'toRaw', is_read: false },
    { id: 'adv_sec_2', code: '2.', title: 'markRaw', is_read: false },
    { id: 'adv_sec_3', code: '3.', title: 'customRef', is_read: false },
    { id: 'adv_sec_4', code: '4.', title: 'effectScope', is_read: false },
    { id: 'adv_sec_5', code: '5.', title: 'Карта API реактивности', is_read: false }
  ],
  blocks: [
    {
      id: 'adv_b_1',
      type: 'paragraph',
      content:
        'Помимо ref/reactive и их shallow/readonly вариантов, Vue даёт низкоуровневые инструменты для точного контроля над реактивностью. Они редко нужны в обычном коде компонентов, но регулярно пригождаются при написании собственных composables и библиотек.'
    },
    { id: 'adv_b_2', type: 'heading', level: 2, content: 'toRaw' },
    {
      id: 'adv_b_3',
      type: 'paragraph',
      content:
        'toRaw(proxy) возвращает исходный объект без обёртки реактивности. Полезно для чтения без создания зависимости отслеживания (в горячих участках кода) или для передачи объекта в стороннюю не-Vue библиотеку, которой Proxy может помешать (например, если она сравнивает объекты по ссылке).'
    },
    {
      id: 'adv_b_4',
      type: 'code',
      language: 'javascript',
      content: `import { reactive, toRaw } from 'vue'

const state = reactive({ count: 0 })
const rawState = toRaw(state) // обычный объект, без Proxy`
    },
    { id: 'adv_b_5', type: 'heading', level: 2, content: 'markRaw' },
    {
      id: 'adv_b_6',
      type: 'paragraph',
      content: 'markRaw(obj) навсегда помечает объект так, что Vue никогда не сделает его реактивным, даже если он окажется внутри reactive(). Пригождается для больших неизменяемых структур или экземпляров сторонних классов, которым не нужна (и вредна с точки зрения перформанса) реактивность.'
    },
    {
      id: 'adv_b_7',
      type: 'code',
      language: 'javascript',
      content: `import { reactive, markRaw } from 'vue'

class HeavyChartInstance { /* ... */ }

const state = reactive({
  chart: markRaw(new HeavyChartInstance()) // Vue не будет проксировать chart
})`
    },
    { id: 'adv_b_8', type: 'heading', level: 2, content: 'customRef' },
    {
      id: 'adv_b_9',
      type: 'paragraph',
      content: 'customRef(factory) даёт полный ручной контроль над отслеживанием (track) и уведомлением об изменении (trigger) — например, чтобы реализовать ref с debounce записи, откладывающий уведомление подписчиков.'
    },
    {
      id: 'adv_b_10',
      type: 'code',
      language: 'javascript',
      content: `import { customRef } from 'vue'

function useDebouncedRef(value, delay = 300) {
  let timeout
  return customRef((track, trigger) => ({
    get() {
      track()
      return value
    },
    set(newValue) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        value = newValue
        trigger()
      }, delay)
    }
  }))
}`
    },
    { id: 'adv_b_11', type: 'heading', level: 2, content: 'effectScope' },
    {
      id: 'adv_b_12',
      type: 'paragraph',
      content:
        'effectScope() группирует связанные реактивные эффекты (watch, watchEffect, computed), чтобы остановить их все разом одним вызовом stop() — вместо того, чтобы вручную хранить и вызывать каждую функцию отмены отдельно. Сам Vue использует effectScope внутри, чтобы автоматически останавливать эффекты компонента при его размонтировании.'
    },
    {
      id: 'adv_b_13',
      type: 'code',
      language: 'javascript',
      content: `import { effectScope, watchEffect, computed } from 'vue'

const scope = effectScope()

scope.run(() => {
  const double = computed(() => count.value * 2)
  watchEffect(() => console.log(double.value))
})

scope.stop() // останавливает и computed, и watchEffect разом`
    },
    { id: 'adv_b_14', type: 'heading', level: 2, content: 'Карта API реактивности' },
    {
      id: 'adv_b_15',
      type: 'list',
      content:
        'ref / reactive — базовая реактивность для повседневного кода\nshallowRef / shallowReactive — неглубокая реактивность для больших структур (перформанс)\nreadonly / shallowReadonly — защита от записи\ntoRaw / markRaw — выход из реактивности целиком\ncustomRef — ручной контроль над track/trigger\neffectScope — группировка эффектов для совместной остановки'
    }
  ],
  likes_count: 0,
  comments_count: 0,
  is_favorite: false,
  current_page_index: 0,
  total_pages: 14
}

export const mockTypeScriptVueArticle: ArticleDTO = {
  id: 'article_typescript_vue',
  code: '1.2.4.',
  title: 'TypeScript в Vue 3',
  tags: ['Vue 3', 'Продвинутый Vue', 'TypeScript'],
  difficulty: 'Продвинутый',
  read_time_min: 9,
  category_path: ['Vue 3', 'Продвинутый Vue 3', 'TypeScript в Vue 3'],
  sections: [
    { id: 'tsv_sec_1', code: '1.', title: 'defineProps с интерфейсом', is_read: false },
    { id: 'tsv_sec_2', code: '2.', title: 'withDefaults', is_read: false },
    { id: 'tsv_sec_3', code: '3.', title: 'defineEmits', is_read: false },
    { id: 'tsv_sec_4', code: '4.', title: 'Типизация ref', is_read: false },
    { id: 'tsv_sec_5', code: '5.', title: 'Типизация шаблонных ref', is_read: false },
    { id: 'tsv_sec_6', code: '6.', title: 'Типизация composables', is_read: false }
  ],
  blocks: [
    {
      id: 'tsv_b_1',
      type: 'paragraph',
      content: 'Эта база знаний сама написана на строгом TypeScript (без any) — здесь собраны основные паттерны типизации Composition API, которые реально используются в её коде.'
    },
    { id: 'tsv_b_2', type: 'heading', level: 2, content: 'defineProps с интерфейсом' },
    {
      id: 'tsv_b_3',
      type: 'paragraph',
      content: 'defineProps<Props>() — компиляторный макрос: типы существуют только на этапе сборки и стираются, а компилятор Vue сам генерирует рантайм-валидацию пропсов из интерфейса. Ручное описание через объект (как в options API) при этом не нужно.'
    },
    {
      id: 'tsv_b_4',
      type: 'code',
      language: 'typescript',
      content: `interface Props {
  title: string
  isLoading?: boolean
}

const props = defineProps<Props>()`
    },
    { id: 'tsv_b_5', type: 'heading', level: 2, content: 'withDefaults' },
    {
      id: 'tsv_b_6',
      type: 'paragraph',
      content: 'Значения по умолчанию для опциональных пропсов задаются через withDefaults — так тип остаётся точным (isLoading внутри компонента будет boolean, а не boolean | undefined).'
    },
    {
      id: 'tsv_b_7',
      type: 'code',
      language: 'typescript',
      content: `const props = withDefaults(defineProps<Props>(), {
  isLoading: false
})`
    },
    { id: 'tsv_b_8', type: 'heading', level: 2, content: 'defineEmits' },
    {
      id: 'tsv_b_9',
      type: 'paragraph',
      content: 'Типизированная сигнатура emit проверяется компилятором в месте вызова — и имя события, и тип каждого аргумента.'
    },
    {
      id: 'tsv_b_10',
      type: 'code',
      language: 'typescript',
      content: `const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit'): void
}>()

emit('update:modelValue', 'новое значение') // проверено компилятором`
    },
    { id: 'tsv_b_11', type: 'heading', level: 2, content: 'Типизация ref' },
    {
      id: 'tsv_b_12',
      type: 'paragraph',
      content: 'ref(initial) выводит тип из начального значения. Для случаев вроде «изначально null, потом объект» тип нужно указать явно через generic — иначе TypeScript решит, что значение всегда null.'
    },
    {
      id: 'tsv_b_13',
      type: 'code',
      language: 'typescript',
      content: `const user = ref<{ id: string; name: string } | null>(null)
// без явного типа TypeScript вывел бы Ref<null>`
    },
    { id: 'tsv_b_14', type: 'heading', level: 2, content: 'Типизация шаблонных ref' },
    {
      id: 'tsv_b_15',
      type: 'paragraph',
      content: 'ref на DOM-элемент или дочерний компонент типизируется через generic и всегда начинается с null — элемент появляется только после монтирования, до этого момента обращаться к нему нельзя.'
    },
    {
      id: 'tsv_b_16',
      type: 'code',
      language: 'typescript',
      content: `const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  inputRef.value?.focus() // ?. обязателен — до монтирования значение null
})`
    },
    { id: 'tsv_b_17', type: 'heading', level: 2, content: 'Типизация composables' },
    {
      id: 'tsv_b_18',
      type: 'paragraph',
      content: 'Возвращаемый тип composable стоит объявлять явно, особенно если он возвращает toRefs(state) или смешанный объект — иначе выведенный тип может оказаться неточным, и ошибки при использовании обнаружатся не в composable, а в вызывающем коде.'
    },
    {
      id: 'tsv_b_19',
      type: 'code',
      language: 'typescript',
      content: `interface UseCounterReturn {
  count: Ref<number>
  increment: () => void
}

function useCounter(initial = 0): UseCounterReturn {
  const state = reactive({ count: initial })
  function increment(): void {
    state.count++
  }
  return { ...toRefs(state), increment }
}`
    }
  ],
  likes_count: 0,
  comments_count: 0,
  is_favorite: false,
  current_page_index: 0,
  total_pages: 15
}

export const mockTypedContractLesson1Article: ArticleDTO = {
  id: 'article_typed_contract_lesson1',
  code: '1.2.5.1.',
  title: 'Урок 1. Типизированный контракт компонента',
  tags: ['Vue 3', 'TypeScript', 'Продвинутый Vue'],
  difficulty: 'Продвинутый',
  read_time_min: 8,
  category_path: ['Vue 3', 'Продвинутый Vue 3', 'Уроки: типизированные компоненты', 'Урок 1. Типизированный контракт компонента'],
  sections: [
    { id: 'lesson1_sec_1', code: '1.', title: 'Введение', is_read: false },
    { id: 'lesson1_sec_2', code: '2.', title: 'Пример: кнопка изменения статуса задачи', is_read: false },
    { id: 'lesson1_sec_3', code: '3.', title: 'Почему это надёжнее', is_read: false },
    { id: 'lesson1_sec_4', code: '4.', title: 'Упражнение: PrioritySelector.vue', is_read: false },
    { id: 'lesson1_sec_5', code: '5.', title: 'Быстрое повторение', is_read: false }
  ],
  blocks: [
    {
      id: 'lesson1_b_1',
      type: 'paragraph',
      content: 'Профессиональный компонент должен явно описывать: какие данные он принимает, какие события отправляет, какие значения допустимы.'
    },
    { id: 'lesson1_b_2', type: 'heading', level: 2, content: 'Пример: кнопка изменения статуса задачи' },
    { id: 'lesson1_b_3', type: 'paragraph', content: 'Рассмотрим кнопку изменения статуса задачи.' },
    {
      id: 'lesson1_b_4',
      type: 'code',
      language: 'vue',
      content: `<script setup lang="ts">
type TaskStatus = 'new' | 'inProgress' | 'done';

interface Props {
  status: TaskStatus;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  change: [status: TaskStatus];
}>();

const selectStatus = (status: TaskStatus): void => {
  if (props.disabled || status === props.status) {
    return;
  }

  emit('change', status);
};
</script>

<template>
  <button
    :disabled="disabled"
    @click="selectStatus('done')"
  >
    Завершить
  </button>
</template>`
    },
    { id: 'lesson1_b_5', type: 'heading', level: 2, content: 'Почему это надёжнее' },
    {
      id: 'lesson1_b_6',
      type: 'list',
      content:
        'Нельзя передать произвольный статус вроде \'completed\'\nСобытие change нельзя вызвать без значения\nTypeScript проверит родительский компонент ещё до запуска приложения\nwithDefaults задаёт настоящее значение по умолчанию, сохраняя строгую типизацию'
    },
    { id: 'lesson1_b_7', type: 'heading', level: 2, content: 'Упражнение' },
    { id: 'lesson1_b_8', type: 'paragraph', content: 'Создай компонент PrioritySelector.vue:' },
    {
      id: 'lesson1_b_9',
      type: 'list',
      content:
        "Допустимые приоритеты: 'low' | 'normal' | 'high'\nProps: текущий priority и необязательный readonly\nСобытие change должно передавать новый приоритет\nНе отправляй событие, если компонент заблокирован или приоритет не изменился\nНе используй any и приведение через as"
    },
    { id: 'lesson1_b_10', type: 'heading', level: 2, content: 'Быстрое повторение' },
    { id: 'lesson1_b_11', type: 'paragraph', content: 'Найди ошибку:' },
    {
      id: 'lesson1_b_12',
      type: 'code',
      language: 'typescript',
      content: `const emit = defineEmits<{
  change: [priority: string];
}>();`
    },
    {
      id: 'lesson1_b_13',
      type: 'paragraph',
      content: 'Ответ: string разрешает любое значение и разрушает контракт. Нужно использовать конкретный тип:'
    },
    {
      id: 'lesson1_b_14',
      type: 'code',
      language: 'typescript',
      content: `type Priority = 'low' | 'normal' | 'high';

const emit = defineEmits<{
  change: [priority: Priority];
}>();`
    }
  ],
  likes_count: 0,
  comments_count: 0,
  is_favorite: false,
  current_page_index: 0,
  total_pages: 12
}

export const mockTypedVModelLesson2Article: ArticleDTO = {
  id: 'article_typed_vmodel_lesson2',
  code: '1.2.5.2.',
  title: 'Урок 2. Типизированный v-model без копирования props',
  tags: ['Vue 3', 'TypeScript', 'Продвинутый Vue'],
  difficulty: 'Продвинутый',
  read_time_min: 8,
  category_path: ['Vue 3', 'Продвинутый Vue 3', 'Уроки: типизированные компоненты', 'Урок 2. Типизированный v-model без копирования props'],
  sections: [
    { id: 'lesson2_sec_1', code: '1.', title: 'Введение', is_read: false },
    { id: 'lesson2_sec_2', code: '2.', title: 'Пример: PrioritySelector с defineModel', is_read: false },
    { id: 'lesson2_sec_3', code: '3.', title: 'Использование в родителе', is_read: false },
    { id: 'lesson2_sec_4', code: '4.', title: 'Что defineModel делает автоматически', is_read: false },
    { id: 'lesson2_sec_5', code: '5.', title: 'Упражнение: TaskTitleInput.vue', is_read: false },
    { id: 'lesson2_sec_6', code: '6.', title: 'Быстрое повторение', is_read: false }
  ],
  blocks: [
    {
      id: 'lesson2_b_1',
      type: 'paragraph',
      content:
        'Если компонент редактирует значение родителя, используйте defineModel. Это сокращает код и исключает рассинхронизацию между prop и локальным ref.'
    },
    { id: 'lesson2_b_2', type: 'heading', level: 2, content: 'Пример: PrioritySelector с defineModel' },
    {
      id: 'lesson2_b_3',
      type: 'code',
      language: 'vue',
      content: `<script setup lang="ts">
type TaskPriority = 'low' | 'normal' | 'high';

const priority = defineModel<TaskPriority>({
  required: true,
});

const selectPriority = (value: TaskPriority): void => {
  if (priority.value === value) {
    return;
  }

  priority.value = value;
};
</script>

<template>
  <div>
    <button
      v-for="value in (['low', 'normal', 'high'] as const)"
      :key="value"
      :disabled="priority === value"
      @click="selectPriority(value)"
    >
      {{ value }}
    </button>
  </div>
</template>`
    },
    { id: 'lesson2_b_4', type: 'heading', level: 2, content: 'Использование в родителе' },
    { id: 'lesson2_b_5', type: 'paragraph', content: 'Родитель использует компонент так:' },
    {
      id: 'lesson2_b_6',
      type: 'code',
      language: 'vue',
      content: `<script setup lang="ts">
import { ref } from 'vue';
import PrioritySelector from './PrioritySelector.vue';

type TaskPriority = 'low' | 'normal' | 'high';

const priority = ref<TaskPriority>('normal');
</script>

<template>
  <PrioritySelector v-model="priority" />
</template>`
    },
    { id: 'lesson2_b_7', type: 'heading', level: 2, content: 'Что defineModel делает автоматически' },
    {
      id: 'lesson2_b_8',
      type: 'paragraph',
      content: 'defineModel<TaskPriority>() автоматически создаёт типизированную пару:'
    },
    { id: 'lesson2_b_9', type: 'list', content: 'modelValue\nupdate:modelValue' },
    {
      id: 'lesson2_b_10',
      type: 'paragraph',
      content: 'Не нужно вручную копировать prop в ref и синхронизировать его через watch.'
    },
    { id: 'lesson2_b_11', type: 'heading', level: 2, content: 'Упражнение' },
    { id: 'lesson2_b_12', type: 'paragraph', content: 'Создайте TaskTitleInput.vue:' },
    {
      id: 'lesson2_b_13',
      type: 'list',
      content:
        'Значение v-model имеет тип string\nПробелы удаляются методом trim()\nПустую строку записывать нельзя\nОтдельный локальный ref для копии модели не используйте\nany не используйте'
    },
    { id: 'lesson2_b_14', type: 'paragraph', content: 'Заготовка:' },
    {
      id: 'lesson2_b_15',
      type: 'code',
      language: 'vue',
      content: `<script setup lang="ts">
const title = defineModel<string>({
  required: true,
});

const updateTitle = (value: string): void => {
  // Реализуйте проверку и обновление.
};
</script>`
    },
    { id: 'lesson2_b_16', type: 'heading', level: 2, content: 'Быстрое повторение' },
    { id: 'lesson2_b_17', type: 'paragraph', content: 'Почему этот вариант опасен?' },
    {
      id: 'lesson2_b_18',
      type: 'code',
      language: 'typescript',
      content: 'const localPriority = ref(props.priority);'
    },
    {
      id: 'lesson2_b_19',
      type: 'paragraph',
      content:
        'Ответ: localPriority получает только начальное значение. Если родитель позднее изменит priority, локальное состояние может остаться прежним. Для редактируемого значения лучше использовать типизированный v-model, а для вычисляемого представления — computed.'
    }
  ],
  likes_count: 0,
  comments_count: 0,
  is_favorite: false,
  current_page_index: 0,
  total_pages: 13
}

export const mockSplitArticle: ArticleDTO = {
  id: 'article_split',
  code: '2.1.',
  title: 'Как быстро сесть на шпагат',
  tags: ['Растяжка', 'Гибкость'],
  difficulty: 'Средний',
  read_time_min: 9,
  category_path: ['Растяжка', 'Как быстро сесть на шпагат'],
  sections: [
    { id: 'split_sec_1', code: '1.', title: 'Введение', is_read: false },
    {
      id: 'split_sec_2',
      code: '2.',
      title: 'Виды шпагата',
      is_read: false,
      children: [
        { id: 'split_sec_2_1', code: '2.1.', title: 'Продольный шпагат', is_read: false },
        { id: 'split_sec_2_2', code: '2.2.', title: 'Поперечный шпагат', is_read: false }
      ]
    },
    { id: 'split_sec_3', code: '3.', title: 'Разминка перед растяжкой', is_read: false },
    { id: 'split_sec_4', code: '4.', title: 'План на 4 недели', is_read: false },
    { id: 'split_sec_5', code: '5.', title: 'Ключевые упражнения', is_read: false },
    { id: 'split_sec_6', code: '6.', title: 'Типичные ошибки', is_read: false }
  ],
  blocks: [
    {
      id: 'split_b_1',
      type: 'paragraph',
      content:
        'Шпагат — хороший показатель гибкости мышц задней и передней поверхности бедра, а также тазобедренных суставов. При регулярных занятиях 15–20 минут в день сесть на шпагат с нуля можно за 4–8 недель — точный срок зависит от возраста, исходной гибкости и телосложения.'
    },
    { id: 'split_b_2', type: 'heading', level: 2, content: 'Виды шпагата' },
    {
      id: 'split_b_3',
      type: 'paragraph',
      content:
        'Есть два основных вида: продольный (одна нога вытянута вперёд, другая назад) и поперечный (ноги разведены в стороны). Осваивать гибкость обычно проще начиная с продольного — он задействует меньше мышечных групп одновременно.'
    },
    { id: 'split_b_4', type: 'heading', level: 3, content: 'Продольный шпагат' },
    {
      id: 'split_b_5',
      type: 'paragraph',
      content:
        'Растягивает подколенные сухожилия задней ноги и сгибатели бедра передней ноги. Хорошо поддаётся тренировке с помощью выпадов и растяжки на одну ногу.'
    },
    {
      id: 'split_img_1',
      type: 'image',
      content: 'https://commons.wikimedia.org/wiki/Special:FilePath/2022-06-04_Ben_Schumacher_at_SMJ_Kunstturnen_2022_P5_All-around_competition_Warm-up_(Martin_Rulsch)_037.jpg',
      alt_text: 'Продольный шпагат на разминке перед выступлением (спортивная гимнастика)'
    },
    { id: 'split_b_6', type: 'heading', level: 3, content: 'Поперечный шпагат' },
    {
      id: 'split_b_7',
      type: 'paragraph',
      content:
        'Растягивает приводящие мышцы бедра (внутреннюю поверхность). Обычно осваивается медленнее продольного и требует более осторожного прогресса.'
    },
    {
      id: 'split_img_2',
      type: 'image',
      content: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tkdkidstretching.jpg',
      alt_text: 'Поперечный (боковой) шпагат — растяжка перед тренировкой тхэквондо'
    },
    { id: 'split_b_8', type: 'heading', level: 2, content: 'Разминка перед растяжкой' },
    {
      id: 'split_b_9',
      type: 'paragraph',
      content:
        'Разминка обязательна: холодные мышцы менее эластичны и легче травмируются. 5–10 минут лёгкого кардио (прыжки, бег на месте, приседания) и суставная гимнастика для тазобедренных суставов поднимут температуру мышц перед растяжкой.'
    },
    {
      id: 'split_b_10',
      type: 'callout',
      callout_type: 'warning',
      content: 'Не растягивайтесь через острую боль. Лёгкое жжение и тянущее ощущение — норма, резкая боль — сигнал остановиться.'
    },
    { id: 'split_b_11', type: 'heading', level: 2, content: 'План на 4 недели' },
    {
      id: 'split_b_12',
      type: 'paragraph',
      content: 'Занимайтесь 5–6 дней в неделю по 15–20 минут. Прогресс должен быть постепенным: каждую неделю удерживайте растяжку чуть дольше и опускайтесь чуть ниже.'
    },
    {
      id: 'split_b_13',
      type: 'code',
      language: 'text',
      content:
        'Неделя 1: удержание растяжки 20-30 сек, 3 подхода на каждую сторону\nНеделя 2: удержание 30-45 сек, добавить растяжку "бабочка" и складку\nНеделя 3: удержание 45-60 сек, пробовать неглубокий шпагат с опорой на руки\nНеделя 4: удержание 60 сек, шпагат с опорой на блоки, постепенно снижать опору'
    },
    { id: 'split_b_14', type: 'heading', level: 2, content: 'Ключевые упражнения' },
    {
      id: 'split_b_15',
      type: 'paragraph',
      content: 'Выпад с растяжкой сгибателей бедра (низкий выпад, таз вперёд-вниз) — 30–45 сек на каждую ногу.'
    },
    {
      id: 'split_b_16',
      type: 'paragraph',
      content: 'Наклон к прямой ноге (задняя поверхность бедра) сидя или стоя — 30–45 сек на каждую ногу.'
    },
    {
      id: 'split_b_17',
      type: 'paragraph',
      content: 'Бабочка (стопы вместе, колени в стороны, мягко давить локтями на колени) — 45–60 сек.'
    },
    {
      id: 'split_b_18',
      type: 'paragraph',
      content: 'Складка с широко расставленными ногами (растяжка приводящих мышц для поперечного шпагата) — 30–45 сек.'
    },
    { id: 'split_b_19', type: 'heading', level: 2, content: 'Типичные ошибки' },
    {
      id: 'split_b_20',
      type: 'callout',
      callout_type: 'warning',
      content:
        'Резкие рывки вместо плавного растягивания, растяжка на холодные мышцы, попытка форсировать глубину раньше времени и задержка дыхания — самые частые причины травм и застоя в прогрессе. Дышите ровно и опускайтесь настолько, насколько комфортно.'
    }
  ],
  likes_count: 0,
  comments_count: 0,
  is_favorite: false,
  current_page_index: 0,
  total_pages: 12
}

export const mockGuitarArticle: ArticleDTO = {
  id: 'article_guitar_chords',
  code: '3.1.',
  title: 'Аккорды и табулатура: справочник для шестиструнной гитары',
  tags: ['Гитара', 'Аккорды', 'Табулатура'],
  difficulty: 'Легкий',
  read_time_min: 10,
  category_path: ['Гитара', 'Аккорды и табулатура'],
  sections: [
    { id: 'gtr_sec_1', code: '1.', title: 'Стандартный строй', is_read: false },
    { id: 'gtr_sec_2', code: '2.', title: 'Как читать табулатуру (tab)', is_read: false },
    { id: 'gtr_sec_3', code: '3.', title: 'Как читать аккордовую схему', is_read: false },
    { id: 'gtr_sec_4', code: '4.', title: 'Открытые мажорные аккорды', is_read: false },
    { id: 'gtr_sec_5', code: '5.', title: 'Открытые минорные аккорды', is_read: false },
    { id: 'gtr_sec_6', code: '6.', title: 'Баррэ-аккорды', is_read: false },
    { id: 'gtr_sec_7', code: '7.', title: 'Частые ошибки новичков', is_read: false }
  ],
  blocks: [
    {
      id: 'gtr_b_1',
      type: 'paragraph',
      content:
        'Краткая шпаргалка по чтению табулатуры и аккордовых схем, плюс подборка базовых открытых аккордов для шестиструнной гитары в стандартном строе.'
    },
    { id: 'gtr_b_2', type: 'heading', level: 2, content: 'Стандартный строй' },
    {
      id: 'gtr_b_3',
      type: 'paragraph',
      content:
        'Стандартный строй шестиструнной гитары от самой толстой (низкой) струны к самой тонкой (высокой): E-A-D-G-B-e (Ми-Ля-Ре-Соль-Си-ми). Именно в таком порядке снизу вверх нумеруются струны в аккордовых обозначениях ниже.'
    },
    {
      id: 'gtr_b_4',
      type: 'code',
      language: 'text',
      content:
        '6-я струна (толстая, низкий звук): E\n5-я струна: A\n4-я струна: D\n3-я струна: G\n2-я струна: B\n1-я струна (тонкая, высокий звук): e'
    },
    { id: 'gtr_b_5', type: 'heading', level: 2, content: 'Как читать табулатуру (tab)' },
    {
      id: 'gtr_b_6',
      type: 'paragraph',
      content:
        'Табулатура — шесть горизонтальных линий, каждая соответствует струне. Верхняя линия — самая тонкая струна (1-я, e), нижняя — самая толстая (6-я, E). Цифра на линии — номер лада, который нужно зажать; 0 значит играть открытую струну. Читается слева направо, как обычный текст.'
    },
    {
      id: 'gtr_b_7',
      type: 'code',
      language: 'text',
      content: 'e|----------------0---|\nB|-------------1-------|\nG|----------0----------|\nD|----------------------|\nA|----------------------|\nE|----------------------|'
    },
    {
      id: 'gtr_b_8',
      type: 'paragraph',
      content: 'В примере выше сначала играется открытая G-струна, затем 1-й лад B-струны, затем открытая e-струна — простая восходящая мелодия.'
    },
    { id: 'gtr_b_9', type: 'heading', level: 2, content: 'Как читать аккордовую схему' },
    {
      id: 'gtr_b_10',
      type: 'paragraph',
      content:
        'Для каждого аккорда ниже указана короткая запись из шести цифр/символов — по одному на каждую струну, в порядке от 6-й (E) к 1-й (e):'
    },
    {
      id: 'gtr_b_11',
      type: 'code',
      language: 'text',
      content: 'x — струну не задевать (заглушить)\n0 — играть открытую струну\n1, 2, 3... — номер лада, на который нужно поставить палец'
    },
    {
      id: 'gtr_b_12',
      type: 'paragraph',
      content:
        'Например, запись «x-3-2-0-1-0» для аккорда C означает: 6-я струна не звучит, 5-я — 3-й лад, 4-я — 2-й лад, 3-я — открытая, 2-я — 1-й лад, 1-я — открытая.'
    },
    { id: 'gtr_b_13', type: 'heading', level: 2, content: 'Открытые мажорные аккорды' },
    {
      id: 'gtr_b_14',
      type: 'code',
      language: 'text',
      content: 'C (до мажор):  x-3-2-0-1-0\nПальцы: 3-й — A-струна/3-й лад, 2-й — D-струна/2-й лад, 1-й — B-струна/1-й лад'
    },
    {
      id: 'gtr_img_c',
      type: 'image',
      content: 'https://commons.wikimedia.org/wiki/Special:FilePath/C_major_chord_for_guitar_(open).svg',
      alt_text: 'Аккордовая схема C (до мажор)'
    },
    {
      id: 'gtr_b_15',
      type: 'code',
      language: 'text',
      content: 'G (соль мажор):  3-2-0-0-0-3\nПальцы: 2-й — A-струна/2-й лад, 3-й — E-струна(6-я)/3-й лад, 4-й — e-струна/3-й лад'
    },
    {
      id: 'gtr_img_g',
      type: 'image',
      content: 'https://commons.wikimedia.org/wiki/Special:FilePath/G_major_chord_for_guitar_(open).svg',
      alt_text: 'Аккордовая схема G (соль мажор)'
    },
    {
      id: 'gtr_b_16',
      type: 'code',
      language: 'text',
      content: 'D (ре мажор):  x-0-0-2-3-2\nПальцы: 1-й — G-струна/2-й лад, 3-й — B-струна/3-й лад, 2-й — e-струна/2-й лад'
    },
    {
      id: 'gtr_img_d',
      type: 'image',
      content: 'https://commons.wikimedia.org/wiki/Special:FilePath/D_major_chord_for_guitar_(open).svg',
      alt_text: 'Аккордовая схема D (ре мажор)'
    },
    {
      id: 'gtr_b_17',
      type: 'code',
      language: 'text',
      content: 'A (ля мажор):  x-0-2-2-2-0\nПальцы 1, 2, 3 рядом на 2-м ладу D, G и B струн'
    },
    {
      id: 'gtr_img_a',
      type: 'image',
      content: 'https://commons.wikimedia.org/wiki/Special:FilePath/A_major_chord_for_guitar_(open).svg',
      alt_text: 'Аккордовая схема A (ля мажор)'
    },
    {
      id: 'gtr_b_18',
      type: 'code',
      language: 'text',
      content: 'E (ми мажор):  0-2-2-1-0-0\nПальцы: 2-й — A-струна/2-й лад, 3-й — D-струна/2-й лад, 1-й — G-струна/1-й лад'
    },
    {
      id: 'gtr_img_e',
      type: 'image',
      content: 'https://commons.wikimedia.org/wiki/Special:FilePath/E_major_chord_for_guitar_(open).svg',
      alt_text: 'Аккордовая схема E (ми мажор)'
    },
    { id: 'gtr_b_19', type: 'heading', level: 2, content: 'Открытые минорные аккорды' },
    {
      id: 'gtr_b_20',
      type: 'code',
      language: 'text',
      content: 'Am (ля минор):  x-0-2-2-1-0\nПальцы: 2-й — D-струна/2-й лад, 3-й — G-струна/2-й лад, 1-й — B-струна/1-й лад'
    },
    {
      id: 'gtr_img_am',
      type: 'image',
      content: 'https://commons.wikimedia.org/wiki/Special:FilePath/A_minor_chord_for_guitar_(open).svg',
      alt_text: 'Аккордовая схема Am (ля минор)'
    },
    {
      id: 'gtr_b_21',
      type: 'code',
      language: 'text',
      content: 'Em (ми минор):  0-2-2-0-0-0\nПальцы: 2-й — A-струна/2-й лад, 3-й — D-струна/2-й лад'
    },
    {
      id: 'gtr_img_em',
      type: 'image',
      content: 'https://commons.wikimedia.org/wiki/Special:FilePath/E_minor_chord_for_guitar_(open).svg',
      alt_text: 'Аккордовая схема Em (ми минор)'
    },
    {
      id: 'gtr_b_22',
      type: 'code',
      language: 'text',
      content: 'Dm (ре минор):  x-0-0-2-3-1\nПальцы: 2-й — G-струна/2-й лад, 3-й — B-струна/3-й лад, 1-й — e-струна/1-й лад'
    },
    {
      id: 'gtr_img_dm',
      type: 'image',
      content: 'https://commons.wikimedia.org/wiki/Special:FilePath/D_minor_chord_for_guitar_(open).svg',
      alt_text: 'Аккордовая схема Dm (ре минор)'
    },
    { id: 'gtr_b_23', type: 'heading', level: 2, content: 'Баррэ-аккорды' },
    {
      id: 'gtr_b_24',
      type: 'paragraph',
      content:
        'Баррэ-аккорды не используют открытые струны — форма зажимается указательным пальцем поперёк всех струн на одном ладу («баррэ»), а сама форма сдвигается по грифу. Зная одну форму, можно сыграть все 12 тональностей.'
    },
    {
      id: 'gtr_b_25',
      type: 'code',
      language: 'text',
      content:
        'F (фа мажор, баррэ от E-формы, 1-й лад):  1-3-3-2-1-1\nУказательный — баррэ на 1-м ладу всех струн, безымянный — A-струна/3-й лад,\nмизинец — D-струна/3-й лад, средний — G-струна/2-й лад'
    },
    {
      id: 'gtr_img_f',
      type: 'image',
      content: 'https://commons.wikimedia.org/wiki/Special:FilePath/F_major_chord_for_guitar_(open).svg',
      alt_text: 'Аккордовая схема F (фа мажор), открытая аппликатура'
    },
    {
      id: 'gtr_b_26',
      type: 'paragraph',
      content: 'Сдвинув эту же форму на 3 лада выше (указательный палец на 3-м ладу), получится аккорд G мажор, и так далее по грифу.'
    },
    { id: 'gtr_b_27', type: 'heading', level: 2, content: 'Частые ошибки новичков' },
    {
      id: 'gtr_b_28',
      type: 'callout',
      callout_type: 'warning',
      content:
        'Пальцы ставятся плашмя и глушат соседние струны — держите пальцы на подушечках, ближе к ладовому порожку, а не по центру лада. Слишком слабый прижим или «плоское» баррэ без разворота кисти — частая причина дребезжащего звука.'
    }
  ],
  likes_count: 0,
  comments_count: 0,
  is_favorite: false,
  current_page_index: 0,
  total_pages: 14
}

export const mockArticles: Record<string, ArticleDTO> = {
  [mockWatchArticle.id]: mockWatchArticle,
  [mockRefReactiveArticle.id]: mockRefReactiveArticle,
  [mockComputedArticle.id]: mockComputedArticle,
  [mockReadonlyShallowArticle.id]: mockReadonlyShallowArticle,
  [mockToRefsArticle.id]: mockToRefsArticle,
  [mockComposablesArticle.id]: mockComposablesArticle,
  [mockProvideInjectArticle.id]: mockProvideInjectArticle,
  [mockAdvancedReactivityArticle.id]: mockAdvancedReactivityArticle,
  [mockTypeScriptVueArticle.id]: mockTypeScriptVueArticle,
  [mockTypedContractLesson1Article.id]: mockTypedContractLesson1Article,
  [mockTypedVModelLesson2Article.id]: mockTypedVModelLesson2Article,
  [mockSplitArticle.id]: mockSplitArticle,
  [mockGuitarArticle.id]: mockGuitarArticle
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

