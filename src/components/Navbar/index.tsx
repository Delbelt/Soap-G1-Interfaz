import Container from "components/Container";
import styles from "./Navbar.module.css";
import { modules } from "utils/modules";
import useNavigateModule from "hooks/useNavigateModule";

const Navbar = () => {
  const { handleNavigate, loginNavigate, handleNavigateProvider, handleNavigateDashboard } =
    useNavigateModule();

  const handleLogout = () => {
    localStorage.removeItem("token");

    loginNavigate();
  };

  return (
    <Container position='right' classname={styles.navbarContainer}>
      <div className={styles.navbarPrincipal}>
        <div>
          <button className={styles.navbarPages} onClick={() => handleNavigateDashboard()}>
            Dashboard
          </button>
        </div>
      </div>

      {modules.map((module) => {
        return (
          <button
            key={module.name}
            className={styles.navbarPages}
            onClick={() => handleNavigate(module.module)}
          >
            {module.name}
          </button>
        );
      })}

      <button className={styles.navbarLogout} onClick={handleLogout}>
        Salir
      </button>
    </Container>
  );
};

export default Navbar;
