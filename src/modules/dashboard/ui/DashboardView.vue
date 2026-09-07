<script setup lang="ts">
import { appService } from '@/app/services/app-service'
import { computed, onMounted } from 'vue'
import { dashboardState } from '../state/dashboard.state'
import { dashboardService } from '../services/dashboard.service'
import ContinueStudyCard from './ContinueStudyCard.vue'
import RecentStudiesList from './RecentStudiesList.vue'
import type { RecentStudyUIModel } from '../adapters/dashboard.adapter'

onMounted(async () => {
  if (!dashboardState.user) {
    await dashboardService.loadDashboardData()
  }
})

function handleRecentClick(item: RecentStudyUIModel): void {
  appService.openArticle(item.articleId)
}

// Фоллбэк для аватара без похода на внешний сервис
const userInitials = computed(() => {
  const name = dashboardState.user?.name?.trim()
  if (!name) return '?'
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('')
})
</script>

<template>
  <div class="dashboard-view">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="dashboard-header__user">
        <h1 class="dashboard-header__greeting">
          {{ dashboardState.user?.greeting || 'Добро пожаловать!' }}
        </h1>
        <p v-if="dashboardState.continueStudy" class="dashboard-header__sub">
          Продолжайте изучение темы «{{ dashboardState.continueStudy.title }}»
        </p>
      </div>

      <div class="dashboard-header__avatar-wrap">
        <img
          v-if="dashboardState.user?.avatarUrl"
          class="dashboard-header__avatar"
          :src="dashboardState.user.avatarUrl"
          alt="Аватар пользователя"
        />
        <span v-else class="dashboard-header__avatar dashboard-header__avatar--placeholder" aria-hidden="true">
          {{ userInitials }}
        </span>
      </div>
    </header>

    <!-- Main Content Grid -->
    <div class="dashboard-view__grid">
      <div class="dashboard-view__col">
        <ContinueStudyCard
          :item="dashboardState.continueStudy"
          @continue="(id) => appService.openArticle(id)"
        />
      </div>

      <div class="dashboard-view__col">
        <RecentStudiesList
          :items="dashboardState.recentStudies"
          @select-item="handleRecentClick"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 860px) {
      grid-template-columns: 1.2fr 1fr;
    }
  }

  &__col {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;

  &__greeting {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
  }

  &__sub {
    margin: 0.25rem 0 0;
    font-size: 0.875rem;
    color: #64748b;
  }

  &__avatar-wrap {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #6366f1;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
  }

  &__avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__avatar--placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e0e7ff;
    color: #4338ca;
    font-size: 1rem;
    font-weight: 700;
  }
}
</style>
