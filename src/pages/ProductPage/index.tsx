import AddButton from "components/AddButton";
import CardListView from "components/CardListView";
import Container from "components/Container";
import Navbar from "components/Navbar";
import Title from "components/Title";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllProduct, GetAllProductByState } from "services/ProductServices";
import { formatIsActive } from "utils/Helpers";

//  nombre, código, talle, color

const ProductContent: Product[] = [
  {
    code: "1111",
    active: true,
    color: "red",
    name: "producto 1",
    size: "M",
  },
  {
    code: "2222",
    active: true,
    color: "red",
    name: "producto 2",
    size: "S",
  },
];

const ProductPage = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product[]>([]);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    navigate(`/dashboard/Products/${id}`);
  };

  const handleAddStore = () => {
    navigate("/dashboard/Products/create");
  };

  useEffect(() => {
    GetAllProductByState(true)
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
          <AddButton title='Agregar Producto' onClick={handleAddStore} />
        </Container>
        <Container direction='row' wrap='wrap'>
          {product.map((product) => {
            return (
              <CardListView
                title={`Producto: ${product.code}`}
                key={product.code}
                onClick={(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  handleOnClick(evt, product.code)
                }
              >
                <Title>Codigo: {product.code}</Title>
                <Title>Nombre: {product.name}</Title>
                <Title>Color: {product.color}</Title>
                <Title>Tamaño: {product.size}</Title>
                <Title>Activo: {formatIsActive(product.active)}</Title>
              </CardListView>
            );
          })}
        </Container>
      </Container>
    </div>
  );
};

export default ProductPage;
