export class Cart {
    constructor() {
      this.items = [];
    }

    addProduct(product) {
      this.items.push(product);
    }

    getItems() {
      return this.items;
    }
  
    getTotalPrice() {
      return this.items.reduce((total, product) => total + parseFloat(product.getDiscountedPrice()), 0).toFixed(2);
    }
  }
  