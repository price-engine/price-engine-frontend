import "./style.css";
import { useEffect, useRef, useState } from "react";
import Card from "../../components/Card/Card.jsx";
import CartOverlay from "../../components/CartOverlay/CartOverlay.jsx";
import FiltersContainer from "./FiltersContainer.jsx";
import { generateQueryStatement } from "../../Utils.js";
import SidebarContainer from "./SidebarContainer.jsx";
import Footer from "./Footer.jsx";
import { sortOptions } from "../../constants.js";

function HomePage() {
  const [filters, setFilters] = useState({
    searchValue: "",
    governorate: [],
    category: [],
    sort: sortOptions[0],
    minPrice: NaN,
    maxPrice: NaN,
  });
  const [products, setProducts] = useState([]);
  const [hasScrolledDown, setHasScrolledDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartShown, setCartShown] = useState(false);
  const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem("cartProducts") || "[]"));
  const isLastPage = useRef(false);
  const [errorSentence, setErrorSentence] = useState("");
  const page = useRef(1);
  function search() {
    isLastPage.current = false;
    page.current = 1;
    setProducts([]);
    fetchProducts();
  }
  async function fetchProducts() {
    setLoading(true);
    setErrorSentence("");
    let queryStatement = generateQueryStatement(filters, page.current);
    return fetch("https://api.price-engine.com/search?" + new URLSearchParams(queryStatement))
      .then((res) => res.json())
      .then((newProducts) => {
        setProducts((oldProducts) => [...oldProducts, ...newProducts]);
        if (newProducts.length === 0) isLastPage.current = true;
        if (newProducts.length + products.length === 0) setErrorSentence("No results found.");
      })
      .catch(() => setErrorSentence("Server down for maintenance! Try again in a few seconds."))
      .finally(() => setLoading(false));
  }
  function handleScrolling() {
    if (document.documentElement.scrollTop > 200) setHasScrolledDown(true);
    else setHasScrolledDown(false);
    let bottomReached = Math.ceil(window.innerHeight + window.scrollY + 10) >= document.documentElement.scrollHeight;
    if (bottomReached && products?.length && !isLastPage.current && !loading) {
      page.current++;
      fetchProducts();
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScrolling, { passive: true });
    return () => window.removeEventListener("scroll", handleScrolling);
  }, [products, loading]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="">Price Engine Best Hardware Prices in Egypt</h1>
        <img className="app-logo" src="/logo.png" alt="Price Engine" />
        <FiltersContainer search={search} filters={filters} setFilters={setFilters} />
      </header>
      <main>
        {loading && <span className="loader"></span>}
        {errorSentence !== "" && <p className="no-results">{errorSentence}</p>}
        <div className="main-cards-container">
          {products?.map((product) => {
            return <Card product={product} setCartProducts={setCartProducts} key={product.url} />;
          })}
        </div>
        {loading && products?.length > 0 && <span className="loader scrolling-loader"></span>}
      </main>
      <Footer />
      <SidebarContainer hasScrolledDown={hasScrolledDown} setCartShown={setCartShown} />
      {cartShown && (
        <CartOverlay cartProducts={cartProducts} setCartProducts={setCartProducts} setCartShown={setCartShown} />
      )}
    </div>
  );
}

export default HomePage;
