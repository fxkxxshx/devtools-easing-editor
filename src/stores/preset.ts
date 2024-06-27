import { easingFunctions } from '@/data/easingFunctions';
import type { easingFunctionsKeyType } from '@/types/easingFunctions';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePresetStore = defineStore('preset', () => {
  const preset = ref({
    linear: 0,
    easeIn: 0,
    easeInOut: 0,
    easeOut: 0,
  });

  const setPresetPrev = (key: easingFunctionsKeyType) => {
    if (preset.value[key] === 0) {
      preset.value[key] = easingFunctions[key].length - 1;
    } else {
      preset.value[key]--;
    }
  };

  const setPresetNext = (key: easingFunctionsKeyType) => {
    if (preset.value[key] === easingFunctions[key].length - 1) {
      preset.value[key] = 0;
    } else {
      preset.value[key]++;
    }
  };

  return { preset, setPresetPrev, setPresetNext };
});

// export default () => {
//   const $store = usePresetStore();
//   return { ...$store, ...storeToRefs($store) };
// };
