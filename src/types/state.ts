import { store } from "../store";
import { Item } from "./item";

export type ItemsData = {
  items: Item[];
};


export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
