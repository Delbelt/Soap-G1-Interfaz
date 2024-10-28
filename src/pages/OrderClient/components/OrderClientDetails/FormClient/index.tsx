import { useEffect, useState } from "react";
import styles from "./FormClient.module.css";
import { PostFilterOrder } from "services/OrderServices";

const FormClient = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    from: "",
    until: "",
    state: "",
  });

  const [success, setSuccess] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");

  // Maneja el cambio en los inputs
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Maneja el submit y muestra el payload en consola
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const { name, from, until, state } = formValues;

    const payload = {
      userId: 1,
      name: name,
      startRequestDate: from,
      endRequestDate: until,
      status: state,
    };

    PostFilterOrder(JSON.stringify(payload))
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSuccess(true);
        setMessage("Filtro creado correctamente.");
      })
      .catch(() => {
        setSuccess(true);
        setMessage("Error al crear el filtro.");
      })
      .finally(() => {
        setTimeout(() => {
          setSuccess(false);
        }, 4000);
      });
  };

  useEffect(() => {
    const allFieldsFilled = Object.values(formValues).every((value) => value.trim() !== "");
    setIsValid(allFieldsFilled);
  }, [formValues]);

  return (
    <form className={styles.containerForm} onSubmit={handleSubmit}>
      <input
        className={styles.inputForm}
        type='text'
        placeholder='Nombre filtro'
        name='name'
        value={formValues.name}
        onChange={handleChange}
        autoComplete='off'
      />
      <input
        className={styles.inputForm}
        type='datetime-local'
        placeholder='Desde'
        name='from'
        value={formValues.from}
        onChange={handleChange}
        autoComplete='off'
      />
      <input
        className={styles.inputForm}
        type='datetime-local'
        placeholder='Hasta'
        name='until'
        value={formValues.until}
        onChange={handleChange}
        autoComplete='off'
      />
      <input
        className={styles.inputForm}
        type='text'
        placeholder='Estado'
        name='state'
        value={formValues.state}
        onChange={handleChange}
        autoComplete='off'
      />

      <button type='submit' className={styles.loginSubmit} disabled={!isValid}>
        Guardar
      </button>

      {success && <h2 className={styles.messageForm}>{message}</h2>}
    </form>
  );
};

export default FormClient;
