import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CartCard } from "../../components/CartOverlay/CartOverlay";
import "./style.css";

export default function ShareCartPage() {
  let params = useParams();
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    fetch(`https://api.price-engine.com/cart?id=${params.id}`)
      .then((res) => res.json())
      .then((res) => setCartProducts(res.cartProducts));
  }, [params]);
  useEffect(() => {
    const medamaScript = document.createElement("script");
    medamaScript.src = "https://medama.price-engine.com/script.js";
    medamaScript.defer = true;
    document.body.appendChild(medamaScript);
    return () => document.body.removeChild(medamaScript);
  }, [params]);
  return (
    <>
      {cartProducts.length > 0 && (
        <div className="share-page">
          <a href="https://price-engine.com/">
            <img className="app-logo" src={`${process.env.PUBLIC_URL}/logo.png`} alt="Price Engine" />
          </a>
          <div className="cards-container">
            {cartProducts.map((product, i) => {
              return <CartCard product={product} key={product.url} />;
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
        </div>
      )}
    </>
  );
}
