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

const getImage = (menu: MenuProps) =>
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

const getButton = (props: ButtonProps) => {
  const { className, type, id, dataId, children } = props;
  return `
    <button
      id="${id ?? ``}"
      class="${className}"
      type="${type ?? `button`}"
      data-id=${dataId}
    >
    ${children}
    </button>
  `;
};

const getAddButton = (itemId: number) => {
  const props = {
    className: "menu-item__add-btn",
    dataId: itemId,
    children: "+",
  };

  return getButton(props);
};

// const RemoveButton = (itemId: number) => {
//   const props = {
//     className: "order-item__remove-btn",
//     id: itemId,
//     children: "remove",
//   };

//   return Button(props);
// };

//Item
const getItemTitle = (title: string) => `
  <span class="menu-item__title">${title}</span>
`;
const getItem = (menu: MenuProps) => `
 <div>
    ${getItemTitle(menu.name)}
    <span class="menu-item__ingredients">${menu.ingredients.join()}</span>
    <span class="menu-item__price">$${menu.price}</span>
 </div>
`;

const getAddItem = (menu: MenuProps) => {
  return `
    ${getItem(menu)}
    ${getAddButton(menu.id)}
  `;
};

// const RemoveItem = (item: MenuProps) => {
//   return `
//   <li class="order-item">
//     <span class="order-item__name">${item.name}</span>
//     ${RemoveButton(item.id)}
//     <span class="order-item__price">$${item.price}</span>
//   </li>
// `;
// };

// Items
const getListItems = (data: MenuProps[]) => {
  return `
  <ul id="menu-item" class="menu-item menu-item--pizza">
    ${data
      .map((menu) => {
        return `
          <li class="menu-list">
            ${getImage(menu)}
            ${getAddItem(menu)}
            </li>
          <li>
            <div class="divider"></div>
          </li>
          `;
      })
      .join("")}
  </ul>
`;
};
// const RemoveItems = (data: MenuProps[]) => {
//   const id = 0;
//   const filteredData = data.filter((menu) => (menu.id = id));

//   return `
//   <ul class="order-list">
//     ${
//       filteredData.length > 0 &&
//       filteredData.map((menu: MenuProps) => RemoveItem(menu))
//     }
//   </ul>
// `;
// };

// const SumItems = (data: MenuProps[]) => {
//   const id = 0;
//   const prices = data
//     .filter((menu) => (menu.id = id))
//     .map((menu) => menu.price);
//   return `
//   <div class="order-total">
//     <span class="order-total__label">Total Price:</span>
//     <span class="order-total__amount">
//     ${
//       prices.length > 0 &&
//       prices.reduce((sum, currentPrice) => sum + currentPrice, 0)
//     }
//     </span>
//   </div>
//   `;
// };

// order
// const AddOrderBtn = () => {
//   const props = {
//     className: "order-section__complete-btn",
//     children: "Complete order",
//   };
//   return Button(props);
// };

// const AddOrder = () => {
//   return `
//       <h3 class="order-section__title">Your order</h3>
//       ${AddItems()}
//       <div class="divider order-divider"></div>
//       ${SumItems()}
//       ${AddOrderBtn()}
//     `;
// };



function render(
  data: MenuProps[],
  getHtmlString: (data: MenuProps[]) => string,
  htmlElement: HTMLElement,
) {
  const htmlString = getHtmlString(data);
  if(htmlString && htmlElement) {
    htmlElement.innerHTML = htmlString
  }
}

function onAdd(event: Event) {
    //console.log("event",event)
    console.log("target", event.target);
    console.log("dataset", event.target.dataset.id);

    try {
      const dataId = Number(event.target?.dataset.id)

      if(dataId) {
        console.log(dataId)
      }
    } catch (error) {
      console.error("error", error)
    }
    // dois return les data afficher une fonction get et le DomEl a modiifer 
    const data: MenuProps[] = []
    
    return {
      data,
      getAddItem
    }
}



document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", onAdd);
  const orderMenu = document.getElementById("order-menu")!;
  //const menuItem = document.getElementById("menu-item")!
  render(menuArray, getListItems, orderMenu);
});

//OrderItem()
//Order(menuArray)
