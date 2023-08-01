import { getNode, getNodes, removeClass, addClass, insertLast, refError } from '../lib/index.js';

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


/* 메인 배너 Swiper */
new Swiper('.swiper1', {
  keyboard: {
    enabled: true,
},
  autoplay: {
    delay:3000,
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  loop:true,
  navigation: {
    nextEl: ".swiperNext1",
    prevEl: ".swiperPrev1",
  },
})

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


// main 페이지 main 상단 슬라이더 코드
var swiper2 = new Swiper('.swiper2', {
	spaceBetween: 15,
	slidesPerView: 4,
	slidesPerGroup: 4,
	watchOverflow: true,
	keyboard: {
		enabled: true,
		onlyInViewport: false,
	},
	navigation: {
		nextEl: '.swiperNext2',
		prevEl: '.swiperPrev2',
	},
});

// main 페이지 main 하단 슬라이더 코드
var swiper3 = new Swiper('.swiper3', {
	spaceBetween: 15,
	slidesPerView: 4,
	slidesPerGroup: 4,
	watchOverflow: true,
	keyboard: {
		enabled: true,
		onlyInViewport: false,      
	},
	navigation: {
		nextEl: '.swiperNext3',
		prevEl: '.swiperPrev3',
	},
});

// main 페이지 우측 aside 슬라이더 코드 (아직 작동안됨)
var swiper4 = new Swiper('.swiper4', {
	direction: 'vertical',
	spaceBetween: 35,
	watchOverflow: true,
	slidesPerView:3,
	navigation: {
		nextEl: '.swiperNext4',
		prevEl: '.swiperPrev4',
	},
});


/*-------------장바구니 추가 ------------------------------------------*/
const cartTotal = getNode('.cartTotal');
const addCart = getNodes('.addCart');

let totalCart = 0;

/* 모달 열릴때마다 초기화 확인 */
let isModalInitialized = false;

function handleAddCartModal(e) {
  const addCartModal = getNode('.addCartModalContainer');
  const modalClose = getNode('.addCartModal__button__modalClose');
  const modalAdd = getNode('.addCartModal__button__modalAdd');
  const target = e.target
  const par = target.closest('div')
  const index = par.getAttribute('data-index');
  

  console.log(index);
  // 상품에 맞는 정보 불러오기

  





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
  logJSONData() 
  removeClass(addCartModal, 'hidden');


  
}

addCart.forEach(cart => {
  cart.addEventListener('click', handleAddCartModal);
});





// // data.json 불러오기
// const index = 

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




async function logJSONData() {
  const response = await fetch("/server/db/data.json");
  const jsonData = await response.json();
  console.log(jsonData);
}

