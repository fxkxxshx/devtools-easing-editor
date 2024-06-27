import type { easingFunctionsType } from '@/types/easingFunctions';

const easingFunctions: easingFunctionsType = {
  linear: [
    {
      name: 'linear',
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 1,
    },
  ],
  easeInOut: [
    {
      name: 'ease-in-out',
      x1: 0.42,
      y1: 0,
      x2: 0.58,
      y2: 1,
    },
    {
      name: 'In Out · Sine',
      x1: 0.45,
      y1: 0.05,
      x2: 0.55,
      y2: 0.95,
    },
    {
      name: 'In Out · Quadratic',
      x1: 0.46,
      y1: 0.03,
      x2: 0.52,
      y2: 0.96,
    },
    {
      name: 'In Out · Cubic',
      x1: 0.65,
      y1: 0.05,
      x2: 0.36,
      y2: 1,
    },
    {
      name: 'Fast Out, Slow In',
      x1: 0.4,
      y1: 0,
      x2: 0.2,
      y2: 1,
    },
    {
      name: 'In Out · Back',
      x1: 0.68,
      y1: -0.55,
      x2: 0.27,
      y2: 1.55,
    },
  ],
  easeIn: [
    {
      name: 'ease-in',
      x1: 0.42,
      y1: 0,
      x2: 1,
      y2: 1,
    },
    {
      name: 'In · Sine',
      x1: 0.47,
      y1: 0,
      x2: 0.75,
      y2: 0.72,
    },
    {
      name: 'In · Quadratic',
      x1: 0.55,
      y1: 0.09,
      x2: 0.68,
      y2: 0.53,
    },
    {
      name: 'In · Cubic',
      x1: 0.55,
      y1: 0.06,
      x2: 0.68,
      y2: 0.19,
    },
    {
      name: 'In · Back',
      x1: 0.6,
      y1: -0.28,
      x2: 0.74,
      y2: 0.05,
    },
    {
      name: 'Fast Out, Linear In',
      x1: 0.4,
      y1: 0,
      x2: 1,
      y2: 1,
    },
  ],
  easeOut: [
    {
      name: 'ease-out',
      x1: 0,
      y1: 0,
      x2: 0.58,
      y2: 1,
    },
    {
      name: 'Out · Sine',
      x1: 0.39,
      y1: 0.58,
      x2: 0.57,
      y2: 1,
    },
    {
      name: 'Out · Quadratic',
      x1: 0.25,
      y1: 0.46,
      x2: 0.45,
      y2: 0.94,
    },
    {
      name: 'Out · Cubic',
      x1: 0.22,
      y1: 0.61,
      x2: 0.36,
      y2: 1,
    },
    {
      name: 'Linear Out, Slow In',
      x1: 0,
      y1: 0,
      x2: 0.2,
      y2: 1,
    },
    {
      name: 'Out · Back',
      x1: 0.18,
      y1: 0.89,
      x2: 0.32,
      y2: 1.28,
    },
  ],
};

const easingFunctionsKeys = Object.keys(easingFunctions);

export { easingFunctions, easingFunctionsKeys };
