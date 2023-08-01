import { attr, deleteStorage, addClass, getNodes, removeClass, addClass, getNode, getProductData, insertFirst, insertLast, loadStorage, renderItemList, renderProduct, saveStorage, tiger } from '../lib/index.js';

// console.log(getProductData(10));

/* 메인 상단 팝업 닫기 */
const headerXbutton = document.querySelector('.headerPopup__xButton');

function handleRemovePopup(){
  const headerPopup = document.querySelector('.headerPopup')
  
  headerPopup.style.transition = 'all 0.5s ease';
  headerPopup.style.opacity = 0.5;
  headerPopup.style.transform = 'translateY(-100%)';
  setTimeout(() => {
    headerPopup.remove();
  }, 200);
}
headerXbutton.addEventListener('click',handleRemovePopup)



/* 메인 카테고리 드롭 다운 */
const navCategory = getNode('.nav__category')
const categoryContainer = getNode('.categoryContainer')

function handleDropdown() {
  removeClass(categoryContainer,'hidden')
}


function handleMouseOut(){

  addClass(categoryContainer,'hidden')
}

navCategory.addEventListener('mouseover',handleDropdown)
categoryContainer.addEventListener('mouseout',handleMouseOut)



renderItemList();





/*-------------장바구니 추가 ------------------------------------------*/
const cartTotal = getNode('.cartTotal');
const addCart = getNodes('.addCart');
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
  const productName = e.target.dataset.product;

  if(button){
    if (!isModalInitialized) {
      modalClose.addEventListener('click', () => {
        addClass(addCartModal, 'hidden');
      });
  
      modalAdd.addEventListener('click', () => {
        console.log("totalCart");
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

// const addCart = getNodes('.addCart');
// addCart.forEach(cart => {
//   cart.addEventListener('click', handleAddCartModal);
// });

