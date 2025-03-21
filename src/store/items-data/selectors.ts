import { NameSpace } from "../../consts";
import { State } from "../../types/state";

export const getItems = (state: Pick<State, NameSpace.Items>) =>
  state[NameSpace.Items].items;
export const getSelectedItem = (state: Pick<State, NameSpace.Items>) =>
  state[NameSpace.Items].selectedItem;
