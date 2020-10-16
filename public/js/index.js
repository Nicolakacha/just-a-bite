const formatter = new Intl.NumberFormat('zh-TW' , {
  style: 'currency',
  currency: 'NTD',
  minimumFractionDigits: 0
});

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

function countCart() {
  if (localStorage.number > 0) {
    document.querySelector('.count').classList.remove('hide');
    document.querySelector('.count').innerText = localStorage.number;
  } else {
    localStorage.setItem('number', 0);
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
        renderCart(data);
      }
    })
    .catch((err) => console.log(err));
}

function renderCart(data) {
  const checkCart = document.querySelector('.check');
  const checkHead = document.querySelector('.container__head');
  const checkBody = document.querySelector('.container__body');
  const checkFoot = document.querySelector('.container__foot');
  const template = `
  <div class="row head">
    <div class="title">名&nbsp;&nbsp;稱</div>
    <div class="price">價&nbsp;&nbsp;格</div>
    <div class="quantity">數&nbsp;&nbsp;量</div>
    <div class="amount">金&nbsp;&nbsp;額</div>
  </div>`;
  let total = 0;
  let amount = 0;

  // initial rendering
  checkHead.innerHTML = '';
  checkBody.innerHTML = '';
  checkFoot.innerHTML = '';

  // render head
  const headEl = document.createElement('div');
  headEl.innerHTML = template;
  checkHead.appendChild(headEl);

  // render body
  data.forEach((product) => {
    amount += product.price * product.quantity;
    total += Number(product.quantity);
    const bodyEl = document.createElement('div');
    const body = template
      .replace('head', '')
      .replace('名&nbsp;&nbsp;稱', product.title)
      .replace('價&nbsp;&nbsp;格', formatter.format(product.price))
      .replace('數&nbsp;&nbsp;量', product.quantity + ' 份')
      .replace('金&nbsp;&nbsp;額', formatter.format(product.price * product.quantity));
    bodyEl.innerHTML = body;
    checkBody.appendChild(bodyEl);
  });

  // render foot
  const footEl = document.createElement('div');
  const foot = template
    .replace('名&nbsp;&nbsp;稱', '總&nbsp;&nbsp;&nbsp;計：')
    .replace('價&nbsp;&nbsp;格', '')
    .replace('head', 'total')
    .replace('數&nbsp;&nbsp;量', total + ' 份')
    .replace('金&nbsp;&nbsp;額', formatter.format(amount));
  footEl.innerHTML = foot;
  checkFoot.appendChild(footEl);

  // show checkCart modal & hide cart icon
  checkCart.classList.remove('hide');
  document.querySelector('.cart').classList.add('hide');
}

function toggle(target, checkCart) {
  const checkCartContainer = document.querySelector('.container');
  if (checkCart == checkCartContainer || checkCartContainer.contains(target)) {
  } else {
    checkCart.classList.add('hide');
    document.querySelector('.cart').classList.remove('hide');
  }
}

function clearCart(checkCart) {
  localStorage.clear();
  checkCart.classList.add('hide');
  document.querySelector('.cart').classList.remove('hide');
  document.querySelector('.count').classList.add('hide');
  countCart();
}

function init() {
  countCart();
  const checkCart = document.querySelector('.check');
  document.addEventListener('click', (e) => toggle(e.target, checkCart));
  if (document.querySelector('.products')) {
    document.querySelector('.products').addEventListener('click', (e) => addCart(e.target, checkCart));
  }
  document.querySelector('.clear__cart').addEventListener('click', () => clearCart(checkCart))
  document.querySelector('.cart').addEventListener('click', getCart);
}

document.addEventListener('DOMContentLoaded', () => init());
