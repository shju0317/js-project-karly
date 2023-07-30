import { getProductData } from '../lib/index.js';


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

