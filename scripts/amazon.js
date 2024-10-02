// const products = [
//   {
//     image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//     name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//     rating: {
//       star: 4.5,
//       count: 87,
//     },
//     price: 1090,
//   },
//   {
//     image: "images/products/intermediate-composite-basketball.jpg",
//     name: "Intermediate Size Basketball",
//     rating: {
//       star: 4,
//       count: 127,
//     },
//     price: 2095,
//   },
// ];

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

    document.querySelectorAll(".js-add-to-cart").forEach((button) => {
      button.addEventListener("click", () => {
        // const productContainer = button.closest(".product-container"); // Find the closest parent container
        // const productName = productContainer
        //   .querySelector(".product-name")
        //   .textContent.trim(); // Get the product name text
        // console.log(`Added Product: ${productName}`);
        // console.log(button.dataset.productName);
        const productId = button.dataset.productId;
        // console.log(button.dataset.productId);
        let matchedItem;
        cart.forEach((item) => {
          if (productId === item.productId) {
            matchedItem = item;
          }
        });
        if (matchedItem) {
          matchedItem.quantity += 1;
        } else {
          cart.push({
            productId: productId,
            quantity: 1,
          });
        }

        console.log(cart);
        let cartQuantity = 0;

        cart.forEach((item) => {
          cartQuantity += item.quantity;
          

          
        });
        console.log(cartQuantity);
        document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
      });
    });
  })
  .catch((error) => console.error("Error fetching JSON:", error));
