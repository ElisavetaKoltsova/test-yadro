import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemsData } from "../../types/state";
import { NameSpace } from "../../consts";
import { fetchItemAction, fetchItemsAction, updateItemAction } from "../api-actions";
import { Item } from "../../types/item";

const initialState: ItemsData = {
  items: localStorage.items ? JSON.parse(localStorage.items) : [],
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
      .addCase(fetchItemsAction.pending, (state) => {
        state.isItemsDataLoading = true;
      })
      .addCase(fetchItemsAction.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isItemsDataLoading = false;
      })
      .addCase(fetchItemsAction.rejected, (state) => {
        state.isItemsDataLoading = false;
      })
      .addCase(fetchItemAction.pending, (state) => {
        state.isSelectedItemDataLoading = true;
      })
      .addCase(fetchItemAction.fulfilled, (state, action) => {
        state.selectedItem = action.payload;
        state.isSelectedItemDataLoading = false;
      })
      .addCase(fetchItemAction.rejected, (state) => {
        state.isSelectedItemDataLoading = false;
      })
      .addCase(updateItemAction.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.selectedItem = action.payload.item;
      });
  }
});

export const {setSelectedItem} = itemsData.actions;
