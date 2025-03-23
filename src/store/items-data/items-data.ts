import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemsData } from "../../types/state";
import { NameSpace } from "../../consts";
import { fetchItemAction, fetchItemsAction, updateItemAction } from "../api-actions";
import { Item } from "../../types/item";

const initialState: ItemsData = {
  items: JSON.parse(localStorage.items),
  selectedItem: null,
  isItemsDataLoading: false,
  isSelectedItemDataLoading: false
};

export const itemsData = createSlice({
  name: NameSpace.Items,
  initialState,
  reducers: {
    setSelectedItem: (state, action: PayloadAction<Item>) => {
      state.selectedItem = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsAction.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchItemAction.fulfilled, (state, action) => {
        state.selectedItem = action.payload;
      })
      .addCase(updateItemAction.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.selectedItem = action.payload.item;
      });
  }
});

export const {setSelectedItem} = itemsData.actions;
