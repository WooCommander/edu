<script setup lang="ts">
import { appService } from '@/app/services/app-service'
import { BaseCard, BaseInput, BaseTabs } from '@/shared/ui'
import type { TabItem } from '@/shared/ui'
import { searchService } from '../services/search.service'
import { searchState } from '../state/search.state'
import type { SearchResultUIModel } from '../adapters/search.adapter'

const searchTabs: TabItem[] = [
  { key: 'all', label: 'Все' },
  { key: 'articles', label: 'Статьи' },
  { key: 'sections', label: 'Разделы' },
  { key: 'notes', label: 'Заметки' }
]

function handleTabChange(key: string): void {
  searchService.setFilter(key)
}

function handleSelectResult(result: SearchResultUIModel): void {
  appService.openArticle(result.articleId)
}
</script>

<template>
  <div class="search-view">
    <!-- Top Search Input Bar -->
    <div class="search-view__header">
      <div class="search-input-box">
        <BaseInput
          :model-value="searchState.query"
          placeholder="Поиск по статьям и заметкам..."
          @update:model-value="searchService.setQuery"
        >
          <template #prefix>
            <span class="search-icon">🔍</span>
          </template>
        </BaseInput>
      </div>

      <!-- Filters tabs -->
      <BaseTabs
        :model-value="searchState.activeFilter"
        :tabs="searchTabs"
        @update:model-value="handleTabChange"
      />
    </div>

    <!-- Results list -->
    <div class="search-view__body">
      <p v-if="!searchState.query" class="search-hint">Начните вводить запрос, чтобы найти статьи, разделы и заметки.</p>

      <p v-else-if="searchState.isLoading" class="search-hint">Ищем…</p>

      <p v-else-if="searchState.totalResultsCount === 0" class="search-hint">
        Ничего не найдено по запросу «{{ searchState.query }}».
      </p>

      <template v-else>
        <!-- Best Matches Section -->
        <section v-if="searchState.bestMatches.length > 0" class="results-section">
          <h3 class="results-section__title">Лучшие совпадения</h3>

          <div class="results-list">
            <BaseCard
              v-for="item in searchState.bestMatches"
              :key="item.id"
              padding="sm"
              clickable
              class="result-card"
              @click="handleSelectResult(item)"
            >
              <div class="result-card__body">
                <h4 class="result-card__title">{{ item.title }}</h4>
                <p class="result-card__path">{{ item.categoryPath }}</p>
                <p v-if="item.snippetText" class="result-card__snippet">
                  {{ item.snippetText }}
                </p>
              </div>
              <span class="result-card__arrow">›</span>
            </BaseCard>
          </div>
        </section>

        <!-- Other Results Section -->
        <section v-if="searchState.otherResults.length > 0" class="results-section">
          <h3 class="results-section__title">Другие результаты</h3>

          <div class="results-list">
            <BaseCard
              v-for="item in searchState.otherResults"
              :key="item.id"
              padding="sm"
              clickable
              class="result-card result-card--other"
              @click="handleSelectResult(item)"
            >
              <div class="result-card__icon">
                <span>{{ item.entityType === 'article' ? '📄' : item.entityType === 'note' ? '📝' : '📁' }}</span>
              </div>
              <div class="result-card__body">
                <h4 class="result-card__title">{{ item.title }}</h4>
                <p v-if="item.categoryPath" class="result-card__path">{{ item.categoryPath }}</p>
                <p v-if="item.snippetText" class="result-card__snippet">{{ item.snippetText }}</p>
              </div>
            </BaseCard>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 5.5rem;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem 1.25rem 0.5rem;
    background: #ffffff;
    border-bottom: 1px solid #f1f5f9;
  }

  &__body {
    flex: 1;
    overflow-y: auto;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
}

.search-input-box {
  width: 100%;

  .search-icon {
    font-size: 1rem;
    margin-right: 0.25rem;
  }
}

.search-hint {
  margin: 1.5rem 0 0;
  text-align: center;
  font-size: 0.875rem;
  color: #94a3b8;
}

.results-section {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  &__title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: #475569;
  }
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.result-card {
  border: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &__body {
    flex: 1;
    min-width: 0;
  }

  &__title {
    margin: 0 0 0.2rem;
    font-size: 0.9375rem;
    font-weight: 600;
    color: #0f172a;
  }

  &__path {
    margin: 0;
    font-size: 0.75rem;
    color: #64748b;
  }

  &__snippet {
    margin: 0.25rem 0 0;
    font-size: 0.75rem;
    color: #94a3b8;
    font-style: italic;
  }

  &__arrow {
    color: #94a3b8;
    font-size: 1.25rem;
  }

  &--other {
    .result-card__icon {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.95rem;
    }
  }
}
</style>
