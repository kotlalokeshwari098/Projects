import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
// import '../data/cart-class.js'; 
// import '../data/backend-practice.js';
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";


Promise.all([
    new Promise((resolve)=>{
        loadProducts(()=>{
           resolve('value1');
           // resolve means it goes to next step that is to then(()=>) ones
        })
    }),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        })
    })

]).then((values)=>{
    console.log(values)
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
})




/*
new Promise((resolve)=>{
     loadProducts(()=>{
        resolve('value1');
        // resolve means it goes to next step that is to then(()=>) ones
     });
}).then((value)=>{
    console.log(value);
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
       
    })

}).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
})

// callbackhell
/*
loadProducts(()=>{
    loadCart(()=>{
        renderOrderSummary();
        renderPaymentSummary();
        })
})
*/
