//here we add button listner on the buttons

import axios from 'axios';

import initAdmin from './admin';

let addToCart = document.querySelectorAll('.add-to-cart');
//let cartCounter = document.getElementById('#cart-counter');
//for updating the cart value we use ajax xeos liabrary
function updateCart(pizza) {
  axios.post('/update-cart', pizza).then((res) => {
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

initAdmin();

//change order status

let status = document.querySelectorAll('.status_line');
let order = document.querySelector('#hiddenInput')
  ? document.querySelector('#hiddenInput').value
  : null;
order = JSON.parse(order);

function updateStatus(order) {
  status.forEach((status) => {
    status.classList.remove('step-completed');
    status.classList.remove('current');
  });
  let stepCompleted = true;
  status.forEach((status) => {
    let dataProp = status.dataset.status;
    if (stepCompleted) {
      status.classList.add('step-completed');
    }
    if (dataProp === order.status) {
      stepCompleted = false;

      if (status.nextElementSibling) {
        status.nextElementSibling.classList.add('current');
      }
    }
  });
}

updateStatus(order);
