<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { appService } from '@/app/services/app-service'
import { appState } from '@/app/state/app-state'
import { authService } from '@/modules/auth'
import { BottomNavigation } from '@/shared/ui'
import KnowledgeTreeView from '@/modules/knowledge/ui/KnowledgeTreeView.vue'
import { useRoute } from 'vue-router'
import type { ActiveScreen, NavTab } from '@/shared/types'
import {
  ArticleTocDrawer,
  BreadcrumbPathModal,
  knowledgeService,
  knowledgeState
} from '@/modules/knowledge'
import { expandPathTo, findBreadcrumbPath, type TreeNodeUIModel } from '@/modules/knowledge/adapters/knowledge.adapter'
import { searchService } from '@/modules/search/services/search.service'
import { searchState } from '@/modules/search/state/search.state'
import { NoteCreateModal, notesService, notesState } from '@/modules/notes'
import type { HighlightColor } from '@/api'
import { Home, BookOpen, Search, X, LogOut } from 'lucide-vue-next'

const route = useRoute()
const isMobileSidebarOpen = ref(false)
const searchInputRef = ref<HTMLInputElement | null>(null)

interface TopNavTab {
  screen: string
  tab?: NavTab
  icon: any
  label: string
}

const topTabs: TopNavTab[] = [
  { screen: 'dashboard', tab: 'dashboard', icon: Home, label: 'Главная' },
  { screen: 'search', tab: 'search', icon: Search, label: 'Поиск' },
  { screen: 'notes', tab: 'notes', icon: BookOpen, label: 'Заметки' }
]

const shouldShowBottomNav = computed(() => {
  return !['zen'].includes(route.name as string)
})

const shouldShowArticleBreadcrumbs = computed(() => {
  return ['article', 'zen', 'notes'].includes(route.name as string) && !!knowledgeState.currentArticle
})

// Путь до текущей статьи в дереве — то же самое, что видно в BreadcrumbPathModal,
// но всегда на виду в шапке и каждый уровень кликабелен.
const breadcrumbNodes = computed<TreeNodeUIModel[]>(() => {
  if (!knowledgeState.tree || !knowledgeState.selectedNodeId) return []
  return findBreadcrumbPath(knowledgeState.tree, knowledgeState.selectedNodeId)
})

