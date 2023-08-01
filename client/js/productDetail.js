import { bindEvent, getNode, renderProduct, selectedProduct,  tiger } from '../lib/index.js';
import { state } from './state.js';


/* 상품 상세정보 렌더링 */
const productList = getNode('.productList');
const productDetail = getNode('.productDetail');
// console.log(productDetail);

/* 선택한 상품 id 불러오기 */
selectedProduct(productDetail);

// console.log('state.id: '+state.id);

localStorage.getItem('productID')
console.log(localStorage.getItem('productID'));