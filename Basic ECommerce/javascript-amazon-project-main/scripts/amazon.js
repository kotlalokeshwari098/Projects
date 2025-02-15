import { cart ,addToCart} from "../data/cart.js"
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

import { calculateCartQuantity } from "../data/cart.js";
// as this is common for both cart item showing in right top and checkout items so written in cart.js as it related to cart
import { loadProducts } from "../data/products.js";

loadProducts(renderProductsGrid);

function renderProductsGrid(){
let productsHTML = '';

// producing the products cards using js without writing all again
products.forEach((product) => {
  productsHTML += `
      <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
             ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container ">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
})

// putting html o the page using js
document.querySelector('.js-products-grid').innerHTML = productsHTML;
const addedMessageTimeouts = {};

// this update also done on ui of amazon so kept here
function updateCart(){

   let cartQuantity= calculateCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    // saveToCart();
}
updateCart()

// display this msg on amazon.html page so kept here
function addedToCartMessage(productId){
 
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`)
  console.log(addedMessage);
  addedMessage.classList.add('added-to-cart-visible');

  let previousTimeout = addedMessageTimeouts[productId]
  console.log(previousTimeout)
  if (previousTimeout) {
    clearTimeout(previousTimeout)
  }
  let timeoutId = setTimeout(() => {
   addedMessage.classList.remove('added-to-cart-visible')
  }, 2000)

  addedMessageTimeouts[productId] = timeoutId;
}


document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const { productId } = button.dataset;
    // dataset gives all the data attributes attached to  button

    addToCart(productId);
    // for this cart quantity will be effected so kept in cart.js file
    updateCart();
    
    addedToCartMessage(productId)
  })
})

}

