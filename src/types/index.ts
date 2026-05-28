import {ImageSourcePropType} from 'react-native';

export type CouponStatus = 'aberto agora' | 'fechado';

export type Coupon = {
    id: string;
    title: string;
    description?: string;
    imageUrl?: ImageSourcePropType;
    partnerLogoUrl?:ImageSourcePropType
    isBonus: boolean
    status: CouponStatus;
    isFavorite: boolean;
}

export type CouponInput = {
    title: string;
    description?: string;
}