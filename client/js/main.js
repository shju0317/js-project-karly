import { getProductData } from '../lib/index.js';

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


