import { getNode } from './getNode.js';

// 이메일정규식
function emailReg(text){
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return reg.test(String(text).toLowerCase())
}
// 비밀번호 정규식
function passwordReg(text){
  const reg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return reg.test(String(text).toLowerCase());
}

// 휴대폰
function phoneReg(text){
  const reg = /^(010{1})[0-9]{3,4}[0-9]{4}$/;
  return reg.test(String(text));
}

// 생년월일
// function birthReg(text){
//   const reg = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
//   return reg.text(Number(text));
// }

const userEmail = getNode('.user-email');
const userPassword = getNode('.user-password');
const passwordConfirm = getNode('.confirm-password');
const userPhone = getNode('.user-phone');
const userBirthDay = getNode('.user-birthday')

// 이메일 유효성검사
function emailCheck(){
  
  let emailValue = userEmail.value;

  const emailError = getNode('.email-error');

  if(!emailReg(emailValue)){
    emailError.classList.remove('invisible')
  }else {
    emailError.classList.add('invisible')
  }
}

// 비밀번호
function passwordCheck(){
  let pwValue = userPassword.value;

  const pwEerror = getNode('.password-error');

  if(!passwordReg(pwValue)){
    pwEerror.classList.remove('invisible')
  }else {
    pwEerror.classList.add('invisible');
  }

}

// 비밀번호 확인
function passwordConfirmCheck(){

  let pwComfirmValue = passwordConfirm.value;

  if(pwComfirmValue !== userPassword.value){
    pwCheckError.classList.remove('invisible')
  }else {
    pwCheckError.classList.add('invisible');
  }
}

// 전화번호
function phoneNumberCheck(){

  let phoneNumber = userPhone.value;

  const numberError = getNode('.phoneNumber-error')

  if(!phoneReg(phoneNumber)){
    numberError.classList.remove('invisible')
  }else {
    numberError.classList.add('invisible');
  }
}

// 생년월일
function birthdayCheck(){
  let date = userBirthDay.value;

  
  if(!date || date.replace(/[^0-9]/g,'') == ''){
    console.log('틀렸음');
  }
}


userEmail.addEventListener('input', emailCheck);

userPassword.addEventListener('input', passwordCheck);
passwordConfirm.addEventListener('input', passwordConfirmCheck);

userPhone.addEventListener('input', phoneNumberCheck)

userBirthDay.addEventListener('input', birthdayCheck)



const addressButton = getNode('#address-search');

// 주소 API
function addressSearch() {

  const postcode = getNode('#postcode');
  const extraAddress = getNode('#extraAddress');
  const address = getNode('#address');
  const detailAddress = getNode('#detailAddress');
  const modalNone = getNode('.address-modal-none');

  new daum.Postcode({
    oncomplete: function(data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    extraAddress.value = extraAddr;
                
                } else {
                  extraAddress.value = '';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                postcode.value = data.zonecode;
                address.value = addr;
                // 커서를 상세주소 필드로 이동한다.
                detailAddress.focus();

                if(postcode.value !== ''){ 
                  console.log(modalNone.style.display);
                  modalNone.classList.add('address-modal') 
                  modalNone.classList.remove('address-modal-none') 
                }else {
                  modalNone.classList.add('address-modal-none');
                }
            }
            
            
          }).open(); 


  
  
  
}

addressButton.addEventListener('click', addressSearch)