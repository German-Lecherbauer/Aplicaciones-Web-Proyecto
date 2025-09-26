import { RenderCards } from "./src/components/cards.js";
import { initLocalStorage } from "./storage/storage.js";
import { cartList } from "./src/components/cartList.js";
import { getProducts } from "./services/api.js";

initLocalStorage();

getProducts().then((products) => {
  let inputSearch = document.querySelector('#inputSearch');
  let carousel = document.querySelector('#carouselExample');
  let categoryCardsSection = document.querySelector('#category-cards-section');
  let categoryTitle = document.querySelector('#category-title');
  let staticTitle = document.querySelector('#static-title');

  categoryTitle.style.display = 'none';

  //funcion para filtrar por categoria
  function showCategory(categoryName, filterName) {
    carousel.style.display = 'none';
    categoryCardsSection.style.display = 'none';

    staticTitle.style.display = 'none';
    categoryTitle.style.display = 'block';

    categoryTitle.textContent = categoryName;
    let result = products.filter(p => p.category === filterName);
    RenderCards(result);
  }

  let home = document.querySelector('#home');
  home.addEventListener('click', () => {
    carousel.style.display = 'block';
    categoryCardsSection.style.display = 'block';

    staticTitle.style.display = 'block';
    categoryTitle.style.display = 'none';

    categoryTitle.textContent = '';
    RenderCards(products);
  });

  let electronics = document.querySelector('#electronics');
  electronics.addEventListener('click', () => showCategory('Electronics', 'electronics'));

  let jewelery = document.querySelector('#jewelery');
  jewelery.addEventListener('click', () => showCategory('Jewelery', 'jewelery'));

  let mensclothing = document.querySelector('#mens-clothing');
  mensclothing?.addEventListener('click', (e) => {
    e.preventDefault();
    showCategory("Men's Clothing", "men's clothing");
  });

  let womensclothing = document.querySelector('#womens-clothing');
  womensclothing?.addEventListener('click', (e) => {
    e.preventDefault();
    showCategory("Women's Clothing", "women's clothing");
  });

  //categorias mas vistas cards
  document.querySelector('#electronics-card')?.addEventListener('click', () => showCategory('Electronics', 'electronics'));
  document.querySelector('#jewelery-card')?.addEventListener('click', () => showCategory('Jewelery', 'jewelery'));
  document.querySelector('#mens-card')?.addEventListener('click', () => showCategory("Men's Clothing", "men's clothing"));
  document.querySelector('#womens-card')?.addEventListener('click', () => showCategory("Women's Clothing", "women's clothing"));


  inputSearch.addEventListener('input', (event) => {
    console.log(event.target.value);
    let query = event.target.value;
    if (query !== '') {
      let result = products.filter((p => p.title.toLowerCase().includes(query.toLowerCase())));
      return RenderCards(result);
    }
  });

  RenderCards(products);
});

cartList();