import { JSX, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from './ItemEditPage.module.scss';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getSelectedItem } from "../../store/items-data/selectors";
import { useNavigate, useParams } from "react-router";
import { AppRoute } from "../../consts";
import { fetchItemAction, updateItemAction } from "../../store/api-actions";
import { Item } from "../../types/item";

type FormData = {
  name: string;
  details: string;
  functional: string;
  quantity: number;
};

export default function ItemEditPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const inStock = true;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  useEffect(() => {
    if (id) {
      dispatch(fetchItemAction({ id }));
    }
  }, [dispatch, id]);

  const item = useAppSelector(getSelectedItem);

  useEffect(() => {
    if (item) {
      setValue('name', item.name);
      setValue('details', item.details);
      setValue('functional', item.functional);
      setValue('quantity', item.quantity);
    }
  }, [item, setValue]);

  const onSubmit = (data: FormData) => {
    if (id) {
      dispatch(updateItemAction({
        item: {
          id,
          inStock,
          ...data
        }
      }));
      console.log(data)
      navigate(`${AppRoute.ItemInfoPage}/${id}`);
    }
  };

  return (
    <div className={styles.editContainer}>
      <h1>Редактирование информации</h1>
      <div className={styles.editCard}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            {...register("name", { required: "Это поле обязательно" })} 
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}

          <label htmlFor="details">Details</label>
          <textarea 
            id="details" 
            {...register("details", { required: "Это поле обязательно" })} 
          />
          {errors.details && <p className={styles.error}>{errors.details.message}</p>}

          <label htmlFor="functional">Functional</label>
          <input 
            type="text" 
            id="functional" 
            {...register("functional", { required: "Это поле обязательно" })} 
          />
          {errors.functional && <p className={styles.error}>{errors.functional.message}</p>}

          <label htmlFor="quantity">Quantity</label>
          <input 
            type="number" 
            id="quantity" 
            {...register("quantity", { 
              required: "Это поле обязательно", 
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Количество должно быть больше 0"
              }
            })} 
          />
          {errors.quantity && <p className={styles.error}>{errors.quantity.message}</p>}

          {/* добавить еще редактирование есть на складе или нет */}

          <button type="submit" className={styles.saveButton}>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
