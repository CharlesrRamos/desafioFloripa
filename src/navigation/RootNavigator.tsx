import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { CouponsList } from '../screens/CouponsList';
import { CouponsForm } from '../screens/CouponsForm';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CouponsList" component={CouponsList} options={{ headerShown: false }} />
      <Stack.Screen name="CouponsForm" component={CouponsForm} options={{ headerStyle: { backgroundColor: colors.background },
    headerTintColor: colors.textPrimary }} />
    </Stack.Navigator>
  );
};