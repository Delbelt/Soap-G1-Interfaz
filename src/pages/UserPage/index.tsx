import AddButton from "components/AddButton";
import CardListView from "components/CardListView";
import Container from "components/Container";
import Navbar from "components/Navbar";
import Title from "components/Title";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllUser } from "services/UserService";
import { formatIsActive } from "utils/Helpers";

interface User {
  id: number;
  name: string;
}

// nombre de usuario, tienda, estado

// const UserContent: User[] = [
//   {
//     id: 11,
//     code: "1111",
//     username: "user1",
//     store: "1111",
//     active: true,
//   },
// ];

const UserPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User[]>([]);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    navigate(`/dashboard/Users/${id}`);
  };

  const handleAddStore = () => {
    navigate("/dashboard/Users/create");
  };

  useEffect(() => {
    GetAllUser()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.content.users);
        setUser(data.content.users);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Container direction='column'>
        <Container position='right'>
          <AddButton title='Agregar Usuario' onClick={handleAddStore} />
        </Container>
        <Container direction='row' wrap='wrap'>
          {user.map((user) => {
            return (
              <CardListView
                title={`Usuario: ${user.id}`}
                key={user.id}
                onClick={(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  handleOnClick(evt, user.id)
                }
              >
                <Title>Usuario: {user.name}</Title>
              </CardListView>
            );
          })}
        </Container>
      </Container>
    </div>
  );
};

export default UserPage;
