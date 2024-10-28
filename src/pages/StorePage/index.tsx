import AddButton from "components/AddButton";
import CardListView from "components/CardListView";
import Container from "components/Container";
import Navbar from "components/Navbar";
import Title from "components/Title";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllStoreByActive } from "services/StoreServices";
import { formatIsActive } from "utils/Helpers";

interface Store {
  code: string;
  active: boolean;
}

const StoreContent: Store[] = [
  {
    code: "1111",
    active: true,
  },
  {
    code: "2222",
    active: true,
  },
  {
    code: "3333",
    active: true,
  },
  {
    code: "4444",
    active: true,
  },
  {
    code: "5555",
    active: true,
  },
  {
    code: "6666",
    active: true,
  },
  {
    code: "7777",
    active: true,
  },
];

const StorePage = () => {
  const navigate = useNavigate();

  const [store, setStore] = useState<Store[]>([]);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    navigate(`/dashboard/Stores/${id}`);
  };

  const handleAddStore = () => {
    navigate("/dashboard/Stores/create");
  };

  useEffect(() => {
    GetAllStoreByActive()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.content);
        setStore(data.content);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Container direction='column'>
        <Container position='right'>
          <AddButton title='Agregar Tienda' onClick={handleAddStore} />
        </Container>
        <Container direction='row' wrap='wrap'>
          {store.map((store) => {
            return (
              <CardListView
                title={`Tienda: ${store.code}`}
                key={store.code}
                onClick={(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  handleOnClick(evt, store.code)
                }
              >
                <Title>Codigo: {store.code}</Title>
                <Title>Activo: {formatIsActive(store.active)}</Title>
              </CardListView>
            );
          })}
        </Container>
      </Container>
    </div>
  );
};

export default StorePage;
