import Select from "react-select";
import { categories, governorates, comboboxStyle, sortOptions } from "../../constants.ts";
import ComboBox from "../../components/ComboBox/ComboBox.jsx";
import { scrollWhenKeyboardShown } from "../../Utils.js";
import { useRef } from "react";

export default function FiltersContainer({ search, isLoading, filters, setFilters }) {
  const searchBtnRef = useRef();
  function handleSearchInput(e) {
    if (e.key === "Enter" && !isLoading) {
      if (window.innerWidth < 843) e.target.blur();
      searchBtnRef.current.click();
    }
  }
  function setSelectedGovernorate(gov) {
    setFilters((oldFilters) => ({ ...oldFilters, governorate: gov }));
  }
  function setSelectedCategory(cat) {
    setFilters((oldFilters) => ({ ...oldFilters, category: cat }));
  }
  return (
    <div className="inputs-container">
      <input
        id="search-input"
        type="search"
        placeholder="Search..."
        name="search"
        value={filters?.searchValue}
        onKeyUp={handleSearchInput}
        onChange={(e) => setFilters((oldFilters) => ({ ...oldFilters, searchValue: e.target.value }))}
        autoFocus
      />
      <div className="governorates-categories-container">
        <ComboBox
          className="governorates-combobox"
          selectedItem={filters.governorate}
          setSelectedItem={setSelectedGovernorate}
          options={governorates}
          placeholder1="All Governorates"
          placeholder2="Type anything. Example: Cairo"
        />
        <ComboBox
          className="categories-combobox"
          selectedItem={filters.category}
          setSelectedItem={setSelectedCategory}
          options={categories}
          placeholder1="All Categories"
          placeholder2="Type anything. Example: CPU"
        />
      </div>
      <div className="price-inputs-container">
        <Select
          onMenuOpen={() => scrollWhenKeyboardShown(".combobox.sort", "center")}
          className="combobox sort"
          options={sortOptions}
          value={filters.sort}
          onChange={(e) => setFilters((oldFilters) => ({ ...oldFilters, sort: e }))}
          isSearchable={false}
          styles={comboboxStyle}
          theme={(theme) => {
            return {
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                neutral0: "var(--combobox-option-background-color)",
                neutral80: "var(--primary-text-color)",
              },
            };
          }}
        />
        <input
          type="number"
          min="0"
          max="90000000"
          placeholder="Min Price"
          name="minPrice"
          value={filters.minPrice}
          onChange={(e) => setFilters((oldFilters) => ({ ...oldFilters, minPrice: e.target.value }))}
          onKeyUp={handleSearchInput}
        />
        <input
          type="number"
          min="0"
          max="90000000"
          placeholder="Max Price"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={(e) => setFilters((oldFilters) => ({ ...oldFilters, maxPrice: e.target.value }))}
          onKeyUp={handleSearchInput}
        />
        <button
          ref={searchBtnRef}
          id="search-btn"
          onClick={() => !isLoading && search()}
          data-m:click={`searchValue=${filters.searchValue};selectedGovernorate=${filters.governorate.map(
            (g) => g.label
          )};selectedCategory=${filters.category.map((c) => c.label)};selectedSort=${
            filters.sort.label
          };minPrice=${filters.minPrice};maxPrice=${filters.maxPrice}`}
        >
          <img className="favicon" src="/favicon.ico" alt="" />
          Search
        </button>
      </div>
    </div>
  );
}
