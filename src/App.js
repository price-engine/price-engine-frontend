import "./App.css";
import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import { categories, governorates, comboboxStyle } from "./constants.ts";
import Card from "./components/Card/Card.jsx";
import ComboBox from "./components/ComboBox/ComboBox.jsx";
import linkedinIcon from "./assets/icons/linkedin.svg";
import githubIcon from "./assets/icons/github.svg";

function App() {
  const sortOptions = [
    { value: "1", label: "Price: low to high" },
    { value: "-1", label: "Price: high to low" },
  ];
  const [selectedGovernorate, setSelectedGovernorate] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [minPrice, setMinPrice] = useState(NaN);
  const [maxPrice, setMaxPrice] = useState(NaN);
  const [products, setProducts] = useState([]);
  const [hasScrolledDown, setHasScrolledDown] = useState(false);
  const [resultsExist, setResultsExist] = useState(true);
  const [loading, setLoading] = useState(false);
  const searchBtnRef = useRef();
  const isLastPage = useRef(false);
  const exactMatchRef = useRef();
  const searchValue = useRef("");
  const page = useRef(1);

  function handleSearchInput(e) {
    if (e.key === "Enter") {
      if (window.innerWidth < 843) e.target.blur();
      searchBtnRef.current.click();
    }
  }
  function search() {
    isLastPage.current = false;
    page.current = 1;
    setProducts([]);
    fetchProducts();
  }
  function generateQueryStatement() {
    let queryStatement = {
      name:
        exactMatchRef.current.checked && searchValue.current !== "" ? `"${searchValue.current}"` : searchValue.current,
      page: page.current,
      sortAsc: selectedSort.value,
    };
    if (!isNaN(minPrice)) queryStatement.minPrice = minPrice;
    if (!isNaN(maxPrice)) queryStatement.maxPrice = maxPrice;
    if (selectedCategory.length) queryStatement.category = selectedCategory?.map((cat) => cat.value);
    if (selectedGovernorate.length)
      queryStatement.location = selectedGovernorate?.map((gov) => gov.value).concat("Online");
    return queryStatement;
  }
  async function fetchProducts() {
    setLoading(true);
    let queryStatement = generateQueryStatement();
    const res = await fetch("https://api.price-engine.com/search?" + new URLSearchParams(queryStatement), {
      headers: { cacheControl: "noCache" },
    });
    const newProducts = await res.json();
    if (newProducts.length === 0) isLastPage.current = true;
    setProducts((oldProducts) => {
      let totalProducts = oldProducts.concat(newProducts);
      setResultsExist(totalProducts.length > 0);
      setLoading(false);
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
  }, [products, loading, isLastPage]);

  useEffect(() => {
    const medamaScript = document.createElement("script");
    medamaScript.src = "https://medama.price-engine.com/script.js";
    medamaScript.async = true;
    document.body.appendChild(medamaScript);
    return () => document.body.removeChild(medamaScript);
  }, [products]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="">Price Engine Best Hardware Prices in Egypt</h1>
        <img className="app-logo" src={`${process.env.PUBLIC_URL}/logo.png`} alt="Price Engine" />
        <div className="inputs-container">
          <div className="search-input-container">
            <input
              id="search-input"
              type="search"
              placeholder="Search..."
              name="search"
              onKeyUp={handleSearchInput}
              onChange={(e) => (searchValue.current = e.target.value.trim())}
              autoFocus
            />
            <label className="exact-match-label" for="exact-match-checkbox">
              <input
                ref={exactMatchRef}
                type="checkbox"
                id="exact-match-checkbox"
                name="exact-match-checkbox"
                defaultChecked="true"
              />
              Exact Match
            </label>
          </div>
          <div className="governorates-categories-container">
            <ComboBox
              className="governorates-combobox"
              selectedItem={selectedGovernorate}
              setSelectedItem={setSelectedGovernorate}
              options={governorates}
              placeholder1="All Governorates"
              placeholder2="Type anything. Example: Cairo"
            />
            <ComboBox
              className="categories-combobox"
              selectedItem={selectedCategory}
              setSelectedItem={setSelectedCategory}
              options={categories}
              placeholder1="All Categories"
              placeholder2="Type anything. Example: CPU"
            />
          </div>
          <div className="price-inputs-container">
            <Select
              onMenuOpen={() => {
                if (window.innerWidth < 843)
                  new Promise((r) => setTimeout(r, 200)).then(() =>
                    document.querySelector(".combobox.sort").scrollIntoView({ behavior: "smooth", block: "center" })
                  );
              }}
              className="combobox sort"
              options={sortOptions}
              value={selectedSort}
              onChange={setSelectedSort}
              styles={comboboxStyle}
            />
            <input
              type="number"
              min="0"
              max="90000000"
              placeholder="Min Price"
              name="minPrice"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onKeyUp={handleSearchInput}
            />
            <input
              type="number"
              min="0"
              max="90000000"
              placeholder="Max Price"
              name="maxPrice"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onKeyUp={handleSearchInput}
            />
            <button
              ref={searchBtnRef}
              id="search-btn"
              onClick={search}
              data-m:click={`searchValue=${searchValue.current};selectedGovernorate=${selectedGovernorate.map(
                (g) => g.label
              )};selectedCategory=${selectedCategory.map((c) => c.label)};selectedSort=${
                selectedSort.label
              };minPrice=${minPrice};maxPrice=${maxPrice}`}
            >
              <img className="favicon" src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="" />
              Search
            </button>
          </div>
        </div>
      </header>
      <main>
        {loading && <span className="loader"></span>}
        {loading || resultsExist || <p className="no-results">No results found</p>}
        <div className="cards-container">
          {products?.map((product) => {
            return <Card product={product} key={product.url} />;
          })}
        </div>
        {loading && products?.length > 0 && <span className="loader scrolling-loader"></span>}
      </main>
      <footer>
        <span className="socia-media-icons-container">
          <a href="https://www.linkedin.com/in/khalidwaleed0/" target="_blank" rel="nofollow noreferrer">
            <img src={linkedinIcon} className="linkedin-icon" alt="LinkedIn Profile" />
          </a>
          <a href="https://github.com/khalidwaleed0" target="_blank" rel="nofollow noreferrer">
            <img src={githubIcon} className="github-icon" alt="Github Profile" />
          </a>
        </span>
        <p>Made with ❤️ © 2025 Price Engine.</p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSd_K3p83JOWs6tXmFxc8I3rBROoUK7Cr26llXlellUep1Sk2A/viewform?usp=header"
          target="_blank"
          rel="nofollow noreferrer"
        >
          ✍🏻 Send feedback
        </a>
      </footer>
      <div className="sidebar-btns-container">
        {hasScrolledDown && (
          <button className="scrollup-btn sidebar-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            ^
          </button>
        )}
        <button className="cart-btn sidebar-btn">🛒</button>
      </div>
    </div>
  );
}

export default App;
