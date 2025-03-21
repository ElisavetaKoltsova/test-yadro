import { combineReducers } from "@reduxjs/toolkit";
import { NameSpace } from "../consts";
import { itemsData } from "./items-data/items-data";

export const rootReducer = combineReducers({
  [NameSpace.Items]: itemsData.reducer
});