import { JSX } from "react";
import { BrowserRouter } from "react-router";
import ItemListPage from "../../pages/list-items-page/item-list-page";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ItemListPage />
    </BrowserRouter>
  );
}
