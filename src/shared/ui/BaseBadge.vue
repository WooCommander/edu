<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'neutral' | 'outline'
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  size: 'md'
})
</script>

<template>
  <span
    class="base-badge"
    :class="[
      `base-badge--${props.variant}`,
      `base-badge--${props.size}`
    ]"
  >
    <slot />
  </span>
</template>

<style scoped lang="scss">
.base-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 9999px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;

  &--sm {
    padding: 0.2rem 0.5rem;
    font-size: 0.7rem;
  }

  &--md {
    padding: 0.3rem 0.65rem;
    font-size: 0.75rem;
  }

  &--primary {
    background: #e0e7ff;
    color: #4338ca;
  }

  &--secondary {
    background: #f1f5f9;
    color: #475569;
  }

  &--success {
    background: #dcfce7;
    color: #15803d;
  }

  &--warning {
    background: #fef3c7;
    color: #b45309;
  }

  &--neutral {
    background: #f8fafc;
    color: #64748b;
    border: 1px solid #e2e8f0;
  }

  &--outline {
    background: transparent;
    border: 1px solid #cbd5e1;
    color: #64748b;
  }
}
</style>
