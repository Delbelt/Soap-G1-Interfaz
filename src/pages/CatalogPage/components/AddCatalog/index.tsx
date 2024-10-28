import FormContainer from "components/FormContainer";
import useForm from "hooks/useForm";

const AddCatalog = () => {
  const { hasError, setHasError, isValidForm, setIsValidForm } = useForm();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <FormContainer
      title='Crear Catalogo'
      isValidForm={isValidForm}
      ErrorMessage={hasError}
      handleSubmit={handleSubmit}
    >
      <input
        // onChange={handleOnchange}
        type='text'
        placeholder='Nombre del catalogo'
        name='username'
        // value={user.username}
        autoComplete='off'
      />
    </FormContainer>
  );
};

export default AddCatalog;
