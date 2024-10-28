import CardListView from "components/CardListView";
import Container from "components/Container";
import Navbar from "components/Navbar";
import Title from "components/Title";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetOrderById } from "services/OrderServices";

const initalOrder: purchaseOrder = {
  idPurchaseOrder: 0,
  observations: "",
  requestDate: "",
  state: "SOLICITADA",
  items: [],
};

const OrderClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<purchaseOrder>(initalOrder);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    navigate(`/dashboard/orders/${id}`);
  };

  useEffect(() => {
    const idOrder = Number(id);
    GetOrderById(idOrder)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.content);
        setOrder(data.content);
      });
  }, [id]);
  return (
    <div>
      <Navbar />
      <Container direction='column'>
        <CardListView
          viewFirstButton={false}
          viewSecondButton={false}
          title={`Orden: ${order.idPurchaseOrder}`}
          key={order.idPurchaseOrder}
          onClick={(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            handleOnClick(evt, order.idPurchaseOrder)
          }
        >
          <Title>Estado actual: {order.state}</Title>
        </CardListView>
        <Container direction='row' wrap='wrap'>
          {order.items?.map((item) => {
            return (
              <CardListView
                viewFirstButton={false}
                viewSecondButton={false}
                title={`Item: ${item.code}`}
                key={item.code}
                onClick={(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  handleOnClick(evt, order.idPurchaseOrder)
                }
              >
                <Title>Talle: {item.size}</Title>
                <Title>Color: {item.color}</Title>
                <Title>Cantidad: {item.quantity}</Title>
              </CardListView>
            );
          })}
        </Container>
      </Container>
    </div>
  );
};

export default OrderClientDetails;
