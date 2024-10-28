import AddButton from "components/AddButton";
import CardListView from "components/CardListView";
import Container from "components/Container";
import Navbar from "components/Navbar";
import Title from "components/Title";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllProductByState } from "services/ProductServices";

const NewPage = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product[]>([]);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    console.log("SE AGREGO:", id);
  };

  const handleAddStore = () => {
    navigate("/dashboard/Products/create");
  };

  useEffect(() => {
    GetAllProductByState(false)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProduct(data.content.products);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Container direction='column'>
        <Container position='right'>
          <AddButton title='Agregar Novedad' onClick={handleAddStore} />
        </Container>
        <Container direction='row' wrap='wrap'>
          {product.map((product) => {
            return (
              <CardListView
                title={`Novedad: ${product.code}`}
                titleFirstButton='Agregar'
                viewSecondButton={false}
                key={product.code}
                onClick={(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  handleOnClick(evt, product.code)
                }
              >
                <Title>Codigo: {product.code}</Title>
                <Title>Nombre: {product.name}</Title>
                <Title>Color: {product.color}</Title>
                <Title>Tamaño: {product.size}</Title>
              </CardListView>
            );
          })}
        </Container>
      </Container>
    </div>
  );
};

export default NewPage;
