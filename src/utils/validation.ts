type UserInfomation = {
  email: string;
  password: string;
};

/**
 * 유효성 공통 부분 함수화
 * @param values 입력 데이터 객체
 * @returns
 */
function validateUser(values: UserInfomation) {
  const errors = {
    email: "",
    password: "",
  };

  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (!regEmail.test(values?.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  if (values?.password?.length < 8 || values?.password?.length > 20) {
    errors.password = "비밀번호는 8~20자 사이로 입력해주세요.";
  }

  return errors;
}

/**
 * 로그인 유효성
 */
function validateLogin(values: UserInfomation) {
  return validateUser(values);
}

/**
 * 회원가입 유효성
 */
function validateSignup(
  values: UserInfomation & {
    passwordConfirm: string;
  }
) {
  const errors = validateUser(values);
  const signupErrors = {
    ...errors,
    passwordConfirm: "",
  };

  if (values?.password !== values?.passwordConfirm) {
    signupErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
  }
  return signupErrors;
}

export { validateLogin, validateSignup };
