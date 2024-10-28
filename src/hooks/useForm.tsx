import { useState } from "react";

const useForm = () => {
  const [hasError, setHasError] = useState("");
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  return { hasError, setHasError, isValidForm, setIsValidForm };
};

export default useForm;
