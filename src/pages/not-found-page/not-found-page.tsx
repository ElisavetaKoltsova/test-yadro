import { JSX } from "react";
import styles from "./NotFoundPage.module.scss";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../consts";

export default function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundCard}>
        <h1>404</h1>
        <p>Страница не найдена</p>
        <button onClick={() => navigate(AppRoute.ItemListPage)}>На главную</button>
      </div>
    </div>
  );
}
