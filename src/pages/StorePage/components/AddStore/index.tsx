import FormContainer from "components/FormContainer";
import useForm from "hooks/useForm";

import styles from "App.module.css";

const AddStore = () => {
  const { hasError, setHasError, isValidForm, setIsValidForm } = useForm();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <FormContainer
      title='Crear Tienda'
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

export default AddStore;
