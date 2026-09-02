<script setup lang="ts">
import { computed, ref } from 'vue'
import { appService } from '@/app/services/app-service'
import { appState } from '@/app/state/app-state'
import { BottomNavigation } from '@/shared/ui'
import type { ActiveScreen, NavTab } from '@/shared/types'

// Modules UI imports
import { DashboardView } from '@/modules/dashboard'
import {
  ArticleReaderView,
  ArticleTocDrawer,
  BreadcrumbPathModal,
  KnowledgeTreeView,
  knowledgeState,
  ZenReaderView
} from '@/modules/knowledge'
import { GlobalSearchView } from '@/modules/search'
import { NotesListView } from '@/modules/notes'
import { PracticeTaskView, QuizView } from '@/modules/quiz'
import { StatisticsView } from '@/modules/statistics'
import { KnowledgeMapView } from '@/modules/knowledge-map'

// View mode: 'desktop' (full screen responsive) or 'mobile' (390px phone container)
const viewMode = ref<'desktop' | 'mobile'>('desktop')

interface MenuItem {
  screen: ActiveScreen
  tab?: NavTab
  label: string
  icon: string
  badge?: string
}

const menuItems: MenuItem[] = [
  { screen: 'dashboard', tab: 'dashboard', label: 'Главная', icon: '🏠' },
  { screen: 'search', tab: 'search', label: 'Поиск', icon: '🔍' },
  { screen: 'tree', label: 'Дерево тем', icon: '📁', badge: '10+ ур' },
  { screen: 'article', label: 'Чтение статьи', icon: '📄' },
  { screen: 'map', tab: 'map', label: 'Карта знаний', icon: '🌐' },
  { screen: 'notes', tab: 'notes', label: 'Мои заметки', icon: '📓', badge: '3' },
  { screen: 'quiz', label: 'Самопроверка (тест)', icon: '📝' },
  { screen: 'practice', label: 'Практика (код)', icon: '💻' },
  { screen: 'profile', tab: 'profile', label: 'Статистика', icon: '📊' }
]

const shouldShowBottomNav = computed(() => {
  return viewMode.value === 'mobile' && !['zen'].includes(appState.activeScreen)
})

function handleNavigate(item: MenuItem): void {
  if (item.tab) {
    appService.navigateToTab(item.tab)
  } else {
    appService.navigateToScreen(item.screen)
  }
}

function handleTabChange(tab: NavTab): void {
  appService.navigateToTab(tab)
}

function handleOpenArticle(articleId: string = 'article_watch'): void {
  appService.openArticle(articleId)
}

function handleOpenTree(): void {
  appService.openTree()
}

function handleOpenQuiz(articleId?: string): void {
  appService.openQuiz(articleId)
}

function handleOpenPractice(articleId?: string): void {
  appService.openPractice(articleId)
}

function handleOpenNotes(): void {
  appService.navigateToScreen('notes')
}

function handleOpenZen(): void {
  appService.openZenMode()
}

function handleOpenToc(): void {
  appService.toggleToc(true)
}

function handleShowFullBreadcrumbs(): void {
  appService.toggleBreadcrumbs(true)
}

function handleBack(): void {
  if (appState.activeScreen === 'zen' || appState.activeScreen === 'notes') {
    appService.navigateToScreen('article')
  } else {
    appService.navigateToTab('dashboard')
  }
}
</script>

