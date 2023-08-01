import { getNode, bindEvent, insertFirst, tiger } from '../../lib/index.js';


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
    <a href="http://localhost:5500/productDetail.html">
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
            ${ +item.saleRatio === 0 ? '' : 
            /* html */`<span class="sr-only">할인율</span><span class="mr-2 text-2xl font-semibold text-orange">${item.saleRatio*100}%</span>`}

            ${ +item.salePrice === 0 ? 
            '': /* html */`<span class="sr-only">할인가</span><span class="text-2xl font-semibold">${item.salePrice.toLocaleString()}원</span>`}
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


//============================================================================


/* 선택한 상품 이름 불러오기 */
const productList = getNode('.productList');
const response = await tiger.get('http://localhost:3000/products');
const itemList = response.data;

/* 상품 상세정보 생성 */
export function createProductDetail(id){
  let template = '';

  if(!id){
    template = /*html*/ `
      <section class="mx-auto">
        <h1 class="text-2xl font-bold">해당 상품을 찾을 수 없습니다 :(</h1>
        <img
          src="./assets/icons/error.svg"
          alt="해당 상품을 찾을 수 없습니다"
        />
      </section>
    `
  }

  itemList.forEach((item) => {
    if(item.id === id){
      console.log('id 불러왔다!!');
      template = /*html*/ `
      <section class="flex">
        <section class="">
          <img src="./assets/${item.image.thumbnail}" alt="${item.image.alt} " />
        </section>
        <section class="flex flex-col ml-4">
          <div class="flex flex-col gap-4 mb-5">
            <span class="text-xl font-bold">샛별배송</span>
            <span class="text-[28px] text-black font-semibold">${item.name}</span>
            <span class="text-grey1">${item.description}</span>
            <div class="flex">
            ${ +item.saleRatio === 0 ? 
              '' : /* html */`<span class="sr-only">할인율</span><span class="mr-2 text-3xl font-semibold text-orange">${item.saleRatio*100}%</span>`}
            ${ +item.salePrice === 0 ? 
              '': /* html */`<span class="sr-only">할인가</span><span class="text-3xl text-black font-semibold">${item.salePrice.toLocaleString()}<span class="text-base ml-1">원</span></span>`}
            </div>
              <span class="sr-only">정가</span>
              ${+item.salePrice === 0 ? 
                /* html */`<span class="text-3xl text-black font-semibold">${item.price.toLocaleString()}원</span>` : 
                /* html */`<span class="text-base text-grey1 line-through">${item.price.toLocaleString()}원</span>`}
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
                  <span>${item.name}</span>
                  <div class="flex justify-center w-[84px] align-middle mt-3 border">
                    <button><img src="./assets/icons/minus.svg" alt="감소" /></button>
                    <span class="productCnt px-2 py-1 text-black font-semibold text-base">1</span>
                    <button><img src="./assets/icons/plus.svg" alt="증가" /></button>
                  </div>
                </div>
                <span class="totalCost text-black font-semibold">${+item.salePrice === 0 ? item.price.toLocaleString() : item.salePrice.toLocaleString()}원</span>
              </td>
            </tr> 
          </table>
      <section class="text-right py-7 font-semibold text-black">
        <div>총 상품금액:<span class="totalCost ml-4 text-3xl mr-1">${+item.salePrice === 0 ? item.price.toLocaleString() : item.salePrice.toLocaleString()}</span>원</div>
        <div><span class="bg-orange text-xs text-white px-2 py-1 rounded-xl font-normal">적립</span>
          로그인 후, 적립 혜택 제공</div>
      </section>
        <section class="flex gap-3">
          <button><img src="./assets/icons/like.svg" alt="찜하기" /></button>
          <button><img src="./assets/icons/bell.svg" alt="알림" /></button>
          <button class="bg-violet text-white rounded-sm w-[560px]">장바구니 담기</button>
        </section>
      </section>
      </section>
      <section class="">
      <ul
        class="flex h-14 justify-around border font-semibold leading-[56px] text-black text-violet"
      >
        <li>상품설명</li>
        <li>상세정보</li>
        <li>후기</li>
        <li>문의</li>
      </ul>
      <div class="pt-10">
        <img src="./assets/${item.image.view}" alt="${item.image.alt} " class="w-full"/>
        <img src="./assets/${item.image.info}" alt="${item.image.alt} " class="w-full"/>
      </div>
    </section>
      `
    }
  })
  return template;
}


export function renderProductDetail(target, id){
  insertFirst(target, createProductDetail(id));
}



//============================================================================

/* 상품 수량별 총액 계산 */
const productCnt = getNode('.productCnt');
const totalCost = getNode('.totalCost');
let productCntTextContent = 1;
// let cnt = +productCnt.textContent;
console.log('이거',productCnt);

async function fetchData() {
  try {
    // const response = await fetch('http://localhost:3000/products');
    // const jsondata = await response.json();

    // totalCost.textContent = numberComma((jsondata[index - 1].price) * productCountTextContent) + `원`;
    let cost = +totalCost.textContent;
    console.log(cost);
    // cost = cost*
    
  } catch (error) {
    console.error('Error:', error);
  }
}

const addProduct = getNode('.addProduct');

function handleCountUp() {
  ++productCntTextContent;
  productCnt.textContent = productCntTextContent;
  // fetchData();
}

// addProduct.addEventListener('click', handleCountUp);

/* 물건 갯수 빼기 */
// const removeProduct = getNode('.removeProduct')
// function handleModalCartCountDown(){
//   if(productCountTextContent > 1){
//     --productCountTextContent;
//     productCount.textContent = productCountTextContent;
//     fetchData();
//   } 
// }
// removeProduct.addEventListener('click',handleModalCartCountDown)





/* 장바구니 모달창 갯수 초기화 */
// const resetCount = getNode('.addCartModal__button');
// function handleModalCartCountReset() {
//   productCountTextContent = 1;
//   productCount.textContent = productCountTextContent;
// }
// resetCount.addEventListener('click', handleModalCartCountReset);