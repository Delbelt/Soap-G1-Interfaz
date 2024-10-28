import Container from "components/Container";
import styles from "./CardContainer.module.css";

interface CardContainerProps {
  children: React.ReactNode;
  classname?: string;
}

const CardContainer = ({ children, classname = "" }: CardContainerProps) => {
  const className = `${styles.cardContainerPrincipal} ${classname}`;

  return (
    <div className={className}>
      <Container position='center'>{children}</Container>
    </div>
  );
};

export default CardContainer;
