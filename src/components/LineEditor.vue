<script setup lang="ts">
import CreateLine from '@/components/CreateLine.vue';
import { easingFunctions } from '@/data/easingFunctions';
import { useCategoryStore } from '@/stores/category';
import { usePresetStore } from '@/stores/preset';
import { storeToRefs } from 'pinia';

const categoryStore = useCategoryStore();
const presetStore = usePresetStore();
const { category } = storeToRefs(categoryStore);
const { preset } = storeToRefs(presetStore);
</script>

<template>
  <div class="line-editor">
    <div
      v-for="(easingFunctionArray, easingFunctionKey) in easingFunctions"
      v-show="category === easingFunctionKey"
      :key="easingFunctionKey"
    >
      <CreateLine
        v-for="(easingFunctionPreset, easingFunctionPresetIndex) in easingFunctionArray"
        v-show="preset[easingFunctionKey] === easingFunctionPresetIndex"
        :key="easingFunctionPreset.name"
        :width="136"
        :height="136"
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
