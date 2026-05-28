import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import {colors, spacing, typography} from '../../theme';
import { IconHome, IconCoupon, IconLike, IconProfile } from '../../assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const TABS = [
  {  label: 'Home', Icon: IconHome, width: 22 },
  {  label: 'Coupons', Icon: IconCoupon, width: 24 },
  {  label: 'Like', Icon: IconLike, width: 25 },
  {  label: 'Profile', Icon: IconProfile, width: 19 },
];

export function FakeTabBar() {

    const insets = useSafeAreaInsets();
    const [active, setActive] = useState('Coupons');

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom || 8}]}>
            {TABS.map(({label, Icon, width}) => {
                const isActive = active === label;
                return (
                    <TouchableOpacity 
                    key={label} 
                    style={styles.tab} 
                    onPress={() => setActive(label)}
                    activeOpacity={0.7}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: isActive }}
                    accessibilityLabel={label}
                    >
                        <Icon 
                        width={width} 
                        height={width} 
                        color={active === label ? colors.accent : colors.tagClosed} />
                        <Text style={[styles.label, isActive && styles.tabActive]}>{label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection : 'row',
        backgroundColor: colors.background,
        alignItems: 'center',
        paddingHorizontal: spacing.screenPadding,
        paddingTop: 12,
    },
    
    tab: {
        flex: 1,
        alignItems: 'center',
        gap: 5,
      
    },
    tabActive: {
        color: colors.accent,
    },
    label: {
        ...typography.category,
        color: colors.tagClosed,
    },
});