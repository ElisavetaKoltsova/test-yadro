import { store } from "../store";
import { Item } from "./item";

export type ItemsData = {
  items: Item[];
  selectedItem: Item | null;
  isItemsDataLoading: boolean;
  isSelectedItemDataLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
