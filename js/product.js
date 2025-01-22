export class Product {
    #title; 
    #thumbnail; 
    #stock; 
    #price; 
    #discountPercentage;
    #category;
    #rating;

    constructor({ title, thumbnail, stock, price, discountPercentage, category, rating }) {
    this.#title = title;
    this.#thumbnail = thumbnail;
    this.#stock = stock;
    this.#price = price;
    this.#discountPercentage = discountPercentage;
    this.#category = category;
    this.#rating = rating;
}

getDiscountedPrice() {
    return (this.#price * (1 - this.#discountPercentage / 100)).toFixed(2);
}

updateStock(amount) {
    this.#stock = Math.max(this.#stock - amount, 0);
}

get stock() {
    return this.#stock;
}

get title() {
    return this.#title;
}

get category() {
    return this.#category;
}

get rating() {
    return this.#rating;
}

renderProductCard(onAddToCart) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const originalPrice = this.#price.toFixed(2); 
    const discountedPrice = this.getDiscountedPrice(); 

    card.innerHTML = `
        <img src="${this.#thumbnail}" alt="${this.#title}">
        <h3>${this.#title}</h3>
        <p>
            Price: <span class="original-price">$${originalPrice}</span>
            <span class="discounted-price">$${discountedPrice}</span>
        </p>
        <p>Stock: ${this.#stock}</p>
        <div><button class="add-to-cart">Add to Cart</button></div>
    `;

    card.querySelector('.add-to-cart').addEventListener('click', () => {
        if (this.#stock > 0) {
            onAddToCart(this);
            this.updateStock(1); 
            card.querySelector('p:nth-child(4)').textContent = `Stock: ${this.#stock}`;
        } 
        else {
            alert('Out of stock!');
        }
    });

    return card;
}
}
