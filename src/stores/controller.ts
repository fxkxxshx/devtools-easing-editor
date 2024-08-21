import { height, width } from '@/data/constants';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useControllerStore = defineStore('controller', () => {
  // cssの座標で格納
  const controller = ref([
    [0, 0],
    [0, 0],
  ]);

  const setController = (x1: number, y1: number, x2: number, y2: number) => {
    const truncateToTwoDecimals = (num: number) => {
      return Math.floor(num * 100) / 100;
    };

    // svgの座標をcssの座標に変換してから格納
    controller.value[0][0] = truncateToTwoDecimals(x1 / width);
    controller.value[0][1] = truncateToTwoDecimals(1 - y1 / height);
    controller.value[1][0] = truncateToTwoDecimals(x2 / width);
    controller.value[1][1] = truncateToTwoDecimals(1 - y2 / height);
  };

  return { controller, setController };
});
