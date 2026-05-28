export const colors = {
  background: '#2C2622',
  screen: '#0F1112',
  textPrimary: '#FFFFFF',
  tagClosed: '#919493',
  tagOpen: '#25d366',
  bonusStar: '#8A23CE',
  cardBorder: '#474747',
  accent: '#EF921E',
  accentBottom: '#FFBD32',
} as const;

export type Color = typeof colors;