async function handleBreadcrumbClick(node: TreeNodeUIModel): Promise<void> {
  if (node.hasArticle && node.articleId) {
    appService.openArticle(node.articleId)
    return
  }
  // Промежуточный уровень без своей статьи — просто раскрыть и показать его в дереве
  knowledgeService.setSelectedNode(node.id)
  if (knowledgeState.tree) expandPathTo(knowledgeState.tree, node.id)
  isMobileSidebarOpen.value = true
  await nextTick()
  document.querySelector(`[data-node-id="${node.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function handleNavigate(item: TopNavTab): void {
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

// ⌘K/клик по подсказке — просто ставит фокус в уже видимое поле фильтра
// дерева в сайдбаре (на мобильном сначала открывает сам сайдбар)
async function handleSearchFocus(): Promise<void> {
  isMobileSidebarOpen.value = true
  await nextTick()
  searchInputRef.value?.focus()
}

function handleOpenArticle(articleId: string = 'article_watch'): void {
  appService.openArticle(articleId)
}

function handleSaveNote(payload: { id?: string; quoteText: string; comment: string; color: HighlightColor }): void {
  if (payload.id) {
    void notesService.updateNote(payload.id, payload.quoteText, payload.comment, payload.color)
  } else {
    void notesService.createNote(payload.quoteText, payload.comment, payload.color)
  }
}

async function handleSignOut(): Promise<void> {
  isMobileSidebarOpen.value = false
  await authService.signOut()
}

// Инициалы пользователя как фоллбэк для аватара — без обращения к внешнему сервису
const userInitials = computed(() => {
  const name = appState.user?.name?.trim()
  if (!name) return '?'
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
})

// Реальный шорткат ⌘K / Ctrl+K для быстрого поиска (см. подсказку в сайдбаре)
function handleGlobalKeydown(event: KeyboardEvent): void {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    handleSearchFocus()
  } else if (event.key === 'Escape' && isMobileSidebarOpen.value) {
    isMobileSidebarOpen.value = false
  }
}

onMounted(() => window.addEventListener('keydown', handleGlobalKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleGlobalKeydown))
</script>

<template>
  <div class="main-app-container">
    <Transition name="fade">
      <div
        v-if="isMobileSidebarOpen"
        class="sidebar-mobile-backdrop"
        @click="isMobileSidebarOpen = false"
      />
    </Transition>

    <aside
      class="app-sidebar"
      :class="{ 'app-sidebar--mobile-open': isMobileSidebarOpen }"
    >
      <div class="sidebar-brand">
        <span class="brand-logo">🧠</span>
        <div class="brand-info">
          <h2 class="brand-name">Система Знаний</h2>
          <span class="brand-sub">Личная база знаний</span>
        </div>
        <button
          type="button"
          class="sidebar-close-mobile-btn"
          aria-label="Закрыть меню"
          @click="isMobileSidebarOpen = false"
        >
          ✕
        </button>
      </div>

      <!-- Quick Nav Tabs -->
      <nav class="sidebar-quick-tabs">
        <button
          v-for="tab in topTabs"
          :key="tab.screen"
          type="button"
          class="quick-tab-btn"
          :class="{ 'quick-tab-btn--active': route.name === tab.screen }"
          @click="handleNavigate(tab)"
          :title="tab.label"
        >
          <component :is="tab.icon" class="tab-icon" />
          <span class="tab-label">{{ tab.label }}</span>
        </button>
      </nav>

      <!-- Search Bar embedded in sidebar: filters the tree below as you type -->
      <div class="sidebar-search">
        <div class="search-input-wrapper">
          <Search class="search-icon" />
          <input
            ref="searchInputRef"
            type="text"
            class="search-input"
            placeholder="Фильтр по дереву..."
            :value="searchState.query"
            @input="searchService.setQuery(($event.target as HTMLInputElement).value)"
          />
          <button
            v-if="searchState.query"
            type="button"
            class="search-clear-btn"
            aria-label="Очистить поиск"
            @click="searchService.setQuery('')"
          >
            <X class="icon-sm" />
          </button>
          <kbd v-else class="search-kbd">⌘K</kbd>
        </div>
      </div>

      <!-- Tree embedded in sidebar -->
      <div class="sidebar-tree-container">
        <span class="section-title">СОДЕРЖАНИЕ КУРСА</span>
        <KnowledgeTreeView />
      </div>

      <div class="sidebar-footer">
        <div
          class="user-card"
          role="button"
          tabindex="0"
          title="Открыть профиль"
          @click="appService.navigateToScreen('profile')"
          @keydown.enter="appService.navigateToScreen('profile')"
        >
          <img
            v-if="appState.user?.avatarUrl"
            class="user-avatar"
            :src="appState.user.avatarUrl"
            :alt="appState.user.name"
          />
          <span v-else class="user-avatar user-avatar--placeholder" aria-hidden="true">{{ userInitials }}</span>
          <div class="user-details">
            <strong class="user-name">{{ appState.user?.name || 'Гость' }}</strong>
            <span class="user-status">Изучает Vue 3</span>
          </div>
          <button
            type="button"
            class="sign-out-btn"
            title="Выйти"
            @click.stop="handleSignOut"
          >
            <LogOut class="logout-icon" />
          </button>
        </div>
      </div>
    </aside>

    <div class="content-wrapper">
      <header class="top-nav-bar">
        <div class="top-nav-left">
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

          <nav v-if="shouldShowArticleBreadcrumbs" class="desktop-breadcrumbs" aria-label="Хлебные крошки">
            <template v-for="(crumb, index) in breadcrumbNodes" :key="crumb.id">
              <span class="sep" v-if="index > 0">/</span>
              <button
                type="button"
                class="breadcrumb-crumb"
                :class="{ active: index === breadcrumbNodes.length - 1 }"
                @click="handleBreadcrumbClick(crumb)"
              >
                {{ crumb.title }}
              </button>
            </template>
          </nav>
        </div>
      </header>

      <main class="main-stage">
        <slot />
      </main>

      <BottomNavigation
        v-if="shouldShowBottomNav"
        class="mobile-bottom-nav"
        :active-tab="appState.activeTab"
        @update:active-tab="handleTabChange"
      />
    </div>

    <!-- Modals -->
    <ArticleTocDrawer
      v-if="knowledgeState.currentArticle"
      :is-open="knowledgeState.isTocOpen"
      :sections="knowledgeState.currentArticle.sections"
      :selected-section-id="knowledgeState.selectedSectionId"
      :progress-percent="knowledgeState.currentArticle.progressPercent"
      @close="appService.toggleToc(false)"
      @select-section="(secId) => { knowledgeService.setSelectedSection(secId); appService.toggleToc(false) }"
    />

    <BreadcrumbPathModal
      :is-open="knowledgeState.isBreadcrumbsOpen"
      @close="appService.toggleBreadcrumbs(false)"
      @go-to-article="(articleId) => { appService.toggleBreadcrumbs(false); handleOpenArticle(articleId) }"
    />

    <NoteCreateModal
      :is-open="notesState.isCreateModalOpen"
      :note="notesState.editingNote"
      @close="notesService.toggleCreateModal(false)"
      @save="handleSaveNote"
    />

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
  background: #ffffff;
  position: relative;
}

.sidebar-mobile-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  z-index: 90;
}

.app-sidebar {
  width: 290px;
  background: #f8fafc;
  border-right: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);

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
  padding: 1.25rem 1.25rem 1rem;

  .brand-logo { font-size: 1.75rem; }
  .brand-name {
    margin: 0;
    font-size: 1.1rem;
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
    background: transparent;
    border: none;
    font-size: 1.2rem;
    color: #64748b;
    cursor: pointer;

    @media (max-width: 900px) { display: block; }
  }
}

.sidebar-quick-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
  padding: 0 1rem;
  margin-bottom: 1rem;

  .quick-tab-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    padding: 0.5rem 0;
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    color: #64748b;
    transition: all 0.2s;

    &:hover {
      background: #f1f5f9;
      color: #334155;
    }

    &--active {
      background: #e0e7ff;
      color: #4338ca;
    }

    .tab-icon {
      width: 20px;
      height: 20px;
    }
    
    .tab-label {
      font-size: 0.65rem;
      font-weight: 600;
    }
  }
}

.sidebar-search {
  padding: 0 1rem;
  margin-bottom: 1rem;

  .search-input-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    transition: border-color 0.2s;
    box-shadow: 0 1px 2px rgba(0,0,0,0.02);

    &:focus-within {
      border-color: #6366f1;
    }

    .search-icon {
      width: 16px;
      height: 16px;
      color: #94a3b8;
      flex-shrink: 0;
    }

    .search-input {
      flex: 1;
      min-width: 0;
      border: none;
      background: transparent;
      outline: none;
      font-family: inherit;
      font-size: 0.8125rem;
      color: #334155;

      &::placeholder {
        color: #94a3b8;
      }
    }

    .search-kbd {
      font-size: 0.65rem;
      color: #94a3b8;
      background: #f1f5f9;
      padding: 2px 4px;
      border-radius: 4px;
      font-weight: 600;
      flex-shrink: 0;
    }

    .search-clear-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      padding: 2px;
      flex-shrink: 0;

      &:hover { color: #475569; }

      .icon-sm {
        width: 14px;
        height: 14px;
      }
    }
  }
}

.sidebar-tree-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .section-title {
    padding: 0 1.25rem 0.5rem;
    font-size: 0.7rem;
    font-weight: 700;
    color: #94a3b8;
    letter-spacing: 0.05em;
  }
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid #f1f5f9;

  .user-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    border-radius: 12px;
    padding: 0.25rem;
    margin: -0.25rem;
    transition: background 0.15s ease;

    &:hover {
      background: #f8fafc;
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
    }

    .user-avatar--placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-primary-light, #e0e7ff);
      color: var(--color-primary-hover, #4338ca);
      font-size: 0.8rem;
      font-weight: 700;
    }
    
    .user-details {
      display: flex;
      flex-direction: column;
      flex: 1;
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
      background: transparent;
      border: none;
      cursor: pointer;
      color: #94a3b8;
      padding: 0.25rem;
      
      &:hover { color: #ef4444; }
      
      .logout-icon {
        width: 18px;
        height: 18px;
      }
    }
  }
}

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
  border-bottom: 1px solid #f1f5f9;
  position: sticky;
  top: 0;
  z-index: 30;

  .top-nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .mobile-menu-toggle-btn {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 24px;
    height: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;

    .bar {
      width: 100%;
      height: 2px;
      background: #334155;
      border-radius: 2px;
    }

    @media (max-width: 900px) { display: flex; }
  }

  .desktop-breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #64748b;

    .sep { color: #cbd5e1; }

    .breadcrumb-crumb {
      background: none;
      border: none;
      padding: 0.15rem 0.3rem;
      margin: -0.15rem -0.3rem;
      border-radius: 6px;
      font: inherit;
      font-size: 0.875rem;
      color: #64748b;
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover { background: #f1f5f9; color: #0f172a; }

      &.active {
        color: #0f172a;
        font-weight: 600;
        cursor: default;

        &:hover { background: none; }
      }
    }

    @media (max-width: 600px) { display: none; }
  }
}

.main-stage {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.mobile-bottom-nav {
  @media (min-width: 901px) { display: none; }
}

.toast-notification {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 100%); }
</style>
