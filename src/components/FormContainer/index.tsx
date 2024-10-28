import Container from "components/Container";
import Navbar from "components/Navbar";

import styles from "./FormContainer.module.css";
import CardContainer from "components/CardContainer";

interface FormContainerProps {
  title: string;
  children: React.ReactNode;
  handleSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
  ErrorMessage: string;
  isValidForm: boolean;
}

const FormContainer = ({
  title,
  children,
  handleSubmit,
  ErrorMessage,
  isValidForm,
}: FormContainerProps) => {
  return (
    <div>
      <Navbar />
      <Container direction='row' classname={styles.loginContainer}>
        <CardContainer classname={styles.customCard}>
          <div className={styles.viewFormContainer}>
            <h2 className={styles.formTitle}>{title}</h2>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
              {children}
              <button className={styles.loginSubmit} disabled={!isValidForm}>
                Crear
              </button>
            </form>
          </div>
        </CardContainer>
        {ErrorMessage.length > 0 && (
          <CardContainer classname={styles.loginContainerError}>{ErrorMessage}</CardContainer>
        )}
      </Container>
    </div>
  );
};

export default FormContainer;
