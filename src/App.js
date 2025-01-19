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
  const isLastPage = useRef(false);
  const exactMatchRef = useRef();
  const searchValue = useRef("");
  const page = useRef(1);

  function handleSearchInput(e) {
    searchValue.current = e.target.value;
    if (e.key === "Enter") {
      search();
      e.target.blur();
    } else searchValue.current = e.target.value;
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
      name: exactMatchRef.current.checked ? `"${searchValue.current}"` : searchValue.current,
      page: page.current,
      sortAsc: selectedSort.value,
    };
    if (!isNaN(minPrice)) queryStatement.minPrice = minPrice;
    if (!isNaN(maxPrice)) queryStatement.maxPrice = maxPrice;
    if (selectedCategory.length) queryStatement.category = selectedCategory?.map((cat) => cat.value);
    if (selectedGovernorate.length) queryStatement.location = selectedGovernorate?.map((gov) => gov.value);
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
    let bottomReached = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
    if (bottomReached && products?.length && !isLastPage.current) {
      page.current++;
      fetchProducts();
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrolling, { passive: true });
    return () => window.removeEventListener("scroll", handleScrolling);
  }, [selectedCategory, selectedGovernorate, selectedSort, minPrice, maxPrice]);

  return (
    <div className="app">
      <header className="app-header">
        <img className="app-logo" src={`${process.env.PUBLIC_URL}/logo.png`} alt="" />
        <div className="inputs-container">
          <div className="search-input-container">
            <input id="search-input" type="text" placeholder="Search..." name="search" onKeyUp={handleSearchInput} />
            <label className="exact-match-label" for="exact-match-checkbox">
              <input ref={exactMatchRef} type="checkbox" id="exact-match-checkbox" name="exact-match-checkbox" />
              Exact Match
            </label>
          </div>
          <div className="governorates-categories-container">
            <Select
              onMenuOpen={() =>
                new Promise((r) => setTimeout(r, 200)).then(() =>
                  document.querySelector(".governorates-combobox").scrollIntoView(true, { behavior: "smooth" })
                )
              }
              className="combobox governorates-combobox"
              options={governorates}
              onChange={setSelectedGovernorate}
              value={selectedGovernorate}
              isMulti={true}
              placeholder="All Governorates"
              styles={comboboxStyle}
            />
            <Select
              onMenuOpen={() =>
                new Promise((r) => setTimeout(r, 200)).then(() =>
                  document.querySelector(".categories-combobox").scrollIntoView(true, { behavior: "smooth" })
                )
              }
              className="combobox categories-combobox"
              options={categories}
              onChange={setSelectedCategory}
              value={selectedCategory}
              isMulti={true}
              placeholder="All Categories"
              styles={comboboxStyle}
            />
          </div>
          <div className="price-inputs-container">
            <Select
              onMenuOpen={() =>
                new Promise((r) => setTimeout(r, 200)).then(() =>
                  document.querySelector(".combobox.sort").scrollIntoView({ behavior: "smooth",block: "center" })
                )
              }
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
            />
            <input
              type="number"
              min="0"
              max="90000000"
              placeholder="Max Price"
              name="maxPrice"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button id="search-btn" onClick={search}>
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
