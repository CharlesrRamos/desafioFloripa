import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/** Rotas tipadas  ausente couponId Criar -  presente editar*/


export type RootStackParamList = {
    CouponsList: undefined;
    CouponsForm: { couponId?: string } | undefined;
};


export type CouponsListProps = NativeStackScreenProps<RootStackParamList,'CouponsList'>;
export type CouponsFormProps = NativeStackScreenProps<RootStackParamList,'CouponsForm'>;

