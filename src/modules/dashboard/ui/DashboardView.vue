<script setup lang="ts">
import { appService } from '@/app/services/app-service'
import { onMounted } from 'vue'
import { dashboardState } from '../state/dashboard.state'
import { dashboardService } from '../services/dashboard.service'
import ContinueStudyCard from './ContinueStudyCard.vue'
import DailyTaskList from './DailyTaskList.vue'
import RecentStudiesList from './RecentStudiesList.vue'
import type { DailyTaskUIModel, RecentStudyUIModel } from '../adapters/dashboard.adapter'

const emit = defineEmits<{
  (e: 'openArticle', articleId: string): void
  (e: 'openQuiz', articleId?: string): void
  (e: 'openPractice', articleId?: string): void
  (e: 'openTree'): void
}>()

onMounted(async () => {
  if (!dashboardState.user) {
    await dashboardService.loadDashboardData()
  }
})

function handleTaskClick(task: DailyTaskUIModel): void {
  if (!task.articleId) return
  if (task.type === 'test') {
    appService.openQuiz(task.articleId)
  } else if (task.type === 'practice') {
    appService.openPractice(task.articleId)
  } else {
    appService.openArticle(task.articleId)
  }
}

function handleRecentClick(item: RecentStudyUIModel): void {
  appService.openArticle(item.articleId)
}
</script>

<template>
  <div class="dashboard-view">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="dashboard-header__user">
        <h1 class="dashboard-header__greeting">
          {{ dashboardState.user?.greeting || 'Добрый вечер, Сергей!' }}
        </h1>
        <p v-if="dashboardState.continueStudy" class="dashboard-header__sub">
          Продолжайте изучение темы «{{ dashboardState.continueStudy.title }}»
        </p>
      </div>

      <div class="dashboard-header__avatar-wrap">
        <img
          class="dashboard-header__avatar"
          :src="dashboardState.user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'"
          alt="Аватар пользователя"
        />
      </div>
    </header>

    <!-- Main Content Grid -->
    <div class="dashboard-view__grid">
      <div class="dashboard-view__col">
        <ContinueStudyCard
          :item="dashboardState.continueStudy"
          @continue="(id) => appService.openArticle(id)"
        />

        <DailyTaskList
          :tasks="dashboardState.dailyTasks"
          @select-task="handleTaskClick"
        />
      </div>

      <div class="dashboard-view__col">
        <RecentStudiesList
          :items="dashboardState.recentStudies"
          @select-item="handleRecentClick"
          @view-all="appService.openTree()"
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
}
</style>
