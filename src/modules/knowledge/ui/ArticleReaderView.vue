<script setup lang="ts">
import { onMounted } from 'vue'
import { appState } from '@/app/state/app-state'
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
  if (knowledgeState.currentArticle?.id !== appState.selectedArticleId) {
    await knowledgeService.loadArticle(appState.selectedArticleId)
  }
})
</script>

<template>
  <div v-if="knowledgeState.currentArticle" class="reader-view">
    <!-- Top Minimal Navigation Bar -->
    <nav class="reader-view__nav">
      <div class="nav-left">
        <button
          type="button"
          class="nav-back-btn"
          aria-label="Назад"
          @click="emit('back')"
        >
          ‹
        </button>
        <span class="nav-article-code">
          {{ knowledgeState.currentArticle.code }} {{ knowledgeState.currentArticle.title }}
        </span>
      </div>

      <!-- Compact Clean Action Icons (no bulky text blocks) -->
      <div class="nav-actions">
        <button
          type="button"
          class="icon-action-btn"
          :class="{ 'icon-action-btn--active': knowledgeState.currentArticle.isFavorite }"
          title="В избранное"
          @click="knowledgeService.toggleFavorite()"
        >
          {{ knowledgeState.currentArticle.isFavorite ? '★' : '☆' }}
        </button>

        <button
          type="button"
          class="icon-action-btn"
          title="Заметки к статье"
          @click="emit('openNotes')"
        >
          📝
        </button>

        <button
          type="button"
          class="icon-action-btn"
          title="Содержание статьи"
          @click="emit('openToc')"
        >
          📑
        </button>

        <button
          type="button"
          class="icon-action-btn"
          title="Режим чтения без отвлечений"
          @click="emit('openZen')"
        >
          Aa
        </button>
      </div>
    </nav>

    <!-- Main Article Body -->
    <article class="reader-view__content">
      <div class="article-header-box">
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

        <!-- Action Pills Under Title (Matching Screen 4) -->
        <div class="action-pills-row">
          <button
            type="button"
            class="action-pill"
            :class="{ 'action-pill--active': knowledgeState.currentArticle.isFavorite }"
            @click="knowledgeService.toggleFavorite()"
          >
            <span>{{ knowledgeState.currentArticle.isFavorite ? '★' : '☆' }}</span>
            <span>Избранное</span>
          </button>
          <button
            type="button"
            class="action-pill"
            @click="emit('openNotes')"
          >
            <span>✏️</span>
            <span>Заметка</span>
          </button>
          <button
            type="button"
            class="action-pill"
            @click="emit('share')"
          >
            <span>↗️</span>
            <span>Поделиться</span>
          </button>
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
            :language="block.language || 'text'"
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
          👍 {{ knowledgeState.currentArticle.likesCount }}
        </button>
        <button type="button" class="react-btn" @click="emit('openNotes')">
          💬 {{ knowledgeState.currentArticle.commentsCount }}
        </button>
      </div>

      <div class="pagination-box">
        <button type="button" class="page-nav-btn" @click="emit('prevPage')">‹</button>
        <span class="page-text">{{ knowledgeState.currentArticle.progressText }}</span>
        <button type="button" class="page-nav-btn" @click="emit('nextPage')">›</button>
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
  max-width: 820px;
  margin: 0 auto;

  &__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.25rem;
    border-bottom: 1px solid #f1f5f9;
    position: sticky;
    top: 0;
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(10px);
    z-index: 20;
    gap: 1rem;

    .nav-left {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      min-width: 0;
      flex: 1;
    }

    .nav-back-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #334155;
      cursor: pointer;
      line-height: 1;
      padding: 0.2rem 0.4rem;
      border-radius: 6px;
      transition: background 0.15s ease;

      &:hover {
        background: #f1f5f9;
        color: #0f172a;
      }
    }

    .nav-article-code {
      font-size: 0.875rem;
      font-weight: 600;
      color: #334155;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      flex-shrink: 0;
    }

    .icon-action-btn {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      font-size: 1rem;
      border-radius: 10px;
      color: #475569;
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover {
        background: #f1f5f9;
        border-color: #cbd5e1;
        color: #0f172a;
        transform: translateY(-1px);
      }

      &--active {
        background: #fef9c3;
        border-color: #fde047;
        color: #ca8a04;
      }
    }
  }

  &__content {
    padding: 1.75rem 2rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media (max-width: 640px) {
      padding: 1.25rem 1rem 2rem;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-top: 1px solid #f1f5f9;
    background: #ffffff;
    margin-top: auto;
  }
}

.article-header-box {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;

  .article-title {
    margin: 0;
    font-size: 2rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.025em;
    line-height: 1.25;

    @media (max-width: 640px) {
      font-size: 1.6rem;
    }
  }
}

.badges-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.action-pills-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.25rem;

  .action-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 0.35rem 0.85rem;
    border-radius: 999px;
    font-size: 0.8125rem;
    font-weight: 600;
    color: #475569;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: #f1f5f9;
      color: #0f172a;
      border-color: #cbd5e1;
    }

    &--active {
      background: #fef9c3;
      border-color: #fde047;
      color: #854d0e;
    }
  }
}

.blocks-container {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.article-heading {
  margin: 1rem 0 0.1rem;
  font-size: 1.35rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.015em;
}

.article-p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
  color: #334155;
}

.callout-box {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 1rem 1.15rem;
  border-radius: 12px;
  background: #fffbeb;
  border: 1px solid #fef3c7;
  color: #92400e;

  .callout-icon {
    font-size: 1.25rem;
    line-height: 1;
  }

  .callout-text {
    font-size: 0.925rem;
    line-height: 1.5;
  }
}

.reactions-box {
  display: flex;
  gap: 0.5rem;

  .react-btn {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.35rem 0.75rem;
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    color: #475569;
    transition: all 0.15s ease;

    &:hover {
      background: #f1f5f9;
      color: #0f172a;
    }
  }
}

.pagination-box {
  display: flex;
  align-items: center;
  gap: 0.6rem;

  .page-nav-btn {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    color: #475569;
    cursor: pointer;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;

    &:hover {
      color: #0f172a;
      background: #f1f5f9;
    }
  }

  .page-text {
    font-size: 0.8125rem;
    color: #64748b;
    font-weight: 600;
  }
}
</style>
