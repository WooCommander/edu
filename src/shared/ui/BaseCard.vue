<script setup lang="ts">
interface Props {
  clickable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  elevated?: boolean
  bordered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  clickable: false,
  padding: 'md',
  elevated: false,
  bordered: true
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

function handleClick(e: MouseEvent): void {
  if (props.clickable) {
    emit('click', e)
  }
}
</script>

<template>
  <div
    class="base-card"
    :class="[
      `base-card--padding-${props.padding}`,
      {
        'base-card--clickable': props.clickable,
        'base-card--elevated': props.elevated,
        'base-card--bordered': props.bordered
      }
    ]"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.base-card {
  background: #ffffff;
  border-radius: 18px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &--bordered {
    border: 1px solid #f1f5f9;
  }

  &--elevated {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  }

  &--padding-none {
    padding: 0;
  }

  &--padding-sm {
    padding: 0.75rem;
  }

  &--padding-md {
    padding: 1.15rem;
  }

  &--padding-lg {
    padding: 1.5rem;
  }

  &--clickable {
    cursor: pointer;

    &:hover {
      border-color: #e2e8f0;
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.08);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }
}
</style>
