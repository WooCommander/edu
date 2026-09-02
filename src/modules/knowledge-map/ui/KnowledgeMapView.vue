<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { knowledgeMapService } from '../services/knowledge-map.service'
import { knowledgeMapState } from '../state/knowledge-map.state'
import type { GraphNodeUIModel } from '../adapters/knowledge-map.adapter'

const emit = defineEmits<{
  (e: 'openArticle', articleId: string): void
}>()

onMounted(async () => {
  if (!knowledgeMapState.graph) {
    await knowledgeMapService.loadGraph()
  }
})

// Calculate radial positions for graph nodes in a 360x420 viewBox
const positionedNodes = computed(() => {
  if (!knowledgeMapState.graph) return []
  const centerX = 180
  const centerY = 210
  const radius = 120

  const centerNode = knowledgeMapState.graph.nodes.find(n => n.isCenter)
  const outerNodes = knowledgeMapState.graph.nodes.filter(n => !n.isCenter)

  const result: (GraphNodeUIModel & { x: number; y: number })[] = []

  if (centerNode) {
    result.push({
      ...centerNode,
      x: centerX,
      y: centerY
    })
  }

  const angleStep = (2 * Math.PI) / (outerNodes.length || 1)

  outerNodes.forEach((node, index) => {
    // start with offset angle -PI / 2 (top)
    const angle = index * angleStep - Math.PI / 2
    result.push({
      ...node,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    })
  })

  return result
})

const graphEdges = computed(() => {
  const nodesMap = new Map<string, { x: number; y: number }>()
  positionedNodes.value.forEach(n => {
    nodesMap.set(n.id, { x: n.x, y: n.y })
  })

  if (!knowledgeMapState.graph) return []

  return knowledgeMapState.graph.edges.map(edge => {
    const s = nodesMap.get(edge.sourceId) || { x: 180, y: 210 }
    const t = nodesMap.get(edge.targetId) || { x: 180, y: 210 }
    return {
      x1: s.x,
      y1: s.y,
      x2: t.x,
      y2: t.y
    }
  })
})

function handleNodeClick(node: GraphNodeUIModel): void {
  knowledgeMapService.selectNode(node.id)
  emit('openArticle', 'article_watch')
}
</script>

<template>
  <div class="map-view">
    <!-- Header -->
    <header class="map-header">
      <h1 class="map-title">Карта знаний</h1>

      <div class="map-actions">
        <button type="button" class="action-btn" title="Поиск">🔍</button>
        <button type="button" class="action-btn" title="Фильтры">☰</button>
      </div>
    </header>

    <!-- Interactive Graph Container -->
    <div class="graph-canvas-wrap">
      <svg
        class="graph-svg"
        viewBox="0 0 360 420"
        :style="{ transform: `scale(${knowledgeMapState.zoomLevel})` }"
      >
        <!-- Lines / Edges -->
        <g class="edges-group">
          <line
            v-for="(edge, idx) in graphEdges"
            :key="idx"
            :x1="edge.x1"
            :y1="edge.y1"
            :x2="edge.x2"
            :y2="edge.y2"
            stroke="#cbd5e1"
            stroke-width="1.5"
            stroke-dasharray="3,3"
          />
        </g>

        <!-- Nodes -->
        <g class="nodes-group">
          <g
            v-for="node in positionedNodes"
            :key="node.id"
            class="node-group"
            :class="{ 'node-group--center': node.isCenter }"
            :transform="`translate(${node.x}, ${node.y})`"
            @click="handleNodeClick(node)"
          >
            <!-- Center Node (filled purple circle) -->
            <template v-if="node.isCenter">
              <circle r="44" fill="#6366f1" filter="drop-shadow(0 4px 8px rgba(99, 102, 241, 0.4))" />
              <text
                text-anchor="middle"
                dy="-4"
                fill="#ffffff"
                font-size="11"
                font-weight="700"
              >
                Реактивность
              </text>
              <text
                text-anchor="middle"
                dy="12"
                fill="#ffffff"
                font-size="11"
                font-weight="700"
              >
                Vue 3
              </text>
            </template>

            <!-- Radial pill / circle node -->
            <template v-else>
              <rect
                x="-42"
                y="-18"
                width="84"
                height="36"
                rx="18"
                fill="#ffffff"
                stroke="#e2e8f0"
                stroke-width="1.5"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.05))"
              />
              <text
                text-anchor="middle"
                dy="4"
                fill="#334155"
                font-size="9.5"
                font-weight="600"
              >
                {{ node.label }}
              </text>
            </template>
          </g>
        </g>
      </svg>
    </div>

    <!-- Controls: zoom & add -->
    <div class="map-controls">
      <div class="zoom-box">
        <button type="button" class="zoom-btn" @click="knowledgeMapService.zoomIn()">+</button>
        <button type="button" class="zoom-btn" @click="knowledgeMapService.zoomOut()">−</button>
      </div>

      <button type="button" class="fab-btn" title="Добавить узел">
        +
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.map-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f8fafc;
  padding-bottom: 5.5rem;
  position: relative;
  overflow: hidden;
}

.map-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: #ffffff;
  border-bottom: 1px solid #f1f5f9;
  z-index: 10;

  .map-title {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 800;
    color: #0f172a;
  }

  .map-actions {
    display: flex;
    gap: 0.5rem;

    .action-btn {
      background: #f1f5f9;
      border: none;
      width: 34px;
      height: 34px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.95rem;

      &:hover {
        background: #e2e8f0;
      }
    }
  }
}

.graph-canvas-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.graph-svg {
  width: 100%;
  height: 100%;
  max-width: 480px;
  max-height: 520px;
  transition: transform 0.2s ease;
  user-select: none;
}

.node-group {
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.06);
  }
}

.map-controls {
  position: absolute;
  bottom: 6rem;
  left: 1.25rem;
  right: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  pointer-events: none;

  .zoom-box {
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    .zoom-btn {
      background: none;
      border: none;
      width: 36px;
      height: 36px;
      font-size: 1.2rem;
      color: #334155;
      cursor: pointer;

      &:first-child {
        border-bottom: 1px solid #f1f5f9;
      }

      &:hover {
        background: #f1f5f9;
      }
    }
  }

  .fab-btn {
    pointer-events: auto;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #6366f1;
    color: #ffffff;
    border: none;
    font-size: 1.75rem;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease;

    &:hover {
      transform: scale(1.08);
      background: #4f46e5;
    }
  }
}
</style>
