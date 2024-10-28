import styles from "./CardListView.module.css";

interface CardListViewProps {
  title?: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  titleFirstButton?: string;
  titleSecondButton?: string;
  viewFirstButton?: boolean;
  viewSecondButton?: boolean;
}

const CardListView = ({
  title = "",
  children,
  onClick,
  titleFirstButton = "Modificar",
  titleSecondButton = "Eliminar",
  viewFirstButton = true,
  viewSecondButton = true,
}: CardListViewProps) => {
  return (
    <div className={styles.listContent}>
      <h2>{title}</h2>
      <div className={styles.listActions}>
        {viewFirstButton && (
          <button onClick={onClick} className={`${styles.listActionsButton} ${styles.update}`}>
            {titleFirstButton}
          </button>
        )}
        {viewSecondButton && (
          <button className={`${styles.listActionsButton} ${styles.delete}`}>
            {titleSecondButton}
          </button>
        )}
      </div>
      {title.length > 1 && <span className={styles.listLineBreak}></span>}
      {children}
    </div>
  );
};

export default CardListView;
