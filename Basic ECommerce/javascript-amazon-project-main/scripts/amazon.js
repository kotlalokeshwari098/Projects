
let productsHTML='';

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
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
             ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
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

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-{product.id}">
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
document.querySelector('.js-products-grid').innerHTML=productsHTML;
const addedMessageTimeouts = {};

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
     button.addEventListener('click',()=>{
      const {productId}=button.dataset;   
        // dataset gives all the data attributes attached to  button
        let matchingItem;


        cart.forEach((item)=>{
             if(productId === item.productId){
                   matchingItem=item;
             }
        })

        document.querySelector('.added-to-cart').classList.add(`js-added-to-cart-${productId}`);


        let selectCart=document.querySelector(`.js-quantity-selector-${productId}`)
        let cartValue=Number(selectCart.value)
        console.log(cartValue)
        // check product is already in cart
        if(matchingItem){
          matchingItem.quantity += cartValue;
        }
        // if yes increase quantity
        else{
          cart.push({
            productId,
            quantity:cartValue
          })
        }

       let cartQuantity=0;
        cart.forEach((cartItem)=>{
            cartQuantity+=cartItem.quantity;
        })

        document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
        console.log(cart);


        const addedMessage=document.querySelector(`.js-added-to-cart-${productId}`)
        addedMessage.classList.add('added-to-cart-visible');
        let previousTimeout=addedMessageTimeouts[productId]
        if(previousTimeout){
          clearTimeout(timeoutId)
        }
        let timeoutId=setTimeout(()=>{
          document.querySelector('.added-to-cart').classList.remove('added-to-cart-visible')
        },2000)

        addedMessageTimeouts[productId] = timeoutId;
       
     })
})


