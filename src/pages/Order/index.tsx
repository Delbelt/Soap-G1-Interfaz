import AddButton from "components/AddButton";
import CardListView from "components/CardListView";
import Container from "components/Container";
import Title from "components/Title";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllOrderByState, OrderProcessing } from "services/OrderServices";
import { formatDate } from "utils/Helpers";

const Order = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<purchaseOrder[]>([]);
  const [status, setStatus] = useState<string>("");

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    navigate(`/dashboard/orders/${id}`);
  };

  const handleOrderProcessing = () => {
    OrderProcessing()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStatus(data.content);
      })
      .catch(() => {
        setStatus("failure to process orders");
      });
  };

  useEffect(() => {
    GetAllOrderByState("SOLICITADA")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.content);
        setOrders(data.content);
      });
  }, []);

  return (
    <div>
      <Container direction='column'>
        <Container position='right'>
          <Title>{status}</Title>
          <AddButton title='Procesar ordenes' onClick={handleOrderProcessing} />
        </Container>
        <Container direction='row' wrap='wrap'>
          {orders.map((order) => {
            return (
              <CardListView
                titleFirstButton='Detalle'
                title={`Orden: ${order.idPurchaseOrder}`}
                key={order.idPurchaseOrder}
                onClick={(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  handleOnClick(evt, order.idPurchaseOrder)
                }
              >
                <Title>Estado: {order.state}</Title>
                <Title>Observaciones: {order.observations}</Title>
                <Title>Solicitud: {formatDate(order.requestDate)}</Title>
              </CardListView>
            );
          })}
        </Container>
      </Container>
    </div>
  );
};

export default Order;
