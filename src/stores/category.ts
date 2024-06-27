import type { easingFunctionsKeyType } from '@/types/easingFunctions';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useCategoryStore = defineStore('category', () => {
  const category: Ref<easingFunctionsKeyType> = ref<easingFunctionsKeyType>('linear');
  const setCategory = (key: easingFunctionsKeyType) => {
    category.value = key;
  };

  return { category, setCategory };
});

// export default () => {
//   const $store = useCategoryStore();
//   return { ...$store, ...storeToRefs($store) };
// };
