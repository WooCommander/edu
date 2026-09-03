<script setup lang="ts">
import { computed, ref } from 'vue'
import { appService } from '@/app/services/app-service'
import { appState } from '@/app/state/app-state'
import { authService } from '@/modules/auth'
import { isSupabaseConfigured } from '@/api/supabase'
import { BottomNavigation } from '@/shared/ui'
import {
  ArticleTocDrawer,
  BreadcrumbPathModal,
  knowledgeState
} from '@/modules/knowledge'
import { notesState } from '@/modules/notes'
import { useRoute } from 'vue-router'
import type { ActiveScreen, NavTab } from '@/shared/types'

const route = useRoute()
const isMobileSidebarOpen = ref(false)

interface MenuItem {
  screen: string
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
  { screen: 'notes', tab: 'notes', label: 'Мои заметки', icon: '📓' },
  { screen: 'quiz', label: 'Самопроверка (тест)', icon: '📝' },
  { screen: 'practice', label: 'Практика (код)', icon: '💻' },
  { screen: 'profile', tab: 'profile', label: 'Статистика', icon: '📊' }
]

const shouldShowBottomNav = computed(() => {
  return !['zen'].includes(route.name as string)
})

const shouldShowArticleBreadcrumbs = computed(() => {
  return ['article', 'zen', 'notes', 'quiz', 'practice'].includes(route.name as string)
})

function handleNavigate(item: MenuItem): void {
  isMobileSidebarOpen.value = false
  if (item.tab) {
    appService.navigateToTab(item.tab)
  } else {
    appService.navigateToScreen(item.screen as ActiveScreen)
  }
}

function handleTabChange(tab: NavTab): void {
  appService.navigateToTab(tab)
}

function handleOpenToc(): void {
  appService.toggleToc(true)
}

function handleShowFullBreadcrumbs(): void {
  appService.toggleBreadcrumbs(true)
}

function handleOpenZen(): void {
  appService.openZenMode()
}

function handleOpenArticle(articleId: string = 'article_watch'): void {
  appService.openArticle(articleId)
}

async function handleSignOut(): Promise<void> {
  isMobileSidebarOpen.value = false
  await authService.signOut()
}
</script>

