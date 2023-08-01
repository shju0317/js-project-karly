import { loadStorage, saveStorage } from "../utils/storage.js";
import { getNode, getNodes } from "./getNode.js";
import { renderProductDetail } from "./index.js";



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

// 로컬 스토리지에서 최근 본 항목 값 배열로 가져오기
const recentList = JSON.parse(localStorage.getItem('recentList')) || [];

// 최근 본 이미지가 있으면 슬라이드에 이미지들 추가하기(빈 배열이 아니라면)
if(recentList.length > 0){
  recentList.forEach(srcValue => {
    const slideElement = `
      <div class="swiper-slide">
        <a href="#">
          <img class="asideSlide" src="${srcValue}" alt="">
        </a>
      </div>
    `;

    swiper4.prependSlide(slideElement);   // 스와이퍼 슬라이드 제일 앞에 넣기

  });

  // 가장 최근 본 항목이 슬라이드 제일 앞에 오게 하기
  const newSlideIndex = 0;
  swiper4.slideTo(newSlideIndex, 0, false)
}


// let productID = "";


async function clickHandler(e){
	// e.preventDefault();


	// 클릭한게 슬라이드 영역이면
  if(e.target.tagName === 'IMG' || e.target.closest('.swiper-slide')){

    const slideElement = e.target.closest('.swiper-slide') || e.target;
    const srcValue = slideElement.querySelector('img').getAttribute('src');
    let productID = slideElement.querySelector('.productID').textContent;
		console.log(productID);
		// localStorage.setItem('productID', productID);

		saveStorage('src', srcValue)
		saveStorage('productID', productID);

		// renderProductDetail(productDetail, productID);

		const recentList = JSON.parse(localStorage.getItem('recentList')) || [];
    const sameImageIndex = recentList.findIndex((src) => {
      return src === srcValue;
    });

    if (sameImageIndex !== -1) {
      // 이미 있는 이미지면 삭제
      recentList.splice(sameImageIndex, 1);
    } 



    // 배열에 추가
    recentList.push(srcValue);

    // 로컬스토리지에 배열로 저장
    localStorage.setItem('recentList', JSON.stringify(recentList));

    swiper4.removeAllSlides();

    // 슬라이드에 최근 본 목록 이미지 추가
    recentList.forEach(srcValue => {

      const slideElement = `
        <div class="swiper-slide">
          <a href="${srcValue}">
            <img class="asideSlide" src="${srcValue}" alt="">
          </a>
        </div>
      `;

      swiper4.prependSlide(slideElement);

    });

    // 현재 슬라이드 인덱스 설정
		const newSlideIndex = 0;
		swiper4.slideTo(newSlideIndex, 0, false)

  }
}

swiperWrapper2.addEventListener('click', clickHandler)
swiperWrapper3.addEventListener('click', clickHandler)
