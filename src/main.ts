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


// render 
document.addEventListener("DOMContentLoaded", () => {
  const orderMenuEl = document.getElementById("order-menu")!;
  const { listItemStr } = getHtmlString()
  
  render(listItemStr, orderMenuEl)
  // add order

  document.addEventListener('click', onAdd)
})

function render(htmlString: string, htmlElement: HTMLElement) {
  if (htmlString && htmlElement) {
    htmlElement.innerHTML = htmlString;
  }
}


function onAdd(event: Event) {
  const target = event.target as HTMLElement
  const dataId = Number(target.dataset.id);
  if(dataId) {

  }
  return null;
}

function getHtmlString() {
  const listItemStr = `
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
            <span class="menu-item__title">${menu.name}</span>
            <span class="menu-item__ingredients">${menu.ingredients.join()}</span>
            <span class="menu-item__price">$${menu.price}</span>
        </li>
        <li>
            <div class="divider"></div>
        </li>
          `;
      })
      .join("")
    }
  </ul>
`;



  return {
    listItemStr
  };
}




