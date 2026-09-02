<script setup lang="ts">
import { BaseDrawer, BaseProgressBar } from '@/shared/ui'
import type { ArticleSectionUIModel } from '../adapters/knowledge.adapter'

interface Props {
  isOpen: boolean
  sections: ArticleSectionUIModel[]
  selectedSectionId?: string
  progressPercent?: number
}

const props = withDefaults(defineProps<Props>(), {
  selectedSectionId: 'sec_2_2',
  progressPercent: 60
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'selectSection', sectionId: string): void
}>()
</script>

<template>
  <BaseDrawer
    :is-open="props.isOpen"
    title="Содержание"
    position="right"
    @close="emit('close')"
  >
    <!-- Sections tree list -->
    <div class="toc-list">
      <div
        v-for="section in props.sections"
        :key="section.id"
        class="toc-item-group"
      >
        <div
          class="toc-row"
          :class="{
            'toc-row--active': props.selectedSectionId === section.id,
            'toc-row--read': section.isRead
          }"
          @click="emit('selectSection', section.id)"
        >
          <span class="toc-code">{{ section.code }}</span>
          <span class="toc-title">{{ section.title }}</span>
          <span v-if="section.isRead" class="toc-check">✓</span>
        </div>

        <!-- Child sub-sections -->
        <div v-if="section.children && section.children.length > 0" class="toc-sublist">
          <div
            v-for="sub in section.children"
            :key="sub.id"
            class="toc-row toc-row--sub"
            :class="{
              'toc-row--active': props.selectedSectionId === sub.id,
              'toc-row--read': sub.isRead
            }"
            @click="emit('selectSection', sub.id)"
          >
            <span class="toc-code">{{ sub.code }}</span>
            <span class="toc-title">{{ sub.title }}</span>
            <span v-if="sub.isRead" class="toc-check">✓</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer with progress bar -->
    <template #footer>
      <div class="toc-footer">
        <div class="toc-progress-label">
          <span>Ваш прогресс по статье</span>
          <span class="toc-progress-val">Прочитано {{ props.progressPercent }}%</span>
        </div>
        <BaseProgressBar :value="props.progressPercent" color="#6366f1" :height="6" />
      </div>
    </template>
  </BaseDrawer>
</template>

<style scoped lang="scss">
.toc-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.toc-item-group {
  display: flex;
  flex-direction: column;
}

.toc-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.65rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;

  &:hover {
    background: #f8fafc;
  }

  &--sub {
    padding-left: 1.5rem;
  }

  &--active {
    background: #e0e7ff !important;
    color: #4338ca;
    font-weight: 600;

    .toc-title {
      color: #4338ca;
      font-weight: 600;
    }
  }

  .toc-code {
    font-size: 0.8125rem;
    color: #64748b;
    font-family: 'Fira Code', monospace;
  }

  .toc-title {
    font-size: 0.875rem;
    color: #1e293b;
    flex: 1;
  }

  .toc-check {
    color: #10b981;
    font-weight: bold;
    font-size: 0.85rem;
  }
}

.toc-footer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .toc-progress-label {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: #64748b;

    .toc-progress-val {
      font-weight: 600;
      color: #4338ca;
    }
  }
}
</style>
