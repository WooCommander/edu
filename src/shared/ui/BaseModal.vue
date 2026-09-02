<script setup lang="ts">
interface Props {
  isOpen: boolean
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: ''
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
        class="base-modal-backdrop"
        @click="emit('close')"
      >
        <div class="base-modal-container" @click.stop>
          <header v-if="props.title || $slots.header" class="base-modal__header">
            <slot name="header">
              <h3 class="base-modal__title">{{ props.title }}</h3>
              <button
                type="button"
                class="base-modal__close-btn"
                aria-label="Закрыть"
                @click="emit('close')"
              >
                ✕
              </button>
            </slot>
          </header>

          <div class="base-modal__body">
            <slot />
          </div>

          <footer v-if="$slots.footer" class="base-modal__footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.base-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(5px);
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.base-modal-container {
  background: #ffffff;
  border-radius: 24px;
  width: 100%;
  max-width: 440px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: popIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.base-modal {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.25rem 0.75rem;
    border-bottom: 1px solid #f1f5f9;
  }

  &__title {
    margin: 0;
    font-size: 1.15rem;
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

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