<template>
  <div class="main-app-container" :class="`view-mode--${viewMode}`">
    <!-- Desktop Sidebar -->
    <aside class="desktop-sidebar">
      <!-- App Brand -->
      <div class="sidebar-brand">
        <span class="brand-logo">🧠</span>
        <div class="brand-info">
          <h2 class="brand-name">Система Знаний</h2>
          <span class="brand-sub">Личная база & LMS</span>
        </div>
      </div>

      <!-- Quick Search Input Trigger -->
      <div class="sidebar-search-trigger" @click="appService.navigateToScreen('search')">
        <span class="search-icon">🔍</span>
        <span class="search-placeholder">Поиск по материалам...</span>
        <kbd class="search-kbd">⌘K</kbd>
      </div>

      <!-- Main Navigation Menu -->
      <nav class="sidebar-nav">
        <span class="nav-section-title">ОСНОВНОЕ МЕНЮ</span>

        <button
          v-for="item in menuItems"
          :key="item.screen"
          type="button"
          class="sidebar-nav-item"
          :class="{ 'sidebar-nav-item--active': appState.activeScreen === item.screen }"
          @click="handleNavigate(item)"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
          <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
        </button>
      </nav>

      <!-- Context Actions Box -->
      <div class="sidebar-tools">
        <span class="nav-section-title">ИНСТРУМЕНТЫ СТАТЬИ</span>
        <button type="button" class="tool-btn" @click="handleOpenToc">
          <span>📑</span> Оглавление (TOC)
        </button>
        <button type="button" class="tool-btn" @click="handleShowFullBreadcrumbs">
          <span>🧭</span> Полный путь
        </button>
        <button type="button" class="tool-btn" @click="handleOpenZen">
          <span>👁️</span> Zen-режим
        </button>
      </div>

      <!-- User Profile Footer -->
      <div class="sidebar-footer">
        <div class="user-card">
          <img
            class="user-avatar"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Сергей"
          />
          <div class="user-details">
            <strong class="user-name">Сергей</strong>
            <span class="user-status">Изучает Vue 3</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content Wrapper -->
    <div class="content-wrapper">
      <!-- Desktop Header Bar -->
      <header class="top-nav-bar">
        <div class="top-nav-left">
          <span class="current-screen-badge">
            Экран: {{ appState.activeScreen.toUpperCase() }}
          </span>
          <div class="desktop-breadcrumbs">
            <span>Vue 3</span>
            <span class="sep">/</span>
            <span>Основы</span>
            <span class="sep">/</span>
            <span>Реактивность</span>
            <span class="sep">/</span>
            <span class="active">watch и watchEffect</span>
          </div>
        </div>

        <div class="top-nav-right">
          <!-- View Mode Switcher: Desktop vs Mobile Emulator -->
          <div class="view-mode-toggle">
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'toggle-btn--active': viewMode === 'desktop' }"
              @click="viewMode = 'desktop'"
            >
              🖥️ Десктоп во весь экран
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'toggle-btn--active': viewMode === 'mobile' }"
              @click="viewMode = 'mobile'"
            >
              📱 Мобильный вид
            </button>
          </div>
        </div>
      </header>

      <!-- Main Stage Container -->
      <main class="main-stage">
        <!-- If Mobile View Mode: emulate 410px phone container -->
        <div v-if="viewMode === 'mobile'" class="mobile-emulator-shell">
          <div class="mobile-emulator-inner">
            <!-- Screen Components -->
            <DashboardView
              v-if="appState.activeScreen === 'dashboard'"
              @open-article="handleOpenArticle"
              @open-quiz="handleOpenQuiz"
              @open-practice="handleOpenPractice"
              @open-tree="handleOpenTree"
            />
            <GlobalSearchView
              v-else-if="appState.activeScreen === 'search'"
              @select-result="(res) => handleOpenArticle(res.articleId)"
            />
            <KnowledgeTreeView
              v-else-if="appState.activeScreen === 'tree'"
              @open-article="handleOpenArticle"
              @show-full-breadcrumbs="handleShowFullBreadcrumbs"
              @back="handleBack"
            />
            <ArticleReaderView
              v-else-if="appState.activeScreen === 'article'"
              @back="handleBack"
              @open-toc="handleOpenToc"
              @open-notes="handleOpenNotes"
              @open-zen="handleOpenZen"
              @share="appService.showToast('Ссылка скопирована в буфер!')"
              @next-page="appService.showToast('Следующий раздел')"
              @prev-page="appService.showToast('Предыдущий раздел')"
            />
            <ZenReaderView
              v-else-if="appState.activeScreen === 'zen'"
              @exit="() => appService.navigateToScreen('article')"
            />
            <NotesListView
              v-else-if="appState.activeScreen === 'notes'"
              @back="handleBack"
              @select-note="(id) => appService.showToast(`Выбрана заметка ${id}`)"
            />
            <QuizView
              v-else-if="appState.activeScreen === 'quiz'"
              @back="handleBack"
              @next-question="() => appService.showToast('Переход к вопросу 4 из 5')"
            />
            <PracticeTaskView
              v-else-if="appState.activeScreen === 'practice'"
              @back="handleBack"
              @complete="() => { appService.showToast('Задание успешно выполнено!'); appService.navigateToTab('profile') }"
            />
            <StatisticsView
              v-else-if="appState.activeScreen === 'profile'"
            />
            <KnowledgeMapView
              v-else-if="appState.activeScreen === 'map'"
              @open-article="handleOpenArticle"
            />

            <!-- Mobile Bottom Nav inside emulator -->
            <BottomNavigation
              v-if="shouldShowBottomNav"
              :active-tab="appState.activeTab"
              @update:active-tab="handleTabChange"
            />
          </div>
        </div>

        <!-- Desktop Mode: Responsive Full-screen Stage -->
        <div v-else class="desktop-stage-inner">
          <DashboardView
            v-if="appState.activeScreen === 'dashboard'"
            @open-article="handleOpenArticle"
            @open-quiz="handleOpenQuiz"
            @open-practice="handleOpenPractice"
            @open-tree="handleOpenTree"
          />
          <GlobalSearchView
            v-else-if="appState.activeScreen === 'search'"
            @select-result="(res) => handleOpenArticle(res.articleId)"
          />
          <KnowledgeTreeView
            v-else-if="appState.activeScreen === 'tree'"
            @open-article="handleOpenArticle"
            @show-full-breadcrumbs="handleShowFullBreadcrumbs"
            @back="handleBack"
          />
          <ArticleReaderView
            v-else-if="appState.activeScreen === 'article'"
            @back="handleBack"
            @open-toc="handleOpenToc"
            @open-notes="handleOpenNotes"
            @open-zen="handleOpenZen"
            @share="appService.showToast('Ссылка скопирована в буфер!')"
            @next-page="appService.showToast('Следующий раздел')"
            @prev-page="appService.showToast('Предыдущий раздел')"
          />
          <ZenReaderView
            v-else-if="appState.activeScreen === 'zen'"
            @exit="() => appService.navigateToScreen('article')"
          />
          <NotesListView
            v-else-if="appState.activeScreen === 'notes'"
            @back="handleBack"
            @select-note="(id) => appService.showToast(`Выбрана заметка ${id}`)"
          />
          <QuizView
            v-else-if="appState.activeScreen === 'quiz'"
            @back="handleBack"
            @next-question="() => appService.showToast('Переход к вопросу 4 из 5')"
          />
          <PracticeTaskView
            v-else-if="appState.activeScreen === 'practice'"
            @back="handleBack"
            @complete="() => { appService.showToast('Задание успешно выполнено!'); appService.navigateToTab('profile') }"
          />
          <StatisticsView
            v-else-if="appState.activeScreen === 'profile'"
          />
          <KnowledgeMapView
            v-else-if="appState.activeScreen === 'map'"
            @open-article="handleOpenArticle"
          />
        </div>
      </main>
    </div>

    <!-- Modals & Drawers -->
    <ArticleTocDrawer
      v-if="knowledgeState.currentArticle"
      :is-open="appState.isTocOpen"
      :sections="knowledgeState.currentArticle.sections"
      :selected-section-id="knowledgeState.selectedSectionId"
      @close="appService.toggleToc(false)"
      @select-section="(secId) => { knowledgeState.selectedSectionId = secId; appService.toggleToc(false) }"
    />

    <BreadcrumbPathModal
      :is-open="appState.isBreadcrumbsOpen"
      @close="appService.toggleBreadcrumbs(false)"
      @go-to-article="() => { appService.toggleBreadcrumbs(false); handleOpenArticle('article_watch') }"
    />

    <!-- Notification Toast -->
    <Transition name="toast">
      <div v-if="appState.toastMessage" class="toast-notification">
        {{ appState.toastMessage }}
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.main-app-container {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: #f8fafc;
}

