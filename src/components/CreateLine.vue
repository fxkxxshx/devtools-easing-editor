<script setup lang="ts">
import { useControllerStore } from '@/stores/controller';
import { useIsMovingStore } from '@/stores/isMoving';
import { ref } from 'vue';

const props = defineProps<{
  width: number;
  height: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  thumbnail?: boolean;
}>();

const isMovingStore = useIsMovingStore();
const controllerStore = useControllerStore();
const { setIsMoving } = isMovingStore;
const { setController } = controllerStore;

// cssの左上が(0, 1)・svgの左上が(0,0)なので、座標を変換
const svgX1 = ref(props.x1 * props.width);
const svgY1 = ref((1 - props.y1) * props.height);
const svgX2 = ref(props.x2 * props.width);
const svgY2 = ref((1 - props.y2) * props.height);

const circleStart = ref<HTMLElement | null>(null);
const circleEnd = ref<HTMLElement | null>(null);

const onPointerMoveStart = (event: PointerEvent) => {
  if (event.buttons && circleStart.value) {
    svgX1.value += event.movementX;
    svgY1.value += event.movementY;
    circleStart.value.setPointerCapture(event.pointerId);

    if (props.width < svgX1.value) {
      svgX1.value = props.width;
    }

    if (svgX1.value < 0) {
      svgX1.value = 0;
    }

    setIsMoving(true);
    setController(svgX1.value, svgY1.value, svgX2.value, svgY2.value);
  }
};

const onPointerMoveEnd = (event: PointerEvent) => {
  if (event.buttons && circleEnd.value) {
    svgX2.value += event.movementX;
    svgY2.value += event.movementY;
    circleEnd.value.setPointerCapture(event.pointerId);

    if (props.width < svgX2.value) {
      svgX2.value = props.width;
    }

    if (svgX2.value < 0) {
      svgX2.value = 0;
    }

    setIsMoving(true);
    setController(svgX1.value, svgY1.value, svgX2.value, svgY2.value);
  }
};

// onMounted(() => {
//   setController(svgX1.value, svgY1.value, svgX2.value, svgY2.value);
// });
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
      :pointer-events="thumbnail ? 'none' : 'auto'"
      ref="circleStart"
      @pointermove="onPointerMoveStart"
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
      :pointer-events="thumbnail ? 'none' : 'auto'"
      ref="circleEnd"
      @pointermove="onPointerMoveEnd"
    />
  </svg>
</template>

<style scoped>
svg {
  overflow: visible;
  position: relative;
  z-index: 100;
}

circle {
  cursor: grab;
}
</style>
