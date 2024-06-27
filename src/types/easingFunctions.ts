type easingFunctionPresetType = {
  name: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type easingFunctionsKeyType = 'linear' | 'easeInOut' | 'easeIn' | 'easeOut';

type easingFunctionsType = {
  [key in easingFunctionsKeyType]: easingFunctionPresetType[];
};

export type { easingFunctionsKeyType, easingFunctionsType };
