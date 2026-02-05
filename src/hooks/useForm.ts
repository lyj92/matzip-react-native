import { useEffect, useState } from "react";

type UserFormProps<T> = {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>; // name을 key로 하고 에러메시지를 뱉음
};
/**
 * 회원가입 커스텀 훅
 * @returns
 */
function useForm<T>({ initialValue, validate }: UserFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChangeValue = (name: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (name: keyof T) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const onChangeText = (value: string) => handleChangeValue(name, value);
    const onBlur = () => handleBlur(name);
    return { value, onChangeText, onBlur };
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return {
    values,
    touched,
    errors,
    getTextInputProps,
  };
}

export default useForm;
