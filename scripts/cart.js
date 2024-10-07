export let cart =JSON.parse(localStorage.getItem('cart'));


if(!cart){
  cart=[{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2
  }]
}


function setStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addCart(productId){
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
    setStorage();

}


export function removeCart(productId){
  const newCart=[];

  cart.forEach((item)=>{
    if(item.productId!=productId){
      newCart.push(item);
    }
  })

  cart=newCart;

  setStorage();

}




