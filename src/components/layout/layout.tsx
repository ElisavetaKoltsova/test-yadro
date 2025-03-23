import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./Layout.module.scss";
import { AppRoute } from "../../consts";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const canGoBack = location.pathname !== AppRoute.ItemListPage;

  let nextPath = "";
  if (location.pathname === AppRoute.ItemListPage) {
    nextPath = `${AppRoute.ItemInfoPage}/1`;
  } else if (id && location.pathname === `${AppRoute.ItemInfoPage}/${id}`) {
    nextPath = `${AppRoute.ItemInfoPage}/${id}${AppRoute.ItemEditPage}`;
  }

  return (
    <div className={styles.layoutContainer}>
      <Outlet />
      <div className={styles.pagination}>
        <button onClick={() => navigate(AppRoute.ItemListPage)}>Домой</button>
        <button onClick={() => navigate(-1)} disabled={!canGoBack}>← Назад</button>
        <button onClick={() => nextPath && navigate(nextPath)} disabled={!nextPath}>Вперёд →</button>
      </div>
    </div>
  );
}
