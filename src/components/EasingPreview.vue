<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

import { easingFunctions } from '@/data/easingFunctions';
import { useCategoryStore } from '@/stores/category';
import { useControllerStore } from '@/stores/controller';
import { useIsMovingStore } from '@/stores/isMoving';
import { usePresetStore } from '@/stores/preset';
import { storeToRefs } from 'pinia';

const categoryStore = useCategoryStore();
const presetStore = usePresetStore();
const controllerStore = useControllerStore();
const isMovingStore = useIsMovingStore();
const { category } = storeToRefs(categoryStore);
const { preset } = storeToRefs(presetStore);
const { controller } = storeToRefs(controllerStore);
const { isMoving } = storeToRefs(isMovingStore);

const easingPreview = ref<HTMLElement | null>(null);
const mainCircle = ref<HTMLElement | null>(null);
const afterimageCircles = ref<HTMLElement[] | null>(null);
const easingPreviewWidth = ref<number>(0);
const animationKey = ref(0);

const x1 = computed(() =>
  !isMoving.value
    ? easingFunctions[category.value][preset.value[category.value]].x1
    : controller.value[0][0]
);
const y1 = computed(() =>
  !isMoving.value
    ? easingFunctions[category.value][preset.value[category.value]].y1
    : controller.value[0][1]
);
const x2 = computed(() =>
  !isMoving.value
    ? easingFunctions[category.value][preset.value[category.value]].x2
    : controller.value[1][0]
);
const y2 = computed(() =>
  !isMoving.value
    ? easingFunctions[category.value][preset.value[category.value]].y2
    : controller.value[1][1]
);

const renderingAfterimageCircles = () => {
  if (easingPreview.value && afterimageCircles.value) {
    const currentAnimationKey = animationKey.value;
    const length = afterimageCircles.value.length;
    const easingPreviewPosition = easingPreview.value.getBoundingClientRect().left;
    const interval = 1500 / (length - 1);
    let lastTime = 0;
    let frameCount = 0;

    const animateCircle = (time: number) => {
      if (mainCircle.value && afterimageCircles.value) {
        if (time - lastTime >= interval && length > frameCount) {
          lastTime = time;

          const mainCirclePosition =
            mainCircle.value?.getBoundingClientRect().left - easingPreviewPosition;
          const circle = afterimageCircles.value[frameCount];
          circle.style.left = `${mainCirclePosition}px`;
          circle.style.display = 'block';

          frameCount++;
        }
      }

      const req = requestAnimationFrame(animateCircle);

      if (currentAnimationKey !== animationKey.value) {
        cancelAnimationFrame(req);
      }
    };

    afterimageCircles.value.forEach((circle) => {
      circle.removeAttribute('style');
    });

    requestAnimationFrame(animateCircle);
  }
};

// const renderingAfterimageCircles = () => {
//   if (easingPreview.value && afterimageCircles.value) {
//     const length = afterimageCircles.value.length;
//     const easingPreviewPosition = easingPreview.value?.getBoundingClientRect().left;

//     afterimageCircles.value.forEach((circle, index) => {
//       circle.removeAttribute('style');

//       setTimeout(
//         function () {
//           if (mainCircle.value) {
//             const mainCirclePosition =
//               mainCircle.value?.getBoundingClientRect().left - easingPreviewPosition;
//             circle.style.left = `${mainCirclePosition}px`;
//             circle.style.display = 'block';
//           }
//         },
//         (1500 / (length - 1)) * index
//       );
//     });
//   }
// };

watch([x1, y1, x2, y2], () => {
  animationKey.value++;
  renderingAfterimageCircles();
});

// watch([controller], () => {
//   if (isMoving) {
//     x1 = controller.value[0][0]
//   }
// })

onMounted(() => {
  if (easingPreview.value) {
    easingPreviewWidth.value = easingPreview.value.offsetWidth;
  }

  renderingAfterimageCircles();
});
</script>

<template>
  <div
    ref="easingPreview"
    class="easing-preview"
  >
    <div
      :key="animationKey"
      ref="mainCircle"
      class="main-circle"
    ></div>
    <div
      v-for="n in 21"
      :key="n"
      ref="afterimageCircles"
      class="afterimage-circle"
    ></div>
  </div>
</template>

<style scoped>
.easing-preview {
  position: relative;
  width: 100%;
}

.main-circle {
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-name: move-circle;
  animation-timing-function: v-bind('"cubic-bezier(" + x1 + "," + y1 + "," + x2 + "," + y2 + " )"');
  background-color: #d090ff;
  border-radius: 50%;
  height: 20px;
  width: 20px;
}

.afterimage-circle {
  background-color: #d090ff;
  border-radius: 50%;
  display: none;
  height: 20px;
  left: 0;
  opacity: 0.1;
  position: absolute;
  top: 0;
  width: 20px;
}

@keyframes move-circle {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(
      calc(v-bind('easingPreviewWidth ? easingPreviewWidth + "px" : "240px"') - 100%)
    );
    visibility: hidden;
  }
}
</style>
