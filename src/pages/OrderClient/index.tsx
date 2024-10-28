import AddButton from "components/AddButton";
import CardListView from "components/CardListView";
import Container from "components/Container";
import Navbar from "components/Navbar";
import Title from "components/Title";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllOrder, GetAllOrderFilter, GetFilterByUser } from "services/OrderServices";
import { formatDate } from "utils/Helpers";

import styles from "./Order.module.css";
import FormClient from "./components/OrderClientDetails/FormClient";

const OrderClient = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<purchaseOrder[]>([]);

  const [viewFilter, setViewFilter] = useState<boolean>(false);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    // navigate(`/dashboard/orders/${id}`);
    setViewFilter((value) => !value);
  };

  const handleAddOrder = () => {
    // navigate("/dashboard/orders/new-order");
    setViewFilter((value) => !value);
  };

  useEffect(() => {
    GetFilterByUser()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        GetAllOrderFilter()
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setOrders(data);
          });
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Container direction='row' classname={styles.containerPrincipal}>
        <Container position='right' direction='column'>
          <AddButton title='Filtrar' onClick={handleAddOrder} />
          {viewFilter && (
            <div className={styles.containerFilter}>
              <FormClient />
            </div>
          )}
        </Container>
        <Container direction='row' wrap='wrap' classname={styles.containerList}>
          {orders.map((order) => {
            return (
              <CardListView
                viewFirstButton={false}
                viewSecondButton={false}
                title={`Orden: ${order.idPurchaseOrder}`}
                key={order.idPurchaseOrder}
                onClick={(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  handleOnClick(evt, order.idPurchaseOrder)
                }
              >
                <Title>Estado: {order.state}</Title>
                <Title>Observaciones: {order.observations}</Title>
                <Title>Solicitud: {formatDate(order.requestDate)}</Title>
                <span className={styles.listLineBreak}></span>
                {order.items.map((item, index) => {
                  return (
                    <Title>
                      Item {index + 1}: {item.code}
                    </Title>
                  );
                })}
              </CardListView>
            );
          })}
        </Container>
      </Container>
    </div>
  );
};

export default OrderClient;
