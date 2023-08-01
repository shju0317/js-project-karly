import {  addClass, attr, removeClass, getNode, renderItemList, } from '../lib/index.js';


renderItemList();


/*-------------장바구니 추가 ------------------------------------------*/
const cartTotal = getNode('.cartTotal');
const swiperWrapper2 = getNode('.swiperWrapper2')
const swiperWrapper3 = getNode('.swiperWrapper3')

let totalCart = 0;

/* 모달 열릴때마다 초기화 확인 */
let isModalInitialized = false;

function handleAddCartModal(e) {
  const button = e.target.closest('button')

  const addCartModal = getNode('.addCartModalContainer');
  const modalClose = getNode('.addCartModal__button__modalClose');
  const modalAdd = getNode('.addCartModal__button__modalAdd');

  // 클릭한 대상의 data-index값 불러오기
  
  const cartIndex = e.target.closest('img')
  const index = attr(cartIndex,'alt');
  console.log(index);



  if(button){
    if (!isModalInitialized) {
      modalClose.addEventListener('click', () => {
        addClass(addCartModal, 'hidden');
      });
  
      modalAdd.addEventListener('click', () => {
        ++totalCart;
        addClass(cartTotal, 'h-6');
        addClass(cartTotal, 'w-5');
        cartTotal.textContent = `${totalCart}`;
        addClass(addCartModal, 'hidden');
      });
  
      isModalInitialized = true;
    }
    removeClass(addCartModal, 'hidden');
  }
  
}

swiperWrapper2.addEventListener('click', handleAddCartModal)
swiperWrapper3.addEventListener('click', handleAddCartModal)




// // data.json 불러오기
function loadData(index){

  fetch('/server/db/data.json')
    .then(response => response.json())
    .then(data => {
      const clickedItem = data.find(item => item.id === index)
      console.log(clickedItem);
    })
    .catch(refError)
}




// handleProductInfo()
