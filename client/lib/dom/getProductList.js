import { tiger } from "../utils/tiger.js";
import { getNode } from "./getNode.js";
import { insertFirst } from "./insert.js";



export function createProduct(item){
	if(item.saleRatio === 0 && item.salePrice === 0){
		const template = /*html*/ `
		<div class="swiper-slide w-[250px]">
			<a href="http://localhost:5500/productDetail.html">
				<img src="./assets/${item.image.thumbnail}" alt="${item.image.alt}" />
				<div class="mt-[16px]">
					<h3 class="text-[16px]">${item.name}</h3>
					<span class="productID hidden">${item.id}</span>
					<span class="my-[8px] mt-[8px] text-[22px] font-[600]"
						>${item.price.toLocaleString()} 원</span
					>
				</div>
			</a>
			<!-- 장바구니 아이콘 -->
			<button class="absolute right-[15px] top-[258px]" data-index="${item.id}">
				<img src="./assets/icons/cart.svg" alt="장바구니 아이콘" />
			</button>
		</div>
		`
		return template;
	}
  
	else{
		const template = /*html*/ `
		<div class="swiper-slide w-[250px]">
			<a href="http://localhost:5500/productDetail.html">
				<img src="./assets/${item.image.thumbnail}" alt="${item.image.alt}" />
				<div class="mt-[16px]">
					<h3 class="text-[16px]">${item.name}</h3>
					<span class="productID hidden">${item.id}</span>
					<span
						class="my-[8px] mr-[8px] text-[22px] font-[600] text-orange"
						>${Number(item.saleRatio) * 100}%</span
					>
					<span class="my-[8px] mt-[8px] text-[22px] font-[600]"
						>${item.price.toLocaleString()} 원</span
					>
					<span
						class="my-[8px] mt-[8px] flex text-[12px] text-grey1 line-through"
						>${item.salePrice.toLocaleString()} 원</span
					>
				</div>
			</a>
			<!-- 장바구니 아이콘 -->
			<button class="absolute right-[15px] top-[258px]" data-index="${item.id}">
				<img src="./assets/icons/cart.svg" alt="장바구니 아이콘" />
			</button>
		</div>
		`
		return template;
	}
}



export function renderMainProduct(target, data){
	insertFirst(target, createProduct(data))
}


const swiperWrapper2 = getNode('.swiperWrapper2')
const swiperWrapper3 = getNode('.swiperWrapper3')

export async function renderItemList(){
  const response = await tiger.get('http://localhost:3000/products')    // promise 객체
  const sortedList = response.data;

  const itemList2 = sortedList.slice(); // itemList2와 itemList3에 복제된 itemList 할당
  const itemList3 = sortedList.slice();

  shuffle(itemList2);
  shuffle(itemList3);

  itemList2.forEach((item)=>{
    renderMainProduct(swiperWrapper2, item)
  })

  itemList3.forEach((item)=>{
    renderMainProduct(swiperWrapper3, item)
  })
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}