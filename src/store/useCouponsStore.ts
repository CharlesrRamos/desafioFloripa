import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mockCoupons } from '../mocks/coupons';
import { Coupon, CouponInput } from '../types';

type CouponState = {
    coupons: Coupon[];
    addCoupon: (input: CouponInput) => void;
    updateCoupon: (id: string, input: CouponInput) => void;
    removeCoupon: (id: string) => void;
};

export const useCouponsStore = create<CouponState>()(
    persist(
        set => ({
            coupons: mockCoupons,

            addCoupon: input =>
                set(state => ({
                    coupons: [
                        {
                            id: String(uuid.v4()),
                            title: input.title.trim(),
                            description: input.description?.trim(),
                            isBonus: false,
                            status: 'fechado',
                            isFavorite: false,
                        },
                        ...state.coupons,
                    ],
                })),

            updateCoupon: (id, input) =>
                set(state => ({
                    coupons: state.coupons.map(coupon =>
                        coupon.id === id
                            ? {
                                  ...coupon,
                                  title: input.title.trim(),
                                  description: input.description?.trim(),
                              }
                            : coupon,
                    ),
                })),

            removeCoupon: id =>
                set(state => ({
                    coupons: state.coupons.filter(coupon => coupon.id !== id),
                })),
        }),
        {
            name: 'coupons-storage',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);
