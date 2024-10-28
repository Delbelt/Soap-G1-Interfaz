import styles from "./Container.module.css";

type Position = "left" | "center" | "right";
type Direction = "row" | "column";
type Wrap = "nowrap" | "wrap";

interface ContainerProps {
  children: React.ReactNode;
  position?: Position;
  direction?: Direction;
  classname?: string;
  wrap?: Wrap;
}

const Container = ({
  children,
  position = "center",
  direction = "row",
  classname,
  wrap = "nowrap",
}: ContainerProps) => {
  const className = `${styles.containerPrincipal} ${styles[position]} ${styles[direction]} ${classname} ${styles[wrap]}`;

  return <div className={className}>{children}</div>;
};

export default Container;
