import { cart,removeCart } from "./cart.js";
import { products } from "./../data/products.js";

let checkoutPrice=0;
let tempCart="";
cart.forEach((cartItem) => {
  

  products.forEach((product) => {
    if (cartItem.productId == product.id) {
      // tempCart = product;
      // console.log(tempCart.name);
      // console.log(product);
      // console.log(tempCart.id);
      checkoutPrice+=product.priceCents/100*cartItem.quantity;
      tempCart+=`<div class="cart-item-container js-cart-item-container-${product.id} ">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${product.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                $${product.priceCents / 100}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${product.id}>
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
                    name="delivery-option-${product.id}">
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
                    name="delivery-option-${product.id}">
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
                    name="delivery-option-${product.id}">
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
          </div>

          `
    }
  });
});
console.log(checkoutPrice);
document.querySelector('.order-summary').innerHTML=tempCart;


document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId;
    console.log(productId);
    removeCart(productId);
    console.log(cart);

    const removedItem = document.querySelector(`.js-cart-item-container-${productId}`);
    if (removedItem) {
      removedItem.remove();
    }

    console.log(cart);
    
  });
});

