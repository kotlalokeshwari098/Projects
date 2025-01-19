// storing everything related to cart
export const cart=[{
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2
},{
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1
}];
// this cart contains whatever we push by clicking add to cart


export function addToCart(productId) {
    let matchingItem;

    let selectCart = document.querySelector(`.js-quantity-selector-${productId}`)
    let cartValue = Number(selectCart.value)

    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    })
  
    // check product is already in cart
    if (matchingItem) {
      matchingItem.quantity += cartValue;
    }
    // if yes increase quantity
    else {
      cart.push({
        productId,
        quantity: cartValue
      })
    }
  }