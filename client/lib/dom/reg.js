export function idReg(text) {
  const reg = /^[a-z]+[a-z0-9]{6,16}$/g;

  return reg.test(String(text).toLowerCase());
}

// 이메일정규식
export function emailReg(text) {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return reg.test(String(text).toLowerCase());
}
// 비밀번호 정규식
export function passwordReg(text) {
  const reg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return reg.test(String(text).toLowerCase());
}

// 휴대폰
export function phoneReg(text) {
  const reg = /^(010{1})[0-9]{3,4}[0-9]{4}$/;
  return reg.test(String(text));
}

// 생년월일
export function birthReg(text) {
  const reg =
    /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
  return reg.text(Number(text));
}
