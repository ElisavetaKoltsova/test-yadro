import { Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.scss";
import { AppRoute } from "../../consts";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className={styles.layoutContainer}>
      <Outlet />
      <div className={styles.pagination}>
        <button onClick={() => navigate(AppRoute.ItemListPage)}>Домой</button>
        <button disabled>← Назад</button>
        <button>Вперёд →</button>
      </div>
    </div>
  );
}
