<script setup lang="ts">
import { easingFunctions } from '@/data/easingFunctions';
import { useCategoryStore } from '@/stores/category';
import { useIsMovingStore } from '@/stores/isMoving';
import type { easingFunctionsKeyType } from '@/types/easingFunctions';
import { storeToRefs } from 'pinia';
import CreateLine from './CreateLine.vue';

const categoryStore = useCategoryStore();
const isMovingStore = useIsMovingStore();
const { category } = storeToRefs(categoryStore);
const { setCategory } = categoryStore;
const { setIsMoving } = isMovingStore;

const onClick = (easingFunctionKey: easingFunctionsKeyType) => {
  setCategory(easingFunctionKey);
  setIsMoving(false);
};
</script>

<template>
  <div>
    <button
      v-for="(easingFunctionArray, easingFunctionKey) in easingFunctions"
      :key="easingFunctionKey"
      :style="easingFunctionKey === category ? 'background-color: #3f484a;' : ''"
      @click="onClick(easingFunctionKey)"
    >
      <CreateLine
        :width="36"
        :height="36"
        :x1="easingFunctionArray[0].x1"
        :y1="easingFunctionArray[0].y1"
        :x2="easingFunctionArray[0].x2"
        :y2="easingFunctionArray[0].y2"
        :thumbnail="true"
      />
    </button>
  </div>
</template>

<style scoped>
button {
  border-radius: 4px;
  display: grid;
  height: 50px;
  place-items: center;
  width: 50px;
}

button + button {
  margin-top: 16px;
}

button:hover {
  background-color: #3f484a;
}
</style>
