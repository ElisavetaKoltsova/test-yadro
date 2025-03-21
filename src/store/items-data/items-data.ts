import { createSlice } from "@reduxjs/toolkit";
import { ItemsData } from "../../types/state";
import { NameSpace } from "../../consts";
import { fetchItemsAction } from "../api-actions";

const initialState: ItemsData = {
  items: []
};

export const itemsData = createSlice({
  name: NameSpace.Items,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsAction.fulfilled, (state, action) => {
        state.items = action.payload;
      })
  }
});
