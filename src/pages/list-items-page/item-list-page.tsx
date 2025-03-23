import { JSX } from "react";
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

  const items = useAppSelector(getItems);
  const itemsDataLoadingStatus = useAppSelector(getItemsDataLoadingStatus);

  const handleItemCardClick = (selectedItem: Item) => {
    dispatch(setSelectedItem(selectedItem));
    navigate(`${AppRoute.ItemInfoPage}/${selectedItem.id}`);
  };

  return (
    <div className={styles.listContainer}>
      <h1>Список элементов</h1>
      {
        itemsDataLoadingStatus ?
        <ClipLoader color="#8ab6d6" /> :
        (
          <div className={styles.itemList}>
            {items && items.map((item: Item) => (
              <div key={item.id} className={styles.itemCard} onClick={() => handleItemCardClick(item)}>
                <h2>{item.name}</h2>
                <p>{item.details}</p>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
};
