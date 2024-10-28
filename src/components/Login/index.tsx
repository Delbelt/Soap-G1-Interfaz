import Container from "components/Container";
import styles from "./Login.module.css";
import CardContainer from "components/CardContainer";
import { useCallback, useEffect, useState } from "react";
import { LoginAuth } from "services/AuthServices";
import { useNavigate } from "react-router-dom";

const initialUserAuth: userAuth = {
  username: "",
  password: "",
};

const Login = () => {
  const [user, setUser] = useState<userAuth>(initialUserAuth);
  const [hasError, setHasError] = useState("");
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const payload = JSON.stringify(user);

    LoginAuth(payload)
      .then((response) => {
        console.log(response);

        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.content);
          });
        }

        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.content.token);

        navigate("/dashboard");
      })
      .catch((error) => {
        setHasError(String(error));
      });
  };

  const handleOnchange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setUser((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  };

  const formValidation = useCallback(() => {
    return Boolean(user.username && user.password);
  }, [user]);

  useEffect(() => {
    setIsValidForm(formValidation());
  }, [formValidation]);

  return (
    <Container direction='column'>
      <CardContainer classname={styles.loginContainer}>
        <Container direction='column'>
          <h2>¡Bienvenido!</h2>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <input
              onChange={handleOnchange}
              className={styles.loginInput}
              type='text'
              placeholder='Usuario'
              name='username'
              value={user.username}
              autoComplete='off'
            />
            <input
              onChange={handleOnchange}
              className={styles.loginInput}
              type='password'
              placeholder='Contraseña'
              name='password'
              value={user.password}
              autoComplete='off'
            />
            <button className={styles.loginSubmit} disabled={!isValidForm}>
              Ingresar
            </button>
          </form>
          {hasError && (
            <CardContainer classname={styles.loginContainerError}>{hasError}</CardContainer>
          )}
        </Container>
      </CardContainer>
    </Container>
  );
};

export default Login;
