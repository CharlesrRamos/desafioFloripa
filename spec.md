# Spec — Floripa em Dobro

> Documento de especificação escrito antes do código. Define o que será construído,
> as decisões técnicas e seus porquês, e o plano de execução. Serve como contrato
> para mim (engenheiro) e como contexto para a IA gerar código fiel à intenção.

## 1. Objetivo

APP react native (RN CLI + TypeScript)

1. **Listagem de cupons** - reproduzir com fidelidade a tela de cupons do app. Prioridade desta tela: Fidelidade visual
(cores, espaçamento, tipografia hierarquia). Dados da tela serão mockados localmente.

2. **Tela de adicionar/editar** - CRU(D) local com estado global. A mesma tela atende criar/editar. Prioridade desta tela: Funcionar perfeitamente - visual não importa, pode usar o form cru do RN


### Non-goals (fora de escopo)
- Sem backend, sem integrações com api, persist6encia 100% local.
- Não possui autenticação / login
- A tela de form não possui design então não precisa ser fiel.
- Sem funcionalidades além da listagem e criação e edição de cupons.
- Itens ta tela como filtros, busca, ordenação são visuais, sem funcionalidades

## 2. Stack & justificativas

| Camada | Escolha | Por quê  |
|---|---|---|
| Framework | *React Native CLI* (bare) | Stack usada pela empresa, por isso decidir seguir com ela e não expo |
| Linguagem | *TypeScript* | Diferencial pedido nos requisitos, é usado pela empresa, excelente para trabalhar com tipagem |
| Navegação | *React Navigation* (native-stack) | Padrão do mercado, atende as duas 2 rotas com tasnição nativa |
| Estado | *Zustand* + middleware persist | escopo pequeno, quero evitar boirlerplate (store, slice , provider) - Zustand entrega o estado global com um hook | 
| Persistência | *AsyncStorage* (via persist) | Logica de cima, não vejo necessidade do MMKV, o async é mais simples  |
| Testes | *Jest + React Native Testing Library* | Se der tempo - Cobre os testes de regra de negócio e a logica do store |
| Ícones | *react-native-svg* (+ svg-transformer) | baixei os icones todos como SVG :) |


## 3. Modelo de dados

Campos derivados do figma e regra de negócio, e o prórpio app.

O desafio informa que somente o `title` (obrigatório), `description` (opcional) os demais itens vem preenchido do mock, caso de tempo pretendo implementar as informações de imagem, logo, bonus etec.. ao form.

```ts

type CouponStatus = 'aberto agora' | 'fechado'

type Coupon = { 
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    partenerLogoUrl?:string
    isBonus: boolean
    status: CouponStatus;
    isFavorite: boolean;
}
```
No form da tela de criação/ edição terá apenas `title` e `description` , restos dos dados vem do mock, para assim manter a fidelidade de alguns cards ao que é mostrado no figma.


## 4. Telas e navegação


RootStack(native-stack)
├── CouponsList (tela das listagem de cupons) - manter fidelidade ao figma
├── CouponsForm  (param: {CouponId?: string}) - ausente -> criar | Presente -> editar

**Pontos funcionais**
- Criar  -> Botão para criação de cupons - vou optar por um flutuante a cima do bottom tab - vai ficar na tela de cupons.
- Editar -> Quando clicar no card ae ele vai para o form de edição `CouponsForm` com `CouponId`.

## 5. Estado (Zustand store)

```ts
    type CounponInput = {
        title: string;
        description?: string;
    };

    type ConponState ={
        coupons = Coupon[];
        addCoupon = (input: CounponInput) => void
        updateCoupon = (id: string , input: CounponInput) => void
        removeCoupon = (id: string ) => void
    }
```

**Decisões**
- Form somente com title e descrição
- Os campos visuais como, imagem, logo, status e isBonus vão vir como defaults no coupons mockados


## 6. Validação (tela de form)

`tile`: Obrigatório - não vazio após o trim(). Erro inline abaixo do input
`description`: opcional
 `botão de salvar` - sempre ativo. erro ao enviar o form.

## 7. Critérios de aceite (mapeando a avaliação)

[ ] Tela de listagem fiel ao figma (cores, espaçamentos, tipografias, hierarquia)
[ ] Tocar no coupom leva para tela de edição
[ ] Criar coupom novo
[ ] Edição funcionando
[ ] validação do title obrigatório
[ ] pelo menos 2 rotas
[ ] TypeScript em todo código
[ ] Persitência local ao abrir e fechar o app
[ ] Estado global controla a lista e atualizações


## Estrutura de pastas proposta

````

src/
├── @types/                    # tipos compartilhados
├── store/                     # useStore (zustand)
├──navigation/                 # RootStack 
├──screnns/                    #  Telas
    ├──CouponsList/            #
    ├──CouponsForm/            #
├──components/                 #  reutilizáveis
├──theme/                      #  cores, tipografia, spaçamento
├──mocks/                      #  dados fakes iniciais
    
```
 