export const motionTokens = {
  fast: 0.18,
  normal: 0.32,
  slow: 0.68,
  cinematic: 1.1,
  easeOutSoft: [0.22, 1, 0.36, 1] as const,
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.slow, ease: motionTokens.easeOutSoft },
  },
};