/* Desktop Sidebar */
.desktop-sidebar {
  width: 270px;
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
  padding: 1.25rem 1rem;
  gap: 1.25rem;

  @media (max-width: 900px) {
    display: none;
  }
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.25rem 0.5rem;

  .brand-logo {
    font-size: 2rem;
  }

  .brand-name {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
  }

  .brand-sub {
    font-size: 0.75rem;
    color: #64748b;
  }
}

.sidebar-search-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #e2e8f0;
    border-color: #cbd5e1;
  }

  .search-placeholder {
    flex: 1;
    font-size: 0.8125rem;
    color: #64748b;
  }

  .search-kbd {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    padding: 0.1rem 0.35rem;
    font-size: 0.65rem;
    color: #64748b;
    font-weight: 600;
  }
}

.nav-section-title {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.05em;
  padding: 0 0.5rem 0.25rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sidebar-nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: 12px;
  border: none;
  background: transparent;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
  }

  &--active {
    background: #e0e7ff;
    color: #4338ca;

    .nav-icon {
      transform: scale(1.1);
    }
  }

  .nav-icon {
    font-size: 1.1rem;
    line-height: 1;
    transition: transform 0.15s ease;
  }

  .nav-label {
    flex: 1;
  }

  .nav-badge {
    background: #f1f5f9;
    color: #64748b;
    font-size: 0.6875rem;
    font-weight: 700;
    padding: 0.15rem 0.45rem;
    border-radius: 999px;
  }
}

