//here we add button listner on the buttons

import axios from 'axios';

let addToCart = document.querySelectorAll('.add-to-cart');
//let cartCounter = document.getElementById('#cart-counter');
//for updating the cart value we use ajax xeos liabrary
function updateCart(pizza) {
  axios.post('/update-cart', pizza).then((res) => {
    console.log(res);
    // document.getElementById('cart-counter').innerText = res.data.totalQty;
    cartCounter.innerHTML = res.data.totalQty;
  });
}

addToCart.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let pizza = JSON.parse(btn.dataset.pizza); // object to JSON conversion
    //console.log(pizza);

    updateCart(pizza);
  });
});
