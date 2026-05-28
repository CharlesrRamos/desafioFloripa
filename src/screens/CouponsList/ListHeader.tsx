import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  IconAll,
  IconBar,
  IconBurger,
  IconExtra,
  IconMenu,
  IconOriental,
  IconPizza,
  IconRestaurant,
  IconSearch,
} from '../../assets';
import { colors, spacing, typography } from '../../theme';

type Category = {
  id: string;
  label: string;
  Icon: React.FC<{ width?: number; height?: number; color?: string }>;
  active?: boolean;
};

const CATEGORIES: Category[] = [
  { id: 'all', label: 'Todos', Icon: IconAll, active: true },
  { id: 'extra', label: 'EXTRA', Icon: IconExtra },
  { id: 'burger', label: 'Hamburgueria', Icon: IconBurger },
  { id: 'restaurant', label: 'Restaurante', Icon: IconRestaurant },
  { id: 'pizza', label: 'Pizzaria', Icon: IconPizza },
  { id: 'oriental', label: 'Oriental', Icon: IconOriental },
  { id: 'bar', label: 'Bar/Bebidas', Icon: IconBar },
  { id: 'pizza', label: 'Pizzaria', Icon: IconPizza },
  { id: 'oriental', label: 'Oriental', Icon: IconOriental },
  { id: 'bar', label: 'Bar/Bebidas', Icon: IconBar },
];

export function ListHeader() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.topBand}>
        <View style={styles.loginButton}>
          <Text style={styles.loginText}>Login / Cadastro</Text>
        </View>
      </View>

      <View style={styles.searchBar}>
        <IconSearch width={16} height={16} color={colors.textPrimary} />
        <Text style={styles.searchPlaceholder}>
          Busque estabelecimentos, bairro, categoria
        </Text>
        <IconMenu width={18} height={18} color={colors.textPrimary} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map(({ id, label, Icon, active }, index) => (
          <View key={`${id}-${index}`} style={styles.categoryItem}>
            <Icon
              width={22}
              height={22}
              color={active ? colors.accent : colors.textPrimary}
            />
            <Text
              style={[
                styles.categoryLabel,
                index === 0 && styles.categoryLabelActive,
              ]}
            >
              {label}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.divider} />
    </View>
  );
}

const SEARCH_HEIGHT = 44;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.screen,
  },

  topBand: {
    backgroundColor: colors.background,
    paddingTop: 40,
    paddingBottom: 35,
  },

  loginButton: {
    alignSelf: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 999,
    marginBottom: spacing.screenPadding,
  },
  loginText: {
    ...typography.title,
    color: colors.textPrimary,
  },
  searchBar: {
    height: SEARCH_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -SEARCH_HEIGHT / 2,
    marginHorizontal: spacing.screenPadding,
    backgroundColor: colors.screen,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.textPrimary,
    marginBottom: spacing.screenPadding,
    paddingHorizontal: 16,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: 10,
    color: colors.tagClosed,
    ...typography.searchPlaceholder,
  },
  categoriesContent: {
    paddingHorizontal: spacing.screenPadding,
    gap: 18,
    marginBottom: 16,
  },
  categoryItem: {
    alignItems: 'center',
    gap: 4,
  },

  categoryLabel: {
    ...typography.category,
    color: colors.textPrimary,
    textAlign: 'center',
    paddingTop: 6,
  },
  categoryLabelActive: {
    color: colors.accent,
  },
  divider: {
    height: 1,
    backgroundColor: colors.cardBorder,
    marginBottom: 0,
  },
});
