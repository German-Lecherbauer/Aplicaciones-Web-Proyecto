import { RenderCards } from "./src/components/cards.js";
import {initLocalStorage} from "./storage/storage.js";
import { cartList } from "./src/components/cartList.js";
import { getProducts } from "./services/api.js";

initLocalStorage();

getProducts().then((products) => {
  let inputSearch = document.querySelector('#inputSearch');
  let home = document.querySelector('#home');
  home.addEventListener('click', () => {
    return RenderCards(products);
  });
  let electronics = document.querySelector('#electronics');
  electronics.addEventListener('click', () => {
    let result = products.filter((p => p.category === 'electronics'));
    return RenderCards(result);
  });
  let jewelery = document.querySelector('#jewelery');
  jewelery.addEventListener('click', () => {
    let result = products.filter((p => p.category === 'jewelery'));
    return RenderCards(result);
  });

  let mensclothing = document.querySelector('#mens-clothing');
  mensclothing?.addEventListener('click', (e) => {
  e.preventDefault();
  let result = products.filter(p => p.category === "men's clothing");
  RenderCards(result);
});

  let womensclothing = document.querySelector('#womens-clothing'); 
  womensclothing?.addEventListener('click', (e) => {
  e.preventDefault();
  let result = products.filter(p => p.category === "women's clothing");
  RenderCards(result);
});


  inputSearch.addEventListener('input', (event) => {
    console.log(event.target.value);
    let query = event.target.value;
    if (query !== ''){
      let result = products.filter((p => p.title.toLowerCase().includes(query.toLowerCase())));
      return RenderCards(result);
    }
  });
  RenderCards(products);
});

cartList();