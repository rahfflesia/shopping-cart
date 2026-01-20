import { Link, useOutletContext } from "react-router";
import "./CartSection.css";

export default function CartSection() {
  const [cartProducts, setCartProducts] = useOutletContext();

  function handleSetTotal() {
    const acumulator = 0;
    const totalPrice = cartProducts.reduce(
      (acum, product) => acum + product.price * product.quantity,
      acumulator
    );

    return totalPrice;
  }

  const totalPrice = handleSetTotal();

  return cartProducts.length > 0 ? (
    <div className="cart-section-wrapper" data-testid="cart-section">
      <h1 className="cart-section-header">
        Your products ({cartProducts.length})
      </h1>
      <div className="cart-products">
        {cartProducts.map((productObject, index) => {
          const productPrice = productObject.price;
          const productName = productObject.title;
          const productId = productObject.id;
          const productImage = productObject.image;
          const productQuantity = productObject.quantity;

          return (
            <div key={productId} className="cart-product">
              <div className="left-info">
                <img src={productImage} alt={productName} />
                <div className="name-price">
                  <span className="product-name">{productName}</span>
                  <span className="product-price">${productPrice}</span>
                </div>
              </div>
              <div className="right-info">
                <div className="manage-product-quantity">
                  <button
                    onClick={() => {
                      setCartProducts((prev) => {
                        const copy = [...prev];

                        copy[index] = {
                          ...copy[index],
                          quantity: copy[index].quantity + 1,
                        };
                        return copy;
                      });
                    }}
                  >
                    +
                  </button>
                  <input
                    type="number"
                    value={productQuantity}
                    data-testid="product-quantity"
                  />
                  <button
                    onClick={() => {
                      if (productQuantity > 1) {
                        setCartProducts((prev) => {
                          const copy = [...prev];

                          copy[index] = {
                            ...copy[index],
                            quantity: copy[index].quantity - 1,
                          };
                          return copy;
                        });
                      }
                    }}
                  >
                    -
                  </button>
                </div>
                <button
                  onClick={() => {
                    setCartProducts((prev) => {
                      const copy = [...prev];
                      copy.splice(index, 1);
                      return copy;
                    });
                  }}
                >
                  Remove item
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="total-wrapper">
        <span className="total" data-testid="total-price">
          Total: ${totalPrice.toFixed(2)}
        </span>
        <button className="buy-button">Buy</button>
      </div>
    </div>
  ) : (
    <div className="cart-empty-component" data-testid="empty-cart-component">
      <div className="cart-empty-message">
        <p>Your cart is empty</p>
        <span>Add some products first! :)</span>
        <Link to="/shop" className="link-styles" data-testid="go-to-shop">
          Go to shop
        </Link>
      </div>
    </div>
  );
}

/* */
