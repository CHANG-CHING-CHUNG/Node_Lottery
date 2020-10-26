
function iconBounce() {
  $('.order-add-cart').click(() => {
    if(!$('.cart-item-count').hasClass('display')) {
      $('.cart-item-count').addClass('display');
    }
    $('.cart-item-count').addClass('bouncing');
    setTimeout(() => {
      $('.cart-item-count').removeClass('bouncing');
    },200)
  })
}

function initIcon() {
  const cartList = JSON.parse(localStorage.getItem('cartList'));
  if( cartList ) {
    if(!$('.cart-item-count').hasClass('display')) {
      $('.cart-item-count').addClass('display');
      displayNumInIcon();
    }
  }
}



function displayNumInIcon() {
  const cartList = JSON.parse(localStorage.getItem('cartList'));
  let sum = 0;
  if( cartList ) {
    sum = cartList.map(item => item.item_quantity).reduce((acc, curr) => {
      return acc + curr
    },0)
  }
  $('.cart-item-count').text(sum);
}

function getItemObj(event) {
  const itemId = parseInt($(event.target).parent().children('.item-id').val());
  const itemName = $(event.target).parent().children('.item-name').val();
  const itemPrice = parseInt($(event.target).parent().children('.item-price').val());

  return {
    id:itemId,
    item_name:itemName,
    item_price:itemPrice,
    item_quantity:1
  }
}

function checkItemInCart(itemObj, cartList) {
  if( cartList.find((item) => {
    return item.id === itemObj.id
  })) {
    return true
  }
  return false;
}

function updateItemQuantity(itemObj,cartList) {
  const index = cartList.findIndex((item) => {
    return item.id === itemObj.id
  });
  cartList[index].item_quantity++;
  return cartList;
}

function setLocalStorage(itemObj) {
  let cartList;
  if(localStorage.getItem('cartList')) {
    cartList = JSON.parse(localStorage.getItem('cartList'));
  } else {
    cartList = [];
  }
  console.log(cartList)
  if( cartList.length && checkItemInCart(itemObj,cartList)) {
    cartList = updateItemQuantity(itemObj,cartList);
  } else {
    cartList.push(itemObj);
  }
  localStorage.setItem('cartList',JSON.stringify(cartList));
}

function addItemToCart(event) {
  if ($(event.target).is('.order-add-cart')) {
    const item = getItemObj(event);
    setLocalStorage(item)
    displayNumInIcon()
    console.log(item)
  }
}
$(document).ready(initIcon);
iconBounce();
$('.order-list').on('click' ,addItemToCart)