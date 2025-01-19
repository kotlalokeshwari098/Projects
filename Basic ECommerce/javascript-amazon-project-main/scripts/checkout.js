import { cart,removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
// import { updateCart } from "./amazon.js";
import { calculateCartQuantity } from "../data/cart.js";

let cartSummaryHTML='';



cart.forEach((cartItem)=>{
    // using productid from cart to  get full info product from products.js
    const productId=cartItem.productId;

    let matchingProduct;

    products.forEach((product)=>{
        if(product.id===productId){
            matchingProduct = product;
        } 
    })

    cartSummaryHTML+=

    `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${(formatCurrency(matchingProduct.priceCents))}
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"> 
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`
})

document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

// console.log(cartSummaryHTML);


// the deleting is from cart so function written in cart.js
document.querySelectorAll('.js-delete-quantity-link').forEach((link)=>{
  link.addEventListener('click',()=>{
      const productId=link.dataset.productId;
      removeFromCart(productId);
      
      const container=document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      updateCartQuantity();
    })
})


function updateCartQuantity(){

  let cartQuantity=calculateCartQuantity()

  document.querySelector('.js-return-to-home-link').innerHTML=`${cartQuantity} items`;
}

updateCartQuantity();

document.querySelectorAll('.js-update-quantity-link').forEach((item)=>{
         item.addEventListener('click',()=>{
              const productId=item.dataset.productId;
              console.log(productId);
             
              let container=document.querySelector(`.js-cart-item-container-${productId}`)
              console.log(container)
              
              container.classList.add('is-editing-quantity')



              })              

         })

document.querySelectorAll('.js-save-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId;

    const container=document.querySelector(`.js-cart-item-container-${productId}`)
    container.classList.remove('is-editing-quantity');

    let inputQuantity=document.querySelector('.js-quantity-input').value
    console.log(inputQuantity)
    document.querySelector('.quantity-label').innerHTML=inputQuantity
  })
})