import styles from "./Title.module.css";

interface TitleProps {
  children: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return <h2 className={styles.titleContent}>{children}</h2>;
};

export default Title;
