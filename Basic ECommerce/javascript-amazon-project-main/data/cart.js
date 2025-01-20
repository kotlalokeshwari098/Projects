// storing everything related to cart
export let cart =JSON.parse(localStorage.getItem('cart'));
// this cart contains whatever we push by clicking add to cart
if(!cart){
    cart=[{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId:'1'
    }, {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId:'2'
    }] 
}



function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));

}
// whenever cart updated it is saved in local storage


export function addToCart(productId) {
  let matchingItem;

  let selectCart = document.querySelector(`.js-quantity-selector-${productId}`)
  console.log(selectCart)
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
      quantity: cartValue,
      deliveryOptionId:'1'
    })
  }
  saveToStorage();
}



export function removeFromCart(productId) {
  const newCart = []

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })

  cart = newCart;
  saveToStorage();
}



export function calculateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })
  return cartQuantity;
}

