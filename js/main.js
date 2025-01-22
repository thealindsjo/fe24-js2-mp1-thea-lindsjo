import { fetchProducts } from './api.js';
import { Product } from './product.js';
import { Cart } from './cart.js';
import { filterByCategory, filterByPrice, sortByPrice, sortByRating } from './filter.js';

document.addEventListener('DOMContentLoaded', async () => {
    const cart = new Cart();
    let products = (await fetchProducts()).map(productData => new Product(productData));


    let currentCategory = '';
    let currentMaxPrice = null;
    let currentSortMethod = 'price';
    let isAscending = true;

    function renderFilteredAndSortedProducts() {
        let filteredProducts = products;

        if (currentCategory) {
            filteredProducts = filterByCategory(filteredProducts, currentCategory);
        }

        if (currentMaxPrice !== null) {
            filteredProducts = filterByPrice(filteredProducts, currentMaxPrice);
        }


        if (currentSortMethod === 'price') {
            filteredProducts = sortByPrice(filteredProducts, isAscending);
        } else if (currentSortMethod === 'rating') {
            filteredProducts = sortByRating(filteredProducts, isAscending);
        }

        renderProducts(filteredProducts);
    }

    function renderProducts(productsToRender) {
        const container = document.querySelector('#product-list');
        container.innerHTML = '';
        productsToRender.forEach(product => {
            container.appendChild(product.renderProductCard(product => cart.addProduct(product)));
        });
    }

    document.querySelector('#category-filter').addEventListener('change', event => {
        currentCategory = event.target.value;
        renderFilteredAndSortedProducts();
    });

    document.querySelector('#price-filter').addEventListener('input', event => {
        currentMaxPrice = parseFloat(event.target.value) || null;
        renderFilteredAndSortedProducts();
    });

    document.querySelector('#sort-price').addEventListener('click', () => {
        currentSortMethod = 'price';
        isAscending = !isAscending; 
        renderFilteredAndSortedProducts();
    });


    document.querySelector('#sort-rating').addEventListener('click', () => {
        currentSortMethod = 'rating'; 
        isAscending = !isAscending; 
        renderFilteredAndSortedProducts();
    });


    renderFilteredAndSortedProducts();
});
