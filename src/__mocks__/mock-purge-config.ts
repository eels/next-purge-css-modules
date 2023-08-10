import type { PurgeConfig } from '@types';

export default {
  content: ['example'],
  enableDevPurge: false,
  fontFace: false,
  keyframes: false,
  safelist: ['body', 'html'],
  variables: false,
} as PurgeConfig;