.sidebar-tools {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f1f5f9;

  .tool-btn {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.5rem 0.75rem;
    border-radius: 10px;
    border: none;
    background: transparent;
    color: #64748b;
    font-size: 0.8125rem;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.15s ease;

    &:hover {
      background: #f8fafc;
      color: #0f172a;
    }
  }
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #f1f5f9;

  .user-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-details {
    display: flex;
    flex-direction: column;
  }

  .user-name {
    font-size: 0.875rem;
    color: #0f172a;
  }

  .user-status {
    font-size: 0.75rem;
    color: #64748b;
  }
}

/* Content Area */
.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 100vh;
}

.top-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.5rem;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 30;

  .top-nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .current-screen-badge {
    background: #ede9fe;
    color: #6d28d9;
    font-size: 0.6875rem;
    font-weight: 700;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    letter-spacing: 0.05em;
  }

  .desktop-breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8125rem;
    color: #64748b;

    .sep {
      color: #cbd5e1;
    }

    .active {
      color: #0f172a;
      font-weight: 600;
    }

    @media (max-width: 640px) {
      display: none;
    }
  }

  .view-mode-toggle {
    display: flex;
    background: #f1f5f9;
    border-radius: 12px;
    padding: 0.25rem;
    gap: 0.25rem;

    .toggle-btn {
      background: none;
      border: none;
      font-size: 0.8125rem;
      font-weight: 600;
      color: #64748b;
      padding: 0.35rem 0.75rem;
      border-radius: 9px;
      cursor: pointer;
      transition: all 0.15s ease;

      &--active {
        background: #ffffff;
        color: #0f172a;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
      }
    }
  }
}

.main-stage {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  width: 100%;
}

/* Desktop Full-screen Stage */
.desktop-stage-inner {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* Mobile Emulator Shell */
.mobile-emulator-shell {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  background: #e2e8f0;
}

.mobile-emulator-inner {
  width: 100%;
  max-width: 410px;
  height: 840px;
  background: #ffffff;
  border-radius: 40px;
  box-shadow:
    0 0 0 8px #1e293b,
    0 20px 40px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Toast */
.toast-notification {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #1e1e2e;
  color: #cdd6f4;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  border: 1px solid #313244;
  z-index: 200;
  pointer-events: none;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
