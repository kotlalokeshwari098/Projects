// here use pascalcase for things that generate objects
function Cart(localStorageKey){
  const cart={
    cartItems:undefined, 
   //  same as loadFromStorage(){}
     loadFromStorage:function(){
       this.cartItems =JSON.parse(localStorage.getItem(localStorageKey));
       if(!this.cartItems){
         this.cartItems=[{
           productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
           quantity: 2,
           deliveryOptionId:'1'
         }, {
           productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
           quantity: 1,
           deliveryOptionId:'2'
         }] 
     }
     },
      saveToStorage:function() {
       localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
     
     },
     addToCart:function (productId) {
       let matchingItem;
     
       // let selectCart = document.querySelector(`.js-quantity-selector-${productId}`)
       // console.log(selectCart)
       // let cartValue = Number(selectCart.value)
     
       this.cartItems.forEach((item) => {
         if (productId === item.productId) {
           matchingItem = item;
         }
       })
       // check product is already in cart
       if (matchingItem) {
         matchingItem.quantity +=1;
       }
       // if yes increase quantity
       else {
         this.cartItems.push({
           productId,
           quantity: 1,
           deliveryOptionId:'1'
         })
       }
       this.saveToStorage();
     },
     removeFromCart:function (productId) {
       const newCart = []
     
       this.cartItems.forEach((cartItem) => {
         if (cartItem.productId !== productId) {
           newCart.push(cartItem);
         }
       })
     
       this.cartItems = newCart;
       this.saveToStorage();
     },
     calculateCartQuantity:function (){
       let cartQuantity = 0;
       this.cartItems.forEach((cartItem) => {
         cartQuantity += cartItem.quantity;
       })
       return cartQuantity;
     },
     updateDeliveryOption:function (productId,deliveryOptionId){
       let matchingItem;
     
       // let selectCart = document.querySelector(`.js-quantity-selector-${productId}`)
       // console.log(selectCart)
       // let cartValue = Number(selectCart.value)
     
       this.cartItems.forEach((item) => {
         if (productId === item.productId) {
           matchingItem = item;
         }
       })
        matchingItem.deliveryOptionId=deliveryOptionId;
     
        this.saveToStorage();
     }

};
    return cart;
}

const cart=Cart('cart-oop')
cart.loadFromStorage();


// 2nd cart for amazon bussiness website where amazon shopping clothes has one cart and bussiness has other separate cart
const businessCart= Cart('businessCart');
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);