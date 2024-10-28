import Container from "components/Container";
import Navbar from "components/Navbar";
import { useParams } from "react-router-dom";

import styles from "./ViewStore.module.css";
import { useState } from "react";
import CardContainer from "components/CardContainer";

const ViewStore = () => {
  const { id } = useParams();

  const [hasError, setHasError] = useState("");
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <div>
      <Navbar />
      <Container direction='row' classname={styles.loginContainer}>
        <CardContainer classname={styles.customCard}>
          <div className={styles.viewFormContainer}>
            <h2>{`Tienda: ${id}`}</h2>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
              <input
                // onChange={handleOnchange}
                className={styles.loginInput}
                type='text'
                placeholder='Usuario'
                name='username'
                // value={user.username}
                autoComplete='off'
              />
              <button className={styles.loginSubmit} disabled={!isValidForm}>
                Actualizar
              </button>
            </form>
          </div>
        </CardContainer>
        {hasError && (
          <CardContainer classname={styles.loginContainerError}>{hasError}</CardContainer>
        )}
      </Container>
    </div>
  );
};

export default ViewStore;
