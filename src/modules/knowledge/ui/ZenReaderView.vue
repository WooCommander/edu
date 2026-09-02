<script setup lang="ts">
import { CodeBlock } from '@/shared/ui'
import { knowledgeService } from '../services/knowledge.service'
import { knowledgeState } from '../state/knowledge.state'

const emit = defineEmits<{
  (e: 'exit'): void
}>()

const fontSizeClasses = ['zen-text--normal', 'zen-text--large', 'zen-text--xl']
</script>

<template>
  <div
    v-if="knowledgeState.currentArticle"
    class="zen-view"
    :class="fontSizeClasses[knowledgeState.fontSizeLevel]"
  >
    <!-- Minimalist Header -->
    <header class="zen-header">
      <button type="button" class="zen-btn" title="Назад" @click="emit('exit')">
        ‹
      </button>

      <div class="zen-actions">
        <button
          type="button"
          class="zen-btn"
          title="Размер шрифта"
          @click="knowledgeService.cycleFontSize()"
        >
          Aa
        </button>
        <button type="button" class="zen-btn" title="Закрыть дзен" @click="emit('exit')">
          ✕
        </button>
      </div>
    </header>

    <!-- Zen Article Content -->
    <main class="zen-content">
      <h1 class="zen-title">watch</h1>

      <p class="zen-p">
        watch отслеживает конкретные источники данных и запускает колбэк при их изменении.
      </p>

      <CodeBlock
        code="import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newVal, oldVal) => {
  console.log('Изменилось:', oldVal, '->', newVal)
})"
        language="javascript"
      />

      <div class="zen-callout">
        <span class="zen-callout__icon">💡</span>
        <div class="zen-callout__body">
          <strong>Важно</strong>
          <p>По умолчанию watch вызывается только после первого изменения, а не сразу.</p>
        </div>
      </div>
    </main>

    <!-- Zen Footer with Progress Bar Line -->
    <footer class="zen-footer">
      <div class="zen-footer__nav">
        <button type="button" class="zen-nav-arrow">‹</button>
        <span class="zen-page-count">6 из 28</span>
        <button type="button" class="zen-nav-arrow">›</button>
      </div>
      <div class="zen-line-track">
        <div class="zen-line-bar" style="width: 25%" />
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.zen-view {
  min-height: 100vh;
  background: #ffffff;
  color: #1e293b;
  display: flex;
  flex-direction: column;
  padding: 1rem 1.25rem 2rem;
  transition: font-size 0.2s ease;
}

.zen-text--normal {
  font-size: 1rem;
}

.zen-text--large {
  font-size: 1.15rem;
}

.zen-text--xl {
  font-size: 1.3rem;
}

.zen-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;

  .zen-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .zen-btn {
    background: none;
    border: none;
    font-size: 1.25rem;
    color: #475569;
    cursor: pointer;
    padding: 0.4rem;
    border-radius: 8px;

    &:hover {
      background: #f1f5f9;
      color: #0f172a;
    }
  }
}

.zen-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 680px;
  margin: 0 auto;
  width: 100%;
}

.zen-title {
  font-size: 2em;
  font-weight: 800;
  margin: 0.5rem 0 0;
  color: #0f172a;
}

.zen-p {
  line-height: 1.7;
  color: #334155;
  margin: 0;
}

.zen-callout {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: #fffbeb;
  border: 1px solid #fef3c7;
  border-radius: 12px;
  padding: 1rem;

  &__icon {
    font-size: 1.25rem;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    strong {
      color: #92400e;
      font-size: 0.95em;
    }

    p {
      margin: 0;
      color: #78350f;
      font-size: 0.9em;
      line-height: 1.5;
    }
  }
}

.zen-footer {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 2rem;

  &__nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .zen-nav-arrow {
    background: none;
    border: none;
    font-size: 1.25rem;
    color: #64748b;
    cursor: pointer;

    &:hover {
      color: #0f172a;
    }
  }

  .zen-page-count {
    font-size: 0.85rem;
    color: #64748b;
  }

  .zen-line-track {
    width: 100%;
    height: 3px;
    background: #e2e8f0;
    border-radius: 999px;
    overflow: hidden;
  }

  .zen-line-bar {
    height: 100%;
    background: #6366f1;
  }
}
</style>
