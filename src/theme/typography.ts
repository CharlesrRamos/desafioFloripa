export const fonts = {
  regular: 'Poppins-Regular',
  semibold: 'Poppins-Medium',
  bold: 'Poppins-Bold',
} as const;

export const typography = {
  title: { fontFamily: fonts.bold, fontSize: 16 },
  description: { fontFamily: fonts.regular, fontSize: 9 },
  category: { fontFamily: fonts.semibold, fontSize: 8 },
  searchPlaceholder: { fontFamily: fonts.regular, fontSize: 9 },
  bonusBadge: { fontFamily: fonts.semibold, fontSize: 16 },
} as const;
