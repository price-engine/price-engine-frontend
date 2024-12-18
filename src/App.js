import logo from "./logo.jpeg";
import "./App.css";
import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import { categories, governorates } from "./constants.ts";
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
            <input
              id="search-input"
              type="search"
              placeholder="Search Price-Engine"
              name="search"
              onKeyUp={handleSearchInput}
            />
            <Select
              className="combobox sort"
              options={sortOptions}
              value={selectedSort}
              onChange={setSelectedSort}
              placeholder="Sort by"
              styles={{
                control: (baseStyles, state) => {
                  return {
                    ...baseStyles,
                    border: "2px solid hsl(0, 0%, 90%)",
                    borderRadius: "6px",
                    color: state.isFocused ? "black" : "red",
                    "&:hover": {
                      borderColor: "var(--light-green)",
                    },
                  };
                },
              }}
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
              theme={(theme) => {
                console.log(theme);
                return {
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "var(--light-green)",
                    // neutral50: "var(--light-green)", //chosen option color
                    // neutral20: "var(--light-green)", //arrow color
                  },
                };
              }}
              styles={{
                control: (baseStyles, state) => {
                  return {
                    ...baseStyles,
                    border: "2px solid hsl(0, 0%, 90%)",
                    borderRadius: "6px",
                    color: state.isFocused ? "black" : "red",
                    "&:hover": {
                      borderColor: "var(--light-green)",
                    },
                  };
                },
              }}
            />
            <Select
              className="combobox"
              options={categories}
              onChange={setSelectedCategory}
              value={selectedCategory}
              isMulti={true}
              placeholder="All Categories"
              styles={{
                control: (baseStyles, state) => {
                  return {
                    ...baseStyles,
                    border: "2px solid hsl(0, 0%, 90%)",
                    borderRadius: "6px",
                    color: state.isFocused ? "black" : "red",
                    "&:hover": {
                      borderColor: "var(--light-green)",
                    },
                  };
                },
              }}
            />
          </div>
        </div>
      </header>
      <main>
        <div className="cards-container">
          {products?.map((product) => {
            return <Card product={product} key={product.url} />;
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
