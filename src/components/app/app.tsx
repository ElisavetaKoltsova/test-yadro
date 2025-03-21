import { JSX } from "react";
import ItemListPage from "../../pages/list-items-page/item-list-page";
import { Provider } from "react-redux";
import { store } from "../../store";

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ItemListPage />
    </Provider>
  );
}
