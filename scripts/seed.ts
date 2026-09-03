/**
 * One-off seed script: pushes the content + demo personal data from
 * src/api/mock-data.ts into a real Supabase project, so the app looks the
 * same as the offline/mock demo once VITE_SUPABASE_URL/ANON_KEY are set.
 *
 * Usage:
 *   1. Apply supabase/migrations/0001_init.sql to your project (SQL editor
 *      or `supabase db push`).
 *   2. Sign up once in the running app (creates your auth user + profile).
 *   3. Run:
 *        npx tsx --env-file=.env scripts/seed.ts
 *      with SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and SEED_USER_EMAIL set
 *      (service_role key: Supabase dashboard -> Settings -> API).
 *
 * Content tables (tree/articles/quiz/practice/graph) are shared and always
 * reseeded. Per-user tables (notes/tasks/stats/progress) are written for
 * the account matching SEED_USER_EMAIL.
 */
import { createClient } from '@supabase/supabase-js'
import type { Database, TreeNodeRow, ArticleSectionRow } from '../src/api/database.types.js'
import {
  mockArticles,
  mockContinueItem,
  mockDailyTasks,
  mockKnowledgeGraph,
  mockKnowledgeTree,
  mockLearningStats,
  mockNotes,
  mockPracticeTask,
  mockQuizQuestions,
  mockRecentStudies,
  mockUser,
  mockWatchArticle
} from '../src/api/mock-data.js'
import type { ArticleSectionDTO, TreeNodeDTO } from '../src/api/types/knowledge.dto.js'

const supabaseUrl = process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const seedUserEmail = process.env.SEED_USER_EMAIL

if (!supabaseUrl || !serviceRoleKey || !seedUserEmail) {
  console.error(
    'Missing env vars. Required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SEED_USER_EMAIL.\n' +
      'Run: npx tsx --env-file=.env scripts/seed.ts'
  )
  process.exit(1)
}

const supabase = createClient<Database>(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
})

function flattenTree(node: TreeNodeDTO, parentId: string | null, order: { n: number }, out: TreeNodeRow[]): void {
  out.push({
    id: node.id,
    parent_id: parentId,
    code: node.code,
    title: node.title,
    level: node.level,
    has_article: node.has_article,
    article_id: node.article_id ?? null,
    sort_order: order.n++
  })
  for (const child of node.children ?? []) {
    flattenTree(child, node.id, order, out)
  }
}

function collectCompletedNodeIds(node: TreeNodeDTO, out: string[]): void {
  if (node.is_completed) out.push(node.id)
  for (const child of node.children ?? []) {
    collectCompletedNodeIds(child, out)
  }
}

function flattenSections(sections: ArticleSectionDTO[], articleId: string, parentId: string | null, order: { n: number }, out: ArticleSectionRow[]): void {
  for (const section of sections) {
    out.push({
      id: section.id,
      article_id: articleId,
      parent_id: parentId,
      code: section.code,
      title: section.title,
      sort_order: order.n++
    })
    if (section.children) {
      flattenSections(section.children, articleId, section.id, order, out)
    }
  }
}

function collectReadSectionIds(sections: ArticleSectionDTO[], out: string[]): void {
  for (const section of sections) {
    if (section.is_read) out.push(section.id)
    if (section.children) collectReadSectionIds(section.children, out)
  }
}

async function findUserIdByEmail(email: string): Promise<string> {
  const perPage = 200
  let seen = 0
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage })
    if (error) throw error
    seen += data.users.length
    const match = data.users.find(u => u.email?.toLowerCase() === email.toLowerCase())
    if (match) return match.id
    if (data.users.length < perPage) break
  }
  const { data: allUsers } = await supabase.auth.admin.listUsers({ page: 1, perPage })
  const knownEmails = (allUsers?.users ?? []).map(u => JSON.stringify(u.email)).join(', ')
  throw new Error(
    `No signed-up user found for ${JSON.stringify(email)} (admin.listUsers returned ${seen} user(s) total, emails: ${knownEmails}). ` +
      `Sign up in the app first, or set SEED_USER_ID directly (Supabase Dashboard -> Authentication -> Users -> copy the UID) to skip this lookup.`
  )
}

