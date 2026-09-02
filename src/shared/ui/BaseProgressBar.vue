<script setup lang="ts">
interface Props {
  value: number // 0 - 100
  height?: number
  color?: string
  backgroundColor?: string
  showLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  height: 6,
  color: '#6366f1',
  backgroundColor: '#e2e8f0',
  showLabel: false
})
</script>

<template>
  <div class="base-progress">
    <div
      class="base-progress__track"
      :style="{ height: `${props.height}px`, backgroundColor: props.backgroundColor }"
    >
      <div
        class="base-progress__bar"
        :style="{
          width: `${Math.min(100, Math.max(0, props.value))}%`,
          backgroundColor: props.color
        }"
      />
    </div>
    <span v-if="props.showLabel" class="base-progress__label">{{ Math.round(props.value) }}%</span>
  </div>
</template>

<style scoped lang="scss">
.base-progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;

  &__track {
    flex: 1;
    border-radius: 9999px;
    overflow: hidden;
    position: relative;
  }

  &__bar {
    height: 100%;
    border-radius: 9999px;
    transition: width 0.3s ease-out;
  }

  &__label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #64748b;
  }
}
</style>
