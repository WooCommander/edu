<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  isLoading?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  isLoading: false,
  fullWidth: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

function handleClick(e: MouseEvent): void {
  if (!props.disabled && !props.isLoading) {
    emit('click', e)
  }
}
</script>

<template>
  <button
    class="base-btn"
    :class="[
      `base-btn--${props.variant}`,
      `base-btn--${props.size}`,
      {
        'base-btn--loading': props.isLoading,
        'base-btn--full': props.fullWidth
      }
    ]"
    :disabled="props.disabled || props.isLoading"
    @click="handleClick"
  >
    <span v-if="props.isLoading" class="base-btn__spinner" />
    <span class="base-btn__content">
      <slot />
    </span>
  </button>
</template>

<style scoped lang="scss">
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;
  font-weight: 600;
  border-radius: 12px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  white-space: nowrap;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    box-shadow: none;
  }

  &--sm {
    padding: 0.4rem 0.8rem;
    font-size: 0.8125rem;
  }

  &--md {
    padding: 0.625rem 1.15rem;
    font-size: 0.9375rem;
  }

  &--lg {
    padding: 0.875rem 1.5rem;
    font-size: 1.05rem;
  }

  &--full {
    width: 100%;
  }

  &--primary {
    background: #6366f1;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.28);

    &:hover:not(:disabled) {
      background: #4f46e5;
      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.38);
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &--secondary {
    background: #f1f5f9;
    color: #334155;

    &:hover:not(:disabled) {
      background: #e2e8f0;
      color: #0f172a;
    }
  }

  &--outline {
    background: transparent;
    border-color: #cbd5e1;
    color: #475569;

    &:hover:not(:disabled) {
      background: #f8fafc;
      border-color: #94a3b8;
      color: #0f172a;
    }
  }

  &--ghost {
    background: transparent;
    color: #64748b;

    &:hover:not(:disabled) {
      background: #f1f5f9;
      color: #0f172a;
    }
  }

  &--text {
    background: transparent;
    color: #6366f1;
    padding-left: 0.25rem;
    padding-right: 0.25rem;

    &:hover:not(:disabled) {
      color: #4338ca;
      text-decoration: underline;
    }
  }

  &__content {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.65s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
