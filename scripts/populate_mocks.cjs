const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../src/api/mock-data.ts')
let content = fs.readFileSync(filePath, 'utf-8')

const articleRefReactive = `
export const mockRefReactiveArticle: ArticleDTO = {
  id: 'article_ref_reactive',
  code: '1.1.1.',
  title: 'ref и reactive',
  tags: ['Vue 3', 'Реактивность', 'Базовый уровень', '5 мин чтения'],
  difficulty: 'Базовый',
  read_time_min: 5,
  category_path: ['Vue 3', 'Основы', 'Реактивность'],
  sections: [
    {
      id: 'ref_sec_1',
      code: '1.1.1.1.',
      title: 'Что такое ref()?',
      is_read: true,
      children: []
    }
  ],
  blocks: [
    {
      id: 'ref_b_1',
      type: 'paragraph',
      content: 'Во Vue 3 реактивность работает на основе Proxy. Для создания реактивных состояний используются функции ref и reactive.'
    },
    {
      id: 'ref_b_2',
      type: 'code',
      language: 'ts',
      content: "import { ref } from 'vue'\\nconst count = ref(0)\\nconsole.log(count.value)"
    }
  ],
  likes_count: 42,
  comments_count: 5,
  is_favorite: true,
  current_page_index: 0,
  total_pages: 5
};
`

const articleComputed = `
export const mockComputedArticle: ArticleDTO = {
  id: 'article_computed',
  code: '1.1.2.',
  title: 'computed свойства',
  tags: ['Vue 3', 'Реактивность', 'Базовый уровень', '4 мин чтения'],
  difficulty: 'Базовый',
  read_time_min: 4,
  category_path: ['Vue 3', 'Основы', 'Реактивность'],
  sections: [],
  blocks: [
    {
      id: 'comp_b_1',
      type: 'paragraph',
      content: 'computed() принимает геттер-функцию и возвращает реактивный ref-объект, содержащий возвращаемое значение геттера. Оно кэшируется и пересчитывается только при изменении зависимостей.'
    }
  ],
  likes_count: 30,
  comments_count: 2,
  is_favorite: false,
  current_page_index: 0,
  total_pages: 3
};
`

const articleReadonly = `
export const mockReadonlyArticle: ArticleDTO = {
  id: 'article_readonly',
  code: '1.1.4.',
  title: 'readonly и shallow',
  tags: ['Vue 3', 'Реактивность', 'Продвинутый уровень'],
  difficulty: 'Продвинутый',
  read_time_min: 6,
  category_path: ['Vue 3', 'Основы', 'Реактивность'],
  sections: [],
  blocks: [
    {
      id: 'ro_b_1',
      type: 'paragraph',
      content: 'readonly берет объект (реактивный или обычный) или ref и возвращает неизменяемую (readonly) прокси к оригиналу.'
    }
  ],
  likes_count: 15,
  comments_count: 1,
  is_favorite: false,
  current_page_index: 0,
  total_pages: 2
};
`

const articleToRefs = `
export const mockToRefsArticle: ArticleDTO = {
  id: 'article_torefs',
  code: '1.1.5.',
  title: 'toRefs и toRef',
  tags: ['Vue 3', 'Реактивность', 'Средний уровень'],
  difficulty: 'Средний',
  read_time_min: 5,
  category_path: ['Vue 3', 'Основы', 'Реактивность'],
  sections: [],
  blocks: [
    {
      id: 'tr_b_1',
      type: 'paragraph',
      content: 'toRefs используется для деструктуризации реактивного объекта без потери реактивности.'
    }
  ],
  likes_count: 20,
  comments_count: 0,
  is_favorite: false,
  current_page_index: 0,
  total_pages: 1
};
`

// 1. Insert new articles
const insertionPoint = content.indexOf('export const mockArticles:')
content = content.slice(0, insertionPoint) + 
  articleRefReactive + 
  articleComputed + 
  articleReadonly + 
  articleToRefs + 
  '\\n' + 
  content.slice(insertionPoint)

// 2. Update mockArticles mapping
content = content.replace(
  'export const mockArticles: Record<string, ArticleDTO> = {',
  'export const mockArticles: Record<string, ArticleDTO> = {\\n' +
  '  [mockRefReactiveArticle.id]: mockRefReactiveArticle,\\n' +
  '  [mockComputedArticle.id]: mockComputedArticle,\\n' +
  '  [mockReadonlyArticle.id]: mockReadonlyArticle,\\n' +
  '  [mockToRefsArticle.id]: mockToRefsArticle,'
)

// 3. Update the tree JSON to have has_article = true and article_id
content = content.replace(
  /id: 'node_ref_reactive',[\\s\\S]*?has_article: false,/,
  "id: 'node_ref_reactive',\\n" +
  "              code: '1.1.1.',\\n" +
  "              title: 'ref и reactive',\\n" +
  "              level: 4,\\n" +
  "              has_article: true,\\n" +
  "              article_id: 'article_ref_reactive',"
)

content = content.replace(
  /id: 'node_computed',[\\s\\S]*?has_article: false,/,
  "id: 'node_computed',\\n" +
  "              code: '1.1.2.',\\n" +
  "              title: 'computed',\\n" +
  "              level: 4,\\n" +
  "              has_article: true,\\n" +
  "              article_id: 'article_computed',"
)

content = content.replace(
  /id: 'node_readonly',[\\s\\S]*?title: 'readonly и shallow',[\\s\\S]*?has_article: true,/,
  "id: 'node_readonly',\\n" +
  "              code: '1.1.4.',\\n" +
  "              title: 'readonly и shallow',\\n" +
  "              level: 4,\\n" +
  "              has_article: true,\\n" +
  "              article_id: 'article_readonly',"
)

content = content.replace(
  /id: 'node_torefs',[\\s\\S]*?title: 'toRefs и toRef',[\\s\\S]*?has_article: true,/,
  "id: 'node_torefs',\\n" +
  "              code: '1.1.5.',\\n" +
  "              title: 'toRefs и toRef',\\n" +
  "              level: 4,\\n" +
  "              has_article: true,\\n" +
  "              article_id: 'article_torefs',"
)

fs.writeFileSync(filePath, content, 'utf-8')
console.log('Mock data updated successfully!')
