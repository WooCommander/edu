<script setup lang="ts">
import { onMounted } from 'vue'
import { BaseCard, BaseProgressBar } from '@/shared/ui'
import { statisticsService } from '../services/statistics.service'
import { statisticsState } from '../state/statistics.state'

onMounted(async () => {
  if (!statisticsState.stats) {
    await statisticsService.loadStats()
  }
})

const periods = ['За неделю', 'За месяц', 'За всё время']
</script>

<template>
  <div v-if="statisticsState.stats" class="stats-view">
    <!-- Header -->
    <header class="stats-header">
      <h1 class="stats-title">Статистика</h1>

      <div class="period-select-wrap">
        <select
          :value="statisticsState.selectedPeriod"
          class="period-select"
          @change="(e) => statisticsService.setPeriod((e.target as HTMLSelectElement).value)"
        >
          <option v-for="p in periods" :key="p" :value="p">{{ p }}</option>
        </select>
      </div>
    </header>

    <!-- 3 Metrics Top Cards -->
    <div class="metrics-grid">
      <BaseCard padding="sm" class="metric-card">
        <span class="metric-label">Изучено статей</span>
        <div class="metric-val-row">
          <span class="metric-val">{{ statisticsState.stats.articlesStudied }}</span>
          <span class="metric-growth metric-growth--green">
            {{ statisticsState.stats.articlesGrowthText }}
          </span>
        </div>
      </BaseCard>

      <BaseCard padding="sm" class="metric-card">
        <span class="metric-label">Время обучения</span>
        <div class="metric-val-row">
          <span class="metric-val">{{ statisticsState.stats.studyTimeFormatted }}</span>
          <span class="metric-growth metric-growth--green">
            {{ statisticsState.stats.studyTimeGrowthText }}
          </span>
        </div>
      </BaseCard>

      <BaseCard padding="sm" class="metric-card">
        <span class="metric-label">Пройдено тестов</span>
        <div class="metric-val-row">
          <span class="metric-val">{{ statisticsState.stats.testsCompleted }}</span>
          <span class="metric-growth metric-growth--green">
            {{ statisticsState.stats.testsGrowthText }}
          </span>
        </div>
      </BaseCard>
    </div>

    <!-- Category Progress Section -->
    <section class="category-progress-section">
      <h3 class="section-title">Прогресс по разделам</h3>

      <div class="categories-list">
        <div
          v-for="cat in statisticsState.stats.categories"
          :key="cat.categoryId"
          class="category-row"
        >
          <div class="category-row__meta">
            <span class="category-name">{{ cat.title }}</span>
            <span class="category-percent">{{ cat.percent }}%</span>
          </div>

          <BaseProgressBar
            :value="cat.percent"
            color="#6366f1"
            :height="8"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.stats-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.25rem;
  padding-bottom: 5.5rem;
}

.stats-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.5rem;

  .stats-title {
    margin: 0;
    font-size: 1.45rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
  }

  .period-select {
    padding: 0.4rem 0.85rem;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    font-family: inherit;
    font-size: 0.8125rem;
    color: #334155;
    font-weight: 500;
    cursor: pointer;
    outline: none;

    &:focus {
      border-color: #6366f1;
    }
  }
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
}

.metric-card {
  border: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  .metric-label {
    font-size: 0.725rem;
    color: #64748b;
    font-weight: 500;
    line-height: 1.25;
  }

  .metric-val-row {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .metric-val {
    font-size: 1.25rem;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.2;
  }

  .metric-growth {
    font-size: 0.675rem;
    font-weight: 600;

    &--green {
      color: #16a34a;
    }
  }
}

.category-progress-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .section-title {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f172a;
  }
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.category-row {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  &__meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .category-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1e293b;
  }

  .category-percent {
    font-size: 0.8125rem;
    font-weight: 600;
    color: #6366f1;
  }
}
</style>
