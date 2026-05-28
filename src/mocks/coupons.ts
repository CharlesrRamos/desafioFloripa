import { Coupon } from '../types';

const pizzaImage = require('../assets/pizza.png');
const galetoImage = require('../assets/galeto.png');
const partnerLogo = require('../assets/logo.png');

export const mockCoupons: Coupon[] = [
  {
    id: 'mock-1',
    title: 'Parma Pizza',
    description: 'Na compra de um rodízio ganhe outro igual ou de menor valor.',
    imageUrl: pizzaImage,
    partnerLogoUrl: partnerLogo,
    isBonus: true,
    status: 'fechado',
    isFavorite: true,
  },
  {
    id: 'mock-2',
    title: 'Galeteria do Léo',
    description: 'Galeto completo com acompanhamentos com 30% de desconto.',
    imageUrl: galetoImage,
    partnerLogoUrl: partnerLogo,
    isBonus: false,
    status: 'aberto agora',
    isFavorite: false,
  },
  {
    id: 'mock-3',
    title: 'Pizzaria Nápoles',
    description:
      'Compre uma pizza grande e a segunda sai pela metade do preço.',
    imageUrl: pizzaImage,
    partnerLogoUrl: partnerLogo,
    isBonus: true,
    status: 'aberto agora',
    isFavorite: true,
  },
  {
    id: 'mock-4',
    title: 'Galeteria Imperial',
    description: 'Rodízio de galeto com bebida não alcoólica inclusa.',
    imageUrl: galetoImage,
    partnerLogoUrl: partnerLogo,
    isBonus: false,
    status: 'fechado',
    isFavorite: false,
  },
  {
    id: 'mock-5',
    title: 'Pizza Express',
    description: 'Delivery grátis em pedidos acima de R$ 60 na região central.',
    imageUrl: pizzaImage,
    partnerLogoUrl: partnerLogo,
    isBonus: false,
    status: 'aberto agora',
    isFavorite: false,
  },
  {
    id: 'mock-6',
    title: 'Galeto Center',
    description: 'Meio galeto + polenta + saladinha por R$ 29,90.',
    imageUrl: galetoImage,
    partnerLogoUrl: partnerLogo,
    isBonus: true,
    status: 'aberto agora',
    isFavorite: true,
  },
];
