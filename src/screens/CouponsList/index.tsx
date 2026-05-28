import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '../../theme';
import { FakeTabBar } from './FakeTabBar';
import { ListHeader } from './ListHeader';
import { CouponsListProps } from '../../navigation/types';
import { CouponCard } from '../../components/CouponCard';
import { useCouponsStore } from '../../store/useCouponsStore';


function Banner() {
  return (
    <Image source={require('../../assets/banner.png')} style={styles.banner} />
  );
}

export function CouponsList({ navigation }: CouponsListProps) {
  const insets = useSafeAreaInsets();
  const coupons  = useCouponsStore(state => state.coupons);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ListHeader />

      <FlatList
        data={coupons}
        style={styles.list}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={Banner}
        renderItem={({ item }) => (
          <CouponCard
            coupon={item}
            onPress={() => navigation.navigate('CouponsForm', { couponId: item.id })}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={[styles.fab, {bottom: insets.bottom + 30}]}
        activeOpacity={0.8}
        accessibilityRole='button'
        accessibilityLabel='Adicionar cupom'
        onPress={() => navigation.navigate('CouponsForm')}>

        <Text style={styles.fabIcon}>+</Text>
       </TouchableOpacity>

      <FakeTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    backgroundColor: colors.screen,
    paddingBottom: 120,
  },
  listContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.cardGap,
  },
  fab: {
    position: 'absolute',
    right: spacing.screenPadding,
    backgroundColor: colors.accent,
    borderRadius: 28,
    padding: 16,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 30,
  },
  fabIcon: {
    color: colors.background,
    fontSize:20,
    fontWeight: 700,
    marginTop: -2,
  },
  banner: {
    width: '100%',
    height: spacing.bannerHeight,
    borderRadius: spacing.bannerRadius,
    marginTop: spacing.cardGap,
    marginBottom: spacing.screenPadding,
  },
});
