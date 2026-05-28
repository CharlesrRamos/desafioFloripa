# Cupons Floripa

App React Native com duas telas: uma *listagem de cupons* reproduzindo com
fidelidade a tela de Cupons do app Floripa em Dobro, e uma tela de
*adicionar/editar cupom* com CRUD local e gerenciamento de estado.

Sem backend, sem API — toda a persistência é local.

## Stack

| Camada | Escolha |
|---|---|
| Framework | React Native CLI (bare) |
| Linguagem | TypeScript |
| Navegação | React Navigation (native-stack) |
| Estado | Zustand + middleware persist |
| Persistência | AsyncStorage |
| Testes | Jest + React Native Testing Library |

## Decisões técnicas

### Por que Zustand (e não Redux Toolkit / Context API)?

O estado deste app é uma lista e poucas ações, sem fluxos assíncronos complexos.
O Redux Toolkit resolveria, mas seus pontos fortes — convenções para times
grandes, DevTools com time-travel, escalabilidade — atacam problemas que este
escopo não tem; o boilerplate de store, slices e provider seria custo sem
retorno. A Context API não é um gerenciador de estado: re-renderiza todos os
consumidores e não tem persistência. O Zustand entrega estado global e
persistência num único hook, com mínima cerimônia.

### Por que AsyncStorage (e não MMKV)?

Pela mesma lógica de não exagerar a ferramenta para o escopo. O MMKV é superior
(síncrono, mais rápido) e seria viável aqui por estarmos em RN CLI, mas o ganho
de performance seria imperceptível para uma lista de cupons. A troca seria
trivial: o middleware persist do Zustand só precisa de outro storage adapter.

### Navegação

Stack nativa com duas rotas. A tela de form é empilhada (push), não modal —
ambos contam como rota no React Navigation, mas a tela empilhada satisfaz o
requisito sem ambiguidade e traz header nativo e botão de voltar de graça.

### Campos visuais com defaults

O formulário tem apenas os campos mínimos pedidos (título obrigatório,
descrição opcional). Ao criar um cupom, os campos visuais do card (imagem, logo,
status) recebem valores default no addCoupon do store, mantendo o formulário
enxuto sem quebrar a renderização da lista.

### Fidelidade visual

Os tokens do Figma (cores, tipografia Poppins, espaçamentos) foram extraídos via
Inspect e centralizados em src/theme/, evitando valores hardcoded espalhados.
A largura dos cards é responsiva (não fixa em 368px) para adaptar a aparelhos de
tamanhos diferentes, mantendo radius, espaçamento e tipografia fiéis.

### Escopo da tela de listagem

Para reproduzir o design, a tela renderiza busca, filtro de categorias, banner e
tab bar inferior — todos *decorativos/estáticos*. Os únicos elementos
funcionais são o FAB de criar e o toque no card para editar. Implementar busca e
filtro estava fora de escopo.

## Como rodar

> Os arquivos deste repositório entram em um projeto React Native CLI. Com o
> ambiente nativo já configurado (Xcode/Android Studio, JDK, CocoaPods):

bash
npm install

# iOS
cd ios && pod install && cd ..
npm run ios

# Android
npm run android


A fonte Poppins precisa estar linkada ao projeto nativo (arquivos .ttf em
assets/fonts + npx react-native-asset) para a tipografia bater com o design.

## Como testar

bash
npm test


Cobertura intencional (lógica e requisitos, não snapshot frágil):

- *Store* — addCoupon (com defaults e trim), updateCoupon, removeCoupon.
- *Validação* — o form não salva com título vazio; salva com título válido.
- *Lista* — renderiza os cupons do store e o toque no card navega para edição.

## Estrutura


src/
├── theme/        # tokens do Figma: cores, tipografia, espaçamentos
├── types/        # Coupon, CouponInput
├── mocks/        # dados fake iniciais (seed)
├── store/        # useCouponStore (Zustand + persist)
├── navigation/   # RootStack tipado (2 rotas)
├── components/   # CouponCard
└── screens/
    ├── CouponsList/   # tela + topo decorativo + FAB
    └── CouponForm/    # criar / editar / excluir + validação


## Possíveis evoluções

- Migrar persistência para MMKV.
- Campo de imagem no formulário (URL ou image picker).
- Busca e filtro de categorias funcionais.