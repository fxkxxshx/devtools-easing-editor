<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  width: number;
  height: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  thumbnail?: boolean;
}>();

// cssの左上が(0, 1)・svgの左上が(0,0)なので、座標を変換
const svgX1 = computed(() => props.x1 * props.width);
const svgY1 = computed(() => (1 - props.y1) * props.height);
const svgX2 = computed(() => props.x2 * props.width);
const svgY2 = computed(() => (1 - props.y2) * props.height);
</script>

<template>
  <svg
    :width="props.width"
    :height="props.height"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- 背景の直線 -->
    <path
      v-show="!thumbnail"
      :d="`M 0 ${props.height} L ${props.width} 0`"
      stroke="#777777"
      stroke-width="2"
    />
    <!-- ベジェ曲線 -->
    <path
      :d="`M 0 ${props.height} C ${svgX1} ${svgY1}, ${svgX2} ${svgY2}, ${props.width} 0`"
      :stroke-width="thumbnail ? 2 : 3"
      fill="transparent"
      stroke="#E3E2E2"
      stroke-linecap="round"
    />
    <!-- 始点コントローラー -->
    <path
      :d="`M 0 ${props.height} L ${svgX1} ${svgY1}`"
      :stroke="thumbnail ? '#919191' : '#D090FF'"
      :stroke-width="thumbnail ? 1 : 2"
    />
    <circle
      :cx="svgX1"
      :cy="svgY1"
      :r="thumbnail ? 2 : 7"
      :fill="thumbnail ? '#919191' : '#D090FF'"
    />
    <!-- 終点コントローラー -->
    <path
      :d="`M ${props.width} 0 L ${svgX2} ${svgY2}`"
      :stroke="thumbnail ? '#919191' : '#D090FF'"
      :stroke-width="thumbnail ? 1 : 2"
    />
    <circle
      :cx="svgX2"
      :cy="svgY2"
      :r="thumbnail ? 2 : 7"
      :fill="thumbnail ? '#919191' : '#D090FF'"
    />
  </svg>
</template>

<style scoped>
svg {
  overflow: visible;
}

circle {
  cursor: grab;
}
</style>
