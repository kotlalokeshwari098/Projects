import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
// import { updateCart } from "./amazon.js";
import { calculateCartQuantity } from "../../data/cart.js";

// importing external library as ESM version
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";

import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
// this is a default export

import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";

import { renderPaymentSummary } from "./paymentSummary.js";

import { renderCheckoutHeader } from "./checkoutHeader.js";

import { calculateDeliveryDate } from "../../data/deliveryOptions.js";



hello();
const today = dayjs();
// const deliveryDate = today.add(5, 'days');
// const deliveryDate = today.add(5, 'month');
const deliveryDate = today.add(1, 'day');
deliveryDate.format('dddd, MMMM D')


function isWeekend(today){
   const dayString=today.format('dddd');
  return dayString==='saturday' || dayString==='sunday';
}

// render means display on the page
export function renderOrderSummary() {


  let cartSummaryHTML = '';
  cart.forEach((cartItem) => {
    // using productid from cart to  get full info product from products.js
    const productId = cartItem.productId;
    // console.log(productId)

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId);

    let dateString=calculateDeliveryDate(deliveryOption);

    cartSummaryHTML +=

      `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link
                  " data-product-id="${matchingProduct.id}">
                    Update
                    </span>
                    <input class="quantity-input js-quantity-input">
                    <span class="save-quantity-link link-primary js-save-link"
                    data-product-id="${matchingProduct.id}">Save</span>

                  <span class="delete-quantity-link link-primary js-delete-quantity-link"
                  data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                 <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
          </div>`
  })

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let HTML = "";
    deliveryOptions.forEach((deliveryOption) => {

      let dateString=calculateDeliveryDate(deliveryOption);
// the function present in deliveryOptions.js
      const priceString = deliveryOption.priceCents
        === 0
        ? "FREE"
        : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id == cartItem.deliveryOptionId;


      HTML +=
        `<div class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
        ${isChecked ? 'checked' : ""}
           class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"> 
              <div>
                <div class="delivery-option-date">
                      ${dateString}
                </div>
                <div class="delivery-option-price">
                      ${priceString} Shipping
                </div>
              </div>
    </div>`
    });
    return HTML;
  }



  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // console.log(cartSummaryHTML);


  // the deleting is from cart so function written in cart.js
  document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      updateCartQuantity();

      renderPaymentSummary();
      // console.log("rendering payment summary")
      // after deleting the items in cart inorder to update ordersummary we are regenerating the html for that again ->>like considering the items present at that time inthe cart and updating ordersummary
    })
  })


  function updateCartQuantity() {
    
    renderCheckoutHeader();

  }


  updateCartQuantity();


  document.querySelectorAll('.js-update-quantity-link').forEach((item) => {
    item.addEventListener('click', () => {
      const productId = item.dataset.productId;
      console.log(productId);

      let container = document.querySelector(`.js-cart-item-container-${productId}`)
      console.log(container)

      container.classList.add('is-editing-quantity')
    })

  })

  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(`.js-cart-item-container-${productId}`)
      container.classList.remove('is-editing-quantity');

      let inputQuantity = document.querySelector('.js-quantity-input').value
      console.log(inputQuantity)
      document.querySelector('.quantity-label').innerHTML = inputQuantity
    })
  })

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      let { productId, deliveryOptionId } = element.dataset;
      // let  updateDeliveryOption  = element.dataset.updateDeliveryOption;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      // recursion function calling itself

      renderPaymentSummary();
    })
  })
}
