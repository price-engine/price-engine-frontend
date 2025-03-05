import { useState } from "react";
import "./card.css";
export const shopLogos = importShopLogos(require.context("../../assets/shopLogos", false, /\.(webp|png|jpe?g|svg)$/));
export default function Card({ product, setCartProducts }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [removable, setRemovable] = useState(false);

  function handleAddToCart() {
    if (!addedToCart) {
      setTimeout(() => setRemovable(true), 1000);
      setCartProducts((oldProducts) => {
        let newCartProducts = [...oldProducts, product];
        localStorage.setItem("cartProducts", JSON.stringify(newCartProducts));
        return newCartProducts;
      });
    } else {
      setCartProducts((oldProducts) => {
        let newCartProducts = oldProducts.filter((el) => el.url !== product.url);
        localStorage.setItem("cartProducts", JSON.stringify(newCartProducts));
        return newCartProducts;
      });
      setRemovable(false);
    }
    setAddedToCart((toggle) => !toggle);
  }
  return (
    <div className="card">
      {product.shop?.onlineOnly && <span className="online-only">&#x2022; Online Only</span>}
      <img className="product-image" src={product.imgUrl} referrerPolicy="no-referrer" alt={product.name} />
      <div className="card-name-container">
        <h4 className="card-name" title={product.name}>
          {product.name}
        </h4>
        <span className="tooltip">{product.name}</span>
      </div>
      <h3 className="card-price">{product.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} EGP</h3>
      <div className="links-container">
        <a href={product.shop.url} className="shop-logo-container" target="_blank" rel="noreferrer">
          <img
            src={shopLogos[product.shop.id]}
            className="shop-logo"
            title={product.shop.name}
            alt={product.shop.name}
          />
        </a>
        <a className="primary-btn" href={product.url} target="_blank" rel="noreferrer">
          <button
            data-m:click={`clicked_shop=${product.shop.name};clicked_product=${product.name};clicked_link=${product.url}`}
          >
            Visit Page
          </button>
        </a>
        <button
          className={`add-to-cart-btn ${addedToCart ? "added" : ""} ${removable ? "removable" : ""}`}
          onClick={handleAddToCart}
        ></button>
      </div>
    </div>
  );
}

function importShopLogos(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace(/(\.\/)|(\.\w+$)/g, "")] = r(item);
  });
  return images;
}
