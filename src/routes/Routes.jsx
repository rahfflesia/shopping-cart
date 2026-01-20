import App from "../App";
import CartSection from "../components/sections/cart/CartSection";
import HomeSection from "../components/sections/home/HomeSection";
import ShopSection from "../components/sections/shop/ShopSection";
import ErrorComponent from "../components/error-component/ErrorComponent";

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      { path: "cart", element: <CartSection /> },
      { index: true, element: <HomeSection /> },
      { path: "shop", element: <ShopSection /> },
    ],
  },
];
