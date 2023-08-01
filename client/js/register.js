import {
  getNode,
  tiger,
  emailReg,
  idReg,
  passwordReg,
  phoneReg,
} from "../lib/index.js";

const userId = getNode(".user__id");
const userEmail = getNode(".user__email");
const userPassword = getNode(".user__password");
const passwordConfirm = getNode(".confirm__password");
const userPhone = getNode(".user__phone");
const userBirthDay = getNode(".user__birthday");

// 아이디 유효성검사
function idCheck() {
  let idValue = userId.value;
  // let idValid = false;

  const idError = getNode(".userID__error");

  if (!idReg(idValue)) {
    idError.classList.remove("invisible");
    return false;
  } else {
    idError.classList.add("invisible");
    return true;
  }
}

/*  id 중복 ------------------------  */

const idCheckButton = getNode("#idDuplicate__check");

async function handleIdButton() {
  const response = await tiger.get("http://localhost:3000/user");

  const userData = await response.data;

  console.log(userData);

  userData.forEach((user) => {
    if (user.id === userId.value) {
      alert("중복된 아이디입니다.");
    } else if (userId.value === "") {
      alert("아이디를 입력해주세요.");
    } else {
      alert("사용 가능한 아이디입니다");
    }
  });
}
idCheckButton.addEventListener("click", handleIdButton);

// 이메일 유효성검사
function emailCheck() {
  let emailValue = userEmail.value;

  const emailError = getNode(".email__error");

  if (!emailReg(emailValue)) {
    emailError.classList.remove("invisible");
    return false;
  } else {
    emailError.classList.add("invisible");
  }
}

/*  이메일 중복 ------------------------  */

const emailCheckButton = getNode("#emailDuplicate__check");

async function handleEmailButton() {
  const response = await tiger.get("http://localhost:3000/user");

  const userData = await response.data;

  userData.forEach((user) => {
    if (user.email === userEmail.value) {
      alert("중복된 이메일입니다.");
    } else if (userEmail.value === "") {
      alert("이메일을 입력해주세요.");
    } else {
      alert("사용 가능한 이메일입니다.");
    }
  });
}
emailCheckButton.addEventListener("click", handleEmailButton);

// 비밀번호
function passwordCheck() {
  let pwValue = userPassword.value;

  const pwEerror = getNode(".password__error");

  if (!passwordReg(pwValue)) {
    pwEerror.classList.remove("invisible");
    return false;
  } else {
    pwEerror.classList.add("invisible");
  }
}

// 비밀번호 확인
function passwordConfirmCheck() {
  let pwComfirmValue = passwordConfirm.value;

  const pwCheckError = getNode(".pwCheck__error");

  if (pwComfirmValue !== userPassword.value) {
    pwCheckError.classList.remove("invisible");
    return false;
  } else {
    pwCheckError.classList.add("invisible");
  }
}

// 전화번호
function phoneNumberCheck() {
  let phoneNumber = userPhone.value;

  const numberError = getNode(".phoneNumber__error");

  if (!phoneReg(phoneNumber)) {
    numberError.classList.remove("invisible");
    return false;
  } else {
    numberError.classList.add("invisible");
  }
}

// 생년월일
function birthdayCheck() {
  let dateValue = userBirthDay.value;

  const birthDayError = getNode(".birthDay__error");
  if (!dateValue || dateValue.replace(birthReg, "") === "") {
    birthDayError.classList.remove("invisible");
    return false;
  } else {
    birthDayError.classList.add("invisible");
  }
}

userId.addEventListener("input", idCheck);
userEmail.addEventListener("input", emailCheck);

userPassword.addEventListener("input", passwordCheck);
passwordConfirm.addEventListener("input", passwordConfirmCheck);

userPhone.addEventListener("input", phoneNumberCheck);

userBirthDay.addEventListener("input", birthdayCheck);

const addressButton = getNode("#address__search");

// 주소 API
function addressSearch() {
  const postcode = getNode("#postcode");
  const extraAddress = getNode("#extraAddress");
  const address = getNode("#address");
  const detailAddress = getNode("#detailAddress");
  const modalNone = getNode(".address__modal__none");

  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        extraAddress.value = extraAddr;
      } else {
        extraAddress.value = "";
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      postcode.value = data.zonecode;
      address.value = addr;
      // 커서를 상세주소 필드로 이동한다.
      detailAddress.focus();

      // 주소 입력 시 div open
      if (postcode.value !== "") {
        modalNone.classList.add("address__modal");
        modalNone.classList.remove("address__modal__none");
      } else {
        modalNone.classList.add("address__modal__none");
      }
    },
  }).open();
}

addressButton.addEventListener("click", addressSearch);

// 약관동의 체크

// 회원가입

const joinButton = getNode("#registerButton");

function handlerJoin(e) {
  e.preventDefault();

  const postcode = getNode("#postcode");

  if (
    userId.value == "" ||
    userEmail.value == "" ||
    userPassword.value == "" ||
    passwordConfirm.value == "" ||
    userPhone.value == "" ||
    postcode.value == ""
  ) {
    alert("필수 입력 사항을 입력해주세요.");
  } else {
    window.location.href = "index.html";
  }
}

joinButton.addEventListener("click", handlerJoin);
