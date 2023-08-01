import { getNode, bindEvent, insertFirst } from '../../lib/index.js';


/* 상품 수량 불러오기 및 렌더링 */
export function renderProductQuantity(itemList) {
  const bestProductQuantity = getNode('.bestProductQuantity');

  let quantity = bestProductQuantity.textContent;
  quantity = `총 ${itemList.length}건`;
  insertFirst(bestProductQuantity, quantity);
}


/* 상품 정보 생성 */
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
        <button class="absolute right-4 top-64">
            <img src="./assets/icons/cart.svg" alt="장바구니 아이콘" />
        </button>
        <figcaption class="flex flex-col gap-2">
          <span class="hidden">${item.id}</span>
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


/* 선택한 상품 이름 불러오기 */
const productList = getNode('.productList');

// let productID = bindEvent(productList,'click',(item)=>{
//   const figure = item.target.closest('figure');
//   return figure.querySelector('figcaption > span').textContent;
//   // figure.childNodes[1].alt;
//   console.log(productID);
//   }
//   )

//   console.log(productID);

export function selectedProduct(target){

  console.log(target);
}


/* 상품 상세정보 생성 */
function createProductDetail(id){

  const template = /*html*/ `
  <section >
    <img src="./assets/bacon/thumbnail.jpg" alt="베이컨" class="w-[900px]"/>
  </section>
  <section class="flex flex-col">
      <div class="flex flex-col gap-4 mb-5">
        <span class="text-xl font-bold">샛별배송</span>
        <span class="text-[28px] text-black font-semibold">[풀무원] 탱탱쫄면 (4개입)</span>
        <span class="text-grey1">튀기지 않아 부담 없는 매콤함</span>
        <span class="text-3xl text-black font-semibold">4,980<span class="text-base ml-1">원</span></span>
        <span class="text-violet font-semibold">로그인 후, 적립 혜택이 제공됩니다.</span>
      </div> 
      <table class="text-left text-xs">
        <tr class="border-t-1px border-b-1px">
          <th class="font-semibold w-36">배송</th>
          <td class="py-4">샛별배송</br>23시 전 주문 시 내일 아침 7시 전 도착</br>(대구 부산 울산 샛별배송 운영시간 별도 확인)</td>
        </tr>
        <tr class="border-b-1px">
          <th class="font-semibold">판매자</th>
          <td class="py-4">칼리</td>
        </tr>
        <tr class="border-b-1px">
          <th class="font-semibold">포장타입</th>
          <td class="py-4">상온 (종이포장)</td>
        </tr>   
        <tr class="border-b-1px">
          <th class="font-semibold">판매단위</th>
          <td class="py-4">1봉</td>
        </tr>
        <tr class="border-b-1px">
          <th class="font-semibold">중량/용량</th>
          <td class="py-4">123g*4봉</td>
        </tr>
        <tr class="border-b-1px">
          <th class="font-semibold">원산지</th>
          <td class="py-4">상세페이지 별도표기</td>
        </tr>
        <tr class="border-b-1px">
          <th class="font-semibold">알레르기정보</th>
          <td class="py-4">
            <ul class="list-['-']">
              <li class="">대두, 밀, 쇠고기 함유</li>
              <li>계란, 우유, 메밀, 땅콩, 고등어, 게, 돼지고기, 새우, 복숭아, 토마토를 사용한 제품과 같은 제조시설에서 제조</li>
            </ul>
          </td>
        </tr>
        <tr class="border-b-1px">
          <th class="font-semibold">상품선택</th>
          <td class="flex justify-between items-end px-4 py-4 border my-4">
            <div>
              <span>[풀무원] 탱탱쫄면 (4개입)</span>
              <div class="flex justify-center w-[84px] align-middle mt-3 border">
                <button><img src="./assets/icons/minus.svg" alt="감소" /></button>
                <span class="px-2 py-1 text-black font-semibold text-base">1</span>
                <button><img src="./assets/icons/plus.svg" alt="증가" /></button>
              </div>
            </div>
            <span class="text-black font-semibold">4,980원</span>
          </td>
        </tr> 
      </table>
  <section class="text-right py-7 font-semibold text-black">
    <div>총 상품금액:<span class="ml-4 text-3xl mr-1">4,980</span>원</div>
    <div><span class="bg-orange text-xs text-white px-2 py-1 rounded-xl font-normal">적립</span>
      로그인 후, 적립 혜택 제공</div>
  </section>
    <section class="flex gap-3">
      <button><img src="./assets/icons/like.svg" alt="찜하기" /></button>
      <button><img src="./assets/icons/bell.svg" alt="알림" /></button>
      <button class="bg-violet text-white rounded-sm w-[560px]">장바구니 담기</button>
    </section>
  </section>
  `

  return template;
}



/* 상품정보 렌더링 */
export function renderProduct(target, data){
  // console.log(target.className.includes('productList'));

    insertFirst(target, createProduct(data))

  // if(target.className.includes('productList')){ 
  //   insertFirst(target, createProduct(data))
  // }else if(target.className.includes('productDetail')){
  //   insertFirst(target, createProductDetail(data))
  // }

}




