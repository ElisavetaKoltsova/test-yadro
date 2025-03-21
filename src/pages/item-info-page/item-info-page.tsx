import { JSX, useEffect } from "react";
import styles from './ItemInfoPage.module.scss';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getSelectedItem } from "../../store/items-data/selectors";
import { useNavigate, useParams } from "react-router";
import { AppRoute } from "../../consts";
import { fetchItemAction } from "../../store/api-actions";

export default function ItemInfoPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchItemAction({id}));
    }
  }, [dispatch, id]);

  const item = useAppSelector(getSelectedItem);

  return (
    <div className={styles.detailContainer}>
      <h1>Детальная информация</h1>
      <div className={styles.detailCard}>
        <h2>{item?.name}</h2>
        <p>Details: {item?.details}</p>
        <p>Functional: {item?.functional}</p>
        <p>Quantity: {item?.quantity}</p>
        <p className={item?.inStock ? styles.inStock : styles.noInStock}>{item?.inStock ? 'In stock' : 'Out of stock'}</p>
        <button className={styles.editButton} onClick={() => navigate(`${AppRoute.ItemInfoPage}/${item?.id}${AppRoute.ItemEditPage}`)}>
          Редактировать
        </button>
      </div>
    </div>
  );
}
