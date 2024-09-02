<script setup lang="ts">
import LineEditor from '@/components/LineEditor.vue';
import EasingPreview from './components/EasingPreview.vue';
import PresetSwitcher from './components/PresetSwitcher.vue';
import SelectCategory from './components/SelectCategory.vue';
</script>

<template>
  <div class="wrapper">
    <EasingPreview />
    <div class="block">
      <SelectCategory />
      <LineEditor />
    </div>
    <PresetSwitcher />
  </div>
</template>

<style scoped>
.wrapper {
  background-color: #252626;
  border-radius: 6px;
  height: 350px;
  padding: 15px;
  width: 270px;
}

.block {
  background-image: radial-gradient(#464747 1px, transparent 1px);
  background-position: -5px 6px;
  background-size: 17px 17px;
  display: flex;
  margin-top: 20px;
}
</style>
