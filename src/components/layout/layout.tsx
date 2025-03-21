import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

export default function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <Outlet />
      <div className={styles.pagination}>
        <button disabled>← Назад</button>
        <button>Вперёд →</button>
      </div>
    </div>
  );
}
