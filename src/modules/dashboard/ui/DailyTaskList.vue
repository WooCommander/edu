<script setup lang="ts">
import { BaseCard } from '@/shared/ui'
import type { DailyTaskUIModel } from '../adapters/dashboard.adapter'

interface Props {
  tasks: DailyTaskUIModel[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'selectTask', task: DailyTaskUIModel): void
}>()

function getIcon(type: DailyTaskUIModel['type']): string {
  switch (type) {
    case 'cards':
      return '🗂️'
    case 'test':
      return '📝'
    case 'practice':
      return '💻'
    default:
      return '📌'
  }
}
</script>

<template>
  <section class="daily-tasks">
    <div class="daily-tasks__header">
      <h2 class="daily-tasks__title">Сегодня</h2>
      <span class="daily-tasks__badge-plan">План на день</span>
    </div>

    <div class="daily-tasks__list">
      <BaseCard
        v-for="task in props.tasks"
        :key="task.id"
        padding="sm"
        clickable
        class="task-item"
        @click="emit('selectTask', task)"
      >
        <div class="task-item__inner">
          <div class="task-item__icon-wrap">
            <span>{{ getIcon(task.type) }}</span>
          </div>

          <div class="task-item__info">
            <h4 class="task-item__title">{{ task.title }}</h4>
            <p class="task-item__subtitle">{{ task.subtitle }}</p>
          </div>

          <div class="task-item__actions">
            <span v-if="task.badgeCount > 0" class="task-item__count-badge">
              {{ task.badgeCount }}
            </span>
            <span class="task-item__arrow">›</span>
          </div>
        </div>
      </BaseCard>
    </div>
  </section>
</template>

<style scoped lang="scss">
.daily-tasks {
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

  &__badge-plan {
    font-size: 0.8125rem;
    color: #64748b;
    font-weight: 500;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}

.task-item {
  border: 1px solid #f1f5f9;

  &__inner {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__icon-wrap {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: #f8fafc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.15rem;
    border: 1px solid #e2e8f0;
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
  }

  &__subtitle {
    margin: 0;
    font-size: 0.8125rem;
    color: #64748b;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__count-badge {
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    border-radius: 999px;
    background: #fed7aa;
    color: #c2410c;
    font-size: 0.75rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__arrow {
    color: #94a3b8;
    font-size: 1.25rem;
    font-weight: 300;
  }
}
</style>
