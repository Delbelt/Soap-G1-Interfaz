import useForm from "hooks/useForm";
import FormContainer from "components/FormContainer";

import styles from "./AddStock.module.css";

const AddStock = () => {
  const { hasError, setHasError, isValidForm, setIsValidForm } = useForm();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <FormContainer
      title='Crear Stock'
      isValidForm={isValidForm}
      ErrorMessage={hasError}
      handleSubmit={handleSubmit}
    >
      <input
        // onChange={handleOnchange}
        type='text'
        placeholder='Usuario'
        name='username'
        // value={user.username}
        autoComplete='off'
      />
    </FormContainer>
  );
};

export default AddStock;
