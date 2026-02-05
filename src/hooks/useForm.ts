import { useState } from "react";

type UserFormProps<T> = {
  initialValue: T;
};
/**
 * 회원가입 커스텀 훅
 * @returns
 */
function useForm<T>({ initialValue }: UserFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});

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

  return {
    values,
    touched,
    errors,
    getTextInputProps,
  };
}

export default useForm;
