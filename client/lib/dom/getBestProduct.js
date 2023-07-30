import { getNode } from "./getNode.js";
import { insertFirst } from "./insert.js";



/* 상품 정보 */
function createProduct(item){
		const template = /*html*/ `
    <li class="w-[250px]">
    <a href="#">
      <figure class="relative">
        <img
          src="./assets/${item.image.thumbnail}"
          alt="${item.image.alt}"
          class="mb-4 drop-shadow-md"
        />
        <button class="absolute right-4">
            <img src="./assets/icons/cart.svg" alt="장바구니 아이콘" />
        </button>
        <figcaption class="flex flex-col gap-2">
          <span>${item.name}</span>
          <div>
            <span class="sr-only">할인율</span>
            ${ +item.saleRatio === 0 ? '' : 
            /* html */`<span class="mr-2 text-2xl font-semibold text-orange">${item.saleRatio*100}%</span>`}

            <span class="sr-only">할인가</span>
            ${ +item.salePrice === 0 ? 
            '': /* html */`<span class="text-2xl font-semibold">${item.salePrice.toLocaleString()}원</span>`}
          </div>
          <span class="sr-only">정가</span>
          ${+item.salePrice === 0 ? 
            /* html */`<span class="text-2xl font-semibold">${item.price.toLocaleString()}원</span>` : 
            /* html */`<span class="text-xs text-grey1 line-through">${item.price.toLocaleString()}원</span>`}

          <span class="text-xs text-grey1">${item.description}</span>
          <div>
          ${ +item.stock > 5 ? '' : 
          /* html */`<span class="rounded bg-grey3 p-1 text-xs font-semibold text-black">한정수량</span>`}
          ${ !item.name.toLowerCase().includes("kalry") ? '' : 
          /* html */`<span class="rounded bg-grey3 p-1 text-xs font-semibold text-violet">Karly Only</span>`}
          </div>
        </figcaption>
      </figure>
    </a>
  </li>
		`
		return template;
	}

export function renderProduct(target, data){
  insertFirst(target, createProduct(data))
}


/* 상품 수량 불러오기 및 렌더링 */
export function renderProductQuantity(itemList) {
  const bestProductQuantity = getNode('.bestProductQuantity');

  let quantity = bestProductQuantity.textContent;
  quantity = `총 ${itemList.length}건`;
  insertFirst(bestProductQuantity, quantity);
}

