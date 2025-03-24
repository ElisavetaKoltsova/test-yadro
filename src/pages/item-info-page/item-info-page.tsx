import { JSX, useEffect } from "react";
import styles from './ItemInfoPage.module.scss';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getSelectedItem, getSelectedItemDataLoadingStatus } from "../../store/items-data/selectors";
import { useNavigate, useParams } from "react-router";
import { AppRoute } from "../../consts";
import { fetchItemAction } from "../../store/api-actions";
import { ClipLoader } from "react-spinners";

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
  const selectedItemDataLoadingStatus = useAppSelector(getSelectedItemDataLoadingStatus);

  return (
    <div className={styles.detailContainer}>
      <h1>Детальная информация</h1>
      {
        selectedItemDataLoadingStatus ?
        <ClipLoader color="#8ab6d6" /> :
        (
          <div className={styles.detailCard}>
            {
              item !== null ?
              (
                <><h2>{item?.name}</h2><p>Детали: {item?.details}</p><p>Функцилонал: {item?.functional}</p><p>Количество: {item?.quantity}</p><p className={item?.inStock ? styles.inStock : styles.noInStock}>{item?.inStock ? 'Есть на скалде' : 'Отсутствует на складе'}</p><button className={styles.editButton} onClick={() => navigate(`${AppRoute.ItemInfoPage}/${item?.id}${AppRoute.ItemEditPage}`)}>
                      Редактировать
                    </button></>
              ) :
              (
                <h2>Элемент не найден</h2>
              )
            }
          </div>
        )
      }
    </div>
  );
}
