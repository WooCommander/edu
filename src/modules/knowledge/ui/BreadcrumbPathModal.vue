<script setup lang="ts">
import { computed } from 'vue'
import { BaseButton, BaseModal } from '@/shared/ui'
import { knowledgeState } from '../state/knowledge.state'
import { findBreadcrumbPath } from '../adapters/knowledge.adapter'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'goToArticle', articleId: string): void
}>()

const pathChain = computed(() => {
  if (!knowledgeState.tree || !knowledgeState.selectedNodeId) return []
  return findBreadcrumbPath(knowledgeState.tree, knowledgeState.selectedNodeId)
})

// The article to open on "Перейти к статье": the selected node's own article,
// or the closest ancestor's if the selected node itself has none.
const targetArticleId = computed<string | undefined>(() => {
  const chain = pathChain.value
  for (let i = chain.length - 1; i >= 0; i--) {
    if (chain[i].hasArticle && chain[i].articleId) return chain[i].articleId
  }
  return knowledgeState.currentArticle?.id
})

function handleGoToArticle(): void {
  if (targetArticleId.value) emit('goToArticle', targetArticleId.value)
}
</script>

<template>
  <BaseModal :is-open="props.isOpen" title="Полный путь" @close="emit('close')">
    <div v-if="pathChain.length > 0" class="path-chain">
      <div
        v-for="(step, index) in pathChain"
        :key="step.id"
        class="path-step"
        :style="{ paddingLeft: `${index * 12}px` }"
      >
        <div class="path-step__pill" :class="{ 'path-step__pill--active': index === pathChain.length - 1 }">
          <span v-if="step.code" class="path-step__code-circle">{{ step.code }}</span>
          <span class="path-step__title">{{ step.title }}</span>
        </div>
      </div>
    </div>
    <p v-else class="path-empty">Выберите раздел в дереве тем, чтобы увидеть полный путь.</p>

    <template #footer>
      <BaseButton variant="primary" full-width :disabled="!targetArticleId" @click="handleGoToArticle">
        Перейти к статье
      </BaseButton>
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
.path-chain {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.5rem 0;
}

.path-empty {
  margin: 0;
  padding: 0.5rem 0;
  font-size: 0.875rem;
  color: #64748b;
}

.path-step {
  display: flex;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -4px;
    top: 50%;
    width: 8px;
    height: 1px;
    background: #e2e8f0;
  }

  &__pill {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.45rem 0.85rem;
    border-radius: 12px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    font-size: 0.875rem;
    color: #334155;

    &--active {
      background: #ede9fe;
      border-color: #c4b5fd;
      color: #6d28d9;
      font-weight: 600;
    }
  }

  &__code-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #e2e8f0;
    color: #475569;
    font-size: 0.7rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
