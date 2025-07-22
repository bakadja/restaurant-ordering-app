import type { MenuProps } from './data'
import { menuArray } from './data'


interface ButtonProps {
  className: string;
  type: "button" | "submit";
  id: number;
  children: string;
}

const Button = ({className, type, id, children}: ButtonProps) => (
  `
    <button
      class="${className}"
      type="${type}"
      data-id=${id}
    >
    ${children}
    </button>
  `
)

const Item = (item: MenuProps) => (
  `
  <li class="order-item">
    <span class="order-item__name">${item.name}</span>
    <button
      data-id=${item.id}
      data-${item.name}=${item.name}
      class="order-item__remove-btn" 
      type="button">
      remove
    </button>
    <span class="order-item__price">$${item.price}</span>
  </li>

`
)

const AddItems = (data: MenuProps[]) => (
  `
  <ul class="order-list">
    ${
      data.length > 0 && (
        data.map((menu: MenuProps) => Item(menu))
      )
    }
  </ul>
`
)

const SumItems = (prices: number[]) => (
  `
  <div class="order-total">
    <span class="order-total__label">Total Price:</span>
    <span class="order-total__amount">
    ${prices.length > 0 && (
      prices.reduce((sum, currentPrice) => sum + currentPrice, 0)
    )}
    </span>
  </div>
  `
)

const AddBtn = () => (
  `
  <button class="order-section__complete-btn" type="button">
      Complete order
  </button>
  `
)

const AddOrder = () => {

  return (
    `
      <h3 class="order-section__title">Your order</h3>
      ${AddItems()}
      <div class="divider order-divider"></div>
      ${SumItems()}
      ${AddBtn()}

    
    `
  )
}



//OrderItem()
//Order(menuArray)