async function seedContent(): Promise<void> {
  const treeRows: TreeNodeRow[] = []
  flattenTree(mockKnowledgeTree, null, { n: 0 }, treeRows)
  const { error: treeError } = await supabase.from('tree_nodes').upsert(treeRows)
  if (treeError) throw treeError

  const articleList = Object.values(mockArticles)
  const articleRows = articleList.map(article => ({
    id: article.id,
    code: article.code,
    title: article.title,
    tags: article.tags,
    difficulty: article.difficulty,
    read_time_min: article.read_time_min,
    category_path: article.category_path,
    likes_count: article.likes_count,
    comments_count: article.comments_count,
    total_pages: article.total_pages
  }))
  const { error: articleError } = await supabase.from('articles').upsert(articleRows)
  if (articleError) throw articleError

  const sectionRows: ArticleSectionRow[] = []
  for (const article of articleList) {
    flattenSections(article.sections, article.id, null, { n: 0 }, sectionRows)
  }
  const { error: sectionsError } = await supabase.from('article_sections').upsert(sectionRows)
  if (sectionsError) throw sectionsError

  const blockRows = articleList.flatMap(article =>
    article.blocks.map((block, index) => ({
      id: block.id,
      article_id: article.id,
      sort_order: index,
      type: block.type,
      content: block.content,
      language: block.language ?? null,
      level: block.level ?? null,
      callout_type: block.callout_type ?? null
    }))
  )
  const { error: blocksError } = await supabase.from('article_blocks').upsert(blockRows)
  if (blocksError) throw blocksError

  const { error: quizError } = await supabase.from('quiz_questions').upsert(mockQuizQuestions)
  if (quizError) throw quizError

  const { error: practiceError } = await supabase.from('practice_tasks').upsert([mockPracticeTask])
  if (practiceError) throw practiceError

  const { error: graphError } = await supabase
    .from('knowledge_graphs')
    .upsert({ id: mockKnowledgeGraph.id, title: mockKnowledgeGraph.title })
  if (graphError) throw graphError

  const nodeRows = mockKnowledgeGraph.nodes.map(node => ({
    graph_id: mockKnowledgeGraph.id,
    id: node.id,
    label: node.label,
    is_center: node.is_center,
    article_id: node.article_id ?? null,
    color_variant: node.color_variant ?? null
  }))
  const { error: graphNodesError } = await supabase.from('knowledge_graph_nodes').upsert(nodeRows)
  if (graphNodesError) throw graphNodesError

  const edgeRows = mockKnowledgeGraph.edges.map(edge => ({
    graph_id: mockKnowledgeGraph.id,
    source_id: edge.source_id,
    target_id: edge.target_id
  }))
  const { error: graphEdgesError } = await supabase.from('knowledge_graph_edges').upsert(edgeRows)
  if (graphEdgesError) throw graphEdgesError

  console.log(
    `Content seeded: ${treeRows.length} tree nodes, ${articleRows.length} article(s), ${sectionRows.length} sections, ${blockRows.length} blocks.`
  )
}

async function seedUserData(userId: string): Promise<void> {
  const { error: profileError } = await supabase.from('profiles').upsert({
    id: userId,
    name: mockUser.name,
    avatar_url: mockUser.avatarUrl,
    greeting: mockUser.greeting,
    created_at: new Date().toISOString()
  })
  if (profileError) throw profileError

  const completedNodeIds: string[] = []
  collectCompletedNodeIds(mockKnowledgeTree, completedNodeIds)
  if (completedNodeIds.length > 0) {
    const { error } = await supabase
      .from('tree_node_progress')
      .upsert(completedNodeIds.map(tree_node_id => ({ user_id: userId, tree_node_id, completed_at: new Date().toISOString() })))
    if (error) throw error
  }

  const readSectionIds: string[] = []
  collectReadSectionIds(mockWatchArticle.sections, readSectionIds)
  if (readSectionIds.length > 0) {
    const { error } = await supabase
      .from('article_section_progress')
      .upsert(readSectionIds.map(section_id => ({ user_id: userId, section_id, is_read: true })))
    if (error) throw error
  }

  const { error: readingProgressError } = await supabase.from('article_reading_progress').upsert({
    user_id: userId,
    article_id: mockWatchArticle.id,
    current_page_index: mockWatchArticle.current_page_index,
    is_favorite: mockWatchArticle.is_favorite,
    updated_at: new Date().toISOString()
  })
  if (readingProgressError) throw readingProgressError

  const { error: notesError } = await supabase.from('notes').upsert(
    mockNotes.map(note => ({
      id: note.id,
      user_id: userId,
      article_id: note.article_id,
      quote_text: note.quote_text,
      user_comment: note.user_comment ?? null,
      color: note.color,
      is_related: note.is_related ?? false,
      created_at: note.created_at
    }))
  )
  if (notesError) throw notesError

  const { error: continueStudyError } = await supabase.from('continue_study').upsert({
    user_id: userId,
    article_id: mockContinueItem.article_id,
    title: mockContinueItem.title,
    parent_category: mockContinueItem.parent_category,
    sub_category: mockContinueItem.sub_category,
    remaining_minutes: mockContinueItem.remaining_minutes,
    progress_percent: mockContinueItem.progress_percent
  })
  if (continueStudyError) throw continueStudyError

  const { error: dailyTasksError } = await supabase
    .from('daily_tasks')
    .upsert(mockDailyTasks.map(task => ({ ...task, user_id: userId, task_date: new Date().toISOString().slice(0, 10) })))
  if (dailyTasksError) throw dailyTasksError

  const now = Date.now()
  const { error: recentStudiesError } = await supabase.from('recent_studies').upsert(
    mockRecentStudies.map((recent, index) => ({
      id: recent.id,
      user_id: userId,
      title: recent.title,
      studied_at: new Date(now - index * 86_400_000).toISOString(),
      duration_minutes: recent.duration_minutes
    }))
  )
  if (recentStudiesError) throw recentStudiesError

  const { error: statsError } = await supabase.from('learning_stats').upsert({
    user_id: userId,
    period: mockLearningStats.period,
    articles_studied: mockLearningStats.articles_studied,
    articles_growth_percent: mockLearningStats.articles_growth_percent,
    study_time_formatted: mockLearningStats.study_time_formatted,
    study_time_growth_formatted: mockLearningStats.study_time_growth_formatted,
    tests_completed: mockLearningStats.tests_completed,
    tests_growth_count: mockLearningStats.tests_growth_count
  })
  if (statsError) throw statsError

  const { error: categoryProgressError } = await supabase.from('category_progress').upsert(
    mockLearningStats.category_progress.map((category, index) => ({
      user_id: userId,
      category_id: category.category_id,
      title: category.title,
      progress_percent: category.progress_percent,
      sort_order: index
    }))
  )
  if (categoryProgressError) throw categoryProgressError

  console.log(`Personal data seeded for ${seedUserEmail} (${userId}).`)
}

async function main(): Promise<void> {
  await seedContent()
  const userId = process.env.SEED_USER_ID || (await findUserIdByEmail(seedUserEmail as string))
  await seedUserData(userId)
  console.log('Done.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
