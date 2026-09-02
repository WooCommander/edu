<script setup lang="ts">
import { ref } from 'vue'
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

const isExpanded = ref(props.node.isExpanded ?? true)

function toggleExpand(e: MouseEvent): void {
  e.stopPropagation()
  if (props.node.children && props.node.children.length > 0) {
    isExpanded.value = !isExpanded.value
  }
}

function handleNodeClick(): void {
  emit('selectNode', props.node)
}
</script>

<template>
  <div class="tree-node" :class="{ 'tree-node--selected': props.selectedNodeId === props.node.id }">
    <div
      class="tree-node__row"
      :style="{ paddingLeft: `${Math.min(props.node.level * 14, 120)}px` }"
      @click="handleNodeClick"
    >
      <!-- Expand arrow or leaf indicator -->
      <button
        v-if="props.node.children && props.node.children.length > 0"
        type="button"
        class="tree-node__toggle-btn"
        :class="{ 'tree-node__toggle-btn--open': isExpanded }"
        @click="toggleExpand"
      >
        ▾
      </button>
      <span v-else class="tree-node__leaf-bullet">
        <span v-if="props.node.isCompleted" class="tree-node__check">✓</span>
        <span v-else class="tree-node__dot" />
      </span>

      <!-- Code prefix like 1.1.3.1.2 -->
      <span class="tree-node__code">{{ props.node.code }}</span>

      <!-- Title -->
      <span class="tree-node__title">{{ props.node.title }}</span>

      <!-- Optional count -->
      <span v-if="props.node.childrenCount > 0" class="tree-node__count">
        {{ props.node.childrenCount }}
      </span>
    </div>

    <!-- Recursive children -->
    <div
      v-if="props.node.children && props.node.children.length > 0 && isExpanded"
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
  </div>
</template>

<style scoped lang="scss">
.tree-node {
  display: flex;
  flex-direction: column;

  &__row {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding-top: 0.45rem;
    padding-bottom: 0.45rem;
    padding-right: 0.75rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s ease;
    user-select: none;

    &:hover {
      background: #f1f5f9;
    }
  }

  &--selected > &__row {
    background: #e0e7ff;
    color: #4338ca;
    font-weight: 600;

    .tree-node__title {
      color: #4338ca;
    }

    .tree-node__code {
      color: #6366f1;
    }
  }

  &__toggle-btn {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    color: #64748b;
    transition: transform 0.2s ease;
    transform: rotate(-90deg);

    &--open {
      transform: rotate(0deg);
    }
  }

  &__leaf-bullet {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__check {
    color: #10b981;
    font-size: 0.8rem;
    font-weight: bold;
  }

  &__dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #cbd5e1;
  }

  &__code {
    font-size: 0.8125rem;
    color: #64748b;
    font-family: 'Fira Code', monospace;
  }

  &__title {
    font-size: 0.875rem;
    color: #1e293b;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__count {
    font-size: 0.7rem;
    color: #94a3b8;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 0 4px;
    border-radius: 6px;
  }

  &__children {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 10px;
      top: 0;
      bottom: 6px;
      width: 1px;
      background: #f1f5f9;
    }
  }
}
</style>
