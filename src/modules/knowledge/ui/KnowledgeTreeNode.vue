<script setup lang="ts">
import { ref, computed } from 'vue'
import { FileText, CheckCircle2, ChevronRight, ChevronDown } from 'lucide-vue-next'
import type { TreeNodeUIModel } from '../adapters/knowledge.adapter'

interface Props {
  node: TreeNodeUIModel
  selectedNodeId?: string
}

const props = withDefaults(defineProps<Props>(), {
  selectedNodeId: ''
})

const emit = defineEmits<{
  (e: 'selectNode', node: TreeNodeUIModel): void
}>()

const isExpanded = ref(props.node.level === 1)
const isFolder = computed(() => props.node.children && props.node.children.length > 0)
const isSelected = computed(() => props.selectedNodeId === props.node.id)
// A branch can be force-opened from outside (e.g. to reveal a search match)
// via node.isExpanded, without touching the user's own manual toggle state.
const showChildren = computed(() => isFolder.value && (isExpanded.value || !!props.node.isExpanded))

function toggleExpand(e: MouseEvent): void {
  e.stopPropagation()
  if (isFolder.value) {
    isExpanded.value = !isExpanded.value
  }
}

function handleNodeClick(): void {
  emit('selectNode', props.node)
}
</script>

<template>
  <div class="tree-node" :class="{ 'tree-node--selected': isSelected }">
    <div
      class="tree-node__row"
      :style="{ paddingLeft: `${Math.min((props.node.level - 1) * 8, 80)}px` }"
      @click="handleNodeClick"
    >
      <div class="tree-node__content">
        <!-- Toggle button or spacer -->
        <button
          v-if="isFolder"
          type="button"
          class="tree-node__toggle-btn"
          @click="toggleExpand"
        >
          <ChevronDown v-if="showChildren" class="icon-sm" />
          <ChevronRight v-else class="icon-sm" />
        </button>
        <div v-else class="tree-node__toggle-spacer" />

        <!-- Icon (Simplified) -->
        <div class="tree-node__icon-wrap" v-if="props.node.isCompleted || !isFolder">
          <CheckCircle2 v-if="props.node.isCompleted" class="icon-success" />
          <FileText v-else class="icon-file" />
        </div>

        <!-- Text content -->
        <div class="tree-node__text-wrap">
          <span class="tree-node__title">{{ props.node.title }}</span>
        </div>

        <!-- Children count badge -->
        <span v-if="props.node.childrenCount > 0" class="tree-node__badge">
          {{ props.node.childrenCount }}
        </span>
      </div>
    </div>

    <!-- Recursive children with transition -->
    <Transition name="tree-slide">
      <div
        v-if="showChildren"
        class="tree-node__children"
      >
        <KnowledgeTreeNode
          v-for="child in props.node.children"
          :key="child.id"
          :node="child"
          :selected-node-id="props.selectedNodeId"
          @select-node="(n) => emit('selectNode', n)"
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.tree-node {
  display: flex;
  flex-direction: column;

  &__row {
    position: relative;
    border-radius: 8px;
    margin-bottom: 1px;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
    background: transparent;

    &:hover {
      background: rgba(99, 102, 241, 0.04);
      transform: translateX(4px);
    }
  }

  &--selected > &__row {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
    box-shadow: inset 3px 0 0 #6366f1;
    transform: translateX(4px);

    .tree-node__title {
      color: #4338ca;
      font-weight: 600;
    }
    
    .tree-node__code {
      color: #6366f1;
      font-weight: 700;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.2rem 0.4rem 0.2rem 0.1rem;
    min-height: 28px;
  }

  &__toggle-btn {
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    color: #94a3b8;
    transition: all 0.2s ease;

    &:hover {
      background: #e2e8f0;
      color: #475569;
    }

    .icon-sm {
      width: 18px;
      height: 18px;
    }
  }

  &__toggle-spacer {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  &__icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;

    .icon-success {
      width: 14px;
      height: 14px;
      color: #10b981;
    }
    .icon-folder {
      width: 18px;
      height: 18px;
      color: #6366f1;
      fill: rgba(99, 102, 241, 0.15);
    }
    .icon-file {
      width: 14px;
      height: 14px;
      color: #94a3b8;
    }
  }

  &__text-wrap {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex: 1;
    overflow: hidden;
  }

  &__code {
    font-size: 0.75rem;
    color: #cbd5e1;
    font-family: 'Fira Code', 'Courier New', monospace;
    flex-shrink: 0;
    font-weight: 600;
  }

  &__title {
    font-size: 0.85rem;
    color: #334155;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s ease;
  }

  &__badge {
    font-size: 0.6875rem;
    color: #64748b;
    background: #f1f5f9;
    padding: 2px 8px;
    border-radius: 12px;
    font-weight: 700;
    flex-shrink: 0;
  }

  &__children {
    position: relative;
    
    /* Guide line for deeper levels */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 12px;
      left: 12px;
      width: 2px;
      background: #f1f5f9;
      border-radius: 2px;
      z-index: -1;
    }
  }
}

/* Tree Slide Animation */
.tree-slide-enter-active,
.tree-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
  transform-origin: top;
}
.tree-slide-enter-from,
.tree-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px) scaleY(0.98);
}
</style>