<template>
  <div class="main-app-container">
    <!-- Backdrop for mobile sidebar drawer -->
    <Transition name="fade">
      <div
        v-if="isMobileSidebarOpen"
        class="sidebar-mobile-backdrop"
        @click="isMobileSidebarOpen = false"
      />
    </Transition>

    <!-- Sidebar: sticky on desktop, sliding drawer on mobile -->
    <aside
      class="app-sidebar"
      :class="{ 'app-sidebar--mobile-open': isMobileSidebarOpen }"
    >
      <!-- App Brand -->
      <div class="sidebar-brand">
        <span class="brand-logo">🧠</span>
        <div class="brand-info">
          <h2 class="brand-name">Система Знаний</h2>
          <span class="brand-sub">Личная база & LMS</span>
        </div>
        <!-- Mobile close button -->
        <button
          type="button"
          class="sidebar-close-mobile-btn"
          aria-label="Закрыть меню"
          @click="isMobileSidebarOpen = false"
        >
          ✕
        </button>
      </div>

      <!-- Quick Search Trigger -->
      <div
        class="sidebar-search-trigger"
        @click="() => { isMobileSidebarOpen = false; appService.navigateToScreen('search') }"
      >
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
          :class="{ 'sidebar-nav-item--active': route.name === item.screen }"
          @click="handleNavigate(item)"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
          <span v-if="item.screen === 'notes' && notesState.notes.length > 0" class="nav-badge">
            {{ notesState.notes.length }}
          </span>
          <span v-else-if="item.badge" class="nav-badge">{{ item.badge }}</span>
        </button>
      </nav>

      <!-- Context Tools Box -->
      <div class="sidebar-tools">
        <span class="nav-section-title">ИНСТРУМЕНТЫ СТАТЬИ</span>
        <button
          type="button"
          class="tool-btn"
          @click="() => { isMobileSidebarOpen = false; handleOpenToc() }"
        >
          <span>📑</span> Оглавление (TOC)
        </button>
        <button
          type="button"
          class="tool-btn"
          @click="() => { isMobileSidebarOpen = false; handleShowFullBreadcrumbs() }"
        >
          <span>🧭</span> Полный путь
        </button>
        <button
          type="button"
          class="tool-btn"
          @click="() => { isMobileSidebarOpen = false; handleOpenZen() }"
        >
          <span>👁️</span> Zen-режим
        </button>
      </div>

      <!-- User Profile Footer -->
      <div class="sidebar-footer">
        <div class="user-card">
          <img
            class="user-avatar"
            :src="appState.user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'"
            :alt="appState.user?.name || 'Профиль'"
          />
          <div class="user-details">
            <strong class="user-name">{{ appState.user?.name || 'Гость' }}</strong>
            <span class="user-status">Изучает Vue 3</span>
          </div>
          <button
            v-if="isSupabaseConfigured"
            type="button"
            class="sign-out-btn"
            title="Выйти"
            aria-label="Выйти"
            @click="handleSignOut"
          >
            ⏻
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="content-wrapper">
      <!-- Top Navigation Bar -->
      <header class="top-nav-bar">
        <div class="top-nav-left">
          <!-- Hamburger button for mobile/tablet screens -->
          <button
            type="button"
            class="mobile-menu-toggle-btn"
            aria-label="Открыть меню"
            @click="isMobileSidebarOpen = true"
          >
            <span class="bar" />
            <span class="bar" />
            <span class="bar" />
          </button>

          <span class="current-screen-badge">
            {{ (route.name as string || '').toUpperCase() }}
          </span>

          <div v-if="shouldShowArticleBreadcrumbs && knowledgeState.currentArticle" class="desktop-breadcrumbs">
            <template
              v-for="(crumb, index) in knowledgeState.currentArticle.categoryPathArray"
              :key="crumb"
            >
              <span class="sep" v-if="index > 0">/</span>
              <span :class="{ active: index === knowledgeState.currentArticle.categoryPathArray.length - 1 }">
                {{ crumb }}
              </span>
            </template>
          </div>
        </div>

        <div class="top-nav-right">
          <!-- Clean minimal desktop search trigger or status -->
          <button
            type="button"
            class="header-search-btn"
            title="Поиск"
            @click="appService.navigateToScreen('search')"
          >
            <span>🔍</span>
            <span class="search-text">Поиск...</span>
          </button>
        </div>
      </header>

      <!-- Responsive Full Width Content View -->
      <main class="main-stage">
        <slot />
      </main>

      <!-- Bottom Navigation Bar (Visible only on mobile/tablets <= 900px) -->
      <BottomNavigation
        v-if="shouldShowBottomNav"
        class="mobile-bottom-nav"
        :active-tab="appState.activeTab"
        @update:active-tab="handleTabChange"
      />
    </div>

    <!-- Modals & Drawers -->
    <ArticleTocDrawer
      v-if="knowledgeState.currentArticle"
      :is-open="appState.isTocOpen"
      :sections="knowledgeState.currentArticle.sections"
      :selected-section-id="knowledgeState.selectedSectionId"
      :progress-percent="knowledgeState.currentArticle.progressPercent"
      @close="appService.toggleToc(false)"
      @select-section="(secId) => { knowledgeState.selectedSectionId = secId; appService.toggleToc(false) }"
    />

    <BreadcrumbPathModal
      :is-open="appState.isBreadcrumbsOpen"
      @close="appService.toggleBreadcrumbs(false)"
      @go-to-article="(articleId) => { appService.toggleBreadcrumbs(false); handleOpenArticle(articleId) }"
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
/* Mobile Sidebar Backdrop */
.sidebar-mobile-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  z-index: 90;
}

/* App Sidebar */
.app-sidebar {
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
  z-index: 100;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  /* Hide on screens <= 900px and make drawer */
  @media (max-width: 900px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    transform: translateX(-100%);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

    &--mobile-open {
      transform: translateX(0);
    }
  }
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.25rem 0.5rem;
  position: relative;

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

  .sidebar-close-mobile-btn {
    display: none;
    margin-left: auto;
    background: #f1f5f9;
    border: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 0.8rem;
    color: #64748b;

    @media (max-width: 900px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
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

  .sign-out-btn {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: #94a3b8;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.15s ease;

    &:hover {
      background: #fee2e2;
      color: #ef4444;
    }
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
    gap: 0.85rem;
  }

  .mobile-menu-toggle-btn {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 28px;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;

    .bar {
      width: 100%;
      height: 2.5px;
      background: #0f172a;
      border-radius: 2px;
    }

    @media (max-width: 900px) {
      display: flex;
    }
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

  .top-nav-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .header-search-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.35rem 0.75rem;
    font-size: 0.8125rem;
    color: #64748b;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: #f1f5f9;
      color: #0f172a;
      border-color: #cbd5e1;
    }

    .search-text {
      font-size: 0.75rem;
    }
  }
}

.main-stage {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  width: 100%;

  @media (max-width: 900px) {
    padding-bottom: 4.5rem; /* space for bottom nav */
  }
}

/* Mobile bottom nav: hidden on desktop, visible on mobile */
.mobile-bottom-nav {
  display: none !important;

  @media (max-width: 900px) {
    display: flex !important;
  }
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
