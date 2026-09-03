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
    is_completed: false,
    article_id: 'article_watch'
  },
  {
    id: 'task_practice',
    type: 'practice',
    title: 'Практическое задание',
    subtitle: 'Базовый проект на Vue',
    count_badge: 1,
    is_completed: false,
    article_id: 'article_watch'
  }
]

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
              has_article: false,
              is_completed: true,
              children_count: 0
            },
            {
              id: 'node_computed',
              code: '1.1.2.',
              title: 'computed',
              level: 4,
              has_article: false,
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
export const mockLearningStatsByPeriod: Record<string, LearningStatsDTO> = {
  'За неделю': mockLearningStats,
  'За месяц': {
    ...mockLearningStats,
    period: 'За месяц',
    articles_studied: 112,
    study_time_formatted: '28ч 15м',
    tests_completed: 45
  },
  'За год': {
    ...mockLearningStats,
    period: 'За год',
    articles_studied: 420,
    study_time_formatted: '150ч 30м',
    tests_completed: 180
  },
  'За всё время': {
    ...mockLearningStats,
    period: 'За всё время',
    articles_studied: 850,
    study_time_formatted: '320ч 45м',
    tests_completed: 340
  }
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
