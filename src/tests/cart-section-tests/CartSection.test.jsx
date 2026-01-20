import { describe, expect, it } from "vitest";
import CartSection from "../../components/sections/cart/CartSection";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Outlet, Route, Routes } from "react-router";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import ShopSection from "../../components/sections/shop/ShopSection";

function OutletWrapper({ initialState }) {
  const [cart, setCart] = useState(initialState);
  return <Outlet context={[cart, setCart]}></Outlet>;
}

const getMockShoppingCart = () => [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: { rate: 3.9, count: 120 },
    quantity: 3,
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
    quantity: 3,
  },
];

// Should fix the state, it fails because the state always has products
describe("Cart section component tests", () => {
  it("Should render the empty cart component", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<OutletWrapper initialState={[]} />}>
            <Route path="/" element={<CartSection />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const cartEmptyMessage = screen.getByText("Your cart is empty");

    expect(cartEmptyMessage).toBeInTheDocument();
  });

  it("Should remove products from the cart correctly", async () => {
    const user = userEvent.setup();
    const shoppingCartMock = getMockShoppingCart();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<OutletWrapper initialState={shoppingCartMock} />}>
            <Route path="/" element={<CartSection />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const removeItemButtons = screen.getAllByRole("button", {
      name: "Remove item",
    });

    for (const removeItemButton of removeItemButtons) {
      await user.click(removeItemButton);
    }

    const cartEmptyMessage = screen.getByText("Your cart is empty");

    expect(cartEmptyMessage).toBeInTheDocument();
  });

  it("Should render correctly when there are items in the cart", () => {
    const shoppingCartMock = getMockShoppingCart();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<OutletWrapper initialState={shoppingCartMock} />}>
            <Route path="/" element={<CartSection />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const cartItemSection = screen.getByTestId("cart-section");
    expect(cartItemSection).toBeInTheDocument();
  });

  it("Should add one to the quanitity of the product", async () => {
    const user = userEvent.setup();
    const shoppingCartMock = getMockShoppingCart();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<OutletWrapper initialState={shoppingCartMock} />}>
            <Route path="/" element={<CartSection />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const quantities = screen.getAllByTestId("product-quantity");
    const addButtons = screen.getAllByRole("button", { name: "+" });

    for (const addButton of addButtons) {
      await user.click(addButton);
    }

    quantities.forEach((quantity) => {
      expect(quantity.value).toEqual("4");
    });
  });

  it("Should substract one from the quantity of the product", async () => {
    const user = userEvent.setup();
    const shoppingCartMock = getMockShoppingCart();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<OutletWrapper initialState={shoppingCartMock} />}>
            <Route path="/" element={<CartSection />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const quantities = screen.getAllByTestId("product-quantity");
    const substractButtons = screen.getAllByRole("button", { name: "+" });

    for (const substractButton of substractButtons) {
      await user.click(substractButton);
      await user.click(substractButton);
    }

    for (let i = 0; i < quantities.length; i++) {
      expect(quantities[i].value).toEqual("5");
    }
  });

  it("Should calculate the total price correctly", async () => {
    const user = userEvent.setup();
    const shoppingCartMock = getMockShoppingCart();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<OutletWrapper initialState={shoppingCartMock} />}>
            <Route path="/" element={<CartSection />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const addButtons = screen.getAllByRole("button", { name: "+" });

    for (const addButton of addButtons) {
      await user.click(addButton);
    }

    const total = screen.getByTestId("total-price");
    expect(total.textContent).toEqual("Total: $879.60");
  });

  it("Should link to the shop section correctly", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<OutletWrapper initialState={[]} />}>
            <Route path="/" element={<CartSection />}></Route>
            <Route path="/shop" element={<ShopSection />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const goToShopButton = screen.getByTestId("go-to-shop");
    await user.click(goToShopButton);

    const productCards = await screen.findAllByTestId("product-card");
    productCards.forEach((productCard) => {
      expect(productCard).toBeInTheDocument();
    });
  });
});
