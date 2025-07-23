import type { MenuProps } from "./data";
import { menuArray } from "./data";
import PizzaImg from "./assets/images/pizza.png";
import HamburgerImg from "./assets/images/hamburger.png";
import BeerImg from "./assets/images/beer.png";

// img
interface ImgSRC {
  [key: string]: string;
}
const imgSRC: ImgSRC = {
  pizza: PizzaImg,
  hamburger: HamburgerImg,
  beer: BeerImg,
};

const Image = (menu: MenuProps) =>
  `
     <img 
      class="menu-item__image"
      src="${imgSRC[menu.name.toLowerCase()]}"
      alt="${menu.ingredients.join()}"
     />
  `;

// Button

interface ButtonProps {
  className: string;
  type?: "button" | "submit";
  id?: number;
  dataId?: number;
  // isDisabled?: boolean;
  children: string;
}

const Button = (props: ButtonProps) => {
  const { className, type, id, dataId, children } = props;
  return `
    <button
      id=""${id}
      class="${className}"
      type="${type ?? `button`}"
      data-id=${dataId}
    >
    ${children}
    </button>
  `;
};

const AddButton = (itemId: number) => {
  const props = {
    className: "menu-item__add-btn",
    dataId: itemId,
    children: "+",
  };

  return Button(props);
};

const RemoveButton = (itemId: number) => {
  const props = {
    className: "order-item__remove-btn",
    id: itemId,
    children: "remove",
  };

  return Button(props);
};

//Item
const ItemTitle = (title: string) => `
  <span class="menu-item__title">${title}</span>
`;
const Item = (menu: MenuProps) => `
  ${ItemTitle(menu.name)}
  <span class="menu-item__ingredients">${menu.ingredients.join()}</span>
  <span class="menu-item__price">$${menu.price}</span>
`;

const AddItem = (menu: MenuProps) =>
  `
    ${Item(menu)}
    ${AddButton(menu.id)}
  `;

const RemoveItem = (item: MenuProps) => {
  return `
  <li class="order-item">
    <span class="order-item__name">${item.name}</span>
    ${RemoveButton(item.id)}
    <span class="order-item__price">$${item.price}</span>
  </li>
`;
};

// Items
const ListItems = (data: MenuProps[]) => {
  return `
  <ul class="menu-item menu-item--pizza">
    ${data.map((menu) => {
      return `
        <li>
          ${Image(menu)}
          ${AddItem(menu)}  
        </li>     
       `;
    }).join(" ")}
  </ul>
`;
};
const RemoveItems = (data: MenuProps[]) => {
  const id = 0;
  const filteredData = data.filter((menu) => (menu.id = id));

  return `
  <ul class="order-list">
    ${
      filteredData.length > 0 &&
      filteredData.map((menu: MenuProps) => RemoveItem(menu))
    }
  </ul>
`;
};

const SumItems = (data: MenuProps[]) => {
  const id = 0;
  const prices = data
    .filter((menu) => (menu.id = id))
    .map((menu) => menu.price);
  return `
  <div class="order-total">
    <span class="order-total__label">Total Price:</span>
    <span class="order-total__amount">
    ${
      prices.length > 0 &&
      prices.reduce((sum, currentPrice) => sum + currentPrice, 0)
    }
    </span>
  </div>
  `;
};

// order
const AddOrderBtn = () => {
  const props = {
    className: "order-section__complete-btn",
    children: "Complete order",
  };
  return Button(props);
};

const AddOrder = () => {
  return `
      <h3 class="order-section__title">Your order</h3>
      ${AddItems()}
      <div class="divider order-divider"></div>
      ${SumItems()}
      ${AddOrderBtn()}    
    `;
};

document.addEventListener("DOMContentLoaded", () => {
  //document.addEventListener("click", onAdd);
  document.getElementById("order-menu")!.innerHTML = createMenuItem(menuArray);
});

function onAdd(event) {
  console.log("target", event.target);
  console.log("dataset", event.target.dataset.id);
}

function createMenuItem(data: MenuProps[]) {
  return `
    ${ListItems(data)}
  
  `;
}

//OrderItem()
//Order(menuArray)
