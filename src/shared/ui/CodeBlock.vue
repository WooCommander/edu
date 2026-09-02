<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  code: string
  language?: string
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: 'typescript',
  title: ''
})

const isCopied = ref(false)

async function copyCode(): Promise<void> {
  try {
    await navigator.clipboard.writeText(props.code)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch {
    // Fallback if clipboard API fails
  }
}
</script>

<template>
  <div class="code-block">
    <div class="code-block__header">
      <div class="code-block__title-box">
        <span class="code-block__dots">
          <span class="dot red" />
          <span class="dot yellow" />
          <span class="dot green" />
        </span>
        <span v-if="props.title" class="code-block__title">{{ props.title }}</span>
        <span v-else class="code-block__lang">{{ props.language }}</span>
      </div>

      <button
        type="button"
        class="code-block__copy-btn"
        :class="{ 'code-block__copy-btn--copied': isCopied }"
        @click="copyCode"
      >
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </button>
    </div>

    <div class="code-block__content">
      <pre><code>{{ props.code }}</code></pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
.code-block {
  background: #1e1e2e;
  border-radius: 14px;
  overflow: hidden;
  margin: 0.75rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #313244;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.85rem;
    background: #181825;
    border-bottom: 1px solid #313244;
  }

  &__title-box {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  &__dots {
    display: flex;
    gap: 4px;

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;

      &.red {
        background: #f38ba8;
      }
      &.yellow {
        background: #f9e2af;
      }
      &.green {
        background: #a6e3a1;
      }
    }
  }

  &__title,
  &__lang {
    font-size: 0.75rem;
    font-family: 'Fira Code', monospace;
    color: #cdd6f4;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  &__copy-btn {
    background: transparent;
    border: 1px solid #45475a;
    color: #a6adc8;
    border-radius: 6px;
    padding: 0.2rem 0.5rem;
    font-size: 0.7rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #313244;
      color: #cdd6f4;
    }

    &--copied {
      background: #a6e3a1;
      color: #11111b;
      border-color: #a6e3a1;
      font-weight: 600;
    }
  }

  &__content {
    padding: 0.85rem 1rem;
    overflow-x: auto;

    pre {
      margin: 0;
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.85rem;
      line-height: 1.5;
      color: #cdd6f4;
      white-space: pre;
    }
  }
}
</style>
