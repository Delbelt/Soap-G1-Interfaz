import styles from "./AddButton.module.css";

interface AddButtonProps {
  title: string;
  onClick: () => void;
}

const AddButton = ({ title, onClick }: AddButtonProps) => {
  return (
    <button className={styles.AddButton} onClick={onClick}>
      {title}
    </button>
  );
};

export default AddButton;
