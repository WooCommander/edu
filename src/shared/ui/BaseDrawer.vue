<script setup lang="ts">
interface Props {
  isOpen: boolean
  title?: string
  position?: 'bottom' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  position: 'right'
})

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="props.isOpen"
        class="base-drawer-backdrop"
        @click="emit('close')"
      />
    </Transition>

    <Transition :name="`slide-${props.position}`">
      <aside
        v-if="props.isOpen"
        class="base-drawer"
        :class="`base-drawer--${props.position}`"
      >
        <header v-if="props.title || $slots.header" class="base-drawer__header">
          <slot name="header">
            <h3 class="base-drawer__title">{{ props.title }}</h3>
            <button
              type="button"
              class="base-drawer__close-btn"
              aria-label="Закрыть"
              @click="emit('close')"
            >
              ✕
            </button>
          </slot>
        </header>

        <div class="base-drawer__body">
          <slot />
        </div>

        <footer v-if="$slots.footer" class="base-drawer__footer">
          <slot name="footer" />
        </footer>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.base-drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  z-index: 100;
}

.base-drawer {
  position: fixed;
  background: #ffffff;
  z-index: 101;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  &--right {
    top: 0;
    right: 0;
    bottom: 0;
    width: 85%;
    max-width: 360px;
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
  }

  &--bottom {
    left: 0;
    right: 0;
    bottom: 0;
    max-height: 85vh;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.25rem 0.75rem;
    border-bottom: 1px solid #f1f5f9;
  }

  &__title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
  }

  &__close-btn {
    background: #f1f5f9;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 0.875rem;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      background: #e2e8f0;
      color: #0f172a;
    }
  }

  &__body {
    flex: 1;
    overflow-y: auto;
    padding: 1.25rem;
  }

  &__footer {
    padding: 1rem 1.25rem;
    border-top: 1px solid #f1f5f9;
    background: #f8fafc;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-bottom-enter-from,
.slide-bottom-leave-to {
  transform: translateY(100%);
}
</style>
