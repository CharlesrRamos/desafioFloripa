import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Coupon } from '../types';
import { colors, spacing, typography } from '../theme';
import { IconLike, IconStar } from '../assets';

type Props = {
  coupon: Coupon;
  onPress: () => void;
};

export function CouponCard({ coupon, onPress }: Props) {
  const isOpen = coupon.status === 'aberto agora';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.card}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`Editar cupom ${coupon.description}`}
    >
      <View style={styles.imageWrapper}>
        {coupon.imageUrl ? (
          <Image source={coupon.imageUrl} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]} />
        )}

        {coupon.isBonus && (
          <View style={styles.bonusWrapper}>
            <IconStar width={14} height={14} />
            <Text style={styles.bonusText}>Bônus</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.likeWrapper}>
          <IconLike width={22} height={22} />
        </View>

        <Text style={styles.title} numberOfLines={1}>
          {coupon.title}
        </Text>
        {!!coupon.description && (
          <Text style={styles.description} numberOfLines={3}>
            {coupon.description}
          </Text>
        )}

        <View
          style={[
            styles.statusTag,
            { backgroundColor: isOpen ? colors.tagOpen : colors.tagClosed },
          ]}
        >
          <Text style={styles.statusTagText} numberOfLines={1}>
            {isOpen ? 'Aberto agora' : 'Fechado'}
          </Text>
        </View>
      </View>
      {!!coupon.partnerLogoUrl && (
        <Image source={coupon.partnerLogoUrl} style={styles.partnerLogo} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    height: spacing.cardHeight,
    backgroundColor: colors.background,
    borderRadius: spacing.cardRadius,
    borderWidth: spacing.cardBorderWidth,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
    marginBottom: spacing.cardGap,
  },
  imageWrapper: {
    width: '52%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    backgroundColor: colors.cardBorder,
  },
  bonusWrapper: {
    position: 'absolute',
    top: 20,
    left: -36,
    width: 140,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    backgroundColor: colors.accent,
    transform: [{ rotate: '-45deg' }],
    zIndex: 2,
  },
  bonusText: {
    ...typography.bonusBadge,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  partnerLogo: {
    position: 'absolute',
    top: 16,
    left: '48%',
    width: 48,
    height: 48,
    zIndex: 3,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.tagClosed,
  },
  content: {
    flex: 1,
    paddingTop: 66,
    paddingLeft: 12,
    paddingRight: 16,
    paddingBottom: 20,
  },

  likeWrapper: {
    position: 'absolute',
    top: 12,
    left: 130,
    zIndex: 1,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  description: {
    ...typography.description,
    color: colors.textPrimary,
    lineHeight: 13,
  },
  tag: {
    ...typography.category,
    color: colors.textPrimary,
  },
  statusTag: {
    position: 'absolute',
    bottom: 8,
    left: 80,
    color: colors.textPrimary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTagText: {
    ...typography.category,
    fontSize: 10,
    color: colors.textPrimary,
  },
});
