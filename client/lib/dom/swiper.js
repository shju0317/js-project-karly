import { saveStorage } from "../utils/storage.js";
import { getNode } from "./getNode.js";



/* 메인 배너 Swiper */
export const swiper1 = new Swiper('.swiper1', {
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
export const swiper2 = new Swiper('.swiper2', {
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
export const swiper3 = new Swiper('.swiper3', {
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
export const swiper4 = new Swiper('.swiper4', {
	direction: 'vertical',
	spaceBetween: 35,
	watchOverflow: true,
	slidesPerView:3,
	navigation: {
		nextEl: '.swiperNext4',
		prevEl: '.swiperPrev4',
	},
});





const swiperWrapper2 = getNode('.swiperWrapper2')
const swiperWrapper3 = getNode('.swiperWrapper3')
const asideBox = getNode('.asideBox')

export async function clickHandler(e){
  if(e.target.tagName === 'IMG' || e.target.closest('.swiper-slide')){
		e.preventDefault(e)

    const slideElement = e.target.closest('.swiper-slide') || e.target;
    const srcValue = slideElement.querySelector('img').getAttribute('src');

		const sameImage = swiper4.slides.findIndex((slide) => {

			// 슬라이드 안의 이미지에 접근
      const img = slide.querySelector('img');
			// 클릭한 이미지랑 기존에 존재하는 이미지랑 같은지 확인
      return img.getAttribute('src') === srcValue;
    });

		// 같은 이미지가 있으면(-1이 아니면) 슬라이드 제거하기
    if (sameImage !== -1) {
      swiper4.removeSlide(sameImage);
    }


    saveStorage('src', srcValue)
    
    swiper4.prependSlide(`
      <div class="swiper-slide">
      <a href="#">
        <img class="asideSlide" src="${srcValue}" alt=""
      /></a>
      </div>`
  )
  const newSlideIndex = 0;
  swiper4.slideTo(newSlideIndex, 0, false)
  }
}

swiperWrapper2.addEventListener('click', clickHandler)
swiperWrapper3.addEventListener('click', clickHandler)


