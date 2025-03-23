import { NameSpace } from "../../consts";
import { State } from "../../types/state";

export const getItems = (state: Pick<State, NameSpace.Items>) =>
  state[NameSpace.Items].items;
export const getSelectedItem = (state: Pick<State, NameSpace.Items>) =>
  state[NameSpace.Items].selectedItem;

export const getItemsDataLoadingStatus = (state: Pick<State, NameSpace.Items>) =>
  state[NameSpace.Items].isItemsDataLoading;
export const getSelectedItemDataLoadingStatus = (state: Pick<State, NameSpace.Items>) =>
  state[NameSpace.Items].isSelectedItemDataLoading;
