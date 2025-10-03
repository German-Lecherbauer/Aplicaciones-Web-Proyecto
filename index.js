import { RenderCards } from "./src/components/cards.js";
import {initLocalStorage} from "./storage/storage.js";
import { cartList } from "./src/components/cartList.js";
import { getProducts } from "./services/api.js";

initLocalStorage();

getProducts().then((products) => {
  let allProducts = products;
  let inputSearch = document.querySelector('#inputSearch');
  
  document.querySelector('#home').addEventListener('click', () => {
    RenderCards(allProducts);
  });

  document.querySelector('#electronics').addEventListener('click', () => {
    let result = allProducts.filter((p => p.category === 'electronics'));
    RenderCards(result);
  });

  document.querySelector('#jewelery').addEventListener('click', () => {
    let result = allProducts.filter((p => p.category === 'jewelery'));
    RenderCards(result);
  });

  document.querySelector('#mens-clothing')?.addEventListener('click', (e) => {
    e.preventDefault();
    let result = allProducts.filter(p => p.category === "men's clothing");
    RenderCards(result);
  });

  document.querySelector('#womens-clothing')?.addEventListener('click', (e) => {
    e.preventDefault();
    let result = allProducts.filter(p => p.category === "women's clothing");
    RenderCards(result);
  });

  inputSearch.addEventListener('input', (event) => {
    let query = event.target.value.toLowerCase();
    if (query !== ''){
      let result = allProducts.filter((p => p.title.toLowerCase().includes(query)));
      RenderCards(result);
    } else {
      RenderCards(allProducts);
    }
  });

  RenderCards(allProducts);
});

cartList();

const btnTop = document.querySelector('#btn-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    btnTop.style.display = 'block';
  } else {
    btnTop.style.display = 'none';
  }
});

btnTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const offcanvas = document.querySelector('#offcanvasRight');

offcanvas.addEventListener('show.bs.offcanvas', () => {
  btnTop.style.display = 'none';
});

offcanvas.addEventListener('hide.bs.offcanvas', () => {
  if (window.scrollY > 200) {
    btnTop.style.display = 'block';
  }
});
