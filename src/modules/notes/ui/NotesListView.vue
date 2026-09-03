<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { BaseButton, BaseCard, BaseTabs } from '@/shared/ui'
import type { TabItem } from '@/shared/ui'
import { notesService } from '../services/notes.service'
import { useRoute } from 'vue-router'
import { notesState } from '../state/notes.state'
import NoteCreateModal from './NoteCreateModal.vue'
import type { HighlightColor } from '@/api'

const route = useRoute()

const emit = defineEmits<{
  (e: 'back'): void
  (e: 'selectNote', noteId: string): void
}>()

const notesTabs: TabItem[] = [
  { key: 'all', label: 'Все' },
  { key: 'current', label: 'Эта статья' },
  { key: 'related', label: 'Связанные' }
]

onMounted(async () => {
  if (notesState.notes.length === 0) {
    await notesService.loadNotes()
  }
})

const filteredNotes = computed(() => {
  if (notesState.activeTab === 'all') return notesState.notes
  if (notesState.activeTab === 'related') return notesState.notes.filter(n => n.isRelated)
  return notesState.notes.filter(n => n.articleId === ((route.params.id as string) || 'article_watch'))
})

function getColorClass(color: HighlightColor): string {
  switch (color) {
    case 'amber':
      return 'border-amber'
    case 'emerald':
      return 'border-emerald'
    case 'purple':
      return 'border-purple'
    case 'blue':
      return 'border-blue'
    default:
      return 'border-amber'
  }
}

function handleSaveNote(payload: { quoteText: string; comment: string; color: HighlightColor }): void {
  notesService.createNote(payload.quoteText, payload.comment, payload.color)
}
</script>

<template>
  <div class="notes-view">
    <!-- Header -->
    <header class="notes-header">
      <button type="button" class="back-btn" @click="emit('back')">‹</button>
      <h1 class="notes-title">Мои заметки</h1>
      <button type="button" class="more-btn">•••</button>
    </header>

    <!-- Filter Tabs -->
    <div class="tabs-wrap">
      <BaseTabs
        :model-value="notesState.activeTab"
        :tabs="notesTabs"
        @update:model-value="(k) => notesService.setActiveTab(k as 'all' | 'current' | 'related')"
      />
    </div>

    <!-- Notes list body -->
    <div class="notes-body">
      <div class="notes-section-title">Выделения в тексте</div>

      <div class="notes-list">
        <BaseCard
          v-for="note in filteredNotes"
          :key="note.id"
          padding="sm"
          clickable
          class="note-card"
          :class="getColorClass(note.color)"
          @click="emit('selectNote', note.id)"
        >
          <div class="note-card__inner">
            <div class="note-card__content">
              <p class="note-card__quote">«{{ note.quoteText }}»</p>
              <p v-if="note.userComment" class="note-card__comment">
                💬 {{ note.userComment }}
              </p>
            </div>

            <div class="note-card__meta">
              <span class="note-card__date">{{ note.createdLabel }}</span>
              <span class="note-card__icon">📝</span>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>

    <!-- Floating Action Button at Bottom -->
    <div class="notes-floating-btn-wrap">
      <BaseButton
        variant="primary"
        size="md"
        @click="notesService.toggleCreateModal(true)"
      >
        <span>+</span> Новая заметка
      </BaseButton>
    </div>

    <!-- Create Note Modal -->
    <NoteCreateModal
      :is-open="notesState.isCreateModalOpen"
      @close="notesService.toggleCreateModal(false)"
      @save="handleSaveNote"
    />
  </div>
</template>

<style scoped lang="scss">
.notes-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 5.5rem;
  background: #ffffff;
}

.notes-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f1f5f9;

  .back-btn,
  .more-btn {
    background: none;
    border: none;
    font-size: 1.35rem;
    color: #0f172a;
    cursor: pointer;
  }

  .notes-title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
    color: #0f172a;
  }
}

.tabs-wrap {
  padding: 0.75rem 1.25rem 0.25rem;
}

.notes-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.notes-section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.note-card {
  border: 1px solid #f1f5f9;
  border-left-width: 4px;
  background: #fafafa;

  &.border-amber {
    border-left-color: #f59e0b;
    background: #fffbeb;
  }

  &.border-emerald {
    border-left-color: #10b981;
    background: #f0fdf4;
  }

  &.border-purple {
    border-left-color: #8b5cf6;
    background: #faf5ff;
  }

  &.border-blue {
    border-left-color: #3b82f6;
    background: #eff6ff;
  }

  &__inner {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  &__quote {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1.45;
    color: #1e293b;
  }

  &__comment {
    margin: 0;
    font-size: 0.8125rem;
    color: #475569;
    font-style: italic;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
  }

  &__date {
    font-size: 0.7rem;
    color: #94a3b8;
    white-space: nowrap;
  }

  &__icon {
    font-size: 0.9rem;
  }
}

.notes-floating-btn-wrap {
  display: flex;
  justify-content: center;
  padding: 0.75rem;
  position: sticky;
  bottom: 4rem;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.95), transparent);
}
</style>
