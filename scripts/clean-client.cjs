const fs = require('fs')

let content = fs.readFileSync('src/api/client.ts', 'utf8')

// Remove mock imports
content = content.replace(/import\s*\{\s*mockArticles[\s\S]*?\}\s*from\s*'(\.\/mock-data|@\/api\/mock-data)'\s*\n?/g, '')
content = content.replace(/import\s*\{\s*isSupabaseConfigured(,\s*supabase)?\s*\}\s*from\s*'(\.\/supabase|@\/api\/supabase)'/, 'import { supabase } from \'$2\'')
content = content.replace(/import\s*\{\s*supabase,\s*isSupabaseConfigured\s*\}\s*from\s*'(\.\/supabase|@\/api\/supabase)'/, 'import { supabase } from \'$2\'')

// Remove `if (!isSupabaseConfigured) { ... }` blocks (they are multi-line for searchContent and addNote)
// Since Regex for multiline can be tricky, I'll do string replacements for the simple ones
const singleLineMocks = [
  "if (!isSupabaseConfigured) return Promise.resolve({ ...mockUser })",
  "if (!isSupabaseConfigured) return Promise.resolve({ ...mockContinueItem })",
  "if (!isSupabaseConfigured) return Promise.resolve([...mockDailyTasks])",
  "if (!isSupabaseConfigured) return Promise.resolve([...mockRecentStudies])",
  "if (!isSupabaseConfigured) return Promise.resolve(JSON.parse(JSON.stringify(mockKnowledgeTree)))",
  "if (!isSupabaseConfigured) return Promise.resolve([...mockNotes])",
  "if (!isSupabaseConfigured) return Promise.resolve([...mockQuizQuestions])",
  "if (!isSupabaseConfigured) return Promise.resolve({ ...mockPracticeTask })",
  "if (!isSupabaseConfigured) return Promise.resolve(JSON.parse(JSON.stringify(mockKnowledgeGraph)))"
]

singleLineMocks.forEach(mock => {
  content = content.replace(new RegExp(mock.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\n', 'g'), '')
})

// Replace multiline mock fallback for getArticleById
const getArticleMock = `    if (!isSupabaseConfigured) {
      const article = mockArticles[id]
      if (!article) throw new Error(\`Статья "\${id}" не найдена.\`)
      return Promise.resolve(JSON.parse(JSON.stringify(article)))
    }`
content = content.replace(getArticleMock + '\n\n', '')

// Replace multiline mock fallback for addNote
const addNoteMock = `    if (!isSupabaseConfigured) {
      const newNote: NoteDTO = {
        ...note,
        id: \`note_\${Date.now()}\`,
        created_at: new Date().toISOString(),
        created_at_label: 'Только что'
      }
      mockNotes.unshift(newNote)
      return Promise.resolve(newNote)
    }`
content = content.replace(addNoteMock + '\n\n', '')

// Replace multiline mock fallback for getLearningStats
const getStatsMock = `    if (!isSupabaseConfigured) {
      return Promise.resolve({ ...(mockLearningStatsByPeriod[period] ?? mockLearningStats) })
    }`
content = content.replace(getStatsMock + '\n\n', '')

// Replace multiline mock fallback for searchContent
const searchMock = `    if (!isSupabaseConfigured) {
      const results: SearchResultDTO[] = []

      for (const article of Object.values(mockArticles)) {
        if (article.title.toLowerCase().includes(q) || article.tags.some(tag => tag.toLowerCase().includes(q))) {
          results.push({
            id: \`article_\${article.id}\`,
            title: article.title,
            category_path: article.category_path.join(' › '),
            snippet_text: '',
            entity_type: 'article',
            article_id: article.id
          })
        }
        for (const section of flattenSections(article.sections)) {
          if (section.title.toLowerCase().includes(q)) {
            results.push({
              id: \`section_\${section.id}\`,
              title: section.title,
              category_path: \`\${article.category_path.join(' › ')} › \${article.title}\`,
              snippet_text: '',
              entity_type: 'section',
              article_id: article.id
            })
          }
        }
      }

      for (const note of mockNotes) {
        if (note.quote_text.toLowerCase().includes(q) || (note.user_comment ?? '').toLowerCase().includes(q)) {
          results.push({
            id: \`note_\${note.id}\`,
            title: note.quote_text.length > 70 ? \`\${note.quote_text.slice(0, 70)}…\` : note.quote_text,
            category_path: 'Заметка',
            snippet_text: note.user_comment ?? '',
            entity_type: 'note',
            article_id: note.article_id
          })
        }
      }

      return results.slice(0, 20)
    }`
content = content.replace(searchMock + '\n\n', '')

fs.writeFileSync('src/api/client.ts', content)
console.log('client.ts rewritten')
