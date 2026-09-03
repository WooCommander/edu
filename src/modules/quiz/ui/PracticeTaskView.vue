<script setup lang="ts">
import { onMounted } from 'vue'
import { appState } from '@/app/state/app-state'
import { BaseButton, BaseTabs } from '@/shared/ui'
import type { TabItem } from '@/shared/ui'
import { quizService } from '../services/quiz.service'
import { quizState } from '../state/quiz.state'

const emit = defineEmits<{
  (e: 'back'): void
  (e: 'complete'): void
}>()

const practiceTabs: TabItem[] = [
  { key: 'condition', label: 'Условие' },
  { key: 'solution', label: 'Моё решение' }
]

onMounted(async () => {
  if (quizState.currentPracticeTask?.articleId !== appState.selectedArticleId) {
    await quizService.loadPracticeTask(appState.selectedArticleId)
  }
})

function handleTabChange(key: string): void {
  quizService.setPracticeTab(key as 'condition' | 'solution')
}

function handleVerify(): void {
  quizService.verifySolution()
}
</script>

<template>
  <div v-if="quizState.currentPracticeTask" class="practice-view">
    <!-- Header -->
    <header class="practice-header">
      <div class="practice-header__top">
        <button type="button" class="back-btn" @click="emit('back')">‹</button>
        <span class="practice-header__title">{{ quizState.currentPracticeTask.progressLabel }}</span>
        <div class="practice-actions">
          <BaseButton
            size="sm"
            variant="primary"
            @click="handleVerify"
          >
            {{ quizState.isTaskVerified ? 'Завершить' : 'Проверить решение' }}
          </BaseButton>
        </div>
      </div>

      <h2 class="practice-title">{{ quizState.currentPracticeTask.title }}</h2>

      <!-- Mobile Tabs Switcher -->
      <div class="practice-tabs-box mobile-only">
        <BaseTabs
          :model-value="quizState.activePracticeTab"
          :tabs="practiceTabs"
          @update:model-value="handleTabChange"
        />
      </div>
    </header>

    <!-- Content Body (Split layout on desktop) -->
    <div class="practice-body">
      <!-- Condition Column -->
      <div
        class="condition-col"
        :class="{ 'hidden-mobile': quizState.activePracticeTab !== 'condition' }"
      >
        <div class="condition-card">
          <h3 class="col-heading">Постановка задачи</h3>
          <p class="desc">{{ quizState.currentPracticeTask.description }}</p>
          <ul class="requirements-list">
            <li v-for="(req, idx) in quizState.currentPracticeTask.requirements" :key="idx">
              {{ req }}
            </li>
          </ul>

          <div class="hints-box">
            <strong>💡 Подсказка:</strong>
            <p>Используйте watch с двумя аргументами колбэка: <code>(newVal, oldVal) => ...</code></p>
          </div>
        </div>
      </div>

      <!-- Solution / Code Editor Column -->
      <div
        class="solution-col"
        :class="{ 'hidden-mobile': quizState.activePracticeTab !== 'solution' }"
      >
        <div class="editor-header">
          <div class="editor-header__file">
            <span class="file-icon">📄</span>
            <span class="file-name">App.vue</span>
          </div>
          <span class="editor-badge">Vue 3 SFC (TypeScript)</span>
        </div>

        <div class="editor-container">
          <textarea
            v-model="quizState.userCode"
            class="code-textarea"
            spellcheck="false"
          />
        </div>

        <div v-if="quizState.isTaskVerified" class="verification-badge">
          <span>🎉</span> Решение успешно прошло тесты реактивности!
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.practice-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f8fafc;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding-bottom: 2rem;
}

.practice-header {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: #ffffff;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .back-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #0f172a;
    cursor: pointer;
    line-height: 1;
  }

  &__title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #64748b;
  }

  .practice-title {
    margin: 0;
    font-size: 1.45rem;
    font-weight: 800;
    color: #0f172a;
  }

  .mobile-only {
    display: none;
    margin-top: 0.75rem;

    @media (max-width: 768px) {
      display: flex;
    }
  }
}

.practice-body {
  flex: 1;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    display: flex;
    flex-direction: column;

    .hidden-mobile {
      display: none !important;
    }
  }
}

.condition-col {
  display: flex;
  flex-direction: column;

  .condition-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 1.5rem;
    border: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  }

  .col-heading {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 700;
    color: #0f172a;
  }

  .desc {
    margin: 0;
    font-size: 0.95rem;
    color: #334155;
    line-height: 1.6;
  }

  .requirements-list {
    margin: 0;
    padding-left: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #475569;
    line-height: 1.5;
  }

  .hints-box {
    background: #fffbeb;
    border: 1px solid #fef3c7;
    border-radius: 12px;
    padding: 0.85rem 1rem;
    font-size: 0.85rem;
    color: #92400e;

    p {
      margin: 0.25rem 0 0;
    }

    code {
      background: rgba(0,0,0,0.06);
      padding: 0.15rem 0.35rem;
      border-radius: 4px;
      font-family: monospace;
    }
  }
}

.solution-col {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.85rem;
}

.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #181825;
  padding: 0.65rem 1rem;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  color: #cdd6f4;
  font-size: 0.85rem;
  font-family: monospace;

  &__file {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .editor-badge {
    background: #313244;
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    font-size: 0.75rem;
    color: #a6adc8;
  }
}

.editor-container {
  flex: 1;
  min-height: 380px;
  background: #1e1e2e;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
  padding: 0.75rem 1rem;
  display: flex;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

  .code-textarea {
    width: 100%;
    height: 100%;
    min-height: 380px;
    background: transparent;
    border: none;
    color: #cdd6f4;
    font-family: 'Fira Code', monospace;
    font-size: 0.92rem;
    line-height: 1.6;
    outline: none;
    resize: none;
    white-space: pre;
  }
}

.verification-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #dcfce7;
  color: #15803d;
  padding: 0.85rem 1.25rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid #bbf7d0;
}
</style>
