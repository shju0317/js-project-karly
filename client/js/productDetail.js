import { bindEvent, createProductDetail, getNode, loadStorage, renderProduct, renderProductDetail, tiger } from '../lib/index.js';
import { state } from './state.js';

/* 상품 상세정보 렌더링 */
const productList = getNode('.productList');
const productDetail = getNode('.productDetail');
// console.log(productDetail);

/* 선택한 상품 id 불러오기 */
// selectedProduct();


let productID = await loadStorage('productID')
renderProductDetail(productDetail, productID);
