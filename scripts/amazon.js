import { cart, addCart } from "./cart.js";

let products = [];

let obj = [];

let pageHtml = ""; // Initialize the pageHtml variable

fetch("backend/products.json")
  .then((response) => response.json())
  .then((products) => {
    // Iterate over each product and build the HTML
    products.forEach((product) => {
      const HTML = `
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
                            src="images/ratings/rating-${
                              product.rating.stars * 10
                            }.png">
                        <div class="product-rating-count link-primary">
                            ${product.rating.count}
                        </div>
                    </div>

                    <div class="product-price">
                        $${product.priceCents / 100}
                    </div>

                    <div class="product-quantity-container">
                        <select>
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

                    <div class="added-to-cart">
                        <img src="images/icons/checkmark.png">
                        Added
                    </div>

                    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
                      product.id
                    }">
                        Add to Cart
                    </button>
                </div>
            `;
      // Append each product's HTML to pageHtml
      pageHtml += HTML;
    });

    // Once all products have been processed, insert the generated HTML into the DOM
    document.querySelector(".products-grid").innerHTML = pageHtml;
    function updateQuantity() {
      let cartQuantity = 0;

      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });
      console.log(cartQuantity);
      document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    }

    document.querySelectorAll(".js-add-to-cart").forEach((button) => {
      button.addEventListener("click", () => {
        // const productContainer = button.closest(".product-container"); // Find the closest parent container
        // const productName = productContainer
        //   .querySelector(".product-name")
        //   .textContent.trim(); // Get the product name text
        // console.log(`Added Product: ${productName}`);
        // console.log(button.dataset.productName);

        // console.log(button.dataset.productId);
        const productId = button.dataset.productId;

        addCart(productId);
        console.log(cart);
        updateQuantity();

        const productContainer = button.closest(".product-container");
        const addedCart = productContainer.querySelector(".added-to-cart");
        addedCart.style.opacity = 1;

        setTimeout(() => {
          addedCart.style.opacity = 0;
        }, 2000);
      });
    });
  })
  .catch((error) => console.error("Error fetching JSON:", error));
