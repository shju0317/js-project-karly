import { getNode, removeClass, addClass } from "../index.js";

/* 메인 상단 팝업 닫기 */
const headerXbutton = document.querySelector('.headerPopup__xButton');

export function handleRemovePopup(){
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

export function handleDropdown() {
  removeClass(categoryContainer,'hidden')
}


export function handleMouseOut(){

  addClass(categoryContainer,'hidden')
}

navCategory.addEventListener('mouseover',handleDropdown)
categoryContainer.addEventListener('mouseout',handleMouseOut)
