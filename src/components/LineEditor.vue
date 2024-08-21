<script setup lang="ts">
import CreateLine from '@/components/CreateLine.vue';
import { height, width } from '@/data/constants';
import { easingFunctions } from '@/data/easingFunctions';
import { useCategoryStore } from '@/stores/category';
import { useIsMovingStore } from '@/stores/isMoving';
import { usePresetStore } from '@/stores/preset';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const categoryStore = useCategoryStore();
const presetStore = usePresetStore();
const isMovingStore = useIsMovingStore();
const { category } = storeToRefs(categoryStore);
const { preset } = storeToRefs(presetStore);
const { isMoving } = storeToRefs(isMovingStore);

const reRenderingKey = ref(0);

watch([isMoving], () => {
  reRenderingKey.value++;
});
</script>

<template>
  <div
    class="line-editor"
    :key="reRenderingKey"
  >
    <div
      v-for="(easingFunctionArray, easingFunctionKey) in easingFunctions"
      v-show="category === easingFunctionKey"
      :key="easingFunctionKey"
    >
      <CreateLine
        v-for="(easingFunctionPreset, easingFunctionPresetIndex) in easingFunctionArray"
        v-show="preset[easingFunctionKey] === easingFunctionPresetIndex"
        :key="easingFunctionPreset.name"
        :width="width"
        :height="height"
        :x1="easingFunctionPreset.x1"
        :y1="easingFunctionPreset.y1"
        :x2="easingFunctionPreset.x2"
        :y2="easingFunctionPreset.y2"
      />
    </div>
  </div>
</template>

<style scoped>
.line-editor {
  padding: 48px 0 0 38px;
  width: 100%;
}
</style>
