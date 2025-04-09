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
  const [resultsExist, setResultsExist] = useState(true);
  const [loading, setLoading] = useState(false);
  const [cartShown, setCartShown] = useState(false);
  const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem("cartProducts") || "[]"));
  const isLastPage = useRef(false);
  const page = useRef(1);
  function search() {
    isLastPage.current = false;
    page.current = 1;
    setProducts([]);
    fetchProducts();
  }
  async function fetchProducts() {
    setLoading(true);
    let queryStatement = generateQueryStatement(filters, page.current);
    const res = await fetch("https://api.price-engine.com/search?" + new URLSearchParams(queryStatement), {
      headers: { cacheControl: "noCache" },
    });
    const newProducts = await res.json();
    setLoading(false);
    if (newProducts.length === 0) isLastPage.current = true;
    setProducts((oldProducts) => {
      let totalProducts = oldProducts.concat(newProducts);
      setResultsExist(totalProducts.length > 0);
      return totalProducts;
    });
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
        {loading || resultsExist || <p className="no-results">No results found</p>}
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
