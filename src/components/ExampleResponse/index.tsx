import styles from "./ExampleResponse.module.css";

type Status = "idle" | "loading" | "successfull" | "rejected";

interface ExampleResponseProps {
  title: string;
  handleSubmit: () => Promise<void>;
  handleStylesStatus: (
    status: string
  ) => "idle" | "loading" | "successfull" | "rejected" | "Esperando confirmacion";
  status: Status;
  handleStatus: (status: string) => string | undefined;
}

const ExampleResponse = ({
  title,
  handleSubmit,
  handleStylesStatus,
  status,
  handleStatus,
}: ExampleResponseProps) => {
  return (
    <div className={styles.appContainerColumn}>
      <h2 className={styles.appTitle}>{title}</h2>
      <div className={styles.appCard}>
        <button className={styles.appButton} onClick={handleSubmit}>
          Enviar
        </button>
        <h3 className={styles.appText}>Respuesta del servidor:</h3>
        <div className={styles.appCardStatus}>
          <h3 className={styles[handleStylesStatus(status)]}>{handleStatus(status)}</h3>
        </div>
      </div>
    </div>
  );
};

export default ExampleResponse;
