<script setup lang="ts">
import { BaseButton, BaseModal } from '@/shared/ui'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'goToArticle'): void
}>()

interface PathStep {
  level: number
  code: string
  title: string
  isActive?: boolean
}

const pathChain: PathStep[] = [
  { level: 1, code: '3', title: 'Vue 3' },
  { level: 2, code: '1', title: '1. Основы' },
  { level: 3, code: '1', title: '1.1. Реактивность' },
  { level: 4, code: '1', title: '1.1.1. watch и watchEffect' },
  { level: 5, code: '1', title: '1.1.1.1. watch', isActive: true },
  { level: 6, code: '', title: '1.1.1.1.2. Параметры' }
]
</script>

<template>
  <BaseModal :is-open="props.isOpen" title="Полный путь" @close="emit('close')">
    <div class="path-chain">
      <div
        v-for="(step, index) in pathChain"
        :key="index"
        class="path-step"
        :style="{ paddingLeft: `${index * 12}px` }"
      >
        <div class="path-step__pill" :class="{ 'path-step__pill--active': step.isActive }">
          <span v-if="step.code" class="path-step__code-circle">{{ step.code }}</span>
          <span class="path-step__title">{{ step.title }}</span>
        </div>
      </div>
    </div>

    <template #footer>
      <BaseButton variant="primary" full-width @click="emit('goToArticle')">
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
