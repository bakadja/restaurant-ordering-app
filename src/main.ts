import type { MenuProps } from "./data";
import { menuArray } from "./data";
import PizzaImg from "./assets/images/pizza.png";
import HamburgerImg from "./assets/images/hamburger.png";
import BeerImg from "./assets/images/beer.png";

//TODO: fixer le css pour les cas ou le button est disabled
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

document.addEventListener("DOMContentLoaded", () => {
  const orderMenuEl = document.getElementById("order-menu")!;
  render(listItemHtmlStr, orderMenuEl);

  document.querySelector("main")!.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const hasNameAndIdProp = "name" in target.dataset && "id" in target.dataset;

    if (hasNameAndIdProp) {
      console.log("dataset name", target.dataset.name);
      onRemove(event, reRender);
    } else {
      console.log("dataset id", target.dataset.id);
      onAdd(event, reRender);
    }

    function reRender() {
      if (uniqueMenuData.size >= 0) {
        const menuData = Array.from(uniqueMenuData);
        const totalPrice = menuData.reduce(
          (sum, currentMenu) => sum + currentMenu.price,
          0
        );
        console.log("menu data length", menuData.length);
        const menuHtmlStr =
          uniqueMenuData.size > 0
            ? `
    <h3 class="order-section__title">Your order</h3>
    <ul class="order-list"> 
      ${menuData
        .map(
          (menu) => `
          <li class="order-item">
            <span class="order-item__name">${menu.name}</span>
            <button class="order-item__remove-btn" data-name="remove-btn" data-id="${menu.id}" type="button">remove</button>
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
    <button id="complete-btn"  class="order-section__complete-btn" type="button" data-name="complete-order" disabled="${
      menuData.length === 0
    }">
        Complete order
    </button>
   `
            : "";

        render(menuHtmlStr, document.getElementById("add-order")!);
      }
    }
  });
});

function render(htmlString: string, htmlElement: HTMLElement) {
  htmlElement.innerHTML = htmlString;
  // if (htmlString && htmlElement) {
  // }
}

function onAdd(event: Event, reRender: () => void) {
  const target = event.target as HTMLElement;
  const dataId = Number(target.dataset.id);

  if (dataId > -1) {
    const foundMenu = menuArray.find((menu) => menu.id === dataId);
    foundMenu && uniqueMenuData.add(foundMenu);
  }

  console.log("target onAdd", target);
  if (target.dataset.name === "complete-order") {
    console.log("order btn");
    document.getElementById("modal")!.style.display = "block";
  }
  console.log("uniqueMenuData onAdd", uniqueMenuData);
  reRender();
}

function onRemove(event: Event, reRender: () => void) {
  const target = event.target as HTMLElement;
  const dataId = Number(target.dataset.id);

  if (dataId > -1) {
    uniqueMenuData.forEach((menu) => {
      if (menu.id === dataId) {
        uniqueMenuData.delete(menu);
      }
    });
  }

  console.log("uniqueMenuData onRemove", uniqueMenuData);
  reRender();
}
