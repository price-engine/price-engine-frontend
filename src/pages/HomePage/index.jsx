import "./style.css";
import { useEffect, useRef, useState } from "react";
import Card from "../../components/Card/Card.jsx";
import CartOverlay from "../../components/CartOverlay/CartOverlay.jsx";
import FiltersContainer from "./FiltersContainer.jsx";
import { generateQueryStatement } from "../../Utils.js";
import Footer from "./Footer.jsx";
import { sortOptions } from "../../constants.js";
import FloatingTopIcons from "./FloatingTopIcons.jsx";
import FloatingBottomIcons from "./FloatingBottomIcons.jsx";

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
        if (newProducts.length + products.length === 0) {
          if (containsArabic(filters.searchValue)) setErrorSentence("No results found. Try to type in English.");
          else setErrorSentence("No results found. Check the spelling and spaces or use fewer words.");
        }
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
        <div className="app-logo-container">
          <img className="app-logo" src="/logo.png" alt="Price Engine" />
        </div>
        <FiltersContainer search={search} filters={filters} setFilters={setFilters} />
      </header>
      <main>
        {loading && <span className="loader"></span>}
        {errorSentence !== "" && <p className="no-results">{errorSentence}</p>}
        <div className="main-cards-container">
          {products?.map((product, i) => {
            // if (!isDuplicateProduct(product, products.at(i + 1)))
            return <Card product={product} setCartProducts={setCartProducts} key={product._id} />;
          })}
        </div>
        {loading && products?.length > 0 && <span className="loader scrolling-loader"></span>}
      </main>
      <Footer />
      <FloatingTopIcons />
      <FloatingBottomIcons hasScrolledDown={hasScrolledDown} setCartShown={setCartShown} />
      {cartShown && (
        <CartOverlay cartProducts={cartProducts} setCartProducts={setCartProducts} setCartShown={setCartShown} />
      )}
    </div>
  );
}
function containsArabic(text) {
  return /[\u0660-\u0669]|[ء-ي]/.test(text);
}
export default HomePage;
