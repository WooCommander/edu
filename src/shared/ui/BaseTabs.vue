<script setup lang="ts">
export interface TabItem {
  key: string
  label: string
}

interface Props {
  modelValue: string
  tabs: TabItem[]
  pill?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pill: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', key: string): void
}>()
</script>

<template>
  <div class="base-tabs" :class="{ 'base-tabs--pill': props.pill }">
    <button
      v-for="tab in props.tabs"
      :key="tab.key"
      type="button"
      class="base-tabs__item"
      :class="{ 'base-tabs__item--active': props.modelValue === tab.key }"
      @click="emit('update:modelValue', tab.key)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.base-tabs {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &__item {
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.4rem 0.95rem;
    border-radius: 10px;
    border: none;
    background: transparent;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
      color: #0f172a;
    }

    &--active {
      background: #6366f1;
      color: #ffffff;
      font-weight: 600;

      &:hover {
        color: #ffffff;
      }
    }
  }

  &--pill {
    background: #f1f5f9;
    padding: 0.25rem;
    border-radius: 14px;

    .base-tabs__item--active {
      background: #6366f1;
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25);
    }
  }
}
</style>
