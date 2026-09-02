<script setup lang="ts">
import { BaseButton, BaseCard } from '@/shared/ui'
import type { ContinueStudyUIModel } from '../adapters/dashboard.adapter'

interface Props {
  item: ContinueStudyUIModel | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'continue', articleId: string): void
}>()
</script>

<template>
  <div v-if="props.item" class="continue-block">
    <span class="continue-block__subtitle">Продолжить обучение</span>

    <BaseCard padding="md" elevated class="continue-card">
      <div class="continue-card__header">
        <div class="continue-card__icon-box">
          <span class="continue-card__icon">📖</span>
        </div>

        <div class="continue-card__meta">
          <h3 class="continue-card__title">{{ props.item.title }}</h3>
          <p class="continue-card__path">{{ props.item.categoryPath }}</p>
        </div>
      </div>

      <div class="continue-card__footer">
        <span class="continue-card__time">{{ props.item.remainingTimeText }}</span>
        <BaseButton size="sm" variant="primary" @click="emit('continue', props.item.articleId)">
          Продолжить
        </BaseButton>
      </div>
    </BaseCard>
  </div>
</template>

<style scoped lang="scss">
.continue-block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &__subtitle {
    font-size: 0.8125rem;
    font-weight: 600;
    color: #64748b;
  }
}

.continue-card {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  background: linear-gradient(135deg, #ffffff 0%, #fdfdff 100%);
  border: 1px solid #e2e8f0;

  &__header {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  &__icon-box {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #e0e7ff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
  }

  &__meta {
    flex: 1;
    min-width: 0;
  }

  &__title {
    margin: 0 0 0.2rem;
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f172a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__path {
    margin: 0;
    font-size: 0.8125rem;
    color: #64748b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.6rem;
    border-top: 1px solid #f1f5f9;
  }

  &__time {
    font-size: 0.8125rem;
    color: #64748b;
    font-weight: 500;
  }
}
</style>
