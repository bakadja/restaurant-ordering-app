import type { MenuProps } from "./data";
import { menuArray } from "./data";
import PizzaImg from "./assets/images/pizza.png";
import HamburgerImg from "./assets/images/hamburger.png";
import BeerImg from "./assets/images/beer.png";

interface ImgSRC {
  [key: string]: string;
}
const imgSRC: ImgSRC = {
  pizza: PizzaImg,
  hamburger: HamburgerImg,
  beer: BeerImg,
};
const uniqueMenuData = new Set<MenuProps>();
const listItemHtmlStr = `
  <ul id="menu-item" class="menu-item menu-item--pizza">
    ${menuArray
      .map((menu) => {
        return `
        <li class="menu-list">
            <img 
              class="menu-item__image"
              src="${imgSRC[menu.name.toLowerCase()]}"
              alt="${menu.ingredients.join()}"
            />
            <div>
              <span class="menu-item__title">${menu.name}</span>
              <span class="menu-item__ingredients">${menu.ingredients.join()}</span>
              <span class="menu-item__price">$${menu.price}</span>
            </div>
            <button class="menu-item__add-btn" type="button" data-id="${
              menu.id
            }">+</button>
        </li>
        <li>
            <div class="divider"></div>
        </li>
          `;
      })
      .join("")}
  </ul>
`;


function render(htmlString: string, htmlElement: HTMLElement) {
  if (htmlString && htmlElement) {
    htmlElement.innerHTML = htmlString;
  }
}

function onAdd(event: Event) {
  const target = event.target as HTMLElement;
  const dataId = Number(target.dataset.id);

  if (dataId > -1) {
    const foundMenu = menuArray.find((menu) => menu.id === dataId);
    foundMenu && uniqueMenuData.add(foundMenu);
  }

  if (uniqueMenuData.size > 0) {
    const menuData = Array.from(uniqueMenuData)
    const totalPrice = menuData.reduce((sum, currentMenu) => sum + currentMenu.price , 0)

    const menuHtmlStr = `
    <h3 class="order-section__title">Your order</h3>
    <ul class="order-list"> 
      ${menuData
        .map(
          (menu) => `
          <li class="order-item">
            <span class="order-item__name">${menu.name}</span>
            <button class="order-item__remove-btn" data-id="200" type="button">remove</button>
            <span class="order-item__price">$${menu.price}</span>
          </li>
        `
        )
        .join(" ")}
    </ul>
    <div class="divider order-divider"></div>
    <div class="order-total">
          <span class="order-total__label">Total Price:</span>
          <span class="order-total__amount">$${totalPrice}</span>
    </div>
    <button id="order-btn" class="order-section__complete-btn" type="button">
        Complete order
    </button>
   `;

    render(menuHtmlStr, document.getElementById("add-order")!);
  }
}


// document.addEventListener("DOMContentLoaded", () => {
//   console.log("click domLoaded")
//   // render menu
//   const orderMenuEl = document.getElementById("order-menu")!;
//   render(listItemHtmlStr, orderMenuEl);
  
//   // add a new menu to Order
//   document.addEventListener("click", onAdd);
  
//   // complete order
//   const orderBtn = document.getElementById("order-btn")
//   console.log("orderBtn", orderBtn)
//   if(orderBtn) {
//     orderBtn.addEventListener('click', () => {
//      // open modal
//      console.log("click")
//       document.getElementById("modal")!.style.display = "block"
//     })
  
//   }
// });


console.log("click domLoaded")
  // render menu
  const orderMenuEl = document.getElementById("order-menu")!;
  render(listItemHtmlStr, orderMenuEl);
  
  // add a new menu to Order
  document.addEventListener("click", onAdd);
  
  // complete order
  const orderBtn = document.getElementById("order-btn")
  console.log("orderBtn", orderBtn)
  if(orderBtn) {
    orderBtn.addEventListener('click', () => {
     // open modal
     console.log("click")
      document.getElementById("modal")!.style.display = "block"
    })
  
  }