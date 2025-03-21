import { JSX } from "react";
import ItemListPage from "../../pages/list-items-page/item-list-page";
import { Provider } from "react-redux";
import { store } from "../../store";
import { BrowserRouter, Route, Routes } from "react-router";
import { AppRoute } from "../../consts";
import ItemInfoPage from "../../pages/item-info-page/item-info-page";
import ItemEditPage from "../../pages/item-edit-page/item-edit-page";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
import Layout from "../layout/layout";

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path={AppRoute.ItemListPage}
              element={<ItemListPage />}
            />
            <Route
              path={AppRoute.ItemInfoPage}
            >
              <Route
                path={AppRoute.ItemId}
                element={<ItemInfoPage />}
              />
              <Route
                path={`${AppRoute.ItemId}/${AppRoute.ItemEditPage}`}
                element={<ItemEditPage />}
              />
            </Route>
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
