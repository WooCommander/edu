<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { appService } from '@/app/services/app-service'
import { searchState } from '@/modules/search/state/search.state'
import { notesService, notesState } from '@/modules/notes'
import { knowledgeService } from '../services/knowledge.service'
import { knowledgeState } from '../state/knowledge.state'
import KnowledgeTreeNode from './KnowledgeTreeNode.vue'
import { filterTreeByQuery, type TreeNodeUIModel } from '../adapters/knowledge.adapter'
import { Loader2, SearchX } from 'lucide-vue-next'

onMounted(async () => {
  // Дерево — часть сайдбара, оно всегда на экране раньше любой статьи или
  // страницы заметок, поэтому список заметок грузим прямо здесь: иначе
  // индикатор «есть заметки» в дереве появлялся бы только после того, как
  // notesState.notes подгрузили где-то ещё.
  await Promise.all([
    !knowledgeState.tree ? knowledgeService.loadKnowledgeTree() : Promise.resolve(),
    notesState.notes.length === 0 ? notesService.loadNotes() : Promise.resolve()
  ])
})

// Живая фильтрация дерева по запросу из поля поиска в сайдбаре
const visibleTree = computed(() => {
  const query = searchState.query.trim()
  if (!query || !knowledgeState.tree) return knowledgeState.tree
  return filterTreeByQuery(knowledgeState.tree, query)
})

function handleSelectNode(node: TreeNodeUIModel): void {
  knowledgeService.setSelectedNode(node.id)
  if (node.hasArticle && node.articleId) {
    appService.openArticle(node.articleId)
  }
}
</script>

<template>
  <div class="tree-view">
    <div v-if="knowledgeState.isLoading && !knowledgeState.tree" class="tree-view__loading">
      <Loader2 class="icon-spinner" />
      <span>Загрузка...</span>
    </div>

    <div v-else-if="visibleTree" class="tree-view__scroll-inner">
      <KnowledgeTreeNode
        :node="visibleTree"
        :selected-node-id="knowledgeState.selectedNodeId"
        @select-node="handleSelectNode"
      />
    </div>

    <div v-else-if="searchState.query.trim()" class="tree-view__empty">
      <SearchX class="icon-empty" />
      <span>Ничего не найдено по «{{ searchState.query }}»</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tree-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 0.5rem 2rem 0;

  &__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    gap: 0.5rem;
    color: #94a3b8;
    font-size: 0.875rem;
    
    .icon-spinner {
      width: 20px;
      height: 20px;
      color: #6366f1;
      animation: spin 1s linear infinite;
    }
  }

  &__scroll-inner {
    width: 100%;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    gap: 0.5rem;
    color: #94a3b8;
    font-size: 0.8125rem;
    text-align: center;

    .icon-empty {
      width: 22px;
      height: 22px;
      color: #cbd5e1;
    }
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
