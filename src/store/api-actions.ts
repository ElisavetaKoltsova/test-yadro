import { createAsyncThunk } from "@reduxjs/toolkit"
import { Item } from "../types/item"
import { AppDispatch, State } from "../types/state";
import { AxiosInstance } from "axios";
import { APIRoute } from "../consts";

export const APIAction = {
  FETCH_ITEMS: '/items'
}

export const fetchItemsAction = createAsyncThunk<Item[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_ITEMS,
  async(_arg, {extra: api}) => {
    const {data} = await api.get(APIRoute.Items);
    return data;
  }
);
