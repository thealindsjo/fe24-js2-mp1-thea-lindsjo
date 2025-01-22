export function filterByCategory(products, category) {
    return products.filter(product => product.category === category);
  }
  
  export function filterByPrice(products, maxPrice) {
    return products.filter(product => parseFloat(product.getDiscountedPrice()) <= maxPrice);
  }
  
  export function sortByPrice(products, ascending = true) {
    return products.sort((a, b) => {
      const priceA = parseFloat(a.getDiscountedPrice());
      const priceB = parseFloat(b.getDiscountedPrice());
  
      return ascending ? priceA - priceB : priceB - priceA;
    });
  }  
  
  export function sortByRating(products, ascending = true) {
    return products.sort((a, b) => ascending ? a.rating - b.rating : b.rating - a.rating);
  }
  