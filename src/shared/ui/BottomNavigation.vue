<script setup lang="ts">
import type { NavTab } from '@/shared/types'

interface Props {
  activeTab: NavTab
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:activeTab', tab: NavTab): void
}>()

interface NavItem {
  key: NavTab
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { key: 'dashboard', label: 'Главная', icon: '🏠' },
  { key: 'search', label: 'Поиск', icon: '🔍' },
  { key: 'notes', label: 'Заметки', icon: '📓' }
]
</script>

<template>
  <nav class="bottom-nav">
    <button
      v-for="item in navItems"
      :key="item.key"
      type="button"
      class="bottom-nav__item"
      :class="{ 'bottom-nav__item--active': props.activeTab === item.key }"
      @click="emit('update:activeTab', item.key)"
    >
      <span class="bottom-nav__icon">{{ item.icon }}</span>
      <span class="bottom-nav__label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<style scoped lang="scss">
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12px);
  border-top: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem 0.5rem 0.75rem;
  z-index: 50;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.35rem 0.65rem;
    border-radius: 12px;
    color: #94a3b8;
    transition: all 0.15s ease;

    &:hover {
      color: #475569;
    }

    &--active {
      color: #6366f1;

      .bottom-nav__label {
        font-weight: 700;
        color: #6366f1;
      }
    }
  }

  &__icon {
    font-size: 1.25rem;
    line-height: 1;
  }

  &__label {
    font-size: 0.6875rem;
    font-weight: 500;
    transition: color 0.15s ease;
  }
}
</style>
