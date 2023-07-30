import { getNode, renderProduct, renderProductQuantity, tiger } from '../lib/index.js';

/* 베스트 상품 목록 불러오기 및 렌더링 */
const productList = getNode('.productList');

const response = await tiger.get('http://localhost:3000/products');
const itemList = response.data;

itemList.forEach((item) => renderProduct(productList, item))


console.log(renderProductQuantity(itemList));

