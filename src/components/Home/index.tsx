import CardModule from "components/CardModule";
import Container from "components/Container";
import Navbar from "components/Navbar";

import useNavigateModule from "hooks/useNavigateModule";
import { modules } from "utils/modules";

import styles from "./Home.module.css";

const Home = () => {
  const { handleNavigate } = useNavigateModule();

  return (
    <div>
      <Navbar />
      <Container direction='column'>
        <h2>DASHBOARD</h2>
        <Container classname={styles.homeContainer}>
          {modules.map((module) => {
            return (
              <CardModule module={module.name} onClick={() => handleNavigate(module.module)} />
            );
          })}
        </Container>
      </Container>
    </div>
  );
};

export default Home;
