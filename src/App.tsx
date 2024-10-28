import styles from "./App.module.css";
import AppRouter from "routes/AppRouter";

const App = () => {
  return (
    <div className={styles.appMain}>
      <AppRouter />
    </div>
  );
};

export default App;
