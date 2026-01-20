import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ShopSection from "../../components/sections/shop/ShopSection";
import { MemoryRouter, Outlet, Route, Routes } from "react-router";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";

function OutletWrapper({ initialState }) {
  const [cart, setCart] = useState(initialState);
  return <Outlet context={[cart, setCart]}></Outlet>;
}

function OutletWrapperWithNavbar({ initialState }) {
  const [cart, setCart] = useState(initialState);
  return (
    <main>
      <Navbar numberOfProducts={cart.length}></Navbar>
      <Outlet context={[cart, setCart]}></Outlet>
    </main>
  );
}

async function getMockedData() {
  return [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      rating: { rate: 3.9, count: 120 },
    },
    {
      id: 2,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      rating: { rate: 3.9, count: 120 },
    },
  ];
}

describe("Shop section component tests", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Should render fetched data correctly", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      json: getMockedData,
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<OutletWrapper />}>
            <Route path="/" element={<ShopSection />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const productCards = await screen.findAllByTestId("product-card");
    expect(productCards).toHaveLength(2);
  });

  it("Should render loading component", () => {
    globalThis.fetch.mockResolvedValueOnce({
      json: getMockedData,
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<OutletWrapper />}>
            <Route path="/" element={<ShopSection />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });

  it("Should render error state", async () => {
    globalThis.fetch = function () {
      return new Promise(function (resolve, reject) {
        reject("API unavailable");
      });
    };

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<OutletWrapper />}>
            <Route path="/" element={<ShopSection />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const errorMessage = await screen.findByText("An error has ocurred");

    expect(errorMessage).toBeInTheDocument();
  });

  it("Should add one to the input value", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      json: getMockedData,
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<OutletWrapper />}>
            <Route path="/" element={<ShopSection />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const addButtons = await screen.findAllByRole("button", { name: "+" });
    const inputs = await screen.findAllByTestId("quantity");

    for (const addButton of addButtons) {
      await user.click(addButton);
    }

    for (let i = 0; i < inputs.length; i++) {
      expect(inputs[i].value).toEqual("2");
    }
  });

  it("Should substract one to the input value", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      json: getMockedData,
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<OutletWrapper />}>
            <Route path="/" element={<ShopSection />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const substractButtons = await screen.findAllByRole("button", {
      name: "-",
    });

    const addButtons = await screen.findAllByRole("button", { name: "+" });
    const inputs = await screen.findAllByTestId("quantity");

    for (const addButton of addButtons) {
      await user.click(addButton);
      await user.click(addButton);
    }

    for (const substractButton of substractButtons) {
      await user.click(substractButton);
    }

    for (let i = 0; i < inputs.length; i++) {
      expect(inputs[i].value).toEqual("2");
    }
  });

  it("Should show oops message", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce([]),
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<OutletWrapper />}>
            <Route path="/" element={<ShopSection />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const emptyProductsArrayMessage = await screen.findByText("Oops!");
    expect(emptyProductsArrayMessage).toBeInTheDocument();
  });

  it("Should add products to the shopping cart", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      json: getMockedData,
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar></Navbar>
        <Routes>
          <Route element={<OutletWrapperWithNavbar initialState={[]} />}>
            <Route path="/" element={<ShopSection />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const addToCartButtons = await screen.findAllByRole("button", {
      name: "Add to cart",
    });

    for (const addToCartButton of addToCartButtons) {
      await user.click(addToCartButton);
    }

    const cartItemsContainer = screen.getByRole("link", { name: "Cart (2)" });

    expect(cartItemsContainer.textContent).toEqual("Cart (2)");
  });
});
