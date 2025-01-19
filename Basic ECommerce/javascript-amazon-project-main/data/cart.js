// storing everything related to cart
export const cart=[];

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