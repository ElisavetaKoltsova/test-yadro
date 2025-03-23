import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { createAPI } from "../services/api";
import { State } from "../types/state";
import { Item } from "../types/item";
import { faker } from '@faker-js/faker';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

export const makeFakeItem = (): Item => ({
  id: faker.string.uuid(),
  name: faker.internet.username(),
  details: faker.lorem.sentence.toString(),
  functional: faker.lorem.sentence.toString(),
  quantity: Number(faker.number),
  inStock: true
});

export const makeFakeItems =
  (items: number): Item[] =>
    new Array(items).fill(null).map(() => makeFakeItem());

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  ITEMS: {
    items: [{
      id: "1",
      name: "name1",
      details: "sdff",
      functional: "ssdf",
      quantity: 0,
      inStock: false
    },
    {
      id: "2",
      name: "name2",
      details: "sdff",
      functional: "ssdf",
      quantity: 0,
      inStock: true
    }
  ],
    selectedItem: {
      id: "1",
      name: "name1",
      details: "sdff",
      functional: "ssdf",
      quantity: 0,
      inStock: false
    },
    isItemsDataLoading: false,
    isSelectedItemDataLoading: false
  },
  ...initialState ?? {}
});
