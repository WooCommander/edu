<script setup lang="ts">
import { onMounted } from 'vue'
import { BaseBadge, CodeBlock } from '@/shared/ui'
import { knowledgeService } from '../services/knowledge.service'
import { knowledgeState } from '../state/knowledge.state'

const emit = defineEmits<{
  (e: 'back'): void
  (e: 'openToc'): void
  (e: 'openNotes'): void
  (e: 'openZen'): void
  (e: 'share'): void
  (e: 'nextPage'): void
  (e: 'prevPage'): void
}>()

onMounted(async () => {
  if (!knowledgeState.currentArticle) {
    await knowledgeService.loadArticle()
  }
})
</script>

<template>
  <div v-if="knowledgeState.currentArticle" class="reader-view">
    <!-- Top Navigation Bar -->
    <nav class="reader-view__nav">
      <div class="nav-left">
        <button type="button" class="nav-btn" @click="emit('back')">‹</button>
        <span class="nav-title">
          {{ knowledgeState.currentArticle.code }} {{ knowledgeState.currentArticle.title }}
        </span>
      </div>

      <div class="nav-actions">
        <button
          type="button"
          class="icon-btn"
          :class="{ 'icon-btn--active': knowledgeState.currentArticle.isFavorite }"
          title="В избранное"
          @click="knowledgeService.toggleFavorite()"
        >
          {{ knowledgeState.currentArticle.isFavorite ? '★ В избранном' : '☆ В избранное' }}
        </button>

        <button
          type="button"
          class="icon-btn"
          title="Заметки к статье"
          @click="emit('openNotes')"
        >
          📝 Заметки (3)
        </button>

        <button
          type="button"
          class="icon-btn"
          title="Содержание"
          @click="emit('openToc')"
        >
          📑 Оглавление
        </button>

        <button
          type="button"
          class="icon-btn"
          title="Режим чтения"
          @click="emit('openZen')"
        >
          👁️ Zen-режим
        </button>
      </div>
    </nav>

    <!-- Main Article Body -->
    <article class="reader-view__content">
      <div class="article-header-box">
        <div class="category-breadcrumbs">
          {{ knowledgeState.currentArticle.categoryPathText }}
        </div>
        <!-- Title -->
        <h1 class="article-title">{{ knowledgeState.currentArticle.title }}</h1>

        <!-- Metadata Badges -->
        <div class="badges-row">
          <BaseBadge
            v-for="tag in knowledgeState.currentArticle.tags"
            :key="tag"
            variant="primary"
            size="sm"
          >
            {{ tag }}
          </BaseBadge>
          <BaseBadge variant="warning" size="sm">
            {{ knowledgeState.currentArticle.difficultyText }}
          </BaseBadge>
          <BaseBadge variant="secondary" size="sm">
            {{ knowledgeState.currentArticle.readTimeText }}
          </BaseBadge>
        </div>
      </div>

      <!-- Render Article Content Blocks -->
      <div class="blocks-container">
        <template v-for="block in knowledgeState.currentArticle.blocks" :key="block.id">
          <!-- Heading -->
          <h2 v-if="block.type === 'heading'" class="article-heading">
            {{ block.content }}
          </h2>

          <!-- Paragraph -->
          <p v-else-if="block.type === 'paragraph'" class="article-p">
            {{ block.content }}
          </p>

          <!-- Code Block -->
          <CodeBlock
            v-else-if="block.type === 'code'"
            :code="block.content"
            :language="block.language || 'typescript'"
            title="Пример (Vue 3)"
          />

          <!-- Callout box -->
          <div
            v-else-if="block.type === 'callout'"
            class="callout-box"
            :class="`callout-box--${block.calloutType || 'warning'}`"
          >
            <span class="callout-icon">💡</span>
            <div class="callout-text">{{ block.content }}</div>
          </div>
        </template>
      </div>
    </article>

    <!-- Bottom Article Footer -->
    <footer class="reader-view__footer">
      <div class="reactions-box">
        <button type="button" class="react-btn" @click="knowledgeService.toggleLike()">
          👍 Полезно {{ knowledgeState.currentArticle.likesCount }}
        </button>
        <button type="button" class="react-btn" @click="emit('openNotes')">
          💬 Заметки {{ knowledgeState.currentArticle.commentsCount }}
        </button>
      </div>

      <div class="pagination-box">
        <button type="button" class="page-nav-btn" @click="emit('prevPage')">‹ Предыдущая</button>
        <span class="page-text">{{ knowledgeState.currentArticle.progressText }}</span>
        <button type="button" class="page-nav-btn" @click="emit('nextPage')">Следующая ›</button>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.reader-view {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: #ffffff;
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  border-left: 1px solid #f1f5f9;
  border-right: 1px solid #f1f5f9;

  &__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.85rem 1.5rem;
    border-bottom: 1px solid #f1f5f9;
    position: sticky;
    top: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    z-index: 20;

    .nav-left {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .nav-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #0f172a;
      cursor: pointer;
      line-height: 1;
    }

    .nav-title {
      font-size: 0.9375rem;
      font-weight: 700;
      color: #0f172a;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .icon-btn {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      font-size: 0.8125rem;
      font-weight: 500;
      cursor: pointer;
      padding: 0.4rem 0.75rem;
      border-radius: 8px;
      color: #475569;
      transition: all 0.15s ease;

      &:hover {
        background: #f1f5f9;
        color: #0f172a;
      }

      &--active {
        background: #fef9c3;
        border-color: #fde047;
        color: #854d0e;
      }
    }
  }

  &__content {
    padding: 2rem 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.75rem;

    @media (max-width: 640px) {
      padding: 1.25rem;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 2rem;
    border-top: 1px solid #f1f5f9;
    background: #ffffff;
    margin-top: auto;
  }
}

.article-header-box {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .category-breadcrumbs {
    font-size: 0.8125rem;
    color: #6366f1;
    font-weight: 600;
  }

  .article-title {
    margin: 0;
    font-size: 2.25rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.03em;
    line-height: 1.2;
  }
}

.badges-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.blocks-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.article-heading {
  margin: 1.25rem 0 0.25rem;
  font-size: 1.45rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.article-p {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.75;
  color: #334155;
}

.callout-box {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.15rem 1.25rem;
  border-radius: 14px;
  background: #fffbeb;
  border: 1px solid #fef3c7;
  color: #92400e;

  .callout-icon {
    font-size: 1.4rem;
    line-height: 1;
  }

  .callout-text {
    font-size: 0.95rem;
    line-height: 1.6;
  }
}

.reactions-box {
  display: flex;
  gap: 0.75rem;

  .react-btn {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 0.45rem 0.85rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    color: #475569;

    &:hover {
      background: #f1f5f9;
      color: #0f172a;
    }
  }
}

.pagination-box {
  display: flex;
  align-items: center;
  gap: 0.85rem;

  .page-nav-btn {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.8125rem;
    font-weight: 500;
    color: #475569;
    cursor: pointer;
    padding: 0.35rem 0.75rem;

    &:hover {
      color: #0f172a;
      background: #f1f5f9;
    }
  }

  .page-text {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
  }
}
</style>
