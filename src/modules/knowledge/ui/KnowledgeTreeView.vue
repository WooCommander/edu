<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { BaseButton } from '@/shared/ui'
import { knowledgeService } from '../services/knowledge.service'
import { knowledgeState } from '../state/knowledge.state'
import KnowledgeTreeNode from './KnowledgeTreeNode.vue'
import { findBreadcrumbPath } from '../adapters/knowledge.adapter'
import type { TreeNodeUIModel } from '../adapters/knowledge.adapter'

const emit = defineEmits<{
  (e: 'openArticle', articleId: string): void
  (e: 'showFullBreadcrumbs'): void
  (e: 'back'): void
}>()

onMounted(async () => {
  if (!knowledgeState.tree) {
    await knowledgeService.loadKnowledgeTree()
  }
})

const breadcrumbPath = computed<string[]>(() => {
  if (!knowledgeState.tree || !knowledgeState.selectedNodeId) return []
  return findBreadcrumbPath(knowledgeState.tree, knowledgeState.selectedNodeId).map(node => node.title)
})

function handleSelectNode(node: TreeNodeUIModel): void {
  knowledgeService.setSelectedNode(node.id)
  if (node.hasArticle && node.articleId) {
    emit('openArticle', node.articleId)
  }
}
</script>

<template>
  <div class="tree-view">
    <!-- Breadcrumbs header bar -->
    <header class="tree-view__header">
      <div v-if="breadcrumbPath.length > 0" class="tree-view__breadcrumbs">
        <template v-for="(crumb, index) in breadcrumbPath" :key="index">
          <span v-if="index > 0" class="sep">›</span>
          <span class="crumb" :class="{ active: index === breadcrumbPath.length - 1 }">{{ crumb }}</span>
        </template>
      </div>
      <div v-else class="tree-view__breadcrumbs">
        <span class="crumb">Выберите раздел ниже</span>
      </div>
    </header>

    <!-- Tree body with horizontal scroll container for deep levels -->
    <div class="tree-view__container">
      <div class="tree-view__scroll-inner">
        <KnowledgeTreeNode
          v-if="knowledgeState.tree"
          :node="knowledgeState.tree"
          :selected-node-id="knowledgeState.selectedNodeId"
          @select-node="handleSelectNode"
        />
      </div>
    </div>

    <!-- Bottom action button -->
    <div class="tree-view__footer">
      <BaseButton
        variant="outline"
        full-width
        @click="emit('showFullBreadcrumbs')"
      >
        <span>🧭</span> Показать полный путь
      </BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tree-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 5.5rem;

  &__header {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #f1f5f9;
    background: #ffffff;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  &__breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.8125rem;
    color: #64748b;
    overflow-x: auto;
    white-space: nowrap;

    .sep {
      color: #cbd5e1;
    }

    .active {
      color: #6366f1;
      font-weight: 600;
    }
  }

  &__container {
    flex: 1;
    overflow: auto;
    padding: 1rem;
  }

  &__scroll-inner {
    min-width: 100%;
    width: max-content;
  }

  &__footer {
    padding: 0.75rem 1rem;
    background: #ffffff;
    border-top: 1px solid #f1f5f9;
  }
}
</style>
