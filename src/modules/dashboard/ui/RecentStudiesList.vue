<script setup lang="ts">
import { BaseCard } from '@/shared/ui'
import type { RecentStudyUIModel } from '../adapters/dashboard.adapter'

interface Props {
  items: RecentStudyUIModel[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'selectItem', item: RecentStudyUIModel): void
  (e: 'viewAll'): void
}>()
</script>

<template>
  <section class="recent-studies">
    <div class="recent-studies__header">
      <h2 class="recent-studies__title">Недавно изученное</h2>
      <button type="button" class="recent-studies__see-all-btn" @click="emit('viewAll')">
        Смотреть все
      </button>
    </div>

    <div class="recent-studies__list">
      <BaseCard
        v-for="item in props.items"
        :key="item.id"
        padding="sm"
        clickable
        class="recent-card"
        @click="emit('selectItem', item)"
      >
        <div class="recent-card__inner">
          <div class="recent-card__icon">📑</div>

          <div class="recent-card__info">
            <h4 class="recent-card__title">{{ item.title }}</h4>
            <p class="recent-card__meta">
              <span>{{ item.timeAgo }}</span>
              <span class="dot">•</span>
              <span>{{ item.durationText }}</span>
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  </section>
</template>

<style scoped lang="scss">
.recent-studies {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
    color: #0f172a;
  }

  &__see-all-btn {
    background: none;
    border: none;
    padding: 0;
    font-size: 0.8125rem;
    color: #6366f1;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}

.recent-card {
  border: 1px solid #f1f5f9;

  &__inner {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__title {
    margin: 0 0 0.15rem;
    font-size: 0.9375rem;
    font-weight: 600;
    color: #0f172a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__meta {
    margin: 0;
    font-size: 0.8125rem;
    color: #64748b;
    display: flex;
    align-items: center;
    gap: 0.4rem;

    .dot {
      font-size: 0.6rem;
      color: #cbd5e1;
    }
  }
}
</style>
