const formatter = new Intl.NumberFormat('zh-TW', {
  style: 'currency',
  currency: 'NTD',
  minimumFractionDigits: 0,
});

function initCart() {
  if (localStorage.number > 0) {
    document.querySelector('.count').classList.remove('hide');
    document.querySelector('.count').innerText = localStorage.number;
  } else {
    localStorage.setItem('number', 0);
  }
}

function addCart(target) {
  if (target.className == 'add-cart__btn') {
    const addToCartDOM = target.parentNode.parentNode;
    const countDOM = document.querySelector('.count');
    const product = addToCartDOM.querySelector('.id').innerText;

    if (localStorage.number < 99) {
      localStorage.setItem('number', Number(localStorage.number) + 1);
    }

    countDOM.innerText = localStorage.number;
    countDOM.classList.remove('hide');
    
    if (localStorage[`${product}`]) {
      localStorage.setItem(product, Number(localStorage[`${product}`]) + 1);
    } else {
      localStorage.setItem(product, 1);
    }
  }
}

function getCart() {
  const total = localStorage;
  let clientResult = [];
  for (item in total) {
    if (isNaN(Number(item)) == false) {
      let product = {};
      product.name = item;
      product.number = total[item];
      clientResult.push(product);
    }
  }
  fetch('/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clientResult),
  })
    .then((res) => res.json())
    .then((data) => {
      if (localStorage.number != 0) {
        renderCheck(data);
      }
    })
    .catch((err) => console.log(err));
}

function renderCheck(data) {
  const checkCart = document.querySelector('.check');
  const checkHead = document.querySelector('.container__head');
  const checkBody = document.querySelector('.container__body');
  const checkFoot = document.querySelector('.container__foot');
  const template = `
    <div></div>
    <div class="title">名&nbsp;&nbsp;稱</div>
    <div class="price">價&nbsp;&nbsp;格</div>
    <div class="quantity">數&nbsp;&nbsp;量</div>
    <div class="amount">金&nbsp;&nbsp;額</div>`;
  let total = 0;
  let amount = 0;

  // initial rendering
  checkHead.innerHTML = '';
  checkBody.innerHTML = '';
  checkFoot.innerHTML = '';

  // render head
  const headEl = document.createElement('div');
  headEl.classList.add('row');
  headEl.classList.add('head');
  headEl.innerHTML = template;
  checkHead.appendChild(headEl);

  // render body
  data.forEach((product) => {
    amount += product.price * product.quantity;
    total += Number(product.quantity);
    const bodyEl = document.createElement('div');
    bodyEl.classList.add('row');
    bodyEl.classList.add('body');
    bodyEl.setAttribute('data-id', product.id);
    const body = template
      .replace('<div></div>', '<button class="delete">刪除</button>')
      .replace('名&nbsp;&nbsp;稱', product.title)
      .replace('價&nbsp;&nbsp;格', formatter.format(product.price))
      .replace('數&nbsp;&nbsp;量', `${product.quantity} 份`)
      .replace(
        '金&nbsp;&nbsp;額',
        formatter.format(product.price * product.quantity)
      );
    bodyEl.innerHTML = body;
    checkBody.appendChild(bodyEl);
  });

  // render foot
  const footEl = document.createElement('div');
  const foot = template
    .replace('名&nbsp;&nbsp;稱', '總&nbsp;&nbsp;&nbsp;計：')
    .replace('價&nbsp;&nbsp;格', '')
    .replace('數&nbsp;&nbsp;量', `共  ${total} 份`)
    .replace('金&nbsp;&nbsp;額', formatter.format(amount));
  footEl.classList.add('row');
  footEl.classList.add('foot');
  footEl.innerHTML = foot;
  checkFoot.appendChild(footEl);

  // show checkCart modal & hide cart icon
  checkCart.classList.remove('hide');
  document.querySelector('.cart').classList.add('hide');
}

function toggleCheck(target) {
  const checkCart = document.querySelector('.check');
  const checkCartContainer = document.querySelector('.container');
  if (target == checkCart && target != checkCartContainer) {
    checkCart.classList.add('hide');
    document.querySelector('.cart').classList.remove('hide');
  }
}

function clearCart() {
  const checkCart = document.querySelector('.check');
  localStorage.clear();
  checkCart.classList.add('hide');
  document.querySelector('.cart').classList.remove('hide');
  document.querySelector('.count').classList.add('hide');
  initCart();
}

function removeProduct(target) {
  if (target.className == 'delete') {
    const id = target.parentNode.getAttribute('data-id');
    const originalQty = document.querySelector('.foot .quantity').innerText.match(/\d+/g).map(Number)[0];
    const removedItemQty = localStorage[`${id}`]
    const originalAmountArr = document.querySelector('.foot .amount').innerText.match(/\d/g).map(Number);
    const removedItemAmountArr = target.parentNode.querySelector('.amount').innerText.match(/\d/g).map(Number);

    originalAmount = '';
    removedAmount = '';
    
    originalAmountArr.forEach(number => originalAmount += number);
    removedItemAmountArr.forEach(number => removedAmount += number);
    
    document.querySelector('.foot .quantity').innerText = `共 ${Number(originalQty) - Number(removedItemQty)} 份`
    document.querySelector('.foot .amount').innerText = formatter.format(Number(originalAmount) - Number(removedAmount));
    document.querySelector('.count').innerText = localStorage.number;
    
    target.parentNode.parentNode.removeChild(target.parentNode);
    localStorage.removeItem(id);
    localStorage.number -= Number(removedItemQty);
    if (localStorage.number == 0) {
      document.querySelector('.count').classList.add('hide');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initCart();
  document.addEventListener('click', (e) => toggleCheck(e.target));
  document.querySelector('.cart').addEventListener('click', getCart);
  document.querySelector('.clear').addEventListener('click', clearCart);
  document.querySelector('.check .container').addEventListener('click', (e) => removeProduct(e.target));
  const productsDOM = document.querySelector('.products');
  if (productsDOM) {
    productsDOM.addEventListener('click', (e) => addCart(e.target));
  }
});
