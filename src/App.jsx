import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router";

export default function App() {
  const [cartProducts, setCartProducts] = useState([]);
  return (
    <div className="app-wrapper">
      <Navbar numberOfProducts={cartProducts.length} />
      <main className="main-content-output">
        <Outlet context={[cartProducts, setCartProducts]} />
      </main>
    </div>
  );
}
