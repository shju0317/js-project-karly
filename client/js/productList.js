import { bindEvent, getNode, renderProduct, renderProductQuantity,  selectedProduct,  tiger } from '../lib/index.js';

/* 베스트 상품 목록 렌더링 */
const productList = getNode('.productList');

const response = await tiger.get('http://localhost:3000/products');
const itemList = response.data;

itemList.forEach((item) => renderProduct(productList, item))

/* 상품 수량 렌더링 (총 n건) */
renderProductQuantity(itemList);


/* 상품 상세정보 렌더링 */
const productDetail = getNode('.productDetail');
// console.log(productDetail);

/* 선택한 상품 id 불러오기 */
// selectedProduct(productList);

// let productID = '';
// bindEvent(productList,'click',(item)=>{
//   const figure = item.target.closest('figure');
//   productID = figure.querySelector('figcaption > span').textContent;
//   console.log(productID);
//   return productID;  
//   })

// let productID = '';
// function test(){
//   bindEvent(productList,'click',(item)=>{
//     const figure = item.target.closest('figure');
//     productID = figure.querySelector('figcaption > span').textContent;
//     console.log('1: '+productID);
//     return productID;  
//   })
//   console.log('2: '+productID);
//   return productID;
// }
// test();

// console.log('여기: '+productID);

let productID = bindEvent(productList,'click',(item)=>{
    const figure = item.target.closest('figure');
    productID = figure.querySelector('figcaption > span').textContent;
    console.log('1: '+productID);
    return productID;  
  })
  // console.log('2: '+productID);
  // return productID;

console.log('여기: '+productID);