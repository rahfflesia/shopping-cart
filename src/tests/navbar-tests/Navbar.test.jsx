import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Navbar from "../../components/navbar/Navbar";
import { MemoryRouter, Outlet, Route, Routes } from "react-router";
import userEvent from "@testing-library/user-event";
import HomeSection from "../../components/sections/home/HomeSection";
import ShopSection from "../../components/sections/shop/ShopSection";
import { useState } from "react";
import CartSection from "../../components/sections/cart/CartSection";

function OutletWrapper({ initialState }) {
  const [cart, setCart] = useState(initialState);
  return <Outlet context={[cart, setCart]}></Outlet>;
}

describe("Navbar component tests", () => {
  it("Should render", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
  });

  it("Should render without props", () => {
    render(
      <MemoryRouter>
        <Navbar numberOfProducts={0} />
      </MemoryRouter>,
    );

    const cartText = screen.getByRole("link", { name: "Cart" });
    expect(cartText).toBeInTheDocument();
  });

  it("Should render with props", () => {
    render(
      <MemoryRouter>
        <Navbar numberOfProducts={4} />
      </MemoryRouter>,
    );

    const cartTextWithProps = screen.getByText("Cart (4)");
    expect(cartTextWithProps).toBeInTheDocument();
  });

  it("Should link to the shop section correctly", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Navbar></Navbar>
        <Routes>
          <Route element={<OutletWrapper initialState={[]} />}>
            <Route path="/" index={true} element={<HomeSection />}></Route>
            <Route path="/shop" element={<ShopSection />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const shopLink = screen.getByRole("link", { name: "Shop" });
    await user.click(shopLink);

    const productCards = await screen.findAllByTestId("product-card");
    productCards.forEach(function (productCard) {
      expect(productCard).toBeInTheDocument();
    });
  });

  it("Should link to the cart section correctly", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Navbar numberOfProducts={0}></Navbar>
        <Routes>
          <Route element={<OutletWrapper initialState={[]} />}>
            <Route path="/" index={true} element={<HomeSection />}></Route>
            <Route path="/cart" element={<CartSection />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const cartLink = screen.getByRole("link", { name: "Cart" });
    await user.click(cartLink);

    const emptyCartMessage = screen.getByText("Your cart is empty");
    expect(emptyCartMessage).toBeInTheDocument();
  });

  it("Should link to the home section correctly", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Navbar></Navbar>
        <Routes>
          <Route element={<OutletWrapper initialState={[]} />}>
            <Route path="/cart" index={true} element={<CartSection />}></Route>
            <Route path="/" element={<HomeSection />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole("link", { name: "Home" });
    await user.click(homeLink);

    const sloganContainer = screen.getByText("The best clothing store");
    expect(sloganContainer).toBeInTheDocument();
  });
});
