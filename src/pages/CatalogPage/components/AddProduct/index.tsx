import FormContainer from "components/FormContainer";
import useForm from "hooks/useForm";
import { AddProductByCode } from "services/CatalogServices";

const AddProduct = () => {
  const { hasError, setHasError, isValidForm, setIsValidForm } = useForm();

  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    const codeProduct = evt.target[0].value;

    AddProductByCode(codeProduct)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setHasError("Se agrego el producto al catalogo correctamente");
      });
  };

  return (
    <FormContainer
      title='Agregar producto'
      isValidForm={true}
      ErrorMessage={hasError}
      handleSubmit={handleSubmit}
    >
      <input
        // onChange={handleOnchange}
        type='text'
        placeholder='Codigo del producto'
        name='product'
        // value={user.username}
        autoComplete='off'
      />
    </FormContainer>
  );
};

export default AddProduct;
