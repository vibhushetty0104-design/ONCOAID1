export const motionTokens = {
  micro: 0.14,
  fast: 0.22,
  normal: 0.36,
  slow: 0.68,
  cinematic: 1.15,
  easeOutSoft: [0.22, 1, 0.36, 1] as const,
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.slow, ease: motionTokens.easeOutSoft },
  },
};

export const messageEntrance = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.fast, ease: motionTokens.easeOutSoft },
  },
};
