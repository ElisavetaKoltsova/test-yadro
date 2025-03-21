import { JSX } from "react";
import styles from "./ItemListPage.module.scss";

const items = [
  { id: 1, name: "Камера Canon", details: "16MP, Zoom x10" },
  { id: 2, name: "Ноутбук Dell", details: "Intel i7, 16GB RAM" },
  { id: 3, name: "Смартфон Xiaomi", details: "AMOLED, 64MP" }
];

export default function ItemListPage(): JSX.Element {
  return (
    <div className={styles.listContainer}>
      <h1>Список элементов</h1>
      <div className={styles.itemList}>
        {items.map((item) => (
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
