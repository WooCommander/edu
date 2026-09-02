<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  type?: string
  disabled?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '',
  type: 'text',
  disabled: false,
  error: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

function onInput(e: Event): void {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <label class="base-input-wrapper">
    <span v-if="props.label" class="base-input-wrapper__label">{{ props.label }}</span>

    <div class="base-input-wrapper__container">
      <div v-if="$slots.prefix" class="base-input-wrapper__prefix">
        <slot name="prefix" />
      </div>

      <input
        class="base-input-wrapper__field"
        :value="props.modelValue"
        :type="props.type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        @input="onInput"
        @focus="(e) => emit('focus', e)"
        @blur="(e) => emit('blur', e)"
      />

      <div v-if="$slots.suffix" class="base-input-wrapper__suffix">
        <slot name="suffix" />
      </div>
    </div>

    <span v-if="props.error" class="base-input-wrapper__error">{{ props.error }}</span>
  </label>
</template>

<style scoped lang="scss">
.base-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;

  &__label {
    font-size: 0.8125rem;
    font-weight: 500;
    color: #475569;
  }

  &__container {
    display: flex;
    align-items: center;
    background: #f1f5f9;
    border: 1px solid transparent;
    border-radius: 12px;
    padding: 0.5rem 0.85rem;
    gap: 0.5rem;
    transition: all 0.2s ease;

    &:focus-within {
      background: #ffffff;
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    }
  }

  &__field {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 0.9375rem;
    color: #0f172a;
    font-family: inherit;
    outline: none;

    &::placeholder {
      color: #94a3b8;
    }

    &:disabled {
      color: #94a3b8;
      cursor: not-allowed;
    }
  }

  &__prefix,
  &__suffix {
    display: inline-flex;
    align-items: center;
    color: #64748b;
  }

  &__error {
    font-size: 0.75rem;
    color: #ef4444;
  }
}
</style>
