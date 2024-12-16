import logo from "./logo.jpeg";
import "./App.css";
import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import { categories, governorates } from "./constants.ts";

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
  const isLastPage = useRef(false);
  const searchValue = useRef("");
  const page = useRef(1);

  function handleSearchInput(e) {
    searchValue.current = e.target.value;
    if (e.key === "Enter" && e.target.value !== "") {
      isLastPage.current = false;
      page.current = 1;
      setProducts([]);
      fetchProducts();
    } else searchValue.current = e.target.value;
  }
  function fetchProducts() {
    if (searchValue.current === "") return;
    let queryStatement = {
      name: searchValue.current,
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 9000000,
      page: page.current,
      sortAsc: selectedSort.value,
    };
    if (selectedCategory.length) queryStatement.category = selectedCategory?.map((cat) => cat.value);
    if (selectedGovernorate.length) queryStatement.location = selectedGovernorate?.map((gov) => gov.value);
    fetch("http://127.0.0.1:3000/search?" + new URLSearchParams(queryStatement), {
      headers: { cacheControl: "noCache" },
    })
      .then((res) => res.json())
      .then((newProducts) => {
        setProducts((oldProducts) => {
          let totalProducts = oldProducts.concat(newProducts);
          if (newProducts.length === 0) isLastPage.current = true;
          return totalProducts;
        });
      });
  }
  function handleScrolling() {
    let bottomReached = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
    if (bottomReached && !isLastPage.current) {
      page.current++;
      fetchProducts();
    }
  }
  function importShopLogos(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace(/(\.\/)|(\.\w+$)/g, "")] = r(item);
    });
    return images;
  }
  const shopLogos = importShopLogos(require.context("./shopLogos", false, /\.(webp|png|jpe?g|svg)$/));
  useEffect(() => {
    window.addEventListener("scroll", handleScrolling, { passive: true });
    return () => window.removeEventListener("scroll", handleScrolling);
  }, [selectedCategory, selectedGovernorate, selectedSort, minPrice, maxPrice]);

  return (
    <div className="app">
      <header className="app-header">
        <img className="app-logo" src={logo} alt="" />
        <div className="inputs-container">
          <div className="app-header-top">
            <input id="search-input" placeholder="Search Price-Engine" name="search" onKeyUp={handleSearchInput} />
            <Select
              className="combobox sort"
              options={sortOptions}
              value={selectedSort}
              onChange={setSelectedSort}
              placeholder="Sort by"
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
          </div>
          <div className="app-header-bottom">
            <Select
              className="combobox"
              options={governorates}
              onChange={setSelectedGovernorate}
              value={selectedGovernorate}
              isMulti={true}
              placeholder="All Governorates"
            />
            <Select
              className="combobox"
              options={categories}
              onChange={setSelectedCategory}
              value={selectedCategory}
              isMulti={true}
              placeholder="All Categories"
            />
          </div>
        </div>
      </header>
      <main>
        <div className="cards-container">
          {products?.map((product) => {
            return (
              <div className="card" key={product.url}>
                <img className="product-image" src={product.imgUrl} referrerPolicy="no-referrer" alt={product.name} />
                <h4 className="card-name" title={product.name}>
                  {product.name}
                </h4>
                <h3 className="card-price">{product.price} EGP</h3>
                <div className="links-container">
                  <a href={product.shop.url} className="shop-logo-container">
                    <img
                      src={shopLogos[product.shop.id]}
                      className="shop-logo"
                      title={product.shop.name}
                      alt={product.shop.name}
                    />
                  </a>
                  <a className="primary-btn" href={product.url} target="_blank" rel="noreferrer">
                    <button>Go to Page</button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
