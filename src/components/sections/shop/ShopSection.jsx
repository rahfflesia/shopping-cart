import { useEffect, useState } from "react";
import "./ShopSection.css";
import { useOutletContext } from "react-router";

export default function ShopSection() {
  // Initializing the array with the minimum quantity (1)
  function initialize() {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr[i] = 1;
    }
    return arr;
  }

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productQuantities, setProductQuantities] = useState(initialize());
  const [cartProducts, setCartProducts] = useOutletContext();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (error)
    return (
      <div className="error-wrapper">
        <h1>An error has ocurred</h1>
        <p>{error}</p>
      </div>
    );

  if (isLoading)
    return (
      <div className="loading-wrapper">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );

  return products.length > 0 ? (
    <div className="grid">
      {products.map((object, index) => {
        const imageSrc = object.image;
        const productName = object.title;
        const productPrice = object.price;
        const objectId = object.id;

        return (
          <div
            key={objectId}
            className="product-card"
            data-testid="product-card"
          >
            <div className="product-wrapper">
              <div className="image-wrapper">
                <img src={imageSrc} alt={productName} />
              </div>
              <p className="product-name">{productName}</p>
            </div>
            <div className="input-buttons">
              <button
                onClick={() => {
                  setProductQuantities((currentQuantities) => {
                    const copy = [...currentQuantities];
                    copy[index] = copy[index] + 1;
                    return copy;
                  });
                }}
              >
                +
              </button>
              <input
                type="number"
                min={1}
                value={productQuantities[index]}
                data-testid="quantity"
                className="input"
              />
              <button
                onClick={() => {
                  // If block to avoid zero and non positive values
                  if (productQuantities[index] > 1) {
                    setProductQuantities((currentQuantities) => {
                      const copy = [...currentQuantities];
                      copy[index] = copy[index] - 1;
                      return copy;
                    });
                  }
                }}
              >
                -
              </button>
            </div>
            <div className="price-add-wrapper">
              <p className="product-price">${productPrice}</p>
              <button
                onClick={() => {
                  setCartProducts((prev) => [
                    ...prev,
                    { ...object, quantity: productQuantities[index] },
                  ]);
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="no-products-found">
      <h1>Oops!</h1>
      <p>No products were found</p>
    </div>
  );
}
