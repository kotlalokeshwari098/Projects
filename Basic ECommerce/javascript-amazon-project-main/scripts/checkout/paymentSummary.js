// Main idea of Javascript
// save the data(Model)
// generate the HTML(view)
// 3.make it interactive(controller)


import { cart } from "../../data/cart.js"
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import {formatCurrency}
from "../utils/money.js";
import { calculateCartQuantity } from "../../data/cart.js";
import { addOrder } from "../../data/orders.js";



export function renderPaymentSummary(){
    let productPriceCents=0;
    let shippingPriceCents=0;
    let items=0

    cart.forEach(cartItem => {
       const matchingProduct=getProduct(cartItem.productId);
       productPriceCents+=matchingProduct.priceCents * cartItem.quantity;
       
       const deliveryOption=getDeliveryOption(cartItem.deliveryOptionId);
       shippingPriceCents+=deliveryOption.priceCents;
    });
    items=calculateCartQuantity();
   console.log(productPriceCents);
   console.log(shippingPriceCents);
   const totalBeforeTaxCents=productPriceCents+shippingPriceCents;
   const taxCents=totalBeforeTaxCents*0.1;
   const totalCents=totalBeforeTaxCents+taxCents;

   const paymentSummaryHTML=` <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${items}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>`


          document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;

          document.querySelector('.js-place-order').addEventListener('click', async()=>{
            try{
              const response=await fetch('https://supersimplebackend.dev/orders',{
                method:'POST',
                headers:{
                    'content-Type':'application/json'
                },
                body:JSON.stringify({
                  cart: cart
                })
              });
             const order= await response.json();
             addOrder(order);
            }catch(error){
                console.log('unexpected error try again later')
            }
            
            window.location.href='orders.html'
          })

}
// to send data in a request we need to use a different type of request there are 4 types they are 
// GET-get something from backend
// POST-create something here it lets us to send data to backend
//  PUT-update something
//  DELETE-delete something
// headers gives the backend more information about our request
// body is the actual data we need to send to backend and send in form of json string form only not in object form



