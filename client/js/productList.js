import { bindEvent, getNode, renderProduct, renderProductQuantity, tiger } from '../lib/index.js';
import { state } from './state.js';

/* 베스트 상품 목록 렌더링 */
const productList = getNode('.productList');

const response = await tiger.get('http://localhost:3000/products');
const itemList = response.data;

itemList.forEach((item) => renderProduct(productList, item))

/* 상품 수량 렌더링 (총 n건) */
renderProductQuantity(itemList);



/* 클릭한 상품 ID 불러오기 */
bindEvent(productList,'click',(item)=>{
  const figure = item.target.closest('figure');
  
  console.log('안: '+figure.querySelector('figcaption > span').textContent);
  state.id = figure.querySelector('figcaption > span').textContent;
  console.log('state.id: ' + state.id);
  localStorage.setItem('productID', state.id);
  return state.id;
  }
  )