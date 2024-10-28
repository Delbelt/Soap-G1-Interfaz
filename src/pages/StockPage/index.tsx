import AddButton from "components/AddButton";
import CardListView from "components/CardListView";
import Container from "components/Container";
import Navbar from "components/Navbar";
import Title from "components/Title";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllStock } from "services/StockServices";

interface Product {
  name: string;
  code: string;
  size: string;
  color: string;
}

interface Stock {
  code: string;
  codeStore: string;
  quantity: number;
  product: Product;
}

const StockContent: Stock[] = [
  {
    code: "ABC123",
    codeStore: "1111",
    quantity: 15,
    product: {
      code: "1111",
      color: "red",
      name: "Producto 1",
      size: "M",
    },
  },
];

const StockPage = () => {
  const navigate = useNavigate();

  const [stock, setStock] = useState<Stock[]>([]);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    navigate(`/dashboard/Stocks/${id}`);
  };

  const handleAddStore = () => {
    navigate("/dashboard/Stocks/create");
  };

  useEffect(() => {
    GetAllStock()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStock(data.content.stocks);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Container direction='column'>
        <Container position='right'>
          <AddButton title='Agregar Stock' onClick={handleAddStore} />
        </Container>
        <Container direction='row' wrap='wrap'>
          {stock.map((stock) => {
            return (
              <CardListView
                title={`Stock: ${stock.code}`}
                key={stock.codeStore}
                onClick={(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  handleOnClick(evt, stock.code)
                }
              >
                <Title>Tienda: {stock.codeStore}</Title>
                <Title>Producto: {stock.product.code}</Title>
                <Title>Nombre: {stock.product.name}</Title>
                <Title>Tamaño: {stock.product.size}</Title>
                <Title>Color: {stock.product.color}</Title>
                <Title>Cantidad: {stock.quantity}</Title>
              </CardListView>
            );
          })}
        </Container>
      </Container>
    </div>
  );
};

export default StockPage;
