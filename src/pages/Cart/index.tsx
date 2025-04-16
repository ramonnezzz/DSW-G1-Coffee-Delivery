import { Fragment, useState } from 'react'
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  Money,
  Trash,
} from '@phosphor-icons/react'

import {
  CartTotal,
  CartTotalInfo,
  CheckoutButton,
  Coffee,
  CoffeeInfo,
  Container,
  InfoContainer,
  PaymentContainer,
  PaymentErrorMessage,
  PaymentHeading,
  PaymentOptions,
} from './styles'
import { Tags } from '../../components/CoffeeCard/styles'
import { QuantityInput } from '../../components/Form/QuantityInput'
import { Radio } from '../../components/Form/Radio'

export interface Item {
  id: string
  quantity: number
}
export interface Order {
  id: number
  items: CoffeeInCart[]
}

interface CoffeeInCart {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  image: string;
  quantity: number;
  subTotal: number;
}

const DELIVERY_PRICE = 3.75

export function Cart() {
  const [coffeesInCart, setCoffeesInCart] = useState<CoffeeInCart[]>([
    {
      id: "0",
      title: "Expresso Tradicional",
      description: "O tradicional café feito com água quente e grãos moídos",
      tags: ["tradicional", "gelado"],
      price: 6.90,
      image: "/images/coffees/expresso.png",
      quantity: 1,
      subTotal: 6.90,
    },
    {
      id: "1",
      title: "Expresso Americano",
      description: "Expresso diluído, menos intenso que o tradicional",
      tags: ["tradicional", "com leite"],
      price: 9.95,
      image: "/images/coffees/americano.png",
      quantity: 2,
      subTotal: 19.90,
    },
    {
      id: "2",
      title: "Expresso Cremoso",
      description: "Café expresso tradicional com espuma cremosa",
      tags: ["especial"],
      price: 16.50,
      image: "/images/coffees/expresso-cremoso.png",
      quantity: 3,
      subTotal: 49.50,
    }
  ])

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'credit' | 'debit' | 'pix' | 'boleto'>('debit')

  const amountTags: string[] = []
  coffeesInCart.forEach(coffee =>
    coffee.tags.forEach(tag => {
      if (!amountTags.includes(tag)) {
        amountTags.push(tag)
      }
    })
  )

  const totalItemsPrice = coffeesInCart.reduce((total, coffee) => {
    return total + coffee.price * coffee.quantity
  }, 0)

  const DELIVERY = DELIVERY_PRICE * amountTags.length

  function getPaymentFee(subtotal: number) {
    switch (selectedPaymentMethod) {
      case 'credit':
        return subtotal * 0.385
      case 'pix':
        return subtotal * -0.185
      case 'boleto':
        return 1.0
      default:
        return 0
    }
  }

  const fee = getPaymentFee(totalItemsPrice)
  const totalWithFee = totalItemsPrice + DELIVERY + fee

  function handleItemIncrement(id: string) {
    setCoffeesInCart(prev =>
      prev.map(coffee => {
        if (coffee.id === id) {
          const quantity = coffee.quantity + 1
          return {
            ...coffee,
            quantity,
            subTotal: quantity * coffee.price,
          }
        }
        return coffee
      })
    )
  }

  function handleItemDecrement(id: string) {
    setCoffeesInCart(prev =>
      prev.map(coffee => {
        if (coffee.id === id && coffee.quantity > 1) {
          const quantity = coffee.quantity - 1
          return {
            ...coffee,
            quantity,
            subTotal: quantity * coffee.price,
          }
        }
        return coffee
      })
    )
  }

  function handleItemRemove(id: string) {
    setCoffeesInCart(prev => prev.filter(coffee => coffee.id !== id))
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <Container>
      <InfoContainer>
        <PaymentContainer>
          <PaymentHeading>
            <CurrencyDollar size={22} />
            <div>
              <span>Pagamento</span>
              <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
            </div>
          </PaymentHeading>

          <PaymentOptions>
            <div>
              <Radio
                isSelected={selectedPaymentMethod === 'credit'}
                onClick={() => setSelectedPaymentMethod('credit')}
                value="credit"
              >
                <CreditCard size={16} />
                <span>Cartão de crédito</span>
              </Radio>

              <Radio
                isSelected={selectedPaymentMethod === 'debit'}
                onClick={() => setSelectedPaymentMethod('debit')}
                value="debit"
              >
                <Bank size={16} />
                <span>Cartão de débito</span>
              </Radio>

              <Radio
                isSelected={selectedPaymentMethod === 'pix'}
                onClick={() => setSelectedPaymentMethod('pix')}
                value="pix"
              >
                <Money size={16} />
                <span>Pix ou dinheiro</span>
              </Radio>

            </div>
          </PaymentOptions>
        </PaymentContainer>
      </InfoContainer>

      <InfoContainer>
        <h2>Cafés selecionados</h2>
        <CartTotal>
          {coffeesInCart.map((coffee) => (
            <Fragment key={coffee.id}>
              <Coffee>
                <div>
                  <img src={coffee.image} alt={coffee.title} />
                  <div>
                    <span>{coffee.title}</span>
                    <Tags>
                      {coffee.tags.map(tag => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </Tags>
                    <CoffeeInfo>
                      <QuantityInput
                        quantity={coffee.quantity}
                        incrementQuantity={() => handleItemIncrement(coffee.id)}
                        decrementQuantity={() => handleItemDecrement(coffee.id)}
                      />
                      <button onClick={() => handleItemRemove(coffee.id)}>
                        <Trash />
                        <span>Remover</span>
                      </button>
                    </CoffeeInfo>
                  </div>
                </div>
                <aside>{formatCurrency(coffee.subTotal)}</aside>
              </Coffee>
              <span />
            </Fragment>
          ))}

          <CartTotalInfo>
            <div>
              <span>Total de itens</span>
              <span>{formatCurrency(totalItemsPrice)}</span>
            </div>
            <div>
              <span>Entrega</span>
              <span>{formatCurrency(DELIVERY)}</span>
            </div>
            <div>
              <span>Juros/Desconto</span>
              <span>{formatCurrency(fee)}</span>
            </div>
            <div>
              <strong>Total</strong>
              <strong>{formatCurrency(totalWithFee)}</strong>
            </div>
          </CartTotalInfo>

          <CheckoutButton type="submit" form="order">
            Confirmar pedido
          </CheckoutButton>
        </CartTotal>
      </InfoContainer>
    </Container>
  )
}
