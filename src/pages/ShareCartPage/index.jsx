import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { CartCard } from "../../components/CartOverlay/CartOverlay.jsx";
import "./style.css";
import FloatingTopIcons from "../HomePage/FloatingTopIcons.jsx";
import Footer from "../HomePage/Footer.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";

export default function ShareCartPage() {
  let params = useParams();
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    fetch(`https://api.price-engine.com/cart?id=${params.id}`)
      .then((res) => res.json())
      .then((res) => setCartProducts(res.cartProducts));
  }, [params]);

  return (
    <>
      <Navbar />
      {cartProducts.length > 0 && (
        <div className="share-page">
          <FloatingTopIcons />
          <Link to="/" className="app-logo-container">
            <img className="app-logo" src="/logo.png" alt="Price Engine" />
          </Link>
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
          <Footer />
        </div>
      )}
    </>
  );
}
