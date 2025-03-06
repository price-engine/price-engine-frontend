import { useEffect, useState } from "react";
import { shopLogos } from "../Card/Card.jsx";
import "./cart-overlay.css";

export default function CartOverlay({ cartProducts, setCartProducts, setCartShown }) {
  const [linkCopied, setLinkCopied] = useState(false);
  function handleCopyLink() {
    if (cartProducts.length === 0) return;
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1000);
    fetch("https://api.price-engine.com/cart/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartProducts),
    })
      .then((res) => res.json())
      .then((res) => navigator.clipboard.writeText(`https://price-engine.com/share/${res.id}`));
  }
  useEffect(() => {
    setCartProducts((oldProducts) => {
      let newProducts = [...oldProducts];
      newProducts.forEach((p) => (p.quantity ??= 1));
      return newProducts;
    });
  }, []);
  return (
    <div className="cart-overlay-container" onClick={() => setCartShown(false)}>
      <div className="cart-overlay" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Cart</h3>
          <span className="close-btn" onClick={() => setCartShown(false)}>
            ✖
          </span>
        </div>
        <div className="cards-container">
          {cartProducts.map((product, i) => {
            return <CartCard product={product} setCartProducts={setCartProducts} key={product.url} />;
          })}
        </div>
        <h3 className="price-total">
          Total:
          {" " +
            cartProducts
              .reduce((total, p) => total + p.price * (p.quantity ?? 1), 0)
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
          EGP
        </h3>
        <button className="copy-link-btn" onClick={handleCopyLink}>
          {linkCopied ? "Copied" : "Copy Share Link"}
        </button>
      </div>
    </div>
  );
}

function CartCard({ product, setCartProducts }) {
  function handleQuantityChange(changeAmount) {
    setCartProducts((oldProducts) => {
      let newProducts = [...oldProducts];
      let selectedProduct = newProducts.find((p) => p.url === product.url);
      selectedProduct.quantity += changeAmount;
      if (selectedProduct.quantity < 1) selectedProduct.quantity = 1;
      localStorage.setItem("cartProducts", JSON.stringify(newProducts));
      return newProducts;
    });
  }
  function handleRemoveCard() {
    setCartProducts((oldProducts) => {
      let newProducts = oldProducts.filter((p) => p.url !== product.url);
      localStorage.setItem("cartProducts", JSON.stringify(newProducts));
      document.querySelector(`.card .primary-btn[href="${product.url}"] + .add-to-cart-btn.added`)?.click();
      return newProducts;
    });
  }
  return (
    <div className="cart-card">
      {product.shop?.onlineOnly && <span className="online-only">&#x2022; Online Only</span>}
      <img className="product-image" src={product.imgUrl} referrerPolicy="no-referrer" alt={product.name} />
      <div className="name-container">
        <a className="name" title={product.name} href={product.url}>
          {product.name}
        </a>
        <a href={product.shop.url} className="shop-logo-container" target="_blank" rel="noreferrer">
          <img
            src={shopLogos[product.shop.id]}
            className="shop-logo"
            title={product.shop.name}
            alt={product.shop.name}
          />
        </a>
      </div>
      <h3 className="price">{product.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} EGP</h3>
      <button className="remove-btn" onClick={handleRemoveCard}>
        ⛔
      </button>
      <div className="quantity-container">
        <span className="decrease-quantity-btn" onClick={() => handleQuantityChange(-1)}>
          -
        </span>
        <p className="quantity">{product.quantity ?? 1}</p>
        <span className="increase-quantity-btn" onClick={() => handleQuantityChange(1)}>
          +
        </span>
      </div>
    </div>
  );
}
