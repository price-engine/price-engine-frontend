import "./App.css";
import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import { categories, governorates, comboboxStyle } from "./constants.ts";
import Card from "./components/Card/Card.jsx";

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
  const [categoryPlaceholder, setCategoryPlaceholder] = useState("All Categories");
  const [governoratePlaceholder, setGovernoratePlaceholder] = useState("All Governorates");

  function handleSearchInput(e) {
    if (e.key === "Enter") {
      searchBtnRef.current.click();
      e.target.blur();
    }
  }
  function search() {
    isLastPage.current = false;
    page.current = 1;
    setProducts([]);
    fetchProducts();
  }
  function fetchProducts() {
    setLoading(true);
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
    return fetch("https://api.price-engine.com/search?" + new URLSearchParams(queryStatement), {
      headers: { cacheControl: "noCache" },
    })
      .then((res) => res.json())
      .then((newProducts) => {
        setProducts((oldProducts) => {
          let totalProducts = oldProducts.concat(newProducts);
          if (newProducts.length === 0) isLastPage.current = true;
          setResultsExist(totalProducts.length > 0);
          setLoading(false);
          return totalProducts;
        });
      });
  }
  function handleScrolling() {
    if (document.documentElement.scrollTop > 200) setHasScrolledDown(true);
    else setHasScrolledDown(false);
    let bottomReached = Math.ceil(window.innerHeight + window.scrollY + 10) >= document.documentElement.scrollHeight;
    if (bottomReached && products?.length && !isLastPage.current) {
      page.current++;
      fetchProducts();
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrolling, { passive: true });
    return () => window.removeEventListener("scroll", handleScrolling);
  }, [products, selectedCategory, selectedGovernorate, selectedSort, minPrice, maxPrice]);

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
            <Select
              onMenuOpen={() => {
                setGovernoratePlaceholder("Type anything. Example: Cairo");
                if (window.innerWidth < 843)
                  new Promise((r) => setTimeout(r, 200)).then(() =>
                    document.querySelector(".governorates-combobox").scrollIntoView(true, { behavior: "smooth" })
                  );
              }}
              onMenuClose={() => setGovernoratePlaceholder("All Governorates")}
              className="combobox governorates-combobox"
              options={governorates}
              onChange={setSelectedGovernorate}
              value={selectedGovernorate}
              isMulti={true}
              placeholder={governoratePlaceholder}
              styles={comboboxStyle}
            />
            <Select
              onMenuOpen={() => {
                setCategoryPlaceholder("Type anything. Example: CPU");
                if (window.innerWidth < 843)
                  new Promise((r) => setTimeout(r, 200)).then(() =>
                    document.querySelector(".categories-combobox").scrollIntoView(true, { behavior: "smooth" })
                  );
              }}
              onMenuClose={() => setCategoryPlaceholder("All Categories")}
              className="combobox categories-combobox"
              options={categories}
              onChange={setSelectedCategory}
              value={selectedCategory}
              isMulti={true}
              placeholder={categoryPlaceholder}
              styles={comboboxStyle}
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
              placeholder="Sort by"
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.target.blur();
                  searchBtnRef.current.click();
                }
              }}
            />
            <input
              type="number"
              min="0"
              max="90000000"
              placeholder="Max Price"
              name="maxPrice"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.target.blur();
                  searchBtnRef.current.click();
                }
              }}
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
      {hasScrolledDown && (
        <div className="scrollup-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          ^
        </div>
      )}
    </div>
  );
}

export default App;
