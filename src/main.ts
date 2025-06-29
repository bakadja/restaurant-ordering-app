import { menuArray } from "./data"
import type { MenuArrayProps} from "./data"
import pizzaImg from "./assets/images/pizza.png"
import hamburgerImg from "./assets/images/hamburger.png"
import beerImg from "./assets/images/beer.png"


const menuEl = document.getElementById("menu")

interface ImgSrc {
    [key: string]: string
}

const imgSrc: ImgSrc = {
    "🍕" : pizzaImg,
    "🍔" : hamburgerImg,
    "🍺" : beerImg
}


const htmlString = menuArray
    .map((menu: MenuArrayProps ) => (`
     <div class="menu__content">
        <div class="menu__item">
            <img class="menu__item-img" src="${imgSrc[menu.emoji]}">
            <div class="menu__item-details">
                <ul class="menu__item-info">
                    <li class="menu__item-name">${menu.name}</li>
                    <li class="menu__item-description">${menu.ingredients.join(", ")}</li>
                    <li class="menu__item-price">$${menu.price}</li>
                </ul>
            </div>
            <button type="button" class="menu__item-add-btn">+</button>
        </div>
     
     </div> 
     
        `) )
    .join("")
 






// function pour render 
function render(element: HTMLElement, content: string) {
    if(element) element.innerHTML = content
}

render(menuEl!, htmlString)
// import typescriptLogo from './typescript.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)


// template pour afficher le header

