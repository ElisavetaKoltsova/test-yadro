import { JSX, useState } from "react";
import styles from "./ItemListPage.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getItems, getItemsDataLoadingStatus } from "../../store/items-data/selectors";
import { Item } from "../../types/item";
import { setSelectedItem } from "../../store/items-data/items-data";
import { useNavigate } from "react-router";
import { AppRoute } from "../../consts";
import { ClipLoader } from "react-spinners";

export default function ItemListPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(true);

  const items = useAppSelector(getItems);
  const itemsDataLoadingStatus = useAppSelector(getItemsDataLoadingStatus);

  const inStockItems = items.filter((item) => item.inStock);

  const handleItemCardClick = (selectedItem: Item) => {
    dispatch(setSelectedItem(selectedItem));
    navigate(`${AppRoute.ItemInfoPage}/${selectedItem.id}`);
  };

  return (
    <div className={styles.listContainer}>
      <h1>Список элементов</h1>

      {/* Плавающее уведомление */}
      {showNotification && inStockItems.length > 0 && (
        <div className={styles.stockNotification}>
          <p>На складе есть товары 🟢</p>
          <button onClick={() => setShowNotification(false)}>✖</button>
        </div>
      )}
      
      {itemsDataLoadingStatus ? (
        <ClipLoader color="#8ab6d6" />
      ) : (
        <div className={styles.itemList}>
          {items.length ? (
            items.map((item: Item) => (
              <div
                key={item.id}
                className={`${styles.itemCard} ${item.inStock ? styles.glowingBorder : ""}`}
                onClick={() => handleItemCardClick(item)}
              >
                <h2>{item.name}</h2>
                <p>{item.details}</p>
              </div>
            ))
          ) : (
            <h2>Элементы не найдены</h2>
          )}
        </div>
      )}
    </div>
  );
};
