<script setup lang="ts">
import { easingFunctions } from '@/data/easingFunctions';
import { useCategoryStore } from '@/stores/category';
import { usePresetStore } from '@/stores/preset';
import { storeToRefs } from 'pinia';

const categoryStore = useCategoryStore();
const presetStore = usePresetStore();
const { category } = storeToRefs(categoryStore);
const { preset } = storeToRefs(presetStore);
const { setPresetPrev, setPresetNext } = presetStore;
</script>

<template>
  <div class="preset-switcher">
    <button
      @click="setPresetPrev(category)"
      class="prev"
    ></button>
    <p class="name">
      {{ easingFunctions[category][preset[category]].name }}
    </p>
    <button
      @click="setPresetNext(category)"
      class="next"
    ></button>
  </div>
</template>

<style scoped>
.preset-switcher {
  align-items: center;
  display: flex;
  margin-top: 18px;
  padding-left: 4px;
  padding-right: 6px;
}

.name {
  flex-grow: 1;
  text-align: center;
}

.prev,
.next {
  display: grid;
  height: 15px;
  place-items: center;
  width: 15px;
}

.prev::before,
.next::before {
  border-right: 2px solid #c7c6c6;
  border-top: 2px solid #c7c6c6;
  content: '';
  display: block;
  height: 6px;
  margin-top: 1px;
  width: 6px;
}

.prev::before {
  transform: rotate(225deg);
}

.next::before {
  transform: rotate(45deg);
}
</style>
