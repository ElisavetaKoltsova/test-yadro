import { JSX } from "react";
import styles from "./ItemListPage.module.scss";
import { useAppSelector } from "../../hooks";
import { getItems } from "../../store/items-data/selectors";
import { Item } from "../../types/item";

export default function ItemListPage(): JSX.Element {
  const items = useAppSelector(getItems);

  return (
    <div className={styles.listContainer}>
      <h1>Список элементов</h1>
      <div className={styles.itemList}>
        {items && items.map((item: Item) => (
          <div key={item.id} className={styles.itemCard}>
            <h2>{item.name}</h2>
            <p>{item.details}</p>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button disabled>← Назад</button>
        <button>Вперёд →</button>
      </div>
    </div>
  );
};
