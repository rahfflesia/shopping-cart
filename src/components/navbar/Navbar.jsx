import { Link } from "react-router";
import "./Navbar.css";
import PropTypes from "prop-types";

export default function Navbar({ numberOfProducts }) {
  return (
    <nav>
      <h1 className="white-color">Regular store</h1>
      <div>
        <ul className="white-color">
          <li>
            <Link to="/" className="white-color">
              Home
            </Link>
          </li>
          <li>
            <Link to="shop" className="white-color">
              Shop
            </Link>
          </li>
          <li>
            <Link to="cart" className="white-color">
              {numberOfProducts < 1 ? (
                <span>Cart</span>
              ) : (
                <span>Cart ({numberOfProducts})</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  numberOfProducts: PropTypes.number,
};
