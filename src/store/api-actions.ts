import { createAsyncThunk } from "@reduxjs/toolkit"
import { Item } from "../types/item"
import { AppDispatch, State } from "../types/state";
import { AxiosInstance } from "axios";
import { APIRoute } from "../consts";

export const APIAction = {
  FETCH_ITEMS: '/items/get',
  FETCH_ITEM: '/item/get',
  UPDATE_ITEM: '/item/update'
}

export const fetchItemsAction = createAsyncThunk<Item[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_ITEMS,
  async(_arg, {extra: api}) => {
    const {data} = await api.get(APIRoute.Items);
    // localStorage.setItem('items', data);
    localStorage.items = JSON.stringify(data);
    return data;
  }
);

export const fetchItemAction = createAsyncThunk<Item, {id: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_ITEM,
  async({id}, {extra: api}) => {
    const {data} = await api.get<Item>(`${APIRoute.Items}/${id}`);
    return data;
  }
);

export const updateItemAction = createAsyncThunk<void, {item: Item}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.UPDATE_ITEM,
  async({item}, {extra: api}) => {
    await api.put<Item>(`${APIRoute.Items}/${item.id}`, item);
    // сохранение в локал сторедж
    // Получаем текущий массив из localStorage
    const items = JSON.parse(localStorage.items) || []; // Если items не существует, то будет пустой массив

    // Находим индекс элемента, который нужно обновить, по его уникальному id
    const itemIndex = items.findIndex((updatedItem: Item) => item.id === updatedItem.id);

    if (itemIndex !== -1) {
      // Если элемент найден, обновляем его данные
      items[itemIndex] = { ...items[itemIndex], ...item };
      
      // Сохраняем обновленный массив обратно в localStorage
      localStorage.setItem('items', JSON.stringify(items));
    } else {
      console.log('Item not found');
    }
  }
);
