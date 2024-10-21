import logo from "./logo.jpeg";
import "./App.css";
import Select from "react-select";
import { useState } from "react";
import { categories, governorates } from "./constants.ts";

function App() {
  const sortOptions = [
    { value: "1", label: "Price: low to high" },
    { value: "-1", label: "Price: high to low" },
  ];
  const [selectedGovernorate, setSelectedGovernorate] = useState(undefined);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [minPrice, setMinPrice] = useState(NaN);
  const [maxPrice, setMaxPrice] = useState(NaN);
  const [products, setProducts] = useState([]);

  function search(e) {
    if (e.key === "Enter" && e.target.value !== "") {
      fetch(
        "http://127.0.0.1:3000/search?" +
          new URLSearchParams({
            name: e.target.value,
            category: selectedCategory?.map((cat) => cat.value)?.join(","),
            location: selectedGovernorate?.map((gov) => gov.value)?.join(","),
            minPrice: minPrice || 0,
            maxPrice: maxPrice || 9000000,
            sortAsc: 1,
          }),{
            headers:{
              cacheControl: "noCache",
            }
          }
      )
        .then((res) => res.json())
        .then((res) => setProducts(res));
    }
  }
  return (
    <div className="app">
      <header className="app-header">
        <img className="app-logo" src={logo} alt="" />
        <div className="inputs-container">
          <div className="app-header-top">
            <input id="search-input" placeholder="Search Price-Engine" name="search" onKeyUp={search} />
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
          {products.map((product) => {
            return (
              <div className="card" key={product.url}>
                <img src={product.imgUrl} referrerPolicy="no-referrer" alt="" />
                <h4 className="card-name">{product.name}</h4>
                <h3 className="card-price">{product.price}</h3>
                <a href={product.url} target="_blank" rel="noreferrer">
                  <button>Go to Page</button>
                </a>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
