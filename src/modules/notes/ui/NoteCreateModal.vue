<script setup lang="ts">
import { ref } from 'vue'
import { BaseButton, BaseInput, BaseModal } from '@/shared/ui'
import type { HighlightColor } from '@/api'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: { quoteText: string; comment: string; color: HighlightColor }): void
}>()

const quoteText = ref('')
const comment = ref('')
const selectedColor = ref<HighlightColor>('amber')

const colorOptions: { key: HighlightColor; label: string; bg: string }[] = [
  { key: 'amber', label: 'Желтый', bg: '#f59e0b' },
  { key: 'emerald', label: 'Зеленый', bg: '#10b981' },
  { key: 'purple', label: 'Фиолетовый', bg: '#8b5cf6' },
  { key: 'blue', label: 'Синий', bg: '#3b82f6' }
]

function handleSave(): void {
  if (quoteText.value.trim()) {
    emit('save', {
      quoteText: quoteText.value.trim(),
      comment: comment.value.trim(),
      color: selectedColor.value
    })
    quoteText.value = ''
    comment.value = ''
  }
}
</script>

<template>
  <BaseModal :is-open="props.isOpen" title="Новая заметка" @close="emit('close')">
    <div class="note-modal-form">
      <!-- Quote text input -->
      <label class="form-label">
        <span>Текст выделения / цитата</span>
        <textarea
          v-model="quoteText"
          class="form-textarea"
          rows="3"
          placeholder="Введите фрагмент статьи..."
        />
      </label>

      <!-- Comment input -->
      <BaseInput
        v-model="comment"
        label="Ваш комментарий (опционально)"
        placeholder="Личная мысль или объяснение..."
      />

      <!-- Color selector -->
      <div class="color-selector">
        <span class="color-label">Цвет маркера</span>
        <div class="color-bubbles">
          <button
            v-for="c in colorOptions"
            :key="c.key"
            type="button"
            class="color-bubble"
            :class="{ 'color-bubble--selected': selectedColor === c.key }"
            :style="{ backgroundColor: c.bg }"
            :title="c.label"
            @click="selectedColor = c.key"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <BaseButton
        variant="primary"
        full-width
        :disabled="!quoteText.trim()"
        @click="handleSave"
      >
        Сохранить заметку
      </BaseButton>
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
.note-modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #475569;
}

.form-textarea {
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 0.65rem 0.85rem;
  font-family: inherit;
  font-size: 0.9375rem;
  color: #0f172a;
  background: #f8fafc;
  outline: none;
  resize: vertical;

  &:focus {
    background: #ffffff;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
}

.color-selector {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  .color-label {
    font-size: 0.8125rem;
    font-weight: 500;
    color: #475569;
  }

  .color-bubbles {
    display: flex;
    gap: 0.75rem;
  }

  .color-bubble {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
    transition: transform 0.15s ease, border-color 0.15s ease;

    &:hover {
      transform: scale(1.1);
    }

    &--selected {
      border-color: #0f172a;
      transform: scale(1.15);
    }
  }
}
</style>
