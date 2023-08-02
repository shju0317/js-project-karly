import { bindEvent, createProductDetail, getNode, getNodes, loadStorage, renderProduct, renderProductDetail, tiger } from '../lib/index.js';
import { state } from './state.js';

/* 상품 상세정보 렌더링 */
const productDetail = getNode('.productDetail');

const productID = localStorage.getItem('productID');
renderProductDetail(productDetail, productID);

const productID1 = await loadStorage('productID')
renderProductDetail(productDetail, productID1);


//============================================================================


/* 상품 수량별 총액 계산 */
const productCnt = getNode('.productCnt');
const totalCost = getNode('.totalCost');
const totalCost2 = getNode('.totalCost2');

let price = totalCost.textContent;
price = parseInt(price.replace(/,/g,""))

let cnt = +productCnt.textContent;

async function calcTotal(){
  try {

    let sum = price * cnt;
    totalCost.textContent = sum.toLocaleString();
    totalCost2.textContent = sum.toLocaleString();
    
  } catch (error) {
    console.error('Error:', error);
  }
}


/* 상품 수량 증가 */
const plusBtn = getNode('.plusBtn');

function handleCntUp() {
  productCnt.textContent = ++cnt;
  
  if(cnt > 10) {
    cnt = 1;
    productCnt.textContent = cnt;
  }
  calcTotal();
}

bindEvent(plusBtn, 'click', handleCntUp);

/* 상품 수량 감소 */
const minusBtn = getNode('.minusBtn');

function handleCntDown() {
  productCnt.textContent = --cnt;
  if(cnt <= 0) {
    cnt = 1;
    productCnt.textContent = cnt;
  }
  calcTotal();
}

bindEvent(minusBtn, 'click', handleCntDown);