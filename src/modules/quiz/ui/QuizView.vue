<script setup lang="ts">
import { onMounted } from 'vue'
import { BaseButton, BaseProgressBar } from '@/shared/ui'
import { quizService } from '../services/quiz.service'
import { quizState } from '../state/quiz.state'

const emit = defineEmits<{
  (e: 'back'): void
  (e: 'nextQuestion'): void
}>()

onMounted(async () => {
  if (!quizState.currentQuestion) {
    await quizService.loadQuizQuestion()
  }
})

function handleOptionClick(key: string): void {
  quizService.selectOption(key)
  quizService.submitAnswer()
}
</script>

<template>
  <div v-if="quizState.currentQuestion" class="quiz-view">
    <!-- Header with progress bar -->
    <header class="quiz-header">
      <div class="quiz-header__top">
        <button type="button" class="back-btn" @click="emit('back')">‹</button>
        <span class="quiz-header__title">{{ quizState.currentQuestion.progressLabel }}</span>
        <button type="button" class="more-btn">•••</button>
      </div>

      <div class="quiz-header__progress">
        <BaseProgressBar :value="60" color="#6366f1" :height="4" />
      </div>
    </header>

    <!-- Question Body -->
    <div class="quiz-body">
      <h2 class="quiz-question">
        {{ quizState.currentQuestion.questionText }}
      </h2>

      <!-- Options list A, B, C, D -->
      <div class="options-list">
        <button
          v-for="opt in quizState.currentQuestion.options"
          :key="opt.key"
          type="button"
          class="option-item"
          :class="{
            'option-item--selected': quizState.selectedOptionKey === opt.key,
            'option-item--correct':
              quizState.isAnswerSubmitted && opt.key === quizState.currentQuestion.correctKey,
            'option-item--wrong':
              quizState.isAnswerSubmitted &&
              quizState.selectedOptionKey === opt.key &&
              opt.key !== quizState.currentQuestion.correctKey
          }"
          @click="handleOptionClick(opt.key)"
        >
          <span class="option-key">{{ opt.key }}</span>
          <span class="option-text">{{ opt.text }}</span>
          <span
            v-if="quizState.isAnswerSubmitted && opt.key === quizState.currentQuestion.correctKey"
            class="option-check"
          >
            ✓
          </span>
        </button>
      </div>

      <!-- Feedback callout upon answering -->
      <div
        v-if="quizState.isAnswerSubmitted"
        class="quiz-feedback"
        :class="{
          'quiz-feedback--success':
            quizState.selectedOptionKey === quizState.currentQuestion.correctKey,
          'quiz-feedback--error':
            quizState.selectedOptionKey !== quizState.currentQuestion.correctKey
        }"
      >
        <p class="quiz-feedback__text">
          {{ quizState.currentQuestion.explanationText }}
        </p>
      </div>
    </div>

    <!-- Bottom button -->
    <footer class="quiz-footer">
      <BaseButton
        variant="primary"
        full-width
        :disabled="!quizState.isAnswerSubmitted"
        @click="emit('nextQuestion')"
      >
        Следующий вопрос
      </BaseButton>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.quiz-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ffffff;
  padding-bottom: 5.5rem;
}

.quiz-header {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-bottom: 1px solid #f1f5f9;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
  }

  .back-btn,
  .more-btn {
    background: none;
    border: none;
    font-size: 1.35rem;
    color: #0f172a;
    cursor: pointer;
  }

  &__title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #64748b;
  }

  &__progress {
    padding: 0 1rem 0.5rem;
  }
}

.quiz-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.quiz-question {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.45;
  color: #0f172a;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  font-family: inherit;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;

  &:hover {
    border-color: #cbd5e1;
    background: #f8fafc;
  }

  .option-key {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #f1f5f9;
    color: #475569;
    font-weight: 700;
    font-size: 0.8125rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .option-text {
    flex: 1;
    font-size: 0.9375rem;
    color: #1e293b;
    line-height: 1.4;
  }

  .option-check {
    color: #15803d;
    font-weight: bold;
    font-size: 1.1rem;
  }

  &--selected {
    border-color: #6366f1;
    background: #eef2ff;

    .option-key {
      background: #6366f1;
      color: #ffffff;
    }
  }

  &--correct {
    border-color: #86efac !important;
    background: #f0fdf4 !important;

    .option-key {
      background: #22c55e !important;
      color: #ffffff !important;
    }

    .option-text {
      color: #15803d !important;
      font-weight: 600;
    }
  }

  &--wrong {
    border-color: #fca5a5 !important;
    background: #fef2f2 !important;

    .option-key {
      background: #ef4444 !important;
      color: #ffffff !important;
    }

    .option-text {
      color: #b91c1c !important;
    }
  }
}

.quiz-feedback {
  padding: 1rem;
  border-radius: 12px;
  animation: fadeIn 0.25s ease;

  &--success {
    background: #dcfce7;
    border: 1px solid #bbf7d0;
    color: #166534;
  }

  &--error {
    background: #fee2e2;
    border: 1px solid #fecaca;
    color: #991b1b;
  }

  &__text {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

.quiz-footer {
  padding: 1rem 1.25rem;
  background: #ffffff;
  border-top: 1px solid #f1f5f9;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
