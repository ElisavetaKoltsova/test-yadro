import { JSX, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from './ItemEditPage.module.scss';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getSelectedItem, getSelectedItemDataLoadingStatus } from "../../store/items-data/selectors";
import { useNavigate, useParams } from "react-router";
import { AppRoute } from "../../consts";
import { fetchItemAction, updateItemAction } from "../../store/api-actions";
import { ClipLoader } from "react-spinners";

type FormData = {
  name: string;
  details: string;
  functional: string;
  quantity: number;
  inStock: boolean;
};

export default function ItemEditPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

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
  const selectedItemDataLoadingStatus = useAppSelector(getSelectedItemDataLoadingStatus);

  useEffect(() => {
    if (item) {
      setValue('name', item.name);
      setValue('details', item.details);
      setValue('functional', item.functional);
      setValue('quantity', item.quantity);
      setValue('inStock', item.inStock);
    }
  }, [item, setValue]);

  const onSubmit = (data: FormData) => {
    console.log(id)
    if (id) {
      dispatch(updateItemAction({
        item: {
          id,
          ...data
        }
      }));
      navigate(`${AppRoute.ItemInfoPage}/${id}`);
    }
  };

  return (
    <div className={styles.editContainer}>
      <h1>Редактирование информации</h1>
      {
        selectedItemDataLoadingStatus ?
        <ClipLoader color="#8ab6d6" /> :
        (
          <div className={styles.editCard}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.formInputContainer}>
                <label htmlFor="name">Название</label>
                <input 
                  type="text" 
                  id="name" 
                  {...register("name", { required: "Это поле обязательно" })} 
                />
                {errors.name && <p className={styles.error}>{errors.name.message}</p>}
              </div>
              
              <div className={styles.formInputContainer}>
                <label htmlFor="details">Детали</label>
                <textarea 
                  id="details" 
                  {...register("details", { required: "Это поле обязательно" })} 
                />
                {errors.details && <p className={styles.error}>{errors.details.message}</p>}
              </div>
              

              <div className={styles.formInputContainer}>
                <label htmlFor="functional">Функционал</label>
                <input 
                  type="text" 
                  id="functional" 
                  {...register("functional", { required: "Это поле обязательно" })} 
                />
                {errors.functional && <p className={styles.error}>{errors.functional.message}</p>}
              </div>
              
              <div className={styles.formInputContainer}>
                <label htmlFor="quantity">Количество</label>
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
              </div>
              
              <div className={styles.formInputContainer}>
                <label htmlFor="instock">Есть на складе?</label>
                <input 
                  type="checkbox" 
                  id="instock" 
                  {...register("inStock")} 
                />
                {errors.quantity && <p className={styles.error}>{errors.inStock?.message}</p>}
              </div>

              <button type="submit" className={styles.saveButton}>
                Сохранить
              </button>
            </form>
          </div>
        )
      }
    </div>
  );
}
