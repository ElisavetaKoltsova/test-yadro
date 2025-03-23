import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import ItemInfoPage from "./item-info-page";
import { AppRoute } from "../../consts";

const mockStore = configureStore();
const mockItem = {
  id: "1",
  name: "Тестовый товар",
  details: "Описание товара",
  functional: "Функционал товара",
  quantity: 10,
  inStock: true,
};

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

describe("ItemInfoPage", () => {
  it("отображает лоадер при загрузке", () => {
    const store = mockStore({
      itemsData: {
        selectedItem: null,
        selectedItemDataLoadingStatus: true,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ItemInfoPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("отображает информацию о товаре после загрузки", async () => {
    const store = mockStore({
      itemsData: {
        selectedItem: mockItem,
        selectedItemDataLoadingStatus: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ItemInfoPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Тестовый товар")).toBeInTheDocument();
    expect(screen.getByText("Описание товара")).toBeInTheDocument();
    expect(screen.getByText("Функционал товара")).toBeInTheDocument();
    expect(screen.getByText("Количество: 10")).toBeInTheDocument();
    expect(screen.getByText("Есть на скалде")).toBeInTheDocument();
  });

  it("перенаправляет на страницу редактирования при клике", async () => {
    const store = mockStore({
      itemsData: {
        selectedItem: mockItem,
        selectedItemDataLoadingStatus: false,
      },
    });

    const navigateMock = require("react-router").useNavigate;
    navigateMock.mockImplementation(jest.fn());

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${AppRoute.ItemInfoPage}/1`]}>
          <Routes>
            <Route path={`${AppRoute.ItemInfoPage}/:id`} element={<ItemInfoPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const editButton = screen.getByRole("button", { name: "Редактировать" });
    await userEvent.click(editButton);

    expect(navigateMock).toHaveBeenCalledWith(`/item/1${AppRoute.ItemEditPage}`);
  });
});
