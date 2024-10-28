import styles from "./CardModule.module.css";

interface CardModuleProps {
  module: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CardModule = ({ module, onClick }: CardModuleProps) => {
  return (
    <button className={styles.moduleContainer} onClick={onClick}>
      {module}
    </button>
  );
};

export default CardModule;
