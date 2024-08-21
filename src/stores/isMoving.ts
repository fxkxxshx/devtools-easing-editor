import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useIsMovingStore = defineStore('isMoving', () => {
  const isMoving = ref(false);

  const setIsMoving = (value: boolean) => {
    if (value === true) {
      isMoving.value = true;
    } else {
      isMoving.value = false;
    }
  };

  return { isMoving, setIsMoving };
});
